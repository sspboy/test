<template>

  <!--新建、编辑、删除用户数据====>开始-->
  <User_Add :adddata="ADDDATA" v-on:add_coallback="pagecallback"/>
  <Model_Del :deldata="DELDATA" v-on:del_coallback="pagecallback"/>
  <!--新建、编辑、删除用户数据====>结束-->


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



      <a-layout-content class="content_border">

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
                  <a-button type="primary" size="small" style="font-size:12px;" @click="Add_Fun">
                  <template #icon><PlusOutlined /></template>
                  新建用户
                </a-button>
              </a-col>
              <a-col :span="12" :order="2">
              </a-col>
              <a-col :span="6" :order="3"></a-col>
            </a-row>
            <!--条件查询组件 结束 -->
          </div>


          <div :style="innerHeight">
          <!--表格组件：：发送初始化数据  开始-->
          <a-table
              :loading="loading"
              :columns="PAGEDATA?.colum"
              :data-source="PAGEDATA?.datalist"
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
  <!--内容部分 菜单 右侧列表 结束-->



</template>


<script>
import {ref, reactive, onBeforeMount, onMounted, onUnmounted} from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined,PlusOutlined} from '@ant-design/icons-vue';
import { useStore } from 'vuex'
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/department';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import nav_pagination from "@/components/nav_pagination.vue";
import menu_head from "@/components/layout/menu_head.vue";
import User_Add from "@/components/admin/User_Add.vue";
import Model_Del from "@/components/admin/Model_Del.vue";
// 组件引用=====结束


export default {

  name:'UserView',

  // 组件加载
  components: {
    menu_left,
    PlusOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    nav_pagination,
    menu_head,
    User_Add,
    Model_Del
  },

  setup() {

    // 数据绑定=======================================>开始
    const API = new utils.A_Patch()           // 请求接口
    const TO = new TABLE.TableOperate()       // 表格操作方法
    const store = useStore();                 // 共享数据
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度
    const loading = ref(true)// 初始化loading状态

    // 【编辑】页面数据
    const PAGEDATA = reactive({
      title:'用户管理',
      menudata:{      // 菜单选中配置
        'key':'48',
        'openKeys':'admin'
      },
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 内容总数
    })

    // 【新建】页面数据
    const ADDDATA= reactive({
      actian:'',// 数据删除模块名称
      title:"",
      data:'',
      open:false,
    })

    // 【删除】页面数据
    const DELDATA = reactive({
      open:false,
      actian_name:API.AdminAPI.user.delete,// 数据删除模块名称
      detaile_obj:{}         // 数据删除键值
    })
    // 数据绑定===========================================结束






    // 【组件挂载】========================================开始
    onBeforeMount(()=>{

      // 默认查询条件
      let message = {

        "page":1,

        "page_size":10,

        condition:[{
          type: "orderby",
          condition: [{'column_name': 'create_time', 'value': 'DESC', }]
        }]}

        // 请求列表
        Get_list(message)

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
    // 【组件挂载】========================================结束


    //【刷新表格】
    const pagecallback =()=>{

      loading.value = true    // 开启loading状态

      let message = {}
      message.page = TO.message.page;
      message.page_size = TO.message.page_size;
      // 刷新页面查询条件
      message.condition = [{
          type: "orderby",
          condition: [{'column_name': 'create_time', 'value': 'DESC', }]
        }]

      // 请求列表
      Get_list(message)

    }

    // 【点击翻页】&&刷新表格所在的页面
    const receive = (message)=>{

      loading.value = true    // 开启loading状态

      // 刷新页面查询条件
      message.condition = [{
          type: "orderby",
          condition: [{'column_name': 'create_time', 'value': 'DESC', }]
        }]

      Get_list(message) // 请求列表

    }

    const Get_list = (message) =>{

      // 请求接口地址赋值
      TO.message.url = API.AdminAPI.user.list

      TO.actions.list(message,(res)=>{

        TO.user.add_colum(res)        // 添加表头

        // 页面赋值
        // console.log(res)
        PAGEDATA.colum = res.colum
        PAGEDATA.datalist = res.data
        PAGEDATA.total_number =res.total_number

        loading.value = false // loading 状态关闭

      })
    }

    // 【新建】调用组件方法===》弹出抽屉+传值
    const Add_Fun = ()=>{
      ADDDATA.title="新建用户"
      ADDDATA.action='user/add'
      ADDDATA.data = {
        id:'',
        account_type:undefined,
        v_id:undefined,
        nickname: '',
        pass_word: '123456',
        brand_name: '',
        mobile: '',// 手机号码
        role: '',// 超管
      }
      ADDDATA.open = true;
    }

    // 【编辑】调用组件方法===》弹出抽屉+传值
    const Edit_Fun = (data)=>{
      ADDDATA.title="编辑用户"
      ADDDATA.action='user/update'
      ADDDATA.data = {
        id: data.id,
        account_type:data.account_type,
        v_id:data.v_id,
        nickname: data.nickname,
        pass_word: data.pass_word,
        brand_name: data.brand_name,
        mobile: data.mobile,// 手机号码
        role: data.role,// 超管
      }
      ADDDATA.open = true;
    }

    // 【删除】调用组件方法===》弹出抽屉+传值
    const Del_Fun = (detaile_data)=>{
      DELDATA.detaile_obj.id = detaile_data.id;
      DELDATA.open = true;
    }


    return {
      store,
      pagecallback,
      loading,
      innerHeight,
      PAGEDATA,
      ADDDATA,
      Add_Fun,
      Edit_Fun,
      DELDATA,
      Del_Fun,
      receive,
    };


  },
};

</script>

<style>
.ant-table-body{
   height: calc(100vh - 245px);
   min-height: 0px;
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