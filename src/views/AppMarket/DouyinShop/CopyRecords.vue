<template>
<!--编辑组件  开始-->
<Edit_title :data="CL.Edit.title_Data" />
<Edit_pic :data="CL.Edit.pic_Data" />
<Edit_video :data="CL.Edit.video_Data" />
<Edit_SKU :data="CL.Edit.SKU_Data" />
<Edit_white_image :data="CL.Edit.white_image_Data" />
<Edit_format :data="CL.Edit.format_Data" />
<Edit_class :data="CL.Edit.class_Data" />
<Edit_upload_image :data="CL.Edit.upload_imgage_Data" />
<Edit_des :data="CL.Edit.des_Data" />
<Model_del :data="CL.Edit.del_Data" v-on:del_callback="pagecallback"/>

<!--导航组件  结束-->

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

          <!--条件查询组件 开始 -->
          <Siftcondition  @sift_callback="sift_select"/>
          <!--条件查询组件 结束 -->

          <!--表格组件 开始 -->
          <div :style="innerHeight">
            <!--表格组件：：发送初始化数据  开始-->
            <a-table
                :row-key="record => record.id"
                :row-selection = "CL.BatchConfig"
                :loading="loading"
                :columns="PAGEDATA?.colum"
                :data-source="PAGEDATA?.datalist"
                :scroll="{ x: 1800, y: innerHeight}"
                :pagination="false"
                style="font-size:12px;"
            >

              <template v-slot:bodyCell="{ column,record }">

                <!--标题-->
                <template  v-if="column.dataIndex === 'title'">
                    <a style="color: #000;" class="cursor" v-on:click="CL.Edit.title(record)">{{record.title}}</a>
                </template>

                <!--头图-->
                <template  v-if="column.dataIndex === 'top_pic'">
                    <img class="cursor" :src="record.top_pic" style="width: 30px; height: 30px;border-radius: 5px;" v-on:click="CL.Edit.pic(record)"/>
                </template>

                <!--白底图-->
                <template  v-if="column.dataIndex === 'white_image'">
                  <div v-if="record.white_image != 0">                  
                    <img class="cursor" :src="record.white_image" style="width: 30px; height: 30px;border-radius: 5px;" v-on:click="CL.Edit.white_image(record)"/>
                  </div>
                  <div v-else>                  
                      <a-skeleton-avatar :active="false" size="default" shape="avatarShape" />
                    </div>
                </template>

                <!--视频-->
                <template  v-if="column.dataIndex === 'video_url'">
                    <div v-if="record.video_url != null">                  
                      <img class="cursor" :src="JSON.parse(record.video_url).pic" style="width: 30px; height: 30px;border-radius: 5px;" v-on:click="CL.Edit.video(record)"/>
                    </div>
                    <div v-else>                  
                      <a-skeleton-avatar :active="false" size="default" shape="avatarShape" />
                    </div>
                </template>

                <!--上传状态-->
                <template  v-if="column.dataIndex === 'state'">
                  <div v-if="record.state === 0"><a-tag class="cursor">未上传</a-tag></div>
                  <div v-else-if="record.state != 0"><a-tag color="blue">已上传</a-tag></div>
                </template>

                <!--图片上传-->
                <template  v-if="column.dataIndex === 'pic_upload_res'">
                  <a class="cursor" v-on:click="CL.Edit.upload_image(record)"><a-tag>查看</a-tag></a>
                </template>

                <!--商品分类-->
                <template  v-if="column.dataIndex === 'cate_name'">
                  <a class="cursor" v-on:click="CL.Edit.class(record)"><a-tag>查看</a-tag></a>
                </template>

                <!--sku-->
                <template  v-if="column.dataIndex === 'sku'">
                    <a class="cursor" v-on:click="CL.Edit.SKU(record)"><a-tag>查看</a-tag></a>
                </template> 

                <!--sku list-->
                <template  v-if="column.dataIndex === 'sku_list'">
                  <div v-if="record.sku_list === '0'"><a-tag class="cursor">暂无</a-tag></div>
                  <div v-else-if="record.sku_list != '0'"><a class="cursor" v-on:click="CL.Edit.SKULIST(record)"><a-tag>查看</a-tag></a></div>
                </template> 

                <!--属性-->
                <template  v-if="column.dataIndex === 'format'">
                    <a class="cursor" v-on:click="CL.Edit.format(record)"><a-tag>查看</a-tag></a>
                </template>

                <!--描述-->
                <template  v-if="column.dataIndex === 'description'">
                    <a class="cursor" v-on:click="CL.Edit.des(record)"><a-tag>查看</a-tag></a>
                </template>

                <!--定义操作按钮 开始-->
                <template v-if="column.key === 'operation'">
                    <a style="font-size: 16px;" title="商品上传"><UploadOutlined /></a> |                  
                    <!-- <a style="font-size: 16px;" title="编辑"><FormOutlined /></a> | -->
                    <a style="font-size: 16px;" title="删除" v-on:click="CL.Edit.model_del(record)"><DeleteOutlined /></a>
                </template>
                <!--定义操作按钮 结束-->

              </template>

            </a-table>
            <!--表格组件：：发送初始化数据  结束-->
          </div>

          <!--批量操作按钮-->
          <div class="batch_s">
            <a-button size="small" style="font-size: 12px;" type="primary" :disabled="!CL.BatchConfig.state.value" @click="console.log('修改')">批量修改</a-button>
            <a-button size="small" style="font-size: 12px;margin-left: 6px;" type="primary" :disabled="!CL.BatchConfig.state.value" @click="console.log('删除')">批量删除</a-button>
            <a-button size="small" style="font-size: 12px;margin-left: 6px;" type="primary" :disabled="!CL.BatchConfig.state.value" @click="console.log('导出')">批量导出</a-button>
          </div>

          <!--翻页组件：：：发送初始化数据：：监听回传信息  -->
          <nav_pagination :fandata="PAGEDATA" v-on:complete="receive"/>

      </a-layout-content>

    </a-layout>


</a-layout>
</template>

<script>
import {ref, reactive, onBeforeMount, onMounted, onUnmounted} from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined,PlusOutlined,DeleteOutlined,FormOutlined,UploadOutlined} from '@ant-design/icons-vue';
import { useStore } from 'vuex'
/** js方法引用 */
import * as utils from '@/assets/JS_Model/public_model';
import * as TABLE from '@/assets/JS_Model/TableOperate';
import * as copylog from '@/assets/douyinshop/copylog';


// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue';
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";


// 编辑组件
import Edit_title from "@/components/AppMarket/Douyinshop/edittitle.vue";
import Edit_pic from "@/components/AppMarket/Douyinshop/editpic.vue";
import Edit_video from "@/components/AppMarket/Douyinshop/editvideo.vue";
import Edit_SKU from "@/components/AppMarket/Douyinshop/editSKU.vue";
import Edit_format from "@/components/AppMarket/Douyinshop/editformat.vue";
import Edit_class from "@/components/AppMarket/Douyinshop/editclass.vue";
import Edit_white_image from "@/components/AppMarket/Douyinshop/editwhiteimage.vue";
import Edit_des from "@/components/AppMarket/Douyinshop/editdes.vue";
import Edit_upload_image from "@/components/AppMarket/Douyinshop/edituploadimage.vue";
// 删除组件
import Model_del from '@/components/AppMarket/Douyinshop/Modeldel.vue';
// 筛选条件查询组件
import Siftcondition from '@/components/AppMarket/Douyinshop/siftcondition.vue';

// 组件引用=====结束



export default {
  
  // 复制记录
  name: "CopyRecords",
  
  // 引用组件
  components: {
    PlusOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DeleteOutlined,
    FormOutlined,
    UploadOutlined,
    nav_pagination,
    menu_left,
    menu_head,
    Edit_title,
    Edit_pic,
    Edit_video,
    Edit_SKU,
    Edit_format,
    Edit_class,
    Edit_white_image,
    Edit_des,
    Edit_upload_image,
    Model_del,
    Siftcondition
  },
  
  // 父组件数据
  props: {},

  // 组合API返回到模版
  setup(props) {

    const API = new utils.A_Patch()           // 请求接口
    const TO = new TABLE.TableOperate()       // 表格操作方法
    const CL = new copylog.CopyLog()          // 表格操作方法

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
        PAGEDATA.datalist = res.data
        PAGEDATA.total_number =res.total_number
        loading.value = false // loading 状态关闭

      })
    }


  // 【查询组件 回调方法】========================================开始
  const sift_select = (data)=>{
    console.log(data)
  }
  // 【查询组件 回调方法】========================================结束



    return {
      CL,
      TO,
      API,
      store,
      loading,
      PAGEDATA,
      innerHeight,

      receive,
      pagecallback,

      sift_select
      
    }
  }


}
</script>

<style>

.ant-table-body{height: calc(100vh - 245px);min-height: 0px;}
.tablehiddle{display:none;}
.batch_s{margin:22px 0 0 0px; float: left;}



</style>
