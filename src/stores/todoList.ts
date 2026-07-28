import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Todo } from '@/types/customTypes';

export const useTodoListStore = defineStore('todoList', () => {
    const todoList = ref<Todo[]>([]);
    const id = ref(0);

    function addTodo(item: string) {
        todoList.value.push({
            item,
            id: id.value++,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    function deleteTodo(targetId: number) {
        todoList.value = todoList.value.filter((task) => task.id !== targetId);
    }

    function toggleCompleted(targetId: number) {
        const task = todoList.value.find((task) => task.id === targetId);
        if (task) {
            task.completed = !task.completed;
            task.updatedAt = new Date();
        }
    }

    function updateTodo(targetId: number, newItem: string) {
        const task = todoList.value.find((task) => task.id === targetId);
        if (task) {
            task.item = newItem;
            task.updatedAt = new Date();
        }
    }

    return { todoList, id, addTodo, deleteTodo, toggleCompleted, updateTodo };
});
