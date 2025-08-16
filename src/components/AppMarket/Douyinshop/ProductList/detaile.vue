<!-- 商品详情 组件 -->
<template>
    <!--尺码模板-->
    <template_detaile_components v-if="size_detaile.open" :data="size_detaile"/>
    <!--运费模板-->
    <feight_detaile_components v-if="feight_detaile.open" :data="feight_detaile"/>

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
            <div>
                <a-row>
                    <a-col :span="7" style="background-color: aliceblue;border-radius: 6px;">

                        <div class="zhenduan">

                            <div v-if="productdata.obj.check_status === undefined" style="text-align: center;padding: 50px 0 0 0">
                                <a-spin tip="Loading...">
                                </a-spin>
                            </div>

                            <div v-if="productdata.obj.check_status === 1" style="text-align: center;border-radius: 6px;padding:20px 0 0 0;">
                                <div class="check_ico"><InfoCircleTwoTone /></div>
                                <p>商品待提交</p>
                            </div>

                            <div v-if="productdata.obj.check_status === 2" style="text-align: center;border-radius: 6px;padding:20px 0 0 0;">
                                <div class="check_ico"><ClockCircleTwoTone /></div>
                                <p>商品待审核</p>
                            </div>
                            
                            <div v-if="productdata.obj.check_status === 3" style="text-align: center;padding:6px 0 0 0;">
                                <div class="check_ico"><CheckCircleTwoTone /></div>
                                <p style="margin: 0;padding: 0;">审核通过 <a href="#" @click="showDrawer">查看优化建议</a></p>
                                <p style="margin: 0;padding: 0;"><a-rate :value="fen.value" disabled /></p>
                            </div>

                            <div v-if="productdata.obj.check_status === 4" style="text-align: center;padding:20px 0 0 0;">
                                <div class="check_ico"><CloseCircleTwoTone /></div>
                                <p>审核未通过 <a href="#" @click="showreject">查看驳回原因</a></p>
                            </div>

                            <div v-if="productdata.obj.check_status === 5" style="text-align: center;padding:20px 0 0 0;">
                                <div class="check_ico"><WarningTwoTone /></div>
                                <p>封禁 <a href="#" @click="showreject">查看驳回原因</a></p>
                            </div>

                            <div v-if="productdata.obj.check_status === 7" style="padding: 20px 0 0 0;text-align: center;">
                                <div class="check_ico"><UpSquareTwoTone /></div>
                                审核通过待上架
                            </div>
                        </div>
                        <!--提示错误，-->
                    </a-col>

                    <a-col :span="16" :offset="1" style="background-color: aliceblue;border-radius: 6px;">
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
                            <a-skeleton-avatar :size="94" active shape="square"/>
                            <a-skeleton-avatar :size="94" active shape="square"/>
                            <a-skeleton-avatar :size="94" active shape="square"/>
                            <a-skeleton-avatar :size="94" active shape="square"/>
                            <a-skeleton-avatar :size="94" active shape="square"/>
                        </a-space>
                    </div>
                    <div v-else-if="productdata.obj.pic !== undefined">
                        <a-image-preview-group>
                            <a-space>
                                <div v-for="img in productdata.obj.pic" :key="img.index">
                                    <p class="img_80"><a-image :src="img" :width="80" style="border-radius: 6px;"/></p>
                                </div>
                            </a-space>
                        </a-image-preview-group>
                    </div>
                </div>

                <!--white_back_ground_pic_url-->
                <div style="height: 120px;float: left;">
                    <div style="width: 90px;margin: 0 16px 0 0;float: left;">
                        <div v-if="productdata.obj.white_back_ground_pic_url === undefined">
                            <h5>白底图</h5>
                            <a-skeleton-avatar :size="94" active shape="square" style="margin: 0 4px 0 0;"/>
                        </div>
                        <div v-else-if="productdata.obj.white_back_ground_pic_url === null">
                            <h5>白底图-暂无</h5>
                            <a-skeleton-avatar :size="94" active shape="square" style="margin: 0 4px 0 0 ;"/>
                        </div>
                        <div v-else-if="productdata.obj.white_back_ground_pic_url !== null">
                            <h5>白底图</h5>
                            <p class="img_80"><a-image :width="80" style="border-radius: 6px;" :src="productdata.obj.white_back_ground_pic_url"/></p>
                        </div>
                    </div>

                    <div style="width: 120px;float: left;" v-if="productdata.obj.material_video_id === undefined">
                        <h5>视频-暂无</h5>
                        <a-skeleton-avatar :size="94" active shape="square" />
                    </div>
                    <div style="width: 120px;float: left;" v-else-if="productdata.obj.material_video_id === null">
                        <h5>视频-暂无</h5>
                        <a-skeleton-avatar :size="94" active shape="square"/>
                    </div>
                    <div style="width: 120px;float: left;" v-else>
                        <h5>视频</h5>
                        <p class="img_80">
                            <a :href="videoData.url" target="_blank">
                                <img :src="videoData.img_src" style="width: 80px;height: 80px;"/>
                            </a>
                        </p>
                    </div>
                </div>
                
                <div style="height: 120px;float: left;width: 100%;clear: both;">

                    <div style="height: 120px;float: left;margin: 0 10px 0 0;">

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
                                <a-space :size="6">
                                    <div v-for="img in productdata.obj.main_pic_3_4" :key="img.index">
                                        <p class="img_107"><a-image :src="img" :width="78" style="border-radius: 6px;" /></p>
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
                                <a-space :size="6">
                                    <div v-for="img in productdata.obj.main_image_three_to_four.slice(1,-1).split(' ')" :key="img.index">
                                        <div class="img_107"><a-image :src="img" :width="78" style="border-radius: 6px;" /></div>
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
                                <a href="#" @click="feight_detaile.play">查看 </a> {{ productdata.obj.freight_id }}


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
                                <div v-else-if="productdata.obj.size_info_template_id === 'None'" class="basestyle">
                                    暂无
                                </div>
                                <div v-else-if="size_detaile.data !== undefined" class="basestyle">
                                    <a href="#" @click="size_detaile.play">{{ size_detaile.data.component_template_info_list[0].template_name }}</a>

                                </div>
                            </a-col>

                            <a-col :span="4">
                                <div style="height: 24px;width: 100%;">品牌</div>
                                <div v-if="productdata.obj.standard_brand_id === undefined">
                                    <a-skeleton :title="false" :paragraph="{ rows: 1}" class="skelestlye" active/>
                                </div>
                                <div v-if="productdata.obj.standard_brand_id === 596120136" class="basestyle">无品牌</div>

                                <div v-if="productdata.obj.standard_brand_id !== 596120136 && productdata.obj.standard_brand_id !== undefined" class="basestyle">
                                {{ brand_detaile.data }}
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

            <div style="width: 100%;margin:0 0 50px 0;">
                <a-row :gutter="[16,16]">
                    <a-col :span="24">

                        <div v-for="(item,index) in productdata.obj.specs" :key="index" style="width: 100%;margin: 0 0 10px 0;clear:both;">

                            <p>{{ item.name }}</p>

                            <div class="font_size_12 specbox" v-for="(val,index) in item.values" :key="index" style="text-align: center;margin:0 10px 10px 0;border: 1px solid #e8e8e8;border-radius: 6px;padding:5px;">
                                <span v-for="(val2,index2) in productdata.obj.spec_pics" :key="index2" >
                                    <a-image v-if="val2.spec_detail_id == val.id" :width="30" :height="30" style="margin: 0 5px 0 0;" :src="API.AppSrtoreAPI.meiuri + val2.pic"/>
                                </span>
                                <span>{{ val.name }}</span>

                            </div>

                        </div>

                    </a-col>
                    <a-col :span="24">

                        <a-table 
                            :columns="columns" 
                            :data-source="data" 
                            size="small" 
                            :pagination="false"
                            style="font-size:12px;width: 100%;"
                            bordered
                            >
                                <template #bodyCell="{ column, text }">
                                    <template v-if="column.dataIndex === 'price'">
                                        <span >￥ {{ text }}</span>
                                    </template>
                                </template>
                            </a-table>
                    </a-col>
                </a-row>
            </div>

            <a-divider orientation="left" orientation-margin="0px">类目&属性</a-divider>
            <div style="width: 100%;margin:0 0 50px 0;">
                <h5>商品类目：{{ cate_name }}</h5>

                <a-row :gutter="[0,16]" style="margin: 20px 0 0 0;" v-if="productdata.obj.product_format_new !== undefined">

                  <a-col :span="6" v-for="(item,index) in JSON.parse(productdata.obj.product_format_new)" :key="index">
                    {{ item[0].PropertyName }}：{{ item[0].Name }}
                </a-col>
                </a-row>
            </div>

            <a-divider orientation="left" orientation-margin="0px">描述详情</a-divider>
            <div style="width: 100%;float: left;">
                <div class="desbox">
                    <div v-html="productdata.obj.description" style="width: 750px;margin: 0 0 20px 0;"></div>
                </div>
            </div>

        </div>
    </a-layout-content>

    </a-modal>

    <!--质量分 可优化 抽屉-->
    <a-drawer
        v-model:open="fen.open"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        size="large"
        style="color: #666"
        title="质量分可优化建议"
        placement="right"
    >
        <div v-if="fen.field_problem_list !== undefined">

            <p style="margin: 0 0 30px 0 ;">质量{{ fen.value }}分： <a-rate :value="fen.value" disabled /></p>

            <div v-for="(item,index) in fen.field_problem_list" :key="index" style="font-size: 12px;border: 1px silver solid; border-radius: 6px;padding: 14px;margin:10px 0;">
                <p style="padding: 6px 0 0 0;font-weight: bold;font-size: 14px;">{{ item.field_name }} - {{ item.problem_name }}</p>
                <p style="line-height: 26px;">{{ item.suggestion }}</p>
            </div>

        </div>

    </a-drawer>


    <!--审核驳回 驳回原因 抽屉-->
    <a-drawer
        v-model:open="reject_info.open"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        size="large"
        title="驳回原因"
        placement="right"
    >
        <div v-if="reject_info.records_list !== undefined">

            <div v-for="(item,index) in reject_info.records_list" :key="index">
                
                <div class="rejectinfo">

                    <p style="font-size: 14px;">驳回字段：{{ item.title }}-{{ item.type }}</p>

                    <div v-for="(val,index) in item.reject_reason_list" :key="index">

                            <div v-if="item.type == 'description_pic'">
                                <p style="font-size: 12px;">{{ val.reason_text }}</p>
                                <span v-for="(img,index) in val.reject_img_list" :key="index">
                                    <a-image :src="img.url" width="100px" height="100px"></a-image>
                                </span>
                            </div>

                            <div v-else-if="item.type == 'name'">
                                <p v-html="val.reason_text" style="font-size: 12px;line-height: 28px;" ></p>
                            </div>
                            
                            <div v-else-if="item.type == 'product_pic'">
                                <p v-html="val.reason_text" style="font-size: 12px;line-height: 28px;"></p>

                                <span v-for="(img,index) in val.reject_img_list" :key="index">
                                    <a-image :src="img.url" width="100px" height="100px"></a-image>
                                </span>
                            </div>

                            <div v-else-if="item.type == 'product_format'">
                                <p v-html="val.reason_text" style="font-size: 12px;line-height: 28px;"></p>
                            </div>

                            <div v-else>
                                <p style="font-size: 12px;line-height: 28px;">{{ val.reason_text }}</p>
                            </div>

                    </div>

                </div>

            </div>
            
        </div>
    </a-drawer>

</template>
<script>
import { defineComponent,defineAsyncComponent,ref,reactive,onMounted,h } from 'vue';
import {LoadingOutlined,CheckCircleTwoTone,InfoCircleTwoTone,UpSquareTwoTone,WarningTwoTone,ClockCircleTwoTone,CloseCircleTwoTone} from '@ant-design/icons-vue';
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
        CheckCircleTwoTone,
        InfoCircleTwoTone,
        UpSquareTwoTone,
        WarningTwoTone,
        ClockCircleTwoTone,
        CloseCircleTwoTone,
        // 尺码模板
        template_detaile_components:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/templateSize/templatedetaile.vue')),
        // 运费模板
        feight_detaile_components:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/productDetaile/feightdetaile.vue')),


    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },
    
    setup(props, ctx) {

        const tool = new TOOL.TOOL()            // 工具方法
        const API = new utils.A_Patch()         // 请求接口地址合集
        const Profun = new PL.ProductList_fun() // 商品列表方法model引用
        
        // 商品详情
        const productdata = reactive({
            obj:ref({})
        })

        // 质量分
        const fen =reactive({
            value: ref(0), // 默认分值
            field_problem_list:ref(undefined), // 可优化项目
            open:ref(false)
        })

        // 查看质量分可优化建议
        const showDrawer = () => {
            fen.open = true;
        };

        // 审核驳回
        const reject_info = reactive({
            records_list:ref(undefined), // 驳回原因列表 
            open:ref(false)
        })
        // 查看审核驳回
        const showreject = () => {
            reject_info.open = true;
        };

        // 商品视频
        const videoData = reactive({
            img_src:ref(undefined), // 封面地址
            url:ref(undefined),     // 视频播放地址
            // 新开页面
            play:()=>{
                window.open(videoData.url,"_blank")
                console.log(videoData.url)
            }
        })

        // 运费详情
        const feight_detaile = reactive({
            open:ref(false),
            data:ref(undefined),
            play:()=>{
                feight_detaile.open = true
            }
        })

        // 尺码详情
        const size_detaile = reactive({
            open:ref(false),
            data:ref(undefined),
            play:()=>{
                size_detaile.open = true
            }
        })

        // 品牌详情
        const brand_detaile = reactive({
            open:ref(false),
            data:ref(undefined),
            play:()=>{
                brand_detaile.open = true
            }
        })

        // 类目
        const cate_name = ref(undefined)



        
        // 库存列表
        const columns = ref([])
        const data = ref([])


        // 请求商品详情信息
        onMounted(()=>{
            
            // 请求详情信息
            tool.Http_.post(API.AppSrtoreAPI.dou_product.detaile, {

                product_id:props.data.product_id,
                show_draft:"false"

            }).then((responese)=>{

                setTimeout(()=>{

                    // console.log('运费模板id',responese.data.data.freight_id)
                    load_get_brand(responese.data.data.standard_brand_id)   // 品牌
                    load_get_video(responese.data.data.material_video_id)   // 视频
                    load_get_freight(responese.data.data.freight_id)        // 运费模板
                    load_get_size(responese.data.data.size_info_template_id)// 尺码
                    load_cate_format(responese.data.data) // 类目&属性
                    console.log('资质',responese.data.data.quality_list)

                    // 规格库存-表头、内容
                    const spec_res_obj = load_spec(responese.data.data)
                    columns.value = spec_res_obj.column  // 表头
                    data.value = spec_res_obj.data // 列表内容

                    productdata.obj = responese.data.data

                },1000)
            
            })

            // 审核结果：被驳回的原因 audit
            tool.Http_.post(API.AppSrtoreAPI.dou_product.audit, {
                product_id:props.data.product_id,
                publish_status:2, //0-审核中 1-审核通过 2-审核拒绝
                page:0,
                size:10
            }).then((res)=>{
                if(res.data.data.total > 0){reject_info.records_list = res.data.data.records[0].audit_reason_details}
            })

            // 质量分(审核通过才又质量分)
            tool.Http_.post(API.AppSrtoreAPI.dou_product.qualitydetaile, {
                product_id:props.data.product_id,
            }).then((res)=>{
                fen.value = res.data.data.quality_score.score
                fen.field_problem_list = [...res.data.data.field_problem]
            })

            // 品牌查询
            const load_get_brand=(b_id)=>{
                // console.log('品牌id',b_id)
                if(b_id !== undefined && b_id !== null){
                    tool.Http_.post(API.AppSrtoreAPI.dou_product.brand, {
                        brand_ids:[b_id]
                    }).then((res)=>{
                        var name_cn = res.data.data.brand_list[0].name_cn;
                        var name_en = res.data.data.brand_list[0].name_en;;
                        brand_detaile.data = name_cn + '-' + name_en
                    })
                }
            }

            // 视频查询
            const load_get_video=(v_id)=>{
                if(v_id !== undefined && v_id !== null){
                    tool.Http_.post(API.AppSrtoreAPI.material.videolist, {
                        vid_list:[v_id]
                    }).then((res)=>{
                        console.log('视频',res.data.data)
                        videoData.img_src = res.data.data.success_map[v_id].VideoCoverUrl
                        videoData.url = res.data.data.success_map[v_id].MainUrl
                    })
                }
            }

            // 运费模板查询
            const load_get_freight=(f_id)=>{
                if(f_id !== undefined && f_id !== null){
                    tool.Http_.post(API.AppSrtoreAPI.freight.detaile, {
                        freight_id:f_id
                    }).then((res)=>{
                        feight_detaile.data = res.data.data
                    })
                }
            }

            // 尺码模板查询
            const load_get_size=(s_id)=>{

                if(s_id !== undefined && s_id !== null && s_id !== 'None'){
                    tool.Http_.post(API.AppSrtoreAPI.size.list, {
                        template_type:"size_info",
                        page_num:0,
                        page_size:10,
                        template_id:s_id
                    }).then((res)=>{
                        size_detaile.data = res.data.data
                    })
                }
            }


            // 规格转移-规格图片、规格、库存列表
            const load_spec=(data)=>{

                var res_obj = {}
                
                var column_list = []
                var sell_p = data.spec_prices[0].sell_properties

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

                // 规格库存-内容
                var data_list = []

                var spec_obj = data.spec_prices
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

                res_obj.column = c_obj
                res_obj.data = data_list
                return res_obj
            }

            // 类目
            const load_cate_format=(data)=>{

                var category_detail = data.category_detail;
                console.log(category_detail)
                let first_cname = category_detail.first_cname;
                let second_cname = category_detail.second_cname;
                let third_cname = category_detail.third_cname;
                let fourth_cname = category_detail.fourth_cname;
                let arr = [first_cname,second_cname,third_cname,fourth_cname] 
                let res_list = arr.filter(Boolean);
                
                var cate_test = ''
                for(let i of res_list){
                    cate_test = cate_test + i + '>'
                }

                cate_name.value = cate_test

            }



        })

        const handleOk = e => {
            console.log(e);
        };


        return{
            API,
            Profun,
            productdata,
            props,
            handleOk,
            fen,
            reject_info,
            showreject,
            showDrawer,
            videoData,
            size_detaile,
            feight_detaile,
            brand_detaile,
            cate_name,
            columns,
            data
        }
    }
})
</script>
<style scoped>
.content{padding: 0;margin: 0;background: '#fff';overflow-y: auto;overflow-x: hidden;height: 88vh;}
.head_title_img{height: 140px;width: 100%;}
.zhenduan{width: 100%;height:140px;}
.top_img_box{height: 304px; width: 100%;}
.img_loading_3_4{width: 80px;height: 107px;background-color: #f2f2f2;text-align: center;border-radius: 6px;}
.skelestlye{margin: 0;padding: 0;width: 100%;}
.basestyle{height: 30px;width: 100%;}
.desbox{width: 770px;background-color: #333;padding: 10px;border-radius:6px;margin: 0 auto;}
.specbox{display: block;float: left;margin:0 10px 10px 0;}
.check_ico{width: 100px;margin: 0 auto;font-size: 44px;text-align: center;}
.rejectinfo{padding:20px 10px 10px 20px;margin: 0 0 20px 0;border: 1px #f2f2f2 solid;border-radius: 6px;}
.img_80{border-radius: 6px;border: 1px #f2f2f2 solid;padding: 6px;height: 94px;width: 94px;}
.img_107{height: 114px;width: 88px;border-radius: 6px;border: 1px #f2f2f2 solid;padding: 4px;}

</style>