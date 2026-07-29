<template>

    <!-- 动态渲染异步组件--选择素材 -->
    <selectimg 
        v-if="Select_shuixi_Img.selectimg_open" 
        v-on:add_img_callback="Select_shuixi_Img.Add_Callback" 
        :data="Select_shuixi_Img"
    />

    <div class="delivery-method">

        <!--属性开始-->
        <a-divider orientation="left" orientation-margin="0px">
            <a-button 
                type="dashed"
                size="small"
                @click="CATE.Ceck_format"
            >智能预测填充属性
            </a-button>

        </a-divider>

        <a-form :ref="CATE.form_ref" :model="CATE.format_formRef">

            <a-row v-if="CATE.format.value.length !== 0" loading="true" :gutter="[16,6]">
                
                <template v-for="item in CATE.format.value">

                    <!--度量衡-多选-->
                    <template v-if="item.type == 'multi_value_measure'">
                        
                        <!--洗水标 吊牌-->
                        <a-col :span="6" style="margin-bottom: 20px;">
                            <p>洗水标/吊牌
                                <span v-if="item.property_pic_rule.required == true" style="color: red;">--必填</span>
                                <span v-else-if="item.property_pic_rule.required == false">--非必填</span>
                            </p>

                            <!-- 吊牌 开始-->
                            <!--洗水标上传 开始
                                available    是否可用	true-可用，false-不可用
                                required     是否必填	true-必填，false-选填
                            -->
                            <template v-if="item.property_pic_rule.available == true">

                                <div v-if="CATE.category_property_pics.value != undefined" class="cursor call_shui_img">
                                    <a-image style="height:78px;" :src="CATE.category_property_pics.value"></a-image>
                                    <span class="clear_shui_img">
                                        <a-button type="text" size="small" @click="Select_shuixi_Img.clear_img"> 
                                            <DeleteOutlined />
                                        </a-button>
                                    </span>
                                </div>

                                <!-- <p>水洗标/吊牌图</p> -->
                                <div class="cursor Add_shui_img" v-else-if="CATE.category_property_pics.value == undefined" 
                                    @click="Select_shuixi_Img.change_material_type">
                                    <a-flex justify="center" align="center" style="height: 100%;font-size: 12px;">
                                    + 水洗标/吊牌
                                    </a-flex>
                                </div>

                            </template>
                            <!--吊牌 结束-->
                        </a-col>
                        
                        <!--面料材质-->
                        <a-col :span="24" style="margin-bottom: 10px;">
                        
                        <!-- 内层嵌套 row -->
                        <p>面料材质 <span v-show="item.required ==1" style="color: red;">--必填</span></p>

                        <a-row :gutter="[16,6]">
                            
                            

                            <!--多材质列表 开始-->
                            <a-col :span="6" v-for="(olist, dIndex) in CATE.format_formRef[item.property_id]">

                                <a-form-item 
                                    :name="[item.property_id, dIndex, 'value']"
                                    :rules="[{ required: true, message: item.property_name + '不能为空！',trigger: 'change',}]"
                                >

                                    <a-select
                                        v-model:value="olist.value"
                                        placeholder="请选择材质"
                                        style="width: 100%"
                                        allow-clear
                                        show-search
                                        :filter-option="filterOption"
                                        :options="item.options"
                                        :field-names="{
                                            label: 'name',
                                            value: 'value_id',
                                        }"
                                        @focus="CATE.material_change(CATE.format_formRef[item.property_id],item.options)"
                                    >

                                        <template #dropdownRender="{ menuNode: menu }">
                                            <component :is="menu" />
                                            <a-divider style="margin: 4px 0" />
                                            <a-space style="padding: 4px 8px">
                                            <a-input ref="inputRef" 
                                                v-model:value="CATE.diy_name.value" 
                                                placeholder="自定义面料"
                                                autoComplete="off"
                                            />
                                            <a-button type="text" @click="CATE.addItem(item.options)">
                                                <template #icon><PlusOutlined /></template>添加
                                            </a-button>
                                            </a-space>
                                        </template>

                                    </a-select>

                                </a-form-item>

                                <a-form-item
                                    :name="[item.property_id, dIndex, 'percentage']"
                                    :rules="[{ required: true, message:'数值不能为空！',trigger: 'change',}]"
                                >
                                    <a-space-compact block size="middle">
                                        
                                        <a-input-number
                                            v-model:value="olist.percentage"
                                            placeholder="输入百分比"
                                            suffix="%"
                                            :min="0"
                                            :max="100"
                                            addon-after="%"
                                            style="width: 100%;"
                                        ></a-input-number>

                                        <!--删除按钮-->
                                        <a-button
                                            v-show="CATE.format_formRef[item.property_id].length > 1"
                                            type="dashed"
                                            style="margin-left: 10px;"
                                            @click="CATE.material_del(dIndex,CATE.format_formRef[item.property_id])"
                                        >删除</a-button>
                                    </a-space-compact>

                                </a-form-item>

                            </a-col>
                            <!--多材质列表 结束-->

                            <!--添加材质 开始-->
                            <a-col :span="6">
                                <div class="cursor Add_shui_img" " 
                                    @click="CATE.add_limit(CATE.format_formRef[item.property_id],item.multi_select_max)">
                                    <a-flex justify="center" align="center" style="height: 100%;font-size: 12px;">
                                    + 添加材质
                                    </a-flex>
                                </div>
                            </a-col>
                            <!--添加材质 结束-->
                        </a-row>
                        </a-col>

                    </template>

                </template>

                <!--必填属性-->

                <!--非必填属性-->
                <template v-for="item in CATE.format.value" >
                    
                    <!--文本-->
                    <a-col :span="6" v-if="item.type == 'text'">
                        <p>
                            {{ item.property_name }}
                            <span v-if="item.required ==1" style="color: red;">--必填</span>
                        </p>
                        
                        <p v-if="item.required == 1">
                            <a-form-item :name="item.property_id" :rules="[{ required: true, message: item.property_name + '不能为空！',trigger: 'change',}]">
                                <a-input 
                                    placeholder="请输入"
                                    autoComplete="off"
                                    v-model:value="CATE.format_formRef[item.property_id]"
                                    allow-clear
                                />
                            </a-form-item>
                        </p>
                        <p v-else-if="item.required !== 1">
                            <a-form-item :name="item.property_id">
                            <a-input 
                                placeholder="请输入"
                                autoComplete="off"
                                v-model:value="CATE.format_formRef[item.property_id]"
                                allow-clear
                            />
                            </a-form-item>
                        </p>
                    </a-col>

                    <!--单选-->
                    <a-col :span="6" v-else-if="item.type == 'select'">

                        <p>
                            {{ item.property_name }}
                            <span v-if="item.required ==1" style="color: red;">--必填</span>
                        </p>

                        <p v-if="item.required ==1">
                            <a-form-item 
                                :name="item.property_id" 
                                :rules="[{ required: true, message: item.property_name + '不能为空！',trigger: 'change',}]"
                            >
                                <a-select
                                    ref="select"
                                    v-model:value="CATE.format_formRef[item.property_id]"
                                    placeholder="请选择"
                                    allow-clear
                                    style="width: 120px;width: 100%;"
                                >
                                    <a-select-option v-for="opt in item.options" :value="opt.value_id" >
                                        {{ opt.name }}
                                    </a-select-option>
                                    <template #dropdownRender="{ menuNode: menu }" v-if="item.diy_type==1">
                                        <component :is="menu" />
                                        <a-divider style="margin: 4px 0" />
                                        <a-space style="padding: 4px 8px">
                                        <a-input ref="inputRef" 
                                            v-model:value="CATE.diy_name.value" 
                                            placeholder="自定义面料"
                                            autoComplete="off"
                                        />
                                        <a-button type="text" @click="CATE.addItem(item.options)">
                                            <template #icon><PlusOutlined /></template>添加
                                        </a-button>
                                        </a-space>
                                    </template>
                                </a-select>
                            </a-form-item>
                        </p>

                        <p v-else-if="item.required !==1">
                            <a-form-item :name="item.property_id">
                                <a-select
                                    ref="select"
                                    v-model:value="CATE.format_formRef[item.property_id]"
                                    placeholder="请选择"
                                    allow-clear
                                    style="width: 120px;width: 100%;"
                                >
                                    <a-select-option v-for="opt in item.options" :value="opt.value_id" >
                                        {{ opt.name }}
                                    </a-select-option>
                                    <template #dropdownRender="{ menuNode: menu }" v-if="item.diy_type==1">
                                        <component :is="menu" />
                                        <a-divider style="margin: 4px 0" />
                                        <a-space style="padding: 4px 8px">
                                        <a-input ref="inputRef" 
                                            v-model:value="CATE.diy_name.value" 
                                            placeholder="自定义面料"
                                            autoComplete="off"
                                        />
                                        <a-button type="text" @click="CATE.addItem(item.options)">
                                            <template #icon><PlusOutlined /></template>添加
                                        </a-button>
                                        </a-space>
                                    </template>
                                </a-select>
                            </a-form-item>
                        </p>
                    </a-col>

                    <!--多选-->
                    <a-col :span="6" v-else-if="item.type == 'multi_select'">
                        <p>
                            {{ item.property_name }}
                            <span v-if="item.required ==1" style="color: red;">--必填</span>
                        </p>
                        <p v-if="item.required == 1">

                            <a-form-item :name="item.property_id" :rules="[{ required: true, message: item.property_name + '不能为空！',trigger: 'change',}]">

                            <a-select
                                ref="select"
                                v-model:value="CATE.format_formRef[item.property_id]"
                                placeholder="请选择"
                                mode="multiple"
                                :maxTagCount="1"
                                allow-clear
                                @change="CATE.dis_ops(item, CATE.format_formRef[item.property_id])"
                                style="width: 120px;width: 100%;"
                            >
                                <a-select-option v-for="opt in item.options" :value="opt.value_id" :disabled="opt.disabled">
                                    {{ opt.name }}
                                </a-select-option>
                                <template #dropdownRender="{ menuNode: menu }" v-if="item.diy_type==1">
                                    <component :is="menu" />
                                    <a-divider style="margin: 4px 0" />
                                    <a-space style="padding: 4px 8px">
                                    <a-input ref="inputRef" 
                                        v-model:value="CATE.diy_name.value" 
                                        placeholder="自定义面料"
                                        autoComplete="off"
                                    />
                                    <a-button type="text" @click="CATE.addItem(item.options)">
                                        <template #icon><PlusOutlined /></template>添加
                                    </a-button>
                                    </a-space>
                                </template>
                            </a-select>
                        </a-form-item>
                        </p>
                        <p v-if="item.required !==1">
                            <a-form-item :name="item.property_id">
                            <a-select
                                ref="select"
                                v-model:value="CATE.format_formRef[item.property_id]"
                                placeholder="请选择"
                                mode="multiple"
                                :maxTagCount="1"
                                allow-clear
                                @change="CATE.dis_ops(item, CATE.format_formRef[item.property_id])"
                                style="width: 120px;width: 100%;"
                            >
                                <a-select-option v-for="opt in item.options" :value="opt.value_id" :disabled="opt.disabled">
                                    {{ opt.name }}
                                </a-select-option>
                                <template #dropdownRender="{ menuNode: menu }" v-if="item.diy_type==1">
                                    <component :is="menu" />
                                    <a-divider style="margin: 4px 0" />
                                    <a-space style="padding: 4px 8px">
                                    <a-input ref="inputRef" 
                                        v-model:value="CATE.diy_name.value" 
                                        placeholder="自定义面料"
                                        autoComplete="off"
                                    />
                                    <a-button type="text" @click="CATE.addItem(item.options)">
                                        <template #icon><PlusOutlined /></template>添加
                                    </a-button>
                                    </a-space>
                                </template>
                            </a-select>
                            </a-form-item>
                        </p>
                    </a-col>

                    <!--度量衡 单选 measure 多值输入-->
                    <a-col 
                        v-else-if="item.type == 'measure' && item.measure_templates[0].value_modules.length>1" 
                        :span="12">

                        <p>
                            {{ item.property_name }} 
                            <span v-show="item.required ==1" style="color: red;">*必填</span>
                        </p>

                        <p v-if="item.required == 1">
                            <a-space >

                            <template v-for="(items, key) in CATE.format_formRef[item.property_id]">
                                <a-form-item 
                                    :name="[item.property_id, items.module_id, 'value']"
                                    :rules="[{ required: true, message: item.property_name + '不能为空！',trigger: 'change',}]"
                                    style="padding: 0;margin: 0;width: 100%"
                                >
                                    <a-input-number
                                        v-model:value="items.value"
                                        autoComplete="off"
                                        :placeholder="'输入-'+ items.prefix"

                                    >
                                        <template  #addonAfter v-if="items.unit_id != undefined">
                                            <a-select 
                                            :options="items.op"
                                            v-model:value="items.unit_id"
                                            style="width: 60px;"
                                            :field-names="{
                                                label: 'unit_name',
                                                value: 'unit_id',
                                            }"
                                            >
                                            </a-select>
                                        </template>
                                    </a-input-number>
                                </a-form-item>
                            </template>
                            </a-space>
                        </p>

                        <p v-else>

                            <a-space >
                            <template v-for="(items, key) in CATE.format_formRef[item.property_id]">
                                <a-form-item 
                                    :name="[item.property_id, items.module_id, 'value']"
                                    style="padding: 0;margin: 0;width: 100%"
                                >
                                    <a-input-number
                                        v-model:value="items.value"
                                        autoComplete="off" 
                                        :placeholder="'输入-'+ items.prefix"
                                    >
                                        <template  #addonAfter v-if="items.unit_id != undefined">
                                            <a-select 
                                            :options="items.op"
                                            v-model:value="items.unit_id"
                                            style="width: 60px;"
                                            :field-names="{
                                                label: 'unit_name',
                                                value: 'unit_id',
                                            }"
                                            >
                                            </a-select>
                                        </template>
                                </a-input-number>
                                </a-form-item>
                            </template>
                            </a-space>
                        </p>
                    </a-col>

                    <!--度量衡 单选 measure 单值输入-->
                    <a-col 
                        v-else-if="item.type == 'measure' && item.measure_templates[0].value_modules.length == 1" 
                        :span="6">
                        <p>
                            {{ item.property_name }} 
                            <span v-show="item.required ==1" style="color: red;">*必填</span>
                        </p>

                        <p v-if="item.required == 1"><!--迭代 多度量衡 输入值 必填-->

                            <template v-for="(items,key) in CATE.format_formRef[item.property_id]">

                                <a-form-item 
                                    :name="[item.property_id, items.module_id, 'value']"
                                    :rules="[{ required: true, message: item.property_name + '不能为空！',trigger: 'change',}]"
                                >

                                    <a-input-number
                                        v-model:value="items.value" 
                                        :placeholder="'输入-'"
                                    >
                                        <template  #addonAfter>
                                            <a-select 
                                            :options="items.op"
                                            v-model:value="items.unit_id"
                                            style="width: 60px;"
                                            :field-names="{
                                                label: 'unit_name',
                                                value: 'unit_id',
                                            }"
                                            >
                                            </a-select>
                                        </template>
                                    </a-input-number>
                                
                                </a-form-item>
                                
                            </template>
                        </p>

                        <p v-else><!--迭代 多度量衡 输入值 非必填-->

                            <template v-for="(items,key) in CATE.format_formRef[item.property_id]">

                                <a-form-item 
                                    :name="[item.property_id, items.module_id, 'value']"
                                >
                                    <a-input-number
                                        v-model:value="items.value" 
                                        :placeholder="'输入-'"
                                    >
                                        <template  #addonAfter>
                                            <a-select 
                                            :options="items.op"
                                            v-model:value="items.value"
                                            style="width: 60px;"
                                            :field-names="{
                                                label: 'unit_name',
                                                value: 'unit_id',
                                            }"
                                            >
                                            </a-select>
                                        </template>
                                    </a-input-number>
                                
                                </a-form-item>
                                
                            </template>

                        </p>

                    </a-col>

                    <!--时间戳-->
                    <a-col :span="6" v-else-if="item.type == 'timestamp'">
                        <p>
                            {{ item.property_name }}
                            <span v-if="item.required ==1" style="color: red;">--必填</span>
                        </p>
                    </a-col>

                    <!--时间段-->
                    <a-col :span="6" v-else-if="item.type == 'timerange'">
                        <p>
                            {{ item.property_name }}
                            <span v-if="item.required ==1" style="color: red;">--必填</span>
                        </p>
                    </a-col>

                </template>
                
            </a-row>

            <p v-if="CATE.format.value.length == 0">
                <a-empty :image="simpleImage" />
            </p>

        </a-form>
        
    </div>
    
</template>

<script>
import {defineAsyncComponent, defineComponent, ref, computed, watch, onMounted } from 'vue'
import { PlusOutlined,DeleteOutlined} from '@ant-design/icons-vue';
import { Empty } from 'ant-design-vue';

import { 
  CATE,Select_shuixi_Img
} from '@/assets/douyinshop/productmanagement/Add';
export default defineComponent({
  name: '商品属性组件',
  
  components: {
    DeleteOutlined,
    PlusOutlined,
    selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件

  },
  
  props: {
    data: {
      type: Object,
    },
    data2: {
      type: String,
      default: ''
    }
  },
  
  emits: ['update', 'change'],
  
  setup(props, { emit, attrs, slots, expose }) {
    
    const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;// 默认为空图标




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
    // onMounted(() => {
    //   console.log('商品属性 组件已挂载')
    // })
    
    // 暴露给父组件的方法
    expose({
      reset: () => { count.value = 0 }
    })

    // 表单选择框---》搜索方法；
    const filterOption = (input, option) => {
        return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      CATE,
      Select_shuixi_Img,
      count,
      title,
      displayTitle,
      handleClick,
      filterOption,
      simpleImage
    }
  }
})
</script>

<style scoped>
.delivery-method {
  padding: 0;
}
.Add_shui_img{height: 90px;width: 100%;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_shui_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.call_shui_img{height: 90px;width: 100%;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;padding: 4px 0 0 0;}
.clear_shui_img{margin: 0 0 0 6px;}
 /*表单提示字体大小设置*/
:deep(.ant-form-item-explain) {
  font-size: 12px;  /* 改成你需要的大小 */
}
:deep(.ant-form-item-explain-error) {
  font-size: 12px;
}
</style>