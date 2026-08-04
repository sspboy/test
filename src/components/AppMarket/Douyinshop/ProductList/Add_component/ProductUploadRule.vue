<template>
    <a-drawer
        v-model:open="props.open.open"
        title="发布规则"
        placement="right"
        width="80%"
        :closable="true"
        :maskClosable="true"
        :footer-style="{ textAlign: 'left' }"
    >


    
    <div class="delivery-method">


        <div>类目：撒范德萨分</div>

    </div>

    <a-collapse
            v-model:activeKey="activeKey"
            :bordered="false"
            style="background: rgb(255, 255, 255)"
        >

        <template #expandIcon="{ isActive }">
            <CaretRightOutlined :rotate="isActive ? 90 : 0" />
        </template>

        <a-collapse-panel
            v-for="(item,key,index) in props.data"
            :key="index" 
            :header="RULEFUN.escape(key)" 
            class="customStyle">

            <template v-if="key === 'pick_up_method_rule'">
                <span>虚拟商品提货方式规则:</span>
                <span v-if="item.virtual_goods_rule.support_show_checkout_entry">提取方式为「使用电子凭证」或「充值直连」时，可以设置</span>
                <span v-else>当前提取方式不可设置</span>
                <P>备注说明-可支持的方式为：「使用电子凭证」或「充值直连」</P>
            </template>

            <template v-else-if="key === 'extra_rule'">
                <span>上门安装服务规则</span>
                <span v-if="item.c2b_customize_rule !== undefined">
                    
                    
                    <p>c2b定制相关规则：<span v-if="item.c2b_customize_rule.enable===true">支持定制</span><span v-else>不支持定制</span></p>
                </span>
                {{ item }}
            </template>

            <p v-else>{{ item }}</p>

        </a-collapse-panel>



    </a-collapse>



  </a-drawer>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted, reactive } from 'vue'
import { CaretRightOutlined } from '@ant-design/icons-vue';


export default defineComponent({
  name: '发布商品规则',
  
  components: {
    CaretRightOutlined,
  },
  
  props: {
    data: {
      type: Object,
    //   required: true,
    },
    open: {
        type: Object
        }
  },
  
  emits: ['update', 'change'],
  
  setup(props, { emit, attrs, slots, expose }) {


    const activeKey = ref(['1']);

    const RULEFUN = reactive({

        // 名称验证
        escape:(keytext)=>{
            
            if(keytext == 'fulfillment_rule'){
                return '履约规则'
                
            }else if(keytext == 'recommend_name_rule'){
                return '商品标题推荐规则'

            }else if(keytext === 'after_sale_rule'){
                return '售后服务规则'

            }else if(keytext === 'reference_price_rule'){
                return '参考价相关规则'

            }else if(keytext === 'spu_control_rule'){
                return 'SPU管控规则'

            }else if(keytext === 'product_spec_rule'){
                return '商品规格约束'

            }else if(keytext === 'component_template_rule'){
                return '商品尺码模板配置规则'

            }else if(keytext === 'main_image_three_to_four_rule'){
                return '商品主图3:4配置规则'

            }else if(keytext === 'gold_price_rule'){
                return '金价信息'

            }else if(keytext === 'extra_rule'){
                return '其他规则'

            }else if(keytext === 'trade_rule'){
                return '交易相关的规则'

            }else if(keytext === 'sku_rule'){
                return 'sku规则'

            }else if(keytext === 'qualification_rule'){
                return '资质规则'

            }else if(keytext === 'pick_up_method_rule'){
                return '提取方式'

            }else if(keytext === 'merchant_cargo_rule'){
                return '商家货品规则'

            }

        }

    })


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
    // watch(() => props.data, (newVal, oldVal) => {
    //   console.log('data changed:', newVal)
    // }, { deep: true })
    
    // 生命周期
    // onMounted(() => {
    //   console.log('模板名称 组件已挂载')
    // })
    
    // 暴露给父组件的方法
    expose({
      reset: () => { count.value = 0 }
    })
    
    return {
        props,
        activeKey,
        RULEFUN,
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
  border-radius: 6px;
  margin-bottom: 10px;
}
.customStyle{background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden}
</style>