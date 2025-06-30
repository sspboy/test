<template>
<!--条件查询组件 开始 -->
<div style="margin-bottom: 8px;width: 100%;height: 30px;overflow: hidden;">

    <a-row>

        <a-col :span="20">

            <h2 class="page_title">
                <CopyOutlined style="margin:4px 6px 0 0;" />
                {{ page_config.page_title }}
            </h2>

            <a-form
                layout="inline"
                :model="formdata"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
            >

            <a-form-item name="title_key">
                <a-input 
                type="text" 
                class="font_size_12" 
                placeholder="输入标题关键字" 
                v-model:value="formdata.title_key" 
                size="small"
                style="padding: 2px;"
                allowClear
                />
            </a-form-item>

            <a-form-item name="platform">
                <a-select
                    placeholder="商品状态"
                    ref="select"
                    v-model:value="formdata.platform"
                    size="small"
                >
                    <a-select-option value="1">线上</a-select-option>
                    <a-select-option value="3">下线</a-select-option>
                    <a-select-option value="2">删除</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item name="state">
                <a-select 
                size="small"
                placeholder="审核状态"
                ref="select"
                v-model:value="formdata.state"
                >
                    <a-select-option value="1">审核通过</a-select-option>
                    <a-select-option value="2">待审核</a-select-option>
                    <a-select-option value="3">未通过</a-select-option>
                    <a-select-option value="4">待上架</a-select-option>
                    <a-select-option value="5">未提交</a-select-option>
                    <a-select-option value="6">封禁</a-select-option>
                </a-select>
            </a-form-item>
            
            <a-form-item name="cate_name">
                <a-cascader
                    style="width: 180px;"
                    size="small"
                    v-model:value="formdata.cate_name"
                    :options="options"
                    :load-data="loadData"
                    placeholder="商品类目"
                    change-on-select
                />
            </a-form-item> 

            <!-- <a-form-item name="pic_upload_res">
                <a-select 
                ref="select"
                placeholder="选状态"
                style="width: 80px;"
                size="small"
                v-model:value="formdata.pic_upload_res"
                >
                <a-select-option value="1">已上传</a-select-option>
                <a-select-option value="2">未上传</a-select-option>
                </a-select>
            </a-form-item> -->

            <a-form-item name="range-picker" v-bind="rangeConfig" >
               <a-range-picker size="small" v-model:value="formdata.select_time" value-format="YYYY-MM-DD" style="border-radius: 4px;" />
            </a-form-item>

            <a-form-item name="update-time" v-bind="rangeConfig" >
               <a-range-picker size="small" v-model:value="formdata.update_time" value-format="YYYY-MM-DD" style="border-radius: 4px;" />
            </a-form-item>

        </a-form>
        </a-col>
        <a-col :span="4">
            <div style="margin: 4px 0 0 0;">
            <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;float: right;margin-left: 6px;" @click="resh_condition" ghost>重置</a-button>
            <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;float: right;" @click="handleFinish">查询</a-button>
            </div>
        </a-col>
    </a-row>

</div>
<!--条件查询组件 结束 -->
</template>


<script>
import { defineComponent,ref,reactive } from 'vue';
import { CopyOutlined} from '@ant-design/icons-vue';

export default defineComponent({

    name: "Siftcondition",  // 筛选条件查询组件
    // 引用组件
    components: {

        CopyOutlined

    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        // 查询组件信息配置
        const page_config= reactive({
            page_title:'页面标题',
        })


        // 表单绑定数据
        const formdata = reactive({
            title_key: '',  // 标题关键字
            check_status: [],   // 审核状态
            state: [],      // 商品状态
            cate_name: '',  // 商品类目
            create_time:[],     // 创建时间
            update_time:[]      // 更新时间

        });

        // 重置查询条件方法
        const resh_condition=()=>{
            formdata.title_key = '',
            formdata.platform= [],
            formdata.state= [],
            formdata.cate_name= '',
            formdata.select_time=[],
            formdata.update_time=[]
        }

        const options = ref([
            {
                value: '12',
                label: 'Zhejiang',
                isLeaf: false,
            },
            {
                value: '33',
                label: 'Jiangsu',
                isLeaf: false,
            },
        ]);

        const loadData = selectedOptions => {
            const targetOption = selectedOptions[selectedOptions.length - 1];
            targetOption.loading = true;

            // load options lazily
            setTimeout(() => {
                targetOption.loading = false;
                targetOption.children = [
                    {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                    },
                    {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                    },
                ];
                options.value = [...options.value];
            }, 1000);
            
    
        };

        const value = ref([]);

        const rangeConfig = {
            rules: [
            {
                type: 'array',
                required: false,
                message: '请选择日期',
            },
            ],
        };

        // 查询按钮方法
        const handleFinish = values => {
            
            console.log(formdata)

            // console.log(props.data)

            // ctx.emit('sift_callback', formdata)// 回调数据到父组件

            var shop_id = formdata.shop_id

            var shop_name = formdata.shop_name

            // 默认查询条件
            var message = {

                "page":1,

                "page_size":10,

                condition:[{

                    type: "orderby",
                    condition: [{'column_name': 'create_time', 'value': 'DESC', }]

                }]
            }

            // var where_c = {
            //     type: "where",
            //     condition: []
            // }

            // if(shop_id !== ''){
            //     where_c.condition.push({'column_name':'shop_id','value':shop_id,'operator':'='})
            // }

            // if(shop_name !== ''){
            //     where_c.condition.push({'column_name':'shop_name','value':shop_name,'operator':'='})
            // }

            // if(where_c.condition.length > 0){
            //     message.condition.push(where_c)
            // }

            // console.log(message)





        };

        // 错误方法
        const handleFinishFailed = errors => {
            console.log(errors);
        };
    
    return {
        page_config,
        props,
        resh_condition,
        formdata,
        rangeConfig,
        handleFinish,
        handleFinishFailed,
        value,
        options,
        loadData,
        }
    }


})
  
</script>
<style scoped>
.page_title{margin: 2px 0 0 14px;padding-right:34px;float:left;}
</style>