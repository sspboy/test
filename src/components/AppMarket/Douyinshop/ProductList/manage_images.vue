<!-- 商品列表 图片管理 组件 -->
<template>

<a-drawer
    class="custom-class"
    root-class-name="root-class-name"  
    :root-style="{ color: 'blue' }"
    title="图片预览"
    placement="right"
    width="50%"
    @afterOpenChange="load_product_images"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
    :open="props.data.ImageDate"
  >
      <a-layout-content class="content">

        <!-- 页面加载状态-->

        <a-flex style="height: calc(80vh);" justify="center" align="center" disabled v-if="PAGEDATA.page_loading">
          <a-spin v-model:spinning="PAGEDATA.page_loading" />
        </a-flex>

        <div v-show="!PAGEDATA.page_loading">

          <div class="speclayout">
            <a-divider orientation="left" orientation-margin="0px">主图</a-divider>
            <div v-for="item,index in PAGEDATA.pic">
              <div v-if="item === undefined" class="img_80 text_center_12 cursor">暂无</div>
              <a-card v-else class="cardstyle cursor" hoverable style="float: left;margin-right: 10px;">
                  <template #cover>
                    <a-image :src="item" style="border-radius: 6px;" />
                  </template>
                  <template #actions>
                    <a href="#" class="font_size_12">尺寸</a>
                    <!-- <a href="#" class="font_size_12">白底图</a>
                    <a href="#" class="font_size_12">去水印</a>
                    <a href="#" class="font_size_12">去水印</a> -->
                    <a href="#" class="font_size_12" @click="fun.del_pic(index)">删除</a>
                  </template>
              </a-card>
            </div>
            <div v-if="PAGEDATA.pic.length < 5" class="add_img_1_1 text_center_12 cursor">+ 主图</div>
          </div>

          <a-row>
            <a-col :span="24">
              <a-divider orientation="left" orientation-margin="0px">白底图</a-divider>
              <div 
                v-if="PAGEDATA.white_back_ground_pic_url === undefined || PAGEDATA.white_back_ground_pic_url === null" 
                class="img_80 text_center_12 cursor"
              >
                + 白底图
              </div>
              <a-card v-else class="cardstyle cursor" hoverable>
                <template #cover>
                  <a-image :src="PAGEDATA.white_back_ground_pic_url" style="border-radius: 6px;" />
                </template>
                <template #actions>
                  <a href="#" class="font_size_12">编辑</a>
                  <a href="#" class="font_size_12" @click="fun.del_white_back_ground_pic">删除</a>
                </template>
              </a-card>
            </a-col>
          </a-row>

          <a-divider orientation="left" orientation-margin="0px">3:4主图</a-divider>
          <div class="speclayout">
            <div v-for="item,index in PAGEDATA.main_pic_3_4">
              <a-card v-if="item !=undefined" class="cardstyle_3_4 cursor" hoverable style="float: left;margin-right: 10px;">
                  <template #cover>
                  <a-image :src="item" style="border-radius:6px;" />
                  </template>
                  <template #actions>
                  <a href="#" class="font_size_12">编辑</a>
                  <a href="#" class="font_size_12" @click="fun.del_main_pic_3_4(index)">删除</a>
                </template>
                </a-card>
            </div>
            <div style="float: left;margin-right: 10px;" v-if="PAGEDATA.main_pic_3_4.length < 5" class="img_loading_3_4 text_center_12 cursor">+ 3:4主图</div>
          </div>

          <a-divider orientation="left" orientation-margin="0px">规格图</a-divider>
          <div class="speclayout">
            <div v-if="PAGEDATA.spec_pic === undefined || PAGEDATA.spec_pic === null || PAGEDATA.spec_pic.length === 0" class="img_80 text_center_12 cursor">暂无</div>
            <div v-for="item,index in PAGEDATA.spec_pic">
              <a-card class="cardstyle cursor" hoverable style="float: left;margin-right: 10px;">
                  <template #cover>
                  <a-image :src="item" style="border-radius: 6px;" />
                  </template>
                  <template #actions>
                    <a href="#" class="font_size_12">编辑</a>
                  </template>
                </a-card>
            </div>
          </div>

          <a-divider orientation="left" orientation-margin="0px">描述详情</a-divider>
          <div class="speclayout">
            <div v-for="item,index in PAGEDATA.description">
              <a-card v-if="item.url !=undefined" class="cardstyle cursor" hoverable style="float: left;margin-right: 10px;">
                  <template #cover>
                    <div style="width: 110px;height: 110px;display: flex;justify-content: center;align-items: center;">
                      <a-image :src="item.url" :width="item.width" :height="item.height" style="border-radius:6px;" />
                    </div>
                  </template>
                  <template #actions>
                  <a href="#" class="font_size_12">编辑</a>
                  <a href="#" class="font_size_12" @click="fun.del_description(index)">删除</a>
                </template>
                </a-card>
            </div>
            <div class="img_80 text_center_12 cursor">+描述图</div>

          </div>
        </div>

      </a-layout-content>

      <!--底部按钮-->
      <template #footer>
        <a-space style="float: left;">
          <a-button type="primary" @click="handleOk" style="font-size: 12px;" :loading="loading">保存</a-button>
          <a-button @click="onClose" style="font-size: 12px;">取消</a-button>
        </a-space>
      </template>
      
    </a-drawer>
      </template>
<script>
import { defineComponent,reactive,ref, } from 'vue';
import axios from "axios";
import * as utils from '@/assets/JS_Model/public_model';
import * as TOOL from '@/assets/JS_Model/tool';
import { checkboxGroupProps } from 'ant-design-vue/es/checkbox';

export default defineComponent({

    name: "manage_images",  // 筛选条件查询组件
    // 引用组件
    components: {


    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        // console.log(props.data.product_id);
        const tool = new TOOL.TOOL()            // 工具方法
        const product_id = props.data.product_id // 商品id
        const API = new utils.A_Patch()         // 请求接口地址合集
        const PAGEDATA = reactive({
          page_loading:true, // 页面加载状态
          pic:[], // 主图列表
          white_back_ground_pic_url:undefined,// 白底图列表
          video:undefined,// 视频列表
          long_pic_url:[{},{},{},{},{}],// 3:4长图列表
          main_pic_3_4:[],// 3:4主图列表
          spec_pic:[],// 规格图列表
          description:undefined,// 描述详情图列表
        })

        // 打开抽屉回调
        const load_product_images = async() => {

          // console.log('打开抽屉回调');

          // 请求商品接口
          const res = await axios.post(API.AppSrtoreAPI.dou_product.detaile, {
            product_id: product_id
          }).catch(err => {
            console.log(err);
          });

          PAGEDATA.page_loading = false; // 开始加载

          var res_data = res.data.data;
          // console.log(res_data);

          // 主图列表
          fun.add_pic(res_data.pic);
          PAGEDATA.white_back_ground_pic_url = res_data.white_back_ground_pic_url;// 白底图列表
          fun.add_main_pic_3_4(res_data.main_pic_3_4);
          fun.add_spec_pic(res_data.spec_pics);// 规格图列表
          fun.add_description(res_data.description);

        }
        
        // function load_product_images end
        const fun = {
          
          // 主图转义
          add_pic:(data)=>{
            for(let i = 0;i<data.length;i++){
              PAGEDATA.pic.push(data[i]);
            }
          },
          // 3:4主图转义
          add_main_pic_3_4:(data)=>{
            for(let i = 0;i<data.length;i++){
              PAGEDATA.main_pic_3_4.push(data[i])
            }
          },
          // 规格图转义
          add_spec_pic:(data)=>{

            if(data === undefined || data.length > 0){
              for(let i = 0;i<data.length;i++){
                PAGEDATA.spec_pic.push(API.AppSrtoreAPI.meiuri + data[i].pic);
              }
            }
          },
          // 描述图转义
          add_description:(data)=>{
            var re_zyf = /https:(.*?)"/g;// 单组sku
            var re_S = new RegExp(re_zyf);
            var dan_res = data.match(re_S);
            for(let i = 0;i<dan_res.length;i++){
              var img_url= dan_res[i].slice(0,dan_res[i].length-1);
              // console.log('描述图片url', img_url);
              var img_url_width_height_list = img_url.match(/www(.*)/g)[0].slice(3).split('-');
              // console.log('描述图片宽高', img_url_width_height_list);

              var url_width = parseInt(img_url_width_height_list[0]);// 宽度
              var url_height = parseInt(img_url_width_height_list[1]);// 高度
              // 高度等比缩放到110px，计算宽度
              var img_url_width_height_list_110 = [];
              if(url_width>url_height){
                img_url_width_height_list_110[0] = 110;// 图片宽度
                img_url_width_height_list_110[1] = Math.floor(url_height * (110 / url_width));// 图片高度
              }else{
                img_url_width_height_list_110[0] = Math.floor(url_width * (110 / url_height));
                img_url_width_height_list_110[1] = 110;
              }

              dan_res[i] = {
                url:img_url,
                width:img_url_width_height_list_110[0],// 图片宽度
                height:img_url_width_height_list_110[1]// 图片高度
              };
              // console.log('描述图片宽高等比缩放110px', dan_res[i]);
            }
            // console.log('描述图正则结果', dan_res);
            PAGEDATA.description = [...dan_res];
          },
          // 主图验证==不能为空
          check_pic:()=>{
            if(PAGEDATA.pic.length === 0){
              return false;
            }else{
              var url_list = []
              for(let i = 0;i<PAGEDATA.pic.length;i++){
                if(PAGEDATA.pic[i].url !== undefined){
                  url_list.push(PAGEDATA.pic[i].url);
                }
              }
              return url_list.join('|')
            }
          },
          // 3:4主图验证
          check_main_pic_3_4:()=>{
            var url_list = []
            for(let i = 0;i<PAGEDATA.main_pic_3_4.length;i++){
              if(PAGEDATA.main_pic_3_4[i].url !== undefined){
                url_list.push(PAGEDATA.main_pic_3_4[i].url);
              }
            }
            if(url_list.length == 0){
              return false;
            }else{
              return url_list.join('|')
            }
          },
          // 规格图验证
          check_spec_pic:()=>{
            if(PAGEDATA.spec_pic.length == 0){
              return false;
            }else{
              var url_list = []
              for(let i = 0;i<PAGEDATA.spec_pic.length;i++){
                url_list.push(PAGEDATA.spec_pic[i]);
              }
              return url_list.join('|')
            }
          },
          // 描述图验证==不能为空
          check_description:()=>{
            if(PAGEDATA.description.length == 0){
              return false;
            }else{
              return PAGEDATA.description.join('|');
            }
          },
          // 主图删除
          del_pic:(index)=>{
            PAGEDATA.pic.splice(index,1);
          },
          // 白底图删除
          del_white_back_ground_pic:()=>{
            PAGEDATA.white_back_ground_pic_url = undefined;
          },
          // 3:4主图删除
          del_main_pic_3_4:(index)=>{
            PAGEDATA.main_pic_3_4.splice(index,1);
          },
          // 3:4长图删除
          del_long_pic_3_4:(index)=>{
            PAGEDATA.long_pic_url.splice(index,1);
          },
          // 规格图删除
          del_spec_pic:(index)=>{
            PAGEDATA.spec_pic.splice(index,1);
          },
          // 描述图删除
          del_description:(index)=>{
            PAGEDATA.description.splice(index,1);
          }
        }

        // 保存方法
        const handleOk = (e) => {
          
          // loading.value = true;

          var upload_data = {
            product_id: product_id,
            pic: [],// 主图列表
            white_back_ground_pic_url:PAGEDATA.white_back_ground_pic_url,// 白底图列表
            main_pic_3_4:[],// 3:4主图列表
            spec_pics:PAGEDATA.spec_pic,// 规格图列表
            description:PAGEDATA.description,// 描述详情图列表
          }

          // 主图
          var pic = fun.check_pic()
          if(pic === false){
            tool.Fun_.message('warning','主图不能为空');
            return false; 
          }else{
            console.log('主图验证结果', pic);
          }

          // 白底图
          if(PAGEDATA.white_back_ground_pic_url != undefined){
            console.log('白底图验证结果', PAGEDATA.white_back_ground_pic_url);
          }
          // 3:4主图
          var main_pic_3_4 = fun.check_main_pic_3_4();
          if(main_pic_3_4){
            // main_image_three_to_four
            console.log('3:4主图验证结果', main_pic_3_4);
          }

          // 规格图
          var spec_pic = fun.check_spec_pic();
          if(spec_pic === false){
            tool.Fun_.message('warning','规格图不能为空');
            return false;
          }else{
            console.log('规格图验证结果', spec_pic);
          }

          // 描述详情图
          var description = fun.check_description();
          if(description === false){
            tool.Fun_.message('warning','描述详情图不能为空');
            return false;
          }else{
            console.log('描述详情图验证结果', description);
          }
        };

        // 取消方法
        const onClose = () => {
            props.data.ImageDate = false;
        };

        // 更新商品到接口
        const loading = ref(false);
        const from_submit = () => {
          console.log('更新商品到接口');
        }


        return{
            props,
            API,
            load_product_images,
            PAGEDATA,
            handleOk,
            loading,
            onClose,
            fun
        }
    }
})
</script>
<style scoped>
.img_80{border-radius: 6px;border: 1px #f2f2f2 solid;padding: 6px;height: 164px;width: 120px;}
.text_center_12{justify-content: center;display: flex;align-items: center;font-size: 12px;color: #e8e8e8;}/*文字垂直居中*/
.cardstyle{padding: 5px;margin: 0 0 10px 0;width: 120px;height: 166px;text-align: center;}
.cardstyle_3_4{padding: 5px;margin: 0 0 10px 0;width: 120px;height: 202px;}
.add_img_1_1{float: left;border: 1px #f2f2f2 solid;width: 120px;height: 166px;border-radius: 6px;}
.p_m{padding: 0;margin: 0;}
.img_loading_3_4{width: 120px;height: 202px;border: 1px #f2f2f2 solid;text-align: center;border-radius: 6px;}
.speclayout{display: flex;justify-content: flex-start;flex-wrap: wrap;}/*规格图布局*/

.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>