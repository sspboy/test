import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        path: '/',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
