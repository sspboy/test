import { createRouter, createWebHistory } from 'vue-router'
import NotFoundComponent from '../views/NotFoundComponent.vue'
import server_err from '../views/server_err.vue'

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
        path: '/user',
        name: 'User',
        component: () => import('../views/UserView.vue'),   // 视图文件
        meta:{
            title:'用户管理',
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin/admin.vue'),    // 视图文件
        meta:{
            title:'后台管理',
        }

    },
    {   // 404 报错页面
      path: '/:catchAll(.*)', // 使用捕获所有路由的模式
        name:"Error404",
      component: NotFoundComponent
    },
    {   // 500 报错页面
      path: '/500',
      name: 'Error500',
      component: server_err // 500错误页面组件
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
