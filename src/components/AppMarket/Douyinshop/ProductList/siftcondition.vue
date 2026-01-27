<template>

    <!-- 自定义标题 -->
    <div style="width: 1500px;height: 40px;clear: both;" >

            <a-form
                layout="inline"
                ref="formRef"
                autocomplete="off"
                :model="props.data.List_conditions"
                @finish="handleFinish"
                style="float: left;margin: -4px 0 0 0;"
            >
                <a-form-item>
                    <a-button type="primary" size="small" style="font-size: 12px;" @click="show_add">
                    <PlusOutlined />
                    新建商品
                </a-button>
                </a-form-item>
                <a-form-item>
                    <a-radio-group v-model:value="RadioValue" size="small" @change="handle_menu_change">
                        <a-radio-button value="All" style="font-size: 12px;">全部商品</a-radio-button>
                        <a-radio-button value="OnSale" style="font-size: 12px;">售卖中</a-radio-button>
                        <a-radio-button value="WareHouse" style="font-size: 12px;">已下架</a-radio-button>
                        <a-radio-button value="Ban" style="font-size: 12px;">已封禁</a-radio-button>
                        <a-radio-button value="UnderReview" style="font-size: 12px;">审核中</a-radio-button>
                        <a-radio-button value="Reject" style="font-size: 12px;">审核驳回</a-radio-button>
                        <a-radio-button value="Pass" style="font-size: 12px;">审核通过</a-radio-button>
                        <a-radio-button value="Draft" style="font-size: 12px;">草稿箱</a-radio-button>
                        <a-radio-button value="RecycleBin" style="font-size: 12px;">回收站</a-radio-button>
                    </a-radio-group>
                </a-form-item>

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

                <a-form-item>
                    <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;float: right;margin:0 0 0 6px;" @click="onOpen_select" ghost>
                    更多<EllipsisOutlined />
                    </a-button>
                    <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;float: right;margin:0 0 0 0;" html-type="submit">查询</a-button>


                </a-form-item>
            </a-form>
    </div>
        
    <!--条件查询组件 结束 -->


</template>


<script>
import { defineComponent,ref,reactive,onMounted } from 'vue';
import { CopyOutlined,EllipsisOutlined,UnorderedListOutlined,TableOutlined,PlusOutlined} from '@ant-design/icons-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import * as PL from '@/assets/douyinshop/ProductList';

export default defineComponent({

    name: "Siftcondition",  // 筛选条件查询组件
    // 引用组件
    components: {
        TableOutlined,
        UnorderedListOutlined,
        CopyOutlined,
        EllipsisOutlined,
        PlusOutlined
    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        const API = new utils.A_Patch()         // 请求接口地址合集
        const ProList = new PL.ProductList_fun()     // 批量修改方法
        const tool = new TOOL.TOOL()            // 工具方法
        const RadioValue = ref('All');            // 列表导航单选框默认值
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
            const submit_obj = ProList.FromDataverify(values) // 验证表单字段是否为空或是否正确
            ctx.emit('sift_callback', submit_obj)
        };


        // 展开收起方法
        const onOpen_select = () =>{

            props.data.MoreSelectData = !props.data.MoreSelectData.value;

        }

        // 添加商品信息
        const show_add = () =>{
            props.data.AddDate = true;
        }

        // 列表菜单切换方法
        const handle_menu_change = (e) => {
            if(RadioValue.value == 'All'){// 全部商品
                ctx.emit('sift_callback', 'All')
            }else if(RadioValue.value == 'OnSale'){// 在线售卖中
                ctx.emit('sift_callback', 'OnSale')
            }else if(RadioValue.value == 'UnderReview'){// 审核中
                ctx.emit('sift_callback', 'UnderReview')
            }else if(RadioValue.value == 'Draft'){// 草稿箱
                ctx.emit('sift_callback', 'Draft')
            }else if(RadioValue.value == 'Reject'){// 驳回商品
                ctx.emit('sift_callback', 'Reject')
            }else if(RadioValue.value == 'RecycleBin'){// 回收站
                ctx.emit('sift_callback', 'RecycleBin')
            }else if(RadioValue.value == 'WareHouse'){// 仓库中
                ctx.emit('sift_callback', 'WareHouse')
            }else if(RadioValue.value == 'Ban'){// 已封禁
                ctx.emit('sift_callback', 'Ban')
            }else if(RadioValue.value == 'Pass'){// 审核通过
                ctx.emit('sift_callback', 'Pass')
            }
        }



    return {
        formRef,
        page_config,
        props,
        resh_condition,
        handleFinish,
        onOpen_select,
        show_add,
        RadioValue,
        handle_menu_change
        }
    }


})
  
</script>
<style scoped>
.page_title{padding-right:34px;float:left;}
</style>