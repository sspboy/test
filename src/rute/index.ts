import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        path: '/',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),   // 视图文件
        meta:{
            title:'项目管理',
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),   // 视图文件
        meta:{
            title:'主页',
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin/admin.vue'),    // 视图文件
        meta:{
            title:'后台管理',
        }

    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
