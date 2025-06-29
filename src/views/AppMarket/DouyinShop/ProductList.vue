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

          <!--条件查询组件 开始 -->
          <Siftcondition  @sift_callback="sift_select"/>
          <!--条件查询组件 结束 -->
          
          
          <!--列表组件 开始 -->
          <div :style="{ height: innerHeight + 'px', overflow: 'auto' }">

            <a-list item-layout="horizontal" :data-source="data">
              
              <template #renderItem="{ item }">
                
                <a-list-item style="padding: 14px;">
                  
                  <a-list-item-meta
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  >
                  
                    <template #title>
                      <a href="#">{{ item.title }}</a>
                    </template>

                    
                    <template #avatar>
                      <!-- <a-avatar src="https://joeschmoe.io/api/v1/random" /> -->
                      <div style="width: 45px;height: 45px; background-color:blue;"></div>
                    </template>
                  
                  </a-list-item-meta>

                </a-list-item>

              </template>

            </a-list>

          </div>
          <!--列表组件 结束 -->


          <!--翻页组件：：：发送初始化数据：：监听回传信息  -->
          <nav_pagination :fandata="PAGEDATA" v-on:complete=""/>


      </a-layout-content>




      </a-layout>


</a-layout>
</template>

<script>
import {reactive,ref,onMounted,onUnmounted} from 'vue';
import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import { BorderTopOutlined } from '@ant-design/icons-vue';
// 筛选条件查询组件
import Siftcondition from '@/components/AppMarket/Douyinshop/siftcondition.vue';
import nav_pagination from "@/components/nav_pagination.vue";

// 组件引用=====结束
export default {
  // 模版名称
  name: "ProductList",
  // 引用组件
  components: {
        menu_left,
        menu_head,
        Siftcondition,
        nav_pagination
    },
  // 父组件数据
  props: {},

  // 组合API返回到模版
  setup(props) {

    const store = useStore();   // 共享数据

    const innerHeight = ref(window.innerHeight-190); // 初始化列表高度
    // 组件挂之后---请求数据
    // 定义一个函数来处理窗口大小变化 ==
    const handleResize = () => {
      innerHeight.value = window.innerHeight-190; // 作为表格自适应高度
    };

    // 在组件挂载时添加事件监听器
    onMounted(() => {
        window.addEventListener('resize', handleResize);
    });

    // 在组件卸载时移除事件监听器
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
    // 【组件挂载】========================================结束
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


    // 页面初始换



    // 翻页回调方法


    const data = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
            {
        title: 'Ant Design Title 5',
      },
      {
        title: 'Ant Design Title 6',
      },
      {
        title: 'Ant Design Title 7',
      },
      {
        title: 'Ant Design Title 8',
      },
            {
        title: 'Ant Design Title 9',
      },
      {
        title: 'Ant Design Title 10',
      },
      // {
      //   title: 'Ant Design Title 11',
      // },

    ];






    return {
      innerHeight,
      PAGEDATA,
      store,
      data
    }

  }


}
</script>

<style>


</style>
