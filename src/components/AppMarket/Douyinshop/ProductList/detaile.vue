<template>
    <a-modal
      v-model:open="props.data.DetaileDate"
      title="商品详情"
      width="100%"
      wrap-class-name="full-modal"
      @ok="handleOk"
    >
    
    <a-layout-content class="content">

        <div style="width: 950px;margin: 0 auto;">   

        
        <!--头图 标题-->
        <div class="head_title_img">

            <a-row :gutter="[16,16]">
                <a-col :span="16">
                    <div v-if="productdata.obj.name !== undefined" style="width: 100px;height:100px;float: left;margin: 20px;">
                        <a-image :src="productdata.obj.img" alt="" style="width: 100%;height: 100%;border-radius: 6px;" />
                    </div>
                    <div v-if="productdata.obj.name === undefined" style="width: 100px;height: 100px;float: left;margin: 20px;text-align: center;border-radius: 6px;">
                        <a-skeleton-image style="width: 100px;height: 100px;" active />
                    </div>

                    <div  style="width: 100%;margin: 30px 0 0 0;">
                        
                        <p v-if="productdata.obj.name !== undefined" style="margin:10px 0 10px 0;padding: 0;">
                            <a-row>
                                <a-col :span="3">
                                    主标题： 
                                </a-col>
                                <a-col :span="21">
                                    {{ productdata.obj.name }}
                                </a-col>
                            </a-row>
                        </p>
                        <p v-if="productdata.obj.name === undefined" style="margin: 0;padding: 0;">
                                <a-row>
                                <a-col :span="3">
                                    主标题： 
                                </a-col>
                                <a-col :span="21">
                                    <a-skeleton :title="false" :paragraph="{ rows: 1}" active/>
                                </a-col>
                            </a-row>
                        </p>

                        <p v-if="productdata.obj.short_product_name !== undefined" style="margin: 0 0 12px 0;padding: 0;">
                            <a-row>
                                <a-col :span="3">
                                    短标题： 
                                </a-col>
                                <a-col :span="21">
                                    {{ Profun.Field_translation.short_product_name(productdata.obj.short_product_name) }}
                                </a-col>
                            </a-row>
                        </p>
                        <p v-if="productdata.obj.short_product_name === undefined" style="margin: 0;padding: 0;">
                                <a-row>
                                    <a-col :span="3">
                                        短标题： 
                                    </a-col>
                                    <a-col :span="21">
                                        <a-skeleton :title="false" :paragraph="{ rows: 1}" style="width: 70%;" active/>
                                    </a-col>
                            </a-row>
                        </p>

                        <p style="height: 24px;width: 100%;margin: 0;padding: 0;">
                            <a-row justify="start">
                                <a-col :span="3">划线价:</a-col>
                                <a-col :span="4">
                                    <span v-if="productdata.obj.market_price === undefined">
                                        <a-skeleton :title="false" :paragraph="{ rows: 1}" active/>
                                    </span>
                                    <span v-if="productdata.obj.market_price !== undefined">
                                        <a-typography-text delete>￥{{ productdata.obj.market_price }}</a-typography-text>
                                    </span>
                                </a-col>
                                <a-col :span="2"><span>售卖价</span></a-col>
                                <a-col :span="4">
                                    <span v-if="productdata.obj.discount_price === undefined">
                                        <a-skeleton :title="false" :paragraph="{ rows: 1}" active/>
                                    </span>
                                    <span v-if="productdata.obj.discount_price !== undefined">￥{{ productdata.obj.discount_price }}</span>
                                </a-col>
                                <!-- <a-col :span="4">
                                    <span>价格凭证</span>
                                    <span>￥{{ productdata.obj.original_price }}</span>
                                </a-col> -->
                                <a-col :span="2"><span>销量</span></a-col>
                                <a-col :span="4">
                                    <span v-if="productdata.obj.sell_num === undefined">
                                        <a-skeleton :title="false" :paragraph="{ rows: 1}" active/>
                                    </span>
                                    <span v-if="productdata.obj.sell_num !== undefined">{{ productdata.obj.sell_num }}</span>
                                </a-col>
                            </a-row>
                        </p>

                    </div>


                </a-col>
                <a-col :span="8">
                    <div class="zhenduan">
                    </div>
                </a-col>
            </a-row>
        </div>

        <!--图片：主图、白底图、视频、长图3:4、主图3:4-->
        <a-divider orientation="left" orientation-margin="0px">主图&视频</a-divider>

        <div class="top_img_box">

            <!---img-->
            <div style="height: 140px;float: left;margin: 0 10px 0 0;">
                <h5>商品主图</h5>
                <div v-if="productdata.obj.pic === undefined">
                    <a-space>
                        <a-skeleton-avatar :size="80" active shape="square"/>
                        <a-skeleton-avatar :size="80" active shape="square"/>
                        <a-skeleton-avatar :size="80" active shape="square"/>
                        <a-skeleton-avatar :size="80" active shape="square"/>
                        <a-skeleton-avatar :size="80" active shape="square"/>
                    </a-space>
                </div>
                <div v-else-if="productdata.obj.pic !== undefined">
                    <a-image-preview-group>
                        <a-space>
                            <div v-for="img in productdata.obj.pic" :key="img.index">
                                <a-image :src="img" :width="80" style="border-radius: 6px;" />
                            </div>
                        </a-space>
                    </a-image-preview-group>
                </div>
            </div>

            <!--white_back_ground_pic_url-->
            <div style="height: 120px;float: left;">
                <div style="width: 90px;float: left;">
                    <div v-if="productdata.obj.white_back_ground_pic_url === undefined">
                        <h5>白底图</h5>
                        <a-skeleton-avatar :size="80" active shape="square" style="margin: 0 4px 0 0;"/>
                    </div>
                    <div v-else-if="productdata.obj.white_back_ground_pic_url === null">
                        <h5>白底图-暂无</h5>
                        <a-skeleton-avatar :size="80" active shape="square" style="margin: 0 4px 0 0 ;"/>
                    </div>
                    <div v-else-if="productdata.obj.white_back_ground_pic_url !== null">
                        <h5>白底图</h5>
                        <a-image :width="80" :src="productdata.obj.white_back_ground_pic_url"></a-image>
                    </div>
                </div>

                <div style="width: 120px;float: left;" v-if="productdata.obj.material_video_id === undefined">
                    <h5>视频-暂无</h5>
                    <a-skeleton-avatar :size="80" active shape="square" />
                </div>
                <div style="width: 120px;float: left;" v-else-if="productdata.obj.material_video_id === null">
                    <h5>视频-暂无</h5>
                    <a-skeleton-avatar :size="80" active shape="square"/>
                </div>
                <div style="width: 120px;float: left;" v-else>
                    <img :src="productdata.obj.material_video_id" style="width: 80px;height: 80px;" />
                    {{ productdata.obj.material_video_id }}
                </div>
            </div>
            
            <div style="height: 120px;float: left;width: 100%;clear: both;">

                <div style="height: 120px;float: left;margin: 0 10px 0 0 ;">
                    <div v-if="productdata.obj.main_pic_3_4 === undefined">
                        <h5>3:4主图</h5>
                        <a-space>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                        </a-space>
                    </div>
                    <div v-else-if="productdata.obj.main_pic_3_4.length === 0">
                        <h5>3:4主图-暂无</h5>
                        <a-space>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                        </a-space>

                    </div>
                    <div v-else-if="productdata.obj.main_pic_3_4.length > 0 ">
                        <h5>3:4主图</h5>
                        <a-image-preview-group>
                            <a-space>
                                <div v-for="img in productdata.obj.main_pic_3_4" :key="img.index">
                                    <a-image :src="img" :width="80" style="border-radius: 6px;" />
                                </div>
                            </a-space>
                        </a-image-preview-group>
                    </div>
                    <div v-else>
                    </div>
                </div>

                <div style="height: 120px;float: left;">
                    <div v-if="productdata.obj.main_image_three_to_four=== undefined">
                        <h5>3:4长图</h5>
                        <a-space>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                        </a-space>
                    </div>
                    <div v-else-if="productdata.obj.main_image_three_to_four.length > 2">
                        <h5>3:4长图</h5>
                        <a-image-preview-group>
                            <a-space>
                                <div v-for="img in productdata.obj.main_image_three_to_four.slice(1,-1).split(' ')" :key="img.index">
                                    <a-image :src="img" :width="80" style="border-radius: 6px;" />
                                </div>
                            </a-space>
                        </a-image-preview-group>
                    </div>
                    <div v-else-if="productdata.obj.main_image_three_to_four.length === 2">
                        <h5>3:4长图-暂无</h5>
                        <a-space>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                            <div class="img_loading_3_4"></div>
                        </a-space>
                    </div>
                </div>
            </div>

        </div>

        <a-divider orientation="left" orientation-margin="0px">基本信息</a-divider>

        <div style="height: 200px;width: 100%;">
            <a-row :gutter="[16,6]">
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">商品id</div>
                            <div v-if="productdata.obj.product_id === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.product_id !== undefined" class="basestyle">
                                {{ productdata.obj.product_id }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">外部商家编码</div>
                            <div v-if="productdata.obj.out_product_id === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.out_product_id !== undefined" class="basestyle">
                                {{ productdata.obj.out_product_id }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">商品类型</div>
                            <div v-if="productdata.obj.product_type === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.product_type !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_type_info(productdata.obj.product_type) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">商品状态</div>
                            <div v-if="productdata.obj.status === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.status !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_status(productdata.obj.status ) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">审核状态</div>
                            <div v-if="productdata.obj.check_status === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.check_status !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_check_status_info(productdata.obj.check_status) }}
                            </div>

                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">草稿状态</div>
                            <div v-if="productdata.obj.draft_status === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.draft_status !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_draft_status_info(productdata.obj.draft_status) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">售卖方式</div>
                            <div v-if="productdata.obj.sell_channel === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.sell_channel !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_sale_type_info(productdata.obj.sell_channel) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">库存扣减方式 </div>
                            <div v-if="productdata.obj.reduce_type === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.reduce_type !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_reduce_type(productdata.obj.reduce_type) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">售后服务</div>
                            <div v-if="productdata.obj.after_sale_service_v2 === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.after_sale_service_v2 !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_after_sale_service_v2(productdata.obj.after_sale_service_v2) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">7天无理由</div>
                            <div v-if="productdata.obj.after_sale_service === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.after_sale_service !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_after_sale_service(productdata.obj.after_sale_service) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">运费模版ID</div>
                            <div v-if="productdata.obj.freight_id === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.freight_id === 0" class="basestyle">
                                包邮
                            </div>
                            <div v-if="productdata.obj.freight_id !== 0 && productdata.obj.freight_id !== undefined" class="basestyle">
                               <a href="#">查看</a> {{ productdata.obj.freight_id }}
                            </div>

                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">尺码模板ID</div>
                            <div v-if="productdata.obj.size_info_template_id === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-else-if="productdata.obj.size_info_template_id === null" class="basestyle">
                                暂无
                            </div>
                            <div v-else class="basestyle">
                                <a href="#">查看</a> {{ productdata.obj.size_info_template_id }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">品牌</div>
                            <div v-if="productdata.obj.standard_brand_id === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.standard_brand_id === 596120136" class="basestyle">无品牌</div>
                            <div v-if="productdata.obj.standard_brand_id !== 596120136 && productdata.obj.standard_brand_id !== undefined" class="basestyle">
                               <a href="#">查看</a> {{ productdata.obj.standard_brand_id }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">提取方式</div>
                            <div v-if="productdata.obj.pickup_method === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.pickup_method !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_pickup_method(productdata.obj.pickup_method) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">重量 </div>
                            <div v-if="productdata.obj.weight_value === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.weight_value !== undefined" class="basestyle">
                                {{ productdata.obj.weight_value }} {{ Profun.Field_translation.product_weight_unit(productdata.obj.weight_unit) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">创建时间</div>
                            <div v-if="productdata.obj.create_time === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div style="height: 24px;width: 100%;">{{ productdata.obj.create_time }}</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">更新时间</div>
                            <div v-if="productdata.obj.update_time === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div style="height: 24px;width: 100%;">{{ productdata.obj.update_time }}</div>
                        </a-col>
            </a-row>
        </div>

        <a-divider orientation="left" orientation-margin="0px">规格库存</a-divider>

        <div style="width: 100%;">
            <a-row :gutter="[16,16]">

                        <a-col :span="24">
                            <div v-for="(item,index) in productdata.obj.specs" :key="index" style="margin: 0 0 10px 0;clear:both;">
                                <a-badge-ribbon placement="start" :text="item.name">
                                    <a-card title=" " size="small">
                                        <span class="font_size_12 specbox" v-for="(val,index) in item.values" :key="index">
                                            <img :src="val.pic" width="20px"/>
                                            {{ val.name }}
                                        </span>
                                    </a-card>
                                </a-badge-ribbon>
                            </div>

                            <div>
                                  <a-table 
                                  :columns="columns" 
                                  :data-source="data" 
                                  size="small" 
                                  :pagination="false"
                                  style="font-size:12px;"
                                  bordered
                                  >

                                    <template #bodyCell="{ column, text }">
                                        <template v-if="column.dataIndex === 'price'">
                                            <span >￥ {{ text }}</span>
                                        </template>
                                    </template>
                                </a-table>
                            </div>

                        </a-col>

                    </a-row>

        </div>


        <a-divider orientation="left" orientation-margin="0px">类目&属性</a-divider>
        <div style="width: 100%;margin: 0 0 40px 0;">
            <a-badge-ribbon placement="start" text="当前类目">
                <a-card title=" " size="small">
                    <span>书信</span>
                </a-card>
            </a-badge-ribbon>
        </div>


        <a-divider orientation="left" orientation-margin="0px">描述详情</a-divider>

        <div style="width: 100%; padding: 12px 0 0 0;">

            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="基础信息" force-render>
                    <a-row :gutter="[16,16]">
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">商品id</div>
                            <div v-if="productdata.obj.product_id === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.product_id !== undefined" class="basestyle">
                                {{ productdata.obj.product_id }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">外部商家编码</div>
                            <div v-if="productdata.obj.out_product_id === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.out_product_id !== undefined" class="basestyle">
                                {{ productdata.obj.out_product_id }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">商品类型</div>
                            <div v-if="productdata.obj.product_type === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.product_type !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_type_info(productdata.obj.product_type) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">商品状态</div>
                            <div v-if="productdata.obj.status === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.status !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_status(productdata.obj.status ) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">审核状态</div>
                            <div v-if="productdata.obj.check_status === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.check_status !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_check_status_info(productdata.obj.check_status) }}
                            </div>

                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">草稿状态</div>
                            <div v-if="productdata.obj.draft_status === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.draft_status !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_draft_status_info(productdata.obj.draft_status) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">售卖方式</div>
                            <div v-if="productdata.obj.sell_channel === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.sell_channel !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_sale_type_info(productdata.obj.sell_channel) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">库存扣减方式 </div>
                            <div v-if="productdata.obj.reduce_type === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.reduce_type !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_reduce_type(productdata.obj.reduce_type) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">售后服务</div>
                            <div v-if="productdata.obj.after_sale_service_v2 === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.after_sale_service_v2 !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_after_sale_service_v2(productdata.obj.after_sale_service_v2) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">7天无理由</div>
                            <div v-if="productdata.obj.after_sale_service === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.after_sale_service !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_after_sale_service(productdata.obj.after_sale_service) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">运费模版ID</div>
                            <div v-if="productdata.obj.freight_id === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.freight_id === 0" class="basestyle">
                                包邮
                            </div>
                            <div v-if="productdata.obj.freight_id !== 0 && productdata.obj.freight_id !== undefined" class="basestyle">
                               <a href="#">查看</a> {{ productdata.obj.freight_id }}
                            </div>

                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">尺码模板ID</div>
                            <div v-if="productdata.obj.size_info_template_id === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-else-if="productdata.obj.size_info_template_id === null" class="basestyle">
                                暂无
                            </div>
                            <div v-else class="basestyle">
                                <a href="#">查看</a> {{ productdata.obj.size_info_template_id }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">品牌</div>
                            <div v-if="productdata.obj.standard_brand_id === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.standard_brand_id === 596120136" class="basestyle">无品牌</div>
                            <div v-if="productdata.obj.standard_brand_id !== 596120136 && productdata.obj.standard_brand_id !== undefined" class="basestyle">
                               <a href="#">查看</a> {{ productdata.obj.standard_brand_id }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">提取方式</div>
                            <div v-if="productdata.obj.pickup_method === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.pickup_method !== undefined" class="basestyle">
                                {{ Profun.Field_translation.product_pickup_method(productdata.obj.pickup_method) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">重量 </div>
                            <div v-if="productdata.obj.weight_value === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div v-if="productdata.obj.weight_value !== undefined" class="basestyle">
                                {{ productdata.obj.weight_value }} {{ Profun.Field_translation.product_weight_unit(productdata.obj.weight_unit) }}
                            </div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">创建时间</div>
                            <div v-if="productdata.obj.create_time === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div style="height: 24px;width: 100%;">{{ productdata.obj.create_time }}</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">更新时间</div>
                            <div v-if="productdata.obj.update_time === undefined">
                                <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                            </div>
                            <div style="height: 24px;width: 100%;">{{ productdata.obj.update_time }}</div>
                        </a-col>
                    </a-row>
                    

                </a-tab-pane>
                <a-tab-pane key="2" tab="图片视频">

                            <div style="width: 400px;float: left;">
                                <div class="desbox">
                                    <h5 style="color: #fff;">详情描述</h5>
                                    <div v-html="productdata.obj.description" style="height: 480px; width: 320px;overflow-y: scroll;"></div>
                                </div>
                            </div>

                            <div style="width: 500px;float: left;">
                                <div>
                                    <h5>商品主图</h5>
                                    <div v-if="productdata.obj.pic === undefined">
                                        <a-space>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                        </a-space>
                                    </div>
                                    <div v-else-if="productdata.obj.pic !== undefined">
                                        <a-image-preview-group>
                                            <a-space>
                                                <div v-for="img in productdata.obj.pic" :key="img.index">
                                                    <a-image :src="img" :width="80" style="border-radius: 6px;" />
                                                </div>
                                            </a-space>
                                        </a-image-preview-group>
                                    </div>
                                </div>

                                <div style="margin:30px 0;height: 100px; width: 100%;clear: both;">
                                    <div style="width: 200px;height: 100px;float: left;">
                                        <div v-if="productdata.obj.white_back_ground_pic_url === undefined">
                                            <h5>白底图</h5>
                                            <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px 0 0 0;"/>
                                        </div>
                                        <div v-else-if="productdata.obj.white_back_ground_pic_url === null">
                                            <h5>白底图-暂无</h5>
                                            <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px 0 0 0;"/>
                                        </div>
                                        <div v-else-if="productdata.obj.white_back_ground_pic_url !== null">
                                            <h5>白底图</h5>
                                            <a-image :width="80" :src="productdata.obj.white_back_ground_pic_url"></a-image>
                                        </div>
                                    </div>
                                    <div style="width: 200px;height: 100px;float: left;">
                                        <div v-if="productdata.obj.material_video_id === undefined">
                                            <h5>视频-暂无</h5>

                                            <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px 0 0 0;"/>
                                        </div>
                                        <div v-else-if="productdata.obj.material_video_id === null">
                                            <h5>视频-暂无</h5>
                                            <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px 0 0 0;"/>
                                        </div>
                                        <div v-else>
                                            <img :src="productdata.obj.material_video_id" style="width: 80px;height: 80px;" />
                                            {{ productdata.obj.material_video_id }}
                                        </div>
                                    </div>
                                </div>

                                <div style="margin:30px 0;">
                                    <div v-if="productdata.obj.main_pic_3_4 === undefined">
                                        <h5>3:4主图</h5>
                                        <a-space>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                        </a-space>
                                    </div>
                                    <div v-else-if="productdata.obj.main_pic_3_4.length === 0">
                                        <h5>3:4主图-暂无</h5>
                                        <a-space>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                        </a-space>

                                    </div>
                                    <div v-else-if="productdata.obj.main_pic_3_4.length > 0 ">
                                        <h5>3:4主图</h5>
                                        <a-image-preview-group>
                                            <a-space>
                                                <div v-for="img in productdata.obj.main_pic_3_4" :key="img.index">
                                                    <a-image :src="img" :width="80" style="border-radius: 6px;" />
                                                </div>
                                            </a-space>
                                        </a-image-preview-group>
                                    </div>
                                    <div v-else>
                                    </div>
                                </div>

                                <div style="margin:30px 0;">
                                    <div v-if="productdata.obj.main_image_three_to_four=== undefined">
                                        <h5>3:4长图</h5>
                                        <a-space>
                                            <div class="img_loading_3_4"></div>
                                            <div class="img_loading_3_4"></div>
                                            <div class="img_loading_3_4"></div>
                                            <div class="img_loading_3_4"></div>
                                            <div class="img_loading_3_4"></div>

                                        </a-space>
                                    </div>
                                    <div v-else-if="productdata.obj.main_image_three_to_four.length > 2">
                                        <h5>3:4长图</h5>
                                        <a-image-preview-group>
                                            <a-space>
                                                <div v-for="img in productdata.obj.main_image_three_to_four.slice(1,-1).split(' ')" :key="img.index">
                                                    <a-image :src="img" :width="80" style="border-radius: 6px;" />
                                                </div>
                                            </a-space>
                                        </a-image-preview-group>
                                    </div>
                                    <div v-else-if="productdata.obj.main_image_three_to_four.length === 2">
                                        <h5>3:4长图-暂无长图</h5>
                                        <a-space>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                            <a-skeleton-avatar :size="80" active shape="square"/>
                                        </a-space>
                                    </div>
                                </div>
                            </div>

                </a-tab-pane>
                <a-tab-pane key="3" tab="规格库存">

                    <a-row :gutter="[16,16]">

                        <a-col :span="12">
                            <div v-for="(item,index) in productdata.obj.specs" :key="index" style="margin: 0 0 10px 0;clear:both;">
                                <a-badge-ribbon placement="start" :text="item.name">
                                    <a-card title=" " size="small">
                                        <span class="font_size_12 specbox" v-for="(val,index) in item.values" :key="index">
                                            <img :src="val.pic" width="20px"/>
                                            {{ val.name }}
                                        </span>
                                    </a-card>
                                </a-badge-ribbon>
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div>
                                  <a-table 
                                  :columns="columns" 
                                  :data-source="data" 
                                  size="small" 
                                  :pagination="false"
                                  style="font-size:12px;"
                                  bordered
                                  >

                                    <template #bodyCell="{ column, text }">
                                        <template v-if="column.dataIndex === 'price'">
                                            <span >￥ {{ text }}</span>
                                        </template>
                                    </template>
                                </a-table>
                            </div>

                        </a-col>

                    </a-row>
                    
                </a-tab-pane>
                <a-tab-pane key="4" tab="类目属性">
                    <div style="margin-bottom: 20px;">
                        <h5>商品类目</h5>
                        <div v-if="productdata.obj.category_detail !== undefined">
                            <span v-if="productdata.obj.category_detail.first_cname !== undefined">
                                {{ productdata.obj.category_detail.first_cname }}
                            </span>
                            <span v-if="productdata.obj.category_detail.second_cname !== undefined && productdata.obj.category_detail.second_cname !== ''">
                               > {{ productdata.obj.category_detail.second_cname }}
                            </span>
                            <span v-if="productdata.obj.category_detail.third_cname !== undefined && productdata.obj.category_detail.third_cname !== ''">
                               > {{ productdata.obj.category_detail.third_cname }}
                            </span>
                            <span v-if="productdata.obj.category_detail.fourth_cname !== undefined && productdata.obj.category_detail.fourth_cname !== ''">
                               > {{ productdata.obj.category_detail.fourth_cname }}
                            </span>
                        </div>
                    </div>

                    <h5>商品属性</h5>
                    <a-row :gutter="[16,16]" v-if="productdata.obj.category_detail !== undefined">
                        <a-col v-for="item in JSON.parse(productdata.obj.product_format_new)" :key="item" :span="4">
                            <div>
                                {{ item[0].PropertyName }} : 
                                <span v-for="val in item" :key="val">{{ val.Name }} </span>
                            </div>
                        </a-col>
                    </a-row>
                </a-tab-pane>

                <a-tab-pane key="6" tab="商品诊断">
                    
                    <div>质量分 <a-rate :value="2" disabled /> 质量等级 L3 </div>
                    <a-divider orientation="left">可优化问题项</a-divider>
                    <a-row :gutter="[16,16]">
                        <a-col :span="4">
                            <h3>问题字段：：标题</h3>
                            <p>问题描述：详情页图片较少</p>
                            <div>问题建议：商品素材缺少，详情页的图片说明较少。促进商品购买的决策性信息过少，影响购买，建议丰富商品信息，上传不少于5张详情图片，将商品优势展示出来</div>
                        </a-col>
                            <a-col :span="4">
                            <h3>问题字段：：标题</h3>
                            <p>问题描述：详情页图片较少</p>
                            <div>问题建议：商品素材缺少，详情页的图片说明较少。促进商品购买的决策性信息过少，影响购买，建议丰富商品信息，上传不少于5张详情图片，将商品优势展示出来</div>
                        </a-col>
                            <a-col :span="4">
                            <h3>问题字段：：标题</h3>
                            <p>问题描述：详情页图片较少</p>
                            <div>问题建议：商品素材缺少，详情页的图片说明较少。促进商品购买的决策性信息过少，影响购买，建议丰富商品信息，上传不少于5张详情图片，将商品优势展示出来</div>
                        </a-col>
                            <a-col :span="4">
                            <h3>问题字段：：标题</h3>
                            <p>问题描述：详情页图片较少</p>
                            <div>问题建议：商品素材缺少，详情页的图片说明较少。促进商品购买的决策性信息过少，影响购买，建议丰富商品信息，上传不少于5张详情图片，将商品优势展示出来</div>
                        </a-col>
                    </a-row>

                    

                </a-tab-pane>



            </a-tabs>

        </div>

        
        </div>
    </a-layout-content>
    




    </a-modal>
</template>
<script>
import { defineComponent,ref,reactive,onMounted,h } from 'vue';
import {LoadingOutlined} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

// 网络请求工具引用
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import * as PL from '@/assets/douyinshop/ProductList';
// 视频组件

export default defineComponent({

    name: "detaile",  // 筛选条件查询组件

    // 引用组件
    components: {
        LoadingOutlined,
    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },
    
    setup(props, ctx) {

        // 视频播放配置
        const v_url = ref('https://v6-fxg.douyinvod.com/542fa61d96beba06566b7778ac7d5bd8/688c2755/video/tos/cn/tos-cn-v-2e5523/okyyhIsEBhAWlAqSQif5CgQl9ijgHzATizd4UU/?a=1215&ch=0&cr=0&dr=0&er=0&lr=default&cd=0%7C0%7C0%7C0&br=3255&bt=3255&cs=0&ds=4&ft=teX5HklEBBkq8ZmoESEW-_vjVQWw&mime_type=video_mp4&qs=0&rc=ZDdkOztkPGRkaDZmNmk2OkBpamw6cm05cnBkeDQzNGY1M0BeYjIuMl80XzUxMy4uNDUxYSNibjFlMmRjal5gLS1kNC9zcw%3D%3D&btag=80000e00010000&dy_q=1754011954&feature_id=2e1813f3872a2105acee44623dff2864&l=202508010932340DECD301A163E82D722F');
        const v_url2 = ref('https://cloud.video.taobao.com/play/u/2219764638267/p/2/e/6/t/1/518487784753.mp4');

        const video_options = reactive({
            width: '320px',     //播放器高度
            height: '480px',    //播放器高度
            color: "#409eff",   //主题色
            title: '',          //视频名称
            muted: false,       //静音
            webFullScreen: false,
            speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
            autoPlay: false, //自动播放
            loop: false, //循环播放
            mirror: false, //镜像画面
            ligthOff: false,  //关灯模式
            volume: 0.3, //默认音量大小
            control: true, //是否显示控制
            controlBtns:['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'], //显示所有按钮,
            src: v_url2, //视频源
        })

        const indicator = h(LoadingOutlined, {
        style: {
            fontSize: '24px',
            color:'#999'
        },
        spin: true,
        });
        const tool = new TOOL.TOOL()            // 工具方法
        const API = new utils.A_Patch()         // 请求接口地址合集
        const Profun = new PL.ProductList_fun() // 商品列表方法model引用

        const productdata = reactive({
            obj:ref({})
        })

        // 库存列表
        const columns = ref([])
        const data = ref([])

        // 选项卡默认选择
        const activeKey = ref('1');

        // 获取商品id
        // console.log(props.data.product_id)


        // 请求商品详情信息
        onMounted(()=>{
            
            tool.Http_.post(API.AppSrtoreAPI.dou_product.detaile, {

                product_id:props.data.product_id,
                show_draft:"false"

            }).then((responese)=>{

                setTimeout(()=>{
                    console.log('资质',responese.data.data.quality_list)

                    // console.log('视频',responese.data.data.material_video_id)

                    // console.log('规格图片',responese.data.data.spec_pics)                   // 规格图片
                    // console.log('商品sku详情',responese.data.data.spec_prices)              // spec_prices
                    // console.log('规格信息，规格项和规格值',responese.data.data.specs)         // 规格信息，规格项和规格值
                    // console.log('规格id',responese.data.data.spec_id)                       // 规格id
                    // sell_properties
                    // console.log('sell_properties',responese.data.data.spec_prices[0].sell_properties)       // sell_properties
                    var sell_p = responese.data.data.spec_prices[0].sell_properties
                    
                    // 表头
                    var column_list = []
                    for(let i=0;i<sell_p.length;i++){
                        column_list.push({
                            title:sell_p[i].property_name,
                            dataIndex:sell_p[i].property_name,
                        })
                    }
                    var c_obj = [...column_list,...[{
                        title:'价格',
                        dataIndex:'price',
                        align:'center',
                    },{
                        title:'库存',
                        dataIndex:'stock_num',
                        align:'center'

                    },{
                        title:'编码',
                        dataIndex:'code',
                    }]]
                    
                    // 内容
                    var data_list = []

                    var spec_obj = responese.data.data.spec_prices
                    for(let i=0;i<spec_obj.length;i++){
                        let o = {}
                        let r = spec_obj[i].sell_properties
                        for(let j of r){o[j.property_name] = j.value_name}
                        o.key = i;
                        o.price = Math.round(spec_obj[i].price * 0.01 * 100) / 100;
                        o.stock_num = spec_obj[i].stock_num;
                        o.code = spec_obj[i].code;
                        data_list.push(o)
                    }

                    // console.log('白底图',responese.data.data.white_back_ground_pic_url)
                    // console.log('商品主图',responese.data.data.pic)
                    // var three_to_four = responese.data.data.main_image_three_to_four
                    // console.log('商品长图3:4',typeof three_to_four,three_to_four.length,three_to_four)
                    // console.log('商品长图3:4',typeof three_to_four,three_to_four.length,three_to_four)
                    // 品牌
                    // 视频
                    // 运费
                    // 尺码

                    columns.value = c_obj
                    data.value = data_list
                    productdata.obj = responese.data.data

                },1000)
            
            })


            // 品牌查询
            const load_get_brand=(b_id)=>{
                // 无品牌
                // 有品牌

            }
            // 视频查询
            const load_get_video=(v_id)=>{
            }
            // 运费模板查询
            const load_get_freight=(f_id)=>{
            }
            // 尺码模板查询
            const load_get_size=(s_id)=>{

            }
            // 规格转移-规格图片、规格、库存列表
            const load_spec=(s_pic,s_ob,s_list)=>{

            }
            // 类目、属性列表
            const load_cate_format=(f_id)=>{

            }

        })

        const handleOk = e => {
            console.log(e);
        };


        return{
            Profun,
            indicator,
            productdata,
            activeKey,
            props,
            handleOk,
            v_url,
            video_options,
            columns,
            data
        }
    }
    
})
</script>
<style scoped>
.content{padding: 0;margin: 0;background: '#fff';overflow-y: auto;overflow-x: hidden;height: 88vh;}
.head_title_img{height: 140px;background-color: aliceblue;}
.zhenduan{height: 100px;width: 100%;margin-top:20px;}
.top_img_box{height: 304px; width: 100%;}
.img_loading_3_4{width: 80px;height: 107px;background-color: #f2f2f2;text-align: center;border-radius: 6px;}
.skelestlye{margin: 0;padding: 0;width: 100%;}
.basestyle{height: 30px;width: 100%;}
.desbox{width: 340px;height: 526px;background-color: #333;padding: 10px;border-radius:6px;}
.specbox{display: block;float: left;margin:0 10px 10px 0;}
</style>