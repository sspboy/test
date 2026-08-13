<template>
    <a-drawer
        v-model:open="props.open.open"
        title="商品发布规则"
        placement="right"
        width="80%"
        :closable="true"
        :maskClosable="true"
        :footer-style="{ textAlign: 'left' }"
    >

    <div class="delivery-method">

        <div>当前类目：撒范德萨分</div>

    </div>

    <a-row :gutter="[16,16]">

        <!---商品标题推荐规则-->
        <a-col :span="6">
            <a-card style="height: 200px;">
                <template #title>
                    <h5>商品标题推荐规则</h5>
                </template>
                <a-card-grid style="width: 100%;text-align: center" class="font_size_12">
                    <div class="rule-key-item rule-key-item—list">标题非法关键词规则</div>
                    <div class="rule-key-item rule-key-item—list">品牌没有权限是否可以勾选</div>
                    <div class="rule-key-item rule-key-item—list">前缀规则是否包含品牌</div>
                    <div class="rule-key-item rule-key-item—list">标题长度规则</div>
                    <div class="rule-key-item rule-key-item—list">类目id是否命中前缀推荐规则</div>
                    <div 
                        class="rule-key-item rule-key-item—list"
                        style="color: #1890ff;"
                        @click="more_stats.recommend_name_stats = !more_stats.recommend_name_stats"
                    >查看详情 >></div>
                </a-card-grid>
            </a-card>
        </a-col>

        <!--参考价相关规则-->
        <a-col :span="6">
            <a-card style="height: 200px;">
                <template #title>
                    <h5>参考价相关规则</h5>
                </template>
                <a-card-grid style="width: 100%; text-align: center">
                    <div class="rule-key-item rule-key-item—list font_size_12">
                        参考价:{{ props.data.reference_price_rule.is_support ? '可填写参考价' : '不可填写参考价' }}
                    </div>
                    <div class="rule-key-item rule-key-item—list font_size_12">
                        参考价:{{ props.data.reference_price_rule.is_required ? '是' : '否' }}必填
                    </div>
                    
                    <div class="rule-key-item font_size_12" style="text-align: left;">
                        参考价最高高于最低SKU价格的{{ props.data.reference_price_rule.lower_sku_price_times }}倍
                    </div>

                    <div class="rule-key-item font_size_12">
                        凭证类型：<span v-for="(value,index) in props.data.reference_price_rule.certificate_types">{{value}}-</span>
                    </div>
                </a-card-grid>
            </a-card>
        </a-col>

        <!--sku规则-->
        <a-col :span="6" >
            <a-card style="height: 200px;">
                <template #title>
                    <h5>sku规则</h5>
                </template>
                <a-card-grid style="width: 100%; text-align: center" class="font_size_12">

                    <div class="rule-key-item rule-key-item—list">
                        区域库存:{{props.data.sku_rule.area_stock_require ? '必填' : '非必填'}}
                    </div>

                    <div class="rule-key-item rule-key-item—list">
                        国补型号:{{ props.data.sku_rule.support_spec_model_code ? '支持' : '不支持' }}
                    </div>

                    <div class="rule-key-item rule-key-item—list">
                        条形码:{{ props.data.sku_rule.support_barcode ? '支持' : '不支持' }}
                    </div>

                    <div class="rule-key-item rule-key-item-for-x">
                        <span>
                            <template v-if="props.data.sku_rule.sku_picture_rule.require_type === 1">
                                必填且所有SKU必须填写
                            </template>
                            <template v-if="props.data.sku_rule.sku_picture_rule.require_type === 2">
                                非必填 要么全部填写或为空 不允许部分填写
                            </template>
                        </span>                         
                    </div>
                </a-card-grid>
            </a-card>
        </a-col>
        
        <!--资质规则-->
        <a-col :span="6">
            <a-card style="height: 200px;">
                <template #title>
                    <h5>资质规则</h5>
                </template>
                <a-card-grid style="width: 100%; text-align: center">
                    <div class="rule-key-item rule-key-item—list font_size_12" v-for="(value,index) in props.data.qualification_rule" :key="index">
                        {{ value.name }}
                        <span style="margin-left: 4px;">{{ value.is_required ? '必填' : '非必填' }}</span>
                    </div>
                </a-card-grid>
            </a-card>
        </a-col>

        <!--商品尺码模板配置规则-->
        <a-col :span="6">
            <a-card style="height: 200px;">
                <template #title>
                    <h5>商品尺码模板配置规则</h5>
                </template>
                <a-card-grid style="width: 100%;text-align: center" class="font_size_12">
                    <div class="rule-key-item rule-key-item—list">
                        尺码信息
                        <a-tag class="font_size_12" v-if="props.data.component_template_rule.is_show">展示</a-tag>
                        <a-tag class="font_size_12" v-else="props.data.component_template_rule.is_show">不展示</a-tag>
                    </div>
                    <div class="rule-key-item rule-key-item—list">
                        尺码信息
                        <a-tag class="font_size_12" v-if="props.data.component_template_rule.must_input">必填</a-tag>
                        <a-tag class="font_size_12" v-else="props.data.component_template_rule.must_input">非必填</a-tag>
                    </div>
                    <div class="rule-key-item rule-key-item-for-x" style="text-align: left;">
                        当前类目支持的尺码模版子类型
                        <a-tag >{{ Rule_cast_fun.transfer_name(props.data.component_template_rule.support_template_sub_type) }}</a-tag>
                    
                    </div>
                    <div class="rule-key-item rule-key-item—list" 
                    style="color: #1890ff;"
                    @click="more_stats.component_template_stats = !more_stats.component_template_stats"

                    >查看详情 >></div>
                </a-card-grid>
            </a-card>
        </a-col>

        <!--售后服务-->
        <a-col :span="6">
            <a-card style="height: 200px;">
                <template #title>
                    <h5>售后服务</h5>
                </template>
                <a-card-grid style="width: 100%;text-align: center" class="font_size_12">
                    <div class="rule-key-item rule-key-item—list">三包服务承诺配置</div>
                    <div class="rule-key-item rule-key-item—list">过敏包退规则</div>
                    <div class="rule-key-item rule-key-item—list">大件商品规则</div>
                    <div class="rule-key-item rule-key-item—list">无理由退货规则</div>
                    <div 
                        class="rule-key-item rule-key-item—list" 
                        style="color: #1890ff;"
                        @click="more_stats.after_sale_stats = !more_stats.after_sale_stats"
                        >查看详情 >></div>

                </a-card-grid>
            </a-card>
        </a-col>

        

        <!--商品规格约束-->
        <a-col :span="6">
            <a-card style="height: 200px;">
                <template #title>
                    <h5>商品规格约束</h5>
                </template>
                <a-card-grid style="width: 100%;text-align: center" class="font_size_12">
                    <div class="rule-key-item rule-key-item—list">是否支持规格项自定义</div>
                    <div class="rule-key-item rule-key-item—list">是否支持顺序调整</div>
                    <div class="rule-key-item rule-key-item—list">最大规格层级数量</div>
                    <div class="rule-key-item rule-key-item—list">sku组合数量上限</div>
                    <div class="rule-key-item rule-key-item—list">单规格值数量上限</div>
                    <div 
                        class="rule-key-item rule-key-item—list" 
                        style="color: #1890ff;"
                        @click="more_stats.product_spec_stats = !more_stats.product_spec_stats"
                        >查看详情 >></div>

                </a-card-grid>
            </a-card>
        </a-col>


        <!--履约规则-->
        <a-col :span="6">
            <a-card style="height: 200px;">
                <template #title>
                    <h5>履约规则</h5>
                </template>
                <a-card-grid style="width: 100%;text-align: center" class="font_size_12">
                    <div class="rule-key-item rule-key-item—list">发货地规则</div>
                    <div class="rule-key-item rule-key-item—list">现货发货规则</div>
                    <div class="rule-key-item rule-key-item—list">阶梯发货规则</div>
                    <div class="rule-key-item rule-key-item—list">全款预售规则</div>
                    <div class="rule-key-item rule-key-item—list">SKU预售规则</div>
                    <div class="rule-key-item rule-key-item—list" style="color: #1890ff;" @click="more_stats.fulfillment_stats = !more_stats.fulfillment_stats">查看详情 >></div>
                </a-card-grid>
            </a-card>
        </a-col>

        <!--SPU管控规则-->
        <!-- <a-col :span="6">

            <a-card title="SPU管控规则" style="height: 200px;">

                <a-card-grid style="width: 100%;text-align: center" class="font_size_12">
                    <div class="rule-key-item rule-key-item—list">
                        SPU发品:{{ props.data.spu_control_rule.support_spu_product ? '支持' : '不支持' }}
                    </div>

                    <div class="rule-key-item rule-key-item—list">
                        SPU管控:<span v-if="props.data.spu_control_rule.control_type == 0">不管控</span>
                        <span v-else-if="props.data.spu_control_rule.control_type == 1">弱管控</span>
                        <span v-else-if="props.data.spu_control_rule.control_type == 2">强管控</span>
                    </div>

                    <div class="rule-key-item rule-key-item—list">
                        新建SPU:{{ props.data.spu_control_rule.support_create_spu ? '支持' : '不支持' }}
                    </div>

                    <div class="rule-key-item rule-key-item—list">
                        SPU纠错:{{ props.data.spu_control_rule.support_rectify_spu ? '支持' : '不支持' }}
                    </div>

                    <div class="rule-key-item rule-key-item—list">
                        SPU举报:{{ props.data.spu_control_rule.support_report_spu ? '支持' : '不支持' }}
                    </div>

                    <div class="rule-key-item rule-key-item—list">
                        SPU免审:{{ props.data.spu_control_rule.no_need_audit_spu ? '支持' : '不支持' }}
                    </div>
                </a-card-grid>

            </a-card>
        </a-col> -->

        <!--商品主图3:4配置规则-->
        <a-col :span="6" >
            <a-card>
            <template #title>
                <h5>商品主图3:4配置规则</h5>
            </template>
            <div class="rule-key-item font_size_12 rule-key-item—list">
                {{ props.data.main_image_three_to_four_rule.is_show ? '展示' : '不展示' }}-主图3:4信息
            </div>

            <div class="rule-key-item font_size_12 rule-key-item—list">
                主图3:4信息-{{ props.data.main_image_three_to_four_rule.must_input ? '必填' : '非必填' }}
            </div>
            </a-card>
        </a-col>


        <!--交易相关的规则-->
        <a-col :span="6">
            <a-card>
                <template #title>
                    <h5>交易相关的规则</h5>
                </template>
                <div class="rule-key-item font_size_12">
                    {{ props.data.trade_rule.support_auto_charge_rule.value ? '支持自动充值' : '不支持自动充值' }}
                </div>
            </a-card>
        </a-col>


        <!--提取方式-->
        <a-col :span="6">
            <a-card>
                <template #title>
                    <h5>提取方式</h5>
                </template>
                <div class="rule-key-item font_size_12">
                    是否可能设置订单页展示核销入口:
                    {{ props.data.pick_up_method_rule.virtual_goods_rule.support_show_checkout_entry ? '使用电子凭证或充值直连' : '不支持' }}
                </div>
            </a-card>
        </a-col>
        

        <!--其他规则-->
        <a-col :span="6">
            <a-card>
                <template #title>
                    <h5>其他规则</h5>
                </template>
                <div class="rule-key-item font_size_12">
                    {{ props.data.extra_rule.c2b_customize_rule.enable ? '支持c2b定制' : '不支持c2b定制' }}
                </div>
            </a-card>
        </a-col>
    </a-row>

    <!--更多商品尺码 信息 多层抽屉 -->
    <a-drawer v-model:open="more_stats.component_template_stats" title="商品尺码模板配置规则" width="320" :closable="false">
        <a-row :gutter="[16,16]">
            <a-col :span="24">尺码信息是否必填 -
                <a-tag v-if="props.data.component_template_rule.must_input">必填</a-tag>
                <a-tag v-else="props.data.component_template_rule.must_input">非必填</a-tag>
            </a-col>
            <a-col :span="24">是否展示尺码信息-
                <a-tag v-if="props.data.component_template_rule.is_show">展示</a-tag>
                <a-tag v-else="props.data.component_template_rule.is_show">不展示</a-tag>
            </a-col>
            <a-col :span="24">区间符号-
                <a-tag >{{ props.data.component_template_rule.interval_size_symbol }}</a-tag>
            </a-col>

            <a-col :span="24">
                当前类目支持的尺码模版子类型-
                <a-tag >{{ Rule_cast_fun.transfer_name(props.data.component_template_rule.support_template_sub_type) }}</a-tag>
            </a-col>

            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>尺码列规则</h5></a-divider>

                <a-tag v-if="tool.Fun_.isEmpty(props.data.component_template_rule.size_dimension_rule)">暂无</a-tag>
                
            </a-col>


            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>偏码建议</h5></a-divider>
                    是否支持偏码-
                    <a-tag v-if="props.data.component_template_rule.correct_size_suggestion.available">支持</a-tag>
                    <a-tag v-else="props.data.component_template_rule.correct_size_suggestion.available">不支持</a-tag>                
            </a-col>

            <a-col :span="24">

                <a-divider orientation="left" orientation-margin="0px"><h5>尺码列配置</h5></a-divider>

                <p style="margin: 20px 0 20px 0;">有用列:</p>

                <a-space  wrap>
                    <template v-for="us in props.data.component_template_rule.size_dimensions.useful_dimensions">
                        <a-tag>{{us}}</a-tag>
                    </template>
                </a-space>

                <p style="margin: 30px 0 20px 0;">其他可用列:</p>

                <a-space wrap>
                    <template v-for="os in props.data.component_template_rule.size_dimensions.other_dimensions">
                        <a-tag>{{os}}</a-tag>
                    </template>
                </a-space>

            </a-col>
            <a-col :span="24">

                <a-divider orientation="left" orientation-margin="0px"><h5>维度下尺码范围</h5></a-divider>
                    <a-row :gutter="[8,18]" >
                        <template v-for="(o_value, s_key) in props.data.component_template_rule.size_dimension_range">
                        <a-col class="font_size_12" :span="8">{{s_key}}</a-col>
                        <a-col class="font_size_12" :span="8">最小值:{{ o_value.min }}</a-col>
                        <a-col class="font_size_12" :span="8">最大值:{{ o_value.max }}</a-col>
                        </template>

                    </a-row>
            </a-col>


        </a-row>
        
        <template #footer><a-button @click="more_stats.component_template_stats = false">关闭</a-button></template>
    </a-drawer>



    <!--更多售后服务 信息 多层抽屉 -->
    <a-drawer v-model:open="more_stats.after_sale_stats" title="售后服务" width="320" :closable="false">

        <a-row :gutter="[16,16]">


            <a-col :span="24">

                <a-divider orientation="left" orientation-margin="0px"><h5>无理由退货规则</h5></a-divider>
                
                <p>是否支持七天无理由:
                    <a-tag v-if="props.data.after_sale_rule.supply_day_return_rule.enable">支持</a-tag>
                    <a-tag v-else="props.data.after_sale_rule.supply_day_return_rule.enable">不支持</a-tag>
                </p>

                <div v-for="day_7 in props.data.after_sale_rule.supply_day_return_rule.options">
                    <p >
                        可选的无理由退货选项列表: {{ day_7.name }} {{  day_7.value  }}
                    </p>

                </div>
                
            </a-col>



            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>三包服务承诺配置规则</h5></a-divider>
                <p>
                    是否必填:
                    <a-tag v-if="props.data.after_sale_rule.three_guarantees.must_select">必填</a-tag>
                    <a-tag v-else="props.data.after_sale_rule.three_guarantees.must_select">非必填</a-tag>
                </p>
                <p>是否支持三包服务:
                    <a-tag v-if="props.data.after_sale_rule.three_guarantees.enable">支持</a-tag>
                    <a-tag v-else="props.data.after_sale_rule.three_guarantees.enable">不支持</a-tag>
                </p>

                <div v-for="sbao in props.data.after_sale_rule.three_guarantees.options">
                    <p >
                        三包服务类型: <a-tag v-if="sbao.value==='1'">寄修</a-tag> <a-tag v-else-if="sbao.value==='2'">延保</a-tag>
                        
                        {{ sbao.name }}
                    </p>
                    <p>可选项目：</p>
                    <p>
                        <a-tag v-for="sbao_s in sbao.options" style="margin-bottom: 8px;">{{ sbao_s.name }}</a-tag>
                    </p>
                </div>
            </a-col>


            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>过敏包退规则</h5></a-divider>
                <p>
                    是否可选过敏包退:
                    <a-tag v-if="props.data.after_sale_rule.allergy_return_v2_rule.enable === 'true'">可选</a-tag>
                    <a-tag v-else>不可选</a-tag>
                </p>
                <p>
                    是否必选过敏包退:
                    <a-tag v-if="props.data.after_sale_rule.allergy_return_v2_rule.must_select === 'true'">必选</a-tag>
                    <a-tag v-else>非必选</a-tag>
                </p>
                
            </a-col>
            
            
            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>大件商品规则</h5></a-divider>
                
                <p>
                    是否可选大件商品:
                    <a-tag v-if="props.data.after_sale_rule.large_product_rule.enable">可选</a-tag>
                    <a-tag v-else>不可选</a-tag>
                </p>
                <p>
                    是否必须大件商品:
                    <a-tag v-if="props.data.after_sale_rule.large_product_rule.must_select">必须</a-tag>
                    <a-tag v-else>不必须</a-tag>
                </p>

            </a-col>
        </a-row>
        <template #footer><a-button @click="more_stats.after_sale_stats = false">关闭</a-button></template>
    </a-drawer>



    <!--更多商品规格规则 信息 多层抽屉 -->
    <a-drawer 
        v-model:open="more_stats.product_spec_stats" 
        title="商品规格规则" 
        width="320" 
        :closable="false">
        <a-row :gutter="[16,16]">
            
            <a-col :span="24">
                
                <p>
                    规格图填写规则：
                    <a-tag v-if="props.data.product_spec_rule.all_spec_pic_required">规格图要么全不填，要么全填</a-tag>
                    <a-tag v-else>不限制</a-tag>
                </p>

            </a-col>

            <a-col :span="24">
                <p>
                    是否支持规格项顺序调整：
                    <a-tag v-if="props.data.product_spec_rule.support_property_sequence_variable">支持</a-tag>
                    <a-tag v-else>不支持</a-tag>
                </p>
            </a-col>

            <a-col :span="24">
                <p>
                    最大可支持的规格层级数量: <a-tag>{{ props.data.product_spec_rule.max_spec_num_limit }} 级</a-tag>
                </p>
            </a-col>
            <a-col :span="24">
                <p>
                sku组合数量上限： <a-tag>{{ props.data.product_spec_rule.spec_combination_limit }}</a-tag>
                </p>
            </a-col>
            <a-col :span="24">
                <p>
                单个规格的规格值数量上限：<a-tag>{{ props.data.product_spec_rule.spec_single_limit }}</a-tag>
                </p>
            </a-col>
            <a-col :span="24">
                <p>
                是否支持规格项自定义：
                <a-tag v-if="props.data.product_spec_rule.support_property_diy">支持</a-tag>
                <a-tag v-else>不支持</a-tag>
                </p>
            </a-col>
            <a-col :span="24">
                <p>系统推荐商品规格列表：</p>
                <a-tag v-for="spec_obj in props.data.product_spec_rule.required_spec_details">
                    {{ spec_obj.sell_property_name }} 
                    <span v-if="spec_obj.is_required">-必填</span>
                    <span v-else>-非必填</span>

                </a-tag>
            </a-col>


        </a-row>
        <template #footer><a-button @click="more_stats.product_spec_stats = false">关闭</a-button></template>

    </a-drawer>

    <!--更 履约规则 信息 多层抽屉 -->
    <a-drawer 
        v-model:open="more_stats.fulfillment_stats" 
        title="履约规则" 
        width="320" 
        :closable="false">
        <a-row :gutter="[16,16]">
          <a-col :span="24">
            <a-divider orientation="left" orientation-margin="0px"><h5>发货地规则</h5></a-divider>
            <p>
                是否必填:
                <a-tag v-if="props.data.fulfillment_rule.shipping_origin_rule.must_select">必填</a-tag>
                <a-tag v-else>非必填</a-tag>
            </p>
            <p>
                是否支持:
                <a-tag v-if="props.data.fulfillment_rule.shipping_origin_rule.enable">支持</a-tag>
                <a-tag v-else>不支持</a-tag>
            </p>

            </a-col>
          <!-- <a-col :span="24">
            <a-divider orientation="left" orientation-margin="0px"><h5>特殊时间延迟发货规则</h5></a-divider>
            <p>支持的配置类型:</p>
            <p>规则开始时间</p>
            <p>规则结束时间</p>

          </a-col> -->
          <a-col :span="24">
            <a-divider orientation="left" orientation-margin="0px"><h5>现货发货模式规则</h5></a-divider>
            
            <p>
                
                是否支持:
                <a-tag v-if="props.data.fulfillment_rule.normal_rule.support">支持</a-tag>
                <a-tag v-else>不支持</a-tag>
            </p>
            <p>
                发货时效:
                <a-tag v-for=" fa_obj in props.data.fulfillment_rule.normal_rule.delay_options">
                    <span v-if="fa_obj === 9999">当日发</span>
                    <span v-else-if="fa_obj === 1">次日发</span>
                    <span v-else-if="fa_obj === 2">48小时发</span>
                </a-tag>
            </p>
            <p>是否是特殊的时间发货:
                <a-tag v-if="props.data.fulfillment_rule.normal_rule.is_special_delay_option">支持</a-tag>
                <a-tag v-else>不支持</a-tag>
            </p>
          </a-col>
          <a-col :span="24">

            <a-divider orientation="left" orientation-margin="0px"><h5>阶梯发货模式规则</h5></a-divider>
            <p>
                是否支持:
                <a-tag v-if="props.data.fulfillment_rule.step_rule.support">支持</a-tag>
                <a-tag v-else>不支持</a-tag>
            </p>

            <p>现货部分延迟返货时间范围:</p>
            <a-tag v-for=" fa_obj in props.data.fulfillment_rule.step_rule.delay_options">
                <span v-if="fa_obj === 9999">当日发</span>
                <span v-else-if="fa_obj === 1">次日发</span>
                <span v-else-if="fa_obj === 2">48小时发</span>
            </a-tag>
            
            <p style="margin-top: 20px;">支持的时效列表:</p>
            <a-space wrap>
            <a-tag v-for=" step_obj in props.data.fulfillment_rule.step_rule.multi_times">
                {{ step_obj.time_desc }}
            </a-tag></a-space>
            

          </a-col>

          <a-col :span="24">
            <a-divider orientation="left" orientation-margin="0px"><h5>全款预售发货模式规则</h5></a-divider>
            <p>
                是否支持:
                <a-tag v-if="props.data.fulfillment_rule.product_presell_rule.support">支持</a-tag>
                <a-tag v-else>不支持</a-tag>
            </p>
          </a-col>

          <a-col :span="24">
            <a-divider orientation="left" orientation-margin="0px"><h5>SKU预售发货模式规则</h5></a-divider>
            <p>
                是否支持:
                <a-tag v-if="props.data.fulfillment_rule.sku_presell_rule.support">支持</a-tag>
                <a-tag v-else>不支持</a-tag>
            </p>
          </a-col>
          <a-col :span="24">
            <a-divider orientation="left" orientation-margin="0px"><h5>现货+预售发货规则（现货预售混合）</h5></a-divider>
            <p>
                是否支持:
                <a-tag v-if="props.data.fulfillment_rule.time_sku_presell_with_normal_rule.support">支持</a-tag>
                <a-tag v-else>不支持</a-tag>
            </p>
          </a-col>
          <a-col :span="24">
            <a-divider orientation="left" orientation-margin="0px"><h5>新预售发货模式规则（现货预售混合）</h5></a-divider>
            <p>
                是否支持:
                <a-tag v-if="props.data.fulfillment_rule.time_sku_pure_presell_rule.support">支持</a-tag>
                <a-tag v-else>不支持</a-tag>
            </p>
          </a-col>
        </a-row>
        <template #footer><a-button @click="more_stats.fulfillment_stats = false">关闭</a-button></template>

    </a-drawer>


    <!--更多商品标题规则 信息 多层抽屉 -->
    <a-drawer 
        v-model:open="more_stats.recommend_name_stats" 
        title="商品标题规则" 
        width="320" 
        :closable="false">
        <a-row :gutter="[16,16]">
            
            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>商品标题非法关键词规则</h5></a-divider>
                
                <div v-for="(a_value,key) in props.data.recommend_name_rule.title_illegal_keyword_rule" style="line-height: 26px;">
                    {{ a_value.tip }}
                </div>

            </a-col>
            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>品牌没有权限是否可以勾选</h5></a-divider>
                <a-tag v-if="props.data.recommend_name_rule.prefix_brand_unauth_can_sel">可以勾选</a-tag>
                <a-tag v-else>不能勾选</a-tag>
            </a-col>
            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>前缀规则是否包含品牌</h5></a-divider>
                
                <a-tag v-if="props.data.recommend_name_rule.prefix_prop_has_brand">包含品牌</a-tag>
                <a-tag v-else>不包含</a-tag>
            </a-col>
            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>标题长度规则</h5></a-divider>
                标题最长：<a-tag>{{ props.data.recommend_name_rule.title_limit_rule.max_length }}</a-tag>字符
                标题最短：<a-tag>{{ props.data.recommend_name_rule.title_limit_rule.min_length }}</a-tag>字符
            </a-col>
            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>当前类目id是否命中前缀推荐规则</h5></a-divider>
                <a-tag v-if="props.data.recommend_name_rule.satisfy_prefix">命中</a-tag>
                <a-tag v-else>未命中</a-tag>
            </a-col>
            <!-- <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>命中规则的属性id详情</h5></a-divider>
                {{ props.data.recommend_name_rule.property_ids }}
            </a-col> -->

        </a-row>
    </a-drawer>


    <template #footer>
        <a-button @click="props.open.open = false">关闭</a-button>
    </template>

  </a-drawer>
</template>

<script>
import { t } from '@wangeditor/editor';
import { defineComponent, ref, computed, watch, onMounted, reactive } from 'vue'
import * as TOOL from '@/assets/JS_Model/tool';


export default defineComponent({
  name: '发布商品规则',
  
  props: {
    data: {
      type: Object,
    //   required: true,
    },
    open: {
        type: Object
        }
  },
  
  emits: ['update', 'change'],
  
  setup(props, { emit, attrs, slots, expose }) {

    const tool = new TOOL.TOOL()            // 工具方法

    // 二次抽屉开关控制
    const more_stats = reactive({
        "recommend_name_stats":false,// 商品标题 规则
        "component_template_stats":false, // 商品尺码 更多信息抽屉状态
        "after_sale_stats":false, // 售后服务 更多信息抽屉状态
        "product_spec_stats":false, // 商品规格 更多信息抽屉状态
        "fulfillment_stats":false, // 履约 更多信息抽屉状态
    })


    const Rule_cast_fun = reactive({
            // 尺码模板名称转移
        transfer_name:(data)=>{

            if(data === 'clothing'){
                return '服饰'
            }else if(data === 'children'){
                return '童装'
            }else if(data === 'undies'){
                return '内衣'

            }else if(data === 'shoes'){
                return '鞋靴'

            }else if(data === 'shoes'){
                return '鞋靴'
            }else if(data === 'bracelet'){
                return '手镯'
            }else if(data === 'ring'){
                return '戒指'
            }

        }


    })


    const activeIndex = ref(0);

    const ruleList = computed(() => {
        if (!props.data) return [];
        return Object.keys(props.data).map((key, index) => ({
            key,
            index,
            title: RULEFUN.escape(key),
            data: props.data[key]
        }));
    });

    const currentRule = computed(() => {
        return ruleList.value[activeIndex.value] || null;
    });

    const handleKeyClick = (index) => {
        activeIndex.value = index;
    };

    const RULEFUN = reactive({

        // 名称验证
        escape:(keytext)=>{
            
            if(keytext == 'fulfillment_rule'){
                return '履约规则'
                
            }else if(keytext == 'recommend_name_rule'){
                return '商品标题推荐规则'

            }else if(keytext === 'after_sale_rule'){
                return '售后服务规则'

            }else if(keytext === 'reference_price_rule'){
                return '参考价相关规则'

            }else if(keytext === 'spu_control_rule'){
                return 'SPU管控规则'

            }else if(keytext === 'product_spec_rule'){
                return '商品规格约束'

            }else if(keytext === 'component_template_rule'){
                return '商品尺码模板配置规则'

            }else if(keytext === 'main_image_three_to_four_rule'){
                return '商品主图3:4配置规则'

            }else if(keytext === 'gold_price_rule'){
                return '金价信息'

            }else if(keytext === 'extra_rule'){
                return '其他规则'

            }else if(keytext === 'trade_rule'){
                return '交易相关的规则'

            }else if(keytext === 'sku_rule'){
                return 'sku规则'

            }else if(keytext === 'qualification_rule'){
                return '资质规则'

            }else if(keytext === 'pick_up_method_rule'){
                return '提取方式'

            }else if(keytext === 'merchant_cargo_rule'){
                return '商家货品规则'

            }

        }

    })



    

    
    

    
    // 暴露给父组件的方法
    expose({
      reset: () => { count.value = 0 }
    })
    
    return {
        props,
        tool,
        activeIndex,
        currentRule,
        RULEFUN,
        handleKeyClick,
        more_stats,
        Rule_cast_fun
    }
  }
})
</script>

<style scoped>
.list_p{color: #666;margin: 20px;}
.rule-key-item—list{width: 50%;float: left;text-align: left;}
.rule-key-item-for-x{width: 100%;clear: both;text-align: left;padding: 0 0 0 8px;color: #666;font-size: 12px;line-height: 20px;}
.rule-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.delivery-method {
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 10px;
  flex-shrink: 0;
}
.rule-key-row {
  margin-bottom: 16px;
  flex-shrink: 0;
}
.rule-key-item {
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rule-key-item:hover {
  color: #1890ff;
  background: #e6f7ff;
}
.rule-key-item.active {
  color: #1890ff;
  background: #e6f7ff;
  font-weight: 500;
}
.rule-content {
  border: 1px solid #eee;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
  height: calc(100vh - 380px);
  display: flex;
  flex-direction: column;
}
.rule-content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background: #fafafa;
}
.rule-content-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}
.rule-content-key {
  font-size: 12px;
  color: #999;
}
.rule-json {
  margin: 0;
  padding: 16px;
  flex: 1;
  overflow: auto;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #333;
  background: #fff;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>