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

        <div v-show="!PAGEDATA.page_loading">
          <a-divider orientation="left" orientation-margin="0px">主图</a-divider>
              <a-list :grid="{ gutter: 0, column: 5 }" :data-source="PAGEDATA.pic">
                <template #renderItem="{ item }">
                  <a-list-item style="padding: 0;margin: 0;">
                    <div v-if="item.url === undefined" class="img_80 text_center_12 cursor">暂无</div>
                    <div v-else class="img_80">
                        <a-image :src="item.url" :width="80" style="border-radius: 6px;" />
                    </div>
                  </a-list-item>
                </template>
              </a-list>

          <a-divider orientation="left" orientation-margin="0px">3:4主图</a-divider>
              <a-list :data-source="PAGEDATA.pic" bordered>
                <template #renderItem="{ item }">
                  <a-list-item>
                    <a-image width={200} height={200} :src="item.url"/>
                  </a-list-item>
                </template>
              </a-list>
          <a-divider orientation="left" orientation-margin="0px">3:4长图</a-divider>
              <a-list :data-source="PAGEDATA.pic" bordered>
                <template #renderItem="{ item }">
                  <a-list-item>
                    <a-image width={200} height={200} :src="item.url"/>
                  </a-list-item>
                </template>
              </a-list>
          <a-divider orientation="left" orientation-margin="0px">白底图</a-divider>
                        <a-list :data-source="PAGEDATA.pic" bordered>
                <template #renderItem="{ item }">
                  <a-list-item>
                    <a-image width={200} height={200} :src="item.url"/>
                  </a-list-item>
                </template>
              </a-list>
          <a-divider orientation="left" orientation-margin="0px">视频</a-divider>
              <a-list :data-source="PAGEDATA.pic" bordered>
                <template #renderItem="{ item }">
                  <a-list-item>
                    <a-image width={200} height={200} :src="item.url"/>
                  </a-list-item>
                </template>
              </a-list>
          <a-divider orientation="left" orientation-margin="0px">规格图</a-divider>
              <a-list :data-source="PAGEDATA.pic" bordered>
                <template #renderItem="{ item }">
                  <a-list-item>
                    <a-image width={200} height={200} :src="item.url"/>
                  </a-list-item>
                </template>
              </a-list>
          <a-divider orientation="left" orientation-margin="0px">描述详情</a-divider>
              <a-list :data-source="PAGEDATA.pic" bordered>
                <template #renderItem="{ item }">
                  <a-list-item>
                    <a-image width={200} height={200} :src="item.url"/>
                  </a-list-item>
                </template>
              </a-list>
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
          white_back_ground_pic_url:[],// 白底图列表
          video:[],// 视频列表
          long_pic_url:[],// 3:4长图列表
          main_image_three_to_four:[],// 3:4主图列表
          spec_pic:[],// 规格图列表
          desc_pic:[],// 描述详情图列表
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
          // PAGEDATA.pic = res_data.main_image_url_list; // 主图列表
          // PAGEDATA.white_back_ground_pic_url = res_data.white_back_ground_pic_url_list;// 白底图列表
          // PAGEDATA.video = res_data.video_url_list;// 视频列表
          // PAGEDATA.long_pic_url = res_data.long_pic_url_list;// 3:4长图列表
          // PAGEDATA.main_image_three_to_four = res_data.main_image_three_to_four_list;// 3:4主图列表
          // PAGEDATA.spec_pic = res_data.spec_pic_url_list;// 规格图列表
          // PAGEDATA.desc_pic = res_data.desc_pic_url_list;// 描述详情图列表

        }

        // 提交按钮回调
        const handleOk = e => {
            console.log(e);
        };


        return{
            props,
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