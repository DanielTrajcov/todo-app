<template>
    <div class="space-y-2">
        <TodoEmpty v-if="todoList.length === 0" />

        <TodoItem
            v-for="todo in todoList"
            :key="todo.id"
            :todo="todo"
            @toggle="store.toggleCompleted(todo)"
            @edit="openEdit(todo)"
            @delete="removeTodo(todo.id)"
        />
    </div>

    <TodoEditDialog
        :open="dialogOpen"
        :text="editingText"
        @close="closeEdit"
        @text-change="editingText = $event"
        @confirm="confirmEdit"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import type { Todo } from '@/types/customTypes';

import { useTodoListStore } from '@/stores/todoList';

import TodoItem from './TodoItem.vue';
import TodoEmpty from './TodoEmpty.vue';
import TodoEditDialog from './TodoEditDialog.vue';

const store = useTodoListStore();
const { todoList } = storeToRefs(store);

const dialogOpen = ref(false);
const editingTodo = ref<Todo | null>(null);
const editingText = ref('');

const openEdit = (todo: Todo) => {
    editingTodo.value = todo;
    editingText.value = todo.item;
    dialogOpen.value = true;
};

const closeEdit = () => {
    dialogOpen.value = false;
    editingTodo.value = null;
    editingText.value = '';
};

const confirmEdit = () => {
    if (!editingText.value.trim() || editingTodo.value === null) return;
    store.updateTodo(editingTodo.value, editingText.value.trim());
    closeEdit();
};

const removeTodo = (targetId: number) => {
    store.deleteTodo(targetId);
    closeEdit();
};
</script>
