<template>

  <a-layout style="height: 100vh;width: 100vw;">


    <!--head 导航组件  开始-->
    <menu_head :headdata="PAGEDATA.user" />
    <!--head 导航组件  结束-->


    <!--内容部分 菜单 右侧列表 开始-->
    <a-layout>
      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <menu_left /> <!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->


      <a-layout-content :style="{ margin: '6px', padding: '14px', background: '#fff', minHeight: '280px', }">
          <!--条件查询组件 开始 -->
          <div style="height: 80px;">

          <a-row type="flex">
            <a-col :span="6" :order="1">
            <!--导航收起按钮-->
                    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
                    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            </a-col>

            <a-col :span="6" :order="2">2</a-col>
            <a-col :span="6" :order="3">3 col-order-2</a-col>
            <a-col :span="6" :order="4">4 col-order-1</a-col>
          </a-row>
          </div>

          <!--条件查询组件 结束 -->


          <!--表格组件：：发送初始化数据  -->
          <a-table
              :loading="loading"
              :columns="PAGEDATA.colum"
              :data-source="PAGEDATA.datalist"
              :scroll="{ x: 1500, y:innerHeight }"
              :pagination="false"
              >

            <template #bodyCell="{ column }">

            <!--定义操作按钮 开始-->
            <template v-if="column.key === 'operation'">
                <a>编辑</a> |
                <a>删除</a>
            </template>
            <!--定义操作按钮 结束-->

            </template>

          </a-table>
          <!--翻页组件：：：发送初始化数据：：监听回传信息  -->
          <nav_pagination :fandata="PAGEDATA.total_number" v-on:complete="receive"/>


      </a-layout-content>

    </a-layout>

  </a-layout>
  <!--内容部分 菜单 右侧列表 结束-->

</template>


<script>
import axios from 'axios';      // 网络请求模块
axios.defaults.timeout = 1000;  // 1秒 设置全局超时时间（以毫秒为单位）


import { PublicModel,A_Patch } from '/src/assets/JS_Model/public_model' // 引用自有模块&类方法
import { ref, reactive, onBeforeMount , onMounted} from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import nav_pagination from "@/components/nav_pagination.vue";
import menu_head from "@/components/layout/menu_head.vue";
// 组件引用=====结束

export default {

  name:'UserView',
  // 组件加载
  components: {
    menu_left,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    nav_pagination,
    menu_head
  },
  setup() {

    const ruterPatch = new A_Patch()        // 初始化路由地址
    const publicModel = new PublicModel()    // 初始网络请求方法

    // 表格高度
    const innerHeight = ref(window.innerHeight-300);
    const loading = ref(true)


    // 页面获取数据
    const PAGEDATA = reactive({
      user: {},          // 用户信息
      colum:[],         // 表头信息
      datalist:[],      // 列表信息
      total_number:0,      // 总页数
      menuconfig:{}     // 菜单配置
    })


    // 组件挂在之前---请求数据
    onBeforeMount(async ()=>{
      // resolvedData.value = await fetchData(); // 假设fetchData是从API获取数据的函数

      let qurest_data = {"page": 1, "page_size": 10}

      const { Fetch_Post_Data } = publicModel.axios_post(ruterPatch.AdminAPI.user.list, qurest_data, look) // 初始化post请求

      await Fetch_Post_Data()   // 从Api请求数据

      loading.value = false

    })

    // 组件挂之后---请求数据
    onMounted(() => {})



    function look(res){

      PAGEDATA.loading = true
      PAGEDATA.user = res.user
      PAGEDATA.colum = res.colum
      PAGEDATA.datalist = res.data
      PAGEDATA.total_number = res.total_number

      // for(let i of res.data){
      //   console.log(i)
      // }

      return res

    }


    // var List = {
    //   // 表头数据转义
    //   getfanda:()=>{
    //
    //   },
    //   // 表格内容转义
    //
    //   // 点击翻页加载数据
    //
    //
    // }

    // 接收来自子组件发送的数据=方法
    const receive = (message)=>{

      loading.value = true

      const { Fetch_Post_Data } = publicModel.axios_post(ruterPatch.AdminAPI.user.list, message, look) // 初始化post请求

      Fetch_Post_Data()

      loading.value = false

    }





    return {
      loading,
      innerHeight,
      PAGEDATA,
      selectedKeys: ref(['1']),
      collapsed: ref(false),
      receive,

    };


  },
};

</script>


<style>
.ant-empty-normal {
  height:calc(100vh - 280px);
  margin: calc(100vh - 280px) 0 0 0 !important;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 12px;line-height: 64px;padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>