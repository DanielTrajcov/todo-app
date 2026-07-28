export interface Todo {
    id: number;
    item: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type ModalMode = 'edit' | 'delete';
