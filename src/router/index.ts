import { createRouter, createWebHistory } from 'vue-router';

import TodoApp from '@/components/TodoApp.vue';
import TodoPreviewView from '@/views/TodoPreviewView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: TodoApp,
        },
        {
            path: '/todo/:id',
            component: TodoPreviewView,
        },
    ],
});

export default router;
