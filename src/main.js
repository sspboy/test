import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './app.vue'
import router from '/src/rute/index.ts'


// 定义特性标志==禁止控制台警告
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

// 初始化项项目
const app = createApp(App);
app.use(Antd)
app.use(router).mount('#app');



// 登录
// 菜单
// 表格
// 翻页
// 查询