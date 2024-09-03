<template>
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
                  <a-button type="primary" size="small" style="font-size: 12px;margin-right: 16px;" @click="() => {store.commit('change')}">
                    <menu-unfold-outlined v-if="store.state.menu.coll" class="trigger" />
                    <menu-fold-outlined v-else class="trigger" />
                  </a-button>
                  <!-- {{ PAGEDATA.title }} -->
                <a-button type="primary" size="small" style="font-size:12px;">
                  <template #icon><PlusOutlined /></template>
                  添加版本
                </a-button>
              </a-col>
              <a-col :span="6" :order="3">3 col-order-2</a-col>
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

            <template #bodyCell="{ column }">

              <!--定义操作按钮 开始-->
              <template v-if="column.key === 'operation'">
                  <a>编辑</a> |
                  <a>删除</a>
              </template>
              <!--定义操作按钮 结束-->

            </template>

          </a-table>
          <!--表格组件：：发送初始化数据  结束-->
        </div>

        <!--翻页组件：：：发送初始化数据：：监听回传信息  -->
        <nav_pagination :fandata="PAGEDATA.total_number" v-on:complete="receive"/>

      </a-layout-content>

    </a-layout>
  </a-layout>
</template>

<script>
import axios from 'axios';      // 网络请求模块
axios.defaults.timeout = 1000;  // 1秒 设置全局超时时间（以毫秒为单位）

import { PublicModel,A_Patch } from '/src/assets/JS_Model/public_model' // 引用自有模块&类方法
import { ref, reactive, onBeforeMount , onMounted, onUnmounted} from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined,PlusOutlined} from '@ant-design/icons-vue';
import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from "@/components/layout/menu_left.vue";
import nav_pagination from "@/components/nav_pagination.vue";
import menu_head from "@/components/layout/menu_head.vue";
// 组件引用=====结束

export default {
  name: "VersionView",
  // 组件加载
  components: {
    menu_left,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    nav_pagination,
    menu_head,
    PlusOutlined

  },
  setup(){

    const store = useStore();// 共享数据
    const ruterPatch = new A_Patch();// 初始化路由地址
    const publicModel = new PublicModel();// 初始网络请求方法
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度
    const loading = ref(true)// 初始化loading状态

    // 页面获取数据
    const PAGEDATA = reactive({
      title:'版本管理',
      menudata:{'key':'8','openKeys':'sub1'},            // 菜单选中配置
      user: {},           // 用户信息
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
      menuconfig:{}       // 菜单配置
    })




    // 组件挂在之前---请求数据
    onBeforeMount(async ()=>{

      let qurest_data = {"page":1, "page_size":10}

      const { Fetch_Post_Data } = publicModel.axios_post(ruterPatch.AdminAPI.version.list, qurest_data, look) // 初始化post请求

      await Fetch_Post_Data()   // 从Api请求数据


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


    // 表头、表框设置
    var List = {

      // 表头数据转义
      getcolum:(colums)=>{
        // id
        if(colums.field_name === "id"){
          colums['align'] = 'center'
          colums['width'] = 74
        }
        // 关联菜单id
        if(colums.field_name === "m_id"){
          colums['align'] = 'center'
          colums['width'] = 90
        }
        // 菜单名称
        if(colums.field_name === "m_name"){
          colums['align'] = 'left'
          colums['width'] = 120
        }
        // 功能名称
        if(colums.field_name === "name"){
          colums['align'] = 'center'
          colums['width'] = 140
        }
        // 函数名称
        if(colums.field_name === "def_name"){
          colums['align'] = 'center'
          colums['width'] = 174
        }
        // 描述
        if(colums.field_name === "miaoshu"){
          colums['align'] = 'center'
          colums['width'] = 100
        }
        // 创建时间
        if(colums.field_name === "create_time"){
          colums['align'] = 'center'
          colums['width'] = 200
        }
        // 更新时间
        if(colums.field_name === "update_time"){
          colums['align'] = 'center'
          colums['width'] = 200
        }
      },
      // 添加操作
      addop:(colums)=>{
        var op = {
          "dataIndex": "state",
          "field_name": "state",
          "field_type": "int",
          "key": "operation",
          "title": "操作",
          "fixed": 'right',
          "align":"center",
          "width":100
        }
        colums.push(op) // 添加操作按钮
      },
      // 表格内容转义
      getvlue:(vlues)=>{
        console.log(vlues)
      }
    // 点击翻页加载数据
    }




    // 网络请求接口====> 回调方法
    function look(res){

      // loading 状态关闭
      loading.value = false

      // 设置表头列的宽度
      for(let i of res.colum){
        List.getcolum(i)
      }

      // 表格添加操作按钮列
      List.addop(res.colum)

      PAGEDATA.user = res.user
      PAGEDATA.colum = res.colum
      PAGEDATA.datalist = res.data
      PAGEDATA.total_number = res.total_number

      // 添加编辑方法
      // 添加删除方法
      // 添加新增数据方法


      // for(let i of res.data){
      //   console.log(i)
      // }

      return res

    }




    // 接收来自子组件发送的数据=回调方法
    const receive = (message)=>{

      loading.value = true  // 开启loading状态

      const { Fetch_Post_Data } = publicModel.axios_post(ruterPatch.AdminAPI.version.list, message, look) // 初始化post请求

      Fetch_Post_Data() // 执行请求方法

    }





    return{
      store,
      loading,
      innerHeight,
      PAGEDATA,
      receive
    }
  }
}
</script>

<style>
.ant-table-tbody{
  height: calc(100vh - 265px);
  min-height: 0px;
}
</style>