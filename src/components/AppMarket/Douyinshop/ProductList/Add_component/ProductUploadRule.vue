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

    <a-row :gutter="[16,16]" class="rule-key-row">
        <a-col v-for="(item,key,index) in props.data" :span="6" :key="index">
            <div
                class="rule-key-item"
                :class="{ active: activeIndex === index }"
                @click="handleKeyClick(index)"
            >{{RULEFUN.escape(key)}}</div>
        </a-col>
    </a-row>

    <div class="rule-content" v-if="currentRule">


        <div class="rule-content-header">
            <span class="rule-content-title">{{ currentRule.title }}</span>
            <span class="rule-content-key">{{ currentRule.key }}</span>
        </div>

        <!--其它规则-->
        <template v-if="currentRule.key === 'extra_rule'">
            <div v-if="currentRule.data.home_install_service_rule !== undefined">
                <p style="color: #666;margin: 20px;">嘻嘻哈哈</p>
            </div>
            <div v-if="currentRule.data.c2b_customize_rule !== undefined">
                <p v-if="currentRule.data.c2b_customize_rule.enable === true" style="color: #666;margin: 10px;">支持c2b定制</p>
                <p v-else style="color: #666;margin: 20px;">不支持c2b定制</p>
            </div>
        </template>


        <!--主图3:4信息-->
        <template v-else-if="currentRule.key === 'main_image_three_to_four_rule'">
            {{ currentRule.data.main_image_three_to_four_rule }}
            <p style="color: #666;margin: 20px;">
                是否展示主图3:4信息:{{ currentRule.data.is_show ? '展示' : '不展示' }}
            </p>

            <p style="color: #666;margin: 20px;">
                主图3:4信息是否必填:{{ currentRule.data.must_input ? '必填' : '非必填' }}
            </p>

        </template>

        <!--参考价格规则-->
        <template v-else-if="currentRule.key === 'reference_price_rule'">


            <p style="color: #666;margin: 20px;">
                是否可填写参考价:{{ currentRule.data.is_support ? '支持' : '不支持' }}
            </p>


        </template>




        <pre class="rule-json">{{ JSON.stringify(currentRule.data, null, 2) }}</pre>


    </div>



  </a-drawer>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted, reactive } from 'vue'


export default defineComponent({
  name: '发布商品规则',
  
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


    const activeIndex = ref(0);

    const ruleList = computed(() => {
        if (!props.data) return [];
        return Object.keys(props.data).map((key, index) => ({
            key,
            index,
            title: RULEFUN.escape(key),
            data: props.data[key]
        }));
    });

    const currentRule = computed(() => {
        return ruleList.value[activeIndex.value] || null;
    });

    const handleKeyClick = (index) => {
        activeIndex.value = index;
    };

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
    

    
    // 暴露给父组件的方法
    expose({
      reset: () => { count.value = 0 }
    })
    
    return {
        props,
        activeIndex,
        currentRule,
        RULEFUN,
        handleKeyClick,
      count,
      title,
      displayTitle,
      handleClick
    }
  }
})
</script>

<style scoped>
.rule-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.delivery-method {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 10px;
  flex-shrink: 0;
}
.rule-key-row {
  margin-bottom: 16px;
  flex-shrink: 0;
}
.rule-key-item {
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rule-key-item:hover {
  color: #1890ff;
  background: #e6f7ff;
}
.rule-key-item.active {
  color: #1890ff;
  background: #e6f7ff;
  font-weight: 500;
}
.rule-content {
  border: 1px solid #eee;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
  height: calc(100vh - 380px);
  display: flex;
  flex-direction: column;
}
.rule-content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background: #fafafa;
}
.rule-content-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}
.rule-content-key {
  font-size: 12px;
  color: #999;
}
.rule-json {
  margin: 0;
  padding: 16px;
  flex: 1;
  overflow: auto;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #333;
  background: #fff;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>