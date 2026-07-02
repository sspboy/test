<!--  

 发品第一步 --- 基础信息 

-->
 <template>

    <!-- 动态渲染异步组件--选择素材 -->
    <selectimg 
        v-if="Basedata.selectimg_open" 
        v-on:add_img_callback="Basedata.Add_Callback" 
        :data="Basedata"
    />

   <a-button
    @click="Basedata.get_basedata"
   >获取基础信息</a-button>

    <a-row>
        <!--白底图 -- white_back_ground_pic_url -->
        <a-col :span="4">
            
            <div style="width: 100%;height:120px;margin: 20px 0 0 0;">

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
                    @click="Basedata.change_material_type('white_img')" 
                    class="cursor Add_img"
                    v-if="whiteimg_Fun.PicList.value < 1"
                >
                    <a-flex justify="center" align="center" style="height: 100%;" class="font_size_12">
                        + 白底图
                    </a-flex>
                </p>

            </div>

        </a-col>

        <!--视频 -- material_video_id -->
        <a-col :span="4">

            <div style="width: 100%;height:120px;margin: 20px 0 0 0;">

                <p class="img_3_4_pic" v-for="item in video_Fun.PicList.value">
                    <a-image :height="80" :src="item.video_info.video_cover_url" />
                    <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                        <a-button type="text" size="small" @click="video_Fun.del"> 
                            <DeleteOutlined />
                        </a-button>
                    </span>
                </p>

                <!--添加按钮-->
                <p 
                    @click="Basedata.change_material_type('video_info')" 
                    class="cursor Add_3_4_img font_size_12"
                    v-if="video_Fun.PicList.value.length < 1"
                >
                    <a-flex justify="center" align="center" style="height: 100%;" class="font_size_12">
                        + 视频
                    </a-flex>
                </p>
            </div>
        </a-col>

        <!--3比4长图 -- long_pic_url -->
        <a-col :span="16">
            
            <div style="width: 100%;height: 160px;margin: 20px 0 0 0;">

                <p class="img_3_4_pic" v-for="(item,index) in Longimg_Fun.PicList.value">
                    
                    <a-image :height="80" :src="item.byte_url" />

                    <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                        <a-button type="text" size="small" @click="Longimg_Fun.del(index)"> 
                            <DeleteOutlined />
                        </a-button>
                    </span>
                </p>


                <!--添加按钮-->
                <p 
                    @click="Basedata.change_material_type('long_img_List')" 
                    class="cursor Add_3_4_img font_size_12"
                    v-if="Longimg_Fun.PicList.value.length < 5"
                >
                    <a-flex justify="center" align="center" style="height: 100%;" class="font_size_12">
                        + 3:4长图
                    </a-flex>
                </p>

            </div>

        </a-col>

        

    </a-row>

    <!-- 基础信息 -->
    <a-form
        ref="formRef"
        name="ProductInfo"
        :model="formState"
        :rules="rules"
    >
        <a-row :gutter="[16,0]">

            <a-col :span="8">
                <a-form-item 
                    label="商品类型" 
                    name="product_type"
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
                    label="支付方式" 
                    name="pay_type"
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
                    label="客服电话"
                    name="mobile"
                >
                    <a-input v-model:value="formState.mobile" placeholder="输入客服电话"/>
                </a-form-item>
            </a-col>

            <a-col :span="8">
                <a-form-item
                    label="运费模板"
                    name="freight_id"
                >
                    <a-input-group compact>
                        <a-input v-model:value="formState.freight_id.name" placeholder="选择运费模板" disabled style="width: calc(74%);padding: 5.5px;" />
                        <a-button class="font_size_12" @click="Basedata.chang_freighttemplate">选择</a-button>
                    </a-input-group>
                </a-form-item>                                    
            </a-col>

            <a-col :span="8">
                <a-form-item
                    label="选择品牌"
                    name="standard_brand_id"
                >
                    <a-input-group compact>
                    <a-input v-model:value="formState.standard_brand_id.brand_name" placeholder="选择品牌" disabled style="width: calc(74%);padding: 5.5px;" />
                    <a-button class="font_size_12" @click="Basedata.change_brand_list">选择</a-button>
                    </a-input-group>
                </a-form-item>
            </a-col>

            <a-col :span="8">
                <a-form-item
                    label="尺码模板"
                    name="size_info_template_id"
                >
                    <a-input-group compact>
                        <a-input v-model:value="formState.size_info_template_id.name" placeholder="请选择尺码模板" disabled style="width: calc(74%);padding: 5.5px;" />
                        <a-button @click="Basedata.chang_sizetemplate">选择</a-button>
                    </a-input-group>
                </a-form-item>                                    
            </a-col>

            <a-col :span="8">
                <a-form-item
                    label="推荐语"
                    name="recommend_remark"
                >
                    <a-input v-model:value="formState.recommend_remark" 
                    autoComplete="off" 
                    show-count :maxlength="30" 
                    placeholder="输入商品推荐语"
                    />
                </a-form-item>
            </a-col>

            <a-col :span="8">
                <a-form-item
                    label="商家备注"
                    name="remark"
                >
                    <a-input v-model:value="formState.remark" autoComplete="off" placeholder="商家可见备注"  show-count :maxlength="30" />
                </a-form-item>
            </a-col>

            <a-col :span="8" >
                <a-form-item 
                    label="售后服务" 
                    name="after_sale_service"
                >
                    <a-select v-model:value="formState.after_sale_service" placeholder="选择方式">
                        <a-select-option value="1">支持7天无理由</a-select-option>
                        <a-select-option value="0">不支持7天无理由</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>

            

            <a-col :span="8">
                <a-form-item
                    label="最少购买"
                    name="minimum_per_order"
                >
                    <a-input-number placeholder="用户每次下单最少限购件数"
                    style="width: calc(100%);"
                        v-model:value="formState.minimum_per_order"
                    :min="1" :max="1000000" />

                </a-form-item>
            </a-col>

            <a-col :span="8">
                <a-form-item
                    label="最多购买"
                    name="maximum_per_order"
                >
                    <a-input-number 
                        placeholder="用户每次下单最多限购件数" 
                        style="width: calc(100%);" 
                        v-model:value="formState.maximum_per_order" 
                        :min="1" :max="1000000" 
                        />

                </a-form-item>
            </a-col>

            <a-col :span="8">
                <a-form-item
                    label="累计限购"
                    name="limit_per_buyer"
                >
                    <a-input-number 
                        placeholder="每个用户累计限购件数" 
                        style="width: calc(100%);"
                        v-model:value="formState.limit_per_buyer" 
                        :min="1" :max="1000000" />

                </a-form-item>
            </a-col>

        </a-row>
    </a-form>
     
 </template>
 
 <script>
 import { defineAsyncComponent,defineComponent, ref, computed, watch, onMounted } from 'vue'
 import { 
  formRef,formState,rules,Longimg_Fun,whiteimg_Fun,video_Fun,Basedata
} from '@/assets/douyinshop/productmanagement/Add';
import { PlusOutlined,DeleteOutlined,MinusOutlined,MinusCircleOutlined,ReadOutlined} from '@ant-design/icons-vue';

 export default defineComponent({
   name: '基础信息',
   
   components: {
     DeleteOutlined,
    selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件

   },
   
   props: {

   },
   
   emits: ['update', 'change'],
   
   setup(props, { emit, attrs, slots, expose }) {
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
     onMounted(() => {
       console.log('模板名称 组件已挂载')
     })
     
     // 暴露给父组件的方法
     expose({
       reset: () => { count.value = 0 }
     })
     
     return {
        formRef,
       count,
       title,
       displayTitle,
       handleClick,
       whiteimg_Fun,
       Longimg_Fun,
       video_Fun,
       formState,Basedata,rules
     }
   }
 })
 </script>
 
 <style scoped>

 .content{padding: 0;margin: 20px 0 0 0;background: '#fff';overflow-y: auto;overflow-x: hidden;height: 90vh;}
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