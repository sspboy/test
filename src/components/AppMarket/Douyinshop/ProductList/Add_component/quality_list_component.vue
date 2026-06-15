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

  <!-- 动态渲染异步组件--选择素材 -->
  <selectimg v-if="quality.selectimg.selectimg_open" v-on:add_img_callback="quality.add.callbak" :data="quality.selectimg"/>

  <div>
    <template v-for="item in quality.list.value">

      <a-row style="margin: 20px 0;">
        
        <a-col :span="3" style="height: 120px;">

          <!--资质图片-->
          <div v-if="item.byte_url !== undefined" style="text-align: center;width: 100px;">
            <div  class="image_box cursor">
                <a-image style="height: 80px;" :src="item.byte_url"></a-image>
            </div>
            <a-button size="small" @click="quality.add.del_img(item)"><DeleteOutlined /></a-button>
          </div>

          <!--添加图片-->
          <div class="add_img_box cursor" v-else @click="quality.add.load_img(item.key)">
            <a-flex 
              justify="center" 
              align="center" 
              style="height: 100%;font-size: 12px;">
              +图片
            </a-flex>
          </div>


        </a-col>


        <a-col :span="21">
          <!--标题-->
          <h4 style="margin-top: 4px;">
            
            {{ item.name }}
            <span v-if="item.is_required" class="font_size_12">必填</span>
            <span v-else class="font_size_12" >非必填</span>

          </h4>

          <!--描述-->
          <template v-for = "text in item.text_list">
            <p>{{ text }}</p>
          </template>

        </a-col>
        
      </a-row>
    </template>
  </div>





</template>

<script>
import { defineComponent, defineAsyncComponent,ref, computed, watch, onMounted } from 'vue'
import {
  Quality
} from '@/assets/douyinshop/productmanagement/Add';import { t } from '@wangeditor/editor';
import { DeleteOutlined} from '@ant-design/icons-vue';


export default defineComponent({

  name: '资质规则',
  
  components: {
    DeleteOutlined,
    selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件

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

    const quality = new Quality(); // 实例 初始化
    quality.rule = props.rule_info; // 加载规则

    // 调用渲染方法
    quality.add.load();

    




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
      quality,
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
.add_img_box{width:100px;height: 100px;border: 1px #f2f2f2 solid;text-align: center;border-radius: 4px;}
.image_box{width: 100px;height: 98px;padding: 8px;border: 1px #f2f2f2 solid;text-align: center;border-radius: 4px;margin-bottom: 4px;}

</style>