export interface Todo {
    id: string;
    item: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiTodo {
    id: number;
    title: string;
    completed: boolean;
}
