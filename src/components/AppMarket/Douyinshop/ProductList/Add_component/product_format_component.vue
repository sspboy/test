<template>
  <div class="delivery-method">
    <h3>{{ title }}</h3>
    
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue'

export default defineComponent({
  name: '商品属性组件',
  
  components: {
    
  },
  
  props: {
    data: {
      type: Object,
      required: true,
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
</style>