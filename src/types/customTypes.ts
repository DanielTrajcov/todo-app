export interface Todo {
    id: string;
    item: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type ModalMode = 'edit';
