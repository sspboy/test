<template>
  <a-layout style="height: 100vh;width: 100vw;">
    <!--head 导航组件  开始-->
    <menu_head />
    <!--head 导航组件  结束-->

    <!--内容部分 菜单 右侧列表 开始-->
    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
        <menu_left :menudata="PAGEDATA.menudata"/> <!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->

      <a-layout-content class="content_border">

            <a-breadcrumb >
                <a-breadcrumb-item>商品列表</a-breadcrumb-item>
                <a-breadcrumb-item>List</a-breadcrumb-item>
                <a-breadcrumb-item>App</a-breadcrumb-item>
            </a-breadcrumb>
            <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">Content</div>

      </a-layout-content>

      </a-layout>


</a-layout>
</template>

<script>
import {reactive} from 'vue';
import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import { BorderTopOutlined } from '@ant-design/icons-vue';
// 组件引用=====结束
export default {
  // 模版名称
  name: "ProductList",
  // 引用组件
  components: {
        menu_left,
        menu_head,
    },
  // 父组件数据
  props: {},
  // 组合API返回到模版
  setup(props) {

    const store = useStore();                 // 共享数据

    const PAGEDATA = reactive({
        title:'商品列表',
        menudata:{      // 菜单选中配置
            'key':'78',
            'openKeys':'douyinshop'
        },
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 内容总数
    })


    return {
      PAGEDATA,
      store
    }
  }


}
</script>

<style>
</style>