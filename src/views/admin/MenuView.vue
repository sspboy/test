<template>
  <a-layout style="height: 100vh;width: 100vw;">


    <!--head 导航组件  开始-->
    <menu_head :headdata="{}" />
    <!--head 导航组件  结束-->

        <!--内容部分 菜单 右侧列表 开始-->
    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="store.state.left.coll" :trigger="null" collapsible>
        <menu_left/> <!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->

      <a-layout-content :style="{ margin: '6px', padding: '14px', background: '#fff',}">
        <div style="height: 42px;">
            <!--条件查询组件 开始 -->
            <a-row type="flex">
              <a-col :span="6" :order="1">
              <!--导航收起按钮-->
                      <menu-unfold-outlined v-if="store.state.left.coll" class="trigger" @click="() => (store.commit('change'))"/>
                      <menu-fold-outlined v-else class="trigger" @click="() => (store.commit('change'))" />
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
import {reactive, ref} from "vue";
import { useStore } from 'vuex'

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

    const store = useStore();// 共享数据

    // 页面获取数据
    const PAGEDATA = reactive({
      menudata:{'key':'6','openKeys':'sub1'},            // 菜单选中配置
      user: {},           // 用户信息
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
      menuconfig:{}       // 菜单配置
    })



    return {
      store,
      collapsed:ref(false),
      PAGEDATA,
    }
  }
}
</script>

<style scoped>

</style>