
<template>
  <edit :data="PAGEDATA"/>
  <detaile :data="PAGEDATA"/>
  <more_select :data="PAGEDATA"/>


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
        <!-- :style="{ height: innerHeight + 'px', overflow: 'auto'}" -->

          <a-list :data-source="PAGEDATA.datalist" :loading="PAGEDATA.loading" style="width: 100%;">
            
            <template #renderItem="{ item }">
              
              <a-list-item style="padding: 14px;">

                <a-list-item-meta>

                  <template #avatar>
                    <div class="cursor ListImg">
                      <a-image 
                      :src="item.img"
                      alt="" 
                      fallback="data:image/png;base64,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"
                      style="width: 100%;height: 100%;border-radius: 5px;" />
                    </div>
                  </template>

                  <template #title>
                    <a-row>
                      <a-col :span="14">
                        
                        <div class="title_div_box">
                            <div>
                              <a href="#" style="color:black;" @click="showDetaile">{{ item.name }}</a>
                            </div>
                        </div>

                        <a-space align="end" :size="20" style="height: 26px;overflow: hidden;font-weight:normal;">
                          <div class="title_text_span ProductIDStyle cursor">
                            <a-tooltip placement="top">
                              <template #title>
                                <span class="font_size_12">{{ item.product_id }}</span>
                              </template>
                              商品ID
                            </a-tooltip>
                          </div>
                          <div class="title_text_span">{{ Profun.Field_translation.product_type_info(item.product_type) }} </div>
                          <div class="title_text_span">{{ Profun.Field_translation.product_status(item.status) }} </div>
                          <div class="title_text_span">
                            
                            {{ Profun.Field_translation.product_check_status_info(item.check_status) }}

                                <span class="font_size_12 cursor" v-if="item.have_audit_reject_suggest == true && item.audit_reject_suggestion !== undefined"> 

                                  <a-tooltip placement="top">
                                        <template  #title>
                                          <span class="font_size_12">
                                            {{ item.audit_reject_suggestion }}
                                          </span>
                                        </template>
                                        <CloseSquareOutlined style="color:#eb2f96;" /> 驳回建议
                                      </a-tooltip>
                                </span>
                                <span class="font_size_12" v-else>
                                  <!-- <CheckSquareOutlined style="color:#52c41a;" /> 审核通过  -->
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
                          <!-- <div class="title_text_span">运费模板: {{ item.freight_id }}</div> -->
                          <!-- <div class="title_text_span">详情描述</div> -->
                        </a-space>
                      </a-col>
                      
                      <a-col :span="6">
                        
                        <a-row>
                          <a-col :span="24">
                            <div class="list_span_one">
                              <a-space>
                                <div class="font_size_12" v-if="item.need_check_out">
                                   <CloseSquareOutlined style="color:#eb2f96;" />  需要核销 
                                </div>
                                <div class="font_size_12" v-else>
                                  <CheckSquareOutlined style="color:#52c41a;" /> 无需核销
                                </div>
                              </a-space>
                            </div>
                          </a-col>
                          <a-col :span="24">
                            <div class="list_span_two">
                              <a-space>
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
                              </a-space>
                            </div>
                          </a-col>
                        </a-row>  

                      </a-col>

                      <a-col :span="4">
                        
                        <a-row>
                          <a-col :span="24">
                            <div class="list_span_one">
                              <a-space>
                              <span class="font_size_12">创建时间：</span>
                              <span style="font-size: 10px;">{{ moment.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
                              </a-space>
                            </div>
                          </a-col>
                          <a-col :span="24">
                            <div class="list_span_two">
                              <a-space>
                              <span class="font_size_12">更新时间：</span>
                              <span style="font-size: 10px;">{{ moment.unix(item.update_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
                              </a-space>
                            </div>
                          </a-col>
                        </a-row>  

                      </a-col>
                    </a-row>

                  </template>

                </a-list-item-meta>

                <template #actions>
                    <a class="font_size_12" href="#" @click="showEdit">编辑</a>
                    <a class="font_size_12" href="#">删除</a>
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
            <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 0;" ghost><CheckCircleOutlined /> 全选</a-button>
          </span>
          <nav_pagination :fandata="PAGEDATA" v-on:complete="page_turning"/>

        <!--翻页组件 -->

      </a-layout-content>
  



    </a-layout>
    <!--右侧内容部分 结束-->


</a-layout>
</template>

<script>

import {reactive,ref,onMounted,onUnmounted,computed} from 'vue';
import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import { DeleteOutlined,EditOutlined,RedoOutlined,CheckCircleOutlined,SettingOutlined,CheckSquareOutlined,CloseSquareOutlined } from '@ant-design/icons-vue';

// 筛选条件查询组件
import Siftcondition from '@/components/AppMarket/Douyinshop/ProductList/siftcondition.vue';
import edit from '@/components/AppMarket/Douyinshop/ProductList/edit.vue';
import detaile from '@/components/AppMarket/Douyinshop/ProductList/detaile.vue';
import more_select from '@/components/AppMarket/Douyinshop/ProductList/more_select.vue';

import nav_pagination from "@/components/nav_pagination.vue";

// 网络请求工具引用
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import * as PL from '@/assets/douyinshop/ProductList';

// 组件引用=====结束
export default {
  // 模版名称
  name: "ProductList",
  // 引用组件
  components: {
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
        edit,
        detaile,
        more_select
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

      title:'商品列表', // 页面标题

      menudata:{      // 菜单选中配置
            'key':'78',
            'openKeys':'douyinshop'
      },

      colum:[],             // 表头信息
      datalist:[],          // 列表信息
      total_number:0,       // 内容总数

      loading:true,         // 列表load状态
      justify:'center',     // 列表内容对齐：loading加载居中设定
      align:'center',       // 列表内容对齐：loading加载居中设定

      List_conditions:reactive({     // 查询配置

        "page":1,            // 当前页面
        "size":10,           // 显示数量

        "product_type":0,    // 商品类型
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

        "status":0,         //  在线状态
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

        "check_status":3,   // 审核状态
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


        "title_key": '',                  // 标题关键字

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

      EditDate:ref(false),              // 编辑显示状态
      DetaileDate:ref(false),           // 详情页显示状态
      MoreSelectData:ref(false)// 更多查询

    })
    
    // 查询条件初始化====默认配置
    const FromData = ref({

        "page":1,
        "size":10,
        "status":0,         //  0-在线；1-下线；2-删除；
        "check_status":3,   // 1-未提交；2-待审核；3-审核通过；4-审核未通过；5-封禁；7-审核通过待上架；
        
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
        "status":0,         //  0-在线；1-下线；2-删除；
        "check_status":3,   // 1-未提交；2-待审核；3-审核通过；4-审核未通过；5-封禁；7-审核通过待上架；
        
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
        const res = await tool.Http_.post(API.AppSrtoreAPI.dou_product.list, data)
        var res_data = res.data.data;
        var res_list = res_data.data;
        var total = res_data.total;
        // console.log(res_list)
        // for(let i of res_list){
        //   console.log(i.audit_reject_suggestion)
        // }
        
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
          }, 1000);
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

      if(data == true){// 重置刷新列表

        loadproductData(FromData.value)
      
      }else{
        data.page = 1
        data.size = 10
        data.can_combine_product = true       // 是否可搭配
        data.lookup_option = {
          "need_name_affix":true,             // 是否需要获取标题前后缀
          "need_title_limit":true,            //是否需要获取商品标题长度限制规则
        }
        data.need_rectification_info = true, // 是否需要自动整改信息
        navData.value = data // 留存查询条件到翻页使用
        loadproductData(navData.value)
      }
    }
    // 【查询组件 回调方法】========================================结束


    
    // 编辑方法
    const showEdit = () => {
      PAGEDATA.EditDate = true;
      console.log('编辑商品')
    };

    // 详情方法
    const showDetaile = () =>{
      PAGEDATA.DetaileDate = true;
      console.log('商品详情')

    }

    // 删除方法
    const showDelete = () =>{

    }

    // 是否核销

    // 是否驳回

    // 搭配组合

    // 是否整改

    // 质量分详情查询

    // 图片懒加载






    return {
      Profun,
      FromData,
      moment,
      PAGEDATA,
      store,
      sift_select,
      page_turning,

      showEdit,
      showDetaile,

    }

  }


}
</script>

<style scoped>
.ListImg{width: 55px;height: 55px; background-color:white;border:1px silver solid;padding:2px;border-radius: 5px;}
.title_div_box{width: 100%; height: 22px;overflow: hidden;padding: 4px 0 0 0;}
.ProductIDStyle{height: 16px;border-radius: 4px;font-size: 12px;color: darkgray;}
.title_text_span{height: 20px;padding: 2px 0 0 0;font-size:12px;color: darkgray;font-weight:normal;}
.list_span_one{height: 24px;padding: 4px 0 0 0;color: darkgray;overflow: hidden;font-weight:normal;}
.list_span_two{height: 28px;padding: 8px 0 0 0;color: darkgray;overflow: hidden;font-weight:normal;}
.FlexBox{overflow:auto; transition:height 0.5s ease;margin:10px 0 0 0;border:1px solid #e5e5e596;border-radius: 6px;}
</style>
