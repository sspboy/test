<template>
  <a-layout style="height: 100vh;width: 100vw;">


    <!--head 导航组件  开始-->
    <menu_head :headdata="{}" />
    <!--head 导航组件  结束-->

        <!--内容部分 菜单 右侧列表 开始-->
    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <menu_left /> <!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->

      <a-layout-content :style="{ margin: '6px', padding: '14px', background: '#fff',}">
        <div style="height: 42px;">
            <!--条件查询组件 开始 -->
            <a-row type="flex">
              <a-col :span="6" :order="1">
              <!--导航收起按钮-->
                      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
                      <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
              </a-col>
              <a-col :span="6" :order="2">2</a-col>
              <a-col :span="6" :order="3">3 col-order-2</a-col>
              <a-col :span="6" :order="4">4 col-order-1</a-col>
            </a-row>
            <!--条件查询组件 结束 -->
          </div>
      </a-layout-content>

    </a-layout>
  </a-layout>
</template>

<script>
// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import nav_pagination from "@/components/nav_pagination.vue";
import menu_head from "@/components/layout/menu_head.vue";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons-vue";
import {ref} from "vue";
// 组件引用=====结束
export default {
  name: "MenuView",
    // 组件加载
  components: {
    menu_left,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    nav_pagination,
    menu_head
  },
  setup() {





    return {
      selectedKeys: ref(['1']),
      collapsed: ref(false),
    }
  }
}
</script>

<style scoped>

</style>