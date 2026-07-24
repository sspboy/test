<!--
创建 白底图 组件--
接受处理图片的url
返回白底图地址
验证白底图是否通过检测
通过：写入页面白底图容器
不通过：重新选择图片素材创建
-->

<template>
  
  <a-modal
      v-model:open="props.data.open"
      title="创建白底图"
      centered
    >
      <div class="delivery-method">

        <a-row>
          <a-col :span="12">
            <div style="width: 100px;text-align: center;">
            <a-image
              :src="props.data.byte_url"
              style="width: 100px;height: 100px;"
            />
            <p style="margin: 10px 0 0 0;">原图</p>
            </div>
          </a-col>

          <a-col :span="12">
            
            <div style="width: 100px;text-align: center;">
              
              <!--处理完毕 ok状态！-->
              <div v-if="White_Create.process_image_url !== undefined" class="loading_state" style="border: 1px silver dotted;">
                <a-image :src="White_Create.process_image_url"></a-image>
              </div>
              
              <!--处理中 loading状态-->
              <div v-else-if="White_Create.process_load === true && White_Create.process_image_url === undefined" class="loading_state">
                <a-flex
                  justify="center" 
                  align="center" 
                  style="height: 100%;" 
                  class="font_size_12">
                  <a-spin size="small" />
                </a-flex>
              </div>

              <!--为空初始 状态-->
              <div v-else-if="White_Create.process_load === false && White_Create.process_image_url === undefined" class="loading_state">

              </div>


              <p style="margin: 10px 0 0 0;">{{ White_Create.process_text }}</p>
            
            
            </div>
          </a-col>

        </a-row>
      </div>
      <template #footer>
        <a-flex justify="center" gap="8">
        <!-- 自定义底部按钮 -->
        <a-button v-if="White_Create.process_image_url === undefined" :loading="White_Create.process_button_load" type="primary" @click="White_Create.onstart">开启处理</a-button>
        <a-button v-if="White_Create.process_image_url" type="primary" @click="White_Create.set_in_add_page">添加白底图</a-button>
        <a-button  @click="props.data.open = false">取消</a-button>
        </a-flex>
      </template>
  </a-modal>

</template>

<script>
import { defineComponent, ref, reactive, computed, watch, onMounted } from 'vue'
import { DeleteOutlined} from '@ant-design/icons-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import axios from 'axios';

import { 
  whiteimg_Fun
} from '@/assets/douyinshop/productmanagement/Add';
export default defineComponent({
  name: '白底图',
  
  components: {
    DeleteOutlined
  },
  
  props: {
    // 传图需要处理白底图的url
    data: {
      type: Object,
    }
  },
  
  emits: ['update', 'change','create_white_image_callback'],
  
  setup(props, { emit, attrs, slots, expose }) {

    const tool = new TOOL.TOOL()            // 工具方法
    const API = new utils.A_Patch()         // 请求接口地址合集’
    
    // 处理白底图方法
    const White_Create = reactive({

      process_text:"白底图处理中...",
      process_load:false, // 白底图处理load状态
      process_button_load:false, // 开启处理按钮状态
      process_image_url:'https://p3-aio.ecombdimg.com/obj/ecom-shop-material/jpeg_m_c124d97081b6090f568b6a79497968e2_sx_88594_www800-800', // 处理好的图片地址
      m_obj:undefined,// 获取成功的素材对象

      // 请求白底图接口
      get_oss:async()=>{

        // console.log('白底图地址：',props.data.byte_url)
        // console.log('文件夹id：',props.data.folder_id)

        // 请求白底图
        var oss_respones = await axios.post(API.AppSrtoreAPI.oss.CreateWhiteImage,{
          "url":props.data.byte_url
        }).catch(err=>{
            console.error('请求OSS白底图失败:', err.message);
            throw err;  // 重新抛出，中断外层方法
        })

        var success = oss_respones.data.data.success // 成功状态 true false
        var RequestId = oss_respones.data.data.RequestId // 任务id
        var ImageURL = oss_respones.data.data.Data.ImageURL // 返回url

        console.log('oss_url',ImageURL)

        // 上传到素材中心==返回素材id==图片需要审核
        var M_respones = await axios.post(API.AppSrtoreAPI.material.uploadmaterial,{
            "folder_id":props.data.folder_id,
            "url": ImageURL,
            "material_name":Date.now() + "_white_image"
        }).catch(err=>{
            console.error('上传抖店素材失败:', err.message);
            throw err;  // 重新抛出，中断外层方法
        })

        // 获取素材id
        var material_id = M_respones.data.data.material_id;

        // console.log('素材id',material_id)

        // 等待5秒钟
        await new Promise(r => setTimeout(r, 3000));

        // 查询素材详情===判断是否审核成功，获取
        var m_detaile = await axios.post(API.AppSrtoreAPI.material.detaile,{
            "material_id":material_id
        }).catch(err=>{
            console.error('查询抖店素材详情失败:', err.message);
            throw err;  // 重新抛出，中断外层方法
        })

        // console.log('素材详情',m_detaile)
        var material_info = m_detaile.data.data.material_info
        var audit_status = material_info.audit_status// 审核状态
        var byte_url = material_info.byte_url// 素材url

        console.log('素材地址',byte_url)

        White_Create.process_image_url = byte_url

        White_Create.process_load = false // 关闭 图片loading状态

        White_Create.m_obj = material_info// 对象赋值


      },

      // 开启处理白底图
      onstart:()=>{

        White_Create.process_button_load = true; // 开启处理按钮 loading状态
        White_Create.get_oss(); // 请求图片
        White_Create.process_load = true // 开启 图片loading状态

      },


      // 图片传值到add页面中
      set_in_add_page:()=>{

        // 图片地址返回-地址写入页面
        console.log('写入添加商品页面')
        props.data.open=false// 关闭弹出框

        emit('create_white_image_callback', White_Create.m_obj)

      }


    })

    // 数据初始化
    White_Create.process_text="...暂无..."
    White_Create.process_load = false // 白底图处理load状态
    White_Create.process_image_url=undefined // 处理好的图片地址
    White_Create.m_obj=undefined// 获取成功的素材对象

    // 创建白底图开始
    // White_Create.get_oss()


    // 监听器
    watch(() => props.data, (newVal, oldVal) => {
      console.log('data changed:', newVal)
    }, { deep: true })
    
    // 生命周期
    onMounted(() => {
      console.log('模板名称 组件已挂载')
    })
    
    
    return {
      props,
      whiteimg_Fun,
      White_Create

    }
  }
})
</script>

<style scoped>
.delivery-method {
  padding: 16px;
  border: 1px solid #eee;
}
.img_pic{height: 100px;width: 100px;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;}
.Add_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.loading_state{width: 102px;height: 102px;background-color: #f2f2f2;}
</style>