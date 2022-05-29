import type {Component} from 'solid-js';

import styles from './CompletedTasksChart.module.css';
import {TaskWithId} from "../../models/tasks/types";
import {createMemo, For} from "solid-js";
import ChartLine from "../ChartLine/ChartLine";

export type CompletedTasksChartProps = {
    tasks: TaskWithId[];
}

const getChartData = (completedTasks: TaskWithId[]) => {
    const result = Array(7).fill(0);
    completedTasks.forEach(({task}) => {
        if (task.completeDay !== undefined) {
            result[task.completeDay]++;
        }
    });
    return result;
}

const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CompletedTasksChart: Component<CompletedTasksChartProps> = (props) => {
    const chartData = createMemo(() => getChartData(props.tasks));
    const sum = createMemo(() => chartData().reduce((sum, val) => sum + val, 0));

    return (
        <div class={styles.container}>
            <For each={chartData()}>{(dayValue, day) => (
                <ChartLine value={dayValue / sum()} title={WEEK_LABELS[day()]} />
            )}</For>
        </div>
    );
};

export default CompletedTasksChart;
