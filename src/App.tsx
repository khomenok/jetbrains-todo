import type { Component } from 'solid-js';
import {createEffect, createMemo, from, onCleanup} from "solid-js";

import styles from './App.module.css';
import {$comletedTasks, $existingTasks, $tasks, addTask, addTasks, editTask, removeTask} from "./models/tasks/init";

import TasksList from "./atoms/TasksList/TasksList";
import ChartLine from "./atoms/ChartLine/ChartLine";
import CompletedTasksChart from "./atoms/CompletedTasksChart/CompletedTasksChart";
import ContentButtons from "./atoms/ContentButtons/ContentButtons";

const simpleAddTask = () => addTask();
const ctrlNKeyAddTask = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'n') {
        simpleAddTask();
    }
}

const App: Component = () => {
  const allTasks = from($tasks);
  const completedTasks = from($comletedTasks);
  const existingTasks = from($existingTasks);

  const totalTasks = createMemo(() => completedTasks().length + existingTasks().length);
  const successPercent = createMemo(() => totalTasks() !== 0 ? completedTasks().length / totalTasks() : null);

  createEffect(() => {
    window.addEventListener('keydown', ctrlNKeyAddTask);
  });

  onCleanup(async () => {
    window.removeEventListener('keydown', ctrlNKeyAddTask);
  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>JetBrains Test Challenge</h1>
        <div class={styles.headerSubLine}>
            <div class={styles.author}>
              Author
              <span>Vladimir Khomenok</span>
            </div>
            {successPercent() !== null
                ? <ChartLine value={successPercent() || 0} title={`${completedTasks().length}/${totalTasks()}`} />
                : undefined}
        </div>
        <ContentButtons tasks={allTasks()} onAddTasks={addTasks} />
      </header>
      <section class={styles.content}>
          <section class={styles.tasksSection}>
              <h2>Existing Tasks</h2>
              <TasksList tasks={existingTasks()} onEditTask={editTask} onRemoveTask={removeTask} />
              <button class={styles.addNewButton} onClick={simpleAddTask}>Add new item (Ctrl + N)</button>
          </section>
          <section class={styles.tasksSection}>
              <h2>Completed Tasks</h2>
              <TasksList tasks={completedTasks()} onEditTask={editTask} onRemoveTask={removeTask} />
              {completedTasks().length > 0 && <CompletedTasksChart tasks={completedTasks()} />}
          </section>
      </section>
    </div>
  );
};

export default App;
