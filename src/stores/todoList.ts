import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { ModalMode, Todo } from '@/types/customTypes';

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

    const isModalOpen = ref(false);
    const modalMode = ref<ModalMode | null>(null);
    const activeTodo = ref<Todo | null>(null);
    const editingText = ref('');

    const showModal = (mode: ModalMode, todo: Todo) => {
        modalMode.value = mode;
        activeTodo.value = todo;
        editingText.value = todo.item;
        isModalOpen.value = true;
    };

    const closeModal = () => {
        isModalOpen.value = false;
        modalMode.value = null;
        activeTodo.value = null;
        editingText.value = '';
    };

    const addTodo = (item: string) => {
        todoList.value.push({
            item,
            id: id.value++,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    };

    const toggleCompleted = (task: Todo) => {
        task.completed = !task.completed;
        task.updatedAt = new Date();
    };

    const updateTodo = () => {
        if (activeTodo.value === null) return;

        const newItem = editingText.value.trim();

        if (newItem.length === 0) return;

        activeTodo.value.item = newItem;
        activeTodo.value.updatedAt = new Date();
        closeModal();
    };

    const deleteTodo = () => {
        if (activeTodo.value === null) return;

        const targetId = activeTodo.value.id;

        todoList.value = todoList.value.filter((task) => task.id !== targetId);
        closeModal();
    };

    return {
        todoList,
        id,
        isModalOpen,
        modalMode,
        activeTodo,
        editingText,
        showModal,
        closeModal,
        addTodo,
        toggleCompleted,
        updateTodo,
        deleteTodo,
    };
});
