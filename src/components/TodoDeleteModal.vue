<template>
    <Dialog :open="isOpen" @update:open="!$event && store.closeModal()">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Delete todo</DialogTitle>

                <DialogDescription>
                    “{{ activeTodo?.item }}” will be permanently removed.
                </DialogDescription>
            </DialogHeader>

            <DialogFooter class="mt-2">
                <Button variant="outline" @click="store.closeModal()">
                    Cancel
                </Button>

                <Button variant="destructive" @click="store.deleteTodo()">
                    Delete
                </Button>
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
import { Button } from '@/components/ui/button';

const store = useTodoListStore();
const { isModalOpen, modalMode, activeTodo } = storeToRefs(store);

const isOpen = computed(() => {
    return isModalOpen.value && modalMode.value === 'delete';
});
</script>
