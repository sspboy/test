<template>

<a-row>
  <a-col :span="10">
    <div style="height: 640px;width: 340px;margin-top: 20px;background-color: black;border-radius: 18px;">
      <a-flex justify="center" align="center" style="height: 100%;" class="font_size_12">

      <p style="color: aliceblue;">+ 选择视频</p>
      </a-flex>

    </div>
  </a-col>
  <a-col :span="14">
    <div class="cursor Add_img" style="margin: 20px 0 20px 0;">
      <a-flex justify="center" align="center" style="height: 100%;" class="font_size_12">
          + 创建<br />
          主图视频
      </a-flex>
    </div>
    <a-divider orientation="left" orientation-margin="0px">主图视频-创建记录</a-divider>

  </a-col>

</a-row>

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
      default: () => ({})
    },
    data2: {
      type: String,
      default: ''
    }
  },
  
  emits: ['update', 'change'],
  
  setup(props, { emit, attrs, slots, expose }) {
    // 响应式数据
    const count = ref(0)
    const title = ref('发货方式设置')
    
    // 计算属性
    const displayTitle = computed(() => {
      return `${title.value} - ${props.data2 || '默认'}`
    })
    
    // 方法
    const handleClick = () => {
      count.value++
      emit('update', { count: count.value, data: props.data })
    }
    
    // 监听器
    watch(() => props.data, (newVal, oldVal) => {
      console.log('data changed:', newVal)
    }, { deep: true })
    
    // 生命周期
    onMounted(() => {
      console.log('模板名称 组件已挂载')
    })
    
    // 暴露给父组件的方法
    expose({
      reset: () => { count.value = 0 }
    })
    
    return {
      count,
      title,
      displayTitle,
      handleClick
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