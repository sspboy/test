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

            <a-row>

                <a-col :span="8">
                    <h3 class="title_h">第一步：选择商品</h3>
                    <first_step :data="formState"/>
                </a-col>




                <a-col :span="8">

                    <h3 class="title_h">第二步：修改字段</h3>

                    <div class="bor_r" :style="{height:'80vh'}">

                        <a-tabs
                            v-model:activeKey="OptfunctionData.activeKey"
                            tab-position="top"
                            :style="{ height: '500px'}"
                            @tabScroll="OptfunctionData.callback"
                        >

                            <a-tab-pane key="1" tab="标题">

                                <a-form
                                    :model="OptfunctionData"
                                    name="title_form"
                                    labelAlign="left"
                                    autocomplete="off"
                                >

                                    <a-form-item>
                                        <a-input  class="font_size_12" placeholder="输入标题中需要删除的关键字" v-model:value="OptfunctionData.title.filter_key" allowClear/>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-space>
                                            <a-input  class="font_size_12" placeholder="查找文字" v-model:value="OptfunctionData.title.target_key" style="width: 100px;" allowClear/>
                                            替换为
                                            <a-input class="font_size_12" placeholder="输入文字" v-model:value="OptfunctionData.title.replace_key" style="width: 100px;" allowClear/>
                                        </a-space>
                                    </a-form-item>

                                    <a-form-item>
                                        <a-space class="font_size_12">
                                            <a-input class="font_size_12" placeholder="标题前缀" v-model:value="OptfunctionData.title.after_key" style="width: 100px;" allowClear />
                                            原标题
                                            <a-input class="font_size_12" placeholder="标题后缀" v-model:value="OptfunctionData.title.before_key"  style="width: 100px;" allowClear />
                                        </a-space>
                                    </a-form-item>
                                </a-form>

                            </a-tab-pane>

                            <a-tab-pane key="2" tab="客服电话">
                                <a-form
                                    :model="OptfunctionData"
                                    name="mobile_form"
                                    labelAlign="left"
                                    autocomplete="off"
                                >
                                <a-form-item>
                                    <a-input class="font_size_12" v-model:value="OptfunctionData.mobile" placeholder="输入新的电话替换" allowClear/>
                                </a-form-item>
                                </a-form>
                            </a-tab-pane>

                            <a-tab-pane key="3" tab="库存类型">
                                <a-form
                                    :model="OptfunctionData"
                                    name="reduce"
                                    labelAlign="left"
                                    autocomplete="off"
                                >
                                <a-form-item name="reduce_type">
                                    <a-select class="font_size_12" v-model:value="OptfunctionData.reduce_type" placeholder="选择减库存类型" allowClear>
                                        <a-select-option value="1">拍下减库存</a-select-option>
                                        <a-select-option value="2">付款减库存</a-select-option>
                                    </a-select>
                                </a-form-item>
                                </a-form>
                            </a-tab-pane>

                            <a-tab-pane key="4" tab="运费模板">
                                <a-form
                                    :model="OptfunctionData"
                                    name="freight"
                                    labelAlign="left"
                                    autocomplete="off"
                                >
                                    <a-form-item name="freight_id">
                                        <a-select class="font_size_12" v-model:value="OptfunctionData.freight_id"  placeholder="选择运费模板" allowClear>
                                            <a-select-option value="1">异步加载更多模板</a-select-option>
                                            <a-select-option value="2">付款减库存</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>

                            <a-tab-pane key="5" tab="发货模式">
                                <a-form
                                    :model="OptfunctionData"
                                    name="presell"
                                    labelAlign="left"
                                    autocomplete="off"
                                >
                                    <a-form-item name="presell_config_level">
                                        <a-radio-group v-model:value="OptfunctionData.presell_config_level">
                                            <a-radio class="font_size_12" value="1">现货</a-radio>
                                            <a-radio class="font_size_12" value="2">现货+预售</a-radio>
                                        </a-radio-group>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>

                        </a-tabs>

                    </div>

                    <div style="text-align: center;">
                        <a-button type="primary" @click="add_task" size="small" :loading="OptfunctionData.sub_load" style="font-size: 12px;">提交批量修改任务</a-button>
                    </div>

                </a-col>




                <a-col :span="8">
                    
                    <h3 class="title_h">第三步：操作记录</h3>
                    <div class="bor_l" :style="{height:'80vh'}">

                        <a-list
                            :loading="initLoading"
                            item-layout="horizontal"
                            :data-source="list"
                        >
                    

                        <template #loadMore>

                            <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                                <a-button @click="onLoadMore" size="small" style="font-size: 12px;" :loading="loading">加载更多</a-button>
                            </div>
                            
                        </template>

                        
                        <template #renderItem="{ item }">

                            <a-list-item>

                                <a-skeleton :title="true" :paragraph="false" :loading="!!item.loading" active>

                                    <a-list-item-meta>

                                        <template  #title>
                                            {{ item.create_time }}
                                            <span class="font_size_12" style="font-weight:normal;">
                                                提交 {{ item.number }} 个 修改商品
                                            </span>

                                        </template>

                                    </a-list-item-meta>

                                </a-skeleton>

                                
                                <template v-if="item.id !== undefined" #actions>
                                    <a href="#" key="list-loadmore-more" class="font_size_12">查看</a>
                                    <a href="#" class="font_size_12">删除</a>
                                </template>

                            </a-list-item>
                            
                        </template>

                        </a-list>

                    </div>

                </a-col>

            </a-row>
            
        </a-layout-content>

    </a-layout>

</a-layout>
</template>

<script>
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined} from '@ant-design/icons-vue';
import {defineComponent, onBeforeMount, onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import { Segmented } from 'ant-design-vue';
import { useStore } from 'vuex'
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';

import * as TOOL from '@/assets/JS_Model/tool';

import * as BatchEdit from '@/assets/douyinshop/BatchEditFun';
import axios from "axios";// 网络请求方法

// 组件引用=====开始
import menu_left from "@/components/layout/menu_left.vue";
import menu_head from "@/components/layout/menu_head.vue";
import Operation from 'ant-design-vue/es/transfer/operation';
import first_step from "@/components/AppMarket/Douyinshop/batchedit/FirstStep.vue";

export default {

  // 模版名称【角色管理】
  name: "BatchEdit",
  // 引用组件
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    menu_left,
    menu_head,
    first_step
  },
  // 父组件数据
  props: {},
  // 组合API返回到模版
  setup() {
    // 【数据绑定】=======================================>开始
    const API = new utils.A_Patch()         // 请求接口地址合集
    const TO = new TABLE.TableOperate()     // 表格操作方法
    const store = useStore();               // 共享数据
    const tool = new TOOL.TOOL()            // 工具方法
    const B_Fun = new BatchEdit.B_Fun()     // 批量修改方法
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度

    const PAGEDATA = reactive({
      title:'批量修改',
      menudata:{'key':'92','openKeys':'douyinshop'},            // 菜单选中配置
    })

    // 表单数据绑定
    const first_formRef = ref();

    // 查询商品表单数据绑定
    const formState = reactive({
        
        // 类目列表转换
        get_cate_list:(obj)=>{ 
            var obj_list = []
            for(let i of obj){
                let cate_obj = {}
                cate_obj.value = i.id;
                cate_obj.label = i.name;
                cate_obj.isLeaf = i.is_leaf;
                obj_list.push(cate_obj)
            }
            return obj_list
        },

        // 查询按钮loading
        select_loading:ref(false),
        
        options:ref([]),// 分类选项

        cate_name:undefined,//分类

        status:undefined,//商品状态
        
        check_status:undefined, // 审核状态
        
        // 状态下拉列表
        state_list:ref([
            {value:0,label:'在线'},
            {value:1,label:'下线'},
            {value:2,label:'删除'}
        ]),

        // 审核下拉选项列表
        check_status_list:ref([
            {value:3,label:'审核通过'},
            {value:4,label:'审核未通过'},
            {value:1,label:'未提交'},
            {value:2,label:'待审核'},
            {value:5,label:'封禁'},
            {value:7,label:'审核通过待上架'},
        ]),

        create_time:ref(undefined),// 创建时间

        update_time:ref(undefined),// 更新时间

        title_key:ref(undefined),// 标题关键字

        product_result_list:ref([]) // 商品查询结果

    });






    // 批量修改-操作方法
    const OptfunctionData = reactive({

        activeKey:ref('1'),// 选中标签

        callback:val=>{// 标签切换回掉
            console.log(val)
        },

        sub_load:ref(false),// 提交按钮loading

        // 标题
        title:{

            after_key: undefined,       // 前缀
            before_key: undefined,      // 后缀
            replace_key: undefined,     // 替换关键字
            target_key:undefined,       // 目标关键字
            filter_key: undefined,      // 过滤关键字

        },

        mobile:undefined,// 客服电话

        reduce_type:undefined,// 库存类型

        freight_id:undefined,// 运费模板
        
        presell_config_level:undefined// 发货模式

    });

    // 提交任务
    const add_task = () => {

        OptfunctionData.sub_load = true;    // 提交按钮loading

        let submit_obj = B_Fun.verify_second_submit(OptfunctionData) // 验证表单字段是否为空或是否正确

        if(formState.product_result_list.length == 0){      // 验证商品id是否为空

            OptfunctionData.sub_load = false;    // 提交按钮loading

            return tool.Fun_.message('error','【第一步】选择商品不能为空') // 提示信息

        }else if(JSON.stringify(submit_obj) === '{}'){      // 验证条件是否为空
            
            OptfunctionData.sub_load = false;    // 提交按钮loading

            return tool.Fun_.message('error','【第二步】修改字段不能为空') // 提示信息

        }else{ // 提交任务

            const data = {

                "product_list": JSON.stringify(formState.product_result_list),  // 商品id列表
                "setting": JSON.stringify(submit_obj),                          // 修改条件
                "number":JSON.stringify(formState.product_result_list.length),  // 修改数量

            }
            
            console.log(data)

            tool.Http_.post(API.AppSrtoreAPI.batch.add, data).then(res=>{

                console.log(res)
                setTimeout(()=>{
                    OptfunctionData.sub_load = false;      // 提交按钮loading
                    tool.Fun_.message('success','提交成功') // 提示信息
                    // window.location.reload()               // 刷新页面
                },1000)

            })
        }
    }


    //* 处理结果列表加载 *//
    const count = ref(1); // 每次加载3条数据
    const initLoading = ref(true);
    const loading = ref(false);
    const data = ref([]);
    const list = ref([]);
    
    onMounted(() => {
        
        // 分类信息初始化
        tool.Http_.post(API.AppSrtoreAPI.dou_product.cate, {"cid":0}).then(res=>{

            let obj_list = res.data.data

            console.log(res)

            formState.options = formState.get_cate_list(obj_list) 

        })


        const first_Data = {
            "page":1,
            "page_size":3, 
            "condition":[{"type": "orderby", "condition": [{"column_name": "create_time", "value": "desc"}]}]
        }

        tool.Http_.post(API.AppSrtoreAPI.batch.list, first_Data).then(res=>{
            
            // console.log('批量列表',res)
            
            initLoading.value = false;
            
            data.value = res.data.data;

            list.value = res.data.data;

        })

    });

    // 加载更多数据
    const onLoadMore = () => {

        loading.value = true;

        list.value = data.value.concat(
            [...new Array(1)].map(() => ({
                loading: true,
                name: {},
                picture: {},
            })),
        );

        count.value = count.value + 1;

        const get_more_data = {
            "page":count.value,
            "page_size":3, 
            "condition":[{"type": "orderby", "condition": [{"column_name": "create_time", "value": "desc"}]}]

        }

        tool.Http_.post(API.AppSrtoreAPI.batch.list, get_more_data).then(res=>{
            
            // console.log(res)

            if(res.data.data == "None"){ // 请求数据为空

                list.value = data.value;

                loading.value = false;

                return tool.Fun_.message('info','没有更多数据了') // 提示信息
            
            }else{ // 请求数据不为空

                const newData = data.value.concat(res.data.data);

                data.value = newData;

                list.value = newData;

                nextTick(() => {
                    window.dispatchEvent(new Event('resize'));
                });
                
                loading.value = false;

            }
            

        })


    };

    return {

      store,
      loading,
      innerHeight,
      PAGEDATA,

      // 请求商品方法
      formState,

      
      // 操作方法
      OptfunctionData,
      add_task,


      // 任务查询
      initLoading,
      list,
      onLoadMore,



    }
    }
}
</script>
<style scoped>
.title_h{padding: 20px 0 10px 0; width: 100%;text-align: center;}
.bor_r{border-right: 1px #f2f2f2 solid;padding:20px 30px 0 30px;}
.bor_l{padding:20px 30px 0 30px;}
.xiuga{padding: 20px 0 0 0;height: 280px;}
.font_size_12{font-size: 12px;}
</style>