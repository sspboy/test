<template>

<a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head />
    <!--head 导航组件  结束-->

    <!--内容部分 菜单 右侧列表 开始-->
    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
        <menu_left :menudata="PAGEDATA.menudata"/> <!--菜单局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->

      <a-layout-content class="content_border">

        <div style="height: 42px;">
              <!--条件查询组件 开始 -->
              <a-row type="flex">
                <a-col :span="5" :order="1">
                    <!--导航收起按钮-->
                    <a-button type="primary" size="small" style="font-size: 12px;margin-right: 16px;" @click="() => {store.commit('menu/change')}">
                      <menu-unfold-outlined v-if="store.state.menu.coll" class="trigger" />
                      <menu-fold-outlined v-else class="trigger" />
                    </a-button>
                    <!-- {{ PAGEDATA.title }} -->

                </a-col>
                <a-col :span="6" :order="3"></a-col>
              </a-row>
              <!--条件查询组件 结束 -->
          </div>
      </a-layout-content>


    </a-layout>


</a-layout>
</template>

<script>
import {defineComponent, reactive} from 'vue';
import { useStore } from 'vuex'
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined} from '@ant-design/icons-vue';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";

export default defineComponent({
  // 模版名称【品牌资料】
  name: "brandinf",
  // 引用组件
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    menu_left,
    menu_head
  },
  // 父组件数据
  props: {},
  // 组合API返回到模版
  setup(props) {

    const store = useStore();// 共享数据
    const PAGEDATA = reactive({
      title:'品牌资料',
      menudata:{'key':'64','openKeys':'setting'},            // 菜单选中配置
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
    })

    const Add_fun = () => {

    }

    return {
      store,
      Add_fun,
      PAGEDATA,
    }
  }


})
</script>

<style>

</style>