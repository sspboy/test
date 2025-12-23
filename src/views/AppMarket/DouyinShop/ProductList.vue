

<template>
  

  <!-- 动态渲染异步组件 -->
  <add_components v-if="PAGEDATA.AddDate" :data="PAGEDATA"/>
  <edit_components v-if="PAGEDATA.EditDate" :data="PAGEDATA"/>
  <detaile_components v-if="PAGEDATA.DetaileDate" :data="PAGEDATA"/>

  <more_select :data="PAGEDATA" @moer_select_callback="sift_select"/><!--更多筛选组件-->
  <a-checkbox-group v-model:value="PAGEDATA.check_value_list" style="width: 100%;height: 100%;">

  <a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head />
    <!--head 导航组件  结束-->


    <!--右侧内容部分 开始-->
    <a-layout>

      <!--左侧 菜单组件  开始-->
      <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
        <menu_left :menudata="PAGEDATA.menudata"/><!--局部组件-->
      </a-layout-sider>
      <!--左侧 菜单组件  结束-->


      <!--右侧 内容组件  开始-->
      <a-layout-content class="content_border">
  
        <!--条件查询组件 开始 -->

        <Siftcondition :data="PAGEDATA" @sift_callback="sift_select"/>

        <!--条件查询组件 结束 -->


        <!--列表组件 开始 -->
        <a-flex :style="{height:PAGEDATA.innerHeight + 'px'}" class="FlexBox" :justify="PAGEDATA.justify" :align="PAGEDATA.align">

          <!--列表 浏览方式 -->
          <a-list
            :data-source="PAGEDATA.datalist" 
            :loading="PAGEDATA.loading" 
            style="width: 100%;"
            size="default"
            :split="true">            

            <template #renderItem="{ item }">

              <a-list-item style="padding:14px 0;">
                  <a-list-item-meta>
                    <template #avatar>
                      <div class="cursor ListImg">
                        <a-image 
                        :src="item.img"
                        alt="" 
                        style="width: 100%;height: 100%;border-radius: 5px;" />
                      </div>
                    </template>

                    <template #title>
                      <a-row>
                        <a-col :span="18">
                          <div class="title_div_box">
                                <a-checkbox :value="item.product_id"></a-checkbox>
                                <a href="#" style="color:black;" @click="showDetaile(item.product_id)">{{ item.name }}</a>
                          </div>

                          <a-space align="end" :size="10" style="height: 32px;overflow: hidden;font-weight:normal;">
                            <div class="title_text_span ProductIDStyle cursor" @click="tool.Fun_.copyToClipboard(item.product_id)">
                              <a-tooltip placement="top">
                                <template #title>
                                  <span class="font_size_12">{{ item.product_id }}</span>
                                </template>

                                商品ID- <CopyOutlined />


                              </a-tooltip>
                            </div>

                            <div class="title_text_span">
                              {{ Profun.Field_translation.product_type_info(item.product_type) }}
                            </div>

                            <div class="title_text_span">
                              <span class="left_box status_0" v-if="item.status == 0"></span>
                              <span class="left_box status_1" v-if="item.status == 1"></span>
                              <span class="left_box status_2" v-if="item.status == 2"></span>

                              {{ Profun.Field_translation.product_status(item.status) }}
                            </div>
                            
                            <div class="title_text_span">
                              <span class="left_box check_status_1" v-if="item.check_status == 1"></span>
                              <span class="left_box check_status_2" v-if="item.check_status == 2"></span>
                              <span class="left_box check_status_3" v-if="item.check_status == 3"></span>
                              <span class="left_box check_status_4" v-if="item.check_status == 4"></span>
                              <span class="left_box check_status_5" v-if="item.check_status == 5"></span>
                              <span class="left_box check_status_7" v-if="item.check_status == 7"></span>

                              {{ Profun.Field_translation.product_check_status_info(item.check_status) }}

                                  <span class="font_size_12 cursor" v-if="item.have_audit_reject_suggest == true && item.audit_reject_suggestion !== undefined"> 

                                    <a-tooltip placement="top">

                                          <template  #title>
                                            
                                            <div v-if="item.audit_reject_suggestion.reject_reason !== ''" style="font-size: 12px;">
                                              驳回原因：<span v-html="item.audit_reject_suggestion.reject_reason"></span>
                                            </div>

                                          </template>

                                          <ExclamationCircleFilled style="color:#eb2f96;font-size: 10px;" /><span> 驳回建议</span>

                                        </a-tooltip>
                                  </span>
                                  <span class="font_size_12" v-else>
                                  </span>


                            </div>
                            <div class="title_text_span cursor">
                              <a-tooltip placement="top">
                                <template  #title>
                                  <span class="font_size_12">
                                    {{ Profun.Field_translation.product_cate_name_info(item.category_detail).full_cate }}
                                  </span>
                                </template>
                                {{ Profun.Field_translation.product_cate_name_info(item.category_detail).last_cate }}
                              </a-tooltip>
                            </div>
                            <div class="title_text_span">销量{{ item.sell_num }}</div>

                          </a-space>

                          <div>
                          <a-space align="end" :size="10" style="height: 32px;overflow: hidden;font-weight:normal;">
                                  <div class="font_size_12" v-if="item.need_check_out">
                                    <CloseSquareOutlined style="color:#eb2f96;" />  需要核销 
                                  </div>
                                  <div class="font_size_12" v-else>
                                    <CheckSquareOutlined style="color:#52c41a;" /> 无需核销
                                  </div>
                                  <div class="font_size_12" v-if="item.can_combine"> 
                                    <CheckSquareOutlined style="color:#52c41a;" /> 可以搭配 
                                  </div>
                                  <div class="font_size_12 cursor" v-else> 
                                      <a-tooltip placement="top">
                                          <template  #title>
                                            <span class="font_size_12">
                                              {{ item.can_not_combine_reason }}
                                            </span>
                                          </template>
                                          <CloseSquareOutlined style="color:#eb2f96;" /> 不可搭配 
                                        </a-tooltip>
                                  </div>
                                  <div class="list_span_one">
                                    <a-space>
                                    <span class="font_size_12">
                                      创建时间：{{ moment.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                                    </span>
                                    <span class="font_size_12">
                                      更新时间：{{ moment.unix(item.update_time).format('YYYY-MM-DD HH:mm:ss') }}
                                    </span>
                                    </a-space>
                                  </div>
                          </a-space>
                          </div>
                        </a-col>
                      </a-row>

                    </template>

                  </a-list-item-meta>

                  <template #actions>
                      <a class="font_size_12" @click="showDetaile(item.product_id)"><EyeOutlined /> 查看</a>
                      <a class="font_size_12" @click="showEdit(item.product_id)"><edit-outlined /> 编辑</a>
                      <a style="margin:0 30px 0 0;" class="font_size_12" @click="deldata.play(item.product_id)"><DeleteOutlined /> 删除</a>

                  </template>

              </a-list-item>

            </template>

          </a-list>

        </a-flex>
        <!--列表组件 结束 -->


        <!--翻页组件 -->
          <span style="padding:14px 0 0 0 ;display: block;float: left;">
            <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 6px;" ghost><RedoOutlined /> 刷新列表</a-button>
            <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 6px;" ghost><DeleteOutlined /> 批量删除</a-button>
            <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 6px;" ghost><EditOutlined /> 批量修改</a-button>
            <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 0;" ghost @click="check_list"><CheckCircleOutlined /> 全选</a-button>
          </span>
          
          <nav_pagination :fandata="PAGEDATA" v-on:complete="page_turning"/>

        <!--翻页组件 -->

      </a-layout-content>

    </a-layout>
    <!--右侧内容部分 结束-->


  </a-layout>
  
  </a-checkbox-group>


<!--确认删除-->
<a-modal v-model:open="deldata.open" title="确认删除" :confirm-loading="deldata.del_loading" @ok="deldata.confirm_fun">
  <p>确认删除选中商品吗？</p>
</a-modal>

</template>

<script>

import {reactive,ref,onMounted,onUnmounted,computed,defineAsyncComponent,markRaw} from 'vue';
import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import { DeleteOutlined,EditOutlined,RedoOutlined,CheckCircleOutlined,SettingOutlined,CheckSquareOutlined,CloseSquareOutlined,CopyOutlined,ExclamationCircleFilled,EyeOutlined } from '@ant-design/icons-vue';


// 筛选条件查询组件
import Siftcondition from '@/components/AppMarket/Douyinshop/ProductList/siftcondition.vue';
import more_select from '@/components/AppMarket/Douyinshop/ProductList/more_select.vue';
import nav_pagination from "@/components/nav_pagination.vue";

// 网络请求工具引用
import axios from "axios";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import * as PL from '@/assets/douyinshop/ProductList';

// 组件引用=====结束
export default {
  // 模版名称
  name: "ProductList",
  // 引用组件
  components: {
        EyeOutlined,
        ExclamationCircleFilled,
        CopyOutlined,
        CheckSquareOutlined,
        CloseSquareOutlined,
        SettingOutlined,
        CheckCircleOutlined,
        DeleteOutlined,
        EditOutlined,
        RedoOutlined,
        menu_left,
        menu_head,
        Siftcondition,
        nav_pagination,
        more_select,
        add_components: defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add.vue')),
        edit_components: defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/edit.vue')),
        detaile_components: defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/detaile.vue'))  
    },
  // 父组件数据
  props: {},

  // 组合API返回到模版
  setup(props) {

    const store = useStore();               // 共享数据
    const moment = require('moment');       // 时间戳转换
    const tool = new TOOL.TOOL()            // 工具方法
    const API = new utils.A_Patch()         // 请求接口地址合集
    const Profun = new PL.ProductList_fun() // 商品列表方法model引用

    // 组件挂之后---请求数据===============================开始
    // 定义一个函数来处理窗口大小变化 ==
    const handleResize = () => {
      PAGEDATA.innerHeight = window.innerHeight - 180; // 作为表格自适应高度
    };

    // 在组件挂载时添加事件监听器
    onMounted(() => {
        window.addEventListener('resize', handleResize);// 窗口变换时候
        loadproductData(FromData.value)
    });

    // 在组件卸载时移除事件监听器
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    // 【组件挂载】========================================结束

    // 页面初始化数据
    const PAGEDATA = reactive({

      title:'商品管理', // 页面标题

      menudata:{      // 菜单选中配置
            'key':'78',
            'openKeys':'douyinshop'
      },

      colum:[],             // 表头信息
      datalist:[],          // 列表信息
      total_number:0,       // 内容总数

      check_value_list:ref([]), // 复选框选中值

      loading:true,         // 列表load状态
      justify:'center',     // 列表内容对齐：loading加载居中设定
      align:'center',       // 列表内容对齐：loading加载居中设定

      List_conditions:reactive({     // 默认查询配置

        "page":1,            // 当前页面
        "size":10,           // 显示数量

        "product_type":ref(undefined),    // 商品类型
        "product_type_op":[
          {
            "label":"普通商品",
            "value":0
          },
          {
            "label":"新客商品",
            "value":1
          },
          {
            "label":"虚拟商品",
            "value":3
          },
          {
            "label":"玉石闪购",
            "value":6
          },
          {
            "label":"云闪购",
            "value":7
          },
          {
            "label":"其他",
            "value":127
          },
        ],

        "status":ref(undefined),         //  在线状态
        "status_op":[
          {
            "label":"在线",
            "value":0
          },
          {
            "label":"下线",
            "value":1
          },
          {
            "label":"删除",
            "value":2
          }

        ],

        "check_status":ref(undefined),   // 审核状态
        "check_status_op":[
          {
            "label":"未提交",
            "value":1
          },
          {
            "label":"待审核",
            "value":2
          },
          {
            "label":"审核通过",
            "value":3
          },
          {
            "label":"审核未通过",
            "value":4
          },
                    {
            "label":"封禁",
            "value":5
          },
                    {
            "label":"审核通过待上架",
            "value":7
          },
        ],

        "can_combine_product":true, // 是否可搭配
        
        // 查询option
        "lookup_option":ref({
          "need_name_affix":true,       // 是否需要获取标题前后缀
          "need_title_limit":true,      //是否需要获取商品标题长度限制规则
        }),


        "title_key": undefined,                  // 标题关键字

        "options":ref([]),                // 分类选项
        "create_time":ref(undefined),     // 创建时间
        "update_time":ref(undefined),     // 更新时间


        "product_id":ref(undefined),      // id查询
        "sku_codes":ref(undefined),       // 商家编码查询
        "store_id":ref(undefined),        // 小时达商家门店id


        "need_rectification_info":true, // 是否需要自动整改信息

        "need_check_out":ref(false), // 只显示需要核销商品

        "exist_audit_reject_suggest":ref(false), // 只显示驳回商品

      }),

      innerHeight: ref(window.innerHeight - 180), // 初始化列表高度

      AddDate:ref(false),              // 新建显示状态
      EditDate:ref(false),             // 编辑显示状态
      DetaileDate:ref(false),          // 详情页显示状态
      MoreSelectData:ref(false),       // 更多查询显示状态
      product_id:ref(null),


    })
    
    // 查询条件初始化====默认配置
    const FromData = ref({

        "page":1,

        "size":10,

        // "status":0,         //  0-在线；1-下线；2-删除；
        // "check_status":3,   // 1-未提交；2-待审核；3-审核通过；4-审核未通过；5-封禁；7-审核通过待上架；
        
        "can_combine_product":true, // 是否可搭配

        // 查询option
        "lookup_option":{
          "need_name_affix":true,       // 是否需要获取标题前后缀
          "need_title_limit":true,      //是否需要获取商品标题长度限制规则
        },
        
        "need_rectification_info":true, // 是否需要自动整改信息

    })

    // 翻页查询条件
    const navData=ref({

        "page":1,
        "size":10,

        "can_combine_product":true, // 是否可搭配

        // 查询option
        "lookup_option":{
          "need_name_affix":true,       // 是否需要获取标题前后缀
          "need_title_limit":true,      //是否需要获取商品标题长度限制规则
        },

        "need_rectification_info":true, // 是否需要自动整改信息
    })

    // 请求商品列表接口数据
    const loadproductData = async(data) => {

        PAGEDATA.loading = true;

        // 请求商品接口
        const res = await axios.post(API.AppSrtoreAPI.dou_product.list, data)

        var res_data = res.data.data;
        var res_list = res_data.data;
        var total = res_data.total;

        // 请求数据为空
        if(res_list.length == 0){
          PAGEDATA.justify = 'center';
          PAGEDATA.align = 'center';
          PAGEDATA.loading = false;
          PAGEDATA.datalist = [];
          PAGEDATA.total_number = 0
        }else{
          setTimeout(() => {
            PAGEDATA.loading = false;
            PAGEDATA.justify = 'start';
            PAGEDATA.align = 'start';
            // 请求数据不为空
            PAGEDATA.datalist = res_list;
            PAGEDATA.total_number = total;
          }, 100);
        }
    }

    // 【翻页-组件 回调方法】========================================开始
    const page_turning = (data)=>{

      PAGEDATA.justify = 'flex-start';
    
      PAGEDATA.align = 'flex-start';

      navData.value.page = data.page;
    
      navData.value.size = data.page_size;

      loadproductData(navData.value)

    }
    // 【查询组件 回调方法】========================================结束
    

    // 【查询组件 回调方法】========================================开始
    const sift_select = (data)=>{
      
      PAGEDATA.List_conditions.page = 1 // 初始化翻页

      if(data == true){   // 重置刷新列表

        navData.value = FromData.value;

        loadproductData(FromData.value);
      
      }else if(data == 'suggest'){ // 只看驳回
        navData.value.query_options = {
                "exist_audit_reject_suggest":true,
                "need_audit_reject_suggest":true
        }
        
        // console.log(navData.value)

        loadproductData(navData.value);
      }else{ // 查询按钮

        navData.value = data;// 查询条件到翻页使用

        loadproductData(navData.value);

      }
    }
    // 【查询组件 回调方法】========================================结束


    // 编辑方法加载
    const showEdit = (pro_id) => {
      PAGEDATA.EditDate = true;
      PAGEDATA.product_id = pro_id
    };

    // 详情方法加载
    const showDetaile = (pro_id) =>{
      PAGEDATA.DetaileDate = true;
      PAGEDATA.product_id = pro_id
    }

    // 删除方法
    const deldata = reactive({
      product_id:ref(undefined),
      open:ref(false),
      // 弹出删除确认框
      play:(product_id)=>{
        deldata.open = true;
        deldata.product_id = product_id;
      },

      // 删除loading状态
      del_loading:ref(false),

      // 删除确认方法
      confirm_fun:()=>{

        deldata.del_loading = true;        // 删除loading状态

        // 删除接口
        axios.post(API.AppSrtoreAPI.dou_product.delete,{
          product_id:deldata.product_id

        }).then(res=>{

          deldata.del_loading = false;        // 删除loading状态
          deldata.open = false;
          deldata.product_id = undefined;
          tool.Fun_.message('success','删除成功');

          // 刷新列表
          loadproductData(navData.value)
          // if(res.data.code == 200){}
        })

      }
    })

    // 【全选】复选框选中值
    const check_list = ()=>{

      var list_number = PAGEDATA.datalist.length;// 列表数据数量

      if(list_number == 0){
        tool.Fun_.message('warning','当前列表无数据可选中');
        return false;
      }else{
        // 列表数据id集合
        var id_list = []
        for (var i=0;i<PAGEDATA.datalist.length;i++){
          id_list.push(PAGEDATA.datalist[i].product_id)
        }
        // 已全选
        if(PAGEDATA.check_value_list.length == id_list.length){
          PAGEDATA.check_value_list = []
          return false;
        }else if(PAGEDATA.check_value_list.length < id_list.length){ // 未全选
          PAGEDATA.check_value_list = id_list
          return false;
        }


      }
      



      PAGEDATA.check_value_list = id_list
    }


    // 【批量修改】

    // 【批量删除】





    return {
      tool,
      Profun,
      FromData,
      moment,
      PAGEDATA,
      store,
      sift_select,
      page_turning,
      showEdit,
      showDetaile,
      deldata,
      check_list

    }

  }


}
</script>

<style scoped>
.ListImg{width: 100px;height: 100px; background-color:white;border:1px silver solid;padding:2px;border-radius: 5px;}
.title_div_box{width: 100%; height: 26px;overflow: hidden;padding: 4px 0 0 0;font-size: 14px;}
.ProductIDStyle{height: 16px;border-radius: 4px;font-size: 12px;color: darkgray;}
.title_text_span{height: 20px;font-size:12px;color: darkgray;font-weight:normal;background-color: #f2f2f2;padding: 0 5px;border-radius: 5px;}
.list_span_one{height: 24px;padding: 4px 0 0 0;color: darkgray;overflow: hidden;font-weight:normal;}
.list_span_two{height: 28px;padding: 8px 0 0 0;color: darkgray;overflow: hidden;font-weight:normal;}
.FlexBox{overflow:auto; transition:height 0.5s ease;margin:4px 0 0 0;}


.left_box{border-radius: 4px;display: block;width: 8px;height: 8px;float: left;margin: 6px 4px 0 0;}
.status_0{background-color: #52c41a;}
.status_1{background-color: darkgray;}
.status_2{background-color: #ff0000;}
.check_status_1{background-color: darkgray;}
.check_status_2{background-color: #0066FF;}
.check_status_3{background-color: #52c41a;}
.check_status_4{background-color: #FF9900;}
.check_status_5{background-color: #ff0000;}
.check_status_7{background-color: #66FFFF;}
.ant-card .ant-card-body {padding: 0px}

</style>
