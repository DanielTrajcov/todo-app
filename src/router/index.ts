import { createRouter, createWebHistory } from 'vue-router';

import TodoApp from '@/components/TodoApp.vue';
import TodoPreviewView from '@/views/TodoPreviewView.vue';
import TodoEditView from '@/views/TodoEditView.vue';

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
        {
            path: '/todo/:id/edit',
            component: TodoEditView,
        },
    ],
});

export default router;
