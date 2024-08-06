<template>

  <a-layout style="height: 100vh;width: 100vw;">
    <menu_head />




      <a-layout>
          <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>

              <menu_left /> <!--局部组件-->

          </a-layout-sider>

          <a-layout-content :style="{ margin: '6px', padding: '14px', background: '#fff', minHeight: '280px' }">

            <!--条件查询组件-->
            <a-row type="flex">
              <a-col :span="6" :order="1">
                      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
                      <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                saas
              </a-col>
              <a-col :span="6" :order="2">2 col-order-3</a-col>
              <a-col :span="6" :order="3">3 col-order-2</a-col>
              <a-col :span="6" :order="4">4 col-order-1</a-col>
            </a-row>

            <!--表格组件：：发送初始化数据-->
            <navTable :message='message' />

            <!--翻页组件：：：发送初始化数据-->
            <nav_pagination :page_msg="page_msg"/>


          </a-layout-content>

      </a-layout>


  </a-layout>
</template>


<script>
import { ref } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';
import menu_left from '/src/components/layout/menu_left.vue'
import navTable from '/src/components/navTable.vue'
import nav_pagination from "@/components/nav_pagination.vue";
import menu_head from "@/components/layout/menu_head.vue";
export default {
  name:'HomeView',
  components: {
    menu_left,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    navTable,
    nav_pagination,
    menu_head
  },
  setup() {

    let message = ref({'HOME':'home'})
    let page_msg = ref({'page':'page_msg'})

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
      page_msg
    };
  },
};
</script>


<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
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