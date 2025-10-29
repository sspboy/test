<!-- 抖店铺==新建商品组件 -->
<template>

    <!-- 动态渲染异步组件--添加主图 -->
    <selectimg v-if="PAGEDATA.selectimg_open" v-on:add_img_callback="Pic_Fun.add_pic" :data="PAGEDATA"/>

    <!-- 动态渲染异步组件--添加白底图 -->

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
                                        <a-image :src="item.url" />
                                        <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                                            <a-button type="text" size="small" @click="Pic_Fun.del_pic(item.uid)"> 
                                                <DeleteOutlined />
                                            </a-button>
                                        </span>
                                    </p>

                                    <!--添加按钮-->
                                    <p 
                                        @click="Add_img('PicList')" 
                                        class="cursor Add_img"
                                        v-if="Pic_Fun.PicList.value.length < 6"
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

                                    <p class="img_pic" v-for="item in white_img">
                                        <a-image :src="item.url" />
                                        <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                                            <a-button type="text" size="small" @click="console.log('删除图片')"> 
                                                <DeleteOutlined />
                                            </a-button>
                                        </span>
                                    </p>

                                    <!--添加按钮-->
                                    <p 
                                        @click="Add_img('white_img')" 
                                        class="cursor Add_img"
                                        v-if="white_img.length < 1"
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

                                <div style="width: 100%;height: 140px;">

                                    <p class="img_3_4_pic" v-for="item in long_img_List">
                                        
                                        <a-image :src="item.url" />

                                        <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                                            <a-button type="text" size="small" @click="console.log('删除图片')"> 
                                                <DeleteOutlined />
                                            </a-button>
                                        </span>
                                    </p>


                                    <!--添加按钮-->
                                    <!-- <p 
                                        @click="Add_img('long_img_List')" 
                                        class="cursor Add_3_4_img"
                                        v-if="PicList.length < 6"
                                    >
                                        <a-flex justify="center" align="center" style="height: 100%;">
                                            <PlusOutlined /> 添加 
                                        </a-flex>
                                    </p> -->

                                </div>

                            </a-col>

                            <!--视频 -- material_video_id -->
                            <a-col :span="8">
                                <a-divider orientation="left" orientation-margin="0px">视频</a-divider>

                                <div style="width: 100%;height:120px;">

                                    <p class="img_3_4_pic" v-for="item in video_info">
                                        <a-image :src="item.url" />
                                        <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                                            <a-button type="text" size="small" @click="del_video"> 
                                                <DeleteOutlined />
                                            </a-button>
                                        </span>
                                    </p>

                                    <!--添加按钮-->
                                    <p 
                                        @click="Add_img('video_info')" 
                                        class="cursor Add_3_4_img"
                                        v-if="video_info.length < 1"
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

                                    <a-col :span="18">
                                        <a-form-item
                                            label="商品标题"
                                            name="name"
                                            placeholder="输入商品标题"
                                            :rules="[{ required: true, message: '请输入商品标题' }]"
                                        >
                                            <a-input v-model:value="formState.name" show-count :maxlength="30" />
                                        </a-form-item>
                                    </a-col>

                                    <a-col :span="6">
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



                                    <a-col :span="12">
                                        <a-form-item
                                            label="推荐语"
                                            name="recommend_remark"
                                            :rules="[{ required: false, message: '请输入商家推荐语'}]"
                                        >
                                            <a-input v-model:value="formState.recommend_remark" show-count :maxlength="30" placeholder="输入商品推荐语"/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="12">
                                        <a-form-item
                                            label="商家备注"
                                            name="remark"
                                            :rules="[{ required: false, message: '' }]"
                                        >
                                            <a-input v-model:value="formState.remark" placeholder="商家可见备注" show-count :maxlength="30" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="6">
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
                                    
                                    <a-col :span="6">
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

                                    <a-col :span="6">
                                        <a-form-item
                                            label="客服电话"
                                            name="mobile"
                                            placeholder="输入客服电话"
                                            :rules="[{ required: true, message: '请输入客服电话'}]"
                                        >
                                            <a-input v-model:value="formState.mobile" />
                                        </a-form-item>
                                    </a-col>

                                    <a-col :span="6">
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

                                    <a-col :span="6">
                                        <a-form-item
                                            label="运费模板"
                                            name="freight_id"
                                            :rules="[{ required: true, message: '请选择运费模板'}]"
                                        >
                                            <a-input-group compact>
                                                <a-input v-model:value="formState.freight_id" placeholder="选择运费模板" disabled style="width: calc(60%)" />
                                                <a-button >选择</a-button>
                                            </a-input-group>
                                        </a-form-item>                                    
                                    </a-col>

                                    <a-col :span="6">
                                        <a-form-item
                                            label="尺码模板"
                                            name="size_info_template_id"
                                            :rules="[{ required: true, message: '请选择尺码模板'}]"
                                        >
                                            <a-input-group compact>
                                                <a-input v-model:value="formState.size_info_template_id" placeholder="请选择尺码模板" disabled style="width: calc(60%)" />
                                                <a-button>选择</a-button>
                                            </a-input-group>
                                        </a-form-item>                                    
                                    </a-col>

                                </a-row>
                            </a-form>
                        </div>
                    </a-tab-pane>

                    <a-tab-pane key="3" tab="规格&库存">
                        
                    <a-divider orientation="left" orientation-margin="0px">规格&库存</a-divider>
                    <p>规格</p>
                    <p>库存列表</p>
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
import { PlusOutlined,DeleteOutlined} from '@ant-design/icons-vue';

// 组件引用=====开始
export default defineComponent({
    name:'新建商品',
    components:{
        PlusOutlined,
        DeleteOutlined,
        selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件
        // 运费模板组件
        // 尺码模板组件
    },
    props: {
        data:{typr:Object}
    },
    setup(props,ctx) {

        // 添加商品配置
        const PAGEDATA=reactive({
            selectimg_open:false,       // 添加主图-图片显示状态配置
            setimg_name:'',             // 添加图片的对象['PicList','long_img_List','white_img','video']
        })

        // 调用素材组件,添加图片到页面方法
        const Add_img = (typeName) => {

            PAGEDATA.selectimg_open = true;
            PAGEDATA.setimg_name = typeName; // 指定添加图片的对象

        }

        // 图片组件获取地址后添加到页面容器：：：回调方法
        const Add_Callback = (typeNameObject) =>{

            if(type == 'PicList'){// 判断回调type：：：主图添加
                // 添加主图方法
            }else if(type == 'long_img_List'){// 判断回调type：：：3:4长图添加
                // 添加长图方法
            }else if(type == 'white_img'){// 判断回调type：：：白底图添加
                // 添加白底图方法
            }else if(type == 'white_img'){
                // 添加视频方法
            }

        }
        
        // 主图对象
        const Pic_Fun = {

            PicList:ref([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                // {
                //     uid: '-2',
                //     name: 'image.png',
                //     status: 'done',
                //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                // },
                // {
                //     uid: '-3',
                //     name: 'image.png',
                //     status: 'done',
                //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                // },
                // {
                //     uid: '-4',
                //     name: 'image.png',
                //     status: 'done',
                //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                // },
                // {
                //     uid: '-xxx',
                //     percent: 50,
                //     name: 'image.png',
                //     status: 'uploading',
                //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                // },
                // {
                //     uid: '-5',
                //     name: 'image.png',
                //     status: 'error',
                // },
            ]),
            // 删除图片
            del_pic:(d_id)=>{
                // console.log(d_id)
                Pic_Fun.PicList.value.forEach((val, idx) => {
                    // console.log(val,idx);
                    if(d_id == val.uid){Pic_Fun.PicList.value.splice(idx, 1)}
                })
            },
            // 添加图片
            add_pic:(list)=>{
                console.log(list)
            }
        
        }


        // 3:4长图
        const long_img_List = ref([
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-2',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-3',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-4',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            // {
            //     uid: '-xxx',
            //     percent: 50,
            //     name: 'image.png',
            //     status: 'uploading',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // },
            // {
            //     uid: '-5',
            //     name: 'image.png',
            //     status: 'error',
            // },
        ]);

        // 长图删除
        const del_long_img = (data_name,d_id)=>{
            
        }
        // 白底图
        const white_img = ref([
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ])
        // 白底图删除
        const del_white_img = ()=>{
            
        }
        // 视频
        const video_info = ref([
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',  
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ])
        // 视频删除
        const del_video = ()=>{
            video_info.value = []
        }

        // 基础信息
        const formRef = ref();
        const formState = reactive({
            product_type:'0',
            mobile:'13888888888',
            name:undefined,
            recommend_remark:undefined,
            pay_type:'1',
            reduce_type:'1',        // 减库存类型
            freight_id:undefined,   // 运费模板
            size_info_template_id:undefined,    // 尺码模板
            commit:'false',         // 提交
            remark:undefined        // 商家备注
        })


        // 确认按钮
        const handleOk = e => {
            console.log(e);
        };

        // 默认选项卡
        const activeKey = ref('1');

        return{
            PAGEDATA,
            Pic_Fun,// 主图
            props,
            long_img_List,
            white_img,
            video_info,
            activeKey,
            handleOk,
            formState,
            formRef,
            del_video,
            Add_img,
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

</style>