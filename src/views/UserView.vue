<template>

  <a-layout style="height: 100vh;width: 100vw;">


    <!--head 导航组件  开始-->
    <menu_head :headdata="headdata" />
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
            <a-col :span="6" :order="2">2 col-order-3</a-col>
            <a-col :span="6" :order="3">3 col-order-2</a-col>
            <a-col :span="6" :order="4">4 col-order-1</a-col>
          </a-row>
          <!--条件查询组件 结束 -->


          <!--表格组件：：发送初始化数据  -->
          <navTable :pagemessage="pagemessage" />

          <!--翻页组件：：：发送初始化数据：：监听回传信息  -->
          <nav_pagination :fandata="fandata" v-on:complete="receive"/>

      </a-layout-content>


    </a-layout>


  </a-layout>
  <!--内容部分 菜单 右侧列表 结束-->


</template>


<script>
import axios from 'axios';      // 网络请求模块
axios.defaults.timeout = 1000;  // 1秒 设置全局超时时间（以毫秒为单位）
import { PublicModel } from '/src/JS_Model/public_model' // 引用自有模块&类方法
// import { useRouter } from "vue-router"; // 导入路由
import { ref, provide, reactive, onBeforeMount, onMounted } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import navTable from '@/components/navTable.vue'
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
    navTable,
    nav_pagination,
    menu_head
  },

  setup() {

      // 发送到头部组件的数据
      const headdata = reactive({"data":""})

      // 发送到菜单组件的数据
      // const menudata = reactive({"data":""})

      // 发送给翻页组件的数据
      const fandata = reactive({"data":""})

      // 发送到表格组件的数据
      const pagemessage = reactive({"data":""})



    // 组件挂载之后---请求数据接口===》加载数据

      axios.post('api/admin/user/list', {
          "page":1,
          "page_size":10
      }).then((response)=>{

        const publicmodel = new PublicModel();

        const PageData = response.data;         // 数据加载

        publicmodel.VerifyLogin(PageData)       // 鉴权验证

        return PageData

      // 菜单
      // 传递数据给头部组件
      // 传递数据给菜单组件
      // 传递数据给内容组件

      }).then((response)=>{

        const user_obj =  response.user         // 获取用户数据
        const total = response.total_number     // 数据总量
        // console.log(response)

        headdata.data = user_obj  // 初始化头部数据
        fandata.data = total    // 初始化翻页数据

      }).catch(function (error) {

        console.log(error);

      });








    // 接收来自子组件发送的数据=方法
    const receive = (message)=>{
      pagemessage.data = message
      console.log(message)
    }


    return {
      selectedKeys: ref(['1']),
      collapsed: ref(false),
      headdata, // 头部数据
      fandata,
      pagemessage,
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