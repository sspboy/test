<template>
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
              <a-col :span="1" :order="1">
                  <!--导航收起按钮-->
                  <a-button type="primary" size="small" style="font-size: 12px; margin:3px 16px 0 0;" @click="() => { store.commit('menu/change') }">
                    <menu-unfold-outlined v-if="store.state.menu.coll" class="trigger" />
                    <menu-fold-outlined v-else class="trigger" />
                  </a-button>
              </a-col>
              <a-col :span="23" :order="5">

              </a-col>
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

            <template v-slot:bodyCell="{ column, record }">

              <!--头图-->
              <template  v-if="column.dataIndex === 'top_pic'">
                  <img :src="record.top_pic" style="width: 50px; height: 50px;border-radius: 5px;" />
              </template>

              <!--白底图-->
              <template  v-if="column.dataIndex === 'white_image'">
                  <img :src="record.white_image" style="width: 50px; height: 50px;border-radius: 5px;" />
              </template>

              <!--视频-->
              <template  v-if="column.dataIndex === 'video_url'">
                  <a>查看</a>
              </template>

              <!--主图-->
              <template  v-if="column.dataIndex === 'pic'">
                  <a>查看</a>
              </template>

              <!--sku-->
              <template  v-if="column.dataIndex === 'sku'">
                  <a>查看</a>
              </template>

              <!--属性-->
              <template  v-if="column.dataIndex === 'format'">
                  <a>查看</a>
              </template>

              <!--描述-->
              <template  v-if="column.dataIndex === 'description'">
                  <a>查看</a>
              </template>

              <!--定义操作按钮 开始-->
              <template v-if="column.key === 'operation'">
                  <a>上传</a> |                  
                  <a>编辑</a> |
                  <a>删除</a>
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
import {ref, reactive, onBeforeMount, onMounted, onUnmounted} from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined,PlusOutlined} from '@ant-design/icons-vue';
import { useStore } from 'vuex'
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/department';
import * as CopyLog from '@/assets/douyinshop/copylog';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue';
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";
// 组件引用=====结束

export default {
  
  // 复制记录
  name: "CopyRecords",
  
  // 引用组件
  components: {
    PlusOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    nav_pagination,
    menu_left,
    menu_head,
  },
  
  // 父组件数据
  props: {},

  // 组合API返回到模版
  setup(props) {
    const API = new utils.A_Patch()           // 请求接口
    const TO = new TABLE.TableOperate()       // 表格操作方法
    const store = useStore();                 // 共享数据
    const innerHeight = ref(window.innerHeight-245);// 初始化表格高度
    const loading = ref(true)                 // 初始化loading状态
    const PAGEDATA = reactive({
        title:'复制记录',
        menudata:{      // 菜单选中配置
            'key':'79',
            'openKeys':'douyinshop'
        },
      colum:[],           // 表头信息
      datalist:[],        // 列表信息
      total_number:0,     // 内容总数
    })

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
  TO.message.url = API.AppSrtoreAPI.copyrecords.list

  TO.actions.list(message,(res)=>{
    
    TO.copylog.add_colum(res)        // 添加表头

    // 页面赋值
    PAGEDATA.colum = res.colum
    var data = res.data
    PAGEDATA.datalist = data
    PAGEDATA.total_number =res.total_number

    loading.value = false // loading 状态关闭

  })
}


// 【查询组件】========================================开始

const formdata = reactive({
  shop_id: '',
  shop_name: '',
});

const handleFinish = values => {

  console.log(values, formdata);

  var shop_id = formdata.shop_id

  var shop_name = formdata.shop_name

  // 默认查询条件
  var message = {

    "page":1,

    "page_size":10,

    condition:[{

      type: "orderby",
      condition: [{'column_name': 'create_time', 'value': 'DESC', }]

    }]
  }

  var where_c = {
    type: "where",
    condition: []
  }

  if(shop_id !== ''){
    where_c.condition.push({'column_name':'shop_id','value':shop_id,'operator':'='})
  }

  if(shop_name !== ''){
    where_c.condition.push({'column_name':'shop_name','value':shop_name,'operator':'='})
  }

  if(where_c.condition.length > 0){
    message.condition.push(where_c)
  }

  console.log(message)


  // 请求列表
  Get_list(message)


};

const handleFinishFailed = errors => {
  console.log(errors);
};
// 【查询组件】========================================结束



    return {
      formdata,
      handleFinish,
      handleFinishFailed,
      API,
      PAGEDATA,
      innerHeight,
      TO,
      store,
      loading,
      receive,
      CopyLog,
    }
  }


}
</script>

<style>

.ant-table-body{
  height: calc(100vh - 245px);
  min-height: 0px;
}
.tablehiddle{display:none;}
</style>
