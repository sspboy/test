<template>


  <!--新建、编辑、删除用户数据====>开始-->
  <Model_Del :deldata="DELDATA" v-on:del_coallback="pagecallback"/>
  <Menu_Add :adddata="ADDDATA" v-on:menu_add_coallback="pagecallback"/>
  <!--新建、编辑、删除用户数据====>结束-->


  <a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->

    <menu_head :headdata="PAGEDATA.user_data" />
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

                <a-button type="primary" size="small" style="font-size:12px;" @click="Add_fun">
                  <template #icon><PlusOutlined /></template>
                  添加菜单
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
              :row-selection="rowSelection"
          >

            <template #bodyCell="{ record, column }">

              <!--定义操作按钮 开始-->
              <template v-if="column.key === 'operation'">
                  <a @click="Edit_fun(record)">编辑</a> |
                  <a @click="Del_fun(record)">删除</a>
              </template>
              <!--定义操作按钮 结束-->

            </template>

          </a-table>
          <!--表格组件：：发送初始化数据  结束-->
          </div>

          <!--翻页组件：：：发送初始化数据：：监听回传信息  -->
<!--          <nav_pagination :fandata="PAGEDATA" v-on:complete="receive"/>-->

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
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/department';
// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import nav_pagination from "@/components/nav_pagination.vue";
import menu_head from "@/components/layout/menu_head.vue";
import Model_Del from "@/components/admin/Model_Del.vue";
import Menu_Add from "@/components/admin/Menu_Add.vue";
// 组件引用=====结束


export default {
  name: "MenuView",
    // 组件加载
  components: {
    Menu_Add,
    menu_left,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    nav_pagination,
    menu_head,
    PlusOutlined,
    Model_Del,
  },
  setup() {

  // 【数据绑定】=======================================>开始
    const API = new utils.A_Patch()       // 请求接口地址合集
    const TO = new TABLE.TableOperate()   // 表格操作方法
    const store = useStore();             // 共享数据
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度
    const loading = ref(true)             // 初始化loading状态

    // 页面获取数据
    const PAGEDATA = reactive({
      title:'菜单管理',
      // 菜单选中
      menudata:{
        'key':'41',
        'openKeys':'sub1',
      },
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
    })

    // 【添加】数据初始化
    const ADDDATA = reactive({
      action:'',
      title:'',
      data:'',
      open:false,

    })
  
    // 【删除】数据初始化
    const DELDATA = reactive({
      open:false,
      actian_name:API.AdminAPI.menu.delete,// 数据删除模块名称
      detaile_obj:{}         // 数据删除键值
    })

    // 【数据绑定】=======================================>结束

    // 【新建】
    const Add_fun = ()=>{
      ADDDATA.title = '添加菜单';
      ADDDATA.action = 'menu/add';
      ADDDATA.data = {
        parent_id:undefined,
        ico_name:'',
        name:'',
        field:'',
        function_info:undefined
      };
      ADDDATA.open = true;
    }

    // 【编辑】
    const Edit_fun = (data)=>{
      ADDDATA.title = '编辑菜单';
      ADDDATA.action = 'menu/update';
      ADDDATA.data = {
        id:data.id,
        parent_id:data.parent_id,
        ico_name:data.ico_name,
        name:data.name,
        field:data.field,
        function_info:data.function_info
      }
      ADDDATA.open = true;
    }

    // 【删除】
    const Del_fun = (detaile_data)=>{
      DELDATA.detaile_obj.id = detaile_data.id;
      DELDATA.open = true;
    }


    // 组件挂在之前---请求数据
    onBeforeMount(()=>{
      let message = {"page":1, "page_size":100}
      Get_list(message)      // 请求列表
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
      Get_list(message)       // 请求列表
    }

    //【当前页面】&&刷新表格
    const pagecallback =()=>{
      let message = {}
      message.page = TO.message.page;
      message.page_size = TO.message.page_size;
      Get_list(message) // 请求列表
    }


    const rowSelection = ref({
      checkStrictly: true,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    });


    // 【刷新表格】
    const Get_list = (message) =>{

      // 请求接口地址赋值
      TO.message.url = API.AdminAPI.menu.list

      TO.actions.list(message,(res)=>{

        TO.menu.add_colum(res)        // 添加表头

        // 页面赋值
        // console.log(res)
        PAGEDATA.colum = res.colum
        PAGEDATA.datalist = res.data
        PAGEDATA.total_number =res.total_number

        loading.value = false // loading 状态关闭

      })
    }

    return {
      store,
      loading,
      innerHeight,
      PAGEDATA,
      receive,
      pagecallback,
      DELDATA,
      ADDDATA,
      Add_fun,
      Edit_fun,
      Del_fun,
      rowSelection
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