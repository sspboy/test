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
                    <!--导航收起按钮-->
                  <a-button type="primary" size="small" style="font-size: 12px;margin-right: 16px;" @click="() => {store.commit('menu/change')}">
                    <menu-unfold-outlined v-if="store.state.menu.coll" class="trigger" />
                    <menu-fold-outlined v-else class="trigger" />
                  </a-button>
                    <a-button type="primary" size="small" style="font-size: 12px;" @click="feight_add.play">
                        新建运费
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
                :grid="{ gutter: 0, column: 5 }"
                size="default"
                :loading="initLoading"
                :data-source="list"
                :split="false"
            >

                <template #renderItem="{ item }">

                    <a-card size="small" style="margin:0px 10px 10px 0;font-size: 12px;">

                        <template #title>
                            <span class="font_size_12">名称：{{ item.template.template_name }}</span>
                        </template>
                        
                        
                        <p style="width: 100%; text-align: left;line-height: 24px;margin: 0;">
                            ID: {{ item.template.id }}
                        </p>


                        <p style="width: 100%; text-align: left;line-height: 24px;margin: 0;">
                            <a-row>
                                <a-col :span="12">
                                    计价:
                                    <span v-if="item.template.calculate_type === 1">按重量计价</span>
                                    <span v-else-if="item.template.calculate_type === 2">按数量计价</span>
                                </a-col>
                                <a-col :span="12">
                                    模板:
                                    <span v-if="item.template.rule_type === 0">阶梯计价</span>
                                    <span v-else-if="item.template.rule_type === 1">固定运费</span>
                                    <span v-else-if="item.template.rule_type === 2">卖家包邮</span>
                                    <span v-else-if="item.template.rule_type === 3">货到付款</span>

                                </a-col>

                            </a-row>
                        

                        
                        </p>
                        

                        <template #actions>
                            <EyeOutlined @click="feight_detail.play(item)"/>
                            <edit-outlined @click="feight_update.play(item)"/>
                            <DeleteOutlined @click="feight_delete.play()"/>
                        </template>
                    </a-card>
                </template>

            </a-list>
                        
        </div>
        <!-- 分页组件 -->
        <nav_pagination :fandata="PAGEDATA" v-on:complete="page_turning"/>

      </a-layout-content>

    </a-layout>
</a-layout>

<!-- 新建运费模板 -->
<a-drawer
    v-model:open="feight_add.open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    title="新建"
    placement="right"
  >
    <p>运费尺码模板</p>
</a-drawer>

<!-- 详情运费模板 -->
<a-drawer
    v-model:open="feight_detail.open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    title="详情"
    placement="right"
  >
    <p>运费模板详情</p>
    <p>运费模板id</p>
    <p>运费模板名称</p>
    <p>计价方式</p>
    <p>快递方式</p>
    <p>模板类型</p>
    <p>固定运费金额(单位:分)</p>

</a-drawer>
<!-- 运费模板更新 -->
<a-drawer
    v-model:open="feight_update.open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    title="编辑"
    placement="right"
  >
    <p>运费模板更新</p>
</a-drawer>

<!--尺码模板删除-->
<a-modal v-model:open="feight_delete.open" title="确认删除" :confirm-loading="feight_delete.confirmLoading" @ok="feight_delete.handleOk">
    <p>是否确认删除？删除后数据将无法恢复。</p>
</a-modal>


</template>
<script>
import { defineComponent,ref,reactive,onMounted,h,nextTick,onUnmounted } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined,PlusOutlined,EditOutlined,EllipsisOutlined,DeleteOutlined,EyeOutlined } from '@ant-design/icons-vue';
import nav_pagination from "@/components/nav_pagination.vue";

import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

export default {

    name:"FeightTemplate",


    components:{
        MenuFoldOutlined, 
        MenuUnfoldOutlined,
        EyeOutlined,
        PlusOutlined,
        DeleteOutlined,
        EditOutlined,
        EllipsisOutlined,
        menu_left,
        menu_head,
        nav_pagination
    },
    setup(props) {

        const PAGEDATA = reactive({

            title:'运费模板',

            menudata:{      // 菜单选中配置
                'key':'94', // 当前菜单key
                'openKeys':'douyinshop' // 一级菜单
            },

            innerHeight:ref(window.innerHeight-180),// 初始化表格高度
            // 默认条件
            total_number:0,// 内容总数
            List_conditions:reactive({
                "page":0,
                "size":10, 
            })
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
            PAGEDATA.innerHeight = window.innerHeight - 180; // 作为表格自适应高度
        };

        // 在组件卸载时移除事件监听器
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        // 【组件挂载】========================================结束
        
        onMounted(() => {

            window.addEventListener('resize', handleResize);// 窗口变换时候
            load_page(navData.value) // 初始化列表数据

        })

        // 翻页查询条件配置:每次翻页只需替换 page size 即可
        const navData = ref({
            "page":0,
            "size":10, 
        })

        // 加载更多数据
        const load_page = (data) => {

            loading.value = true;

            tool.Http_.post(API.AppSrtoreAPI.freight.list, data).then(res=>{

                var datalist = res.data.data.List;// 数据列表
                var Count = res.data.data.Count;// 数据总条数
                // console.log("请求数据",res)
                
                PAGEDATA.total_number = Count;// 数据总条数
                
                if(datalist.length === 0){ // 请求数据为空

                    initLoading.value = false;

                    return tool.Fun_.message('info','没有更多数据了') // 提示信息
                
                }else{ // 请求数据不为空

                    list.value = datalist;

                    initLoading.value = false;

                }
            })
        };

        // 【翻页-组件 回调方法】========================================开始
        const page_turning = (data)=>{

            navData.value.page = data.page-1;
            
            navData.value.size = data.page_size;
            
            initLoading.value = true;

            load_page(navData.value)

        }
        // 【查询组件 回调方法】========================================结束

        // 新建运费详情
        const feight_add = reactive({
            url:"https://fxg.jinritemai.com/ffa/morder/logistics/freight-edit",
            open:ref(false),
            data:ref(undefined),
            play:()=>{
                window.open(feight_add.url)

            }
        })

        // 查看详情
        const feight_detail = reactive({
            open:ref(false),
            data:ref(undefined),
            play:()=>{
                feight_detail.open = true
            }
        })

        // 更新
        const feight_update = reactive({
            open:ref(false),
            data:ref(undefined),
            play:()=>{
                feight_update.open = true
            }
        })

        // 删除
        const feight_delete = reactive({
            open:ref(false),
            data:ref(undefined),
            confirmLoading:ref(false),
            play:()=>{
                feight_delete.open = true
            },
            handleOk:()=>{
                feight_delete.confirmLoading = true
            }
        })

        return{
          PAGEDATA,
          store,
          innerHeight,
          initLoading,
          loading,
          list,
          load_page,
          feight_update,
          feight_delete,
          feight_add,
          feight_detail,
          page_turning
        }
    }

}

</script>

<style scoped>
.content_list{overflow-x: hidden;overflow-y: scroll;}

</style>
