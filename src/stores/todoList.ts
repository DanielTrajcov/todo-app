import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { Todo } from '@/types/customTypes';

import dummyData from '@/data/dummydata.json';

export const useTodoListStore = defineStore('todoList', () => {
    const todoList = ref<Todo[]>(
        dummyData.map((todo) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            updatedAt: new Date(todo.updatedAt),
        })),
    );
    const id = ref(dummyData.length + 1);

    const addTodo = (item: string) => {
        todoList.value.push({
            item,
            id: id.value++,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    };

    const deleteTodo = (targetId: number) => {
        todoList.value = todoList.value.filter((task) => task.id !== targetId);
    };

    const toggleCompleted = (targetId: number) => {
        const task = todoList.value.find((task) => task.id === targetId);
        if (task) {
            task.completed = !task.completed;
            task.updatedAt = new Date();
        }
    };

    const updateTodo = (targetId: number, newItem: string) => {
        const task = todoList.value.find((task) => task.id === targetId);
        if (task) {
            task.item = newItem;
            task.updatedAt = new Date();
        }
    };

    return { todoList, id, addTodo, deleteTodo, toggleCompleted, updateTodo };
});
