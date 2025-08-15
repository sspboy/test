<template>



    <!-- 自定义标题 -->

    <div style="width: 100%;height: 28px;padding: 0 0 0 0;">
        <a-row>

            <a-col :span="24">
                <a-form
                    layout="inline"
                     ref="formRef"
                    :model="props.data.List_conditions"
                    @finish="handleFinish"
                >
                <!-- <h3 style="padding: 3px 20px 0 0;">{{ props.data.title }}</h3> -->

                <a-form-item name="product_type" style="width: 90px;">
                    <a-select
                        placeholder="商品类型"
                        ref="select"
                        v-model:value="props.data.List_conditions.product_type"
                        :options="props.data.List_conditions.product_type_op"
                        size="small"
                        allowClear
                    >
                        <a-select-option value="0">普通商品</a-select-option>
                        <a-select-option value="1">新客商品</a-select-option>
                        <a-select-option value="3">虚拟商品</a-select-option>
                        <a-select-option value="6">玉石闪购</a-select-option>
                        <a-select-option value="7">云闪购</a-select-option>
                        <a-select-option value="127">其他</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item name="status">
                    <a-select
                        placeholder="状态"
                        ref="select"
                        v-model:value="props.data.List_conditions.status"
                        :options="props.data.List_conditions.status_op"
                        size="small"
                        allowClear

                    >
                        <a-select-option value="0">在线</a-select-option>
                        <a-select-option value="1">下线</a-select-option>
                        <a-select-option value="2">删除</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item name="check_status" style="width: 90px;">
                    <a-select 
                    size="small"
                    placeholder="审核状态"
                    ref="select"
                    v-model:value="props.data.List_conditions.check_status"
                    :options="props.data.List_conditions.check_status_op"
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

            <a-form-item name="product_id">
                <a-input
                type="text" 
                class="font_size_12"
                style="padding: 2px;"
                allowClear  
                size="small"
                v-model:value="props.data.List_conditions.product_id" 
                placeholder="商品id查询"
                />
            </a-form-item>
            <a-form-item name="title_key">
                <a-input 
                type="text" 
                class="font_size_12"
                style="padding: 2px;"
                allowClear
                placeholder="输入标题关键字" 
                v-model:value="props.data.List_conditions.title_key" 
                size="small"
                />
            </a-form-item>

            <a-form-item name="exist_audit_reject_suggest">
                <a-checkbox v-model:checked="props.data.List_conditions.exist_audit_reject_suggest">只看驳回建议商品</a-checkbox>
            </a-form-item>


            <a-form-item>
                <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;float: right;margin:0 0 0 6px;" @click="onOpen_select" ghost>
                <EllipsisOutlined />
                </a-button>
                <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;float: right;margin:0 0 0 6px;" @click="resh_condition" ghost>重置</a-button>
                <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;float: right;margin:0 0 0 0;" html-type="submit">查询</a-button>
            </a-form-item>

            </a-form>
            </a-col>

        </a-row>
    </div>



    <!-- <a-button type="primary" size="small" style="font-size: 12px;float: right;margin:4px 0 0 6px;" ghost>
        <EllipsisOutlined />
    </a-button> -->
        
    <!--条件查询组件 结束 -->


</template>


<script>
import { defineComponent,ref,reactive,onMounted } from 'vue';
import { CopyOutlined,EllipsisOutlined} from '@ant-design/icons-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import * as PL from '@/assets/douyinshop/ProductList';

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
        const ProList = new PL.ProductList_fun()     // 批量修改方法
        const tool = new TOOL.TOOL()            // 工具方法

        // 查询组件信息配置
        const page_config= reactive({
            page_title:'页面标题',
        })


        const formRef = ref();

        // 重置查询条件方法
        const resh_condition= () =>{

            formRef.value.resetFields();   // 关键：重置为初始值
            ctx.emit('sift_callback', true)

        }

        // 查询按钮方法
        const handleFinish = values => {
            console.log(values)

            const submit_obj = ProList.FromDataverify(values) // 验证表单字段是否为空或是否正确


            ctx.emit('sift_callback', submit_obj)

        };


        // 展开收起方法
        const onOpen_select = () =>{

            props.data.MoreSelectData = !props.data.MoreSelectData.value;

        }


    
    return {
        formRef,
        page_config,
        props,
        resh_condition,
        handleFinish,
        onOpen_select
        }
    }


})
  
</script>
<style scoped>
.page_title{padding-right:34px;float:left;}
</style>