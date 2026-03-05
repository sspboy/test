<!-- 商品编辑 组件 -->
<template>
    <a-modal
      v-model:open="props.data.EditDate"
      title="编辑商品"
      width="100%"
      wrap-class-name="full-modal"
      @ok="handleOk"
    >
      <a-layout-content class="content">

            <div style="width: 950px;margin: 0 auto;">
              <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="基础信息">
                  <div style="width: 100%;clear: both;height: 140px;padding: 10px 0 0 0;">

                    <div class="img_pic">
                    </div>
                    <div class="img_pic">图片2</div>
                    <div class="img_pic">图片3</div>
                    <div class="img_pic">图片4</div>
                    <div class="img_pic">图片5</div>
                    <p class="cursor Add_img">
                      <a-flex justify="center" align="center" style="height: 100%;font-size: 12px;">
                        +主图
                      </a-flex>
                    </p>
                  </div>
                  
                  <a-form>
                    <a-form-item label="商品标题">
                      <a-input></a-input>
                    </a-form-item>
                    <a-form-item label="导购标题">
                      <a-input></a-input>
                    </a-form-item>

                    <a-divider orientation="left" orientation-margin="0px">商品分类 </a-divider>

                    <a-form-item label="商品分类">
                      <a-row>
                        <a-col :span="8">
                          <a-select v-model:value="formdata.category_leaf_id" placeholder="please select your zone" disabled="true">
                          <a-select-option value="shanghai">Zone one</a-select-option>
                          <a-select-option value="beijing">Zone two</a-select-option>
                        </a-select>
                        </a-col>
                        <a-col :span="8">
                          <a-button type="text" :size="small">点击预测分类</a-button>
                        </a-col>
                      </a-row>
                        
                    </a-form-item>

                  </a-form>

                  <a-divider orientation="left" orientation-margin="0px">商品属性 <a href="#" class="font_size_12">智能填充属性</a></a-divider>

                  <a-row>
                    <a-col :span="4">商品属性</a-col>
                    <a-col :span="4">商品属性</a-col>
                    <a-col :span="4">商品属性</a-col>
                    <a-col :span="4">商品属性</a-col>
                    <a-col :span="4">商品属性</a-col>
                    <a-col :span="4">商品属性</a-col>
                    <a-col :span="4">商品属性</a-col>
                  </a-row>

                </a-tab-pane>

                <a-tab-pane key="2" tab="图片视频" force-render>
                  白底图+商品长图+主图3:4+视频


                  <div class="img_pic">白底图</div>

                  <div>视频</div>

                  <div>主图3:4</div>
                  <div>
                    <a-form>

                      <a-divider orientation="left" orientation-margin="0px">必填信息 </a-divider>
                      <a-form-item></a-form-item>
                      <a-form-item></a-form-item>
                      <a-form-item></a-form-item>
                      <a-form-item></a-form-item>
                      <a-form-item></a-form-item>
                      
                      <a-divider orientation="left" orientation-margin="0px">选填信息 </a-divider>

                      <a-form-item></a-form-item>
                      <a-form-item></a-form-item>
                      <a-form-item></a-form-item>

                    
                    
                      
                    

                      <a-divider orientation="left" orientation-margin="0px">限购 </a-divider>
                      <a-form-item label="最少购买" placeholder="用户每次下单最少限购件数">
                        <a-input></a-input>
                      </a-form-item>
                      <a-form-item label="最多购买" placeholder="用户每次下单最多限购件数">
                        <a-input></a-input>
                      </a-form-item>
                      <a-form-item label="累计限购" placeholder="每个用户累计限购件数">
                        <a-input></a-input>
                      </a-form-item>
                    </a-form>
                  </div>

                </a-tab-pane>

                <a-tab-pane key="3" tab="商品规格">规格+图片+备注</a-tab-pane>
                <a-tab-pane key="4" tab="库存数量">库存+价格+商家编码+状态</a-tab-pane>
                <a-tab-pane key="5" tab="描述详情">描述图</a-tab-pane>
              </a-tabs>
            </div>
      </a-layout-content>

      
    </a-modal>
</template>
<script>
import { defineComponent,reactive,ref, } from 'vue';
export default defineComponent({

    name: "edit",  // 筛选条件查询组件
    // 引用组件
    components: {


    },

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        console.log(props.data.product_id) // 编辑的商品id
        // 页面配置
        const PAGEDATA = reactive({
            product_id: props.data.product_id, // 编辑的商品id
        })

        // 表单数据
        const formdata = reactive({

            // 图片
            pic:undefined,     // 主图
            white_back_ground_pic_url:undefined, // 白底图
            long_pic_url:undefined,     // 3:4长图url(仅素材中心url有效)
            main_image_3_4:undefined, // 主图3:4
            main_image_three_to_four:undefined, // 主图3:4
            video:undefined,          // 视频
            description:undefined,    // 描述

            // 必填字段
            product_id: props.data.product_id, // 编辑的商品id
            name:undefined,           // 商品名称
            product_type:undefined,   // 商品类型
            commit:undefined,         // false仅保存，true保存+提审

            // 非必填字段
            out_product_id:undefined,     // 外部product_id。超市小时达场景不推荐使用
            outer_product_id:undefined,   // 外部product id。超市小时达场景不推荐使用
            standard_brand_id:undefined,   // 品牌id，通过/product/getBrandList获取
            recommend_remark:undefined,   // 推荐语
            reduce_type:undefined,        // 1 减库存类型：1-拍下减库存 2-付款减库存
            freight_id:undefined,         // 运费模板id
            weight:undefined,             // 重量
            weight_unit:undefined,        // 重量单位 0:克 1:千克
            mobile:undefined,             // 联系电话
            remark:undefined,             // 商家可见备注
            material_video_id:undefined,  // 主图视频ID，可以先通过https://op.jinritemai.com/docs/api-docs/69/1617接口上传视频，获取审核通过的视频素材ID进行传入
            size_info_template_id:undefined, // 尺寸表模板id
            short_product_name:undefined, // 导购短标题，短标题可用于物流打单及商品搜索场景，说明详见：https://school.jinritemai.com/doudian/web/article/aHUW2MCvHqF3?from=shop_article
            is_evaluate_opened:undefined, // 是否开启评价

            // 发货履约
            delivery_delay_day:undefined, // 承诺发货时间，单位是天,不传则默认为2天。现货发货(presell_type=0)和阶梯发货模式(presell_type=2)时必填，支持传入9999 、1、 2 （分别表示当日发、次日发、48小时发），具体支持传入的参数范围/product/getProductUpdateRule
            presell_type:undefined,       // 发货模式，0-现货发货，1-预售发货，2-阶梯发货，默认0
            presell_delay:undefined,      // 全款预售模式时的发货时间/阶梯模式下阶梯发货时间，具体支持传入的参数范围/product/getProductUpdateRule
            presell_end_time:undefined,    // 预售结束时间，格式2020-02-21 18:54:27，最多支持设置距离当前30天
            appoint_delivery_day:undefined, // 可预约发货天数
            presell_config_level:undefined, // 0：全款预售，1：sku预售，2：现货+预售 ，3：新预售
            presell_delivery_type:undefined, // 全款预售和sku预售时传递，其他不传： 0 预售结束后发货 1支付完成后发货
            delay_rule:undefined,             // 特殊日期延迟发货规则
            
            // 分类属性
            category_leaf_id:undefined, // 分类id
            product_format_new:undefined, // 商品属性== 通过/product/getCatePropertyV2获取 格式：{"property_id":[{"value":value,"name":"property_name","diy_type":0}]}, name的类型是string，value和diy_type的类型是number 度量衡参照open度量衡对接文档填写

            // 规格库存
            spec_pic:undefined,             // 规格图片，单规格必填，多个规格选填，规格图片会覆盖主图
            spec_prices_v2:undefined,         // sku新参数，建议切到新参数
            spec_info:undefined,             // 规格模版详细信息

            // 限购
            maximum_per_order:undefined, // 每个用户每次下单限购件数
            limit_per_buyer:undefined, // 每个用户累计限购件数
            minimum_per_order:undefined, // 每个用户每次下单至少购买的件数

            // 售后服务
            after_sale_service:undefined, // 售后服务参数,key:value格式 
            after_sale_service_v2:undefined, // 售后服务参数，售后服务新结构（老的after_sale_service中的字段后续会慢慢迁移到这里）

            // 资质
            quality_list:[],// 资质信息，可通过/product/qualificationConfig获取
            force_use_quality_list:undefined, //使用qualityList覆盖当前商品资质，qualityList传空代表清空

            // 其它字段
            delivery_method:undefined, // 海南免税生效。 0:离岛免税、1:邮寄、2:离岛自提+邮寄
            cdf_category_id:undefined, // 海南免税：海关限购分类编码
            need_recharge_mode:undefined, // 充值模式
            account_template_id:undefined, // 多账号模板
            sell_channel:undefined, // 售卖方式;0:全渠道手售卖,1:仅指定直播间售卖
            start_sale_type:undefined, // 审核通过后上架售卖时间配置:0-立即上架售卖 1-放入仓库
            pickup_method:undefined, // 提取方式新字段，推荐使用。"0": 普通商品-使用物流发货, "1": 虚拟商品-无需物流与电子交易凭证, "2": 虚拟商品-使用电子交易凭证, "3": 虚拟商品-充值直连
            substitute_goods_url:undefined, // 外部商品url
            sale_channel_type:undefined, // 销售渠道类型，可选onlineOnly（纯电商，仅在线上售卖）或sameAsOffline（专柜同款，
            name_prefix:undefined, // 商品名称前缀
            name_suffix:undefined, // 商品名称后缀
            store_id:undefined, // 门店id
            main_product_id:undefined, // 主商品id，关联主商品id，适用于套装商品
            sale_limit_id:undefined, // 销售模板id
            reference_price:undefined, // 参考价，单位分
            reference_price_certificate:undefined, // 参考价凭证
            unit_price_info:undefined, //价格规则信息
            quality_inspection_info:undefined, // 前置质检相关（特定二手商家、特定二手类目使用）
            open_logistics_info:undefined, // 跨境物流信息
            custom_property:undefined, // 商品定制属性。适用于到家商品场景
            default_process_time:undefined, // 商品维度默认处理时长
            recommend_ids:undefined, // 预测记录id，类目预测记录key=category_recommend_id
            show_checkout_entry:undefined, // 虚拟商品设置是否订单展示核销去使用
            pickup_prepare_time:undefined, // 自提备货时长(单位天)
            home_install_service_template_id:undefined, // 上门安装服务模板id

            // 废弃字段
            pay_type:undefined,            // 付款方式(废弃)
            supply_7day_return:undefined,  // 是否支持7天无理由退货(废弃) 0-不支持 1-支持// 【该字段将在2023年4月30日下线，请开发使用最新的after_sale_service字段传值；】是否支持7天无理由，0不支持，1支持，2支持（拆封后不支持）
            spec_name:undefined,           // 【废弃不再使用，请使用spec_info参数】如果不填，则规格名为各级规格名用 \"-\" 自动生成
            specs:undefined,               // 废弃不再使用，请使用spec_info参数】店铺通用规格，能被同类商品通用。多规格用^分隔，规格与规格值用|分隔，多个规格值用,分隔。如果创建或编辑现货+预售商品或新预售商品时，须包含发货时效，如：颜色|黑色,白色,黄色^尺码|S,M,L^发货时效|5天内发货,15天内发货
            spec_prices:undefined,         // 【字段废弃，请使用spec_prices_v2】sku详情，

            // 卡券
            need_check_out:undefined,      // 卡券类型需要传true
            poi_resource:undefined,        // 卡券信息

            // 汽车
            car_vin_code:undefined,        // 汽车vin码
          
        })

        // 提交
        const handleOk = e => {
            console.log(e);
        };

        // 卡片命中
        const activeKey = ref('1');

        return{
            props,
            formdata,
            handleOk,
            activeKey,
        }
    }
})
</script>
<style scoped>
.img_pic{height: 100px;width: 100px;background-color: #f2f2f2;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;}
.img_3_4_pic{height: 132px;width: 99px;background-color: #f2f2f2;border: 1px silver solid; border-radius: 4px;margin: 0 10px 0 0;float: left;padding: 10px;text-align: center;}
.Add_img{height: 100px;width: 100px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.Add_3_4_img{height: 132px;width: 99px;background-color: #fff;border: 1px silver dotted; border-radius: 4px;margin: 0 10px 0 0;float: left;text-align: center;}
.Add_3_4_img :hover{color: #2600ff;border:1px #2600ff dotted;border-radius: 4px;}
.add_btn_class{width: 40px; margin:0 0 0 20px;}
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>