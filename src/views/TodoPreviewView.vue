<template>
    <div class="max-w-md mx-auto mt-16 px-4 space-y-6">
        <h1 class="text-3xl font-bold tracking-tight text-center">
            Task details
        </h1>

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
            <dl class="grid grid-cols-3 gap-y-3 text-sm">
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

            <div class="flex gap-2">
                <Button as-child variant="outline">
                    <RouterLink to="/">Back</RouterLink>
                </Button>

                <Button as-child>
                    <RouterLink :to="`/todo/${todo.id}/edit`">Edit</RouterLink>
                </Button>

                <Button variant="destructive" @click="isDeleteOpen = true">
                    Delete
                </Button>
            </div>

            <TodoDeleteModal
                :open="isDeleteOpen"
                :item="todo.item"
                @close="isDeleteOpen = false"
                @confirm="remove()"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { useTodoListStore } from '@/stores/todoList';

import { Button } from '@/components/ui/button';
import TodoDeleteModal from '@/components/TodoDeleteModal.vue';

const route = useRoute();
const router = useRouter();
const store = useTodoListStore();

const isDeleteOpen = ref(false);

const todo = computed(() => {
    return store.getTodoById(String(route.params.id));
});

const remove = () => {
    const id = String(route.params.id);

    store.deleteTodo(id);
    router.push('/');
};

const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};
</script>
