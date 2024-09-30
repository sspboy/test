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
                <span class="depart_btn_d" ><EditOutlined @click="Department_Edit_fun" :id="key"/></span>
                <span class="depart_btn_m" ><DeleteOutlined :id="key" @click="Department_Del_fun" /></span>
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
        <a-layout-content> liebiao  </a-layout-content>


      </a-layout-content>

      <!-- 表格组件 结束  -->




    </a-layout>


</a-layout>

</template>

<script>
import {defineComponent, reactive,ref} from 'vue';
import { useStore } from 'vuex'
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined,ApartmentOutlined, EditOutlined,DeleteOutlined} from '@ant-design/icons-vue';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
export default defineComponent({
  // 模版名称【组织架构】
  name: "department",
  // 引用组件
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    ApartmentOutlined,
    EditOutlined,
    DeleteOutlined,
    menu_left,
    menu_head
  },
  // 父组件数据
  props: {},
  // 组合API返回到模版
  setup(props, ctx) {
    const store = useStore();// 共享数据
    store.dispatch('member/get')

    const PAGEDATA = reactive({
      title:'组织架构',
      menudata:{'key':'33','openKeys':'sub0'},            // 菜单选中配置
      user: {},           // 用户信息
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 总页数
      menuconfig:{}       // 菜单配置
    })

    const Add_fun=()=>{
      console.log('添加成员')
    }

    const Del_fun=()=>{
      console.log('删除成员')
    }





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
    const Department_Edit_fun=(e)=>{
      console.log('编辑部门')
      console.log(e.target.parentElement.id)
    }
    // 删除部门
    const Department_Del_fun=(e)=>{
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
      expandedKeys,
      selectedKeys,
      onLoadData,
      treeData,
      Add_fun,
      Del_fun,
      Department_Add_fun,
      Department_Edit_fun,
      Department_Del_fun,
      cli_fun
    }
  }


})
</script>

<style>
.depart_btn_m{margin: 0 8px;}
.depart_btn_d{margin: 0 0 0 18px;}

</style>