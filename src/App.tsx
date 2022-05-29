import type { Component } from 'solid-js';
import {from} from "solid-js";

import styles from './App.module.css';
import {$comletedTasks, $existingTasks, addTask, editTask, removeTask} from "./models/tasks/init";

import TasksList from "./atoms/TasksList/TasksList";
import ChartLine from "./atoms/ChartLine/ChartLine";
import CompletedTasksChart from "./atoms/CompletedTasksChart/CompletedTasksChart";

const App: Component = () => {
  const completedTasks = from($comletedTasks);
  const existingTasks = from($existingTasks);

  const totalTasks = completedTasks().length + existingTasks().length;
  const successPercent = totalTasks !== 0 ?  completedTasks().length / totalTasks : null;

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>JetBrains Test Challenge</h1>
        <div class={styles.headerSubLine}>
            <div class={styles.author}>
              Author
              <span>Vladimir Khomenok</span>
            </div>
            {successPercent !== null ? <ChartLine value={successPercent} title={`${completedTasks().length}/${totalTasks}`} /> : undefined}
        </div>
      </header>
      <section class={styles.content}>
          <section class={styles.tasksSection}>
              <h2>Existing Tasks</h2>
              <TasksList tasks={existingTasks()} onEditTask={editTask} onRemoveTask={removeTask} />
              <button class={styles.addNewButton} onClick={() => addTask()}>Add new item</button>
          </section>
          <section class={styles.tasksSection}>
              <h2>Completed Tasks</h2>
              <TasksList tasks={completedTasks()} onEditTask={editTask} onRemoveTask={removeTask} />
              <CompletedTasksChart tasks={completedTasks()} />
          </section>
      </section>
    </div>
  );
};

export default App;
