<!-- 抖店铺==新建商品组件 -->
<template>

    <!-- 动态渲染异步组件--选择素材 -->
    <selectimg v-if="PAGEDATA.selectimg_open" v-on:add_img_callback="PAGEDATA.Add_Callback" :data="PAGEDATA"/>

    <!-- 动态渲染异步组件--选择运费模板 -->
    <selectFreightid v-if="PAGEDATA.freighttemplate_open" v-on:freight_callback="selectfreight_callback" :data="PAGEDATA"/>

    <!-- 动态渲染异步组件--选择尺码模板 -->
    <selectsizetemplateid v-if="PAGEDATA.sizetemplate_open" v-on:sizetemplate_callback="selectsizetemplate_callback" :data="PAGEDATA"/>

    <a-modal
      v-model:open="props.data.AddDate"
      width="100%"
      wrap-class-name="full-modal"
      :footer="null"
    >
        <a-layout-content class="content">

            <div style="width: 950px;margin: 0 auto;height: 100%;">

                <a-tabs v-model:activeKey="activeKey">

                    <a-tab-pane key="1" tab="基础信息">

                        <a-row>

                            <!----主图--pic-->
                            <a-col :span="16">

                                <a-divider orientation="left" orientation-margin="0px">主图</a-divider>

                                <div style="width: 100%; height: 120px;">

                                    <p class="img_pic" v-for="(item,index) in Pic_Fun.PicList.value">

                                        <a-image :src="item.byte_url" />
                                        <!--图片尺寸不复合情况下-->

                                        <!--图片尺寸1：1情况下-->
                                        <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                                            <a-button type="text" size="small" @click="Pic_Fun.del_pic(index)"> 
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
                                            <PlusOutlined />
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
                                            <PlusOutlined />
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

                                    <p class="img_3_4_pic" v-for="(item,index) in Longimg_Fun.PicList.value">
                                        
                                        <a-image :height="110" :src="item.byte_url" />

                                        <span style="display:block;margin: 16px 0 0 0;width: 100%;text-align: center;">
                                            <a-button type="text" size="small" @click="Longimg_Fun.del(index)"> 
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
                                            <PlusOutlined />
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
                                            <PlusOutlined />
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
                                :rules="rules"
                            >
                                <a-row :gutter="[16,0]">

                                    <a-col :span="24">
                                        <a-form-item label="商品标题" name="name">
                                            <a-input v-model:value="formState.name" autoComplete="off" placeholder="输入商品标题" show-count :maxlength="30" />
                                        </a-form-item>
                                    </a-col>

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
                                            label="推荐语"
                                            name="recommend_remark"
                                        >
                                            <a-input v-model:value="formState.recommend_remark" autoComplete="off" show-count :maxlength="30" placeholder="输入商品推荐语"/>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-form-item
                                            label="商家备注"
                                            name="remark"
                                        >
                                            <a-input v-model:value="formState.remark" autoComplete="off" placeholder="商家可见备注" show-count :maxlength="30" />
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
                                            label="减库存类型" 
                                            name="reduce_type"
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
                                        >
                                            <a-input v-model:value="formState.mobile" />
                                        </a-form-item>
                                    </a-col>

                                    <a-col :span="8">
                                        <a-form-item
                                            label="提交方式"
                                            name="commit"
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
                                        >
                                            <a-input-group compact>
                                                <a-input v-model:value="formState.freight_id.name" placeholder="选择运费模板" disabled style="width: calc(74%);" />
                                                <a-button class="font_size_12" @click="PAGEDATA.chang_freighttemplate">选择</a-button>
                                            </a-input-group>
                                        </a-form-item>                                    
                                    </a-col>

                                    <a-col :span="8">
                                        <a-form-item
                                            label="尺码模板"
                                            name="size_info_template_id"
                                        >
                                            <a-input-group compact>
                                                <a-input v-model:value="formState.size_info_template_id.name" placeholder="请选择尺码模板" disabled style="width: calc(74%)" />
                                                <a-button @click="PAGEDATA.chang_sizetemplate">选择</a-button>
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
                                        style="font-size: 12px;width: 100%;"
                                    />
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
                            <a-cascader

                                style="width:100%"
                                v-model:value="CATE.cate_name.value"
                                :options="CATE.options.value"
                                :load-data="CATE.loadData"
                                @change="CATE.loadFormat"
                                :allowClear="false"
                                placeholder="选择分类"
                            />
                        </p>

                        <a-divider orientation="left" orientation-margin="0px">
                            属性
                        </a-divider>

                        <a-form :ref="CATE.form_ref" :model="CATE.format_formRef">

                            <a-row v-if="CATE.format.value.length !== 0" loading="true" :gutter="[16,6]">

                                <a-col v-for="item in CATE.format.value" :span="6">
                                    
                                    <!--输入文本 required-->
                                    <div v-if="item.type == 'text'">
                                        <p>
                                            {{ item.property_name }}
                                            <span v-if="item.required ==1" style="color: red;">--必填</span>
                                        </p>
                                        <p v-if="item.required == 1">
                                            <a-form-item :name="item.property_id" :rules="[{ required: true, message: '不能为空！',trigger: 'change',}]">
                                            <a-input 
                                                type="text" 
                                                placeholder="请输入"
                                                autoComplete="off"
                                                allow-clear
                                                v-model:value="CATE.format_formRef[item.property_id]"
                                                @change="CATE.dis_ops(item, CATE.format_formRef[item.property_id])"
                                            />
                                            </a-form-item>
                                        </p>
                                        <p v-else-if="item.required !== 1">
                                            <a-form-item :name="item.property_id">
                                            <a-input 
                                                type="text" 
                                                placeholder="请输入"
                                                autoComplete="off"
                                                allow-clear
                                                v-model:value="CATE.format_formRef[item.property_id]"
                                                @change="CATE.dis_ops(item, CATE.format_formRef[item.property_id])"

                                            />
                                            </a-form-item>
                                        </p>

                                    </div>

                                    <!--单选-->
                                    <div v-if="item.type == 'select'">
                                        <p>
                                            {{ item.property_name }}
                                            <span v-if="item.required ==1" style="color: red;">--必填</span>
                                        </p>

                                        <p v-if="item.required ==1">
                                            <a-form-item :name="item.property_id" :rules="[{ required: true, message: '不能为空！',trigger: 'change',}]">
                                                <a-select
                                                    ref="select"
                                                    v-model:value="CATE.format_formRef[item.property_id]"
                                                    placeholder="请选择"
                                                    allow-clear
                                                    @change="CATE.dis_ops(item, CATE.format_formRef[item.property_id])"
                                                    style="width: 120px;width: 100%;"
                                                >
                                                    <a-select-option v-for="opt in item.options" :value="opt.value_id" >
                                                        {{ opt.name }}
                                                    </a-select-option>
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
                                                    @change="CATE.dis_ops(item, CATE.format_formRef[item.property_id])"
                                                    style="width: 120px;width: 100%;"
                                                >
                                                    <a-select-option v-for="opt in item.options" :value="opt.value_id" >
                                                        {{ opt.name }}
                                                    </a-select-option>
                                                </a-select>
                                            </a-form-item>
                                        </p>
                                    </div>

                                    <!--多选-->
                                    <div v-if="item.type == 'multi_select' || item.type == 'multi_value_measure'">
                                        <p>
                                            {{ item.property_name }}
                                            <span v-if="item.required ==1" style="color: red;">--必填</span>
                                        </p>
                                        <p v-if="item.required == 1">

                                            <a-form-item :name="item.property_id" :rules="[{ required: true, message: '不能为空！',trigger: 'change',}]">

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
                                            </a-select>
                                            </a-form-item>
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

                        </a-form>

                    </a-tab-pane>

                    <a-tab-pane key="4" tab="描述详情">

                        <div style="margin: 0 0 10px 0;">
                            <a-space>
                                <a-button 
                                    type="dashed" 
                                    @click="PAGEDATA.change_material_type('des')" 
                                    block
                                >插入素材</a-button>
                                <a-button type="dashed" block>清空</a-button>
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

                </a-tabs>

            </div>

        </a-layout-content>

        <!--底部按钮--开始-->
        <a-affix :offset-bottom="1">
            <div style="width: 950px;margin: 0 auto;text-align: center;padding: 10px 0 0 0;">
                <a-space align="end" style="height: 100%;">
                    <a-button type="primary" @click="handleOk">提交</a-button>
                    <a-button @click="closed">取消</a-button>
                </a-space>
            </div>
        </a-affix>
        <!--底部按钮--结束-->



    </a-modal>
</template>
<script>
import { defineComponent,defineAsyncComponent,ref,reactive,onMounted,computed,shallowRef,onBeforeUnmount,toRaw } from 'vue';
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
        selectFreightid:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/templatefreight/selectFreightId.vue')),// 运费模板组件
        selectsizetemplateid:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/templateSize/selectsizetemplateid.vue')),// 尺码模板组件
    },
    props: {
        data:{typr:Object}
    },
    setup(props,ctx) {

        const tool = new TOOL.TOOL()            // 工具方法
        const TO = new TABLE.TableOperate()     // 表格操作方法
        const API = new utils.A_Patch()         // 请求接口地址合集
        const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;  // 默认为空图标
        const buttonload= ref(true)             // 新建按钮loading状态；
        const activeKey = ref('1');             // 默认选项卡

        // 分类信息初始化
        onMounted(() => {
            tool.Http_.post(API.AppSrtoreAPI.dou_product.cate, {"cid":0}).then(res=>{
                let obj_list = res.data.data
                CATE.options.value = CATE.get_cate_list(obj_list)
            })
        })

        // 添加商品配置
        const PAGEDATA=reactive({

            selectimg_open:false,          // 添加主图-图片显示状态配置
            freighttemplate_open:false,    // 运费模板-图片显示状态配置
            sizetemplate_open:false,       // 尺码模板-图片显示状态配置

            setimg_name:'',             // 添加图片的对象['PicList','long_img_List','white_img','video','des']
            // 图片组件获取地址后添加到页面容器：：：回调方法
            Add_Callback:(data)=>{
                var type = PAGEDATA.setimg_name;        // 添加类型
                if(type == 'PicList'){                  // 判断回调type：：：主图添加
                    Pic_Fun.add(data)                   // 添加主图方法
                }else if(type == 'long_img_List'){      // 判断回调type：：：3:4长图添加
                    Longimg_Fun.add(data)               // 添加长图方法
                }else if(type == 'white_img'){          // 判断回调type：：：白底图添加
                    whiteimg_Fun.add(data)              // 添加白底图方法
                }else if(type == 'video_info'){
                    video_Fun.add(data)                 // 添加视频方法
                }else if(type == 'des'){
                    // 添加描述详情
                }
            },
            // 变更添加素材类型
            change_material_type:(typeName)=>{
                PAGEDATA.selectimg_open = true;
                PAGEDATA.setimg_name = typeName; // 指定添加图片的对象
            },
            // 选择尺码
            chang_sizetemplate:()=>{
                PAGEDATA.sizetemplate_open = true;
            },
            // 选择运费模板
            chang_freighttemplate:()=>{
                PAGEDATA.freighttemplate_open = true;
            },
        })
        
        // 主图对象
        const Pic_Fun = {

            PicList:ref([]),
            // 删除图片
            del_pic:(index)=>{
                Pic_Fun.PicList.value.splice(index, 1)
            },

            // 添加图片
            add:(data)=>{

                data.forEach((obj,idx)=>{
                    // 判断是否图片素材
                    var material_type = obj.material_type;

                    // console.log(material_type)
                    // 是图片=>添加到数组
                    if(material_type == 'photo'){
                        var photo_info = obj.photo_info;
                        var pic_width = photo_info.width;      // 宽度
                        var pic_height = photo_info.height;     // 高度
                        if(pic_width == pic_height){
                            Pic_Fun.PicList.value.push(obj)
                        }else{
                        
                            tool.Fun_.message('info','主图长宽比例需要1:1,不小于600X600.')
                        
                        }
                    }else if(material_type == 'video'){

                        tool.Fun_.message('info','【主图】不能选择视频，请选择图片素材！')
                    
                    }
                })

                // 只保留5张主图；
                if(Pic_Fun.PicList.value.length > 5){
                    Pic_Fun.PicList.value = Pic_Fun.PicList.value.slice(0, 5)
                    tool.Fun_.message('info','最多上传5张主图')
                }

            },
            
            // 获取主图
            get:()=>{

                var pic = Pic_Fun.PicList.value;
                if(pic.length == 0){
                    return false
                }else{
                    var res_text = ''
                    pic.forEach((obj,index)=>{
                        res_text = res_text + obj.byte_url  + '|'
                    })
                    return res_text.slice(0, -1)
                }
            }

        }

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

        // 基础信息
        const formRef = ref();

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
            // 减库存方式
            reduce_type:[
                {
                    required: true,
                    message: '减库存方式不能为空!',
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
            }]
        }

        const formState = reactive({
            product_type:'0',               // 商品类别
            mobile:'18888888888',           // 客服电话
            name:undefined,                 // 商品标题

            recommend_remark:undefined,     // 推荐语
            pay_type:'1',                   // 支付类型
            reduce_type:'1',                // 减库存类型
            freight_id:{"name":"包邮","value":0},           // 运费模板
            size_info_template_id:{"name":undefined,"value":undefined},// 尺码模板
            commit:'false',                 // 提交
            remark:undefined,               // 商家备注

            limit_per_buyer:undefined,          // 每个用户累计限购件数
            maximum_per_order:undefined,        // 每个用户每次下单限购件数
            minimum_per_order:undefined,        // 每个用户每次下单至少购买的件数
        })


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

            return reactive({
                columns: get_colums(),
                data:get_data()
            }) 
            
        })

        // 分类&属性
        const CATE = {

            cate_name:ref([]),          // 分类

            options:ref([]),            // 分类选项

            select_loading:ref(false),  // 加载状态

            // 商品属性结构数据：：渲染表单格式
            format:ref([]),

            // 表单数据绑定:
            form_ref:ref(),

            format_formRef:reactive({

            }),

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

                Object.keys(CATE.format_formRef).forEach(key => delete CATE.format_formRef[key]); // 清空

                // 加载属性结构
                data_list.forEach((obj,index)=>{

                    var type = obj.type;

                    if(type == 'select' || type == 'multi_select' || type == 'multi_value_measure'){

                        CATE.format_formRef[obj.property_id] = undefined;

                    }else if(type == 'text'){

                        CATE.format_formRef[obj.property_id] = undefined;
                    
                    }

                })

                // console.log(CATE.format_formRef)

                CATE.format.value = res.data.data.data;

            },
            // 多选-禁用超过限制选项
            dis_ops:(item, data)=>{

                if(data !== undefined){// 提交数据不为空时

                    var type = item.type; // 类别
                    var multi_select_max = item.multi_select_max;
                    var result_value = data; // 选中的值
                    var options = item.options; // 选项
                    var diy_type = item.diy_type; // 是否支撑自定义
                    
                    // 文本 text
                    if(type == 'text'){
                        CATE.format_formRef[item.property_id] = {"value":0,"name":result_value,"diy_type":diy_type}
                        // console.log({"value":0,"name":result_value,"diy_type":diy_type})
                    }else if(type == 'select'){// 单选 select

                        var v_name = ''

                        options.forEach((obj,index)=>{
                            if(obj.value_id == data){v_name = obj.name}
                        })
                        CATE.format_formRef[item.property_id] = {"value":data,"name":v_name,"diy_type":diy_type}

                    }else if(type == 'multi_select' || type == 'multi_value_measure'){ // 多选 'multi_select' & 'multi_value_measure'

                        // 迭代选中值
                        var res_lisr = []
                        result_value.forEach((obj,index)=>{
                            var r_name = CATE.select_name(obj,options)
                            var r_obj = {"value":obj,"name":r_name,"diy_type":diy_type}
                            res_lisr.push(r_obj)
                        })

                        CATE.format_formRef[item.property_id] = res_lisr

                        // 选中值--超过限制
                        if(result_value.length >= multi_select_max){

                            // 非选中值添加禁用属性
                            options.forEach((obj,index)=>{

                                var value = obj.value_id;

                                // 过滤选中值
                                if(!result_value.includes(value)){
                                    obj.disabled = true
                                }
                            })

                        }else{// 选中值--没有超过限制

                            // 非选中值添加禁用属性
                            options.forEach((obj,index)=>{
                                obj.disabled = false
                            })

                        }
                    }
                }
            },
            // 获取多选属性值
            select_name:(v_id,op)=>{
                var r_name = ''
                op.forEach((obj,index)=>{
                    var name = obj.name;
                    if(v_id == obj.value_id){
                        // console.log(name)
                        r_name = name
                    }
                })
                return r_name

            },
            // 验证分类&属性值
        }

        // 描述详情
        const editorRef = shallowRef()  // 编辑器实例，必须用 shallowRef
        const DES = {

            // 初始化
            valueHtml:ref('<p></p>'),
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
                    "uploadImage"
                ]
            },
            // 创建编辑器
            handleCreated:(editor) => {
                editorRef.value = editor // 记录 editor 实例，重要！
                editor.clear() // 清空编辑器
            }

        }

        // 选择运费模板==回调方法
        const selectfreight_callback=(data)=>{
            // 填充id
            var f_id = data.id
            var f_name = data.name
            // 填充名称
            formState.freight_id.value = f_id
            formState.freight_id.name = f_name
            // console.log(formState.freight_id)
        }

        // 选择尺码模板==回调方法
        const selectsizetemplate_callback=(data)=>{
            // 填充id
            var s_id = data.id;
            var s_name = data.name;
            // 填充名称
            formState.size_info_template_id.value = s_id
            formState.size_info_template_id.name = s_name
            // console.log(formState.size_info_template_id)
        }

        // 确认按钮
        const handleOk = () => {

            if(!Pic_Fun.get()){// 主图为空时候
                tool.Fun_.message('error','主图不能为空！')
                activeKey.value = '1'
                return ''
                // throw '已终止'
            }else{ // 主图不为空
                formState.pic = Pic_Fun.get();  // 主图-必填
                console.log('主图', Pic_Fun.get())

            }

            // 白底图不为空时候
            if(whiteimg_Fun.get()){
                formState.white_back_ground_pic_url = whiteimg_Fun.get();// 白底图：url(仅素材中心url有效)，白底图比例要求1:1
                console.log('白底图', whiteimg_Fun.get())
            }
            
            // 长图不为空
            if(Longimg_Fun.get()){
                formState.long_pic_url = Longimg_Fun.get();// 长图
                console.log('长图', Longimg_Fun.get())
            }

            if(video_Fun.get()){
                formState.material_video_id = video_Fun.get();// 视频
                var video_obj = video_Fun.get()
                var material_video_id = video_obj[0].material_id;
                console.log('视频素材id', material_video_id)
            }

            // 验证基础信息::图片信息验证
            formRef.value.validate().then(() => {

                console.log('基础信息结果', toRaw(formState));

            }).catch(error => {

                // console.log('error', error);
                tool.Fun_.message('error',error.errorFields[0].errors[0])
                activeKey.value = '1'
                return ''
                // throw '已终止'

            })

            // 规格&库存&验证
            // console.log('规格', toRaw(SPECS.Obj))
            // var res = sku_list
            // console.log('库存', res)

            // 分类信息验证
            var category_leaf_id = toRaw(CATE.cate_name.value);

            if(category_leaf_id.length > 0){// 分类不能为空
                
                console.log('分类id',category_leaf_id)

                // 验证属性

                CATE.form_ref.value.validate().then(()=>{

                    console.log('属性')

                }).catch(error => {

                    console.log('error', error);

                    activeKey.value = '3'
        
                })
            }


            // 属性 无品牌id则传596120136;
            var product_format_new = {
                "property_id":[{"value":'value',"name":"property_name","diy_type":0}]
            }

            // 描述
            var description = 'img_url1|img_url2|img_url3'

            // 仅保存false，保存+提审true
            var commit = ''

            // 规格
            var specs = '颜色|红色,黑色^尺码|S,M'
            var spec_info = ''

            // 规格图片
            var spec_pic = 'img_url,img_url,img_url'

            // 库存
            var spec_prices_v2 = {
            }

            // 限购

            // 商品上传
            const pro_upload_json = {

                "out_product_id":"19840228",

                "product_type":0,

                "category_leaf_id":22438,

                "name":"测试玉兔逢春原创冬季",

                "pic":"https://p3-aio.ecombdimg.com/obj/ecom-shop-material/webp_m_cf827a85c74f7e4c0f0096b9ec7e4464_sx_125536_www800-800",

                "description":"https://p3-aio.ecombdimg.com/obj/ecom-shop-material/webp_m_cf827a85c74f7e4c0f0096b9ec7e4464_sx_125536_www800-800",

                "pay_type":0,

                "reduce_type":1,
                
                "freight_id":0,
                
                "mobile":"13888881818",

                "commit":false,

                "spec_info":{
                    "spec_values":[
                    {
                        "property_name":"颜色",
                        "values":[{"value_name":"粉色", "remark":"可爱的"}]
                    }
                ]},

                "spec_prices_v2":[
                    {
                        "sell_properties":[{"property_name":"颜色","value_name":"粉色"}],
                        "sku_type":0,
                        "stock_num":99,
                        "price":10000
                    }
                ]


            }

            // 上传成功

            // 上传失败
            

        };

        // 关闭新建商品按钮
        const closed = () =>{

            props.data.AddDate = !props.data.AddDate;

        }

        return{
            PAGEDATA,
            Pic_Fun,whiteimg_Fun,Longimg_Fun,video_Fun,        // 主图,白底图,长图,视频
            props,
            activeKey,
            formState,
            formRef,
            SPECS,
            CATE,
            sku_list,
            simpleImage,
            // 描述详情
            editorRef,DES,
            // 提交，关闭
            handleOk,closed,
            rules,
            selectfreight_callback,
            selectsizetemplate_callback,
            
        }
    }
})

</script>
<style scoped>
.content{padding: 0;margin: 0;background: '#fff';overflow-y: auto;overflow-x: hidden;height: 90vh;}
.img_pic{height: 100px;width: 100px;background-color: #f2f2f2;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;}
.img_3_4_pic{height: 132px;width: 99px;background-color: #f2f2f2;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;text-align: center;}
.Add_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.Add_3_4_img{height: 132px;width: 99px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_3_4_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.add_btn_class{width: 40px; margin:0 0 0 20px;}
</style>