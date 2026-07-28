<script setup lang="ts">
import TodoForm from './TodoForm.vue';
import TodoList from './TodoList.vue';
</script>

<template>
    <div class="max-w-md mx-auto mt-16 px-4 space-y-6">
        <h1 class="text-3xl font-bold tracking-tight text-center">
            To Do List
        </h1>
        <TodoForm />
        <TodoList />
    </div>
</template>
