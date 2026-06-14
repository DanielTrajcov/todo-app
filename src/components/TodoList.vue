<script setup lang="ts">
import { ref } from "vue";
import { useTodoListStore } from "@/stores/todoList";
import { storeToRefs } from "pinia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-vue-next";

const store = useTodoListStore();
const { todoList } = storeToRefs(store);

const dialogOpen = ref(false);
const editingId = ref<number | null>(null);
const editingText = ref("");

function openEdit(id: number, currentItem: string) {
  editingId.value = id;
  editingText.value = currentItem;
  dialogOpen.value = true;
}

function confirmEdit() {
  if (!editingText.value.trim() || editingId.value === null) return;
  store.updateTodo(editingId.value, editingText.value.trim());
  dialogOpen.value = false;
}
</script>

<template>
  <div class="space-y-2">
    <p
      v-if="todoList.length === 0"
      class="text-center text-muted-foreground text-sm py-8"
    >
      No todos yet. Add one above!
    </p>

    <div
      v-for="todo in todoList"
      :key="todo.id"
      class="flex items-center gap-3 p-3 rounded-lg border bg-card"
    >
      <input
        type="checkbox"
        :id="`todo-${todo.id}`"
        :checked="todo.completed"
        class="h-4 w-4 cursor-pointer accent-primary"
        @change="store.toggleCompleted(todo.id)"
      />

      <label
        :for="`todo-${todo.id}`"
        class="flex-1 cursor-pointer select-none"
        :class="{ 'line-through text-muted-foreground': todo.completed }"
      >
        {{ todo.item }}
      </label>

      <Button size="icon" variant="ghost" @click="openEdit(todo.id, todo.item)">
        <Pencil class="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        class="text-destructive hover:text-destructive"
        @click="store.deleteTodo(todo.id)"
      >
        <Trash2 class="h-4 w-4" />
      </Button>
    </div>
  </div>

  <Dialog v-model:open="dialogOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Edit Todo</DialogTitle>
      </DialogHeader>

      <Input
        v-model="editingText"
        placeholder="Update your task…"
        @keyup.enter="confirmEdit"
      />

      <DialogFooter class="mt-2">
        <Button variant="outline" @click="dialogOpen = false">Cancel</Button>
        <Button @click="confirmEdit">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
