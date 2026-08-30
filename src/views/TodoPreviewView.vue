<template>
    <div class="max-w-md mx-auto mt-16 px-4 space-y-6">
        <h1 class="text-3xl font-bold tracking-tight text-center">
            Task details
        </h1>

        <p v-if="todo === undefined" class="text-center text-muted-foreground text-sm py-8">
            Task not found.
        </p>

        <dl v-else class="grid grid-cols-3 gap-y-3 text-sm">
            <dt class="text-muted-foreground">Task</dt>
            <dd class="col-span-2 wrap-break-word">{{ todo.item }}</dd>

            <dt class="text-muted-foreground">Status</dt>
            <dd class="col-span-2">
                {{ todo.completed ? 'Completed' : 'Pending' }}
            </dd>

            <dt class="text-muted-foreground">Created</dt>
            <dd class="col-span-2">{{ formatDate(todo.createdAt) }}</dd>

            <dt class="text-muted-foreground">Updated</dt>
            <dd class="col-span-2">{{ formatDate(todo.updatedAt) }}</dd>
        </dl>

        <Button as-child variant="outline">
            <RouterLink to="/">Back</RouterLink>
        </Button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { useTodoListStore } from '@/stores/todoList';

import { Button } from '@/components/ui/button';

const route = useRoute();
const store = useTodoListStore();

const todo = computed(() => {
    return store.todoList.find((task) => task.id === route.params.id);
});

const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};
</script>
