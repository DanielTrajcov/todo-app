<template>
    <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import { useTodoListStore } from '@/stores/todoList';

const store = useTodoListStore();

onMounted(() => {
    store.fetchTodos();
});
</script>
