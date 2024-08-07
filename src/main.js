import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './app.vue'
import router from '/src/rute/index.ts'

// 页面标题设置---开始
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// 页面标题设置---结束




// 定义特性标志==禁止控制台警告
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
// 定义特性标志==禁止控制台警告 结束


// 初始化项项目
const app = createApp(App);
app.use(Antd)   // 加载ant design UI框架
app.use(router).mount('#app');



// 登录
// 菜单
// 表格
// 翻页
// 查询