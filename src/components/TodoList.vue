<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useTodoListStore } from '@/stores/todoList';

import TodoItem from './TodoItem.vue';
import TodoEmpty from './TodoEmpty.vue';
import TodoEditDialog from './TodoEditDialog.vue';

const store = useTodoListStore();
const { todoList } = storeToRefs(store);

const dialogOpen = ref(false);
const editingId = ref<number | null>(null);
const editingText = ref('');

function openEdit(id: number, currentItem: string) {
    editingId.value = id;
    editingText.value = currentItem;
    dialogOpen.value = true;
}

function confirmEdit() {
    if (!editingText.value.trim() || editingId.value === null) return;
    store.updateTodo(editingId.value, editingText.value.trim());
    dialogOpen.value = false;
}
</script>

<template>
    <div class="space-y-2">
        <TodoEmpty v-if="todoList.length === 0" />

        <TodoItem
            v-for="todo in todoList"
            :key="todo.id"
            :todo="todo"
            @toggle="store.toggleCompleted(todo.id)"
            @edit="openEdit(todo.id, todo.item)"
            @delete="store.deleteTodo(todo.id)"
        />
    </div>

    <TodoEditDialog
        :open="dialogOpen"
        :text="editingText"
        @close="dialogOpen = false"
        @text-change="editingText = $event"
        @confirm="confirmEdit"
    />
</template>
