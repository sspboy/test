<template>
    <a-collapse :bordered="false" @change="onOpen_sift">

        <a-collapse-panel key="1" :showArrow="false">

            <!-- 自定义标题 -->
            <template #header>

                <div @click.stop="showCollapse" style="width: 100%;overflow: hidden;height: 28px;">
                    <a-row>

                    <a-col :span="20">
                        <a-form
                            layout="inline"
                            :model="formdata"
                        >
                        <h3 style="padding: 3px 20px 0 0;">{{ props.data.title }}</h3>

                        <a-form-item name="title_key">
                            <a-input 
                            type="text" 
                            class="font_size_12"
                            style="padding: 2px;"
                            allowClear
                            placeholder="输入标题关键字" 
                            v-model:value="formdata.title_key" 
                            size="small"

                            />
                        </a-form-item>

                        <a-form-item name="product_type">
                            <a-select
                                placeholder="商品类型"
                                ref="select"
                                v-model:value="formdata.product_type"
                                size="small"
                                allowClear
                            >
                                <a-select-option value="0">普通</a-select-option>
                                <a-select-option value="1">新客</a-select-option>
                                <a-select-option value="3">虚拟</a-select-option>
                                <a-select-option value="6">玉石闪购</a-select-option>
                                <a-select-option value="7">云闪购</a-select-option>
                                <a-select-option value="127">其他</a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item name="status">
                            <a-select
                                placeholder="商品状态"
                                ref="select"
                                v-model:value="formdata.status"
                                size="small"
                                allowClear
                            >
                                <a-select-option value="0">在线</a-select-option>
                                <a-select-option value="1">下线</a-select-option>
                                <a-select-option value="2">删除</a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item name="check_status">
                            <a-select 
                            size="small"
                            placeholder="审核状态"
                            ref="select"
                            v-model:value="formdata.check_status"
                            allowClear
                            >
                                <a-select-option value="3">审核通过</a-select-option>
                                <a-select-option value="2">待审核</a-select-option>
                                <a-select-option value="4">未通过</a-select-option>
                                <a-select-option value="7">待上架</a-select-option>
                                <a-select-option value="1">未提交</a-select-option>
                                <a-select-option value="5">封禁</a-select-option>
                            </a-select>
                        </a-form-item>
                        
                        <!-- <a-form-item name="cate_name">
                            <a-cascader
                                style="width: 180px;"
                                size="small"
                                v-model:value="formdata.cate_name"
                                :options="formdata.options"
                                :load-data="loadData"
                                placeholder="商品类目"
                                change-on-select
                            />
                        </a-form-item>  -->


                    <a-form-item name="product_id">
                        <a-input
                        type="text" 
                        class="font_size_12"
                        style="padding: 2px;"
                        allowClear  
                        size="small"
                        v-model:value="formdata.product_id" 
                        placeholder="商品id查询"
                        />
                    </a-form-item>

                    <a-form-item name="sku_codes">
                        <a-input
                        type="text" 
                        class="font_size_12"
                        style="padding: 2px;"
                        allowClear  
                        size="small"
                        v-model:value="formdata.sku_codes" 
                        placeholder="商品编码查询"
                        />
                    </a-form-item>

                    <a-form-item name="store_id">
                        <a-input
                        type="text" 
                        class="font_size_12"
                        style="padding: 2px;"
                        allowClear  
                        size="small"
                        v-model:value="formdata.store_id" 
                        placeholder="小时达门店id"
                        />
                    </a-form-item>


                    </a-form>
                    </a-col>
                    <a-col :span="4">
                        <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;float: right;margin:4px 0 0 6px;" @click="resh_condition" ghost>重置</a-button>
                        <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;float: right;margin:4px 0 0 0;" @click="handleFinish">查询</a-button>
                    </a-col>
                    </a-row>
                </div>
            </template>


            <!-- 自定义按钮 -->
            <template #extra>
                <a-button type="primary" size="small" style="font-size: 12px;float: right;margin:4px 0 0 6px;" ghost>
                    <EllipsisOutlined />
                </a-button>
            </template>

            <!--自定义下拉区域 开始 -->
            <div>
                <a-form layout="inline" :model="formdata">

                    <a-form-item name="create_time">
                        <a-range-picker 
                            size="small" 
                            v-model:value="formdata.create_time" 
                            style="border-radius: 4px;width: 240px;"
                            :placeholder="['创建开始时间', '创建结束时间']"
                            :show-time="{ format: 'HH:mm:ss' }"
                            format="YYYY-MM-DD HH:mm:ss"
                        />
                    </a-form-item>

                    <a-form-item name="update_time">
                        <a-range-picker 
                            size="small" 
                            v-model:value="formdata.update_time" 
                            style="border-radius: 4px;width: 240px;"
                            :placeholder="['更新开始时间', '更新结束时间']"
                            :show-time="{ format: 'HH:mm:ss' }"
                            format="YYYY-MM-DD HH:mm:ss"
                        />
                    </a-form-item>

                    <a-form-item name="lookup_option">
                        <a-checkbox-group v-model:value="formdata.lookup_option">
                            <a-checkbox value="need_check_out" name="need_check_out">只显示需要核销的商品</a-checkbox>
                            <a-checkbox value="exist_audit_reject_suggest" name="exist_audit_reject_suggest">只显示有驳回建议的商品</a-checkbox>
                        </a-checkbox-group>
                    </a-form-item>
                </a-form>
            </div>
            <!--条件查询组件 结束 -->

        </a-collapse-panel>
        
    </a-collapse>
</template>


<script>
import { defineComponent,ref,reactive,onMounted } from 'vue';
import { CopyOutlined,EllipsisOutlined} from '@ant-design/icons-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import * as BatchEdit from '@/assets/douyinshop/BatchEditFun';

export default defineComponent({

    name: "Siftcondition",  // 筛选条件查询组件
    // 引用组件
    components: {

        CopyOutlined,
        EllipsisOutlined

    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        const API = new utils.A_Patch()         // 请求接口地址合集
        const B_Fun = new BatchEdit.B_Fun()     // 批量修改方法
        const tool = new TOOL.TOOL()            // 工具方法

        // 查询组件信息配置
        const page_config= reactive({
            page_title:'页面标题',
        })


        // 表单绑定数据
        const formdata = reactive({
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
            title_key: '',                  // 标题关键字
            product_type:undefined,         // 商品类型
            check_status: undefined,        // 审核状态
            status: undefined,              // 商品状态
            cate_name: undefined,           // 商品类目
            options:ref([]),                // 分类选项
            create_time:ref(undefined),     // 创建时间
            update_time:ref(undefined),     // 更新时间
            product_id:ref(undefined),             // id查询
            sku_codes:ref(undefined),              // 商家编码查询
            store_id:ref(undefined),         // 小时达商家门店id
            lookup_option:ref([])
        });

        // 重置查询条件方法
        const resh_condition=()=>{
            formdata.title_key = ''
            formdata.check_status = undefined
            formdata.status= undefined
            formdata.cate_name= undefined
            formdata.create_time = ref(undefined)
            formdata.product_type = ref(undefined)
            formdata.update_time = ref(undefined)
            formdata.lookup_option = ref([])

            ctx.emit('sift_callback', true)

        }

        // 分类异步请求子分类
        const loadData = selectedOptions => {

            const targetOption = selectedOptions[selectedOptions.length - 1];

            var cid = targetOption.value;       // 分类id

            var isLeaf = targetOption.isLeaf;   // 是否叶子类目

            // console.log(targetOption)

            targetOption.loading = true; // load options

            tool.Http_.post(API.AppSrtoreAPI.dou_product.cate, {"cid":cid}).then(res=>{

                console.log(res.data)

                targetOption.loading = false;

                targetOption.children = formdata.get_cate_list(res.data.data)

                formdata.options = [...formdata.options];
            })

            console.log(formdata.cate_name)
                
        };

        onMounted(() => {

            // 分类信息初始化
            tool.Http_.post(API.AppSrtoreAPI.dou_product.cate, {"cid":0}).then(res=>{

                let obj_list = res.data.data

                // console.log(res)

                formdata.options = formdata.get_cate_list(obj_list) 

            })

        });

        // 查询按钮方法
        const handleFinish = values => {

            const submit_obj = B_Fun.verify_first_submit(formdata) // 验证表单字段是否为空或是否正确

            // console.log(submit_obj)

            if(JSON.stringify(submit_obj) === '{}'){
                tool.Fun_.message('warning','请选择查询条件')
            }else{
                ctx.emit('sift_callback', submit_obj)
            }
        };


        // 展开收起方法
        const onOpen_sift = (value) =>{
            
            if(value.length == 0){      // 收起状态

                props.data.innerHeight = props.data.innerHeight + 50;

            }else{      // 展开状态

                props.data.innerHeight = props.data.innerHeight - 50;

            }
        }


    
    return {
        onOpen_sift,
        page_config,
        props,
        resh_condition,
        formdata,
        loadData,
        handleFinish
        }
    }


})
  
</script>
<style scoped>
.page_title{padding-right:34px;float:left;}
</style>