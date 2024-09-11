<template>

  <!--新建、编辑、删除用户数据====>开始-->
  <User_Add :adddata="ADDDATA" v-on:add_coallback="pagecallback"/>

  <User_Edit :editdata="EDITDATA" v-on:edit_coallback="pagecallback"/>

  <Model_Del :deldata="DELDATA" v-on:del_coallback="pagecallback"/>
  <!--新建、编辑、删除用户数据====>结束-->


  <!--内容部分 菜单 右侧列表 开始-->
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

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import nav_pagination from "@/components/nav_pagination.vue";
import menu_head from "@/components/layout/menu_head.vue";
import User_Add from "@/components/admin/User_Add.vue";
import Model_Del from "@/components/admin/Model_Del.vue";
import User_Edit from "@/components/admin/User_Edit.vue";
// 组件引用=====结束


export default {

  name:'UserView',

  // 组件加载
  components: {
    User_Edit,
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

    const store = useStore();// 共享数据
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度
    const loading = ref(true)// 初始化loading状态

    // 页面获取数据
    const PAGEDATA = reactive({
      title:'用户管理',
      menudata:{'key':'5','openKeys':'sub1'},            // 菜单选中配置
      user: {},           // 用户信息
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 内容总数
      menuconfig:{}       // 菜单配置
    })

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
      message.page = store.state.user.message.page;
      message.page_size = store.state.user.message.page_size;
      receive(message)
    }

    // 刷新表格数据方法
    const Refresh_table = (message)=>{

      store.dispatch('user/list', message).then(()=>{

        PAGEDATA.colum = store.state.user.message.data_list.colum
        PAGEDATA.user = store.state.user.message.user
        PAGEDATA.datalist = store.state.user.message.data_list.data
        PAGEDATA.total_number = store.state.user.message.data_list.total_number
        loading.value = false // loading 状态关闭

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








    // 【新建】调用组件方法===》弹出抽屉+传值
    const ADDDATA= reactive({
      actian:'',// 数据删除模块名称
      title:"",
      open:false,
    })

    const Add_Fun = ()=>{
      ADDDATA.title="新建"
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
      EDITDATA.actian='user/update'
      EDITDATA.data = detaile_data;
      EDITDATA.open = true;
    }
    // 【编辑】调用组件方法===》弹出抽屉+传值




    // 【删除】调用组件方法===》弹出抽屉+传值
    const DELDATA = reactive({
      open:false,
      actian_name:'user/del',// 数据删除模块名称
      detaile_obj:{}         // 数据删除键值
    })

    // 【删除】调用组件方法===》弹出抽屉+传值
    const Del_Fun = (detaile_data)=>{
      DELDATA.detaile_obj.user_id = detaile_data.id;
      DELDATA.open = true;
    }
    // 【删除】调用组件方法===》弹出抽屉+传值



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

    // 列表===查询ok
    // const page_data = {
    //   "page":1,
    //   "page_size":10
    // }
    //
    // store.dispatch('user/list', page_data).then(()=>{
    //   console.log(store.state.user.message.data_list.colum)
    // })


    // 用户==添加ok
    // const add_data = {
    //     "account_type": 0,
    //     "id": "我12345",
    //     "v_id": 0,
    //     "nickname": "小小的天下",
    //     "pass_word": "123456",
    //     "brand_name": "meme",
    //     "mobile": "145480502223",
    //     "role": "{\"role\":[\"admin\"]}",
    //     "department_id": 8,
    //     "department_name": "业务跟单",
    //     "state": 0
    //   }
    // store.dispatch('user/add', add_data).then(()=>{
    //   console.log(store.state.user.message)
    // })


    // 用户删除==ok
    // store.dispatch('user/del',{user_id:'ndai@example.com'}).then(()=>{
    //   console.log(store.state.user.message)
    // })


    // 用户更新==ok
    // const sete_data = {
    //   "user_id":"xiaohaha",
    //   "setting_data":{
    //     "nickname":"我的昵称"
    //   },
    // }
    // store.dispatch('user/update', sete_data).then(()=>{
    //   console.log(store.state.user.message)
    // })


    // 用户===批量删除ok
    // const batch_del_data = {
    //   "b_id":[319,315,310]
    // }
    // store.dispatch('user/bacth_del', batch_del_data).then(()=>{
    //     console.log(store.state.user.message)
    // })


    return {
      store,
      pagecallback,
      loading,
      innerHeight,
      PAGEDATA,
      ADDDATA,
      Add_Fun,
      EDITDATA,
      Edit_Fun,
      DELDATA,
      Del_Fun,
      receive,
    };


  },
};

//.ant-table .ant-empty-normal {
//    max-height: 880px;min-height: 880px;
//}
// .ant-table-tbody{
//   height: calc(100vh - 265px);
//   min-height: 0px;
// }
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