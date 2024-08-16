<template>

  <a-layout style="height: 100vh;width: 100vw;">


    <!--head 导航组件  开始-->
    <menu_head />
    <!--head 导航组件  结束-->



    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <menu_left /> <!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->


      <a-layout-content :style="{ margin: '6px', padding: '14px', background: '#fff', minHeight: '280px' }">

          <!--条件查询组件 开始 -->
          <a-row type="flex">
            <a-col :span="6" :order="1">
              <!--导航收起按钮-->
                    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
                    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            </a-col>
            <a-col :span="6" :order="2">2 col-order-3</a-col>
            <a-col :span="6" :order="3">3 col-order-2</a-col>
            <a-col :span="6" :order="4">4 col-order-1</a-col>
          </a-row>
          <!--条件查询组件 结束 -->


          <!--表格组件：：发送初始化数据  -->
          <navTable :message='message' />

          <!--翻页组件：：：发送初始化数据：：监听回传信息  -->
          <nav_pagination :page_msg="page_msg" v-on:complete="console.log(page_new)"/>

      </a-layout-content>

    </a-layout>

  </a-layout>


</template>


<script>
import axios from 'axios';
axios.defaults.timeout = 1000; // 1秒 设置全局超时时间（以毫秒为单位）
import { useRouter } from "vue-router"; // 导入路由
import { ref, provide,reactive,onBeforeMount, onMounted } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';
import menu_left from '/src/components/layout/menu_left.vue'
import navTable from '/src/components/navTable.vue'
import nav_pagination from "@/components/nav_pagination.vue";
import menu_head from "@/components/layout/menu_head.vue";

export default {

  name:'UserView',

  components: {
    menu_left,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    navTable,
    nav_pagination,
    menu_head
  },
  setup() {

    // 获取登录传递的用户信息


    // loading

    // 组件挂在之前---请求鉴权===》渲染组件
    onBeforeMount(()=>{

      const request_data = {
          "page":1,
          "page_size":10
      }

      axios.post('api/admin/user/list', request_data).then((response)=>{

        const user_data = response.data

        console.log(user_data)

      }).catch(function (error) {

        console.log(error);

      });

    })

    // 组件挂载之后---请求数据接口===》加载数据
    onMounted(() => {
          console.log('在组件挂载后执行');
    });


    // 【用户信息】【导航】【菜单】【渲染内容】

    // 请求接口获取用户数据

    // 头部信息

    // 获取菜单信息

    // 功能权限

    // 当前路由

    let message = ref({'HOME':'home'}) // 发送给表格组件的信息

    let page_msg = ref({'page':'page_msg'}) // 发送给翻页组件的信息

    let page_new = reactive({'now_page':0,'page_size':10})// 组测共享信息：当前页数；页面数据条数


    // 跨组件传递信息：：：注入信息
    provide('page_new', page_new);


    const start=()=>{

      // 打开页面

      // loading...加载...

      // 权限验证

      // 有权限
        // 加载菜单组件
        // 加载内容组件
        // 加载翻页组件

      // 无权限

    }

    return {
      selectedKeys: ref(['1']),
      collapsed: ref(false),
      start,
      message,
      page_msg,
      page_new
    };


  },
};
</script>


<style scoped>

#components-layout-demo-custom-trigger .trigger {
  font-size: 12px;line-height: 64px;padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>