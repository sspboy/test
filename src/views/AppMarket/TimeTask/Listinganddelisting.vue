<!-- 模板说明 -->
<template>
<!--内容部分 菜单 右侧列表 开始-->
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

        <a-layout-content class="content_border" >

          <h1>定时上下架</h1>

        </a-layout-content>

      </a-layout>
  </a-layout>
</template>
<script>
import { computed,ref,reactive,onMounted,h,onUnmounted } from 'vue';

// 网络请求工具引用
import { useStore } from 'vuex'
import axios from "axios";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";
// 组件引用=====开始
export default {
   name:'Listinganddelisting',
   components:{
        menu_left,
        menu_head,
        nav_pagination
   },
props: {
   data:{typr:Object}
},
setup(props,ctx) {
    const store = useStore();// 共享数据
    const tool = new TOOL.TOOL()            // 工具方法
    const API = new utils.A_Patch()         // 请求接口地址合集
    // 组件挂之后---请求数据===============================开始
    const PAGEDATA = reactive({

            title:'定时上下架',
            innerHeight: ref(window.innerHeight - 180), // 初始化列表高度

            menudata:{       // 菜单选中配置
                'key':'109',
                'openKeys':'TimeTask',
                },
            loading:true,         // 列表load状态
            justify:'center',     // 列表内容对齐：loading加载居中设定
            align:'center',       // 列表内容对齐：loading加载居中设定
            // 列表信息
            datalist:[],
            total_number:0,     // 内容总数
            List_conditions:ref({
                page:1
            })
    })

       return{
            PAGEDATA,
            store
       }
   }
}
</script>
<style scoped>
</style>