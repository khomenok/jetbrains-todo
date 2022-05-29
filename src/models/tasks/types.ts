export type Task = {
    description: string;
    status: 'EXISTING' | 'COMPLETED';
    removed?: true;
}

export type TaskWithId = {
    task: Task;
    id: number;
}
