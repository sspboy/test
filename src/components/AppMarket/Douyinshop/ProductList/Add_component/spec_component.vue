<!--
  规格组件
  
  1、是否支持自定义规格

  2、是否支持二次查询规格值
  
  3、类目属性影响sku规格样式查询
  
  4、度量衡样式查询

-->
<template>

  <a-divider orientation="left" orientation-margin="0px">
    
    规格
    <a-radio-group 
      v-model:value="spec.type_formdata.support_property_diy" 
      option-type="button" 
      :options="spec.type_formdata.support_property_options" 
      size="small"
      @change="console.log(spec.type_formdata.support_property_diy)"
    />

    <!-- <a-checkbox 
        v-model:checked="SPECS.SpecImag" 
        @change="SPECS.SpecImagState_change_fun"
    >上传图片
    </a-checkbox> -->

  </a-divider>

    <!--自定义规格-->
    <div class="delivery-method" v-show="spec.type_formdata.support_property_diy === 0">

      <h3>{{ title }}</h3>

      是否支持规格项自定义:{{ product_spec_rule.support_property_diy }}

      <!-- <a-button @click="spec.add.get_rule" size="small">查看规格</a-button> -->

    </div>

    <!--系统推荐规格-->
    <div  v-show="spec.type_formdata.support_property_diy === 1">

      {{ product_spec_rule.support_property_diy }}

      <div class="delivery-method" v-for="(item,index) in product_spec_rule.required_spec_details">
        
        <!--规格名称-->
        
        <div style="margin-bottom: 20px;">
          <a-space>
          {{ item.sell_property_name }} {{ index }} 

          <!-- {{ item.property_values }} -->
          <span v-show="index === 0" class="font_size_12">
            规格图片 
            <a-switch v-model:checked="spec.SPECS_DIY.image_checked" size="small" />
          </span>
          
          <a-button size="small"><PlusCircleOutlined /></a-button>
          </a-space>
        </div>

        <a-row>

          <a-col :span="6">

            <!--规格值-->
            <a-space>
              <a-input placeholder="规格值"></a-input>
              <a-button type="text" size="small"><DeleteOutlined /></a-button>
            </a-space>

            <!-- {{ item.value_display_style }} -->

            <!--备注-->
            <div style="margin-top: 10px;" v-show="item.support_remark === true">
              <a-space>

                <a-input placeholder="备注"></a-input>

                <!--规格图片-->
                <div v-show="spec.SPECS_DIY.image_checked===true && index ===0" style="width: 28px;height: 28px;border-radius: 4px;">
                  <a-image src="/image_defule.png"></a-image>
                </div>

              </a-space>

            </div>

            
            
            </a-col>
        </a-row>


      </div>



    </div>

    <a-button style="margin-top: 20px;">添加规格</a-button>



</template>

<script>
import { defineComponent, ref, computed, watch, onMounted, reactive } from 'vue'
import { PlusCircleOutlined,PlusOutlined,DeleteOutlined,MinusOutlined,MinusCircleOutlined,ReadOutlined} from '@ant-design/icons-vue';

import { 
  Spec
} from '@/assets/douyinshop/productmanagement/Add';
export default defineComponent({
  
name: '规格组件',
  
components: {
    DeleteOutlined,
    PlusCircleOutlined
},
  
props: {
    // 上传商品发布规则
    rule_info: {
      type: Object,
      default: ''
    }
},
  
  setup(props, { emit, attrs, slots, expose }) {
    
    console.log('规格-规则',props.rule_info.product_spec_rule)

    // 规格-规则
    const product_spec_rule = reactive({

      // 为true时，规格图要么全不填，要么全填
      all_spec_pic_required: props.rule_info.product_spec_rule.all_spec_pic_required,
      
      // 是否支持规格项顺序调整，true表示支持
      support_property_sequence_variable:props.rule_info.product_spec_rule.support_property_sequence_variable,
      
      // 商品规格列表
      required_spec_details:props.rule_info.product_spec_rule.required_spec_details, 
      
      // 最大可支持的规格层级数量
      max_spec_num_limit:props.rule_info.product_spec_rule.max_spec_num_limit,

      //sku组合数量上限
      spec_combination_limit:props.rule_info.product_spec_rule.spec_combination_limit,

      // 单个规格的规格值数量上限
      spec_single_limit:props.rule_info.product_spec_rule.spec_single_limit,
      
      // 是否支持规格项自定义
      support_property_diy:props.rule_info.product_spec_rule.support_property_diy

    })


    const spec = new Spec() 
    spec.rule = props.rule_info.product_spec_rule;



    console.log('sku-规则',props.rule_info.sku_rule)

    // 响应式数据
    const count = ref(0)
    const title = ref('规格设置')
    
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
      console.log('商品规格 组件已挂载')
    })
    
    // 暴露给父组件的方法
    expose({
      reset: () => { count.value = 0 }
    })
    
    return {
      spec,
      product_spec_rule,
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
  margin: 10px 0 ;
  border: 1px solid #eee;
}
</style>