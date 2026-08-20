<!--
  规格组件
  
  1、是否支持自定义规格

  2、是否支持二次查询规格值
  
  3、类目属性影响sku规格样式查询
  
  4、度量衡样式查询

-->
<template>
  
  <!-- 动态渲染异步组件--选择素材 -->
  <selectimg 
    v-if="spec.type_formdata.selectimg_open" 
    v-on:add_img_callback="spec.add.select_spec_ima_call_back" 
    :data="spec.type_formdata"
  />

  <!--tab 按钮栏目 开始-->
  <a-divider orientation="left" orientation-margin="0px">
    
     <a-button 
      type="dashed" 
      size="small" 
      style="margin:0 20px 0 0;"
      @click="spec.add.get_specs_obj">
      打印自定义规格
    </a-button>



    <span class="font_size_12"> ---- 是否支持自定义：：{{ spec.rule.support_property_diy }}</span>

  </a-divider>
  <!--tab 按钮栏目 结束-->


  <!--自定义规格 开始-->
  <div>



    <a-form 
      ref="sku_formRef"
      :model="SPECS.Obj"
      style="margin-bottom: 0;padding: 10px 0 0 0;" 
      name="SPECS" >

        <template v-for="(item, index) in SPECS.Obj" :key="item.index">

          <div class="font_size_12 box_style">
          

          <a-form-item 
              v-if="!item.disabled"
              :name="[index, 'property_name']"
              :rules="{required: true, trigger: 'change', message:'规格名称不能为空'}"
          >
              <!--规格名称 开始-->
              <a-row>
                <a-col :span="18">
                  <a-space>

                    <a-input 
                        v-model:value="item.property_name"
                        style="font-size: 12px;" 
                        placeholder="规格名称" 
                        autocomplete="off"
                        allow-clear
                        :disabled="item.Recommendation"
                    />

                    <!--添加按钮-->
                    <a-button
                      type="dashed" 
                      size="small" 
                      class="add_btn_class" 
                      block
                      :disabled="item.enabled_status"
                      @click="spec.add.pushvalue(index, item)">
                        <PlusOutlined />
                    </a-button>

                    <!--删除按钮-->
                    <a-button
                      v-if="item.value_display_style === 'diy'"
                      type="dashed" 
                      size="small" 
                      class="add_btn_class" 
                      block
                      :disabled="item.enabled_status"
                      @click="spec.add.del(item,index)">
                        <DeleteOutlined />
                    </a-button>
                  </a-space >
                </a-col>

                <!--规格名称 结束-->
                <a-col :span="6">

                  <a-form-item-rest>
                    <!--规格图片-->
                    <span v-show="index == 0" class="font_size_12" style="margin-right: 10px;">
                      <a-switch 
                        v-model:checked="SPECS.SpecImag" 
                        size="small"
                        checked-children="开启图片" 
                        un-checked-children="关闭图片"
                        class="font_size_12"
                        @change="spec.add.SpecImagState_change_fun"
                        name="switch"
                        :disabled="item.enabled_status"
                      />
                    </span>

                    <span v-if="item.Recommendation && !item.is_required" class="font_size_12" style="margin-right: 10px;">
                      <a-switch
                          checked-children="启用" 
                          un-checked-children="禁用"
                          v-model:checked="item.enabled_status" 
                          size="small" 
                          @change="spec.add.SpecImagState_call_fun"
                          name="switch"
                      />
                    </span>

                    <!--规格是否必填项目===开始-->
                    <span 
                      class="font_size_12" 
                      v-if="item.is_required"
                      style="color: red;float:right;"
                    >
                    <a-tag color="red">必填</a-tag>
                  </span>
                    
                    <span class="font_size_12" style="float:right;" v-else>
                      <a-tag>非必填</a-tag>
                    </span>
                    <!--规格是否必填项目===结束-->

                  </a-form-item-rest>
                </a-col>
              </a-row>

          </a-form-item>

          <!--规格值 开始-->
          <a-row
            v-if="!item.disabled" 

            style="padding: 0 0 0 0;margin-bottom: 10px;" :gutter="[16,16]">

            <a-col :span="6" v-for="(v_item, spec_value_index) in item.values">

              <a-space 
                  :key="v_item.index" 
                  style="margin:2px 4px 0 0;" 
                  align="baseline"
              >
                  <!-- 不是 度量衡得 规格值 -->
                  <template v-if="item.value_display_style !== 'measure'">
                    <a-form-item 
                      :name="[index, 'values', spec_value_index, 'value_name']" 
                      :rules="{required: true, trigger: 'change', message:'值不能为空'}"
                    >
                        <a-space>

                          <!--规格值 cascader 模式-->
                          <span v-if="item.value_display_style === 'cascader_multi_select'">
                          
                            <!--无需二次请求值 支持自定义输入规格值-->

                            <a-cascader
                              :disabled="item.enabled_status"
                              v-if="item.support_diy===true"
                              v-model:value="v_item.value_name"
                              :options="item.options"
                              style="width: 154px;font-size: 12px;"
                              :load-data="(selectedOptions) => spec.add.loadData(selectedOptions, '自定义参数', item)"
                              placeholder="选择规格"
                              :fieldNames="{ 
                                value: 'label', 
                              }"
                            />
                              

                              
                            <!--无需二次请求值 不支持自定义输入规格值-->
                            <a-cascader
                              :disabled="item.enabled_status"
                              v-else-if="item.support_diy===false"
                              v-model:value="v_item.value_name"
                              :options="item.options"
                              style="width: 154px;font-size: 12px;"
                              :load-data="(selectedOptions) => spec.add.loadData(selectedOptions, '自定义参数', item)"
                              placeholder="选择规格"
                              :fieldNames="{ 
                                value: 'label', 
                              }"
                            />

                            <!--需要 二次查询规格值-->
                            <a-cascader 
                              :disabled="item.enabled_status"
                              v-else-if="item.need_paging_query_value"
                              v-model:value="v_item.value_name"
                              multiple
                              :options="item.property_values"
                              placeholder="选择规格值"
                              suffix-icon="Shopping Around"
                              :fieldNames="{ 
                                label: 'sell_property_value_name', 
                                value: 'sell_property_value_id', 
                                children: 'children' 
                                }"
                                style="width: 80%;"
                              allow-clear
                            >
                              <template #tagRender="data">
                                <a-tag :key="data.value" color="blue">{{ data.label }}</a-tag>
                              </template>
                            </a-cascader>

                          </span>
                          
                          <!-- 文本值-->
                          <span v-else-if="item.value_display_style === 'text'">
                            <a-input
                              :disabled="item.enabled_status"
                              v-model:value="v_item.value_name"
                              placeholder="规格值"
                              autocomplete="off"
                              class="font_size_12"
                              allow-clear></a-input>
                          </span>

                          <!-- 自定义 -->
                          <span v-else-if="item.value_display_style === 'diy'">
                            <a-input
                              v-model:value="v_item.value_name"
                              placeholder="规格值"
                              autocomplete="off"
                              class="font_size_12"
                              style="width: 100%;"
                              allow-clear></a-input>
                          </span>

                          


                          <!--规格图片-->

                          <!--无图片地址-->
                          <span v-if="SPECS.SpecImag === true && index === 0 && v_item.url=== undefined || v_item.url == ''" style="float: left;" >
                            <img
                              :disabled="item.enabled_status"
                              style="width: 28px;height: 28px;"
                              src="/image_defule.png"
                              class="cursor"
                              @click="spec.add.change_spec_img_fun(index, spec_value_index)"
                            ></img>
                          </span>

                          <!--有图片地址-->
                          <span v-else-if="SPECS.SpecImag === true && index === 0 && v_item.url != undefined" style="float: left;">
                            <a-popconfirm
                              :disabled="item.enabled_status"
                              ok-text="查看图片"
                              cancel-text="清空图片"
                              @confirm="spec.add.change_spec_img_fun(index, spec_value_index)"
                              @cancel="spec.add.remove_img(v_item)"
                            >
                            <template #icon></template>

                            <a>
                              <img
                                :disabled="item.enabled_status"
                                style="border-radius:4px;width: 28px;height: 28px;"
                                :src="v_item.url"
                                class="cursor"
                                ></img>
                              </a>
                            </a-popconfirm>

                          </span>
                        </a-space>
                      
                    </a-form-item>
                  </template>


                  <!--度量衡 规格值-->
                  <template v-else>

                    <!--区间值 迭代输入 规格值-->
                    <template 
                      v-for="(item_measure, v_index) in item.measure_templates[0].value_modules"
                    >
                    <a-form-item 
                        :name="[index, 'values', spec_value_index, 'value_list', v_index, 'unit_value']"
                        :rules="{required: true, trigger: 'change', message:'值不能为空1'}"
                      >
                        
                        <a-input 
                          v-model:value="v_item.value_list[v_index].unit_value"
                          placeholder="规格值"
                          autocomplete="off"
                          class="font_size_12"
                          >

                            <template v-if="item_measure.units.length > 0" #addonAfter>
                              <a-select  
                                style="width: 90px" 
                                v-model:value="v_item.value_list[v_index].unit_name">
                                <a-select-option v-for="nu in item_measure.units" :value="nu.unit_id">
                                  {{ nu.unit_name }}</a-select-option>
                              </a-select>
                            </template>
                          
                          
                        </a-input>

                        <!--中间分隔符-->
                        <template v-if="item_measure.suffix !== ''">{{ item_measure.suffix }}</template>

                        </a-form-item>

                    </template>

                  </template>

                  <!--删除规格值-->
                  <a-button 
                    :disabled="item.enabled_status"
                    type="dashed" 
                    @click="spec.add.removevalue(v_item, index)"
                    size="small"
                  >
                    <DeleteOutlined />
                  </a-button>

              </a-space>

              <!--备注-->
              <div v-if="item.support_remark === true">
                <a-form-item-rest> 
                  <a-input
                    :disabled="item.enabled_status"
                    v-model:value="v_item.info"
                    placeholder="备注"
                    style="font-size: 12px;" 
                    allow-clear></a-input>
                  </a-form-item-rest> 
              </div>

            </a-col>
          </a-row>
          <!--规格值 结束-->

          
          </div>
        </template>

        <a-form-item v-if="spec.rule.support_property_diy">
          <a-button 
            type="dashed" 
            @click="spec.add.insert" 
            size="middle"
            >添加规格</a-button>
        </a-form-item>
    </a-form>

  </div>
  <!--自定义规格 结束-->


</template>

<script>
import { defineAsyncComponent,defineComponent, ref, computed, watch, onMounted, reactive } from 'vue'
import { PlusCircleOutlined,PlusOutlined,DeleteOutlined,MinusOutlined,MinusCircleOutlined,ReadOutlined} from '@ant-design/icons-vue';

import { 
  Spec,SPECS,resetSPECSFull,sku_formRef,StockFun,skulist_formState
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

    // 重置表单 需要重置时调用
    resetSPECSFull()
    
    spec.load() // 初始化 规格规则
    
    // 监听器
    const Stock = new StockFun()

    // 监听规格列表变化【form表单绑定必须可变的响应式对象】
    watch(() => Stock.sepec_info, (newVal) => {
        if (newVal) {
            console.log(newVal)
            skulist_formState.skudatelist = Stock.get_data();
            skulist_formState.skucolumns = Stock.get_colums();
            Stock.change_presale()
        }
    }, { immediate: true, deep: true })
    
    // 生命周期
    // onMounted(() => {
    //   console.log('商品规格 组件已挂载')
    // })
    
    
    return {
      props,
      SPECS, // 自定义规格表单对象
      sku_formRef, // 自定义规格表单 验证对象
      spec, // 方法

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
.box_style{border: 1px #f2f2f2 solid;margin-bottom: 20px;border-radius: 4px;padding: 18px 14px 14px 14px;}
.custom-switch :deep(.ant-switch-inner) {
  font-size: 12px;  /* 修改文字大小 */
}
</style>