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

                    <a-tab-pane key="3" tab="规格&库存">
                        
                        <a-divider orientation="left" orientation-margin="0px">
                            规格&库存
                        </a-divider>

                        <a-form ref="sku_formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm">

                            <a-form-item 
                                v-for="(item,index) in dynamicValidateForm" 
                                :name="[item.name]" 
                                :rules="{required: true,trigger: 'change', message:''}"
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
                    
                                <a-button type="dashed" size="small" class="add_btn_class" block @click="addspecvalue(index)">
                                <PlusOutlined />
                                </a-button>

                                <a-button type="dashed" size="small" class="add_btn_class" block @click="removeSpec(item,index)">
                                <MinusOutlined />
                                </a-button>
                            <!--规格名称 结束-->

                            <!--规格值 开始-->
                            <div style="width: 100%;clear: both; margin:4px 0 0 0;">

                            <a-space v-for="(v_item, spec_value_index) in item.value" style="margin:2px 4px 0 0;" align="baseline" >
                                    
                                <a-form-item v-if="index === 0" :name="[index, spec_value_index]" :rules="{required: true, trigger: 'change', message:''}">

                                    <div style="width: 200px;margin: 10px 0 4px 0;">
                                        <a-input v-model:value="v_item.v_name" 
                                        placeholder="输入值" 
                                        size="small" 
                                        style="font-size: 12px;margin:0 0 6px 0;" 
                                        autocomplete="off"
                                        allow-clear/>
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
                                    :auto-size="{ minRows: 2, maxRows: 2 }" 
                                    allow-clear
                                    style="font-size:12px;margin:4px 0 0 6px;width: 150px;"
                                    />
                                </a-form-item>
                                
                                </a-form-item>



                                <a-form-item v-if="index != 0" :name="['obj', index]" :rules="{required: true, trigger: 'change', message:''}">
                                    <a-input 
                                    v-model:value="v_name" 
                                    placeholder="输入值" 
                                    size="small"
                                    autocomplete="off"
                                    style="font-size: 12px;width: 200px;" 
                                    allow-clear/>
                                </a-form-item>

                                <MinusCircleOutlined @click="remove_spec_value(item, index)" style="margin: 0 5px 0 0;" />

                            </a-space>

                            </div>
                            <!--规格值 结束-->


                            </a-form-item>

                            <a-form-item>
                                <a-button type="dashed" @click="addspec" size="middle">添加规格</a-button>
                            </a-form-item>

                        </a-form>


                    </a-tab-pane>

                    <a-tab-pane key="4" tab="分类属性">
                        
                        <a-divider orientation="left" orientation-margin="0px">分类属性</a-divider>
                        <p>分类</p>
                        <p>属性</p>

                    </a-tab-pane>

                    <a-tab-pane key="5" tab="限购设置">
                        <a-divider orientation="left" orientation-margin="0px">限购设置</a-divider>
                        <p>限购设置</p>
                    </a-tab-pane>

                    <a-tab-pane key="6" tab="描述详情">
                        <a-divider orientation="left" orientation-margin="0px">描述详情</a-divider>
                        <p>富媒体编辑框</p>
                    </a-tab-pane>

                </a-tabs>

            </div> 
        </a-layout-content>

    </a-modal>
</template>
<script>
import { defineComponent,defineAsyncComponent,ref,reactive,onMounted,h } from 'vue';
import { useStore } from 'vuex'
import { PlusOutlined,DeleteOutlined,MinusOutlined,MinusCircleOutlined} from '@ant-design/icons-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import * as TABLE from '@/assets/JS_Model/TableOperate';

// 组件引用=====开始
export default defineComponent({
    name:'新建商品',
    components:{
        PlusOutlined,
        DeleteOutlined,
        MinusOutlined,
        MinusCircleOutlined,
        selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件
        // 运费模板组件
        // 尺码模板组件
    },
    props: {
        data:{typr:Object}
    },
    setup(props,ctx) {

        const tool = new TOOL.TOOL()            // 工具方法
        const TO = new TABLE.TableOperate()   // 表格操作方法

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
        const sku_formRef=ref()
        const sku_listRef=ref()
        const sku_columns = ref([
            {
            title: 'Name',
            dataIndex: 'name',
            },
            {
            title: 'Cash Assets',
            className: 'column-money',
            dataIndex: 'money',
            },
            {
            title: 'Address',
            dataIndex: 'address',
            },
        ])
        const sku_spece_data=ref(
            [
                {
                key: '1',
                name: 'John Brown',
                money: '￥300,000.00',
                address: 'New York No. 1 Lake Park',
                },
                {
                key: '2',
                name: 'Jim Green',
                money: '￥1,256,000.00',
                address: 'London No. 1 Lake Park',
                },
                {
                key: '3',
                name: 'Joe Black',
                money: '￥120,000.00',
                address: 'Sidney No. 1 Lake Park',
            }
        ])
        // 规格值-->构造表
        const dynamicValidateForm =  ref([
            {
            name:'',
            value:[{
                v_name:'',// 值名称
                url:''//
            }],
            }
        ]);
      // 删除【规格】
      const removeSpec = (item, data)=>{

        let index = dynamicValidateForm.value.obj.indexOf(item);

        if (index !== -1) {
          dynamicValidateForm.value.obj.splice(index, 1);
        }

      }


      // 删除【规格值】
      const remove_spec_value = (item, data) => {

        let index = dynamicValidateForm.value.obj[data].value.indexOf(item);

        if (index !== -1) {
          dynamicValidateForm.value.obj[data].value.splice(index, 1);
        }

      };


      // 添加规格
      const addspec = () =>{

        console.log(dynamicValidateForm.value)

        var obj_number = dynamicValidateForm.value.obj.length;

        if(obj_number>=3){
          
          message.info('规格最多不能超过三组！');
          
          return false

        }else{

          dynamicValidateForm.value.obj.push({
            
            name:"规格名称",

            value:[{value:undefined}],
          
          })

        }

      }


      // 添加规格值
      const addspecvalue = (data) => {


        var value_number = dynamicValidateForm.value[data].value.length;
        console.log(dynamicValidateForm.value[data])


        if(value_number >= 20){
          
          message.info('规格值最多不能超过20组！');

          return false

        }else{
        
          dynamicValidateForm.value[data].value.push({
                v_name:'',// 值名称
                url:''//
            });

        }
      };


        // 分类属性

        // 描述详情


        return{
            PAGEDATA,
            Pic_Fun,// 主图
            whiteimg_Fun,// 白底图
            Longimg_Fun,// 长图
            video_Fun,
            props,
            activeKey,
            handleOk,
            formState,
            formRef,
            sku_formRef, // sku
            dynamicValidateForm,
            removeSpec,
            addspecvalue,
            remove_spec_value,
            addspec,
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