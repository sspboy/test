<!--
  规格组件
  
  1、是否支持自定义规格

  2、是否支持二次查询规格值
  
  3、类目属性影响sku规格样式查询
  
  4、度量衡样式查询

-->
<template>
  
  <!-- 动态渲染异步组件--选择素材 -->
  <selectimg v-if="spec.type_formdata.selectimg_open" v-on:add_img_callback="spec.add.select_spec_ima_call_back" :data="spec.type_formdata"/>

  <a-divider orientation="left" orientation-margin="0px">
    
    商品规格
    
    <a-button 
      type="dashed" 
      size="small" 
      style="margin: 0 20px;"
      @click="spec.add.get_specs_obj">打印自定义规格
    </a-button>

    <a-button
      type="dashed" 
      size="small"
      style="margin: 0 20px 0 0;"
    >打印推荐规格</a-button>

    <a-radio-group 
      v-model:value="spec.type_formdata.support_property_diy" 
      option-type="button" 
      :options="spec.type_formdata.support_property_options" 
      size="small"
      @change="console.log(spec.type_formdata.support_property_diy)"
    />
    <span class="font_size_12"> ---- 是否支持自定义：：{{ product_spec_rule.support_property_diy }}</span>
  </a-divider>

    <!--自定义规格-->
    <div v-show="spec.type_formdata.support_property_diy === 0">

      <a-form 
        ref="sku_formRef"
        :model="SPECS.Obj"
        style="margin-bottom: 0;padding: 10px 0 0 0;" 
        name="SPECS" >
          
            <a-form-item 
                v-for="(item, index) in SPECS.Obj"
                :name="[index, 'property_name']"
                :key="item.index"
                :rules="{required: true, trigger: 'change', message:' '}"
            >
                <!--规格名称 开始-->
                <a-space >
                  <a-input 
                      v-model:value="item.property_name"
                      style="font-size: 12px;" 
                      placeholder="规格名称" 
                      autocomplete="off"
                      allow-clear
                  />
      
                  <a-button type="dashed" size="small" class="add_btn_class" block @click="spec.add.pushvalue(index)">
                      <PlusOutlined />
                  </a-button>

                  <a-button type="dashed" size="small" class="add_btn_class" block @click="spec.add.del(item,index)">
                      <DeleteOutlined />
                  </a-button>

                  <a-form-item-rest>
                    <span v-show="index == 0" class="font_size_12">
                      规格图片 
                      <a-switch 
                        v-model:checked="SPECS.SpecImag" size="small" 
                        @change="spec.add.SpecImagState_change_fun"
                        name="switch"
                      />
                    </span>
                  </a-form-item-rest>
                </a-space >
                <!--规格名称 结束-->

                <!--规格值 开始-->
                <a-row style="padding: 20px 0 0 0;" :gutter="[16]">

                  <a-col 
                    :span="6"
                    v-for="(v_item, spec_value_index) in item.values"
                  >
                    <a-space 
                        :key="v_item.index" 
                        style="margin:2px 4px 0 0;" 
                        align="baseline"
                    >
                        <!--带图片规格-->
                        <a-form-item 
                          v-if="index === 0" 
                          :name="[index, 'values', spec_value_index,'value_name']" 
                          :rules="{required: true, trigger: 'change', message:''}"
                        >
                            <a-space>

                              <a-input 
                                  v-model:value="v_item.value_name" 
                                  placeholder="规格值" 
                                  style="font-size: 12px;" 
                                  autocomplete="off"
                                  allow-clear
                              />
                              <!--规格图片-->

                              <!--无图片地址-->
                              <span v-if="SPECS.SpecImag === true && v_item.url=== undefined || v_item.url == ''" style="float: left;" >
                                <img
                                  style="width: 28px;height: 28px;"
                                  src="/image_defule.png"
                                  class="cursor"
                                  @click="spec.add.change_spec_img_fun(index, spec_value_index)"
                                ></img>
                              </span>

                              <!--有图片地址-->
                              <span v-else-if="SPECS.SpecImag === true && v_item.url != undefined"" style="float: left;">
                                  <a-popconfirm
                                  ok-text="查看图片"
                                  cancel-text="清空图片"
                                  @confirm="spec.add.change_spec_img_fun(index, spec_value_index)"
                                  @cancel="spec.add.remove_img(v_item)"
                                >
                                <template #icon></template>

                                <a>
                                  <img
                                    style="border-radius:4px;width: 28px;height: 28px;"
                                    :src="v_item.url"
                                    class="cursor"
                                    ></img></a></a-popconfirm>

                              </span>
                            </a-space>
                          
                        </a-form-item>


                        <!--不带图片规格-->
                        <a-form-item
                            v-if="index != 0"
                            :name="[index, 'values', spec_value_index,'value_name']" 
                            :rules="{required: true, trigger: 'change', message:''}"
                            >

                            <a-input 
                                v-model:value="v_item.value_name"
                                placeholder="规格值" 
                                autocomplete="off"
                                style="font-size: 12px;margin-top: 10px;" 
                                allow-clear
                            />

                        </a-form-item>

                        

                        <!--删除规格值-->
                        <a-button 
                          type="dashed" 
                          @click="spec.add.removevalue(v_item, index)"
                          size="small"
                        >
                          <DeleteOutlined />
                        </a-button>

                    </a-space>
                  </a-col>
                </a-row>
                <!--规格值 结束-->

            </a-form-item>

          <a-form-item>
              <a-button type="dashed" @click="spec.add.insert" size="middle">添加规格</a-button>
          </a-form-item>
          

      </a-form>

    </div>



    <!--系统推荐规格-->
    <div  v-show="spec.type_formdata.support_property_diy === 1">

      <div class="delivery-method" v-for="(item,index) in product_spec_rule.required_spec_details">
        
        <!--规格名称 开始-->
        <div style="margin-bottom: 20px;">

          <a-space>
            
             {{ index }} {{ item.sell_property_name }}

            <!--添加值 按钮-->
            <a-button type="dashed" size="small"><PlusOutlined /></a-button>

            <!-- {{ item.property_values }} -->
            <span v-show="index === 0" class="font_size_12">
              规格图片 
              <a-switch v-model:checked="SPECS_DIY.image_checked" size="small" />
            </span>
                    
           <span class="font_size_12"> 二次查询规格值 :{{ item.need_paging_query_value }}</span>

          </a-space>

        </div>


        <!--规格值 -->
        <a-row>
          <a-col  :span="6">


            <!--规格值 cascader 模式-->
            <a-space v-show="item.value_display_style === 'cascader_multi_select'">

              <!--是否二次查询规格值-->

              <a-select
                v-if="!item.need_paging_query_value"
                ref="select"
                placeholder="选择规格值"
                v-model:value="item.un"
                :options="item.property_values"
                :fieldNames="{ 
                  label: 'sell_property_value_name', 
                  value: 'sell_property_value_id', 
                }"
                style="width: 170px;"
                class="font_size_12"
                allow-clear
              />

              <a-cascader
                v-if="item.need_paging_query_value"
                v-model:value="spec.SPECS.Obj[index].value"
                multiple
                :options="item.property_values"
                placeholder="选择规格值"
                suffix-icon="Shopping Around"
                 :fieldNames="{ 
                  label: 'sell_property_value_name', 
                  value: 'sell_property_value_id', 
                  children: 'children' 
                  }"
              >
                <template #tagRender="data">
                  <a-tag :key="data.value" color="blue">{{ data.label }}</a-tag>
                </template>
              </a-cascader>


              <a-button type="dashed" size="small"><DeleteOutlined /></a-button>
            </a-space>

            <!--规格值 text 模式-->
            <a-space v-show="item.value_display_style === 'text'">
              <a-input placeholder="规格值" allow-clear></a-input>
              <a-button type="text" size="small"><DeleteOutlined /></a-button>
            </a-space>

            

            <!--备注-->
            <div style="margin-top: 10px;" v-show="item.support_remark === true">
              <a-space>

                <a-input placeholder="备注" allow-clear></a-input>

                <!--规格图片-->
                <div v-show="SPECS_DIY.image_checked===true && index ===0" style="width: 28px;height: 28px;border-radius: 4px;">
                  <a-image src="/image_defule.png"></a-image>
                </div>

              </a-space>

            </div>

          </a-col>
        </a-row>

      </div>



    </div>

    <!-- <a-button style="margin-top: 20px;">添加规格</a-button> -->



</template>

<script>
import { defineAsyncComponent,defineComponent, ref, computed, watch, onMounted, reactive } from 'vue'
import { PlusCircleOutlined,PlusOutlined,DeleteOutlined,MinusOutlined,MinusCircleOutlined,ReadOutlined} from '@ant-design/icons-vue';

import { 
  Spec,SPECS,sku_formRef,SPECS_DIY,sku_diy_formRef
} from '@/assets/douyinshop/productmanagement/Add';
export default defineComponent({
  
name: '规格组件',
  
components: {
    DeleteOutlined,
    PlusCircleOutlined,
    MinusOutlined,MinusCircleOutlined,
    PlusOutlined,
    selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件

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
    spec.rule = props.rule_info.product_spec_rule; // 规格规则



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
      SPECS, // 自定义规格表单对象
      sku_formRef, // 自定义规格表单 验证对象
      spec, // 方法

      SPECS_DIY, // 系统推荐表单对象
      sku_diy_formRef,// 系统推荐 表单验证对象


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