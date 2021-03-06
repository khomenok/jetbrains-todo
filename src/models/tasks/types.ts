export type Task = {
    description: string;
    status: 'EXISTING' | 'COMPLETED';
    removed?: true;
    completeDay?: number;
}

export type TaskWithId = {
    task: Task;
    id: number;
}
