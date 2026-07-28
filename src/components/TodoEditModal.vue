<template>
    <Dialog :open="isOpen" @update:open="!$event && store.closeModal()">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Edit todo</DialogTitle>

                <DialogDescription>
                    Update the task name and save your changes.
                </DialogDescription>
            </DialogHeader>

            <Input
                v-model="editingText"
                placeholder="Update your task…"
                @keyup.enter="store.updateTodo()"
            />

            <DialogFooter class="mt-2">
                <Button variant="outline" @click="store.closeModal()">
                    Cancel
                </Button>

                <Button @click="store.updateTodo()">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useTodoListStore } from '@/stores/todoList';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const store = useTodoListStore();
const { isModalOpen, modalMode, editingText } = storeToRefs(store);

const isOpen = computed(() => {
    return isModalOpen.value && modalMode.value === 'edit';
});
</script>
