import {createEvent, createStore, sample, Store} from "effector";
import {Task, TaskWithId} from "./types";

const LOCAL_STORAGE_KEY = 'tasks';
const getInitialTasks = () => {
    try {
        const stringified = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stringified) {
            const parsed = JSON.parse(stringified);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        }
    } catch (e) {
        console.log('Some error while hydrating');
    }
    return [];
}

export const $tasks = createStore<Task[]>(getInitialTasks());

export const $tasksWithId: Store<TaskWithId[]> = $tasks
    .map(tasks => tasks.map((task, id) => ({task, id})).filter(({task}) => !task.removed));

export const addTask = createEvent<string | undefined>();
export const addTasks = createEvent<Task[]>();
export const editTask = createEvent<TaskWithId>();
export const removeTask = createEvent<TaskWithId['id']>();

$tasks.on(addTask, (tasks, description) => [
    ...tasks,
    {description: description || '', status: 'EXISTING'},
]);

$tasks.on(addTasks, (tasks, newTasks) => [...tasks, ...newTasks]);

$tasks.on(editTask, (tasks, {task, id}) => [
    ...tasks.slice(0, id),
    task,
    ...tasks.slice(id + 1),
]);

sample({
    source: $tasks,
    clock: removeTask,
    fn: (tasks, removeId): TaskWithId => ({
        id: removeId,
        task: {...tasks[removeId], removed: true},
    }),
    target: editTask,
});

$tasks.watch(tasks => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

// --

export const $groupedTasks = $tasksWithId.map(tasksWithId => {
    const groupedTasks = {completed: [] as TaskWithId[], existing: [] as TaskWithId[]};
    tasksWithId.forEach((taskWithId) => {
        switch (taskWithId.task.status) {
            case 'COMPLETED':
                groupedTasks.completed.push(taskWithId);
                break;
            case 'EXISTING':
                groupedTasks.existing.push(taskWithId);
                break;
        }
    });
    return groupedTasks;
});
export const $comletedTasks = $groupedTasks.map(({completed}) => completed);
export const $existingTasks = $groupedTasks.map(({existing}) => existing);
