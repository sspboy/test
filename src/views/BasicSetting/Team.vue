<template>
<a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head :headdata="PAGEDATA.user"/>
    <!--head 导航组件  结束-->

          <!--内容部分 菜单 右侧列表 开始-->
    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
        <menu_left :menudata="PAGEDATA.menudata"/> <!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->
    </a-layout>


</a-layout></template>

<script>
import {defineComponent, reactive} from 'vue';
import { useStore } from 'vuex'

// 组件引用=====开始

import menu_left from "@/components/layout/menu_left.vue";
import menu_head from "@/components/layout/menu_head.vue";
export default defineComponent({
  // 模版名称【团队管理】
  name: "Team",
  // 引用组件
  components: {
    menu_left,
    menu_head
  },
  // 父组件数据
  props: {},
  // 组合API返回到模版
  setup(props) {
    const store = useStore();// 共享数据
    store.dispatch('member/get')

    const PAGEDATA = reactive({
      title:'团队管理',
      menudata:{'key':'63','openKeys':'sub0'},            // 菜单选中配置
      user: {},           // 用户信息
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
      menuconfig:{}       // 菜单配置
    })


    return {
      store,
      PAGEDATA,
    }
  }


})
</script>

<style>

</style>