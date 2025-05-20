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

                    <div class="bor_r" :style="{height:'80vh'}">

                        <a-form ref="first_formRef" 
                        :model="formState" 
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 20 }"
                        name="nest-messages" 
                        @finish="onFinish">

                            <a-form-item name="cate_name" label="商品类目" >
                                <a-cascader
                                    size="small"
                                    v-model:value="formState.cate_name"
                                    :options="formState.options"
                                    :load-data="loadData"
                                    placeholder="选择分类"
                                />
                            </a-form-item>

                            <a-form-item name="status" label="商品状态" >
                                <a-select 
                                v-model:value="formState.status" 
                                placeholder="选择状态"
                                :options="formState.state_list" 
                                size="small" 
                                />
                            </a-form-item>

                            <a-form-item name="create_time" label="创建时间">
                                <a-space direction="vertical">
                                    <a-range-picker
                                        v-model:value="formState.create_time"
                                        class="font_size_12"
                                        size="small"
                                        :placeholder="['选择开始时间', '选择结束时间']"
                                        :show-time="{ format: 'HH:mm:ss' }"
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                </a-space>
                            </a-form-item>
                            
                            <a-form-item name="update_time" label="更新时间">
                                <a-space direction="vertical">
                                    <a-range-picker
                                        v-model:value="formState.update_time"
                                        class="font_size_12"
                                        size="small"
                                        :show-time="{ format: 'HH:mm:ss' }"
                                        format="YYYY-MM-DD HH:mm:ss"
                                        :placeholder="['选择开始时间', '选择结束时间']"
                                    />
                                </a-space>
                            </a-form-item>

                            <a-form-item name="title_key" label="标题关键字">
                                <a-textarea v-model:value="formState.title_key" placeholder="标题包含关键字查找" class="font_size_12" size="small"/>
                            </a-form-item>

                            <a-form-item :wrapper-col="{ span: 20 , offset: 4 }">
                                <a-space>

                                    <a-button html-type="submit" size="small" style="font-size: 12px;" :loading="formState.select_loading">查询商品</a-button>

                                    <a-button size="small" style="font-size: 12px;" @click="resetForm">重置</a-button>

                                    <div style="font-size: 12px;">已选择商品 {{ formState.product_result_list.length }} 个</div>
                                
                                </a-space>
                            </a-form-item>
                        </a-form>

                    </div>


                </a-col>


                <a-col :span="8">

                    <h3 class="title_h">第二步：修改字段</h3>

                    <div class="bor_r" :style="{height:'80vh'}">

                        <a-tabs
                            v-model:activeKey="OptfunctionData.activeKey"
                            tab-position="top"
                            :style="{ height: '500px'}"
                            size="small"
                            @tabScroll="OptfunctionData.callback"
                        >

                            <a-tab-pane key="1" tab="标题">

                                <a-form
                                    :model="OptfunctionData"
                                    name="title_form"
                                    :label-col="{ span: 4 }"
                                    :wrapper-col="{ span: 20 }"
                                    labelAlign="left"
                                    autocomplete="off"
                                >

                                    <a-form-item label="过滤文字">
                                        <a-input size="small" class="font_size_12" placeholder="输入关键字" v-model:value="OptfunctionData.title.filter_key" allowClear/>
                                    </a-form-item>
                                    <a-form-item label="替换文字">
                                        <a-space class="font_size_12">
                                            <a-input size="small" class="font_size_12" placeholder="查找文字" v-model:value="OptfunctionData.title.target_key" style="width: 100px;" allowClear/>
                                            替换为
                                            <a-input size="small" class="font_size_12" placeholder="输入文字" v-model:value="OptfunctionData.title.replace_key" style="width: 100px;" allowClear/>
                                        </a-space>
                                    </a-form-item>

                                    <a-form-item label="加前后缀">
                                        <a-space class="font_size_12">
                                            <a-input class="font_size_12" size="small" placeholder="前缀" v-model:value="OptfunctionData.title.after_key" style="width: 100px;" allowClear />
                                            原标题
                                            <a-input class="font_size_12" size="small" placeholder="后缀" v-model:value="OptfunctionData.title.before_key"  style="width: 100px;" allowClear />
                                        </a-space>
                                    </a-form-item>
                                </a-form>

                            </a-tab-pane>

                            <a-tab-pane key="2" tab="客服电话">
                                <a-form
                                    :model="OptfunctionData"
                                    name="mobile_form"
                                    :label-col="{ span: 4 }"
                                    :wrapper-col="{ span: 20 }"
                                    labelAlign="left"
                                    autocomplete="off"
                                >
                                <a-form-item label="客服电话">
                                    <a-input size="small" class="font_size_12" v-model:value="OptfunctionData.mobile" placeholder="输入新的电话替换" allowClear/>
                                </a-form-item>
                                </a-form>
                            </a-tab-pane>

                            <a-tab-pane key="3" tab="库存类型">
                                <a-form
                                    :model="OptfunctionData"
                                    name="reduce"
                                    :label-col="{ span: 4 }"
                                    :wrapper-col="{ span: 20 }"
                                    labelAlign="left"
                                    autocomplete="off"
                                >
                                <a-form-item label="库存类型" name="reduce_type">
                                    <a-select size="small" class="font_size_12" v-model:value="OptfunctionData.reduce_type" placeholder="选择减库存类型" allowClear>
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
                                    :label-col="{ span: 4 }"
                                    :wrapper-col="{ span: 20 }"
                                    labelAlign="left"
                                    autocomplete="off"
                                >
                                    <a-form-item label="运费模板" name="freight_id">
                                        <a-select size="small" class="font_size_12" v-model:value="OptfunctionData.freight_id"  placeholder="选择运费模板" allowClear>
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
                                    :label-col="{ span: 4 }"
                                    :wrapper-col="{ span: 20 }"
                                    labelAlign="left"
                                    autocomplete="off"
                                >
                                    <a-form-item label="发货模式" name="presell_config_level">
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
                        <a-button type="primary" @click="add_task" size="small" :loading="OptfunctionData.sub_load" style="font-size: 12px;">提交</a-button>
                    </div>
                </a-col>


                <a-col :span="8">
                    
                    <h3 class="title_h">第三步：操作记录</h3>
                    <div class="bor_l" :style="{height:'80vh'}">

                        <a-list
                            class="demo-loadmore-list"
                            :loading="initLoading"
                            item-layout="horizontal"
                            :data-source="list"
                        >

                        <template #loadMore>
                            <div
                                :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
                            >
                                <a-button @click="onLoadMore" size="small" style="font-size: 12px;">加载更多</a-button>
                            </div>
                        </template>

                        
                        <template #renderItem="{ item }">

                            <a-list-item>
                                
                                <template #actions>
                                    <a key="list-loadmore-more" class="font_size_12">查看明细</a>
                                </template>

                                <a-skeleton avatar :title="false" :loading="!!item.loading" active>

                                    <a-list-item-meta>
                                        <template #title>
                                            <a href="#">{{ item.shop_id }}</a>
                                        </template>
                                        <template #avatar>
                                            <!-- <a-avatar :src="item.picture.large" /> -->
                                        </template>
                                    </a-list-item-meta>

                                    <div>content</div>
                                
                            </a-skeleton>
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

export default defineComponent({
  // 模版名称【角色管理】
  name: "BatchEdit",
  // 引用组件
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    menu_left,
    menu_head,
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
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
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

        status:0,//审核状态

        state_list:ref([
            {value:0,label:'在售'},
            {value:1,label:'审核中'},
            {value:2,label:'仓库中'},
            {value:3,label:'草稿箱'},
            {value:4,label:'已删除'}
        ]),

        create_time:ref(undefined),// 创建时间

        update_time:ref(undefined),// 更新时间

        title_key:ref(undefined),// 标题关键字

        product_result_list:ref([]) // 商品查询结果

    });


    // 分类异步请求子分类
    const loadData = selectedOptions => {

        const targetOption = selectedOptions[selectedOptions.length - 1];

        var cid = targetOption.value;       // 分类id

        var isLeaf = targetOption.isLeaf;   // 是否叶子类目

        console.log(targetOption)

        targetOption.loading = true; // load options

        axios.post(API.AppSrtoreAPI.dou_product.cate, {"cid":cid}).then(res=>{
            // console.log(res.data)
            // console.log(formState.options)
            targetOption.loading = false;

            targetOption.children = formState.get_cate_list(res.data.data)

            formState.options = [...formState.options];
        })

        console.log(formState.cate_name)
            
    };

    // 创建时间选择
    const onCreateChange = (value, dateString) => {
        formState.create_time = dateString;
    };

    // 更新时间选择
    const onupdateChange = (value, dateString) => {
        formState.update_time = dateString;
    };

    // 查询商品表单提交
    const onFinish = values => {

        // 验证表单字段是否为空或是否正确
        formState.select_loading = true;// 查询按钮loading状态
        
        // console.log('查询商品', values);

        const submit_obj = B_Fun.verify_first_submit(values) // 验证表单字段是否为空或是否正确

        console.log(submit_obj)

        setTimeout(()=>{

            const result = []

            async function master_get() {

                // 请求商品列表数据
                let data = {
                    
                    "page":1,
                    
                    "size":10,

                    "status":0,         //  0-在线；1-下线；2-删除；
                    
                    //"check_status":1,   // 1-未提交；2-待审核；3-审核通过；4-审核未通过；5-封禁；7-审核通过待上架；

                    //"product_type":0,   // 0-普通；1-新客商品；3-虚拟；6-玉石闪购；7-云闪购 ；127-其他类型；
                    
                    // "start_time":"",    // 创建开始时间
                    // "end_time":"",      // 创建结束时间
                    
                    // "update_start_time":"",// 更新开始时间
                    // "update_end_time":"",// 更新结束时间

                    // "name":"",          // 标题模糊查询
                    // "product_id":"",    // 商品id个 
                    // "use_cursor":"",    // 是否使用游标
                    
                    "use_cursor":true,
                    // "cursor_id":"",      // 游标id

                    // "can_combine_product":"", // 是否参加搭配
                    // "lookup_option":{
                    //     "need_name_affix":"", // 是否需要获取标题前后缀
                    //     "need_title_limit":"" // 是否需要获取商品标题长度限制规则
                    //     }, // op
                    // "need_rectification_info":"", // 是否需要自动整改信息
                    // "query_options":{
                    //     "exist_audit_reject_suggest":"", // 只查询有驳回建议的商品
                    //     "need_audit_reject_suggest":""  // 需要返回审核驳回建议信息
                    // }// 查询定制参数

                }
                
                // 合并参数
                var ob = 0

                while (ob < 3) {

                    // 请求商品接口
                    const res = await axios.post(API.AppSrtoreAPI.dou_product.list, data)
                    
                    console.log(res.data)

                    const list = res.data.data.data; // 商品列表
                    
                    if(list.length >0){
                        console.log(list[0].name)
                        for(let i of list){formState.product_result_list.push(i.product_id)}
                        ob= ob+3
                    }else{
                        ob= ob+3
                    }

                    var cursor_id = res.data.data.cursor_id
                    console.log(cursor_id)
                    data.cursor_id = cursor_id

                }
                
                
            }

            master_get().then(()=>{
                
                console.log(formState.product_result_list.length)

                formState.product_result_list = ref([...new Set(formState.product_result_list)]); // 去重
                
                console.log('数组去重后：：：',formState.product_result_list.length)

                formState.select_loading = false; // 查询按钮loading状态

            })


        },1000)

    };

    // 重置表单
    const resetForm = () => {
        first_formRef.value.resetFields();
        formState.product_result_list = [];
    };

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

        tool.Http_.post(API.AppSrtoreAPI.batch.list, {"page":1,"page_size":3, }).then(res=>{
            console.log('批量列表',res)
            initLoading.value = false;
            data.value = res.data.data;
            list.value = res.data.data;
        })

    });

    // 加载更多数据
    const onLoadMore = () => {

        loading.value = true;

        list.value = data.value.concat(
            [...new Array(3)].map(() => ({
                loading: true,
                name: {},
                picture: {},
            })),
        );

        count.value = count.value + 1;

        const get_more_data = {
            "page":count.value,
            "page_size":3, 
        }

        tool.Http_.post(API.AppSrtoreAPI.batch.list, get_more_data).then(res=>{
            console.log(res)
            if(res.data.data == "None"){
                list.value = data.value;
                return tool.Fun_.message('info','没有更多数据了') // 提示信息
            
            }else{

                const newData = data.value.concat(res.data.data);

                loading.value = false;

                data.value = newData;
                list.value = newData;

                nextTick(() => {
                    window.dispatchEvent(new Event('resize'));
                });
            }
            

        })


    };

    return {

      store,
      loading,
      innerHeight,
      PAGEDATA,

      // 请求商品方法
      first_formRef,
      formState,
      resetForm,
      onFinish,
      loadData,
      onCreateChange,
      onupdateChange,
      
      // 操作方法
      OptfunctionData,
      add_task,


      // 任务查询
      initLoading,
      list,
      onLoadMore,



    }
    }
})
</script>
<style scoped>
.title_h{padding: 20px 0 10px 0; width: 100%;text-align: center;}
.bor_r{border-right: 1px #f2f2f2 solid;padding:20px 30px 0 30px;}
.bor_l{padding:20px 30px 0 30px;}
.xiuga{padding: 20px 0 0 0;height: 280px;}
.font_size_12{font-size: 12px;}
</style>