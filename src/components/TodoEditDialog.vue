<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

defineProps<{
    open: boolean;
    text: string;
}>();

const emit = defineEmits<{
    close: [void];
    textChange: [value: string];
    confirm: [void];
}>();
</script>

<template>
    <Dialog :open="open" @update:open="!$event && emit('close')">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Edit Todo</DialogTitle>
            </DialogHeader>

            <Input
                :model-value="text"
                placeholder="Update your task…"
                @update:model-value="emit('textChange', String($event))"
                @keyup.enter="emit('confirm')"
            />

            <DialogFooter class="mt-2">
                <Button variant="outline" @click="emit('close')">Cancel</Button>
                <Button @click="emit('confirm')">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
