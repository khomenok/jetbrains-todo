import type {Component} from 'solid-js';
import cx from 'classnames';

import styles from './TasksList.module.css';
import {Task, TaskWithId} from "../../models/tasks/types";
import {For} from "solid-js";
import removeButton from './removeButton.svg';

export type TasksListProps = {
    tasks: TaskWithId[];
    onEditTask: (newTaskWithId: TaskWithId) => void;
    onRemoveTask: (removeId: TaskWithId['id']) => void;
}

const TasksList: Component<TasksListProps> = (props) => {
    const handleStatusChange = ({task, id}: TaskWithId) => {
        let newStatus: Task['status'] = 'EXISTING';
        switch (task.status) {
            case 'EXISTING':
                newStatus = 'COMPLETED';
                break;
            case 'COMPLETED':
                newStatus = 'EXISTING';
                break;
        }
        if (task.status === 'COMPLETED') {
            newStatus = 'EXISTING'
        }
        props.onEditTask({task: {...task, status: newStatus}, id});
    }

    return (
        <ul class={styles.list}>
            <For each={props.tasks}>{({task, id}) => (
                <li class={cx(task.status === 'COMPLETED' && styles.completedTask)}>
                    <input
                        class={styles.statusCheckbox}
                        type="checkbox"
                        checked={task.status === 'COMPLETED'}
                        onClick={() => handleStatusChange({task, id})}
                    />
                    <input
                        class={styles.input}
                        value={task.description}
                        onChange={(e) => props.onEditTask(
                            {task: {...task, description: e.currentTarget.value || ''}, id}
                        )}
                        placeholder='Start typing a new item'
                    />
                    <div class={styles.actions}>
                        <button onClick={() => props.onRemoveTask(id)} class={styles.removeButton}>
                            <img src={removeButton} alt="removeButton" />
                        </button>
                    </div>
                </li>
            )}</For>
        </ul>
    );
};

export default TasksList;
