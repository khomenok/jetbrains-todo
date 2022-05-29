import type { Component } from 'solid-js';

import styles from './ChartLine.module.css';

export type ChartLineProps = {
    value: number; // 0..1
    title: string;
}

const ChartLine: Component<ChartLineProps> = (props) => (
        <div class={styles.container}>
            <div class={styles.title}>{props.title}</div>
            <div class={styles.line} style={{
              '--chart-line-percent': `${props.value * 100}%`,
            }}/>
        </div>
);

export default ChartLine;
