<!--  

 发品第一步 --- 基础信息 

-->
 <template>
    <a-affix :style="{ position: 'absolute', top: '0px', right: '-220px'}">
        <div style="width: 200px;height:500px;">

            <a-card style="width: 100%">
                <h4>信息完善度提示</h4>
                <p>白底图</p>
                <p>主图视频</p>
                <p>3:4长图</p>
            </a-card>

        </div>
    </a-affix>
    <!-- 动态渲染异步组件--选择素材 -->
    <selectimg 
        v-if="Basedata.selectimg_open" 
        v-on:add_img_callback="Basedata.Add_Callback" 
        :data="Basedata"
    />

    <!-- 动态渲染异步组件--选择运费模板 -->
    <selectFreightid 
        v-if="Basedata.freighttemplate_open" 
        v-on:freight_callback="Basedata.selectfreight_callback" 
        :data="Basedata"
    />

    <!-- 动态渲染异步组件--选择尺码模板 -->
    <selectsizetemplateid 
        v-if="Basedata.sizetemplate_open" 
        v-on:sizetemplate_callback="Basedata.selectsizetemplate_callback" 
        :data="Basedata"
    />

    <!--动态渲染异步组件--选择品牌模板 -->
    <selectbrandid 
        v-if="Basedata.brand_list_open" 
        v-on:selectbrand_callback="Basedata.selectbrand_callback" 
        :data="Basedata" 
        :FormData="CATE"
    />

    <a-row :gutter="[16,0]">

        <!--白底图 -- white_back_ground_pic_url -->
        <a-col :span="3">
            
            <div style="width: 100%;height:130px;margin: 20px 0 0 0;">
                <!--白底图列表 不未为空显示 图片 -->
                <p class="img_pic" v-for="item in whiteimg_Fun.PicList.value">

                    <a-image :src="item.byte_url" />

                    <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                        <a-button type="text" size="small" @click="whiteimg_Fun.del"> 
                            <DeleteOutlined />
                        </a-button>
                    </span>
                </p>

                <!--白底图列表 未空 显示添加按钮 添加按钮-->
                <p 
                    class="cursor Add_img"
                    v-if="whiteimg_Fun.PicList.value < 1 && whiteimg_Fun.check_load.value === false"
                >
                    <a-flex justify="center" align="center" style="height: 60%;" class="font_size_12">
                        <a @click="Basedata.change_material_type('white_img')" >+ 选择白底图</a>
                    </a-flex>
                    <a-flex justify="center" align="center" style="height: 10%;" class="font_size_12">
                        <a @click="PAGEDATA.on_pic_creat_whiteimage">+ 创建白底图</a>
                    </a-flex>

                </p>

                <!--白底图列表 为空 且为检测状态true 显示load-->
                <p
                    class="cursor Add_img" 
                    v-if="whiteimg_Fun.PicList.value < 1 && whiteimg_Fun.check_load.value === true">
                    <a-flex vertical justify="center" align="center" style="height: 100%;gap: 2px;" class="font_size_12">
                        <a-spin size="small" />
                        <span style="color: #999;">...检测ing...</span>
                    </a-flex>
                </p>

            </div>

        </a-col>

        <!--视频 -- material_video_id -->
        <a-col :span="3">

            <div style="width: 100%;height:130px;margin: 20px 0 0 0;">

                <p class="img_3_4_pic" v-for="item in video_Fun.PicList.value">
                    
                    <a>
                        <img :height="80" :src="item.video_info.video_cover_url" />
                    </a>
                    
                    <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                        <a-button type="text" size="small" @click="video_Fun.del"> 
                            <DeleteOutlined />
                        </a-button>
                    </span>
                </p>

                <!--添加按钮-->
                <p 
                    class="cursor Add_3_4_img font_size_12"
                    v-if="video_Fun.PicList.value.length < 1"
                >
                    <a-flex justify="center" align="center" style="height: 60%;" class="font_size_12">
                        <a @click="Basedata.change_material_type('video_info')" >+ 选择视频</a>
                    </a-flex>

                    <a-flex justify="center" align="center" style="height: 10%;" class="font_size_12">
                        <a @click="PAGEDATA.on_creat_pic_video">+ 创建视频</a>
                    </a-flex>
                    
                </p>
            </div>
        </a-col>

        <!--3比4长图 -- long_pic_url -->
        <a-col :span="13">
            
            <div style="width: 100%;height: 130px;margin: 20px 0 0 20px;">

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
                        <a>+ 3:4长图</a>
                    </a-flex>
                </p>

            </div>

        </a-col>

    </a-row>

    <!--白底图验证 提示 === 开始-->
    <!-- message="白底图检测未通过" :description="whiteimg_Fun.alert_text.value"-->
    <a-alert
        v-if="whiteimg_Fun.alert_state.value"
      type="warning"
      closable
      class="font_size_12"
      style="margin: 10px 0 40px 0;"
    >
        <template #message>
            <div style="float: left;">
                <a-image :src="whiteimg_Fun.alert_text_image.value.image_url" style="width: 50px; height: 50px;border-radius: 6px;" />
            </div>
            <div style="float: left;margin: 4px 0 0 20px;">
                <p style="margin-bottom: 4px;font-size: 14px;">白底图检测未通过</p>
                <span style="color:red;">{{ whiteimg_Fun.alert_text_image.value.text }}</span>
            </div>
        </template>
        <!-- <template #action>
            <a-button size="small" type="text">去优化当前图片</a-button>
        </template> -->
    </a-alert>

    <!--白底图验证 提示 === 结束-->


    <!-- 基础信息 -->
    <a-form
        ref="Base_formRef"
        name="ProductInfo"
        :model="formState"
        :rules="rules"
        style="margin-top: 20px;"
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
                    :name="['size_info_template_id','name']"
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

            <a-col :span="8" v-if="ShopAddress.stats">

                <a-form-item
                    label="发货地址："
                    :name="['shipping_origin_info','address']"
                >
                    <a-input-group compact>
                        <a-input v-model:value="formState.shipping_origin_info.address" placeholder="请选择发货地址" disabled style="width: calc(74%);padding: 5.5px;" />
                        <a-button @click="ShopAddress.selectFunction">选择</a-button>
                    </a-input-group>
                </a-form-item>
            </a-col>

        </a-row>
    </a-form>

    <!--发货地址选择 抽屉-->
    <template>
        <a-drawer
            v-model:open="ShopAddress.open"
            class="custom-class"
            root-class-name="root-class-name"
            :root-style="{ color: 'blue' }"
            title="选择发货地址"
            placement="right"
        >

        <a-radio-group v-model:value="ShopAddress.address_type" name="radioGroup" button-style="solid">
            <template v-for="item_address in ShopAddress.address_rule.options">
                <a-radio-button :value="item_address.value" >{{ item_address.name }}</a-radio-button>
            </template>
        </a-radio-group>

        <!-- <a-button style="margin-left: 10px;">+ 添加地址</a-button> -->

        <!--单一发货地址-->
        <div v-if="ShopAddress.address_type == 1" style="padding: 20px 0;color: #000;">
            <!--地址 为空-->
            <template v-if="ShopAddress.single_obj.options.length === 0">
                <a-empty />
            </template>
            <!--地址 不为空-->
            <template v-else>
                <a-radio-group v-model:value="ShopAddress.single_value">
                    <a-radio v-for="item_single in ShopAddress.single_obj.options" class="a-radio-group-y font_size_12" :value="item_single.value">{{ item_single.name }}</a-radio>
                </a-radio-group>
            </template>
            <p>
            </p>

        </div>
        
        
        <!--多发货地址-->
        <div v-else-if="ShopAddress.address_type == 2" style="padding: 20px 0;color: #000;">
            <!--地址 为空-->
            <template v-if="ShopAddress.multiple_obj.options.length === 0">
                <a-empty />
            </template>
            <!--地址 不为空-->
            <template v-else>
                <a-radio-group v-model:value="ShopAddress.multiple_value">
                    <a-radio v-for="item_multiple in ShopAddress.multiple_obj.options" class="a-radio-group-y font_size_12" :value="item_multiple.value">{{ item_multiple.name }}</a-radio>
                </a-radio-group>
            </template>
            <p>
            </p>
        </div>

        <template #footer>
            <a-flex justify="flex-start" gap="8">
                <a-button type="primary" @click="ShopAddress.confirm">确定</a-button>
                <a-button @click="ShopAddress.closedFunction">关闭</a-button>
            </a-flex>
        </template>
        </a-drawer>

    </template>


    <!--白底图 选择主图 抽屉-->
    <template>
        <a-drawer
            v-model:open="PAGEDATA.select_pic_to_whiteimage_open"
            class="custom-class"
            root-class-name="root-class-name"
            :root-style="{ color: 'blue' }"
            title="创建白底图"
            placement="right"
        >
            <!--主图列表-->
            <a-radio-group v-model:value="white_value" >

                <a-row :gutter="[16,16]">
                    <a-col
                        v-for="(item,index) in Pic_Fun.PicList" 
                        :span="8"
                        style="text-align: center;"
                        >
                        <a-image :src="item.byte_url"></a-image>
                        <a-radio :value="item" style="margin-top: 10px;"></a-radio>
                    </a-col>
                </a-row>

            </a-radio-group>

            <a-row :gutter="[16,16]" >
                <a-col :spen="24" style="margin-top: 30px;width: 100%;">
                    <p style="color: black;">选择生成白底图后存储的文件夹</p>
                    <!--联级选择-文件夹-->
                    <a-cascader
                        v-model:value="uploadimglist.folder_value"
                        :options="uploadimglist.netImageFolderOptions"
                        :load-data="loadNetImageFolder"
                        placeholder="请选择文件夹"
                        change-on-select
                        style="width: 100%;"
                    />
                </a-col>
            </a-row>


            <template #footer>
                <a-flex justify="flex-start" gap="8">
                    <a-button type="primary" @click="white_image_onConfirm">
                        去创建
                    </a-button>
                    <a-button @click="PAGEDATA.select_pic_to_whiteimage_open = false">取消</a-button>
                    
                </a-flex>
            </template>

        </a-drawer>
    </template>

    <!--白底图 创建 组件-->
    <white_image_component 
        v-on:create_white_image_callback="white_image_call_back" 
        :data="white_data"/>

    
    <!--主图视频 选择主图 抽屉-->
    <template>
        <a-drawer
            v-model:open="PAGEDATA.select_pic_to_video_open"
            class="custom-class"
            root-class-name="root-class-name"
            :root-style="{ color: 'blue' }"
            title="填写创建视频选项"
            placement="right"
            forceRender
        >
            <!--选择 主图 创建视频 列表-->
            <a-checkbox-group v-model:value="pic_video_data.checkedList">
                <a-row :gutter="[16,16]">
                    <a-col
                        v-for="(item,index) in Pic_Fun.PicList" 
                        :span="8"
                        style="text-align: center;"
                        >
                        <a-image :src="item.byte_url"></a-image>
                        <p>
                        <a-checkbox :value="item" style="margin-top: 10px;"></a-checkbox>
                        </p>
                    </a-col>
                </a-row>
            </a-checkbox-group>
            <!--选择 主图 创建视频 列表-->

            <a-form
                ref="videoformRef"
                :model="videoformState"
                :rules="videoformrule"
                layout="vertical"
                style="margin-top: 20px;"
            >
                <a-form-item label="储存文件夹" name="folder_id">
                    <!--联级选择-文件夹-->
                    <a-cascader
                        v-model:value="videoformState.folder_id"
                        :options="videouploadimglist.netImageFolderOptions"
                        :load-data="VideoloadNetImageFolder"
                        placeholder="请选择文件夹"
                        change-on-select
                        style="width: 100%;"
                    />
                </a-form-item>

                <a-form-item label="视频类型" name="scene">
                    <a-select v-model:value="videoformState.scene" placeholder="请选择类型">
                        <a-select-option value="costume">服装/服饰</a-select-option>
                        <a-select-option value="general">通用</a-select-option>
                          <a-select-option value="keeporder">按素材顺序生成</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label="播放节奏" name="style">
                    <a-select v-model:value="videoformState.style" placeholder="请选择播放节奏">
                        <a-select-option value="normal">正常</a-select-option>
                        <a-select-option value="fast">快节奏</a-select-option>
                        <a-select-option value="slow">慢节奏</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label="专场特效" name="transitionStyle">
                    <a-select v-model:value="videoformState.transitionStyle" placeholder="请选择专场特效">
                        <a-select-option value="basic">无特效</a-select-option>
                        <a-select-option value="slow">舒缓</a-select-option>
                        <a-select-option value="fast">动感</a-select-option>
                        <a-select-option value="normal">自然</a-select-option>
                        <a-select-option value="ink">水墨</a-select-option>
                        <a-select-option value="glitch">机械故障</a-select-option>
                        <a-select-option value="shift">切换</a-select-option>
                        <a-select-option value="mosaic">马赛克</a-select-option>
                        <a-select-option value="shutter">百叶窗</a-select-option>
                        <a-select-option value="zoom">缩放</a-select-option>
                        <a-select-option value="mask">遮罩</a-select-option>
                        <a-select-option value="brush">笔刷</a-select-option>
                        <a-select-option value="wind">风舞</a-select-option>
                        <a-select-option value="smog">烟雾</a-select-option>

                    </a-select>
                </a-form-item>
            </a-form>

            <template #footer>
                <a-flex justify="flex-start" gap="8">
                    <a-button type="primary" @click="pic_video_onConfirm">
                        去创建
                    </a-button>
                    <a-button @click="PAGEDATA.select_pic_to_video_open = false">取消</a-button>
                    
                </a-flex>
            </template>

        </a-drawer>
    </template>


    <!--主图视频 创建 组件-->
    <main_image_video_component 
        v-on:create_pic_video_callback="pic_video_call_back" 
        :data="pic_video_data"/>



     
 </template>
 
 <script>
 import { defineAsyncComponent,defineComponent, ref, computed, watch, onMounted, reactive } from 'vue'
 import { 
  Base_formRef,formState,rules,Longimg_Fun,whiteimg_Fun,video_Fun,Basedata,CATE,Pic_Fun,PageproductRuleOcject,ProductUpdateRule
} from '@/assets/douyinshop/productmanagement/Add';
import { DeleteOutlined} from '@ant-design/icons-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

 export default defineComponent({
   name: '基础信息',
   
   components: {
    DeleteOutlined,
    white_image_component:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add_component/white_image.vue')),// 白底图组件
    main_image_video_component:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add_component/main_image_video.vue')),// 主图视频组件
    selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件
    selectFreightid:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/templatefreight/selectFreightId.vue')),// 运费模板组件
    selectsizetemplateid:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/templateSize/selectsizetemplateid.vue')),// 尺码模板组件
    selectbrandid:defineAsyncComponent(()=>import('@/components/AppMarket/Douyinshop/brand/brandlist.vue')),// 商品品牌组件

   },
   
   props: {

   },
   
   emits: ['update', 'change'],
   
   setup(props, { emit, attrs, slots, expose }) {

    const tool = new TOOL.TOOL()            // 工具方法
    const API = new utils.A_Patch()         // 请求接口地址合集

    const PAGEDATA = reactive({
        select_pic_to_whiteimage_open:false, // 选择主图抽屉状态
        on_pic_creat_whiteimage:()=>{//选择主图 开启
            PAGEDATA.select_pic_to_whiteimage_open = true;
            white_value.value=undefined
            white_data.byte_url = undefined;
            white_data.folder_id = undefined;
            uploadimglist.folder_value = []
        },
        // 重置 创建白底图 表单信息
        select_pic_to_video_open:false, // 选择主图视频-抽屉状态
        on_creat_pic_video:()=>{//创建主图视频 开启
            PAGEDATA.select_pic_to_video_open = true;
            
            // 重置创建视频组件表单信息
            pic_video_data.checkedList=[],// 创建视频的图片列表对象
            pic_video_data.folder_id=undefined// 存储视频的素材文件夹地址
            uploadimglist.folder_value = []
            videoformState.folder_id=undefined,// 文件夹地址
            videoformState.scene=undefined,// 类型
            videoformState.style=undefined,// 节奏
            videoformState.transitionStyle=undefined//专场动画 
        }

    })

    // 白底图==异步加载联级选择器子文件夹===开始
    const loadNetImageFolder = (selectedOptions) => {

        const targetOption = selectedOptions[selectedOptions.length - 1];

        targetOption.loading = true;
        
        const folderId = targetOption.value;
        
        tool.Http_.post(API.AppSrtoreAPI.material.getfolder, {
            
            "folder_id": folderId,
            "page_num": 1,
            "page_size": 1000

        }).then((res) => {

            const child_folder_list = res.data.data.folder_info.child_folder;
            
            if (child_folder_list.length > 0) {
                targetOption.children = child_folder_list.map(obj => ({
                    value: String(obj.folder_id),
                    label: obj.folder_name,
                    isLeaf: true
                }));
                
                // 检查子文件夹是否还有子文件夹
                const checks = targetOption.children.map(child => {
                    return tool.Http_.post(API.AppSrtoreAPI.material.getfolder, {
                        "folder_id": child.value,
                        "page_num": 1,
                        "page_size": 10
                    }).then((childRes) => {
                        const grandChildren = childRes.data.data.folder_info.child_folder;
                        child.isLeaf = grandChildren.length === 0;
                    });
                });
                
                Promise.all(checks).then(() => {
                    targetOption.loading = false;
                    uploadimglist.netImageFolderOptions = [...uploadimglist.netImageFolderOptions];
                });

            } else {

                targetOption.isLeaf = true;
                targetOption.loading = false;
                uploadimglist.netImageFolderOptions = [...uploadimglist.netImageFolderOptions];
            }
        });
    };

    // 图片地址上传列表
    const uploadimglist=reactive({
        list:[{value:''}],
        folder_value:[], // 文件夹id
        netImageFolderOptions:[{ // 文件夹联级选项
            value: '0',
            label: '素材库',
            isLeaf: false,
        }]
    })
    // 白底图===异步加载联级选择器子文件夹===结束









    // 白底图创建方法 ===================开始
    // 主图选择白底图
    const white_value = ref(undefined);

    // 创建白底图 组件调用数据
    const white_data = reactive({
        open:false, // 组件展现状态
        byte_url:undefined,// 白底图处理素材库对象
        folder_id:undefined// 储存素材文件夹地址
    })

    // 主图选择白底图-确认方法
    const white_image_onConfirm = () =>{

        console.log(uploadimglist.folder_value)

        if(white_value.value && Array.isArray(uploadimglist.folder_value) && uploadimglist.folder_value.length !== 0){

            white_data.byte_url = white_value.value.byte_url;// 赋值给创建组件的数据对象=图片地址
            white_data.folder_id = uploadimglist.folder_value.at(-1);// 赋值给创建组件的数据对象=文件夹id
            PAGEDATA.select_pic_to_whiteimage_open = false;// 选择主图抽屉关闭
            white_data.open = true;// 显示 创建 组件
            console.log(white_data)

        }else if(!white_value.value){
            tool.Fun_.message('info','请选择图片')
        }else if(!Array.isArray(uploadimglist.folder_value)){
            tool.Fun_.message('info','请选择存储白底图的文件夹')
        }else if(Array.isArray(uploadimglist.folder_value) && uploadimglist.folder_value.length == 0){
            tool.Fun_.message('info','请选择存储白底图的文件夹')
        }
    }

    // 创建白底图 回调方法：将处理好的白底图素材图片填充到页面
    const white_image_call_back= (data)=>{

        console.log('检测白底图素材',data)

        whiteimg_Fun.oncheck(data) // 检测白底图

    }
    // 白底图创建方法 ===================结束









    // 主图视频 创建方法 ===================开始

    const videoformRef = ref(); // 表单验证对象
    const videoformrule = {
        folder_id:[{
            required: true,
            message: '文件夹不能为空',
            trigger: 'change',
        }],
        scene:[{
            required: true,
            message: '视频类型不能为空',
            trigger: 'change',
        }],
        style:[{
            required: true,
            message: '播放节奏不能为空',
            trigger: 'change',
        }],
        transitionStyle:[{
            required: true,
            message: '专场风格不能为空',
            trigger: 'change',
        }],
    }

    // 视频创建 选择文件夹路径方法
    const VideoloadNetImageFolder = (selectedOptions) => {

        const targetOption = selectedOptions[selectedOptions.length - 1];

        targetOption.loading = true;
        
        const folderId = targetOption.value;
        
        tool.Http_.post(API.AppSrtoreAPI.material.getfolder, {
            
            "folder_id": folderId,
            "page_num": 1,
            "page_size": 1000

        }).then((res) => {

            const child_folder_list = res.data.data.folder_info.child_folder;
            
            if (child_folder_list.length > 0) {
                targetOption.children = child_folder_list.map(obj => ({
                    value: String(obj.folder_id),
                    label: obj.folder_name,
                    isLeaf: true
                }));
                
                // 检查子文件夹是否还有子文件夹
                const checks = targetOption.children.map(child => {
                    return tool.Http_.post(API.AppSrtoreAPI.material.getfolder, {
                        "folder_id": child.value,
                        "page_num": 1,
                        "page_size": 10
                    }).then((childRes) => {
                        const grandChildren = childRes.data.data.folder_info.child_folder;
                        child.isLeaf = grandChildren.length === 0;
                    });
                });
                
                Promise.all(checks).then(() => {
                    targetOption.loading = false;
                    videouploadimglist.netImageFolderOptions = [...videouploadimglist.netImageFolderOptions];
                });

            } else {

                targetOption.isLeaf = true;
                targetOption.loading = false;
                videouploadimglist.netImageFolderOptions = [...videouploadimglist.netImageFolderOptions];
            }
        });
    };

    // 图片路径地址对象
    const videouploadimglist=reactive({
        list:[{value:''}],
        netImageFolderOptions:[{ // 文件夹联级选项
            value: '0',
            label: '素材库',
            isLeaf: false,
        }]
    })

    // 表单绑定值
    const videoformState = reactive({
        folder_id:undefined,// 文件夹地址
        scene:undefined,// 类型
        style:undefined,// 节奏
        transitionStyle:undefined//专场动画 
    }) 

    // 创建视频选择主图-确认方法
    const pic_video_onConfirm = async() =>{


        // 视频图片为空验证
        if(pic_video_data.checkedList.length == 0){  // 选择图片列表为空

            tool.Fun_.message('info','请选择创建视频的图片')

            return

        }
        
        // 检查表单 ref 是否挂载（Drawer 动画期间可能为 null）
        if (!videoformRef.value) {

            tool.Fun_.message('warning', '表单未加载完成，请稍后再试')
            
            return

        }

        // 用 try/catch 包裹，不要用 .catch(err => throw err)
        try {

            await videoformRef.value.validate()

            var checkedList = pic_video_data.checkedList;
            
            var folder_id = videoformState.folder_id.at(-1);// 赋值给创建组件的数据对象=文件夹id
            
            pic_video_data.checkedList = checkedList; // 图片列表

            pic_video_data.folder_id = folder_id;// 文件夹id
            pic_video_data.scene = videoformState.scene;// 类型
            pic_video_data.style= videoformState.style;// 节奏
            pic_video_data.transitionStyle = videoformState.transitionStyle;//专场动画 

            // console.log('创建数据',videoformState)
            
            PAGEDATA.select_pic_to_video_open = false;// 选择主图 => 抽屉关闭

            pic_video_data.open = true;// 显示 创建 组件

        } catch (err) {

            // 验证失败，Ant Design Vue 会自动显示错误提示
            // console.log('表单验证未通过')

            return  // 直接 return，不执行后续

        }

    }


    // 创建主图视频 组件调用数据
    const pic_video_data = reactive({
        open:false, // 组件展现状态
        checkedList:[],// 创建视频的图片列表对象
        folder_id:undefined// 存储视频的素材文件夹地址
    })

    // 创建主图视频 回调方法：将处理好的主图视频 填充到页面
    const pic_video_call_back= (data)=>{
        console.log('添加商品存储主图视频素材对象',data)
        video_Fun.add(data)
    }  

    // 主图视频 创建方法 ===================结束



     
    // 生命周期--异步请求 规则加载到页面
     onMounted(async() => {

        const productRule = new ProductUpdateRule() // 初始化 规格调用方法

        await productRule.get()// 请求发布规则【 需要在 获取分类ID后执行】

        console.log('基础信息 组件已挂载')

        discernment_component_template_rule(rules) // 判断 尺码模板是否必填

        // 发货地址是否必填
        ShopAddress.discernment_shop_add_dizhi(rules)


     })


     // 判断尺码表是否必填
     const discernment_component_template_rule = (data) =>{

        // console.log(PageproductRuleOcject.value)

        let is_show = PageproductRuleOcject.value.component_template_rule.is_show // 尺码模板-是否展示
        let must_input = PageproductRuleOcject.value.component_template_rule.must_input // 尺码模板-是否必填

        // 如果尺码必填
        if(must_input){
            data.value.size_info_template_id = {
                name:[{
                    message:'尺码模板必填',
                    required:must_input,
                    trigger:'change'
                }]
            }
        }


     }
    
    // 判断发货地址是否必填
    const ShopAddress = reactive({

        // 发货地址是否支持
        stats:false,

        // 发货地址是否必填
        required:false,

        // 选择地址-抽屉状态
        open:false,

        // 发货地址规则
        address_rule:undefined,

        // 发货地址类型 1-单地址，2-多地址
        address_type:'1',

        // 单地址对象
        single_obj:undefined,
        // 单地址选中值
        single_value:undefined,
        // 多地址对象
        multiple_obj:undefined,
        // 多地址选中值
        multiple_value:undefined,

        // 判断发货地址是否支持、是否必填
        discernment_shop_add_dizhi:(data) =>{

            let enable = PageproductRuleOcject.value.fulfillment_rule.shipping_origin_rule.enable; // 发货地址-是否支持
            let must_select = PageproductRuleOcject.value.fulfillment_rule.shipping_origin_rule.must_select; // 发货地址-是否必填

            if(enable){// 如果支持
                ShopAddress.stats = enable
            }

            // 如果必填
            if(must_select){
                data.value.shipping_origin_info = {
                    address:[{
                        message:'发货地址必填',
                        required:must_select,
                        trigger:'change'
                    }]
                }
            }

            // 地址对象赋值
            // ShopAddress.address_rule = PageproductRuleOcject.value.fulfillment_rule.shipping_origin_rule

            // 模拟数据

            ShopAddress.address_rule =  {
                    "enable": true,
                    "must_select": true,
                    "options": [
                        {
                            "value": "1",
                            "name": "单一发货地",
                            "options": [
                                {"value":"123", "name":"浙江省杭州市余杭区XX大厦"},
                                {"value":"124", "name":"浙江省杭州市x西湖区YY中心"}
                            ]
                        },
                        {
                            "value": "2",
                            "name": "多发货地组合",
                            "options":[
                                {"value":"321", "name":"浙江省杭州市多仓"}
                            ]
                        }
                    ]
            }
            
            // 单地址对象赋值
            ShopAddress.single_obj = ShopAddress.address_rule.options.find(item => item.value === '1');
            // 多地址对象赋值
            ShopAddress.multiple_obj = ShopAddress.address_rule.options.find(item => item.value === '2');

        },

        // 开启 选择地址方法
        selectFunction:()=>{
            ShopAddress.open = true;
        },

        // 关闭 选择地址
        closedFunction:()=>{
            ShopAddress.open = false;
        },

        // 确认-验证是否选择值-获取值-将值同步到页面-同步到数据对象
        confirm:()=>{

            // 获取发货类型1=单个发货地址 2=多个发货地址

            // 验证是否选中
            if(ShopAddress.address_type === '1'){ // 单个发货地址
                
                if(ShopAddress.single_value){
                    
                    let v = ShopAddress.single_value
                    
                    let res = ShopAddress.single_obj.options.find(item => item.value === v);

                    console.log(ShopAddress.single_value,res) // 选中值

                    // 赋值到表单
                    formState.shipping_origin_info.address = res.name;
                    formState.shipping_origin_info.shipping_origin_type = ShopAddress.address_type;
                    formState.shipping_origin_info.shipping_origin_id = res.value;

                    ShopAddress.open = false;// 关闭抽屉

                }else{

                    tool.Fun_.message('info','请选择发货地址')
                
                }

            }else if(ShopAddress.address_type==='2'){ // 多个发货地址

                if(ShopAddress.multiple_value){

                    let v = ShopAddress.multiple_value;

                    let res = ShopAddress.multiple_obj.options.find(item => item.value === v);

                    console.log(ShopAddress.multiple_value, res) // 选中值

                    // 赋值到表单
                    formState.shipping_origin_info.address = res.name;
                    formState.shipping_origin_info.shipping_origin_type = ShopAddress.address_type;
                    formState.shipping_origin_info.shipping_origin_id = res.value;

                    ShopAddress.open = false; // 关闭抽屉

                }else{

                    tool.Fun_.message('info','请选择发货地址')
                
                }

            }

        }


    })

    const discernment_shop_add_dizhi = () =>{

        console.log('发货地址',PageproductRuleOcject.value.fulfillment_rule)
        // console.log('尺码模板',PageproductRuleOcject.value.component_template_rule)
        // console.log('表单规则',rules)

        let enable = PageproductRuleOcject.value.fulfillment_rule.shipping_origin_rule.enable; // 发货地址-是否支持
        let must_select = PageproductRuleOcject.value.fulfillment_rule.shipping_origin_rule.must_select; // 发货地址-是否必填
        console.log('发货地址-是否支持',enable)
        console.log('发货地址-是否必填',must_select)

     }



     return {

        PAGEDATA,
        white_value,
        white_data,
        white_image_onConfirm,
        white_image_call_back,

        pic_video_data,
        pic_video_call_back,
        pic_video_onConfirm,

        loadNetImageFolder,// 联级地址
        uploadimglist,

        videoformRef,
        videoformrule,
        videoformState,
        videouploadimglist,
        VideoloadNetImageFolder,

        Base_formRef,
        CATE,
        Pic_Fun,
       whiteimg_Fun,
       Longimg_Fun,
       video_Fun,
       formState,Basedata,rules,

       // 发货地址
       ShopAddress,
       discernment_shop_add_dizhi
     }
   }
 })
 </script>
 
 <style scoped>

 .content{padding: 0;margin: 20px 0 0 0;background: '#fff';overflow-y: auto;overflow-x: hidden;height: 90vh;}
.img_pic{height: 100px;width: 100px;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;}
.img_3_4_pic{height: 100px;width: 100px;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;text-align: center;}
.Add_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;float: left;text-align: center;}
.Add_3_4_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;float: left;text-align: center;}
.add_btn_class{width: 40px; margin:0 0 0 20px;}
/* .ant-form-item{margin-bottom: 0px ! important} */
.Add_shui_img{height: 90px;width: 100%;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_shui_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.call_shui_img{height: 90px;width: 100%;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;padding: 4px 0 0 0;}
.clear_shui_img{margin: 0 0 0 6px;}
/*履约模式选项卡字体大小设置*/
:deep(.ant-radio-button-wrapper) {font-size: 12px;}
.custom-radio :deep(.ant-radio + span) {font-size: 12px;}
/*白底图创建==按钮*/
.creat_white_button{height: 34%;text-align: center;border: 1px silver dotted;border-radius: 4px;}
 
 /*表单提示字体大小设置*/
:deep(.ant-form-item-explain) {
  font-size: 12px;  /* 改成你需要的大小 */
}
:deep(.ant-form-item-explain-error) {
  font-size: 12px;
}
.a-radio-group-y{display: flex;height:30px;margin: 10px 0;line-height:30px;}
 </style>