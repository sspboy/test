<template>
<!--条件查询组件 开始 -->
<div style="padding-bottom:4px;margin-bottom: 8px;width: 100%;">

    <a-row type="flex">

        <a-col :span="24">
    
            <a-form
                layout="inline"
                :model="formdata"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
            >

            <h3 class="page_title">
                <CopyOutlined style="margin-right: 6px;" />
                {{ page_config.page_title }}
            </h3>

            <a-form-item label="标题" name="title_key">
                <a-input 
                type="text" 
                class="font_size_12" 
                placeholder="输入标题关键字" 
                v-model:value="formdata.title_key" 
                style="width: 100px"
                size="small"
                />
            </a-form-item>

            <a-form-item label="平台" name="platform">
                <a-select
                    placeholder="选择"
                    ref="select"
                    v-model:value="formdata.platform"
                    style="width: 80px"
                    size="small"
                >
                    <a-select-option value="1">淘宝</a-select-option>
                    <a-select-option value="3">阿里</a-select-option>
                    <a-select-option value="2">天猫</a-select-option>
                    <a-select-option value="4">PDD</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="上传状态" name="state">
                <a-select 
                size="small"
                placeholder="选状态"
                ref="select"
                v-model:value="formdata.state"
                >
                    <a-select-option value="1">已上传</a-select-option>
                    <a-select-option value="0">未上传</a-select-option>
                </a-select>
            </a-form-item>
            
            <a-form-item label="分类" name="cate_name">
                <a-cascader
                    style="width: 180px;"
                    size="small"
                    v-model:value="formdata.cate_name"
                    :options="options"
                    :load-data="loadData"
                    placeholder="选择分类"
                    change-on-select
                />
            </a-form-item> 

            <a-form-item label="图片上传" name="pic_upload_res">
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
            </a-form-item>

<!--            <a-form-item name="range-picker" label="创建日期" v-bind="rangeConfig" >-->
<!--                <a-range-picker size="small" v-model:value="formdata.select_time" value-format="YYYY-MM-DD" />-->
<!--            </a-form-item>-->

            <a-form-item>
                <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;float: right;margin-left: 6px;" @click="resh_condition" ghost>重置</a-button>
                <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;float: right;" html-type="submit">查询</a-button>
            </a-form-item>

        </a-form>
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
            title_key: '',
            platform: [],
            state: [],
            cate_name: '',
            pic_upload_res: [],
            select_time:[]

        });

        // 重置查询条件方法
        const resh_condition=()=>{
            formdata.title_key = '',
            formdata.platform= [],
            formdata.state= [],
            formdata.cate_name= '',
            formdata.pic_upload_res= [],
            formdata.select_time=[]
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

            ctx.emit('sift_callback', formdata)// 回调数据到父组件

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