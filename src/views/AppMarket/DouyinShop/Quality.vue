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
        
            <p>商品诊断列表</p>

            <a-list size="large" bordered :data-source="PAGEDATA.datalist">
                <template #renderItem="{ item }">
                    <a-list-item>
                        {{ item.text }}
                    <template #actions>
                    <a key="list-loadmore-edit">查看</a>
                    <a key="list-loadmore-more">more</a>
                    </template>

                    </a-list-item>
                </template>
            </a-list>


        </a-layout-content>

    </a-layout>

</a-layout>


</template>
<script>
import { computed,ref,reactive,onMounted,h } from 'vue';
import { useStore } from 'vuex'
// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
export default {
   name:'quality',
   components:{
        menu_left,
        menu_head,
   },
    props: {
    data:{typr:Object}
    },
    setup(props,ctx) {

        const innerHeight = ref(window.innerHeight-100);// 初始化表格高度

      const store = useStore();// 共享数据

      const PAGEDATA = computed(()=>{

        return reactive({

          title:'诊断中心',
          
          menudata:{       // 菜单选中配置
            'key':'95',
            'openKeys':'douyinshop',
          },

          colum:[],           // 表头信息
            // 列表信息
          datalist:[
            {
                "product_id":"",
                "product_name":"",
                "problem_num_to_improve":"", // 待优化问题数量
                "meet_standard":"",// 商品是否达标
                "text":"Racing car sprays burning fuel into crowd."
            },
            {
                "text":"Japanese princess to wed commoner."
            },
            {
                "text":"Australian walks 100km after outback crash"
            },
            {
                "text":"Racing car sprays burning fuel into crowd."
            },
            {
                "text":"Man charged over missing wedding girl."
            },
            {
                "text":"Los Angeles battles huge wildfires."
            },
            ],
          total_number:0,     // 内容总数

        })

      })
       return{
            PAGEDATA,
          store,
          innerHeight,

       }
   }
}
</script>
<style scoped>
</style>