import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './app.vue'
import router from '/src/rute/index.ts' // 全局路由
import store from '/src/staore'         // 全局数据状态共享
import 'css-doodle' // css 特效模块


// 页面标题设置---开始
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// 页面标题设置---结束


// 定义特性标志==禁止控制台警告 开始
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
// 定义特性标志==禁止控制台警告 结束





// 初始化项项目
const app = createApp(App);
app.use(store)  // 初始化Vuex 数据状态共享
app.use(Antd)   // 加载ant design UI框架
app.use(router) // 加载路由

app.mount('#app');