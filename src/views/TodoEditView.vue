<template>
    <div class="max-w-md mx-auto mt-16 px-4 space-y-6">
        <h1 class="text-3xl font-bold tracking-tight text-center">Edit todo</h1>

        <p
            v-if="store.isLoading"
            class="text-center text-muted-foreground text-sm py-8"
        >
            Loading…
        </p>

        <p
            v-else-if="todo === undefined"
            class="text-center text-muted-foreground text-sm py-8"
        >
            Task not found.
        </p>

        <template v-else>
            <Input
                v-model="editingText"
                placeholder="Update your task…"
                @keyup.enter="save()"
            />

            <div class="flex gap-2">
                <Button as-child variant="outline">
                    <RouterLink to="/">Cancel</RouterLink>
                </Button>

                <Button @click="save()">Save</Button>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { useTodoListStore } from '@/stores/todoList';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const route = useRoute();
const router = useRouter();
const store = useTodoListStore();

const todo = computed(() => {
    return store.getTodoById(String(route.params.id));
});

const editingText = ref('');

watch(todo,(task) => {
        if (task === undefined) {
            return;
        }

        editingText.value = task.item;
    },
    { immediate: true },
);

const save = () => {
    const newItem = editingText.value.trim();

    if (newItem.length === 0) {
        return;
    }

    store.updateTodo(String(route.params.id), newItem);
    router.push('/');
};
</script>
