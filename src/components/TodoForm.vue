<script setup lang="ts">
import { ref } from 'vue';

import { useTodoListStore } from '@/stores/todoList';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const todo = ref('');
const store = useTodoListStore();

function addItemAndClear(item: string) {
    if (item.trim().length === 0) return;
    store.addTodo(item.trim());
    todo.value = '';
}
</script>

<template>
    <form class="flex gap-2" @submit.prevent="addItemAndClear(todo)">
        <Input v-model="todo" placeholder="Add a new task…" />
        <Button type="submit">Add</Button>
    </form>
</template>
