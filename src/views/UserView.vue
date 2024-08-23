<template>

  <a-layout style="height: 100vh;width: 100vw;">


    <!--head 导航组件  开始-->
    <menu_head :headdata="PAGEDATA.data.user" />
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
          <a-row type="flex">
            <a-col :span="6" :order="1">
            <!--导航收起按钮-->
                    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
                    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            </a-col>
            <a-col :span="6" :order="2">123123</a-col>
            <a-col :span="6" :order="3">3 col-order-2</a-col>
            <a-col :span="6" :order="4">4 col-order-1</a-col>
          </a-row>
          <!--条件查询组件 结束 -->


          <!--表格组件：：发送初始化数据  -->
          <a-table :columns="PAGEDATA.data.colum" :data-source="PAGEDATA.data.data" :scroll="{ x: 1800, y: innerHeight }" :pagination="false" style="font-size: 12px;">

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
          <nav_pagination :fandata="PAGEDATA.data.total_number" v-on:complete="receive"/>


      </a-layout-content>

    </a-layout>

  </a-layout>
  <!--内容部分 菜单 右侧列表 结束-->

</template>


<script>
import axios from 'axios';      // 网络请求模块
axios.defaults.timeout = 1000;  // 1秒 设置全局超时时间（以毫秒为单位）

import { PublicModel,A_Patch } from '/src/JS_Model/public_model' // 引用自有模块&类方法
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

    const innerHeight = ref(window.innerHeight-300);

    // 初始化路由地址
    const ruterPatch = new A_Patch()
    console.log(ruterPatch.AdminAPI.user.list)
    // 初始网络请求方法
    const publicModel = new PublicModel()


    // 数据列表
    const PAGEDATA = reactive({"data":""})

    // 组件挂在之前---请求数据
    onBeforeMount(()=>{

    })


    // onMounted(async () => {
      // resolvedData.value = await fetchData(); // 假设fetchData是从API获取数据的函数

    let url = 'api/admin/user/list';

    let qurest_data = {"page": 1, "page_size": 10}

    const {postdata, Fetch_Post_Data} = publicModel.axios_post(url, qurest_data) // 初始化post请求

    Fetch_Post_Data()   // 从Api请求数据

    PAGEDATA.data = postdata

    // })




    // 接收来自子组件发送的数据=方法
    const receive = (message)=>{
      console.log(message)
    }





    return {
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