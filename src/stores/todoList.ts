import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import type { Todo } from '@/types/customTypes';

import dummyData from '@/data/dummydata.json';

export const useTodoListStore = defineStore('todoList', () => {
    const todoList = ref<Todo[]>(
        dummyData.map((todo) => ({
            ...todo,
            id: String(todo.id),
            createdAt: new Date(todo.createdAt),
            updatedAt: new Date(todo.updatedAt),
        })),
    );

    const searchQuery = ref('');

    const filteredTodoList = computed(() => {
        const query = searchQuery.value.trim().toLowerCase();

        if (query.length === 0) {
            return todoList.value;
        }

        return todoList.value.filter((task) => {
            return task.item.toLowerCase().includes(query);
        });
    });

    const getTodoById = (id: string) => {
        return todoList.value.find((task) => task.id === id);
    };

    const addTodo = (item: string) => {
        todoList.value.push({
            item,
            id: crypto.randomUUID(),
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    };

    const toggleCompleted = (task: Todo) => {
        task.completed = !task.completed;
        task.updatedAt = new Date();
    };

    const updateTodo = (id: string, item: string) => {
        const task = getTodoById(id);

        if (task === undefined) {
            return;
        }

        task.item = item;
        task.updatedAt = new Date();
    };

    const deleteTodo = (id: string) => {
        todoList.value = todoList.value.filter((task) => task.id !== id);
    };

    return {
        todoList,
        searchQuery,
        filteredTodoList,
        getTodoById,
        addTodo,
        toggleCompleted,
        updateTodo,
        deleteTodo,
    };
});
