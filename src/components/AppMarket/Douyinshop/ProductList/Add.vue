<!-- 抖店铺==新建商品组件 -->
<template>

    <!-- 动态渲染异步组件--添加主图 -->
    <selectimg v-if="PAGEDATA.selectimg_open" v-on:add_img_callback="PAGEDATA.Add_Callback" :data="PAGEDATA"/>

    <a-modal
      v-model:open="props.data.AddDate"
      width="100%"
      wrap-class-name="full-modal"
      @ok="handleOk"
    >
        <a-layout-content class="content">

            <div style="width: 950px;margin: 0 auto;">

                <a-tabs v-model:activeKey="activeKey">

                    <a-tab-pane key="1" tab="基础信息">

                        <a-row>

                            <!----主图--pic-->
                            <a-col :span="16">

                                <a-divider 
                                    orientation="left" 
                                    orientation-margin="0px"
                                >
                                    主图
                                </a-divider>

                                <div style="width: 100%; height: 120px;">

                                    <p class="img_pic" v-for="item in Pic_Fun.PicList.value">

                                        <a-image :src="item.byte_url" />
                                        <!--图片尺寸不复合情况下-->

                                        <!--图片尺寸1：1情况下-->
                                        <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                                            <a-button type="text" size="small" @click="Pic_Fun.del_pic(item.material_id)"> 
                                                <DeleteOutlined />
                                            </a-button>
                                        </span>

                                    </p>

                                    <!--添加按钮-->
                                    <p 
                                        @click="PAGEDATA.change_material_type('PicList')" 
                                        class="cursor Add_img"
                                        v-if="Pic_Fun.PicList.value.length < 5"
                                        >
                                        <a-flex justify="center" align="center" style="height: 100%;">
                                            <PlusOutlined /> 添加 
                                        </a-flex>
                                    </p>

                                </div>

                            </a-col>
                            
                            <!--白底图 -- white_back_ground_pic_url -->
                            <a-col :span="8">
                                <a-divider orientation="left" orientation-margin="0px">白底图</a-divider>
                                
                                <div style="width: 100%;height:120px;">

                                    <p class="img_pic" v-for="item in whiteimg_Fun.PicList.value">

                                        <a-image :src="item.byte_url" />

                                        <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                                            <a-button type="text" size="small" @click="whiteimg_Fun.del"> 
                                                <DeleteOutlined />
                                            </a-button>
                                        </span>
                                    </p>

                                    <!--添加按钮-->
                                    <p 
                                        @click="PAGEDATA.change_material_type('white_img')" 
                                        class="cursor Add_img"
                                        v-if="whiteimg_Fun.PicList.value < 1"
                                    >
                                        <a-flex justify="center" align="center" style="height: 100%;">
                                            <PlusOutlined /> 添加 
                                        </a-flex>
                                    </p>

                                </div>
                            </a-col>

                        </a-row>
                        
                        <a-row>

                            <!--3比4长图 -- long_pic_url -->
                            <a-col :span="16">
                                <a-divider 
                                    orientation="left" 
                                    orientation-margin="0px"
                                >
                                    3:4长图 
                                </a-divider>

                                <div style="width: 100%;height: 160px;">

                                    <p class="img_3_4_pic" v-for="item in Longimg_Fun.PicList.value">
                                        
                                        <a-image :height="110" :src="item.byte_url" />

                                        <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                                            <a-button type="text" size="small" @click="Longimg_Fun.del(item.material_id)"> 
                                                <DeleteOutlined />
                                            </a-button>
                                        </span>
                                    </p>


                                    <!--添加按钮-->
                                    <p 
                                        @click="PAGEDATA.change_material_type('long_img_List')" 
                                        class="cursor Add_3_4_img"
                                        v-if="Longimg_Fun.PicList.value.length < 5"
                                    >
                                        <a-flex justify="center" align="center" style="height: 100%;">
                                            <PlusOutlined /> 添加 
                                        </a-flex>
                                    </p>

                                </div>

                            </a-col>

                            <!--视频 -- material_video_id -->
                            <a-col :span="8">
                                <a-divider orientation="left" orientation-margin="0px">视频</a-divider>

                                <div style="width: 100%;height:120px;">

                                    <p class="img_3_4_pic" v-for="item in video_Fun.PicList.value">
                                        <a-image :height="110" :src="item.video_info.video_cover_url" />
                                        <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                                            <a-button type="text" size="small" @click="video_Fun.del"> 
                                                <DeleteOutlined />
                                            </a-button>
                                        </span>
                                    </p>

                                    <!--添加按钮-->
                                    <p 
                                        @click="PAGEDATA.change_material_type('video_info')" 
                                        class="cursor Add_3_4_img"
                                        v-if="video_Fun.PicList.value.length < 1"
                                    >
                                        <a-flex justify="center" align="center" style="height: 100%;">
                                            <PlusOutlined /> 添加 
                                        </a-flex>
                                    </p>
                                </div>
                            </a-col>

                        </a-row>

                        

                        <!--基本信息-->
                        <a-divider 
                            orientation="left" 
                            orientation-margin="0px">
                            基础信息
                        </a-divider>
                        <div style="width: 100%;">

                            <a-form
                                ref="formRef"
                                name="ProductInfo"
                                :model="formState"
                            >
                                <a-row :gutter="[16,0]">

                                    <a-col :span="24">
                                        <a-form-item
                                            label="商品标题"
                                            name="name"
                                            placeholder="输入商品标题"
                                            :rules="[{ required: true, message: '请输入商品标题' }]"
                                        >
                                            <a-input v-model:value="formState.name" show-count :maxlength="30" />
                                        </a-form-item>
                                    </a-col>

                                    <a-col :span="8">
                                        <a-form-item 
                                            label="商品类型" 
                                            name="product_type"
                                            :rules="[{ required: true, message: '请选择类型' }]"
                                        >
                                            <a-select v-model:value="formState.product_type" placeholder="选择类型">
                                                <a-select-option value="0">普通</a-select-option>
                                                <a-select-option value="3">虚拟</a-select-option>
                                                <a-select-option value="3">玉石闪购</a-select-option>
                                                <a-select-option value="3">云闪购</a-select-option>
                                            </a-select>
                                        </a-form-item>
                                    </a-col>

                                    <a-col :span="8">
                                        <a-form-item
                                            label="推荐语"
                                            name="recommend_remark"
                                            :rules="[{ required: false, message: '请输入商家推荐语'}]"
                                        >
                                            <a-input v-model:value="formState.recommend_remark" show-count :maxlength="30" placeholder="输入商品推荐语"/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-form-item
                                            label="商家备注"
                                            name="remark"
                                            :rules="[{ required: false, message: '' }]"
                                        >
                                            <a-input v-model:value="formState.remark" placeholder="商家可见备注" show-count :maxlength="30" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-form-item 
                                            label="支付方式" 
                                            name="pay_type"
                                            :rules="[{ required: true, message: '请选择方式' }]"
                                        >
                                            <a-select v-model:value="formState.pay_type" placeholder="选择支付方式">
                                                <a-select-option value="0">货到付款</a-select-option>
                                                <a-select-option value="1">在线支付</a-select-option>
                                                <a-select-option value="2">货到付款+在线支付</a-select-option>
                                            </a-select>
                                        </a-form-item>
                                    </a-col>
                                    
                                    <a-col :span="8">
                                        <a-form-item 
                                            label="减库存类型" 
                                            name="reduce_type"
                                            :rules="[{ required: true, message: '请选择减库存类型' }]"
                                        >
                                            <a-select v-model:value="formState.reduce_type" placeholder="选择方式">
                                                <a-select-option value="1">拍下减库存</a-select-option>
                                                <a-select-option value="2">付款减库存</a-select-option>
                                            </a-select>
                                        </a-form-item>
                                    </a-col>

                                    <a-col :span="8">
                                        <a-form-item
                                            label="客服电话"
                                            name="mobile"
                                            placeholder="输入客服电话"
                                            :rules="[{ required: true, message: '请输入客服电话'}]"
                                        >
                                            <a-input v-model:value="formState.mobile" />
                                        </a-form-item>
                                    </a-col>

                                    <a-col :span="8">
                                        <a-form-item
                                            label="提交方式"
                                            name="commit"
                                            :rules="[{ required: true, message: '请输提交方式'}]"
                                        >
                                            <a-select v-model:value="formState.commit" placeholder="选择方式">
                                                <a-select-option value="true">保存+提审</a-select-option>
                                                <a-select-option value="false">仅保存</a-select-option>
                                            </a-select>
                                        </a-form-item>
                                    </a-col>

                                    <a-col :span="8">
                                        <a-form-item
                                            label="运费模板"
                                            name="freight_id"
                                            :rules="[{ required: true, message: '请选择运费模板'}]"
                                        >
                                            <a-input-group compact>
                                                <a-input v-model:value="formState.freight_id" placeholder="选择运费模板" disabled style="width: calc(74%)" />
                                                <a-button >选择</a-button>
                                            </a-input-group>
                                        </a-form-item>                                    
                                    </a-col>

                                    <a-col :span="8">
                                        <a-form-item
                                            label="尺码模板"
                                            name="size_info_template_id"
                                            :rules="[{ required: true, message: '请选择尺码模板'}]"
                                        >
                                            <a-input-group compact>
                                                <a-input v-model:value="formState.size_info_template_id" placeholder="请选择尺码模板" disabled style="width: calc(74%)" />
                                                <a-button>选择</a-button>
                                            </a-input-group>
                                        </a-form-item>                                    
                                    </a-col>

                                </a-row>
                            </a-form>
                        </div>
                    </a-tab-pane>

                    <a-tab-pane key="2" tab="规格&库存">
                        
                        <a-divider orientation="left" orientation-margin="0px">
                            规格
                        </a-divider>

                        <a-form ref="SPECS.sku_formRef" name="SPECS" :model="SPECS.Obj">

                            <a-form-item 
                                v-for="(item, index) in SPECS.Obj" 
                                :name="[index,'name']"
                                :key="item.index"
                                :rules="{required: true, trigger: 'change', message:' '}"
                            >
                                <!--规格名称 开始-->
                                <a-input 
                                    v-model:value="item.name"
                                    size="small" 
                                    placeholder="输入规格名称" 
                                    style="width: 200px;" 
                                    autocomplete="off"
                                    allow-clear
                                />
                    
                                <a-button type="dashed" size="small" class="add_btn_class" block @click="SPECS.pushvalue(index)">
                                <PlusOutlined />
                                </a-button>

                                <a-button type="dashed" size="small" class="add_btn_class" block @click="SPECS.del(item,index)">
                                <MinusOutlined />
                                </a-button>
                            <!--规格名称 结束-->

                                <!--规格值 开始-->
                                <div style="width: 100%;clear: both; margin:4px 0 0 0;">

                                <a-space v-for="(v_item, spec_value_index) in item.value" :key="v_item.index" style="margin:2px 4px 0 0;" align="baseline" >

                                    <a-form-item 
                                        v-if="index === 0" 
                                        :name="[index, 'value', spec_value_index,'v_name']" 
                                        :rules="{required: true, trigger: 'change', message:''}">
                                        <div style="width: 200px;margin: 10px 0 4px 0;">
                                            <a-input v-model:value="v_item.v_name" 
                                                placeholder="输入值" 
                                                size="small" 
                                                style="font-size: 12px;margin:0 0 6px 0;" 
                                                autocomplete="off"
                                                allow-clear
                                            />
                                        </div>

                                        <span v-if="v_item.url=== undefined || v_item.url === ''">
                                            <span style="width: 42px;margin-top: 5px;height: 42px;display: block;border:1px #f2f2f2 solid;border-radius:4px;float: left;">
                                                <a-skeleton-avatar :active="false" size="large" shape="avatarShape" class="cursor"/>
                                            </span>
                                        </span>

                                        <span v-else-if="v_item.url != undefined" style="float: left;">
                                            <a-image style="border-radius:4px;margin-top: 5px;" :width="42" :height="42" :src="v_item.url"/>
                                        </span>

                                        <a-form-item>
                                            <a-textarea 
                                            placeholder="输入规格图片地址" 
                                            size="small"
                                            autocomplete="off"
                                            allow-clear
                                            :auto-size="{ minRows: 2, maxRows: 2 }" 
                                            style="font-size:12px;margin:4px 0 0 6px;width: 150px;"
                                            />
                                        </a-form-item>
                                    
                                    </a-form-item>

                                    <a-form-item
                                        v-if="index !== 0"
                                        :name="[index, 'value', spec_value_index,'v_name']" 
                                        :rules="{required: true, trigger: 'change', message:''}"
                                        >

                                        <a-input 
                                            v-model:value="v_item.v_name"
                                            placeholder="输入值" 
                                            size="small"
                                            autocomplete="off"
                                            allow-clear
                                            style="font-size: 12px;width: 200px;" 
                                        />
                                    </a-form-item>

                                    <MinusCircleOutlined @click="SPECS.removevalue(v_item, index)" style="margin: 0 5px 0 0;" />

                                </a-space>

                                </div>
                                <!--规格值 结束-->

                            </a-form-item>

                            <a-form-item>
                                <a-button type="dashed" @click="SPECS.add" size="middle">添加规格</a-button>
                            </a-form-item>

                        </a-form>

                        <!--库存开始-->
                        <a-divider orientation="left" orientation-margin="0px">库存</a-divider>
                        
                        <a-form ref="skulistRef" :model="sku_list" name="basic">
                            <a-table :columns="sku_list.columns" :data-source="sku_list.data" :pagination="false" style="font-size: 12px;" size="small" bordered>
                            
                            <template #bodyCell="{ column, text, record, index }">
                                
                                <template v-if="column.dataIndex === 'name'">
                                <a>{{ text }}</a>
                                </template>

                                <template v-if="column.dataIndex === 'price'">
                                <a-form-item 
                                    :name="['data', index, 'price']" 
                                    :rules="{required: true, trigger: 'change', message:''}"
                                >
                                    <a-input-number 
                                        placeholder="输入价格" 
                                        size="small" 
                                        v-model:value="record.price" 
                                        prefix="￥" 
                                        :min="0" 
                                        :step="0.01"
                                        autocomplete="off"
                                        allow-clear
                                        style="font-size: 12px;width: 100%;"/>
                                </a-form-item>
                                </template>

                                <template v-if="column.dataIndex === 'stock_num'">
                                <a-form-item :name="['data', index, 'stock_num']" :rules="{required: true, trigger: 'change', message:''}">
                                    <a-input-number 
                                    placeholder="输入库存" 
                                    size="small" 
                                    :min="0"
                                    :max="999999999"
                                    v-model:value="record.stock_num" 
                                    autocomplete="off"
                                    allow-clear
                                    style="font-size: 12px;width: 100%;"/>
                                </a-form-item>
                                </template>
                                
                                <template v-if="column.dataIndex === 'code'">
                                    <a-form-item :name="['data', index, 'code']" :rules="{required: false, trigger: 'change', message:''}">
                                        <a-input
                                            placeholder="商家编码"
                                            autocomplete="off"
                                            v-model:value="record.code" 
                                            size="small" 
                                            allow-clear
                                            style="font-size: 12px;width: 100%;" />
                                    </a-form-item>
                                </template>
                                
                            </template>


                            <!-- <template #title>规格列表</template>
                            <template #footer>Footer</template> -->
                            
                            </a-table>
                        </a-form>
                        <!--库存结束-->

                    </a-tab-pane>

                    <a-tab-pane key="3" tab="分类属性">
                        
                        <a-divider orientation="left" orientation-margin="0px">分类</a-divider>
                        <p>
                            <a-form ref="CATE.first_formRef">        
                                <a-form-item name="CATE.cate_name.value">
                                    <a-cascader
                                        v-model:value="CATE.cate_name.value"
                                        :options="CATE.options.value"
                                        :load-data="CATE.loadData"
                                        @change="CATE.loadFormat"
                                        placeholder="选择分类"
                                    />
                                </a-form-item>
                            </a-form>
                        </p>

                        <a-divider orientation="left" orientation-margin="0px">
                            属性
                        </a-divider>

                        <a-row v-if="CATE.format.value.length !== 0" :loading="true" :gutter="[16,16]">

                            <a-col v-for="item in CATE.format.value" :span="6">
                                
                                <!--输入文本 required-->
                                <div v-if="item.type == 'text'">
                                    <p>
                                        {{ item.property_name }}
                                        <span v-if="item.required ==1" style="color: red;">--必填</span>
                                    </p>
                                    <p><a-input type="text" placeholder="请输入"></a-input></p>
                                </div>

                                <!--单选-->
                                <div v-if="item.type == 'select'">
                                    <p>
                                        {{ item.property_name }}
                                        <span v-if="item.required ==1" style="color: red;">--必填</span>
                                    </p>
                                    <p>
                                        <a-select
                                            ref="select"
                                            v-model:value="item.result_value"
                                            placeholder="请选择"
                                            allow-clear
                                            @change="console.log(item.result_value)"
                                            style="width: 120px;width: 100%;"
                                        >
                                            <a-select-option v-for="opt in item.options" :value="opt.value" >
                                                {{ opt.name }}
                                            </a-select-option>
                                        </a-select>
                                    </p>
                                </div>

                                <!--多选-->
                                <div v-if="item.type == 'multi_select' || item.type == 'multi_value_measure'">
                                    <p>
                                        {{ item.property_name }}
                                        <span v-if="item.required ==1" style="color: red;">--必填</span>
                                    </p>
                                    <p>
                                        <a-select
                                            ref="select"
                                            v-model:value="item.result_value"
                                            placeholder="请选择"
                                            mode="multiple"
                                            :maxTagCount="1"
                                            allow-clear
                                            @change="CATE.dis_ops(item)"
                                            style="width: 120px;width: 100%;"
                                        >
                                            <a-select-option v-for="opt in item.options" :value="opt.value" :disabled="opt.disabled">
                                                {{ opt.name }}
                                            </a-select-option>

                                        </a-select>
                                    </p>
                                </div>

                                <!--时间戳-->
                                <div v-if="item.type == 'timestamp'">
                                    <p>
                                        {{ item.property_name }}
                                        <span v-if="item.required ==1" style="color: red;">--必填</span>
                                    </p>
                                </div>

                                <!--时间段-->
                                <div v-if="item.type == 'timerange'">
                                    <p>
                                        {{ item.property_name }}
                                        <span v-if="item.required ==1" style="color: red;">--必填</span>
                                    </p>
                                </div>
                            </a-col>
                        </a-row>

                        <p v-if="CATE.format.value.length == 0">
                            <a-empty :image="simpleImage" />
                        </p>

                    </a-tab-pane>

                    <a-tab-pane key="4" tab="描述详情">
                        <a-divider orientation="left" orientation-margin="0px">描述详情</a-divider>
                        <div style="border: 1px solid #ccc;height: 100%;">
          
                            <Toolbar
                                style="border-bottom: 1px solid #ccc"
                                :editor="editorRef"
                                :defaultConfig="toolbarConfig"
                                :mode="mode"
                            />

                            <Editor
                                style="height: 600px; overflow-y: hidden;"
                                v-model="valueHtml"
                                :defaultConfig="editorConfig"
                                :mode="mode"
                                @onCreated="handleCreated"
                            />

                        </div>
                    </a-tab-pane>

                    <a-tab-pane key="5" tab="限购设置">
                        <a-divider orientation="left" orientation-margin="0px">限购设置</a-divider>
                        <p>限购设置</p>
                    </a-tab-pane>

                </a-tabs>

            </div> 
        </a-layout-content>

    </a-modal>
</template>
<script>
import { defineComponent,defineAsyncComponent,ref,reactive,onMounted,computed,shallowRef,onBeforeUnmount } from 'vue';
import { useStore } from 'vuex'
import { PlusOutlined,DeleteOutlined,MinusOutlined,MinusCircleOutlined} from '@ant-design/icons-vue';
import axios from 'axios';
import { Empty } from 'ant-design-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import * as TABLE from '@/assets/JS_Model/TableOperate';
import * as utils from '@/assets/JS_Model/public_model';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue' // 描述详情富媒体
import '@wangeditor/editor/dist/css/style.css' // 引入富媒体编辑器样式 css

// 组件引用=====开始
export default defineComponent({
    name:'新建商品',
    components:{
        PlusOutlined,
        DeleteOutlined,
        MinusOutlined,
        MinusCircleOutlined,
        selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件
        Editor,// 详情编辑
        Toolbar, // 编辑工具栏
        // 运费模板组件
        // 尺码模板组件
    },
    props: {
        data:{typr:Object}
    },
    setup(props,ctx) {

        const tool = new TOOL.TOOL()            // 工具方法
        const TO = new TABLE.TableOperate()   // 表格操作方法
        const API = new utils.A_Patch()         // 请求接口地址合集
        const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

        // 分类信息初始化
        onMounted(() => {
            tool.Http_.post(API.AppSrtoreAPI.dou_product.cate, {"cid":0}).then(res=>{
                let obj_list = res.data.data
                CATE.options.value = CATE.get_cate_list(obj_list)
            })
        })

        // 添加商品配置
        const PAGEDATA=reactive({
            selectimg_open:false,       // 添加主图-图片显示状态配置
            setimg_name:'',             // 添加图片的对象['PicList','long_img_List','white_img','video']
            // 图片组件获取地址后添加到页面容器：：：回调方法
            Add_Callback:(data)=>{
                var type = PAGEDATA.setimg_name; // 添加类型
                if(type == 'PicList'){// 判断回调type：：：主图添加
                    Pic_Fun.add(data)// 添加主图方法
                }else if(type == 'long_img_List'){// 判断回调type：：：3:4长图添加
                    Longimg_Fun.add(data)// 添加长图方法
                }else if(type == 'white_img'){// 判断回调type：：：白底图添加
                    whiteimg_Fun.add(data)// 添加白底图方法
                }else if(type == 'video_info'){
                    video_Fun.add(data)// 添加视频方法
                }
            },
            // 变更添加素材类型
            change_material_type:(typeName)=>{
                PAGEDATA.selectimg_open = true;
                PAGEDATA.setimg_name = typeName; // 指定添加图片的对象
            }
        })
        
        // 主图对象
        const Pic_Fun = {
            PicList:ref([]),
            // 删除图片
            del_pic:(d_id)=>{
                Pic_Fun.PicList.value.forEach((val, idx) => {
                    if(d_id == val.material_id){Pic_Fun.PicList.value.splice(idx, 1)}
                })
            },
            // 添加图片
            add:(data)=>{

                data.forEach((obj,idx)=>{
                    Pic_Fun.PicList.value.push(obj)
                })

                if(Pic_Fun.PicList.value.length > 5){
                    Pic_Fun.PicList.value = Pic_Fun.PicList.value.slice(0, 5)
                }

            }
        }

        // 3:4长图
        const Longimg_Fun = {
            PicList:ref([]),
            // 删除长图
            del:(d_id)=>{
                // console.log(d_id)
                Longimg_Fun.PicList.value.forEach((val, idx) => {
                    // console.log(val,idx);
                    if(d_id == val.material_id){Longimg_Fun.PicList.value.splice(idx, 1)}
                })
            },
            // 添加长图
            add:(data)=>{
                data.forEach((obj,idx)=>{
                    Longimg_Fun.PicList.value.push(obj)
                })
                if(Longimg_Fun.PicList.value.length > 5){
                    Longimg_Fun.PicList.value = Longimg_Fun.PicList.value.slice(0, 5)
                }
            }
        }

        // 白底图
        const whiteimg_Fun={
            PicList:ref([]),
            // 删除白底图
            del:()=>{
                whiteimg_Fun.PicList.value.length = 0
            },
            // 添加白底图
            add:(data)=>{
                whiteimg_Fun.PicList.value.length = 0;
                whiteimg_Fun.PicList.value.push(data[0])
            }
        }

        // 视频
        const video_Fun={
            PicList:ref([]),
            // 删除视频
            del:()=>{
                video_Fun.PicList.value.length = 0;
            },
            // 添加视频
            add:(data)=>{

                var obj = data[0]
                var material_type = obj.material_type; // 对象类型图片、视频
                console.log(material_type)

                // 判断添加素材类型：仅允许添加
                if(material_type == 'photo'){
                    tool.Fun_.message('info', '请选择视频文件')
                }else if(material_type == 'video'){
                    video_Fun.PicList.value.length = 0;
                    video_Fun.PicList.value.push(data[0])
                }
            }
        }

        // 基础信息
        const formRef = ref();
        const formState = reactive({
            product_type:'0',           // 商品类别
            mobile:'13888888888',       // 客服电话
            name:undefined,             // 商品标题
            recommend_remark:undefined, // 推荐语
            pay_type:'1',               // 支付类型
            reduce_type:'1',            // 减库存类型
            freight_id:undefined,       // 运费模板
            size_info_template_id:undefined,// 尺码模板
            commit:'false',             // 提交
            remark:undefined            // 商家备注
        })

        // 确认按钮
        const handleOk = e => {console.log(e);};

        // 默认选项卡
        const activeKey = ref('1');
        // 规格库存
        const SPECS = reactive({

            sku_formRef:ref(null),
            sku_listRef:ref(null),
            sku_columns:ref([]),
            sku_spece_data:ref([]),

            // 规格数据对象
            Obj:ref([{
                name:undefined,
                value:[{
                    v_name:undefined,  // 值名称
                    url:undefined      // 规格图片
                }],
            }]),

            // 添加规格
            add:() =>{

                var obj_number = SPECS.Obj.length;

                if(obj_number>=3){
                
                    tool.Fun_.message('info','规格最多不能超过三组！');
                    
                    return false

                }else{

                SPECS.Obj.push({
                    name:undefined,
                    value:[{
                        v_name:undefined,       // 值名称
                        url:undefined           // 图片地址
                    }],
                    })
                }
            },

            // 删除规格
            del:(item)=>{

                let index = SPECS.Obj.indexOf(item);
                if (index !== -1) {
                    SPECS.Obj.splice(index, 1);
                }
            },

            // 添加规格值
            pushvalue:(data)=>{
                // console.log(SPECS.Obj[data].value.length)
                var value_number = SPECS.Obj[data].value.length;
                if(value_number >= 20){
                    tool.Fun_.message('error', '规格值最多不能超过20组！')
                    return false
                }else{
                    SPECS.Obj[data].value.push({
                        v_name:undefined,// 值名称
                        url:undefined//
                    });

                }
            },

            // 删除规格值
            removevalue:(item,data)=>{
                let index = SPECS.Obj[data].value.indexOf(item);
                if (index !== -1) {
                    SPECS.Obj[data].value.splice(index, 1);
                }
            }

        })

        // 根据规格-->构造规格列表
        const sku_list = computed(()=>{
            
            // 提取sku的name数组
            var get_name_sku_list = () =>{
                var name_list = []
                var datalist = SPECS.Obj;
                for(let i of datalist){
                    name_list.push(i.name)
                }
                return name_list
            }

            // 提取-初始情况下-sku_价格、库存
            var get_p_s_obj = () => {

                var res_obj = {}
                for(let i of SPECS.Obj){
                    for(let y of i.value){if(y.price != undefined){
                        var p_s_obj = {}
                        p_s_obj.price === undefined ? '':y.price
                        p_s_obj.stock_num === undefined ? '':y.stock_num
                        p_s_obj.code = y.code === undefined ? '':y.code
                        res_obj[y.value] = p_s_obj
                    }}
                }
                return res_obj
            }


            // 笛卡尔积方法sku_value数组取值
            var get_value_sku_list= () =>{
            
                var res_list = []

                var datalist = SPECS.Obj;
                
                // 规格取值
                for(let i of datalist){
                    var v_list = []
                    for(let y of i.value){
                        v_list.push(y.v_name)
                    }
                    res_list.push(v_list)
                }

                // 笛卡尔积方法
                var d_list = tool.Fun_.cartesianProduct(res_list)
                
                // 比对价格、库存、编码
                // console.log(d_list)
                // JSON.parse(props.data.sku_list)

                // for (let i of d_list){
                //     var value = i.join('&gt;')
                //     var p_s_res = JSON.parse(props.data.sku_list) // 价格库存关系匹配 
                //     // console.log(p_s_res[value])
                //     let obj = p_s_res[value];
                //     let price = obj.price // 价格
                //     let stock_num = obj.canBookCount // 库存
                //     i.push(price)
                //     i.push(stock_num)

                // }

                return d_list

            }

            // comlum取值
            var get_colums = () =>{
                var name_list = get_name_sku_list()
                var res_list = []
                for(let i of name_list){
                    let c_obj = {}
                    c_obj.title = i;
                    c_obj.dataIndex = i;
                    res_list.push(c_obj)
                }

                let price_obj = {title:'价格',dataIndex:'price'}
                let stock_num_obj = {title:'库存',dataIndex:'stock_num'}
                let code_obj = {title:'编码',dataIndex:'code'}
                res_list.push(price_obj)
                res_list.push(stock_num_obj)
                res_list.push(code_obj)
                return res_list
            }
            
            // 规格表单data取值(实时)
            var get_data = () =>{

                var p_s_obj = get_p_s_obj()

                var name_list = get_name_sku_list()//名称列表

                var d_list = get_value_sku_list()// 值列表

                var data_list = []

                for(let y of d_list){

                    var data = {}

                    for(var i=0;i<name_list.length;i++){
                        var name = name_list[i]//名称
                        var value = y[i]       // 值

                        var p_s_res = p_s_obj[value] // 价格库存关系匹配
                        if(p_s_res != undefined){     // 匹配成功
                            data.price === undefined ? '':p_s_res.price
                            data.stock_num === undefined ? '':p_s_res.stock_num
                            data.code === undefined ? '':p_s_res.code
                        }

                        data[name_list[i]] = y[i];
                    
                    }

                    data_list.push(data)
                    
                }

                return data_list

            }

            // 规格表单data取值(实时)
            var get_old_data = () =>{

                var name_list = get_name_sku_list()//名称列表

                var d_list = get_value_sku_list()// 值列表

                var data_list = []

                for(let y of d_list){

                    var data = {}

                    for(var i=0;i<name_list.length;i++){
                        data[name_list[i]] = y[i];
                    }
                    data.price = y[y.length-2] === undefined? 0:y[y.length-2] + ''
                    data.stock_num = y[y.length-1] + ''
                    data_list.push(data)
                }

                return data_list

            }

            // if(sku_list_data === '0'){                // 没有SKU—list的情况下

            //     var data_list = get_data()            // 实时排列的sku列表

            // }else{// 有SKU-list数据的情况下

            //     var data_list = get_old_data()            // 实时排列的sku列表

            // }

            return reactive({
                columns: get_colums(),
                data:get_data()
            }) 
            
        })

        // 分类
        const CATE = {

            first_formRef:ref(),        // 表单数据绑定
            options:ref([]),            // 分类选项
            cate_name:ref([]),          // 分类
            select_loading:ref(false),  // 加载状态
            format:ref([]),             // 商品属性
            // 类目列表转换
            get_cate_list:(obj)=>{
                var obj_list = []
                for(let i of obj){
                    let cate_obj = {}
                    cate_obj.value = i.id;
                    cate_obj.label = i.name;
                    cate_obj.isLeaf = i.is_leaf;
                    obj_list.push(cate_obj)
                }
                return obj_list
            },
            // 选择下级分类加载方法
            loadData:selectedOptions =>{

                const targetOption = selectedOptions[selectedOptions.length - 1];

                var cid = targetOption.value;       // 分类id

                var isLeaf = targetOption.isLeaf;   // 是否叶子类目

                // console.log(targetOption)

                targetOption.loading = true; // load options
                
                // const res = await axios.post(API.AppSrtoreAPI.dou_product.cate, {"cid":cid})

                axios.post(API.AppSrtoreAPI.dou_product.cate, {"cid":cid}).then(res=>{
                    targetOption.loading = false;
                    targetOption.children = CATE.get_cate_list(res.data.data)
                    CATE.options.value = [...CATE.options.value]
                })
            },
            // 请求属性:加载到列表
            loadFormat:async()=>{

                // console.log(CATE.cate_name.value.at(-1)) // 数组最后一个值

                var cate_id = CATE.cate_name.value.at(-1)

                var res = await axios.post(API.AppSrtoreAPI.dou_product.format, {
                    "category_leaf_id":cate_id
                })

                var data_list = res.data.data.data;

                data_list.forEach((obj,index)=>{
                    var type = obj.type;
                    if(type == 'multi_value_measure'){console.log(obj)}
                    if(type == 'select' || type == 'multi_select'){
                        obj.result_value = ref() // 选中结果
                        obj.label = obj.name;
                    }
                })

                CATE.format.value = res.data.data.data;

            },
            // 多选-禁用超过限制选项
            dis_ops:(item)=>{

                var multi_select_max = item.multi_select_max;
                var result_value = item.result_value;
                var options = item.options;

                // console.log(multi_select_max)
                // console.log(result_value)
                // console.log(options)

                // 选中值是否超过限制
                if(result_value.length >= multi_select_max){
                    // 非选中值添加禁用属性
                    options.forEach((obj,index)=>{
                        var value = obj.value;
                        // 过滤选中值
                        if(!result_value.includes(value)){
                            obj.disabled = true
                        }
                    })
                }else{
                    // 非选中值添加禁用属性
                    options.forEach((obj,index)=>{
                        obj.disabled = false
                    })
                }
            }
            // 获取分类&属性值
            // 验证分类&属性值
        }

        // 描述详情
        const DES={

        }
        // 图片数据
        const valueHtml = ref('<p></p>')
        const mode = 'simple' // 或 'simple' 'default'

        // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef()

        const editorConfig = { placeholder: '请输入内容...' }

        // 编辑器工具栏配置
        const toolbarConfig = {
            excludeKeys: [
            'bold',
            "underline",
            "italic",
            "through",
            "color",
            "clearStyle",
            "bgColor",
            "codeBlock",
            "blockquote",
            "bulletedList",
            "numberedList",
            "insertTable",
            "header1",
            "header2",
            "header3",
            'headerSelect',
            'italic',
            'group-more-style', // 排除菜单组，写菜单组 key 的值即可
            //"fullScreen",
            "insertLink",
            "editLink",
            "insertVideo",
            "uploadVideo",
            "todo",
            "redo",
            "undo",
            "uploadImage"
            ]
        }

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            // if (editor == null) {
            //   return editor.destroy()
            // }
        })

        //  创建编辑器
        const handleCreated = (editor) => {
            
            editorRef.value = editor // 记录 editor 实例，重要！
            
            editor.clear() // 清空编辑器

            // var img_list = [] // 初始数据

            // for(let i of img_list){

            //     const node = { type: 'image', children: [{ text: '' }]}

            //         node.src = i.OriginUrl
            //         node.OriginUrl = i.OriginUrl  
            //         node.Name= i.Name
            //         node.MaterialId = i.MaterialId
            //         node.ByteUrl = i.ByteUrl
            //         node.AuditStatus = i.AuditStatus
            //         node.IsNew = i.IsNew
            //         node.FolderId = i.FolderId
            //         editor.insertNode(node)

            // }

        }



        const confirmLoading = ref(false);

        // 限购设置

        return{
            PAGEDATA,
            Pic_Fun,        // 主图
            whiteimg_Fun,   // 白底图
            Longimg_Fun,    // 长图
            video_Fun,
            props,
            activeKey,
            handleOk,
            formState,
            formRef,
            SPECS,
            CATE,
            sku_list,
            simpleImage,
            // 描述详情
            valueHtml,
            editorRef,
            editorConfig,
            toolbarConfig,
            handleCreated,
            mode,
            
        }
    }
})

</script>
<style scoped>
.content{padding: 0;margin: 0;background: '#fff';overflow-y: auto;overflow-x: hidden;height: 88vh;}
.img_pic{height: 100px;width: 100px;background-color: #f2f2f2;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;}
.img_3_4_pic{height: 132px;width: 99px;background-color: #f2f2f2;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;}
.Add_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.Add_3_4_img{height: 132px;width: 99px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_3_4_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.add_btn_class{width: 40px; margin:0 0 0 20px;}

</style>