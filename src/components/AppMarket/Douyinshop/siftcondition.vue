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

            <!-- <h4 style="margin: 5px 0 0 0;padding-right:24px;float:left;"><CopyOutlined style="margin-right: 6px;" />复制记录</h4> -->

            <a-form-item label="标题" name="title_key">
                <a-input type="text" size="small" class="font_size_12" placeholder="输入标题关键字" v-model:value="formdata.title_key" style="width: 100px"/>
            </a-form-item>

            <a-form-item label="平台" name="platform">
                <a-select 
                    size="small" 
                    placeholder="选择"
                    ref="select"
                    v-model:value="formdata.platform"
                    style="width: 80px"
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
                size="small" 
                placeholder="选状态"
                style="width: 80px;"
                v-model:value="formdata.pic_upload_res"
                >
                <a-select-option value="1">已上传</a-select-option>
                <a-select-option value="2">未上传</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item>
                <a-button type="primary" size="small" style="font-size: 12px;float: right;margin-left: 6px;" @click="resh_condition" ghost>重置</a-button>
                <a-button type="primary" size="small" style="font-size: 12px;float: right;" html-type="submit">查询</a-button>
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

<style>

/**下拉表单字体大小设置**/
.ant-select{font-size: 12px !important;}
.custom-select{font-size: 12px !important;}
.ant-select-item-option-content {font-size: 12px !important;}
.ant-select-selection-placeholder {font-size: 12px !important;}
.ant-select-dropdown-menu-item-selected {font-size: 12px !important;}
.ant-select-selection-item{font-size: 12px !important;}
.ant-form-item-label label{font-size: 12px !important;}
/**下拉表单字体大小设置**/
.ant-picker-range{border-radius: 4px !important;}
.ant-picker-range input{padding: 2px 1px !important;font-size: 12px !important;}
</style>