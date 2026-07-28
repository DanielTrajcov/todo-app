<template>
    <Dialog :open="isOpen" @update:open="!$event && store.closeModal()">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Task details</DialogTitle>

                <DialogDescription>
                    A read-only view of the selected task.
                </DialogDescription>
            </DialogHeader>

            <dl class="grid grid-cols-3 gap-y-3 text-sm">
                <dt class="text-muted-foreground">Task</dt>
                <dd class="col-span-2 wrap-break-word">
                    {{ activeTodo?.item }}
                </dd>

                <dt class="text-muted-foreground">Status</dt>
                <dd class="col-span-2">
                    {{ activeTodo?.completed ? 'Completed' : 'Pending' }}
                </dd>

                <dt class="text-muted-foreground">Created</dt>
                <dd class="col-span-2">
                    {{ formatDate(activeTodo?.createdAt) }}
                </dd>

                <dt class="text-muted-foreground">Updated</dt>
                <dd class="col-span-2">
                    {{ formatDate(activeTodo?.updatedAt) }}
                </dd>
            </dl>

            <DialogFooter class="mt-2">
                <Button variant="outline" @click="store.closeModal()">
                    Close
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
    return isModalOpen.value && modalMode.value === 'preview';
});

const formatDate = (date?: Date) => {
    if (!date) return '';

    return date.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};
</script>
