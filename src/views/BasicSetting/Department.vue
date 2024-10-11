<template>
<!--新建、编辑、删除用户数据====>开始-->
<!--<Department_Add :adddata="ADDDATA" v-on:add_coallback="pagecallback"/>-->
<Team_Add :adddata="ADDDATA" v-on:add_coallback="pagecallback"/>
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
        <menu_left :menudata="PAGEDATA.menudata"/> <!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->


      <!-- 组织架构 开始 -->
      <a-layout-sider style="background-color: #f5f5f5;height: 100%;padding: 6px 0 6px 6px;">

        <div style="background-color: white;height: 100%;overflow-x:scroll;width: 100%;white-space:nowrap;" >

          <p style="padding: 14px 14px 4px 10px;text-align: right;">

            <span style="float: left; margin-top: 4px;"><ApartmentOutlined /> 组织架构</span>

            <a-button primary size="small" style="font-size:12px;" @click="Department_Add_fun">
               <template #icon><PlusOutlined /></template>
            </a-button>

          </p>

          <a-tree
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            :load-data="onLoadData"
            :tree-data="treeData"
          >
            <template #title="{ title, key }">

              <div>
                <span :id="key" @click="cli_fun">{{ title }}</span>
                <span class="depart_btn_d" ><EditOutlined @click="Department_edit_fun" :id="key"/></span>
                <span class="depart_btn_m" ><DeleteOutlined :id="key" @click="Department_del_fun" /></span>
              </div>

            </template>


          </a-tree>

        </div>

      </a-layout-sider>
      <!-- 组织架构 结束 -->


      <!--表格组件 开始-->
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
                <a-button type="primary" size="small" style="font-size:12px;" @click="Add_fun">
                  <template #icon><PlusOutlined /></template>
                  添加成员
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

      <!-- 表格组件 结束  -->




    </a-layout>


</a-layout>

</template>

<script>
import {defineComponent, onBeforeMount, onMounted, onUnmounted, reactive, ref} from 'vue';
import { useStore } from 'vuex'
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined,ApartmentOutlined, EditOutlined,DeleteOutlined} from '@ant-design/icons-vue';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";
import Department_Add from "@/components/BasicSetting/Department_Add.vue";
import Model_Del from "@/components/admin/Model_Del.vue";
import Team_Add from "@/components/BasicSetting/Team_Add.vue";

export default defineComponent({
  // 模版名称【组织架构】
  name: "department",
  // 引用组件
  components: {
    Team_Add,
    Department_Add,
    Model_Del,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    ApartmentOutlined,
    EditOutlined,
    DeleteOutlined,
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

    // 页面初始化信息 === 组件挂在之前---请求数据
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

      store.dispatch('member/get')// 用户权限

    })

    //【当前页面】&&刷新表格
    const pagecallback =()=>{
      let message = {}
      message.page = store.state.team.message.page;
      message.page_size = store.state.team.message.page_size;
      receive(message)
    }

    // 刷新表格数据方法
    const Refresh_table = (message)=>{

      store.dispatch('team/list', message).then(()=>{
        PAGEDATA.colum = store.state.team.message.data_list.colum
        PAGEDATA.datalist = store.state.team.message.data_list.data
        PAGEDATA.total_number = store.state.team.message.data_list.total_number
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



    // 子账号管理======>开始

    const PAGEDATA = reactive({
      title:'组织架构',
      menudata:{'key':'33','openKeys':'sub0'},            // 菜单选中配置
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
    })

    // 【删除】数据初始化
    const DELDATA = reactive({
      open:false,
      actian_name:'department/del',// 数据删除模块名称
      detaile_obj:{}         // 数据删除键值
    })

    // 新增、编辑数据 初始化
    const ADDDATA= reactive({
      title:"",
      actian:'',// 数据删除模块名称
      open:false,
    })


    // 编辑子账号
    const Edit_Fun=(data)=>{
      console.log(data)
      ADDDATA.title="编辑成员"
      ADDDATA.action='department/update'
      ADDDATA.data = {
        name:data.name,
        nickname:data.nickname,
        mobile:data.mobile,
        password:data.password,
        state:data.state,
        role:JSON.parse(data.role),
        department_id:data.department_id,
        department_name:data.department_name,
      };
      ADDDATA.open = true;
    }

    // 添加子账号
    const Add_fun=()=>{
      ADDDATA.title="添加成员"
      ADDDATA.action='department/add'
      ADDDATA.data = {
        name:'',
        nickname:'',
        mobile:'',
        password:'123456',
        state:['0'],
        role:[],
        department_id:'',
        department:'',
      };
      ADDDATA.open = true;
    }

    // 删除子账号
    const Del_Fun=()=>{
      console.log('删除成员')
    }


    // 子账号管理======>结束





    // 树状结构====开始

    const expandedKeys = ref([]);
    const selectedKeys = ref([]);

    // 初始化数据
    const treeData = ref([
      {
        title: '销售一部',
        key: '0',
      },
      {
        title: '销售二部',
        key: '1',
      },
      {
        title: '综合管理部',
        key: '2',
        isLeaf: true,
      },
    ]);


    const onLoadData = treeNode => {

      console.log(treeNode.dataRef)

      return new Promise(resolve => {

        if (treeNode.dataRef.children) {
          resolve();
          return;
        }

        setTimeout(() => {
          // 被点击的节点添加子菜单
          treeNode.dataRef.children = [

            {
              title: 'Child Node',
              key: `${treeNode.eventKey}-0`,
            },

            {
              title: 'Child Node',
              key: `${treeNode.eventKey}-1`,
            },

          ];
          // 重新赋值
          treeData.value = [...treeData.value];

          console.log(treeData.value)

          resolve();

        }, 1000);
      });
    };

    // 添加部门
    const Department_Add_fun=()=>{
      console.log('添加部门')
    }
    // 编辑部门
    const Department_edit_fun=(e)=>{
      console.log('编辑部门')
      console.log(e.target.parentElement.id)
    }
    // 删除部门
    const Department_del_fun=(e)=>{
      console.log('删除部门')
      console.log(e.target.parentElement.id)

    }

    // 点击部门查询员工
    const cli_fun = node =>{
      console.log(node.target.textContent)
      console.log(node.target.id)
    }


    // 树状结构====结束


    return {
      store,
      PAGEDATA,
      ADDDATA,
      DELDATA,
      loading,
      receive,
      innerHeight,
      expandedKeys,
      selectedKeys,
      onLoadData,
      treeData,
      Add_fun,
      Department_Add_fun,
      Department_edit_fun,
      Department_del_fun,
      cli_fun,
      pagecallback,
      Del_Fun,
      Edit_Fun,
    }
  }


})
</script>

<style>
.depart_btn_m{margin: 0 8px;}
.depart_btn_d{margin: 0 0 0 18px;}
.ant-table-body{
   height: calc(100vh - 245px);
   min-height: 0px;
}

</style>