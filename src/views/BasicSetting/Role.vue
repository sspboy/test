<template>
<a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head :headdata="PAGEDATA.user"/>
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
                    <a-button type="primary" size="small" style="font-size: 12px;margin-right: 16px;" @click="() => {store.commit('menu/change')}">
                      <menu-unfold-outlined v-if="store.state.menu.coll" class="trigger" />
                      <menu-fold-outlined v-else class="trigger" />
                    </a-button>
                    <!-- {{ PAGEDATA.title }} -->
                  <a-button type="primary" size="small" style="font-size:12px;" @click="Add_Fun">
                    <template #icon><PlusOutlined /></template>
                    添加角色
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
                  :scroll="{ x: 1800, y: innerHeight}"
                  :pagination="false"
                  style="font-size:12px;"
              >

                <template #bodyCell="{  record,  column }">

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
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined} from '@ant-design/icons-vue';

import {defineComponent, onBeforeMount, onMounted, onUnmounted, reactive, ref} from 'vue';
import { useStore } from 'vuex'

// 组件引用=====开始

import menu_left from "@/components/layout/menu_left.vue";
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";

export default defineComponent({
  // 模版名称【角色管理】
  name: "Role",
  // 引用组件
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    menu_left,
    menu_head,
    nav_pagination
  },
  // 父组件数据
  props: {},
  // 组合API返回到模版
  setup() {

    const store = useStore();// 共享数据
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度
    const loading = ref(true)// 初始化loading状态

    const PAGEDATA = reactive({
      title:'角色管理',
      menudata:{'key':'11','openKeys':'sub2'},            // 菜单选中配置
      user: {},           // 用户信息
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
      menuconfig:{}       // 菜单配置
    })

        // 【新建】调用组件方法===》弹出抽屉+传值
    const ADDDATA= reactive({
      actian:'',// 数据删除模块名称
      title:"",
      open:false,
    })

    const Add_Fun = ()=>{
      ADDDATA.title="新建"
      ADDDATA.actian='role/add'
      ADDDATA.open = true;
    }
    // 【新建】调用组件方法===》弹出抽屉+传值

    // 【编辑】调用组件方法===》弹出抽屉+传值
    const EDITDATA= reactive({
      title:"",
      data:'',
      open:false,
    })

    const Edit_Fun = (detaile_data)=>{
      EDITDATA.title="编辑"
      EDITDATA.actian='role/update'
      EDITDATA.data = detaile_data;
      EDITDATA.open = true;
    }
    // 【编辑】调用组件方法===》弹出抽屉+传值



    // 组件挂在之前---请求数据
    onBeforeMount(()=>{
      // 默认查询条件
      let message = {
        "page":1,
        "page_size":10,
        condition:[{
          type: "orderby",
          condition: [{'column_name': 'create_time', 'value': 'DESC', }]
        }]}
      Refresh_table(message) // 【页面初始化】&&刷新表格
    })


    //【当前页面】&&刷新表格
    const pagecallback =()=>{
      let message = {}
      message.page = store.state.role.message.page;
      message.page_size = store.state.role.message.page_size;
      receive(message)
    }

    // 刷新表格数据方法
    const Refresh_table = (message)=>{

      store.dispatch('role/list', message).then(()=>{
        PAGEDATA.colum = store.state.role.message.data_list.colum
        PAGEDATA.user = store.state.role.message.user
        PAGEDATA.datalist = store.state.role.message.data_list.data
        PAGEDATA.total_number = store.state.role.message.data_list.total_number
        loading.value = false // loading 状态关闭
      }).then(()=>{
        console.log(PAGEDATA)

      })

    }

    // [翻页]&&刷新表格
    const receive = (message)=>{

      loading.value = true    // 开启loading状态
      // 刷新页面查询条件
      message.condition = [{
          type: "orderby",
          condition: [{'column_name': 'create_time', 'value': 'DESC', }]
        }]

      Refresh_table(message) // 刷新表格
    }


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


    return {
      store,
      loading,
      innerHeight,
      PAGEDATA,
      pagecallback,
      receive,
      Add_Fun,
      Edit_Fun
    }
  }


})
</script>

<style>
.ant-table-body{
   height: calc(100vh - 245px);
   min-height: 0px;
}

</style>