<!--
创建 主图视频 弹出窗口 组件--
接受主图地址列表
提交接口创建主图视频
存储到素材库
返回素材地址
-->
<template>

<a-modal
      v-model:open="props.data.open"
      title="创建主图视频"
      centered
      @ok="console.log('创建主图视频')"
    >
      <div style="padding: 20px 0 50px 0;">
        <div style="width: 140px;height: 140px;border: 1px #f2f2f2 solid;text-align: center;" class="font_size_12">
          <a-flex justify="center" align="center" style="height: 100%;" class="font_size_12">
            <a-spin size="small" />
          </a-flex>
          <p style="margin: 10px 0 0 0;">处理ing...</p>
        </div>
      
    </div>
    </a-modal>

</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue'

export default defineComponent({
  name: '主图视频',
  
  components: {
    
  },
  
  props: {
    data: {
      type: Object,
    }
  },
  
  emits: ['update', 'change','create_pic_video_callback'],
  
  setup(props, { emit, attrs, slots, expose }) {
    
    
    // 生命周期
    onMounted(() => {
      console.log('模板名称 组件已挂载')
    })
    
    return {
      props,

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