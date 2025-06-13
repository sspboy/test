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

                    <div style="font-size: 12px;padding: 4px 0 0 10px;">

                        已选择商品
                        
                        <a-spin :spinning="props.data.select_loading" :indicator="indicator" />

                        <span v-if="!props.data.select_loading">{{ props.data.product_result_list.length }} </span> 个

                    </div>
                
                </a-space>
            </a-form-item>
        </a-form>

    </div>
</template>

<script> 

import { defineComponent,ref,computed,h} from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';

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

        const moment = require('moment');       // 时间戳转换
        const tool = new TOOL.TOOL()            // 工具方法
        const API = new utils.A_Patch()         // 请求接口地址合集
        const B_Fun = new BatchEdit.B_Fun()     // 批量修改方法

        const first_formRef = ref();

        // 接收父组件数据
        // console.log(props.data)

        // 分类异步请求子分类
        const loadData = selectedOptions => {

            const targetOption = selectedOptions[selectedOptions.length - 1];

            var cid = targetOption.value;       // 分类id

            var isLeaf = targetOption.isLeaf;   // 是否叶子类目

            // console.log(targetOption)

            targetOption.loading = true; // load options

            axios.post(API.AppSrtoreAPI.dou_product.cate, {"cid":cid}).then(res=>{

                console.log(res.data)

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

            // 验证提交表单是否为空
            if(JSON.stringify(submit_obj) === '{}'){

                // 为空则提示输入查询条件
                tool.Fun_.message('warning','请输入查询条件')

            }else{
                
                props.data.select_loading = true;// 查询按钮loading状态
                props.data.product_result_list = [] // 清空结果列表

                submit_obj.page = 1;
                submit_obj.size = 10;
                submit_obj.use_cursor = true;

                console.log(submit_obj)

                setTimeout(()=>{

                    loadproductData(submit_obj).then(()=>{
                        
                        // console.log(props.data.product_result_list.length)

                        props.data.product_result_list = ref([...new Set(props.data.product_result_list)]); // 去重
                        
                        // console.log('数组去重后：：：',formState.product_result_list.length)

                        props.data.select_loading = false; // 查询按钮loading状态

                        // 验证表单字段是否为空或是否正确
                    })


                },1000)

            }

            

        };

        // 重置表单
        const resetForm = () => {
            first_formRef.value.resetFields();
            props.data.product_result_list = [];
        };

        // 查询数据方法
        const loadproductData = async(data) => {
            
            // 合并参数
            var ob = 0

            while (ob < 3) {

                // 请求商品接口
                const res = await axios.post(API.AppSrtoreAPI.dou_product.list, data)
                
                // console.log(res.data)

                const list = res.data.data.data; // 商品列表
                
                if(list.length >0){
                
                    for(let i of list){
                        
                        // console.log(i.category_detail)
                        let category_detail = i.category_detail;

                        let first_cid = category_detail.first_cid;      // 一级分类id
                        let second_cid = category_detail.second_cid;    // 二级分类id
                        let third_cid = category_detail.third_cid;      // 三级分类id
                        let fourth_cid = category_detail.fourth_cid;    // 四级分类id

                        let pic_url = i.pic_url;                // 商品图片
                        let title = i.title;                    // 商品标题
                        let product_id = i.product_id;          // 商品id
                        let status = i.status;                  // 商品状态
                        let check_status = i.check_status;      // 审核状态
                        let create_time = i.create_time;        // 创建时间
                        let update_time = i.update_time;        // 更新时间

                        // 条件 有分类要求
                        var _res = B_Fun.filter_product(data, category_detail)

                        if(_res){

                            // let formattedDate = moment.unix(i.create_time).format('YYYY-MM-DD HH:mm:ss');
                            
                            // console.log(formattedDate)

                            props.data.product_result_list.push(i.product_id)
                        }

                    }
                    
                    ob= ob+1 // 重置游标id
                
                }else{
                
                    ob= ob+3
                
                }

                var cursor_id = res.data.data.cursor_id
                
                // console.log(cursor_id)

                data.cursor_id = cursor_id;// 重置游标id

            }
        }

        // 商品条数loading加载
        const indicator = h(LoadingOutlined, {
            style: {
                fontSize: '12px',
            },
            spinning:false
        });

    
        return {
            first_formRef,
            props,
            indicator,
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