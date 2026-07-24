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
      @ok="console.log('创建白底图')"
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
              <div style="width: 100px;height: 100px;background-color: #f2f2f2;">
                <a-flex justify="center" align="center" style="height: 100%;" class="font_size_12">
                  <a-spin size="small" />
                </a-flex>
              </div>
              <p style="margin: 10px 0 0 0;">处理ing...</p>
            </div>
          </a-col>

        </a-row>
        

    
      </div>
  </a-modal>

</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { DeleteOutlined} from '@ant-design/icons-vue';

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
  
  emits: ['update', 'change'],
  
  setup(props, { emit, attrs, slots, expose }) {

    const white_iamge_url = props.data.byte_url; // 素材图片url
    const folder_id = props.data.folder_id; // 存储素材文件夹id

    // 处理白底图方法

    // 请求白底图接口
    
    // 结果返回-地址写入页面
    
    // 上传到素材中心==返回地址

    // 检测是否合格
    
    
    // 


    
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
</style>