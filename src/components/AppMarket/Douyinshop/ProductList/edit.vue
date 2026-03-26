<!-- 商品编辑 组件 -->
<template>
    <!-- 动态渲染异步组件--选择素材 -->
    <selectimg v-if="PAGEDATA.selectimg_open" v-on:add_img_callback="PAGEDATA.Add_Callback" :data="PAGEDATA"/>
    
    <a-modal
      v-model:open="props.data.EditDate"
      width="100%"
      wrap-class-name="full-modal"
      :footer="null"

    >
    <!--无数据loading-->
      <a-layout-content v-if="PAGEDATA.product_data" class="load_center">
        <a-spin />
      </a-layout-content>

      <a-layout-content v-else-if="!PAGEDATA.product_data" class="content">

        <!--有数据 show time info-->
        <div  style="width: 950px;margin: 0 auto;height: 100%;">
          
          <a-tabs v-model:activeKey="activeKey">

            <a-tab-pane key="1" tab="主图类目">

              <a-row>

                <a-col :span="24">

                <p>主图</p>

                <!--主图不为空-->
                <div style="height: 130px;" >
                  
                  <template v-for="(item,index) in formdata.pic">
                    <div v-if="formdata.pic.length > 0" style="width: 120px;float: left;" >

                      <div class="img_pic cursor" style="margin: 0 auto;">
                          <a-image :src="item" />
                      </div>

                      <!--图片尺寸1：1情况下-->
                      <div style="margin: 6px 0 0 0;padding: 0;width: 100%;text-align: center;clear: both;">

                          <a-space size="0">
                            <a-button type="text" size="small" @click="insetpagedata.fun.pic.left_inset(index)">
                              <LeftOutlined />
                            </a-button>
                            <a-button type="text" size="small" @click="console.log('编辑')"> 
                              <EditOutlined />
                            </a-button>
                            <a-button type="text" size="small" @click="insetpagedata.fun.pic.del(index)"> 
                              <DeleteOutlined />
                            </a-button>
                            <a-button type="text" size="small" @click="insetpagedata.fun.pic.right_inset(index)">
                              <RightOutlined />
                            </a-button>
                        </a-space>
                      </div>

                    </div>
                  </template>
                  <!--主图为空-->
                  <p class="cursor Add_img" 
                    v-if="formdata.pic == undefined || formdata.pic.length < 5" 
                    @click="PAGEDATA.change_material_type('PicList')">
                    <a-flex justify="center" align="center" style="height: 100%;font-size: 12px;">
                      +主图
                    </a-flex>
                  </p>

                </div>

                </a-col>

              </a-row>

              <a-form 
                name="basic"
                style="margin-top: 20px;"
                :model="formdata"
                :rules="insetpagedata.fun.rule"
                >

                <a-form-item label="商品标题" name="name">
                  <a-input placeholder="输入商品标题不超过30个汉字" v-model:value="formdata.name" autoComplete="off"></a-input>
                </a-form-item>

                <!-- <a-form-item label="导购标题">
                  <a-input></a-input>
                </a-form-item> -->

                <a-divider orientation="left" orientation-margin="0px">商品分类 </a-divider>

                <a-form-item>
                  <a-row>
                    <a-col :span="12">
                      <a-space>
                        <a-button type="dashed" style="width: 120px;" @click="insetpagedata.fun.cate.check_cate" :loading="insetpagedata.fun.cate.loading.value">
                          点击预测分类
                        </a-button>
                        <a-select 
                          style="width: 300px;"
                          v-model:value="formdata.category_leaf_id"
                          :options="formdata.cate_op" 
                          placeholder="下拉选择商品分类" 
                          @change="insetpagedata.fun.cate.change"
                          :disabled="insetpagedata.fun.cate.state.value">
                      </a-select>
                    </a-space>
                    </a-col>
                    
                    <a-col :span="12">
                      <p style="padding: 8px 0 0 0;">PS:需要填写【标题】、【主图】后获取系统推荐的类目、以及属性;</p>
                    </a-col>
                  </a-row>
                    
                </a-form-item>
              </a-form>

              <!--属性组件-->
              <format_cp v-on:get_format="console.log('获取属性信息')" :data="formdata"/>

              

            </a-tab-pane>

            <a-tab-pane key="2" tab="图片视频" force-render>

              <!--图片信息-->
              <a-row>
                <a-col :span="4">
                  <p>白底图</p>
                  <div class="img_pic"></div>
                </a-col>
                <a-col :span="4">
                  <p>视频</p>
                  <div class="img_pic"></div>
                </a-col>

                <a-col :span="16">
                  <p>3:4主图</p>

                  <div class="img_pic"></div>

                  <!-- <p class="cursor Add_img" style="float: left;">
                    <a-flex justify="center" align="center" style="height: 100%;font-size: 12px;">
                      +3:4主图
                    </a-flex>
                  </p> -->
                </a-col>
              </a-row>


              <!--商品信息-->
              <div>
                <a-form>
                  <a-divider orientation="left" orientation-margin="0px">必填信息 </a-divider>
                  <a-row :gutter="[16,6]">
                    <a-col :span="8"><a-form-item label="商品类型"></a-form-item></a-col>
                    <a-col :span="8"><a-form-item label="支付方式"></a-form-item></a-col>
                    <a-col :span="8"><a-form-item label="库存类型"></a-form-item></a-col>
                    <a-col :span="8"><a-form-item label="客服电话"></a-form-item></a-col>
                    <a-col :span="8"><a-form-item label="提交方式"></a-form-item></a-col>
                    <a-col :span="8"><a-form-item label="运费模板"></a-form-item></a-col>
                  </a-row>

                  <a-divider orientation="left" orientation-margin="0px">选填信息 </a-divider>
                  <a-row :gutter="[16,6]">
                    <a-col :span="8"><a-form-item label="导购标题"></a-form-item></a-col>
                    <a-col :span="8"><a-form-item label="推荐语"></a-form-item></a-col>
                    <a-col :span="8"><a-form-item label="商家备注"></a-form-item></a-col>
                    <a-col :span="8"><a-form-item label="尺码模板"></a-form-item></a-col>
                    <a-col :span="8"><a-form-item label="售后服务"></a-form-item></a-col>
                    <a-col :span="8"><a-form-item label="发货模式"></a-form-item></a-col>
                  </a-row>

                  <a-divider orientation="left" orientation-margin="0px">限购信息</a-divider>
                  <a-row :gutter="[16,6]">
                    <a-col :span="8">
                      <a-form-item label="最少购买" placeholder="用户每次下单最少限购件数">
                      <a-input></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="最多购买" placeholder="用户每次下单最多限购件数">
                      <a-input></a-input>
                      </a-form-item></a-col>
                    <a-col :span="8">
                      <a-form-item label="累计限购" placeholder="每个用户累计限购件数">
                      <a-input></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </div>
            </a-tab-pane>


            <a-tab-pane key="3" tab="商品规格">

              <div style="margin-bottom: 10px;">
                <a-space size="small">
                  <a-input style="width: 300px;" placeholder="规格名称"></a-input>
                  <a-button type="dashed">+</a-button>
                  <a-button type="dashed">-</a-button>
                </a-space>
              </div>

              <a-row :gutter="[16,16]">
                
                <a-col :span="6">
                  <a-space size="small">
                    <a-input placeholder="规格值"></a-input>
                    <a-button type="text">删除</a-button>
                  </a-space>
                  <div style="width: 50px;height: 50px;background-color: #f2f2f2;margin: 10px 0 0 0;border-radius: 6px;">
                    <!--规格图片-->
                  </div>
                </a-col>

                <a-col :span="6">
                  <a-space size="small">
                    <a-input placeholder="规格值"></a-input>
                    <a-button type="text">删除</a-button>
                  </a-space>
                  <div style="width: 50px;height: 50px;background-color: #f2f2f2;margin: 10px 0 0 0;border-radius: 6px;">
                    <!--规格图片-->
                  </div>
                </a-col>

                <a-col :span="6">
                  <a-space size="small">
                    <a-input placeholder="规格值"></a-input>
                    <a-button type="text">删除</a-button>
                  </a-space>
                  <div style="width: 50px;height: 50px;background-color: #f2f2f2;margin: 10px 0 0 0;border-radius: 6px;">
                    <!--规格图片-->
                  </div>
                </a-col>

                <a-col :span="6">
                  <a-space size="small">
                    <a-input placeholder="规格值"></a-input>
                    <a-button type="text">删除</a-button>
                  </a-space>
                  <div style="width: 50px;height: 50px;background-color: #f2f2f2;margin: 10px 0 0 0;border-radius: 6px;">
                    <!--规格图片-->
                  </div>
                </a-col>
                <a-col :span="6">
                  <a-space size="small">
                    <a-input placeholder="规格值"></a-input>
                    <a-button type="text">删除</a-button>
                  </a-space>
                  <div style="width: 50px;height: 50px;background-color: #f2f2f2;margin: 10px 0 0 0;border-radius: 6px;">
                    <!--规格图片-->
                  </div>
                </a-col>

              </a-row>

              <div style="margin-top: 10px;">
                <a-button type="dashed">添加规格</a-button>
              </div>

            </a-tab-pane>

            <a-tab-pane key="4" tab="库存数量">

              <p>库存数量</p>
              <a-table :columns="stockData.columns" :data-source="stockData.data" bordered>
                <template #bodyCell="{ column, text }">
                  <template v-if="column.dataIndex === 'name'">
                    <a>{{ text }}</a>
                  </template>
                </template>
                <template #title>Header</template>
                <template #footer>Footer</template>
              </a-table>

            </a-tab-pane>

            <a-tab-pane key="5" tab="描述详情">

              <div style="margin-bottom: 10px;">
                <a-space>
                <a-button type="dashed">插入素材</a-button>
                <a-button type="dashed">清空</a-button>
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

            <a-tab-pane key="6" tab="商品属性">
              <format_cp v-on:get_format="console.log('获取属性信息')" :data="formdata"/>
            </a-tab-pane>
          </a-tabs>

        </div>

      </a-layout-content>

      <!--底部按钮--开始-->
      <a-affix :offset-bottom="1" v-if="!PAGEDATA.product_data">
          <div style="width: 100%;margin: 0 auto;text-align: center;padding: 10px 0 0 0;">
                <a-space align="end" style="height: 100%;">
                  <a-button type="primary" @click="handleOk">提交</a-button>
                  <a-button >取消</a-button>
              </a-space>
          </div>
      </a-affix>
      <!--底部按钮--结束-->
      
    </a-modal>
</template>
<script>

import { defineComponent,reactive,ref,shallowRef,onMounted,defineAsyncComponent,toRaw } from 'vue';
import { PlusOutlined,DeleteOutlined,MinusOutlined,MinusCircleOutlined,EditOutlined,LeftOutlined,RightOutlined,} from '@ant-design/icons-vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue' // 描述详情富媒体
import '@wangeditor/editor/dist/css/style.css' // 引入富媒体编辑器样式 css

import axios from 'axios'; // 网络请求
import * as TOOL from '@/assets/JS_Model/tool';// 常用工具
import * as utils from '@/assets/JS_Model/public_model';// 接口地址配置

import * as ProductEdit from '@/assets/douyinshop/productmanagement/edit';// 商品管理->编辑操作方法

// 页面
export default defineComponent({

    name: "edit",  // 筛选条件查询组件
    // 引用组件
    components: {
        Editor, // 详情编辑
        Toolbar, // 编辑工具栏
        PlusOutlined,
        DeleteOutlined,
        EditOutlined,
        LeftOutlined,
        RightOutlined,
        selectimg:defineAsyncComponent(() => import('@/components/AppMarket/Douyinshop/ProductList/selectImg.vue')),//素材组件
        format_cp:defineAsyncComponent(()=>import('@/components/AppMarket/Douyinshop/ProductList/edit_component/format_cp.vue')),// 商品属性组件
        
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

    // 父组件数据
    props: {

        data:{typr:Object}
  
    },

    setup(props, ctx) {

        const tool = new TOOL.TOOL()            // 工具方法
        const API = new utils.A_Patch()         // 请求接口地址合集
        
        // 选中卡片
        const activeKey = ref('1');

        // 页面配置
        const PAGEDATA = reactive({

          product_id: props.data.product_id,  // 编辑的商品id
          product_data: true,            // 页面绑定数据
          category_leaf_id:undefined,   // 类目id

          selectimg_open:false,          // 添加主图-图片显示状态配置
          // 图片组件获取地址后添加到页面容器：：：回调方法
          setimg_name:'',             // 添加图片的对象['PicList','long_img_List','white_img','video','des']
          Add_Callback:(data)=>{
              var type = PAGEDATA.setimg_name;        // 添加类型
              if(type == 'PicList'){                  // 判断回调type：：：主图添加
                  insetpagedata.fun.pic.add(data)                   // 添加主图方法
              }else if(type == 'long_img_List'){      // 判断回调type：：：3:4长图添加
                  // Longimg_Fun.add(data)               // 添加长图方法
              }else if(type == 'white_img'){          // 判断回调type：：：白底图添加
                  // whiteimg_Fun.add(data)              // 添加白底图方法
              }else if(type == 'video_info'){
                  // video_Fun.add(data)                 // 添加视频方法
              }else if(type == 'des'){                // 添加描述详情
                  // DES.add_img(data)
              }else if(type == 'spec_img'){           // 添加规格图片
                  // SPECS.add_img(data)
              }
          },
          change_material_type:(typeName)=>{
            PAGEDATA.selectimg_open = true;
            PAGEDATA.setimg_name = typeName; // 指定添加图片的对象
          }
        })

        // 表单数据
        const formdata = reactive({

            // 图片
            pic:[],     // 主图
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
            
            // 分类
            category_leaf_id:undefined, // 分类id
            cate_op:ref([]), // 分类选项

            // 属性
            product_format_new:undefined, // 商品详情属性== 通过/product/getCatePropertyV2获取 格式：{"property_id":[{"value":value,"name":"property_name","diy_type":0}]}, name的类型是string，value和diy_type的类型是number 度量衡参照open度量衡对接文档填写
            CateProperty:reactive({}), // 接口查询属性列表
            format_form_ref:undefined, // 属性表单验证对象
            format_form_data:reactive({}), // 属性表单绑定对象


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

        // 库存表格数据
        const stockData = reactive({
          columns:[
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'Cash Assets',
              className: 'column-money',
              dataIndex: 'money',
            },
            {
              title: 'Address',
              dataIndex: 'address',
            },
          ],
          data:[
            {
              key: '1',
              name: 'John Brown',
              money: '￥300,000.00',
              address: 'New York No. 1 Lake Park',
            },
            {
              key: '2',
              name: 'Jim Green',
              money: '￥1,256,000.00',
              address: 'London No. 1 Lake Park',
            },
            {
              key: '3',
              name: 'Joe Black',
              money: '￥120,000.00',
              address: 'Sidney No. 1 Lake Park',
            },
          ]
        })
        
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

        const insetpagedata = new ProductEdit.Insetpagedata() // 加载数据方法
        
        insetpagedata.product_id = props.data.product_id;// 商品id初始化

        insetpagedata.PAGEDATA = PAGEDATA;// 商品id初始化

        insetpagedata.formdata = formdata;// 商品表单初始化
        

        // 在组件挂载时添加事件监听器
        onMounted(() => {
          
          insetpagedata.load() // 加载页面

        });

        // 提交
        const handleOk = e => {

          // 获取商品表单信息
          insetpagedata.product_form.get()

        };

        const inputRef = ref();
        const name = ref();



        return{
            PAGEDATA,
            props,
            formdata,
            handleOk,
            activeKey,
            stockData, // 库存数据
            editorRef, // 富媒体编辑
            DES, // 描述数据
            insetpagedata,// 数据操作方法
            // inputRef,
            // name,
            
      }
    }
})
</script>
<style scoped>
.formatboxstyle{width: 25%;height: 100px;padding: 0 10px 0 0;float: left;}
.content{padding: 0;margin: 20px 0 0 0;background: '#fff';overflow-y: auto;overflow-x: hidden;height: 90vh;}
.load_center{height: 100%;width: 100%;display: flex;justify-content: center;align-items: center;}
.img_pic{height: 100px;width: 100px;border: 1px #f2f2f2 solid; border-radius: 4px;padding: 10px;}
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