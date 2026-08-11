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
                    <div class="rule-key-item rule-key-item—list">命中规则的属性id详情</div>
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

                    >查看更多 >></div>
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
                        >查看更多 >></div>

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
                        >查看更多 >></div>

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
                    <div class="rule-key-item rule-key-item—list">发货地规则</div>
                    <div class="rule-key-item rule-key-item—list">发货地规则</div>
                    <div class="rule-key-item rule-key-item—list">发货地规则</div>
                    <div class="rule-key-item rule-key-item—list">发货地规则</div>
                    <div class="rule-key-item rule-key-item—list" style="color: #1890ff;" @click="more_stats.fulfillment_stats = !more_stats.fulfillment_stats">查看更多 >></div>
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
            </a-col>
            
            
            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>大件商品规则</h5></a-divider>
            </a-col>
            
            
            <a-col :span="24">
                <a-divider orientation="left" orientation-margin="0px"><h5>无理由退货规则</h5></a-divider>
            </a-col>
        
        
        </a-row>
        <template #footer><a-button @click="more_stats.after_sale_stats = false">关闭</a-button></template>
    </a-drawer>



    <!--更多商品规格规则 信息 多层抽屉 -->
    <a-drawer v-model:open="more_stats.product_spec_stats" title="商品规格规则" width="320" :closable="false">
        <a-row :gutter="[16,16]">
          <a-col :span="24">更多商品规格规则</a-col>
        </a-row>
        <template #footer><a-button @click="more_stats.product_spec_stats = false">关闭</a-button></template>

    </a-drawer>

    <!--更 履约规则 信息 多层抽屉 -->
    <a-drawer v-model:open="more_stats.fulfillment_stats" title="履约规则" width="320" :closable="false">
        <a-row :gutter="[16,16]">
          <a-col :span="24">更多履约规则</a-col>
        </a-row>
        <template #footer><a-button @click="more_stats.fulfillment_stats = false">关闭</a-button></template>

    </a-drawer>

    <a-row :gutter="[16,16]" class="rule-key-row" style="margin-top: 30px;">
        <a-col v-for="(item,key,index) in props.data" :span="6" :key="index">
            <div
                class="rule-key-item"
                :class="{ active: activeIndex === index }"
                @click="handleKeyClick(index)"
            >{{RULEFUN.escape(key)}}</div>
        </a-col>
    </a-row>

    <div class="rule-content" v-if="currentRule">


        <div class="rule-content-header">
            <span class="rule-content-title">{{ currentRule.title }}</span>
            <span class="rule-content-key">{{ currentRule.key }}</span>
        </div>

        <!--其它规则-->
        <template v-if="currentRule.key === 'extra_rule'">
            <div v-if="currentRule.data.home_install_service_rule !== undefined">
                <p class="list_p">嘻嘻哈哈</p>
            </div>
            <div v-if="currentRule.data.c2b_customize_rule !== undefined">
                <p v-if="currentRule.data.c2b_customize_rule.enable === true" class="list_p">支持c2b定制</p>
                <p v-else class="list_p">不支持c2b定制</p>
            </div>
        </template>


        <!--主图3:4信息-->
        <template v-else-if="currentRule.key === 'main_image_three_to_four_rule'">
            {{ currentRule.data.main_image_three_to_four_rule }}
            <p class="list_p">
                是否展示主图3:4信息:{{ currentRule.data.is_show ? '展示' : '不展示' }}
            </p>

            <p class="list_p">
                主图3:4信息是否必填:{{ currentRule.data.must_input ? '必填' : '非必填' }}
            </p>

        </template>

        <!--参考价格规则-->
        <template v-else-if="currentRule.key === 'reference_price_rule'">
            <p class="list_p">
                是否可填写参考价:{{ currentRule.data.is_support ? '支持' : '不支持' }}
            </p>

        </template>

        <!--提取方式-->
        <template v-else-if="currentRule.key === 'pick_up_method_rule'">

            <p class="list_p">
                是否可能设置订单页展示核销入口:{{ currentRule.data.virtual_goods_rule.support_show_checkout_entry ? '使用电子凭证或充值直连' : '不支持' }}
            </p>
        </template>

        <!--资质规则-->
        <template v-else-if="currentRule.key === 'qualification_rule'" >
            <div class="rule-json">

            <div v-for="q_item in currentRule.data" >

                <h4 class="list_p">{{ q_item.name }}</h4>
                <p class="list_p">
                    是否千川收取资质:{{ q_item.is_qianchuan_need ? '需要' : '不需要' }} 
                    <span style="margin-left: 20px;">是否必填:{{ q_item.is_required ? '必填' : '非必填' }}</span>
                </p>

                <p class="list_p font_size_12">
                    {{ q_item.text_list }}
                </p>

            </div>
            </div>
            
        
        </template>

        <!--SPU管控规则-->
        <template v-else-if="currentRule.key === 'spu_control_rule'">

            <p class="list_p">
                是否支持SPU发品:{{ currentRule.data.support_spu_product ? '支持' : '不支持' }}
            </p>

            <p class="list_p">
                是否支持SPU管控:
                <span v-if="currentRule.data.control_type === 0">不管控</span>
                <span v-if="currentRule.data.control_type === 1">弱管控</span>
                <span v-if="currentRule.data.control_type === 2">强管控</span>
            </p>

            <p class="list_p">
                是否支持新建SPU:{{ currentRule.data.support_create_spu ? '支持' : '不支持' }}
            </p>

            <p class="list_p">
                是否支持SPU纠错:{{ currentRule.data.support_rectify_spu ? '支持' : '不支持' }}
            </p>

            <p class="list_p">
                是否支持SPU举报:{{ currentRule.data.support_report_spu ? '支持' : '不支持' }}
            </p>

            <p class="list_p">
                是否SPU免审:{{ currentRule.data.no_need_audit_spu ? '支持' : '不支持' }}
            </p>

        </template>
        
        
        <!--SKU规则-->
        <template v-else-if="currentRule.key === 'sku_rule'">

            <p class="list_p">
                区域库存必填:{{ currentRule.data.area_stock_require ? '必填' : '非必填' }}
            </p>

            <p class="list_p">
                是否支持国补商品型号:{{ currentRule.data.support_spec_model_code ? '支持' : '不支持' }}
            </p>

            <p class="list_p">
                是否支持填写条形码:{{ currentRule.data.support_barcode ? '支持' : '不支持' }}
            </p>

            <p class="list_p">

                sku图必填类型：
                    <span>
    
                        <template v-if="currentRule.data.sku_picture_rule.require_type === 1">
                            必填且所有SKU必须填写
                        </template>
                        <template v-if="currentRule.data.sku_picture_rule.require_type === 2">
                            非必填，要么全部填写，要么全部为空，不允许部分填写
                        </template>
                    </span>
                

                <!-- <p>是否支持设置SKU图:{{ currentRule.data.sku_picture_rule.support ? '支持' : '不支持' }}</p> -->
                
            </p>

        </template>

        <!--交易相关的规则-->
        <template v-else-if="currentRule.key === 'trade_rule'">

            <p class="list_p">
                自动充值相关的规则:
                
                {{ currentRule.data.support_auto_charge_rule.value ? '支持自动充值' : '不支持自动充值' }}
            </p>

        </template>


        <pre class="rule-json">{{ JSON.stringify(currentRule.data, null, 2) }}</pre>


    </div>



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