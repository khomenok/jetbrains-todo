/* eslint-disable no-unused-vars */
import type { Component } from 'solid-js';

import { For } from 'solid-js';
import styles from './TasksList.module.css';
import { TaskWithId } from '../../models/tasks/types';
import TaskItem from './TaskItem';

export type TasksListProps = {
    tasks: TaskWithId[];
    onEditTask: (newTaskWithId: TaskWithId) => void;
    onRemoveTask: (removeId: TaskWithId['id']) => void;
}

const TasksList: Component<TasksListProps> = (props) => (
        <ul class={styles.list}>
            <For each={props.tasks}>{({ task, id }) => (
                <TaskItem
                  task={task}
                  taskId={id}
                  onEditTask={props.onEditTask}
                  onRemoveTask={props.onRemoveTask}
                />
            )}</For>
        </ul>
);

export default TasksList;
