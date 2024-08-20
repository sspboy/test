import { createRouter, createWebHistory } from 'vue-router'
import NotFoundComponent from '../views/otherRes/NotFoundComponent.vue'
import server_err from '../views/otherRes/server_err.vue'
import NotPermissions from '../views/otherRes/NotPermissions.vue'
import NotLoginPermissions from '../views/otherRes/NotLoginPermissions.vue'

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
        component: NotFoundComponent,
        meta:{
            title:'没有请求的资源',
        }
    },
    {   // 500 报错页面
        path: '/500',
        name: 'Error500',
        component: server_err, // 500错误页面组件
        meta:{
            title:'服务器出错啦',
        }
    },
    {   // 没有权限
        path: '/403',
        name: 'NotPermissions',
        component: NotPermissions, // 403错误页面组件
        meta:{
            title:'没有访问权限',
        }
    },
    {   // 没有登录权限
        path: '/pleaselogin',
        name: 'NotLoginPermissions',
        component: NotLoginPermissions, // 403错误页面组件
        meta:{
            title:'没有登录',
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
