<!--
商品资质列表
// 发布规则获取
// 资质，可通过/product/qualificationConfig获取
{
"quality_list":[
    {
        "quality_id":"", // id
        "quality_content_name":"", // 资质名

        "quality_key":"", // 资质key

        "quality_name":"", // 资质名称
        
        // 资质
        "quality_attachments":[
            {"url":"","media_type":1}
        ]
    }
]
}
-->
<template>
  <div class="delivery-method">
    <h3>{{ title }}</h3>
    
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue'

export default defineComponent({

  name: '资质规则',
  
  components: {
    
  },
  
  props: {
    data: {
      type: Object,
    //   required: true,
    //   default: () => ({})
    },
    // 资质规则
    rule_info: {
      type: Object,
      default: ''
    }
  },
    
  setup(props, { emit, attrs, slots, expose }) {
    console.log('资质规则',props.rule_info)
    // 响应式数据
    const count = ref(0)
    const title = ref('资质')
    
    // 计算属性
    const displayTitle = computed(() => {
      return `${title.value} - ${props.spec || '默认'}`
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
      console.log('发货方式 组件已挂载')
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