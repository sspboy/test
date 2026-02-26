<!-- 商品列表 图片管理 组件 -->
<template>

<a-drawer
    v-model:open="props.data.ImageDate"
    class="custom-class"
    root-class-name="root-class-name"  
    :root-style="{ color: 'blue' }"
    style="color: red"
    title="图片预览"
    placement="right"
    width="50%"
    @afterOpenChange="load_product_images"
  >
      <a-layout-content class="content">

        <!-- 页面加载状态-->

        <a-flex style="height: calc(80vh);" justify="center" align="center" disabled v-if="PAGEDATA.page_loading">
          <a-spin v-model:spinning="PAGEDATA.page_loading" />
        </a-flex>

        <div v-show="!PAGEDATA.page_loading" style="padding: 0 0 100px 0;background-color: aqua;">
          <a-divider orientation="left" orientation-margin="0px">主图</a-divider>
              <a-list :grid="{ gutter: 12 }" :data-source="PAGEDATA.pic">
                <template #renderItem="{ item }">
                  <a-list-item style="padding: 0;margin: 0;">
                    <div v-if="item.url === undefined" class="img_80 text_center_12 cursor">暂无</div>
                    <div v-else class="img_80">
                        <a-image :src="item.url" :width="80" style="border-radius: 6px;" />
                    </div>
                  </a-list-item>
                </template>
              </a-list>
            <a-row>
              <a-col :span="12">
                <a-divider orientation="left" orientation-margin="0px">白底图</a-divider>
                <div v-if="PAGEDATA.white_back_ground_pic_url === undefined || PAGEDATA.white_back_ground_pic_url === null" class="img_80 text_center_12 cursor">暂无</div>
                <div v-else class="img_80">
                  <a-image :src="PAGEDATA.white_back_ground_pic_url" :width="80" style="border-radius: 6px;" />
                </div>
              </a-col>
              <a-col :span="12">
              <a-divider orientation="left" orientation-margin="0px">视频</a-divider>
              <div v-if="PAGEDATA.video === undefined" class="img_80 text_center_12 cursor">暂无</div>
              <div v-else class="img_80">
                <p class="img_80 cursor">
                    <a :href="videoData.url" target="_blank">
                        <img :src="videoData.img_src" style="width: 80px;height: 80px;"/>
                    </a>
                </p>
              </div>
              

              </a-col>
            </a-row>
          <a-divider orientation="left" orientation-margin="0px">3:4主图</a-divider>
              <a-list :grid="{ gutter: 12 }" :data-source="PAGEDATA.main_image_three_to_four">
                <template #renderItem="{ item }">
                  <a-list-item style="padding: 0;margin: 0;">
                    <div v-if="item.url === undefined" class="img_loading_3_4 text_center_12 cursor">暂无</div>
                    <div v-else class="img_loading_3_4">
                        <a-image :src="item.url" :width="80" style="border-radius: 6px;" />
                    </div>
                  </a-list-item>
                </template>
              </a-list>

          <a-divider orientation="left" orientation-margin="0px">3:4长图</a-divider>
            <a-list :grid="{ gutter: 12 }" :data-source="PAGEDATA.long_pic_url">
              <template #renderItem="{ item }">
                <a-list-item style="padding: 0;margin: 0;">
                  <div v-if="item.url === undefined" class="img_loading_3_4 text_center_12 cursor">暂无</div>
                  <div v-else class="img_loading_3_4">
                      <a-image :src="item.url" :width="80" style="border-radius: 6px;" />
                  </div>
                </a-list-item>
              </template>
            </a-list>
          
          
          <a-divider orientation="left" orientation-margin="0px">规格图</a-divider>
            <div v-if="PAGEDATA.spec_pic === undefined || PAGEDATA.spec_pic === null || PAGEDATA.spec_pic.length === 0" class="img_80 text_center_12 cursor">暂无</div>
            <div v-else>
              <div class="specbox" v-for="value in PAGEDATA.spec_pic" :key="value">
                <a-image :src="API.AppSrtoreAPI.meiuri + value.pic" :width="80" style="border-radius: 6px;" />
              </div>
            </div>

          <a-divider orientation="left" orientation-margin="0px">描述详情</a-divider>
            <div v-if="PAGEDATA.description === undefined || PAGEDATA.description === null || PAGEDATA.description.length === 0" class="img_80 text_center_12 cursor">暂无</div>
            <div v-else>
              <div class="specbox" v-for="value in PAGEDATA.description" :key="value">
                <a-image :src="value" :height="80" style="border-radius: 6px;" />
              </div>
            </div>
        </div>

      </a-layout-content>
      </a-drawer>
      </template>
<script>
import { defineComponent,reactive,ref, } from 'vue';
import axios from "axios";
import * as utils from '@/assets/JS_Model/public_model';
import { t } from '@wangeditor/editor';

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

        console.log(props.data.product_id);
        const product_id = props.data.product_id // 商品id
        const API = new utils.A_Patch()         // 请求接口地址合集
        const PAGEDATA= reactive({
          page_loading:true, // 页面加载状态
          pic:[{},{},{},{},{}], // 主图列表
          white_back_ground_pic_url:undefined,// 白底图列表
          video:undefined,// 视频列表
          long_pic_url:[{},{},{},{},{}],// 3:4长图列表
          main_image_three_to_four:[{},{},{},{},{}],// 3:4主图列表
          spec_pic:[],// 规格图列表
          description:undefined,// 描述详情图列表
        })

        // 打开抽屉回调
        const load_product_images = async() => {

          console.log('打开抽屉回调');

          // 请求商品接口
          const res = await axios.post(API.AppSrtoreAPI.dou_product.detaile, {
            product_id: product_id
          }).catch(err => {
            console.log(err);
          });

          PAGEDATA.page_loading = false; // 开始加载

          var res_data = res.data.data;
          console.log(res_data);

          // PAGEDATA.pic = res_data.pic; // 主图列表
          fun.add_pic(res_data.pic);
          console.log('主图',res_data.pic);

          PAGEDATA.white_back_ground_pic_url = res_data.white_back_ground_pic_url;// 白底图列表
          console.log('白底图',res_data.white_back_ground_pic_url);

          // PAGEDATA.video = res_data.video_url_list;// 视频列表
          console.log('视频',res_data.video_url_list);

          // PAGEDATA.long_pic_url = res_data.long_pic_url_list;// 3:4长图列表
          console.log('3:4长图',res_data.long_pic_url_list);

          // PAGEDATA.main_image_three_to_four = res_data.main_image_three_to_four;// 3:4主图列表
          console.log('3:4主图',res_data.main_image_three_to_four);

          PAGEDATA.spec_pic = res_data.spec_pics;// 规格图列表
          console.log('规格图',res_data.spec_pics);
          console.log('规格图',typeof res_data.spec_pics);

          // PAGEDATA.description = res_data.description;// 描述详情图列表
          fun.add_description(res_data.description);
          console.log('描述详情图',res_data.description);

        }
        
        // function load_product_images end
        const fun = {
          
          // 主图
          add_pic:(data)=>{
            for(let i = 0;i<5;i++){
              console.log(data[i]);
              PAGEDATA.pic[i].url = data[i];
            }
          },
          // 描述图
          add_description:(data)=>{
            var re_zyf = /https:(.*?)"/g;            // 单组sku
            var re_S = new RegExp(re_zyf);
            var dan_res = data.match(re_S);
            for(let i = 0;i<dan_res.length;i++){
              dan_res[i] = dan_res[i].slice(0,dan_res[i].length-1);
            }
            console.log('描述图正则结果', dan_res);
            PAGEDATA.description = [...dan_res];
          },
          

        }

        // 提交按钮回调
        const handleOk = e => {
            console.log(e);
        };


        return{
            props,
            API,
            load_product_images,
            PAGEDATA,
            handleOk,
        }
    }
})
</script>
<style scoped>
.img_80{border-radius: 6px;border: 1px #f2f2f2 solid;padding: 6px;height: 94px;width: 94px;}
.text_center_12{justify-content: center;display: flex;align-items: center;font-size: 12px;color: #e8e8e8;}/*文字垂直居中*/
.p_m{padding: 0;margin: 0;}
.img_loading_3_4{width: 80px;height: 114px;border: 1px #f2f2f2 solid;text-align: center;border-radius: 6px;}
.specbox{display: block;float: left;text-align: center;margin:0 10px 10px 0;border: 1px solid #e8e8e8;border-radius: 6px;padding:6px;width: 90px;height: 90px;}

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