<!-- 抖店铺==新建商品组件 -->
<template>

    <!-- 动态渲染异步组件--选择素材 -->
    <selectimg 
        v-if="PAGEDATA.selectimg_open" 
        v-on:add_img_callback="PAGEDATA.Add_Callback" 
        :data="PAGEDATA"
    />

    <!-- 动态渲染异步组件--选择运费模板 -->
    <selectFreightid 
        v-if="PAGEDATA.freighttemplate_open" 
        v-on:freight_callback="selectfreight_callback" 
        :data="PAGEDATA"
    />

    <!-- 动态渲染异步组件--选择尺码模板 -->
    <selectsizetemplateid 
        v-if="PAGEDATA.sizetemplate_open" 
        v-on:sizetemplate_callback="selectsizetemplate_callback" 
        :data="PAGEDATA"
    />

    <!--dynamic rendering asynchronous component--select brand template-->
    <selectbrandid 
        v-if="PAGEDATA.brand_list_open" 
        v-on:selectbrand_callback="selectbrand_callback" 
        :data="PAGEDATA" 
        :FormData="CATE"
    />

    <a-modal
      v-model:open="props.data.AddDate"
      width="100%"
      wrap-class-name="full-modal"
      :footer="null"
      :destroyOnClose="true"
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

                    <a-tab-pane key="0" tab="基础信息" :disabled="PAGEDATA.tab_pane_status">

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
                                        @click="PAGEDATA.change_material_type('white_img')" 
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
                                        @click="PAGEDATA.change_material_type('video_info')" 
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
                                        @click="PAGEDATA.change_material_type('long_img_List')" 
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
                                    label="运费模板"
                                    name="freight_id"
                                >
                                    <a-input-group compact>
                                        <a-input v-model:value="formState.freight_id.name" placeholder="选择运费模板" disabled style="width: calc(74%);padding: 5.5px;" />
                                        <a-button class="font_size_12" @click="PAGEDATA.chang_freighttemplate">选择</a-button>
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
                                    <a-button class="font_size_12" @click="PAGEDATA.change_brand_list">选择</a-button>
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
                                        <a-button @click="PAGEDATA.chang_sizetemplate">选择</a-button>
                                    </a-input-group>
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

                    </a-tab-pane>

                    <a-tab-pane key="1" tab="商品属性" >

                       <div style="width: 100%;">                  

                        <!--属性开始-->
                        <a-divider orientation="left" orientation-margin="0px">
                            商品属性
                            <a-button 
                                type="dashed"
                                size="small"
                                style="margin-left: 10px;"
                                @click="CATE.Ceck_format"
                            >智能预测填充属性
                            </a-button>
                            <a-button 
                                type="dashed"
                                size="small"
                                style="margin-left: 10px;"
                                @click="CATE.Clear_format"
                            >清空属性
                            </a-button>
                        </a-divider>
                        
                        <a-form :ref="CATE.form_ref" :model="CATE.format_formRef">

                            <a-row v-if="CATE.format.value.length !== 0" loading="true" :gutter="[16,6]">
                                
                                <template v-for="item in CATE.format.value">

                                    <!--度量衡-多选-->
                                    <template v-if="item.type == 'multi_value_measure'">

                                         <a-col :span="24" style="margin-bottom: 10px;">
                                            
                                            <!-- 内层嵌套 row -->
                                             <p>面料材质 <span v-show="item.required ==1" style="color: red;">*必填</span></p>

                                            <a-row :gutter="[16,6]">
                                                
                                                <a-col :span="6">
                                                    <!-- 吊牌 开始-->
                                                    <!--洗水标上传 开始
                                                        available    是否可用	true-可用，false-不可用
                                                        required     是否必填	true-必填，false-选填
                                                    -->
                                                    <template v-if="item.property_pic_rule.available == true">

                                                        <div v-if="CATE.category_property_pics.value != undefined" class="cursor call_shui_img">
                                                            <a-image style="height:78px;" :src="CATE.category_property_pics.value"></a-image>
                                                            <span class="clear_shui_img">
                                                                <a-button type="text" size="small" @click="CATE.clear_img"> 
                                                                    <DeleteOutlined />
                                                                </a-button>
                                                            </span>
                                                        </div>

                                                        <!-- <p>水洗标/吊牌图</p> -->
                                                        <div class="cursor Add_shui_img" v-else-if="CATE.category_property_pics.value == undefined" 
                                                            @click="PAGEDATA.change_material_type('tag_img')"">
                                                            <a-flex justify="center" align="center" style="height: 100%;font-size: 12px;">
                                                            + 水洗标/吊牌
                                                            </a-flex>
                                                        </div>

                                                    </template>
                                                    <!--吊牌 结束-->
                                                </a-col>

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
                                                                <v-nodes :vnodes="menu" />
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
                                                        <v-nodes :vnodes="menu" />
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
                                                        <v-nodes :vnodes="menu" />
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
                                                    <v-nodes :vnodes="menu" />
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
                                                    <v-nodes :vnodes="menu" />
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

                    </a-tab-pane>

                    <a-tab-pane key="2" tab="商品规格" :disabled="PAGEDATA.tab_pane_status">

                        <spec_component />

                    </a-tab-pane>

                    <a-tab-pane key="3" tab="库存发货" :disabled="PAGEDATA.tab_pane_status">
                        
                        <!--发货模式 组件-->
                        <Preselltype_component :rule_info="Rule.info.value"/>

                    </a-tab-pane>

                    <a-tab-pane key="4" tab="描述详情" :disabled="PAGEDATA.tab_pane_status">

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

                    <a-tab-pane key="5" tab="资质规则" :disabled="PAGEDATA.tab_pane_status">
                        <!--资质 组件-->
                        <quality_component :rule_info="Rule.info.value"/>
                    </a-tab-pane>

                </a-tabs>

            </div>

            <!--底部按钮--开始-->
            <a-affix :offset-bottom="1" v-if="CATE.cate_status.value === false">
                <div style="margin: 0 auto;text-align: center;padding: 10px 0 0 0;">
                    <a-space align="end" style="height: 100%;">
                        <a-button type="primary" @click="handleOk" :loading="PAGEDATA.upload_product_loading">发布到线上售卖</a-button>
                        <a-button @click="console.log('放入草稿')">放入草稿箱</a-button>
                        <a-button @click="closed">关闭</a-button>
                    </a-space>
                </div>
            </a-affix>
            <!--底部按钮--结束-->

        </a-layout-content>

        <!--悬浮按钮-->
        <a-float-button-group 
            v-if="CATE.cate_value.value != undefined"
            shape="square" :style="{ right: '100px' }">
            <a-float-button
                tooltip="商品发布规则" 
                @click="console.log('查看规则')" />

            <a-float-button
                tooltip="商品发布记录" 
            >
                <template #icon>
                    <ReadOutlined />
                </template>
            </a-float-button>
        </a-float-button-group>

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
import { Fulfillment,Spec,CATE } from '@/assets/douyinshop/productmanagement/Add';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue' // 描述详情富媒体
import '@wangeditor/editor/dist/css/style.css' // 引入富媒体编辑器样式 css

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
        product_cate_component:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/Add_component/product_cate.vue')),// 类目预测
        selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件
        selectFreightid:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/templatefreight/selectFreightId.vue')),// 运费模板组件
        selectsizetemplateid:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/templateSize/selectsizetemplateid.vue')),// 尺码模板组件
        format_cp:defineAsyncComponent(()=>import('@/components/AppMarket/Douyinshop/ProductList/edit_component/format_cp.vue')),// 商品属性组件
        selectbrandid:defineAsyncComponent(()=>import('@/components/AppMarket/Douyinshop/brand/brandlist.vue')),// 商品品牌组件
        Preselltype_component:defineAsyncComponent(()=>import('@/components/AppMarket/Douyinshop/ProductList/Add_component/preselltype_component.vue')),// 发货模式组件
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

        // 响应式数据
        CATE.cate_value.value = undefined

        const Fulfill = new Fulfillment()       // 履约初始化
        

        // 规格传值 到 库存发货

        // 添加商品配置
        const PAGEDATA=reactive({

            selectimg_open:false,           // 添加主图-图片显示状态配置
            freighttemplate_open:false,     // 运费模板-图片显示状态配置
            sizetemplate_open:false,        // 尺码模板-图片显示状态配置
            brand_list_open:false,          // 品牌列表-组件显示状态配置
            setimg_name:'',                 // 添加图片的对象['PicList','long_img_List','white_img','video','des']
            sku_img_obj:'',                 // 规格图片对象
            tab_pane_status:true,          // 选项卡禁用状态

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

            // 变更添加素材类型
            change_material_type:(typeName)=>{
                PAGEDATA.selectimg_open = true;
                PAGEDATA.setimg_name = typeName; // 指定添加图片的对象
            },
            // 规格图片
            change_spec_imng_fun:(typeName, item)=>{
                PAGEDATA.selectimg_open = true;
                PAGEDATA.setimg_name = typeName; // 指定添加图片的对象
                PAGEDATA.sku_img_obj = item;
            },
            // 选择尺码
            chang_sizetemplate:()=>{
                PAGEDATA.sizetemplate_open = true;
            },
            // 选择运费模板
            chang_freighttemplate:()=>{
                PAGEDATA.freighttemplate_open = true;
            },
            // 选择品牌
            change_brand_list:()=>{
                PAGEDATA.brand_list_open = true;
            },
            // 上传按钮状态
            upload_product_loading:ref(false)
        })

        // 3:4长图
        const Longimg_Fun = {
            PicList:ref([]),
            // 删除长图
            del:(idx)=>{
                Longimg_Fun.PicList.value.splice(idx, 1);
            },
            // 添加长图
            add:(data)=>{
                data.forEach((obj,idx)=>{
                    Longimg_Fun.PicList.value.push(obj)
                })
                if(Longimg_Fun.PicList.value.length > 5){
                    Longimg_Fun.PicList.value = Longimg_Fun.PicList.value.slice(0, 5)
                }
            },
            // 获取长图
            get:()=>{

                var res = Longimg_Fun.PicList.value;

                if(res.length >0){

                    var res_text = ''
                    res.forEach((obj,index)=>{
                        res_text = res_text + obj.byte_url  + '|'
                    })

                    return res_text.slice(0, -1)

                }else{
                    return false
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
                var obj = data[0];
                var material_type = obj.material_type;
                if(material_type == 'photo'){
                    var photo_info = obj.photo_info;
                    var pic_width = photo_info.width;      // 宽度
                    var pic_height = photo_info.height;     // 高度
                    if(pic_width == pic_height){
                        whiteimg_Fun.PicList.value.push(obj)
                    }else{
                        tool.Fun_.message('info','主图长宽比例需要1:1,不小于600X600.')
                    }
                }else if(material_type == 'video'){
                    tool.Fun_.message('info','【白底图】不能选择视频，请选择图片素材！')
                }
            },
            // 验证白底图
            get:()=>{
                var res = whiteimg_Fun.PicList.value;
                if(res.length >0){
                    return res[0].byte_url
                }else{
                    return false
                }
            }
        }

        // 视频video
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

                // 判断添加素材类型：仅允许添加
                if(material_type == 'photo'){
                    tool.Fun_.message('info', '请选择视频文件')
                }else if(material_type == 'video'){
                    video_Fun.PicList.value.length = 0;
                    video_Fun.PicList.value.push(data[0])
                }
            },
            get:()=>{

                var res = video_Fun.PicList.value;

                if(res.length >0){
                    
                    return res
                
                }else{
                
                    return false
                
                }
            }
        }

        // 基础信息【验证】
        const formRef = ref();

        // 基础信息验证规则
        const rules = {

            // 标题
            name: [
                {
                    required: true,
                    message: '商品标题不能为空',
                    trigger: 'change',
                },
                {
                    min: 4,
                    max: 30,
                    message: '至少4个汉字,不超过30个汉字,不能含emoj表情.',
                    trigger: 'blur',
                },
            ],

            // 客服电话
            mobile:[{
                    required: true,
                    message: '客服电话不能为空',
                    trigger: 'change',
            }],

            // 商品类型
            product_type:[{
                required: true,
                message: '类型不能为空!',
                trigger: 'change',
            }],

            // 支付方式
            pay_type:[
                {
                    required: true,
                    message: '支付方式不能为空!',
                    trigger: 'change',
            }],

            // 提交方式
            commit:[
                {
                    required: true,
                    message: '提交方式不能为空!',
                    trigger: 'change',
            }],
            // 运费模板
            freight_id:[
                {
                    required: true,
                    message: '运费模板不能为空!',
                    trigger: 'change',
            }],
        }

        // 基础信息表单数据
        const formState = reactive({
            product_type:'0',               // 商品类别
            mobile:'18888888888',           // 客服电话
            name:undefined,                 // 商品标题
            recommend_remark:undefined,     // 推荐语：不能含emoj表情
            standard_brand_id:{brand_id: undefined, brand_name: undefined},    //品牌id
            pay_type:'1',                   // 支付类型
            freight_id:{"name":"包邮","value":0},           // 运费模板
            size_info_template_id:{"name":undefined,"value":undefined},// 尺码模板
            commit:'false',                 // 提交
            remark:undefined,               // 商家备注
            presell_type:undefined,         // 发货模式
            presell_delay_time:undefined,   // 预售发货时间
            
            // 限购
            limit_per_buyer:undefined,          // 每个用户累计限购件数
            maximum_per_order:undefined,        // 每个用户每次下单限购件数
            minimum_per_order:undefined,        // 每个用户每次下单至少购买的件数

            // 导购短标题
            short_product_name:undefined,

            // 售后保障-7天无理由 "after_sale_service":"{\"supply_day_return_selector\":\"7-0\"}" 
            after_sale_service:"1",
            
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



        // 描述详情
        const editorRef = shallowRef()  // 编辑器实例，必须用 shallowRef
        const DES = {
            // 初始化
            valueHtml:ref(undefined),
            mode:ref('simple'),// 或 'simple' 'default'
            // 编辑器实例，必须用 shallowRef
            editorRef:shallowRef(),
            editorConfig:{placeholder: '请输入内容...' },// 默认值
            // 编辑器工具栏配置
            toolbarConfig:{
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
                    "group-image",
                    "uploadImage",
                    "insertImage",

                ]
            },
            // 创建编辑器
            handleCreated:(editor) => {
                editorRef.value = editor // 记录 editor 实例，重要！
                editor.clear() // 清空编辑器
            },
            // 加载图片到编辑器
            add_img:(img_list)=>{
                var image_text = '<p>'
                for(let i of img_list){
                    let url = i.byte_url;
                    image_text = image_text + '<img class="ant-image-img" src=" ' + url + '">';
                }
                DES.valueHtml.value = DES.valueHtml.value + image_text + '</p>'
            },
            // 获取描述图片
            get_img:()=>{
                var img_list_res = []
                // 描述为空
                if(editorRef.value == undefined){
                    tool.Fun_.message('error', '描述详情不能为空！');
                    activeKey.value = '5';
                    return false
                }else {

                    var img_list = editorRef.value.getElemsByType('image') // 获取图片地址

                    if(img_list.length == 0 || editorRef.value == undefined){
                        tool.Fun_.message('error', '描述详情不能为空！');
                        activeKey.value = '5';
                        return false
                    }else{
                        // 描述不为空
                        // console.log(img_list)
                        img_list.forEach((obj,index)=>{
                            img_list_res.push(obj.src)
                        })

                        return img_list_res.join('|')
                    }
                }
            },
            // 清空描述图
            clear_img:()=>{
                DES.valueHtml.value = '';
            }
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

        // 确认按钮===>>>获取产品信息+验证
        const handleOk = async() => {

            var product_data_obj = {} // 商品上传JSON

            // 主图
            // if(Pic_Fun.get()){// 不为空
            //     product_data_obj.pic = Pic_Fun.get()
            // }else{
            //     tool.Fun_.message('error','主图不能为空！')
            //     activeKey.value = '1'
            //     return
            // }

            // 白底图
            if(whiteimg_Fun.get()){
                product_data_obj.white_back_ground_pic_url = whiteimg_Fun.get();// 白底图：url(仅素材中心url有效)，白底图比例要求1:1
                console.log('白底图', whiteimg_Fun.get())
            }

            // 长图
            if(Longimg_Fun.get()){
                product_data_obj.long_pic_url = Longimg_Fun.get();// 长图
                console.log('长图', Longimg_Fun.get())
            }

            // 视频信息
            if(video_Fun.get()){
                var video_obj = video_Fun.get()
                var material_video_id = video_obj[0].video_info.vid;
                product_data_obj.material_video_id = material_video_id;// 视频id
                // console.log('视频素材id', material_video_id)
            }

            // 基础信息
            var pro_info = await GetInfo();

            if(pro_info){
                // 正常获取
                product_data_obj.name = pro_info.name;                  // 标题-必填
                product_data_obj.product_type = pro_info.product_type;  // 商品类型-必填
                product_data_obj.recommend_remark = pro_info.recommend_remark;// 推荐语
                product_data_obj.remark = pro_info.remark;              // 商家备注
                product_data_obj.pay_type = pro_info.pay_type;          // 支付方式
                product_data_obj.mobile = pro_info.mobile;              // 电话
                product_data_obj.freight_id = pro_info.freight_id.value;// 运费模板
                product_data_obj.size_info_template_id = pro_info.size_info_template_id.value// 尺码模板
                product_data_obj.standard_brand_id = pro_info.standard_brand_id.brand_id;// 品牌id
                product_data_obj.minimum_per_order = pro_info.minimum_per_order; // 最少下单购买件数
                product_data_obj.maximum_per_order = pro_info.maximum_per_order; // 最多下单购买件数
                product_data_obj.limit_per_buyer = pro_info.limit_per_buyer; // 累计购买件数
                product_data_obj.presell_type = pro_info.presell_type; // 发货模式
                product_data_obj.short_product_name = pro_info.short_product_name;// 导购短标题
                product_data_obj.after_sale_service = after_sale_list.get(pro_info.after_sale_service);//售后服务
            }else{
                return
            }
            
            // 分类
            var cate_obj = CATE.get_cate()
            if(cate_obj){
                // 正常获取分类
                product_data_obj.category_leaf_id = cate_obj;
            }else{
                return
            }

            // 属性
            var format_obj = await CATE.get_format();
            if(format_obj){
                product_data_obj.product_format_new = JSON.stringify(format_obj);
            }else{
                return
            }

            // 验证规格信息
 

            // 库存信息
            // var sku_list_obj = await get_sku_list();
            // if(sku_list_obj){

            //     product_data_obj.spec_prices_v2 = sku_list_obj;
            
            // }else{
            //     return
            // }

            // 描述详情
            var description_obj = DES.get_img();
            if(description_obj){
                // 正常获取
                product_data_obj.description = description_obj
            }else{
                return
            }
            

            // 过滤 掉值为空的key
            Object.keys(product_data_obj).forEach(key => {
                if (product_data_obj[key] === undefined || product_data_obj[key] === '') {
                    delete product_data_obj[key];
                }
            });

            console.log(product_data_obj)

            upload_product(product_data_obj)// 上传商品

        }

        // 关闭新建商品按钮
        const closed = () =>{

            props.data.AddDate = !props.data.AddDate;

        }

        // 商品上传请求接口方法
        const upload_product = async (product_data) =>{

            // 按钮状态
            PAGEDATA.upload_product_loading = true;

            product_data.commit = 1; // 提交方式-立即发布
            
            // 发送数据到接口
            var res = await tool.Http_.post(API.AppSrtoreAPI.dou_product.add, product_data)

            console.log(res)

            var code = res.data.code;
            var sub_msg = res.data.sub_msg
            if(code === 10000 ){ // 接口返回成功
                
                // 提示上传成功，刷新列表;

                setTimeout(() => {

                    tool.Fun_.message('success','商品添加成功！')

                    PAGEDATA.upload_product_loading = false;

                    closed() // 关闭新建商品

                    ctx.emit('add_call_back')// 刷新列表

                }, 1000);

            }else{ // 接口返回失败

                // 提示失败，返回失败原因;
                tool.Fun_.message('error', sub_msg)

                // 重置提交按钮状态
                PAGEDATA.upload_product_loading = false;

            }

        }

        // 表单选择框---》搜索方法；
        const filterOption = (input, option) => {
            return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };


        // 监听商品类目是否填写：：如果填写了商品类目，才能填写其它商品信息
        watch(CATE.cate_value ,(newVal, oldVal)=>{

            if(CATE.cate_value.value !== '' && CATE.cate_value.value !== undefined){
                PAGEDATA.tab_pane_status = false;
            }

        })

        return{
            PAGEDATA,
            whiteimg_Fun,Longimg_Fun,video_Fun,        // 主图,白底图,长图,视频
            props,
            activeKey,
            formState,
            formRef,
            // -------------分类属性
            CATE,
            simpleImage,
            // -------------描述详情
            editorRef,DES,
            // 提交，关闭
            handleOk,closed,
            rules,
            selectfreight_callback,
            selectsizetemplate_callback,
            selectbrand_callback,
            filterOption,
            Fulfill
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