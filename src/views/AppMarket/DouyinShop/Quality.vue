<!-- 模板说明 -->
<template>

<!--内容部分 菜单 右侧列表 开始-->
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

        <a-layout-content class="content_border" >
        
            <div>
                <a-row>
                    <a-col :span="12">
                        <a-radio-group 
                            v-model:value="conditionData.data_type" 
                            button-style="solid" 
                            class="font_size_12"
                            @change="Tabchange"
                            >
                            <a-radio-button value="0">待诊断</a-radio-button>
                            <a-radio-button value="1">待优化</a-radio-button>
                            <a-radio-button value="2">已修改审核中</a-radio-button>
                            <a-radio-button value="3">已优化</a-radio-button>
                        </a-radio-group>


                    </a-col>
                    <a-col :span="10">
                        <a-input 
                            placeholder="商品id查询"
                            type="text" 
                            class="font_size_12"
                            style="padding: 2px;width: 140px;"
                            allowClear  
                            size="small"
                        ></a-input>
                        <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;margin:0 0 0 6px;">查询</a-button>
                    </a-col>
                </a-row>
            </div>


        <a-flex :style="{height:PAGEDATA.innerHeight + 'px'}" class="FlexBox" :justify="PAGEDATA.justify" :align="PAGEDATA.align">

            <a-list 
                size="default"
                :data-source="PAGEDATA.datalist"
                :loading="PAGEDATA.loading" 
                style="width: 100%;"
                :split="true"
                >
                <template #renderItem="{ item }">
                    <a-list-item>
                        
                        {{ item.product_id }}

                        {{ item.product_name }}
                        <template #actions>
                        <a key="list-loadmore-edit">查看</a>
                        <a key="list-loadmore-more">更多</a>
                        </template>
                    </a-list-item>
                </template>
            </a-list>
        </a-flex>



            <!--翻页组件 -->
            <span style="padding:14px 0 0 0 ;display: block;float: left;">
                <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 6px;" ghost><RedoOutlined /> 刷新列表</a-button>
                <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 6px;" ghost><DeleteOutlined /> 批量删除</a-button>
                <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 6px;" ghost><EditOutlined /> 批量修改</a-button>
                <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 0;" ghost ><CheckCircleOutlined /> 全选</a-button>
            </span>
            
            <nav_pagination :fandata="PAGEDATA" v-on:complete="page_turning"/>

            <!--翻页组件 -->
        </a-layout-content>

    </a-layout>

</a-layout>


</template>
<script>
import { computed,ref,reactive,onMounted,h,onUnmounted } from 'vue';
import { useStore } from 'vuex'
import { DeleteOutlined,EditOutlined,RedoOutlined,CheckCircleOutlined,SettingOutlined,CheckSquareOutlined,CloseSquareOutlined,CopyOutlined,ExclamationCircleFilled,EyeOutlined } from '@ant-design/icons-vue';

// 网络请求工具引用
import axios from "axios";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";

export default {
   name:'quality',
   components:{
        menu_left,
        menu_head,
        DeleteOutlined,
        EditOutlined,
        RedoOutlined,
        CheckCircleOutlined,
        nav_pagination

   },
    props: {
    data:{typr:Object}
    },
    setup(props,ctx) {

    const store = useStore();// 共享数据
    const tool = new TOOL.TOOL()            // 工具方法
    const API = new utils.A_Patch()         // 请求接口地址合集
    // 组件挂之后---请求数据===============================开始
    // 定义一个函数来处理窗口大小变化 ==
    const handleResize = () => {
      PAGEDATA.innerHeight = window.innerHeight - 180; // 作为表格自适应高度
    };

    // 在组件挂载时添加事件监听器
    onMounted(() => {
        window.addEventListener('resize', handleResize);// 窗口变换时候
        loadproductData(conditionData.default)
    });

    // 在组件卸载时移除事件监听器
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    // 【组件挂载】========================================结束

    const PAGEDATA = reactive({

            title:'诊断中心',
            innerHeight: ref(window.innerHeight - 180), // 初始化列表高度

            menudata:{       // 菜单选中配置
                'key':'95',
                'openKeys':'douyinshop',
                },
            loading:true,         // 列表load状态
            justify:'center',     // 列表内容对齐：loading加载居中设定
            align:'center',       // 列表内容对齐：loading加载居中设定
            // 列表信息
            datalist:[],
            total_number:0,     // 内容总数

        })


    // 筛选条件数据
    const conditionData = reactive({

        data_type:"0", // 查询tab状态

        // 默认查询条件
        default:{
            order_by:"desc",// 排序方式
            page:1,
            page_size:10,
            task_id:9999999999,
            diagnose_status:[1], //商品诊断状态
        }
    })

    // 加载数据
    const loadproductData = async(data) => {

        PAGEDATA.loading = true;

        // 请求商品接口
        const res = await axios.post(API.AppSrtoreAPI.dou_product.qualitylist, data)

        console.log(res)
        var code = res.data.code;               // 请求返回是否成
        var res_data = res.data.data;           // 返回数据集
        var res_list = res_data.quality_list;   // 列表数据
        var total = res_data.total;             // 数据总量
        console.log(res_list.length)

        if(res_list.length === 0){

          PAGEDATA.justify = 'center';
          PAGEDATA.align = 'center';
          PAGEDATA.loading = false;
          PAGEDATA.datalist = [];
          PAGEDATA.total_number = 0

        }else{

            setTimeout(() => {
                PAGEDATA.loading = false;

                PAGEDATA.justify = 'start';
                PAGEDATA.align = 'start';
                // 请求数据不为空
                PAGEDATA.datalist = res_list;
                PAGEDATA.total_number = total;
          }, 1000);

          console.log('11')
        }
    }

    // 【翻页-组件 回调方法】========================================开始
    const page_turning = (data)=>{
        console.log(data)
        PAGEDATA.justify = 'flex-start';
        PAGEDATA.align = 'flex-start';
        conditionData.default.page = data.page;
        conditionData.default.page_size = data.page_size;
        conditionData.default.diagnose_status = [conditionData.data_type];
        loadproductData(conditionData.default)
    }
    // 【查询组件 回调方法】========================================结束

    // tab切换状态方法
    const Tabchange=()=>{
        console.log(conditionData.data_type)
    }


       return{
            PAGEDATA,
            conditionData,
          store,
          page_turning,
          Tabchange

       }
   }
}
</script>
<style scoped>
.FlexBox{overflow:auto; transition:height 0.5s ease;margin:4px 0 0 0;}

</style>