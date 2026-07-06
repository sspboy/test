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
    
    <a-button 
      type="dashed" 
      size="small" 
      style="margin:0 20px 0 0;"
      @click="spec.add.get_specs_obj">打印自定义规格
    </a-button>

    <a-button
      type="dashed" 
      size="small"
      style="margin: 0 20px 0 0;"
      @click="spec.recommendation_add.get_spec_diy_obj"
    >打印推荐规格</a-button>

    <a-radio-group 
      v-model:value="spec.type_formdata.support_property_diy" 
      option-type="button" 
      :options="spec.type_formdata.support_property_options" 
      size="small"
      @change="spec.type_formdata.change_spec_model"
    />

    <span class="font_size_12"> ---- 是否支持自定义：：{{ spec.rule.support_property_diy }}</span>
  </a-divider>

    <!--自定义规格-->
    <div v-if="spec.type_formdata.support_property_diy === 0">

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
                              <span v-else-if="SPECS.SpecImag === true && v_item.url != undefined" style="float: left;">
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
    <div v-if="spec.type_formdata.support_property_diy === 1">

      <a-space style="margin-top: 10px;">

        <span class="font_size_12">选择系统推荐规格-最多不超过{{ spec.rule.max_spec_num_limit }}个</span>
        
        <a-checkbox-group 
          v-model:value="spec.type_formdata.selected_value_list" 
          name="checkboxgroup" 
          :options="spec.type_formdata.selected_diy_spec_options" 
          @change="spec.recommendation_add.change_selected"
        />

      </a-space>

      <a-form 
        ref="sku_diy_formRef"
        :model="SPECS_DIY.Obj"
        style="margin:20px 0 0 0;padding: 10px 0 0 0;" 
        name="SPECS_DIY" >

      <div v-for="(item, index) in SPECS_DIY.Obj">

        <a-form-item 
          v-if="item.disabled===false"
          :name="[index, 'property_name']"
          :key="item.index"
          :rules="{required: true, trigger: 'change', message:' '}"
        >
            <!--规格名称 不可编辑 -->
              
              <a-space>
                
                {{ item.property_name }} 
                
                是否二次请求：{{ spec.rule.required_spec_details[index].need_paging_query_value }}
                是否二次自定义规格值：{{ spec.rule.required_spec_details[index].support_diy }}

                <a-button 
                @click="spec.recommendation_add.add_value(index)"
                type="dashed" 
                size="small"><PlusOutlined /></a-button>
                <!--图片切换按钮-->
                <span v-show="index === 0" class="font_size_12">
                  规格图片
                  <a-switch v-model:checked="SPECS_DIY.image_checked" size="small" />
                </span>
              </a-space>

              <!--规格值 -->
              <a-row style="margin-top: 20px;" :gutter="[16]">

                <a-col :span="6" v-for="(v_item, spec_value_index) in item.values">

                  <!--选择值--> 
                  <a-form-item 
                    :name="[index, 'values', spec_value_index, 'value_name']" 
                    :rules="{
                      required: true, 
                      trigger: 'change', 
                      message:''}"
                  >

                    <a-space>
                      <!--规格值 cascader 模式-->
                      <span v-if="spec.rule.required_spec_details[index].value_display_style === 'cascader_multi_select'">
                      
                      <!--无需二次请求值 支持自定义输入规格值-->

                      <a-auto-complete
                        v-if="spec.rule.required_spec_details[index].need_paging_query_value ===false && spec.rule.required_spec_details[index].support_diy===true"
                        v-model:value="v_item.value_name"
                        :options="spec.rule.required_spec_details[index].property_values"
                        style="width: 154px;font-size: 12px;"
                        placeholder="输入规格值"
                        allow-clear
                        :fieldNames="{ 
                          label: 'sell_property_value_name', 
                          value: 'sell_property_value_name', 
                        }"
                      />
                        
                      <!--无需二次请求值 不支持自定义输入规格值-->
                      <a-select
                          v-if="!spec.rule.required_spec_details[index].need_paging_query_value && spec.rule.required_spec_details[index].support_diy===false"
                          ref="select"
                          placeholder="选择规格值"
                          v-model:value="v_item.value_name"
                          :options="spec.rule.required_spec_details[index].property_values"
                          :fieldNames="{ 
                            label: 'sell_property_value_name', 
                            value: 'sell_property_value_id', 
                          }"
                        style="width: 152px;"
                        class="font_size_12"
                        allow-clear
                      />

                      <!--需要 二次查询规格值-->
                      <a-cascader
                        v-else-if="spec.rule.required_spec_details[index].need_paging_query_value"
                        v-model:value="v_item.value_name"
                        multiple
                        :options="spec.rule.required_spec_details[index].property_values"
                        placeholder="选择规格值"
                        suffix-icon="Shopping Around"
                        :fieldNames="{ 
                          label: 'sell_property_value_name', 
                          value: 'sell_property_value_id', 
                          children: 'children' 
                          }"
                        style="width: 100%;"
                        allow-clear
                      >
                        <template #tagRender="data">
                          <a-tag :key="data.value" color="blue">{{ data.label }}</a-tag>
                        </template>
                      </a-cascader>

                      </span>
                      
                      <!-- 文本值-->
                      <span v-else-if="spec.rule.required_spec_details[index].value_display_style === 'text'">
                        <a-input
                          v-model:value="v_item.value_name"
                          placeholder="规格值"
                          autocomplete="off"
                          allow-clear></a-input>
                      </span>

                      <!-- 度量衡-->

                      
                      <span v-if="index === 0">
                      <!--无图片地址-->
                      <img
                        v-if="SPECS_DIY.image_checked === true && v_item.url=== undefined || v_item.url == ''"
                        style="width: 28px;height: 28px;"
                        src="/image_defule.png"
                        class="cursor"
                        @click="spec.add.change_spec_img_fun(index, spec_value_index)"
                      />

                      <!--有图片地址-->
                      <a-popconfirm
                          v-else-if="SPECS_DIY.image_checked === true && v_item.url != undefined"
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
                            ></img></a>
                      </a-popconfirm>
                      </span>

                      <!--删除按钮-->
                      <a-button 
                      v-if="item.values.length>1"
                      @click="spec.recommendation_add.del_value(index, spec_value_index)"
                      type="dashed" size="small">
                        <DeleteOutlined />
                      </a-button>
                    </a-space>


                    <!--备注-->
                    <div style="margin-top: 10px;" v-if="props.rule_info?.product_spec_rule?.required_spec_details[index]?.support_remark == true">
                      <a-form-item-rest> 
                      <a-input 
                        v-model:value="v_item.info"
                        placeholder="备注" 
                        allow-clear></a-input>
                        </a-form-item-rest> 
                    </div>


                  </a-form-item>
                </a-col>



              </a-row>


        </a-form-item>

      </div>
      </a-form>


    </div>

    <!-- <a-button style="margin-top: 20px;">添加规格</a-button> -->





</template>

<script>
import { defineAsyncComponent,defineComponent, ref, computed, watch, onMounted, reactive } from 'vue'
import { PlusCircleOutlined,PlusOutlined,DeleteOutlined,MinusOutlined,MinusCircleOutlined,ReadOutlined} from '@ant-design/icons-vue';

import { 
  Spec,SPECS,resetSPECSFull,sku_formRef,SPECS_DIY,sku_diy_formRef
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
    }
},
  
  setup(props, { emit, attrs, slots, expose }) {


    const spec = new Spec() 
    
    spec.recommendation_add.load(); // 初始化 推荐规格

    // 重置表单 需要重置时调用
    resetSPECSFull()

    
    // 监听器
    watch(() => props.data, (newVal, oldVal) => {
      console.log('data changed:', newVal)
    }, { deep: true })
    
    // 生命周期
    onMounted(() => {
      console.log('商品规格 组件已挂载')
    })
    
    // 暴露给父组件的方法
    // expose({
    //   reset: () => { count.value = 0 }
    // })
    
    return {
      props,
      SPECS, // 自定义规格表单对象
      sku_formRef, // 自定义规格表单 验证对象
      spec, // 方法

      SPECS_DIY, // 系统推荐表单对象
      sku_diy_formRef,// 系统推荐 表单验证对象

    }
  }
})
</script>

<style scoped>
.delivery-method {
  padding: 16px 0 16px 0;
  margin: 10px 0 ;
  border: 0px solid #eee;
}
:deep(.ant-select-auto-complete input) {
  font-size: 12px;
}
</style>