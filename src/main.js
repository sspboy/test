import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './app.vue'
import router from '/src/rute/index.ts'



const app = createApp(App);
app.use(Antd)
app.use(router).mount('#app');



// 登录
// 菜单
// 表格
// 翻页
// 查询