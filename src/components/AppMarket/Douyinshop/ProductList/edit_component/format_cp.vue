<!--
商品属性模板 
###1\传入类目ID:渲染属性组件 
###2\传输预加载的属性对象：渲染到已经加载好的属性表单上
###3\获取属性上传数据：请求验证=>true：返回数据；验证不通过返回false，显示提示语；
PS：支持新建、编辑====》场景使用
-->
<template>
<div>

    <a-divider orientation="left" orientation-margin="0px">商品属性 <a href="#" class="font_size_12">智能填充属性</a></a-divider>
              
    <!--属性为空-->
    <div class="load_center" v-if="formdata.CateProperty == undefined" style="height: 400px;">
        
        <div style="clear: both;display: block;"><a-spin /></div>

    </div>
    
    <!--属性不为空-->
    <a-form 
        ref="format_form_ref" 
        :model="formdata.format_form_data" 
        v-else-if="formdata.CateProperty !== undefined"
    >

        <!--多选度量衡-->
        <a-row :gutter="[16,10]" style="padding: 0 0 20px 0;">
            
            <!--迭代出面料属性-->
            <template v-for="(item, index) in formdata.CateProperty">

                <!--多选度量衡 multi_value_measure-->
                <template v-if="item.type == 'multi_value_measure'">

                <!--属性名称-->
                <a-col :span="24">
                    {{ item.property_name }} 
                    <span v-show="item.required ==1" style="color: red;">*必填</span>
                </a-col>

                <!--迭代循环属性值-->
                <a-col :span="6" v-for="(olist, dIndex) in formdata.format_form_data[item.property_id]">
                    
                    <!-- {{ item.type }} {{ item.property_id }} -->
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
                            value: 'value',
                            }"
                            @focus="insetpagedata.fun.format.material_change(formdata.format_form_data[item.property_id],item.options)"
                        >

                            <template #dropdownRender="{ menuNode: menu }">
                                <v-nodes :vnodes="menu" />
                                <a-divider style="margin: 4px 0" />
                                <a-space style="padding: 4px 8px">
                                <a-input ref="inputRef" 
                                    v-model:value="insetpagedata.fun.format.diy_name.value" 
                                    placeholder="自定义面料"
                                    autoComplete="off"
                                />
                                <a-button type="text" @click="insetpagedata.fun.format.addItem(item.options)">
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
                    <a-space>
                    <a-input-number
                        v-model:value="olist.percentage"
                        placeholder="输入百分比"
                        suffix="%"
                        :min="0"
                        :max="100"
                        addon-after="%"
                    ></a-input-number>

                    <!--删除按钮-->
                    <a-button
                        v-show="formdata.format_form_data[item.property_id].length >1"
                        type="dashed"
                        @click="insetpagedata.fun.format.material_del(dIndex,formdata.format_form_data[item.property_id])"
                    >删除</a-button>
                    </a-space>
                    </a-form-item>
                </a-col>

                <a-col :span="24">
                    <a-button 
                    type="dashed"
                    @click="insetpagedata.fun.format.add_limit(formdata.format_form_data[item.property_id],item.multi_select_max)"
                    >添加材质</a-button>
                </a-col>
                </template>

            
            </template>
        
        </a-row>

        <!--基础属性列表-->
        <a-row :gutter="[16,0]" >

            <template v-for="(item, index) in formdata.CateProperty" :key="item.property_id">
            
            <!--文本-->
            <a-col v-if="item.type == 'text'" :span="6">
                <p>
                {{ item.property_name }} 
                <span v-show="item.required ==1" style="color: red;">*必填</span>
                </p>
                <p v-if="item.required == 1">
                <a-form-item 
                    :name="item.property_id"
                    :rules="[{ required: true, message: item.property_name + '不能为空！',trigger: 'change',}]"
                >
                    <a-input 
                    autoComplete="off"
                    :placeholder="'请输入-' + item.property_name"
                    v-model:value="formdata.format_form_data[item.property_id]" 
                    allow-clear
                    >
                </a-input>
                </a-form-item>
                </p>
                <p v-else>
                <a-form-item 
                    :name="item.property_id"
                >
                    <a-input 
                    autoComplete="off"
                    :placeholder="'请输入-' + item.property_name"
                    v-model:value="formdata.format_form_data[item.property_id]" 
                    allow-clear>
                </a-input>
                </a-form-item>
                </p>

            </a-col>

            <!--单选-->
            <a-col :span="6" v-if="item.type == 'select'">
                <p>
                {{ item.property_name }} 
                <span v-show="item.required ==1" style="color: red;">*必填</span>
                </p>

                <p v-if="item.required == 1">
                <a-form-item
                :name="item.property_id"
                :rules="[{ required: true, message: item.property_name + '不能为空！',trigger: 'change',}]"
                >
                <a-select
                    :placeholder="'请选择-' + item.property_name"
                    allow-clear
                    :options="item.options"
                    v-model:value="formdata.format_form_data[item.property_id]" 
                    style="width: 100%;"
                    :field-names="{
                    label: 'name',
                    value: 'value',
                    }"
                ></a-select>
                </a-form-item>
                </p>

                <p v-else>
                <a-form-item
                    :name="item.property_id"
                >
                <a-select
                    :placeholder="'请选择-' + item.property_name"
                    allow-clear
                    :options="item.options"
                    v-model:value="formdata.format_form_data[item.property_id]" 
                    style="width: 100%;"
                    :field-names="{
                        label: 'name',
                        value: 'value',
                    }"
                ></a-select>
                </a-form-item>
                </p>
                
            </a-col>

            <!--多选-->
            <a-col v-if="item.type == 'multi_select'" :span="6">

                <p>
                {{ item.property_name }} 
                <span v-show="item.required ==1" style="color: red;">*必填</span>
                </p>

                <p v-if="item.required == 1">
                <a-form-item
                    :name="item.property_id"
                    :rules="[{ required: true, message: item.property_name + '不能为空！',trigger: 'change',}]"
                >
                    <a-select
                        :placeholder="'请选择-' + item.property_name"
                        allow-clear
                        mode="multiple"
                        :max-tag-count="1"
                        :options="item.options"
                        v-model:value="formdata.format_form_data[item.property_id]" 
                        style="width: 100%;"
                        @change="insetpagedata.fun.format.dis_ops(item,formdata.format_form_data[item.property_id])"
                        :field-names="{
                        label: 'name',
                        value: 'value',
                        }"
                    ></a-select>
                </a-form-item>
                </p>

                <p v-else>
                <a-form-item
                    :name="item.property_id"
                >
                    <a-select
                        :placeholder="'请选择-' + item.property_name"
                        allow-clear
                        mode="multiple"
                        :max-tag-count="1"
                        :options="item.options"
                        v-model:value="formdata.format_form_data[item.property_id]" 
                        style="width: 100%;"
                        @change="insetpagedata.fun.format.dis_ops(item,formdata.format_form_data[item.property_id])"
                        :field-names="{
                        label: 'name',
                        value: 'value',
                        }"
                    ></a-select>
                </a-form-item>
                </p>
            </a-col>

            <!--单选 度量衡 measure-->
            <a-col v-else-if="item.type == 'measure'" :span="6">

                <p>
                {{ item.property_name }} 
                <span v-show="item.required ==1" style="color: red;">*必填</span>
                </p>

                <!--克重-->
                <p v-if="item.required == 1">
                <a-form-item 
                    :name="item.property_id"
                    :rules="[{ required: true, message: item.property_name + '不能为空！',trigger: 'change',}]"
                    >
                    <a-input-number
                        style="width: 100%;"
                        :placeholder="'请输入-' + item.property_name"
                        autoComplete="off"
                    ></a-input-number>
                </a-form-item>
                </p>
                <p v-else>
                    <a-form-item 
                    :name="item.property_id"
                    >
                    <a-input-number
                        style="width: 100%;"
                        :placeholder="'请输入-' + item.property_name"
                        autoComplete="off"
                    ></a-input-number>
                </a-form-item>
                </p>

                <!--长宽高-->
            
            </a-col>

            <!--时间戳-->
            <a-col v-if="item.type == 'timestamp'" :span="6">

                <p>
                    {{ item.property_name }} 
                    <span v-show="item.required ==1" style="color: red;">*必填</span>
                </p>

                {{ item.type }}

            </a-col>

            <!--时间段-->
            <a-col v-if="item.type == 'timerange'" :span="6">
                <p>
                {{ item.property_name }} 
                <!-- {{ value.important_type }}  -->
                <span v-show="item.required ==1" style="color: red;">*必填</span>
                </p>
                {{ item.type }}
            </a-col>

            </template>
        </a-row> 

    </a-form>

</div>
</template>
<script>
import ProductList from '@/views/AppMarket/DouyinShop/ProductList.vue';
import { defineComponent,ref,reactive,onMounted,h } from 'vue';
import { PlusOutlined} from '@ant-design/icons-vue';
import * as ProductEdit from '@/assets/douyinshop/productmanagement/edit';// 商品管理->编辑操作方法

// 组件引用=====开始
export default {
    name:'name',

    components:{

        PlusOutlined,

        // 产品属性>面料属性》多选组件
        VNodes:defineComponent({
            props: {
                vnodes: {
                    type: Object,
                    required: true,
                },
            },
            render() {
            return this.vnodes;
            },
        })

   },

    props: {
    data:{typr:Object}
    },

setup(props,ctx) {
    
    const formdata = props.data; // 表单绑定

    // 属性表单验证对象
    const format_form_ref = ref()

    formdata.format_form_ref = format_form_ref;// 验证对象传值到方法中，方法验证调用；

    const insetpagedata = new ProductEdit.Insetpagedata() // 数据操作方法加载

    // 表单选择框---》搜索方法；
    const filterOption = (input, option) => {
        return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };




    return{
        formdata,
        format_form_ref,
        insetpagedata,
        filterOption
    }
   }
}
</script>
<style scoped>
.load_center{height: 100%;width: 100%;display: flex;justify-content: center;align-items: center;}

</style>