<template>

  <a-layout style="height: 100vh;width: 100vw;">


      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>

          <menu_left /> <!--局部组件-->

      </a-layout-sider>




      <a-layout>

          <a-layout-content :style="{ margin: '6px', padding: '14px', background: '#fff', minHeight: '280px' }">
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            Content

          </a-layout-content>

      </a-layout>


  </a-layout>
</template>


<script>
import { ref } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';
import menu_left from '/src/components/menu_left.vue'

export default {
  name:'HomeView',
  components: {
    menu_left,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    return {
      selectedKeys: ref(['1']),
      collapsed: ref(false),
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