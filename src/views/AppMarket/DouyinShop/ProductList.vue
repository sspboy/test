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

          <!--条件查询组件 开始 -->

              <Siftcondition :data="PAGEDATA" @sift_callback="sift_select"/>

          <!--条件查询组件 结束 -->
          
          
          <!--列表组件 开始 -->
          <a-flex :style="{ height: innerHeight + 'px', overflow: 'auto'}" :justify="PAGEDATA.justify" :align="PAGEDATA.align">

            <a-list :data-source="PAGEDATA.datalist" :loading="PAGEDATA.loading" style="width: 100%;">
              
              <template #renderItem="{ item }">
                
                <a-list-item style="padding: 14px;">

                  <a-list-item-meta>

                    <template #avatar>
                      <div class="cursor ListImg">
                        <img :src="item.img" alt="" style="width: 100%;height: 100%;border-radius: 5px;">
                      </div>
                    </template>

                    <template #title>
                      <a-row>
                        <a-col :span="16">
                          
                          <div class="title_div_box">
                            <a-space size="18">
                              <div class="font_size_12">标题前缀sdasd</div>
                              <div class="font_size_12"><a href="#" style="color:black;">{{ item.name }}</a></div>
                              <div class="font_size_12" style="padding-left:24px;">标题后缀</div>
                            </a-space>
                          </div>

                          <a-space align="end" style="height: 26px;overflow: hidden;">
                            <div class="ProductIDStyle cursor">ID 32432532523</div>
                            <div class="title_text_span">普通商品</div>
                            <div class="title_text_span">在售</div>
                            <div class="title_text_span">审核通过</div>
                            <div class="title_text_span">类目A>类目B>类目C</div>
                            <div class="title_text_span">销量:1000</div>
                            <div class="title_text_span">运费模板</div>
                            <div class="title_text_span">详情描述</div>
                          </a-space>
                        </a-col>
                        
                        <a-col :span="4">
                          
                          <a-row>
                            <a-col :span="24">
                              <div class="list_span_one">
                                <a-space>
                                  <span class="font_size_12">是否驳回</span>
                                  <span class="font_size_12">是否核销</span>
                                </a-space>
                              </div>
                            </a-col>
                            <a-col :span="24">
                              <div class="list_span_two">
                                <a-space>
                                  <span class="font_size_12">是否整改</span>
                                  <span class="font_size_12">是否可搭配</span>
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
                                <span class="font_size_12">{{ moment.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
                                </a-space>
                              </div>
                            </a-col>
                            <a-col :span="24">
                              <div class="list_span_two">
                                <a-space>
                                <span class="font_size_12">更新时间：</span>
                                <span class="font_size_12">{{ moment.unix(item.update_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
                                </a-space>
                              </div>
                            </a-col>
                          </a-row>  

                        </a-col>
                      </a-row>

                    </template>

                  </a-list-item-meta>

                  <template #actions>
                      <a class="font_size_12" href="#">查看</a>
                      <a class="font_size_12" href="#">删除</a>
                  </template>

                </a-list-item>

              </template>

            </a-list>

          </a-flex>
          <!--列表组件 结束 -->


          <!--翻页组件：：：发送初始化数据：：监听回传信息  -->
          <nav_pagination :fandata="PAGEDATA" v-on:complete="page_turning"/>


      </a-layout-content>




      </a-layout>


</a-layout>
</template>

<script>

import {reactive,ref,onMounted,onUnmounted} from 'vue';
import { useStore } from 'vuex'

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import { BorderTopOutlined } from '@ant-design/icons-vue';

// 筛选条件查询组件
import Siftcondition from '@/components/AppMarket/Douyinshop/siftcondition.vue';
import nav_pagination from "@/components/nav_pagination.vue";

// 网络请求工具引用
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

// 组件引用=====结束
export default {
  // 模版名称
  name: "ProductList",
  // 引用组件
  components: {
        menu_left,
        menu_head,
        Siftcondition,
        nav_pagination
    },
  // 父组件数据
  props: {},

  // 组合API返回到模版
  setup(props) {

    const store = useStore();               // 共享数据
    const moment = require('moment');       // 时间戳转换
    const tool = new TOOL.TOOL()            // 工具方法
    const API = new utils.A_Patch()         // 请求接口地址合集
    const innerHeight = ref(window.innerHeight-190); // 初始化列表高度

    // 组件挂之后---请求数据
    // 定义一个函数来处理窗口大小变化 ==
    const handleResize = () => {
      innerHeight.value = window.innerHeight-190; // 作为表格自适应高度
    };

    // 在组件挂载时添加事件监听器
    onMounted(() => {
        window.addEventListener('resize', handleResize);
        loadproductData(PAGEDATA.List_conditions)
    });

    // 在组件卸载时移除事件监听器
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
    // 【组件挂载】========================================结束

    const PAGEDATA = reactive({
      title:'商品列表',
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

      List_conditions:reactive({     // 请求条件初始化

        "page":1,
        "size":10,
        "status":0,         //  0-在线；1-下线；2-删除；
        "check_status":3,   // 1-未提交；2-待审核；3-审核通过；4-审核未通过；5-封禁；7-审核通过待上架；

      })
    })

    // 请求接口数据
    const loadproductData = async(data) => {

        PAGEDATA.loading = true;

        // 请求商品接口
        const res = await tool.Http_.post(API.AppSrtoreAPI.dou_product.list, data)
        var res_data = res.data.data;
        var res_list = res_data.data;
        var total = res_data.total;
        console.log(res_list)
        
        // 请求数据为空
        if(res_list.length == 0){
          PAGEDATA.justify = 'center';
          PAGEDATA.align = 'center';
          PAGEDATA.loading = false;
        }else{

          setTimeout(() => {
            PAGEDATA.loading = false;
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
      PAGEDATA.List_conditions.page = data.page;
      PAGEDATA.List_conditions.size = data.page_size;
      loadproductData(PAGEDATA.List_conditions)
    }
    // 【查询组件 回调方法】========================================结束
    

    // 【查询组件 回调方法】========================================开始
    const sift_select = (data)=>{
      console.log('hehe:这是回调方法')
      // loadproductData(PAGEDATA.List_conditions)

    }
    // 【查询组件 回调方法】========================================结束


    






    return {
      moment,
      innerHeight,
      PAGEDATA,
      store,
      sift_select,
      page_turning
    }

  }


}
</script>

<style scoped>
.ListImg{width: 45px;height: 45px; background-color:white;border:1px silver solid;padding:2px;border-radius: 5px;}
.title_div_box{width: 100%; height: 18px;padding: 3px 0 0 0;overflow: hidden;}
.ProductIDStyle{height: 19px;border-radius: 4px;font-size: 10px;padding: 3px 0 0 0;color: darkgray;}
.title_text_span{height: 20px;padding: 2px 0 0 0;font-size:12px;color: darkgray;}
.list_span_one{height: 20px;padding: 1px 0 0 0;color: darkgray;overflow: hidden;}
.list_span_two{height: 22px;padding: 4px 0 0 0;color: darkgray;overflow: hidden;}
</style>
