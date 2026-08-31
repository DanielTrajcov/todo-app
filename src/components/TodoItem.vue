<template>
    <div class="flex items-center gap-3 p-3 rounded-lg border bg-card">
        <input
            type="checkbox"
            :id="`todo-${todo.id}`"
            :checked="todo.completed"
            class="h-4 w-4 cursor-pointer accent-primary"
            @change="$emit('toggle')"
        />

        <label
            :for="`todo-${todo.id}`"
            class="flex-1 cursor-pointer select-none"
            :class="{ 'line-through text-muted-foreground': todo.completed }"
        >
            {{ todo.item }}
        </label>

        <Button as-child size="icon" variant="ghost">
            <RouterLink :to="`/todo/${todo.id}`">
                <Eye class="h-4 w-4" />
            </RouterLink>
        </Button>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Eye } from 'lucide-vue-next';

import type { Todo } from '@/types/customTypes';

import { Button } from '@/components/ui/button';

defineProps<{ todo: Todo }>();

defineEmits<{ toggle: [void] }>();
</script>
