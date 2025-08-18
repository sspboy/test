<!-- 运费模板 -->
<template>
<a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head />
    <!--head 导航组件  结束-->

    <!--右侧内容部分 开始-->
    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
        <menu_left :menudata="PAGEDATA.menudata"/><!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->


      <!--右侧 内容组件  开始-->
      <a-layout-content class="content_border">
        
        <div style="height: 40px;">
            <a-row>

                <a-col :span="4">
                    <a-button type="primary" size="small" style="font-size: 12px;">
                        <PlusOutlined />
                        新建运费模板
                    </a-button>
                </a-col>
                <a-col offset="12" :span="8">
                    <a-space-compact block size="small">
                        <a-input size="small" placeholder="请输入模板名称" />
                        <a-button type="primary" size="small" style="font-size: 12px;">查询</a-button>
                    </a-space-compact>
                </a-col>
            </a-row>
        </div>


        <div :style="{height:PAGEDATA.innerHeight + 'px'}" class="content_list">

            <a-list
                :grid="{ gutter: 0, column: 4 }"
                size="default"
                :loading="initLoading"
                :data-source="list"
                :split="false"
            >

                <template #renderItem="{ item }">

                    <a-card size="small" style="margin:0px 10px 10px 0;font-size: 12px;">

                        <template #title>
                            <span class="font_size_12">{{ item.template.template_name }}</span>
                        </template>
                        <template #actions>
                            <EyeOutlined />
                            <edit-outlined />
                            <DeleteOutlined />
                        </template>
                    </a-card>
                </template>

                <template #loadMore>
                    <div style="height: 50px;padding: 20px 0 0 0;width: 100%;text-align: center;">
                        <a-button @click="onLoadMore" size="small" style="font-size: 12px;" :loading="loading">加载更多</a-button>
                    </div>
                </template>

            </a-list>
                        
        </div>

      </a-layout-content>

    </a-layout>
</a-layout>



</template>
<script>
import { defineComponent,ref,reactive,onMounted,h,nextTick,onUnmounted } from 'vue';
import { PlusOutlined,EditOutlined,EllipsisOutlined,DeleteOutlined,EyeOutlined } from '@ant-design/icons-vue';

import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

export default {

    name:"FeightTemplate",


    components:{
        EyeOutlined,
        PlusOutlined,
        DeleteOutlined,
        EditOutlined,
        EllipsisOutlined,
        menu_left,
        menu_head,
    },
    setup(props) {

        const PAGEDATA = reactive({

            title:'运费模板',

            menudata:{      // 菜单选中配置
                'key':'94', // 当前菜单key
                'openKeys':'douyinshop' // 一级菜单
            },

            innerHeight:ref(window.innerHeight-150),// 初始化表格高度

        })
        const tool = new TOOL.TOOL()            // 工具方法
        const API = new utils.A_Patch()         // 请求接口地址合集

        const store = useStore();// 共享数据
        
        const initLoading = ref(true);

        const count = ref(0); // 分页
        const total_num = ref(0); // 数据总条数
        const data = ref([]); // 初始化数据对象
        const list = ref([]);

        const loading = ref(false);
        // 组件挂之后---请求数据===============================开始
        // 定义一个函数来处理窗口大小变化 ==
        const handleResize = () => {
            PAGEDATA.innerHeight = window.innerHeight - 150; // 作为表格自适应高度
        };

        // 在组件卸载时移除事件监听器
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        // 【组件挂载】========================================结束
        onMounted(() => {

            const first_Data = {
                "page":count.value,
                "page_size":10, 
            }

          tool.Http_.post(API.AppSrtoreAPI.freight.list, first_Data).then(res=>{
              
            var datarespone = res.data.data;// 数据对象
            var total_num = datarespone.Count; // 数据总条数
            var List = datarespone.List; // 列表数据

            initLoading.value = false;
            console.log('运费模板',List)

            data.value = List;

            list.value = List;

          })

        })


        // 加载更多数据
        const onLoadMore = () => {

            loading.value = true;

            count.value = count.value + 1;

            const get_more_data = {
                "page":count.value,
                "page_size":10, 
            }

            tool.Http_.post(API.AppSrtoreAPI.freight.list, get_more_data).then(res=>{
                
                if(res.data.data == "None"){ // 请求数据为空

                    list.value = data.value;

                    loading.value = false;

                    return tool.Fun_.message('info','没有更多数据了') // 提示信息
                
                }else{ // 请求数据不为空

                    const newData = data.value.concat(res.data.data.List);

                    data.value = newData;

                    list.value = newData;

                    nextTick(() => {
                        window.dispatchEvent(new Event('resize'));
                    });
                    
                    loading.value = false;

                }
                

            })


        };

        // 新建

        // 更新

        // 删除



        return{
          PAGEDATA,
          store,
          innerHeight,
          initLoading,
          loading,
          list,
          onLoadMore

        }
    }

}

</script>

<style scoped>
.content_list{overflow-x: hidden;overflow-y: scroll;}

</style>
