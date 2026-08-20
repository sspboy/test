<!-- 抖店铺==新建商品组件 -->
<template>

    <!-- 动态渲染异步组件--选择素材 -->
    <selectimg 
        v-if="PAGEDATA.selectimg_open" 
        v-on:add_img_callback="PAGEDATA.Add_Callback" 
        :data="PAGEDATA"
    />



    <a-modal
      v-model:open="props.data.AddDate"
      width="100%"
      wrap-class-name="full-modal"
      :destroyOnClose="true"
      cancelText="关闭"
      okText="发布到线上"
    >
        <a-layout-content class="content">

            <div style="width: 950px;margin: 0 auto;height: 100%;">

                <!--类目预测 类目id 为空显示-->
                <product_cate_component v-if="CATE.cate_status.value === true"/>

                <!--新建商品 类目id不为空显示-->
                <a-tabs v-if="CATE.cate_status.value === false" v-model:activeKey="activeKey">

                    <template #leftExtra >
                        <div style="margin: 0 40px 0 10px;font-size:18px;font-weight:bold;">新建商品</div>
                    </template>


                    <a-tab-pane key="0" tab="基础信息">

                        <!--基础信息 组件-->
                        <pic_title_cate_component />
                    
                    </a-tab-pane>

                    <a-tab-pane key="1" tab="商品属性">
                        
                        <!--商品属性 组件-->
                        <product_format_component />

                    </a-tab-pane>

                    <a-tab-pane key="2" tab="商品规格">
                        <!--规格 组件-->
                        <spec_component />

                    </a-tab-pane>

                    <a-tab-pane key="3" tab="库存发货" >
                        
                        <!--发货模式 组件-->
                        <Preselltype_component />

                    </a-tab-pane>

                    <a-tab-pane key="4" tab="描述详情" >
                                                


                        <div style="margin: 0 0 10px 0;">

                            <a-space>

                                <a-button 
                                    type="dashed" 
                                    @click="PAGEDATA.change_material_type('des')"
                                    size="small"
                                    block
                                >插入素材</a-button>

                                <a-button type="dashed"
                                    size="small"
                                 @click="DES.clear_img" block>清空</a-button>
                            </a-space>
                        </div>

                        <div style="border: 1px solid #ccc;height: 100%;">
          
                            <Toolbar
                                style="border-bottom: 1px solid #ccc"
                                :editor="editorRef"
                                :defaultConfig="DES.toolbarConfig"
                                :mode="DES.mode.value"
                            />

                            <Editor
                                style="height: 600px; overflow-y: hidden;"
                                v-model="DES.valueHtml.value"
                                :defaultConfig="DES.editorConfig"
                                :mode="DES.mode.value"
                                @onCreated="DES.handleCreated"
                            />

                        </div>

                    </a-tab-pane>

                    <a-tab-pane key="5" tab="资质规则" >

                        <!--资质 组件-->
                        <quality_component />

                    </a-tab-pane>

                </a-tabs>

            </div>

        </a-layout-content>

        <!--悬浮按钮-->
        <a-float-button-group 
            v-if="CATE.cate_value.value != undefined"
            shape="square" :style="{ right: '100px' }">
            <a-float-button
                tooltip="商品发布规则"
                v-if="PageproductRuleOcject !== undefined"
                @click="console.log(PageproductRuleOcject)" />

            <a-float-button
                tooltip="商品发布记录" 
            >
                <template #icon>
                    <ReadOutlined />
                </template>
            </a-float-button>
        </a-float-button-group>

        <!--底部按钮-->
        <template #footer>
            <div 
                v-if="CATE.cate_status.value === false" 
                style="display: flex; justify-content: center; gap: 18px;border-top: 1px #f2f2f2 dotted;height: 50px;padding: 20px 0 0 0;">
                <a-button type="primary" @click="uploadproduct.get()" :loading="PAGEDATA.upload_product_loading">发布到线上</a-button>
                <a-button @click="console.log('放入草稿')">放入草稿箱</a-button>
                <a-button>取消</a-button>

            </div>
        </template>
    </a-modal>
</template>
<script>
import { defineComponent,defineAsyncComponent,ref,reactive,onMounted,computed,shallowRef,onBeforeUnmount,toRaw, watch } from 'vue';
import { PlusOutlined,DeleteOutlined,MinusOutlined,MinusCircleOutlined,ReadOutlined} from '@ant-design/icons-vue';
import axios from 'axios';
import { Empty } from 'ant-design-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import * as TABLE from '@/assets/JS_Model/TableOperate';
import * as utils from '@/assets/JS_Model/public_model';
import { Fulfillment,Spec,CATE,UploadProduct, PageproductRuleOcject } from '@/assets/douyinshop/productmanagement/Add';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue' // 描述详情富媒体
import '@wangeditor/editor/dist/css/style.css' // 引入富媒体编辑器样式 css
import Product_format_component from './Add_component/product_format_component.vue';

// 商品管理->编辑操作方法
// import {
//     PicFun,
//     Longimg_Fun
// } from '@/assets/douyinshop/productmanagement/Add';

// 组件引用=====开始
export default defineComponent({
    name:'新建商品',
    components:{
        PlusOutlined,
        ReadOutlined,
        DeleteOutlined,
        MinusOutlined,
        MinusCircleOutlined,
        Editor, // 详情编辑
        Toolbar, // 编辑工具栏
        des_component:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add_component/des.vue')),// 描述详情
        product_cate_component:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add_component/product_cate.vue')),// 类目预测
        pic_title_cate_component:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add_component/pic_title_cate.vue')),// 基础信息
        selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件
        format_cp:defineAsyncComponent(()=>import('@/components/AppMarket/Douyinshop/ProductList/edit_component/format_cp.vue')),// 商品属性组件
        Preselltype_component:defineAsyncComponent(()=>import('@/components/AppMarket/Douyinshop/ProductList/Add_component/preselltype_component.vue')),// 发货模式组件
        Product_format_component:defineAsyncComponent(()=>import('@/components/AppMarket/Douyinshop/ProductList/Add_component/product_format_component.vue')),// 商品属性
        quality_component:defineAsyncComponent(()=>import('@/components/AppMarket/Douyinshop/ProductList/Add_component/quality_list_component.vue')),// 资质组件
        spec_component:defineAsyncComponent(()=>import('@/components/AppMarket/Douyinshop/ProductList/Add_component/spec_component.vue')),// 规格组件
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
        data:{type:Object}
    },
    // ✅ 必须添加 emits 声明:指定该组件可能会触发的事件
    emits: ['add_call_back'],
    setup(props,ctx) {
        
        const tool = new TOOL.TOOL()            // 工具方法
        const TO = new TABLE.TableOperate()     // 表格操作方法
        const API = new utils.A_Patch()         // 请求接口地址合集
        const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;// 默认为空图标
        const buttonload = ref(true)            // 新建按钮loading状态；
        const activeKey = ref('0');             // 默认选项卡

        
        CATE.cate_status.value = true;          // 类目预测初始化 

        const Fulfill = new Fulfillment()       // 履约初始化
        const uploadproduct = new UploadProduct()  // 上传商品

        
        // 添加商品配置
        const PAGEDATA=reactive({

            selectimg_open:false,           // 添加主图-图片显示状态配置
            freighttemplate_open:false,     // 运费模板-图片显示状态配置
            sizetemplate_open:false,        // 尺码模板-图片显示状态配置
            brand_list_open:false,          // 品牌列表-组件显示状态配置
            setimg_name:'',                 // 添加图片的对象['PicList','long_img_List','white_img','video','des']
            sku_img_obj:'',                 // 规格图片对象

            // 图片组件获取地址后添加到页面容器：：：回调方法
            Add_Callback:(data)=>{
                var type = PAGEDATA.setimg_name;        // 添加类型
                if(type == 'long_img_List'){      // 判断回调type：：：3:4长图添加
                    Longimg_Fun.add(data)               // 添加长图方法
                }else if(type == 'white_img'){          // 判断回调type：：：白底图添加
                    whiteimg_Fun.add(data)              // 添加白底图方法
                }else if(type == 'video_info'){
                    video_Fun.add(data)                 // 添加视频方法
                }else if(type == 'des'){                // 添加描述详情
                    DES.add_img(data)
                }else if(type == 'spec_img'){           // 添加规格图片
                    SPECS.add_img(data)
                }else if(type == 'tag_img'){            // 添加吊牌水洗标
                    CATE.add_img(data)
                }
            },


            // 上传按钮状态
            upload_product_loading:ref(false)
        })



        // 获取商品基础信息
        const GetInfo = async()=>{

           var res = await formRef.value.validate().then(() => {

                var res = toRaw(formState)// 标题
                // Object.keys(res).forEach(key=>{
                //     if(res.key === undefined){delete res.key} // 清除值为undefind的键值
                // })

                return res
                
            }).catch(error => {

                tool.Fun_.message('error',error.errorFields[0].errors[0]);
                activeKey.value = '1';
                return false

            })

            return res
        }




        // 转移售后服务0-8
        const after_sale_list = {

            get:(data)=>{
                var value = "7-"+ data
                return {"supply_day_return_selector":value}
            },
            // {value:0,name:'不支持退换'},
            // {value:1,name:'支持7天无理由退换'},
            // {value:2,name:'支持15天无理由退换'},
            // {value:3,name:'支持30天无理由退换'},
            // {value:4,name:'支持60天无理由退换'},
            // {value:5,name:'支持90天无理由退换'},
            // {value:6,name:'支持180天无理由退换'},
            // {value:7,name:'支持365天无理由退换'},
            // {value:8,name:'其他售后服务'}
        }

        // 选择运费模板==回调方法
        const selectfreight_callback= (data)=>{
            // 填充id
            var f_id = data.id
            var f_name = data.name
            // 填充名称
            formState.freight_id.value = f_id
            formState.freight_id.name = f_name
            // console.log(formState.freight_id)
        }

        // 选择尺码模板==回调方法
        const selectsizetemplate_callback= (data)=>{
            // 填充id
            var s_id = data.id;
            var s_name = data.name;
            // 填充名称
            formState.size_info_template_id.value = s_id
            formState.size_info_template_id.name = s_name
            // console.log(formState.size_info_template_id)
        }

        // 选择品牌回调方法
        const selectbrand_callback = (data) => {
             // 填充id
            formState.standard_brand_id.brand_id = data.brand_id;
            formState.standard_brand_id.brand_name = data.name_cn;
            console.log(data)
        }


        // 关闭新建商品按钮
        const closed = () =>{

            props.data.AddDate = !props.data.AddDate;

        }


        // 表单选择框---》搜索方法；
        const filterOption = (input, option) => {
            return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };




        return{
            PAGEDATA,
            props,
            activeKey,

            // -------------分类属性
            CATE,
            simpleImage,
            // -------------描述详情
            uploadproduct,
            // 提交，关闭
            closed,
            selectfreight_callback,
            selectsizetemplate_callback,
            selectbrand_callback,
            filterOption,
            Fulfill,
            PageproductRuleOcject,// 发布规则
        }
    }
})

</script>
<style scoped>
.content{padding: 0;margin: 20px 0 0 0;background: '#fff';overflow-y: auto;overflow-x: hidden;height: calc(90vh - 40px);}
.img_pic{height: 100px;width: 100px;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;}
.img_3_4_pic{height: 100px;width: 100px;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;text-align: center;}
.Add_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.Add_3_4_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_3_4_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.add_btn_class{width: 40px; margin:0 0 0 20px;}
/* .ant-form-item{margin-bottom: 0px ! important} */
.Add_shui_img{height: 90px;width: 100%;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_shui_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.call_shui_img{height: 90px;width: 100%;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;padding: 4px 0 0 0;}
.clear_shui_img{margin: 0 0 0 6px;}
/*履约模式选项卡字体大小设置*/
:deep(.ant-radio-button-wrapper) {font-size: 12px;}
.custom-radio :deep(.ant-radio + span) {font-size: 12px;}
</style>