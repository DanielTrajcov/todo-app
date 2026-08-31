<template>
    <div class="space-y-2">
        <TodoEmpty v-if="todoList.length === 0" />

        <p
            v-else-if="filteredTodoList.length === 0"
            class="text-center text-muted-foreground text-sm py-8"
        >
            No tasks match your search.
        </p>

        <template v-else>
            <TodoItem
                v-for="todo in filteredTodoList"
                :key="todo.id"
                :todo="todo"
                @toggle="store.toggleCompleted(todo)"
                @edit="store.showModal('edit', todo)"
            />
        </template>
    </div>

    <TodoEditModal />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useTodoListStore } from '@/stores/todoList';

import TodoItem from './TodoItem.vue';
import TodoEmpty from './TodoEmpty.vue';
import TodoEditModal from './TodoEditModal.vue';

const store = useTodoListStore();
const { todoList, filteredTodoList } = storeToRefs(store);
</script>
