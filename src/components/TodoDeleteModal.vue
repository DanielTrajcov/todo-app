<template>
    <Dialog :open="open" @update:open="!$event && $emit('close')">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Delete todo</DialogTitle>

                <DialogDescription>
                    “{{ item }}” will be permanently removed.
                </DialogDescription>
            </DialogHeader>

            <DialogFooter class="mt-2">
                <Button variant="outline" @click="$emit('close')">
                    Cancel
                </Button>

                <Button variant="destructive" @click="$emit('confirm')">
                    Delete
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

defineProps<{
    open: boolean;
    item: string;
}>();

defineEmits<{
    close: [void];
    confirm: [void];
}>();
</script>
