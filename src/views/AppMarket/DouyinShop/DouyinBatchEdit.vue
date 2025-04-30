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

                    <h4 class="title_h">第一步：选择商品</h4>

                    <div class="bor_r" :style="{height:'80vh'}">
                        <a-form
                            :model="formState"
                            v-bind="layout"
                            name="nest-messages"
                            :validate-messages="validateMessages"
                            @finish="onFinish"
                        >
                            <a-form-item :name="['user', 'name']" label="商品分类" :rules="[{ required: true }]">
                                <a-input v-model:value="formState.user.name" size="small" />
                            </a-form-item>
                            <a-form-item :name="['user', 'email']" label="审核状态" >
                                <a-select v-model:value="formState.state" :options="state.data" size="small" :style="{fontSize:'12px'}"/>
                            </a-form-item>
                            <a-form-item :name="['user', 'age']" label="创建时间">
                                <a-input v-model:value="formState.user.age" size="small"/>
                            </a-form-item>
                            <a-form-item :name="['user', 'website']" label="更新时间">
                                <a-input v-model:value="formState.user.website" size="small"/>
                            </a-form-item>
                            <a-form-item :name="['user', 'introduction']" label="标题关键字">
                                <a-textarea v-model:value="formState.user.introduction" size="small"/>
                            </a-form-item>
                            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 4 }">
                            <a-button type="primary" html-type="submit">查询</a-button>
                            </a-form-item>
                        </a-form>

                    </div>


                </a-col>


                <a-col :span="8">
                    <h4 class="title_h">第二步：修改方式</h4>
                    <div class="bor_r" :style="{height:'80vh'}">



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
    const formState = reactive({
        user: {
            name: '',
            age: undefined,
            email: '',
            website: '',
            introduction: '',
        },
        state:undefined
    });
    const state = reactive({
        data:[{value:'1',label:'待审核'},{value:'2',label:'审核通过'},{value:'3',label:'审核不通过'}]
    });
    const onFinish = values => {
    console.log('Success:', values);
    };









    return {
      store,
      loading,
      innerHeight,
      PAGEDATA,
      layout,
      validateMessages,
      formState,
      onFinish,
      state,

    }
    }
})
</script>
<style>
.title_h{padding: 20px 0 10px 0; width: 100%;text-align: center;}
.bor_r{border-right: 1px silver solid;padding:20px 20px 0 40px;}
.ant-col{font-size: 12px;}
</style>