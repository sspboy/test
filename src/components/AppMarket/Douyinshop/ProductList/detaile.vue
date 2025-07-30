<template>
    <a-modal
      v-model:open="props.data.DetaileDate"
      title="商品详情"
      width="100%"
      wrap-class-name="full-modal"
      @ok="handleOk"
    >
    
    <a-layout-content class="content">

        <div style="height: 140px;background-color: aliceblue;">
            
            <a-row :gutter="[16,16]">

                <a-col :span="12">
                    <div v-if="productdata.obj.name !== undefined" style="width: 100px;height:100px;float: left;margin: 20px;">
                        <a-image :src="productdata.obj.img" alt="" style="width: 100%;height: 100%;border-radius: 6px;" />
                    </div>
                    <div v-if="productdata.obj.name === undefined" style="width: 100px;height: 100px;float: left;margin: 20px;text-align: center;border-radius: 6px;">
                        <!-- <a-spin :indicator="indicator" style="margin-top: 26px;"/> -->
                        <a-skeleton-image style="width: 100px;height: 100px;" active />

                    </div>

                    <div  style="width: 100%;margin: 30px 0 0 0;">
                        
                        <p v-if="productdata.obj.name !== undefined" style="margin:10px 0 10px 0;padding: 0;">
                            <a-row>
                                <a-col :span="3">
                                    标题： 
                                </a-col>
                                <a-col :span="21">
                                    {{ productdata.obj.name }}
                                </a-col>
                            </a-row>
                        </p>
                        <p v-if="productdata.obj.name === undefined" style="margin: 0;padding: 0;">
                                <a-row>
                                <a-col :span="3">
                                    标题： 
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
                                <a-col :span="2"><span>划线价</span></a-col>
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

                <a-col :span="12">
                    <div style="height: 100px;width: 100%;margin-top:20px;">
                    </div>
                </a-col>
            </a-row>
        </div>

        <div style="padding: 12px 0 0 0;">

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
                    <a-row :gutter="[0,0]">
                        <a-col :span="12">
                            <div style="margin:0 0;">
                                <h5>商品主图</h5>
                                <a-image-preview-group>
                                    <a-space>
                                        <div v-for="img in productdata.obj.pic">
                                            <a-image :src="img" :width="80" style="border-radius: 6px;" />
                                        </div>
                                    </a-space>
                                </a-image-preview-group>
                            </div>

                            <div style="margin:20px 0;">
                                <h5>白底图</h5>
                                <a-skeleton-avatar v-if="productdata.obj.white_back_ground_pic_url === null" :size="80" active shape="square" style="margin: 4px 0 0 0;"/>
                                <div>
                                    <a-image v-if="productdata.obj.white_back_ground_pic_url !== null" :width="80" :src="productdata.obj.white_back_ground_pic_url"></a-image>
                                </div>
                            </div>

                            <div style="margin:20px 0;">
                                <h5>3:4长图</h5>
                                <div v-if="productdata.obj.main_pic_3_4.length > 2">
                                    <a-image-preview-group>
                                        <a-space>
                                            <div v-for="img in productdata.obj.main_pic_3_4">
                                                <a-image :src="img" :width="80" style="border-radius: 6px;" />
                                            </div>
                                        </a-space>
                                    </a-image-preview-group>
                                </div>
                                <div v-if="productdata.obj.main_pic_3_4.length === 2">
                                    <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px 4px 4px 0;"/>
                                    <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px;"/>
                                    <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px;"/>
                                    <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px;"/>
                                    <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px;"/>
                                </div>
                            </div>
                            <div style="margin:20px 0;">
                                <h5>3:4主图</h5>
                                <div v-if="productdata.obj.main_image_three_to_four !== '[]'">
                                    <a-image-preview-group>
                                        <a-space>
                                            <div v-for="img in productdata.obj.main_image_three_to_four.slice(1,-1).split(' ')">
                                                <a-image :src="img" :width="80" style="border-radius: 6px;" />
                                            </div>
                                        </a-space>
                                    </a-image-preview-group>
                                </div>
                                <div v-if="productdata.obj.main_image_three_to_four === '[]'">
                                    <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px 4px 4px 0;"/>
                                    <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px;"/>
                                    <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px;"/>
                                    <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px;"/>
                                    <a-skeleton-avatar :size="80" active shape="square" style="margin: 4px;"/>
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="6">
                            <h5>详情描述</h5>
                            <div style="width: 340px;height: 500px;background-color: #333;padding: 10px;border-radius:6px;">
                                <div v-html="productdata.obj.description" style="height: 480px; width: 320px;overflow-y: scroll;"></div>
                            </div>
                        </a-col>
                        <a-col :span="6">                            
                            <h5>商品视频</h5>
                            <div style="width: 340px;height: 500px;background-color: #333;padding: 10px;border-radius: 6px;">
                            </div>
                        </a-col>
                    </a-row>


                </a-tab-pane>
                <a-tab-pane key="3" tab="规格库存">
                    <a-row :gutter="[16,16]">
                        <a-col :span="12">
                            <div>
                                <h5>规格A</h5>
                            </div>
                            <div>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px 4px 4px 0;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                            </div>
                            <div>
                                <h5>规格B</h5>
                            </div>
                            <div>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px 4px 4px 0;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                            </div>
                            <div>
                            <h5>规格C</h5>
                            </div>
                            <div>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px 4px 4px 0;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div>
                                <h5>库存</h5>
                            </div>
                            <div>
                                库存列表
                            </div>

                        </a-col>

                    </a-row>
                    
                </a-tab-pane>
                <a-tab-pane key="4" tab="类目属性">
                    <div style="margin-bottom: 20px;">
                        <h5>商品类目：母婴>孕妇装>连衣裙</h5>
                    </div>
                    <h4>商品属性</h4>
                    <a-row :gutter="[16,16]">
                        <a-col :span="4">
                            <div>属性名称</div>
                            <div>属性值</div>
                        </a-col>
                        <a-col :span="4">
                            <div>属性名称</div>
                            <div>属性值</div>
                        </a-col>
                        <a-col :span="4">
                            <div>属性名称</div>
                            <div>属性值</div>
                        </a-col>
                        <a-col :span="4">
                            <div>属性名称</div>
                            <div>属性值</div>
                        </a-col>
                        <a-col :span="4">
                            <div>属性名称</div>
                            <div>属性值</div>
                        </a-col>
                        <a-col :span="4">
                            <div>属性名称</div>
                            <div>属性值</div>
                        </a-col>
                    </a-row>


                </a-tab-pane>
                <a-tab-pane key="5" tab="发布规则">
                    <a-divider orientation="left">履约规则</a-divider>

                    <div>
                        特殊时间延迟发货规则
                        现货发货模式规则
                        阶梯发货模式规则
                        全款预售发货模式规则
                        SKU预售发货模式规则
                        现货+预售发货规则
                        新预售发货模式规则
                    </div>
                    <a-divider orientation="left">商品标题推荐规则</a-divider>
                    <div>商品标题推荐规则</div>
                    <a-divider orientation="left">售后服务规则</a-divider>
                    <div>售后服务规则</div>
                    <a-divider orientation="left">参考价相关规则</a-divider>
                    <div>参考价相关规则</div>
                    <a-divider orientation="left">spu管控规则</a-divider>
                    <div>spu管控规则</div>
                    <a-divider orientation="left">商品规格约束</a-divider>
                    <div>商品规格约束</div>
                    <a-divider orientation="left">商品尺码模板配置规则</a-divider>
                    <div>商品尺码模板配置规则</div>
                    <a-divider orientation="left">商品主图3:4配置规则</a-divider>
                    <div>商品主图3:4配置规则</div>
                    <a-divider orientation="left">金价信息</a-divider>
                    <div>金价信息</div>
                    <a-divider orientation="left">其他规则</a-divider>
                    <div>其他规则</div>
                    <a-divider orientation="left">交易相关的规则</a-divider>
                    <div>交易相关的规则</div>
                    <a-divider orientation="left">sku规则</a-divider>
                    <div>sku规则</div>
                    <a-divider orientation="left">资质规则</a-divider>
                    <div>资质规则</div>
                    <a-divider orientation="left">提取方式规则</a-divider>
                    <div>提取方式规则</div>
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
                <a-tab-pane key="7" tab="卡券">资质</a-tab-pane>
                <a-tab-pane key="8" tab="组合搭配">组合搭配</a-tab-pane>
                <a-tab-pane key="9" tab="资质">资质</a-tab-pane>
                <a-tab-pane key="10" tab="其它字段">其它字段</a-tab-pane>


            </a-tabs>

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
            obj:{}
        })

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
                
                console.log('视频',responese.data.data.material_video_id)
                console.log('白底图',responese.data.data.white_back_ground_pic_url)
                console.log('商品主图',responese.data.data.pic)


                var three_to_four = responese.data.data.main_image_three_to_four

                console.log('商品长图3:4',typeof three_to_four,three_to_four.length,three_to_four)

                console.log('商品主图3:4',responese.data.data.main_pic_3_4)

                productdata.obj = responese.data.data
            },1000)
            
            })
        })
        
        // 分组渲染页面
        // 头部信息
        // 基础信息
        // 主图视频
        // 商品规格
        // 类目属性
        // 发布规则
        // 商品诊断
        // 卡券
        // 组合搭配
        // 资质
        // 关闭清空页面信息

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
        }
    }
    
})
</script>
<style scoped>
.content{padding: 24px;background: '#fff';}
.skelestlye{margin: 0;padding: 0;width: 100%;}
.basestyle{height: 30px;width: 100%;}
</style>