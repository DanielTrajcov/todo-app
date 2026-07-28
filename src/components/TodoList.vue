<template>
    <div class="space-y-2">
        <TodoEmpty v-if="todoList.length === 0" />

        <TodoItem
            v-for="todo in todoList"
            :key="todo.id"
            :todo="todo"
            @toggle="store.toggleCompleted(todo)"
            @edit="store.showModal('edit', todo)"
            @delete="store.showModal('delete', todo)"
        />
    </div>

    <TodoEditModal />
    <TodoDeleteModal />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useTodoListStore } from '@/stores/todoList';

import TodoItem from './TodoItem.vue';
import TodoEmpty from './TodoEmpty.vue';
import TodoEditModal from './TodoEditModal.vue';
import TodoDeleteModal from './TodoDeleteModal.vue';

const store = useTodoListStore();
const { todoList } = storeToRefs(store);
</script>
