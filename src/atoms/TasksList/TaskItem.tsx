import type {Component} from 'solid-js';
import cx from 'classnames';

import styles from './TasksList.module.css';
import {Task, TaskWithId} from "../../models/tasks/types";
import removeButton from './removeButton.svg';

export type TaskItemProps = {
    task: Task;
    taskId: TaskWithId['id'];
    onEditTask: (newTaskWithId: TaskWithId) => void;
    onRemoveTask: (removeId: TaskWithId['id']) => void;
}

const TaskItem: Component<TaskItemProps> = (props) => {
    const handleStatusChange = () => {
        let diff: Partial<Task> = {status: 'EXISTING'};
        switch (props.task.status) {
            case 'EXISTING':
                diff = {status: 'COMPLETED', completeDay: new Date().getDay()};
                break;
            case 'COMPLETED':
                diff = {status: 'EXISTING'};
                break;
        }
        props.onEditTask({task: {...props.task, ...diff}, id: props.taskId});
    }

    const handleInputChange = (e: {currentTarget: HTMLInputElement}) => props.onEditTask(
        {task: {...props.task, description: e.currentTarget.value || ''}, id: props.taskId}
    );

    return (
        <ul class={styles.list}>
            <li class={cx(props.task.status === 'COMPLETED' && styles.completedTask)}>
                <input
                    class={styles.statusCheckbox}
                    type="checkbox"
                    checked={props.task.status === 'COMPLETED'}
                    onClick={() => handleStatusChange()}
                />
                <input
                    class={styles.input}
                    value={props.task.description}
                    onChange={handleInputChange}
                    placeholder='Start typing a new item'
                />
                <div class={styles.actions}>
                    <button onClick={() => props.onRemoveTask(props.taskId)} class={styles.removeButton}>
                        <img src={removeButton} alt="removeButton" />
                    </button>
                </div>
            </li>
        </ul>
    );
};

export default TaskItem;
