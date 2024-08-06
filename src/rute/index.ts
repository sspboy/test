import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        path: '/',
        name: 'Login',
        component: () => import('../views/LoginView.vue')   // 视图文件
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/HomeView.vue')// 视图文件
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin/admin.vue')// 视图文件
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
