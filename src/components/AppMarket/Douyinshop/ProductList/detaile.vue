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
            <div>
                <a-row>
                    
                    <a-col :span="16" style="background-color: aliceblue;border-radius: 6px;">
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

                    <a-col :span="7" :offset="1" style="background-color: #f60;border-radius: 6px;">
                        <div class="zhenduan">
                            <div v-if="productdata.obj.check_status === 1" style="text-align: center;">
                                <div style="width: 100px;margin: 0 auto;font-size: 44px;text-align: center;"><CheckCircleTwoTone /></div>
                                <p>审核通过 <a href="#" @click="showDrawer">查看优化建议</a></p>
                            </div>
                            <div v-if="productdata.obj.check_status === 3" style="text-align: center;">
                                <div style="width: 100px;margin: 0 auto;font-size: 44px;text-align: center;"><CheckCircleTwoTone /></div>
                                <p style="margin: 0;">审核通过 <a href="#" @click="showDrawer">查看优化建议</a></p>
                                <p style="margin: 0;padding: 0;"><a-rate :value="fen.value" disabled /></p>

                            </div>
                            <div v-if="productdata.obj.check_status === 4">
                                审核未通过
                                <p><a href="#" @click="showreject">查看驳回原因</a></p>
                            </div>
                        </div>
                        <!--提示错误，-->
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
        style="color: red"
        title="质量分可优化建议"
        placement="right"
    >
        质量{{ fen.value }}分： <a-rate :value="fen.value" disabled /> 
        <p>质量建议</p>
        <p>质量建议</p>
    </a-drawer>


    <!--审核驳回 驳回原因 抽屉-->
    <a-drawer
        v-model:open="reject_info.open"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        style="color: red"
        title="驳回原因"
        placement="right"
    >
        <p>原因描述</p>
        <p>原因描述</p>
        <p>原因描述</p>
    </a-drawer>

</template>
<script>
import { defineComponent,ref,reactive,onMounted,h } from 'vue';
import {LoadingOutlined,CheckCircleTwoTone} from '@ant-design/icons-vue';
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
            text: ref('正在加载评分...'), // 提示语
            field_problem_list:ref(undefined), // 可优化项目
            open:ref(false)
        })
        // 查看质量分可优化建议
        const showDrawer = () => {
            fen.open = true;
        };

        // 审核驳回
        const reject_info = reactive({
            value: ref(0), // 默认分值
            text: ref('正在加载评分...'), // 提示语
            records_list:ref(undefined), // 驳回原因列表 
            open:ref(false)
        })
        // 查看审核驳回
        const showreject = () => {
            reject_info.open = true;
        };
        
        // 库存列表
        const columns = ref([])
        const data = ref([])


        // 获取商品id
        // console.log(props.data.product_id)


        // 请求商品详情信息
        onMounted(()=>{
            
            // 请求详情信息
            tool.Http_.post(API.AppSrtoreAPI.dou_product.detaile, {

                product_id:props.data.product_id,
                show_draft:"false"

            }).then((responese)=>{

                setTimeout(()=>{

                    // console.log('视频',responese.data.data.material_video_id)

                    // console.log('规格图片',responese.data.data.spec_pics)                   // 规格图片
                    // console.log('商品sku详情',responese.data.data.spec_prices)              // spec_prices
                    // console.log('规格信息，规格项和规格值',responese.data.data.specs)         // 规格信息，规格项和规格值
                    // console.log('规格id',responese.data.data.spec_id)                       // 规格id
                    // sell_properties
                    // console.log('sell_properties',responese.data.data.spec_prices[0].sell_properties)       // sell_properties

                    // 质量分

                    // 品牌
                    // 视频
                    // 运费
                    // 尺码

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
                publish_status:1, //0-审核中 1-审核通过 2-审核拒绝
                page:0,
                size:10
            }).then((res)=>{
                console.log('审核记录',res.data.data)
            })

            // 质量分(审核通过才又质量分)
            tool.Http_.post(API.AppSrtoreAPI.dou_product.qualitydetaile, {
                product_id:props.data.product_id,
            }).then((res)=>{
                fen.field_problem_list = [...res.data.data.field_problem]
                console.log('质量分',fen.field_problem_list)

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
            // 类目、属性列表
            const load_cate_format=(f_id)=>{

            }

        })

        const handleOk = e => {
            console.log(e);
        };


        return{
            Profun,
            productdata,
            props,
            handleOk,
            fen,
            reject_info,
            showreject,
            showDrawer,
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
.head_title_img{height: 140px;width: 100%;}
.zhenduan{width: 100%;margin-top:6px;}
.top_img_box{height: 304px; width: 100%;}
.img_loading_3_4{width: 80px;height: 107px;background-color: #f2f2f2;text-align: center;border-radius: 6px;}
.skelestlye{margin: 0;padding: 0;width: 100%;}
.basestyle{height: 30px;width: 100%;}
.desbox{width: 770px;background-color: #333;padding: 10px;border-radius:6px;margin: 0 auto;}
.specbox{display: block;float: left;margin:0 10px 10px 0;}
</style>