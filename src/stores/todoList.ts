import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import type { ApiTodo, Todo } from '@/types/customTypes';

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=20';

export const useTodoListStore = defineStore('todoList', () => {
    const todoList = ref<Todo[]>([]);
    const isLoading = ref(false);

    const fetchTodos = async () => {
        isLoading.value = true;

        try {
            const response = await fetch(API_URL);
            const data: ApiTodo[] = await response.json();

            todoList.value = data.map((todo) => ({
                id: String(todo.id),
                item: todo.title,
                completed: todo.completed,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
        } catch (error) {
            console.error(error);
        }

        isLoading.value = false;
    };

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
        isLoading,
        searchQuery,
        filteredTodoList,
        fetchTodos,
        getTodoById,
        addTodo,
        toggleCompleted,
        updateTodo,
        deleteTodo,
    };
});
