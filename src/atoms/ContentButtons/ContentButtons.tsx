import type {Component} from 'solid-js';

import styles from './ContentButtons.module.css';
import {Task} from "../../models/tasks/types";

export type ContentButtonsProps = {
    tasks: Task[];
    onAddTasks: (tasks: Task[]) => void;
}

const ContentButtons: Component<ContentButtonsProps> = (props) => {
    const handleFileRead = (e: {currentTarget: HTMLInputElement}) => {
        if (e.currentTarget.files?.length) {
            const reader = new FileReader();

            reader.readAsText(e.currentTarget.files[0]);
            reader.onload = function() {
                try {
                    const parsed = JSON.parse(String(reader.result));
                    if (Array.isArray(parsed) && parsed.findIndex(el => !('description' in el)) === -1) {
                        props.onAddTasks(parsed);
                        return;
                    }
                    alert('Strange data');
                } catch (e) {
                    alert('Error while parsing');
                }
            };
            reader.onerror = () => {
                alert(reader.error);
            };
        }
    }

    const handleCopyClick = () => {
        try {
            navigator.clipboard.writeText(JSON.stringify(props.tasks))
                .then(() => alert('Copied JSON to the clipboard'))
                .catch(() => alert('Some error while copying'));
        } catch (e) {
            alert('Some error while copying');
        }
    }

    return (
        <div class={styles.container}>
            <div class={styles.button}>
                <label for="content-file">Import</label>
                <input type="file" onChange={handleFileRead} id="content-file" />
            </div>
            <button class={styles.button} onClick={handleCopyClick}>
                Copy
            </button>
        </div>
    );
};

export default ContentButtons;
