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
                    <a-skeleton v-if="productdata.name == undefined" :title="false" :paragraph="{ rows: 3 }" style="margin: 30px 0 0 0;" active/>
                    <div style="width: 80px;height: 80px;float: left;background-color: #f2f2f2;margin: 20px;text-align: center;border-radius: 6px;">
                        <a-spin :indicator="indicator" style="margin-top: 26px;"/>
                    </div>
                    <div v-if="productdata.name !== undefined" style="height: 24px;width: 100%;margin: 30px 0 0 0;">
                       标题： {{ productdata.name }}
                    </div>
                    <div style="height: 24px;width: 100%;">导购短标题</div>

                    <div style="height: 24px;width: 100%;">划线价格 售卖价格 价格凭证 销量</div>

                </a-col>

                <a-col :span="12">
                    <div style="height: 100px;width: 100%;background-color: #f2f2f2;margin-top:20px;">
                    </div>
                </a-col>
            </a-row>
        </div>

        <div style="padding: 12px 0 0 0;">

            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="基础信息" force-render>
                    <a-row :gutter="[16,16]">
                        <a-col :span="4">
                            <!-- <a-skeleton :title="false" :paragraph="{ rows: 2 }" active/> -->
                            <div style="height: 24px;width: 100%;">商品id</div>
                            <div style="height: 24px;width: 100%;">12312321312</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">外部商家编码</div>
                            <div style="height: 24px;width: 100%;">12312321312</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">商品类型</div>
                            <div style="height: 24px;width: 100%;">product_type</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">商品状态</div>
                            <div style="height: 24px;width: 100%;">status</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">审核状态</div>
                            <div style="height: 24px;width: 100%;">check_status</div>

                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">草稿状态</div>
                            <div style="height: 24px;width: 100%;">draft_status</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">售卖方式</div>
                            <div style="height: 24px;width: 100%;">sell_channel</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">库存扣减方式 </div>
                            <div style="height: 24px;width: 100%;">reduce_type</div>

                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">售后服务新结构</div>
                            <div style="height: 24px;width: 100%;">after_sale_service_v2</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">售后服务</div>
                            <div style="height: 24px;width: 100%;">after_sale_service</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">运费模版ID</div>
                            <div style="height: 24px;width: 100%;">freight_id</div>

                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">尺码模板ID</div>
                            <div style="height: 24px;width: 100%;">size_info_template_id</div>

                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">品牌id</div>
                            <div style="height: 24px;width: 100%;">standard_brand_id</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">提取方式新字段</div>
                            <div style="height: 24px;width: 100%;">pickup_method</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">重量数值 weight_value</div>
                            <div style="height: 24px;width: 100%;">重量单位 weight_unit</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">创建时间</div>
                            <div style="height: 24px;width: 100%;">create_time</div>
                        </a-col>
                        <a-col :span="4">
                            <div style="height: 24px;width: 100%;">更新时间</div>
                            <div style="height: 24px;width: 100%;">update_time</div>
                        </a-col>
                    </a-row>
                    

                </a-tab-pane>
                <a-tab-pane key="2" tab="图片视频">
                    <a-row :gutter="[16,16]">

                        <a-col :span="12">
                            <div style="width: 220px;height: 386px;background-color: #333;float: left;margin-right: 30px;border-radius: 6px;">

                            </div>

                            <div>
                                <h5>白底图</h5>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px 0 0 0;"/>
                            </div>
                            <div>
                                <h5>商品主图</h5>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px 4px 4px 0;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                            </div>

                            <div>
                                <h5>3:4长图</h5>
                            </div>
                            <div>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px 4px 4px 0;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                            </div>
                            <div>
                                <h5>3:4主图</h5>
                            </div>
                            <div>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px 4px 4px 0;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                                <a-skeleton-avatar :size="70" active shape="square" style="margin: 4px;"/>
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div>
                                <h5>详情描述</h5>
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
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import { message } from 'ant-design-vue';
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
        const productdata = reactive({
            name:undefined,
            price:'',
            stock:'',
            sku:'',
            description:'',
            images:[]
        })

        // 选项卡默认选择
        const activeKey = ref('1');

        // 获取商品id
        console.log(props.data.product_id)


        // 请求商品详情信息
        tool.Http_.post(API.AppSrtoreAPI.dou_product.detaile, {
            product_id:props.data.product_id,
            show_draft:"false"
        }).then((responese)=>{
            console.log(responese.data.data.name)
            console.log(responese.data.data)

            productdata.name = responese.data.data.name
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
</style>