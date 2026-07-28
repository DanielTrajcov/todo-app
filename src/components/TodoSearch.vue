<template>
    <div class="relative">
        <Search
            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />

        <Input v-model="searchQuery" placeholder="Search tasks…" class="pl-9" />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Search } from 'lucide-vue-next';

import { useTodoListStore } from '@/stores/todoList';

import { Input } from '@/components/ui/input';

const store = useTodoListStore();
const { searchQuery } = storeToRefs(store);
</script>
