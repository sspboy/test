<template>
<!--新建、编辑、删除用户数据====>开始-->
<Department_Add :adddata="ADDDATA" v-on:add_coallback="pagecallback"/>
<Model_Del :deldata="DELDATA" v-on:del_coallback="pagecallback"/>
<!--新建、编辑、删除用户数据====>结束-->

<a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head></menu_head>
    <!--head 导航组件  结束-->

    <!--内容部分 菜单 右侧列表 开始-->
    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
        <menu_left :menudata="PAGEDATA.menudata"/><!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->

      <!--表格组件 开始-->
      <a-layout-content class="content_border">

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
                  <a-button type="primary" size="small" style="font-size:12px;" @click="Add_fun">
                    <template #icon><PlusOutlined /></template>
                    添加部门
                  </a-button>
              </a-col>
              <a-col :span="6" :order="3"></a-col>
            </a-row>
            <!--条件查询组件 结束 -->
        </div>

        <!-- 组织架构 结束  -->


          <div :style="innerHeight">
              <!--表格组件：：发送初始化数据  开始-->
              <a-table
                  :loading="loading"
                  :columns="PAGEDATA.colum"
                  :data-source="PAGEDATA.datalist"
                  :row-selection="rowSelection"
                  :scroll="{ x: 1200, y: innerHeight}"
                  :pagination="false"
                  style="font-size:12px;"
              >

                <template #bodyCell="{ record,column }">

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


      </a-layout-content>
      <!-- 表格组件 结束  -->

    </a-layout>


</a-layout>

</template>

<script>
import {defineComponent, onBeforeMount, onMounted, onUnmounted, reactive, ref} from 'vue';
import { useStore } from 'vuex'
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined} from '@ant-design/icons-vue';
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';
// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";
import Department_Add from "@/components/BasicSetting/Department_Add.vue";
import Model_Del from "@/components/admin/Model_Del.vue";

export default defineComponent({

  // 模版名称【组织架构】
  name: "department",

  // 引用组件
  components: {
    Department_Add,
    Model_Del,
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
    // 【数据绑定】=======================================>开始
    const API = new utils.A_Patch()       // 请求接口地址合集
    const TO = new TABLE.TableOperate()   // 表格操作方法
    const store = useStore();// 共享数据
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度
    const loading = ref(true)// 初始化【子账号】表格loading状态

    // 子账号管理======>开始
    const PAGEDATA = reactive({
          title:'组织架构',
          menudata:{'key':'33','openKeys':'setting'},            // 菜单选中配置
          colum:[],           // 表头信息
          datalist:[],        // 列表信息
          total_number:0,     // 总页数
          List_conditions:ref({
            page:1
          })
        })

    // 【删除】子账号数据初始化
    const DELDATA = reactive({
      open:false,
      actian_name:API.BasicsAPI.department.delete,// 数据删除模块名称
      detaile_obj:{}         // 数据删除键值
    })

    // 新增、编辑数据 初始化
    const ADDDATA= reactive({
      title:"",
      actian:'',// 数据删除模块名称
      open:false,
    })
    // 【数据绑定】=======================================>结束



    // 页面初始化信息 === 组件挂在之前---请求数据
    onBeforeMount(()=>{

      // 默认查询条件
      let message = {
        "page":1,
        "page_size":1000,
        condition:[{
          type: "orderby",
          condition: [{'column_name': 'create_time', 'value': 'DESC', }]
        }]}

        Get_list(message) // 【页面初始化】&&刷新表格

    })

    //【当前页面表格】&&刷新表格
    const pagecallback =()=>{
      let message = {}
      message.page = 1;
      message.page_size = 1000;
      receive(message)
    }


    // [翻页组件点击后]&&刷新表格
    const receive = (message)=>{

      loading.value = true    // 开启loading状态
      // 刷新页面查询条件
      message.condition = [{
          type: "orderby",
          condition: [{'column_name': 'create_time', 'value': 'DESC', }]
        }]

      Get_list(message) // 刷新表格

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


    

    // 【添加部门】
    const Add_fun=()=>{
      ADDDATA.title="添加部门"
      ADDDATA.action='department/add'
      ADDDATA.data = {
        name:undefined,
        id:undefined,
        parent_id:undefined,
      };
      ADDDATA.open = true;
    }

    // 【编辑部门】
    const Edit_Fun=(data)=>{
      ADDDATA.title="编辑部门"
      ADDDATA.action='department/update'
      ADDDATA.data = {
        name:data.name,
        b_id:data.b_id,
        id:data.id,
        parent_id:data.parent_id,
      };
      ADDDATA.open = true;
    }

    // 【删除部门】
    const Del_Fun = (detaile_data)=>{
      DELDATA.detaile_obj.id = detaile_data.id;
      DELDATA.open = true;
    }

    const rowSelection = ref({
      checkStrictly: false,
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
    TO.message.url = API.BasicsAPI.department.list

    TO.actions.list(message,(res)=>{

      TO.department.add_colum(res)        // 添加表头

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
      PAGEDATA,
      rowSelection,
      ADDDATA,
      DELDATA,
      loading,
      receive,
      innerHeight,
      Add_fun,
      pagecallback,
      Del_Fun,
      Edit_Fun,
    }
  }


})
</script>

<style>
.ant-tree-treenode{width: 100%;}
.depart_btn_m{margin: 0 8px;}
.depart_btn_d{margin: 0 0 0 18px;}
.ant-table-body{
   height: calc(100vh - 245px);
   min-height: 0px;
}

</style>