<template>


  <!--新建、编辑、删除用户数据====>开始-->
  <Model_Del :deldata="DELDATA" v-on:del_coallback="pagecallback"/>
  <!--新建、编辑、删除用户数据====>结束-->


  <a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head :headdata="PAGEDATA.user" />
    <!--head 导航组件  结束-->

    <!--内容部分 菜单 右侧列表 开始-->
    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
        <menu_left :menudata="PAGEDATA.menudata"/> <!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->

      <a-layout-content :style="{ margin: '6px', padding: '14px', background: '#fff',}">

        <div style="height: 42px;">
            <!--条件查询组件 开始 -->
            <a-row type="flex">

              <a-col :span="5" :order="1">
                  <!--导航收起按钮-->
                  <a-button type="primary" size="small" style="font-size: 12px; margin-right: 16px;" @click="() => { store.commit('menu/change') }">
                    <menu-unfold-outlined v-if="store.state.menu.coll" class="trigger" />
                    <menu-fold-outlined v-else class="trigger" />
                  </a-button>
                  <!-- {{ PAGEDATA.title }} -->

                <a-button type="primary" size="small" style="font-size:12px;">
                  <template #icon><PlusOutlined /></template>
                  新建菜单
                </a-button>
              </a-col>
              <a-col :span="6" :order="3"></a-col>
            </a-row>
            <!--条件查询组件 结束 -->
        </div>


          <div :style="innerHeight">
          <!--表格组件：：发送初始化数据  开始-->
          <a-table
              :loading="loading"
              :columns="PAGEDATA.colum"
              :data-source="PAGEDATA.datalist"
              :scroll="{ x: 1200, y: innerHeight}"
              :pagination="false"
              style="font-size:12px;"
          >

            <template #bodyCell="{ text, record, index, column }">

              <!--定义操作按钮 开始-->
              <template v-if="column.key === 'operation'">
                  <a @click="Edit_Fun(record)">编辑</a> |
                  <a @click="Del_Fun(record)">删除</a>
              </template>
              <!--定义操作按钮 结束-->

            </template>

          </a-table>
          <!--表格组件：：发送初始化数据  结束-->
          </div>

          <!--翻页组件：：：发送初始化数据：：监听回传信息  -->
          <nav_pagination :fandata="PAGEDATA" v-on:complete="receive"/>

      </a-layout-content>

    </a-layout>

  </a-layout>
</template>

<script>
import axios from 'axios';      // 网络请求模块
axios.defaults.timeout = 1000;  // 1秒 设置全局超时时间（以毫秒为单位）

import { ref, reactive, onBeforeMount , onMounted, onUnmounted} from 'vue';
import {MenuFoldOutlined, MenuUnfoldOutlined,PlusOutlined} from "@ant-design/icons-vue";
import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import nav_pagination from "@/components/nav_pagination.vue";
import menu_head from "@/components/layout/menu_head.vue";
import Model_Del from "@/components/admin/Model_Del.vue";

// 组件引用=====结束


export default {
  name: "MenuView",
    // 组件加载
  components: {
    menu_left,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    nav_pagination,
    menu_head,
    PlusOutlined,
    Model_Del,
  },
  setup() {

    const store = useStore();// 共享数据
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度
    const loading = ref(true)// 初始化loading状态

    // 页面获取数据
    const PAGEDATA = reactive({
      title:'菜单管理',
      menudata:{'key':'6','openKeys':'sub1'},            // 菜单选中配置
      user: {},           // 用户信息
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
      menuconfig:{}       // 菜单配置
    })


    // 【删除】数据初始化
    const DELDATA = reactive({
      open:false,
      actian_name:'menu/del',// 数据删除模块名称
      detaile_obj:{}         // 数据删除键值
    })


    // 【删除】调用组件方法===》弹出抽屉+传值
    const Del_Fun = (detaile_data)=>{
      DELDATA.detaile_obj.m_id = detaile_data.id;
      DELDATA.open = true;
    }


    // 组件挂在之前---请求数据
    onBeforeMount(()=>{
      let message = {"page":1, "page_size":10}
      Refresh_table(message) // 【页面初始化】&&刷新表格
    })

    // 组件挂之后---请求数据

    // 定义一个函数来处理窗口大小变化 ==
    const handleResize = () => {
    innerHeight.value = window.innerHeight-245; // 作为表格自适应高度
    };
    // 在组件挂载时添加事件监听器
    onMounted(() => {
      window.addEventListener('resize', handleResize);

    });
    // 在组件卸载时移除事件监听器
    onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    });




    // 接收来自子组件发送的数据=回调方法
    const receive = (message)=>{
      loading.value = true    // 开启loading状态
      Refresh_table(message) // 刷新表格
    }

    //【当前页面】&&刷新表格
    const pagecallback =()=>{
      let message = {}
      message.page = store.state.menu.message.page;
      message.page_size = store.state.menu.message.page_size;
      receive(message)
    }

    // 刷新表格
    const Refresh_table = (message)=>{
      store.dispatch('menu/list', message).then(()=>{
        PAGEDATA.colum = store.state.menu.message.data_list.colum
        PAGEDATA.user = store.state.menu.message.user
        PAGEDATA.datalist = store.state.menu.message.data_list.data
        PAGEDATA.total_number = store.state.menu.message.data_list.total_number
        loading.value = false // loading 状态关闭
      })

    }

    // 菜单详情查询===ok
    // store.dispatch('menu/get',{m_id:'31'}).then(()=>{
    //   console.log(store.state.menu)  // 页面赋值
    // })

    // 菜单列表查询==ok
    // const page_data = {
    //   "page":1,
    //   "page_size":10
    // }
    // store.dispatch('menu/list', page_data).then(()=>{
    //   console.log(store.state.menu.message)
    // })


    // 菜单新增===ok
    // const add_data = {
		// 	"parent_id": 0,
		// 	"ico_name": null,
		// 	"name": "新增测试",
		// 	"field": "ADD",
		// 	"function_info": "{}",
		// }
    // store.dispatch('menu/add_menu', add_data).then(()=>{
    //   console.log(store.state.menu.message)
    // })


    // 菜单删除===ok
    // store.dispatch('menu/del_menu',{m_id:54}).then(()=>{
    //   console.log(store.state.menu.message)
    // })


    // 菜单更新
    // const update_data = {
    //   "setting_data":{"name":"系统设置1"}
    // }
    // store.dispatch('menu/update_menu', update_data).then(()=>{
    //   console.log(store.state.menu.message)
    // })


    // 菜单批量删除===ok
    // const batch_del_data = {
    //   "id":[55,56,57]
    // }
    // store.dispatch('menu/bacth_del', batch_del_data).then(()=>{
    //     console.log(store.state.user.message)
    // })








    return {
      store,
      loading,
      innerHeight,
      PAGEDATA,
      receive,
      pagecallback,
      DELDATA,
      Del_Fun
    }
  }
}
</script>

<style >
.ant-table-body{
  height: calc(100vh - 245px);
  min-height: 0px;
}
</style>