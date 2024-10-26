<template>
<!--新建、编辑、删除用户数据====>开始-->
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

          <p style="padding: 14px 14px 24px 30px; clear: both;">

            <span style="float: left; margin-top: 4px;"><ApartmentOutlined /> 组织架构</span>

          </p>

          <a-tree
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            style="padding-left: 20px;"
            :load-data="onLoadData"
            :tree-data="treeData"
          >
            <template #title="{ title, id }">

              <div>
                <span :id="id" @click="cli_fun">{{ title }}</span>
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
import {computed, defineComponent, onBeforeMount, onMounted, onUnmounted, reactive, ref} from 'vue';
import { useStore } from 'vuex'
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined,ApartmentOutlined, EditOutlined,DeleteOutlined} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { Depart} from '/src/assets/JS_Model/department.js'
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/department';
// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";
import Department_Add from "@/components/BasicSetting/Department_Add.vue";
import Model_Del from "@/components/admin/Model_Del.vue";
import Team_Add from "@/components/BasicSetting/Team_Add.vue";

export default defineComponent({
  // 模版名称【组织架构】
  name: "team",
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

    // 【数据绑定】=======================================>开始
    const API = new utils.A_Patch()       // 请求接口地址合集
    const TO = new TABLE.TableOperate()   // 表格操作方法
    const store = useStore();// 共享数据
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度
    const loading = ref(true)// 初始化【子账号】表格loading状态

    // 子账号管理======>开始
    const PAGEDATA = reactive({
      title:'团队管理',
      menudata:{'key':'63','openKeys':'sub0'},            // 菜单选中配置
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
    })

    // 删除子账号数据初始化
    const DELDATA = reactive({
      open:false,
      actian_name:'',// 数据删除模块名称
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
        "page_size":10,
        condition:[{
          type: "orderby",
          condition: [{'column_name': 'create_time', 'value': 'DESC', }]
        }]}

        Get_list(message) // 【页面初始化】&&刷新表格

    })

    //当前页面表格&&刷新表格
    const pagecallback =()=>{
      loading.value = true    // 开启loading状态
      let message = {}
      message.page = TO.message.page;
      message.page_size = TO.message.page_size;
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

    // 【编辑】
    const Edit_Fun=(data)=>{
      ADDDATA.title="编辑成员"
      ADDDATA.action='team/update'
      ADDDATA.data = {
        id:data.id,
        name:data.name.split(':')[1],
        nickname:data.nickname,
        mobile:data.mobile,
        password:data.password,
        state:data.state + '',
        role:JSON.parse(data.role),
        department_id:data.department_id,
        department_name:data.department_name,
      };
      ADDDATA.open = true;
    }

    // 【添加】
    const Add_fun=()=>{

      ADDDATA.title="添加成员"
      ADDDATA.action='team/add'
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

    // 【删除】
    const Del_Fun = (detaile_data)=>{
      DELDATA.detaile_obj.id = detaile_data.id;
      DELDATA.actian_name = API.BasicsAPI.team.delete;// 数据删除模块名称
      DELDATA.open = true;
    }


    // 【刷新表格】
    const Get_list = (message) =>{

      // 请求接口地址赋值
      TO.message.url = API.BasicsAPI.team.list

      TO.actions.list(message,(res)=>{
        
        TO.team.add_colum(res)        // 添加表头

        if(res.data !== 'None'){

          // 页面赋值
          // console.log(res)
          PAGEDATA.colum = res.colum
          PAGEDATA.datalist = res.data
          PAGEDATA.total_number =res.total_number
        }
        loading.value = false // loading 状态关闭

      })

    }

    // 子账号管理======>结束





    // 【部门】树状结构===========================================开始
    const expandedKeys = ref([]);
    const selectedKeys = ref([]);
    var D = new Depart()// 部门选择下拉赋值==当前品牌所有部门id、名称
    // 部门选择下拉赋值==当前品牌所有部门id、名称
    const treeData = ref([])
    const AllDepart = ref([])
    const Dpartment_PAGEDATA = reactive({
      title:"",
      actian:'',// 数据删除模块名称
      open:false,
    })
    // 获取组织架构全部数据


    // 刷新组织架构一级目录
    const resh_department = ()=> {

      var t_list = []
      var a_list = []

      D.all_.get_all_department((res)=>{

        for(let i of res.data){
          let r_obj = {}
          r_obj.title = i.name;
          r_obj.id = i.id;
          r_obj.parent_id = i.parent_id;
          r_obj.isLeaf = true;
          // isLeaf: true,// 是否下一级
          a_list.push(r_obj)
          if(i.parent_id == '0'){t_list.push(r_obj)} // 一级部门
        }

        for(let m of t_list){
          if(vaif(m, a_list)){
            m.isLeaf = false
          }
        }
        treeData.value = [...t_list]
        AllDepart.value = [...a_list]
      })



    }

    // 判断是否有下一级
    const vaif = (t_obj, all_obj) =>{
      var id = t_obj.id + '';
          for(let x of all_obj){
            var parent_id = x.parent_id + ''
            if (id === parent_id){
              return true
            }
          }
      }

    // 初始化部门信息
    resh_department()


    // 点击请求下级部门
    const onLoadData = treeNode => {

      var id = treeNode.dataRef.id
      return new Promise(resolve => {

        if (treeNode.dataRef.children) {

          resolve();

          return;

        }

        setTimeout(() => {

          // 被点击的节点添加子菜单
          treeNode.dataRef.children = [];
          for(let i of AllDepart.value){
            if(i.parent_id == id){
              if(vaif(i, AllDepart.value)){
                  i.isLeaf = false
              }
              treeNode.dataRef.children.push(i)
            }
          }

          // 重新赋值
          treeData.value = [...treeData.value];

          resolve();

        }, 1000);
      });
    };


    // 点击部门查询员工
    const cli_fun = node =>{
      console.log(node.target.textContent)
      console.log(node.target.id)
    }

    // 树状结构==================================================结束


    return {
      store,
      PAGEDATA,
      Dpartment_PAGEDATA,
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
      resh_department,
      cli_fun,
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