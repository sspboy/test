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

                        <a-form
                            :model="formState"
                            v-bind="layout"
                            name="nest-messages"
                            :validate-messages="validateMessages"
                            @finish="onFinish"
                        >
                            <a-form-item name="cate_name" label="商品分类" >
                                <a-cascader
                                    size="small"
                                    v-model:value="formState.cate_name"
                                    :options="options"
                                    :load-data="loadData"
                                    placeholder="选择分类"
                                />
                            </a-form-item>

                            <a-form-item name="state" label="审核状态" >
                                <a-select 
                                v-model:value="formState.state" 
                                placeholder="选择状态"
                                :options="formState.state_list" 
                                size="small" 
                                :style="{fontSize:'12px'}"/>
                            </a-form-item>

                            <a-form-item name="create_time" label="创建时间">
                                <a-space direction="vertical">
                                    <a-range-picker
                                        style="font-size: 12px;"
                                        size="small"
                                        :show-time="{ format: 'HH:mm' }"
                                        format="YYYY-MM-DD HH:mm"
                                        :placeholder="['选择开始时间', '选择结束时间']"
                                        @change="onRangeChange"
                                        @ok="onRangeOk"
                                    />
                                </a-space>
                            </a-form-item>
                            
                            <a-form-item name="update_time" label="更新时间">
                                <a-space direction="vertical">
                                    <a-range-picker
                                        style="font-size: 12px;"
                                        size="small"
                                        :show-time="{ format: 'HH:mm' }"
                                        format="YYYY-MM-DD HH:mm"
                                        :placeholder="['选择开始时间', '选择结束时间']"
                                        @change="onRangeChange"
                                        @ok="onRangeOk"
                                    />
                                </a-space>
                            </a-form-item>

                            <a-form-item name="title_key" label="标题关键字">
                                <a-textarea v-model:value="formState.title_key" size="small"/>
                            </a-form-item>

                            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 4 }">
                                <a-space>
                                    <a-button type="primary" html-type="submit" size="small" style="font-size: 12px;">查询</a-button>

                                    <a-button size="small" style="font-size: 12px;">重置</a-button>
                                </a-space>
                            </a-form-item>
                        </a-form>

                    </div>


                </a-col>


                <a-col :span="8">
                    <h4 class="title_h">第二步：修改方式</h4>
                    <div class="bor_r" :style="{height:'80vh'}">
                        <div>
                            <!-- 分段控制器 -->
                            <a-segmented v-model:value="currentTab" block :options="tabs" />

                            <!-- 动态显示关联区域 -->
                            <div v-if="currentTab === 'tab1'">
                            <h2>Tab 1 Content</h2>
                            <p>This is the content of Tab 1.</p>
                            </div>
                            <div v-if="currentTab === 'tab2'">
                            <h2>Tab 2 Content</h2>
                            <p>This is the content of Tab 2.</p>
                            </div>
                            <div v-if="currentTab === 'tab3'">
                            <h2>Tab 3 Content</h2>
                            <p>This is the content of Tab 3.</p>
                            </div>
                        </div>


                    </div>
                </a-col>


                <a-col :span="8">
                    <h4 class="title_h">第三步：处理结果</h4>

                </a-col>
            </a-row>
            
        </a-layout-content>

    </a-layout>

</a-layout>
</template>

<script>
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined} from '@ant-design/icons-vue';
import {defineComponent, onBeforeMount, onMounted, onUnmounted, reactive, ref} from 'vue';
import { Segmented } from 'ant-design-vue';
import { useStore } from 'vuex'
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';

// 组件引用=====开始
import menu_left from "@/components/layout/menu_left.vue";
import menu_head from "@/components/layout/menu_head.vue";
import { Option } from 'ant-design-vue/es/vc-select';

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
    const API = new utils.A_Patch()       // 请求接口地址合集
    const TO = new TABLE.TableOperate()   // 表格操作方法
    const store = useStore();// 共享数据
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度
    const loading = ref(true)// 初始化loading状态

    const PAGEDATA = reactive({
      title:'批量修改',
      menudata:{'key':'92','openKeys':'douyinshop'},            // 菜单选中配置
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
    })

    const layout = {
        labelCol: {span: 4,},
        wrapperCol: {span: 18,},
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    // 表单数据绑定
    const formState = reactive({
        user: {
            name: '',
            age: undefined,
            email: '',
            website: '',
            introduction: '',
        },

        cate_name:[],//分类

        state:undefined,

        state_list:ref([{value:'1',label:'待审核'},{value:'2',label:'审核通过'},{value:'3',label:'审核不通过'}]),//审核状态

        // 创建时间

        // 更新时间

        // 标题关键字
        title_key:ref(undefined),
        
    });


    const onFinish = values => {
        console.log('Success:', values);
    };

    const options =  ref([
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            isLeaf: false,

        },
        {
            value: 'jiangsu',
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
                        // isLeaf: false,

                    },
                    {
                        label: `${targetOption.label} Dynamic 2`,
                        value: 'dynamic2',
                        // isLeaf: false,

                    },

                ];
                options.value = [...options.value];

            }, 1000);
            
    };

    // 时间选择
    const onRangeChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };
    const onRangeOk = value => {
        console.log('onOk: ', value);
    };


    const currentTab = ref('tab1'); // 当前选中的分段值
    const tabs = [
    { label: '主图', value: 'tab1' },
    { label: '标题', value: 'tab2' },
    { label: '发货模式', value: 'tab3' },
    { label: '价格库存', value: 'tab4' },
    { label: '客服电话', value: 'tab5' },
    { label: '其它', value: 'tab6' },

    ];


    return {
      store,
      loading,
      innerHeight,
      PAGEDATA,
      layout,
      validateMessages,
      formState,
      onFinish,
      options,
      loadData,
      onRangeChange,
      onRangeOk,
      currentTab,
      tabs,
    }
    }
})
</script>
<style>
.title_h{padding: 20px 0 10px 0; width: 100%;text-align: center;}
.bor_r{border-right: 1px silver solid;padding:20px 10px 0 30px;}

</style>