<!-- 组件 批量修改第一步 -->
<template>
    <div class="bor_r" :style="{height:'80vh'}">

        <a-form ref="first_formRef" 
        :model="props.data" 
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        name="nest-messages" 
        @finish="onFinish">

            <a-form-item name="cate_name" label="商品类目" >
                <a-cascader
                    v-model:value="props.data.cate_name"
                    :options="props.data.options"
                    :load-data="loadData"
                    placeholder="选择分类"
                />
            </a-form-item>

            <a-form-item name="status" label="商品状态" >
                <a-select 
                :allowClear="true"
                v-model:value="props.data.status" 
                placeholder="选择商品状态"
                :options="props.data.state_list" 
                />
            </a-form-item>

            <!-- 审核状态下拉列表 -->
            <a-form-item name="check_status" label="审核状态" >
                <a-select 
                :allowClear="true"
                v-model:value="props.data.check_status" 
                placeholder="选择审核状态"
                :options="props.data.check_status_list" 
                />
            </a-form-item>

            <a-form-item name="create_time" label="创建时间">
                <a-space direction="vertical">
                    <a-range-picker
                        :allowClear="true"
                        v-model:value="props.data.create_time"
                        :placeholder="['选择开始时间', '选择结束时间']"
                        :show-time="{ format: 'HH:mm:ss' }"
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                </a-space>
            </a-form-item>
            
            <a-form-item name="update_time" label="更新时间">
                <a-space direction="vertical">
                    <a-range-picker
                        :allowClear="true"
                        v-model:value="props.data.update_time"
                        :show-time="{ format: 'HH:mm:ss' }"
                        format="YYYY-MM-DD HH:mm:ss"
                        :placeholder="['选择开始时间', '选择结束时间']"
                    />
                </a-space>
            </a-form-item>

            <a-form-item name="title_key" label="文字匹配">
                <a-textarea
                :allowClear="true"
                v-model:value="props.data.title_key" 
                placeholder="标题包含关键字查找" 
                class="font_size_12"/>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 20 , offset: 4 }">
                <a-space>

                    <a-button html-type="submit" size="small" style="font-size: 12px;" :loading="props.data.select_loading">查询商品</a-button>

                    <a-button size="small" style="font-size: 12px;" @click="resetForm">重置</a-button>

                    <div style="font-size: 12px;">已选择商品 {{ props.data.product_result_list.length }} 个</div>
                
                </a-space>
            </a-form-item>
        </a-form>

    </div>
</template>

<script> 

import { defineComponent,reactive,ref,computed } from 'vue';
import axios from 'axios';
import * as utils from '@/assets/JS_Model/public_model';
import * as BatchEdit from '@/assets/douyinshop/BatchEditFun';
import * as TOOL from '@/assets/JS_Model/tool';

export default defineComponent({

    name: "selectproductlist",  // 查询商品

    // 引用组件
    components: {

    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {
        
        const tool = new TOOL.TOOL()            // 工具方法
        const API = new utils.A_Patch()         // 请求接口地址合集
        const B_Fun = new BatchEdit.B_Fun()     // 批量修改方法
        const first_formRef = ref();

        // 接收父组件数据
        console.log(props.data)

        // 分类异步请求子分类
        const loadData = selectedOptions => {

            const targetOption = selectedOptions[selectedOptions.length - 1];

            var cid = targetOption.value;       // 分类id

            var isLeaf = targetOption.isLeaf;   // 是否叶子类目

            console.log(targetOption)

            targetOption.loading = true; // load options

            axios.post(API.AppSrtoreAPI.dou_product.cate, {"cid":cid}).then(res=>{
                console.log(res.data)
                // console.log(formState.options)
                targetOption.loading = false;

                targetOption.children = props.data.get_cate_list(res.data.data)

                props.data.options = [...props.data.options];
            })

            console.log(props.data.cate_name)
                
        };

        // 创建时间选择
        const onCreateChange = (value, dateString) => {
            props.data.create_time = dateString;
        };

        // 更新时间选择
        const onupdateChange = (value, dateString) => {
            props.data.update_time = dateString;
        };

        // 查询商品表单提交
        const onFinish = values => {

            const submit_obj = B_Fun.verify_first_submit(values) // 验证表单字段是否为空或是否正确

            console.log(submit_obj)

            // 验证提交表单是否为空
            if(JSON.stringify(submit_obj) === '{}'){

                // 为空则提示输入查询条件
                tool.Fun_.message('warning','请输入查询条件')

            }else{
                
                // 验证表单字段是否为空或是否正确
                props.data.select_loading = true;// 查询按钮loading状态
                
            }

            props.data.select_loading = false; // 查询按钮loading状态

            // 不为空请求接口

            // 为空则提示输入查询条件

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

                            console.log(list)
                        
                            for(let i of list){formState.product_result_list.push(i.product_id)}
                            
                            ob= ob+3
                        
                        }else{
                        
                            ob= ob+3
                        
                        }

                        var cursor_id = res.data.data.cursor_id
                        
                        console.log(cursor_id)

                        data.cursor_id = cursor_id;// 重置游标id

                    }
                    
                }

                master_get().then(()=>{
                    
                    console.log(formState.product_result_list.length)

                    formState.product_result_list = ref([...new Set(formState.product_result_list)]); // 去重
                    
                    // console.log('数组去重后：：：',formState.product_result_list.length)

                    formState.select_loading = false; // 查询按钮loading状态

                })


            },1000)

        };

        // 重置表单
        const resetForm = () => {
            first_formRef.value.resetFields();
            props.data.product_result_list = [];
        };

    
        return {
            first_formRef,
            props,
            resetForm,
            onFinish,
            loadData,
            onCreateChange,
            onupdateChange,
        }
    }
    
})
</script>
<style>
</style>