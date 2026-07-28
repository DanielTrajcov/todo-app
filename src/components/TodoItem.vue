<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-vue-next";
import type { Todo } from "@/types/customTypes";

defineProps<{ todo: Todo }>();

defineEmits<{
  toggle: [void];
  edit: [void];
  delete: [void];
}>();
</script>

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

    <Button size="icon" variant="ghost" @click="$emit('edit')">
      <Pencil class="h-4 w-4" />
    </Button>

    <Button
      size="icon"
      variant="ghost"
      class="text-destructive hover:text-destructive"
      @click="$emit('delete')"
    >
      <Trash2 class="h-4 w-4" />
    </Button>
  </div>
</template>
