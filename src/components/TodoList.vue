<template>
    <div class="space-y-2">
        <p
            v-if="isLoading"
            class="text-center text-muted-foreground text-sm py-8"
        >
            Loading…
        </p>

        <TodoEmpty v-else-if="todoList.length === 0" />

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
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useTodoListStore } from '@/stores/todoList';

import TodoItem from './TodoItem.vue';
import TodoEmpty from './TodoEmpty.vue';

const store = useTodoListStore();
const { todoList, filteredTodoList, isLoading } = storeToRefs(store);
</script>
