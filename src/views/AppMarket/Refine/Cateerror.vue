<!-- 模板说明 -->
<template>
<!--内容部分 菜单 右侧列表 开始-->
<a-layout style="height: 100vh;width: 100vw;">

    <!--head 导航组件  开始-->
    <menu_head />
    <!--head 导航组件  结束-->
    
    
    <!--内容部分 菜单 右侧列表 开始-->
    <a-layout>

        <!--左侧 菜单组件  开始-->
        <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
        <menu_left :menudata="PAGEDATA.menudata"/> <!--局部组件-->
        </a-layout-sider>
        <!--左侧 菜单组件  结束-->

        <a-layout-content class="content_border cateerror-page">

            <!-- 顶部标签页 -->
            <a-tabs v-model:activeKey="activeTab" class="cateerror-tabs">
                <a-tab-pane key="detect" tab="商品类目错放检测">

                    <!-- 检测条件 -->
                    <div class="section-card condition-section">
                        <div class="section-title">检测条件</div>
                        <a-form :model="conditionData" layout="inline" class="condition-form">

                            <a-row :gutter="[16, 12]" style="width: 100%;">
                                <!-- 商品分类 -->
                                <a-col :span="6">
                                    <a-form-item label="商品分类" class="form-item">
                                        <a-select v-model:value="conditionData.category" placeholder="请选择" allowClear>
                                            <a-select-option value="">请选择</a-select-option>
                                            <a-select-option v-for="c in categoryOptions" :key="c.value" :value="c.value">{{ c.label }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>

                                <!-- 商品状态 -->
                                <a-col :span="6">
                                    <a-form-item label="商品状态" class="form-item">
                                        <a-select v-model:value="conditionData.status" placeholder="请选择" allowClear style="width: 48%;">
                                            <a-select-option value="">请选择</a-select-option>
                                            <a-select-option v-for="s in statusOptions" :key="s.value" :value="s.value">{{ s.label }}</a-select-option>
                                        </a-select>
                                        <a-select v-model:value="conditionData.status2" placeholder="请选择" allowClear style="width: 48%; margin-left: 4%;">
                                            <a-select-option value="">请选择</a-select-option>
                                            <a-select-option v-for="s in statusOptions2" :key="s.value" :value="s.value">{{ s.label }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>

                                <!-- 标题 -->
                                <a-col :span="6">
                                    <a-form-item label="标题" class="form-item">
                                        <a-input-group compact class="compact-group">
                                            <a-select v-model:value="conditionData.titleMatch" style="width: 80px;">
                                                <a-select-option value="contains">包含</a-select-option>
                                                <a-select-option value="exact">精确</a-select-option>
                                            </a-select>
                                            <a-input v-model:value="conditionData.title" placeholder='多个标题用","或空格分隔' style="width: calc(100% - 80px);" />
                                        </a-input-group>
                                    </a-form-item>
                                </a-col>

                                <!-- 商品ID -->
                                <a-col :span="6">
                                    <a-form-item label="商品ID" class="form-item">
                                        <a-input v-model:value="conditionData.productIds" placeholder='多个用","或空格分隔，支持Excel复制' />
                                    </a-form-item>
                                </a-col>

                                <!-- 库存范围 -->
                                <a-col :span="6">
                                    <a-form-item label="库存范围" class="form-item">
                                        <a-input-group compact class="compact-group">
                                            <a-input-number v-model:value="conditionData.stockMin" placeholder="" style="width: calc(50% - 20px);" :min="0" />
                                            <span class="range-separator">-</span>
                                            <a-input-number v-model:value="conditionData.stockMax" placeholder="" style="width: calc(50% - 20px);" :min="0" />
                                            <span class="range-unit">件</span>
                                        </a-input-group>
                                    </a-form-item>
                                </a-col>

                                <!-- 售价 -->
                                <a-col :span="6">
                                    <a-form-item label="售价" class="form-item">
                                        <a-input-group compact class="compact-group">
                                            <a-select v-model:value="conditionData.priceType" style="width: 80px;">
                                                <a-select-option value="range">范围</a-select-option>
                                                <a-select-option value="above">以上</a-select-option>
                                                <a-select-option value="below">以下</a-select-option>
                                            </a-select>
                                            <a-input-number v-model:value="conditionData.priceMin" placeholder="" style="width: calc((100% - 80px) / 2 - 15px);" :min="0" />
                                            <span class="range-separator">-</span>
                                            <a-input-number v-model:value="conditionData.priceMax" placeholder="" style="width: calc((100% - 80px) / 2 - 15px);" :min="0" />
                                            <span class="range-unit">元</span>
                                        </a-input-group>
                                    </a-form-item>
                                </a-col>

                                <!-- 时间 -->
                                <a-col :span="6">
                                    <a-form-item label="时间" class="form-item">
                                        <a-input-group compact class="compact-group">
                                            <a-select v-model:value="conditionData.timeType" style="width: 90px;">
                                                <a-select-option value="create">创建时间</a-select-option>
                                                <a-select-option value="update">更新时间</a-select-option>
                                            </a-select>
                                            <a-range-picker v-model:value="conditionData.timeRange" style="width: calc(100% - 90px);" />
                                        </a-input-group>
                                    </a-form-item>
                                </a-col>

                                <!-- 品牌 -->
                                <a-col :span="6">
                                    <a-form-item label="品牌" class="form-item">
                                        <a-select v-model:value="conditionData.brand" placeholder="请选择品牌" allowClear>
                                            <a-select-option value="">请选择品牌</a-select-option>
                                            <a-select-option v-for="b in brandOptions" :key="b.value" :value="b.value">{{ b.label }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>

                                <!-- 发货模式 -->
                                <a-col :span="6">
                                    <a-form-item label="发货模式" class="form-item">
                                        <a-select v-model:value="conditionData.deliveryMode" placeholder="全部" allowClear>
                                            <a-select-option value="">全部</a-select-option>
                                            <a-select-option v-for="d in deliveryOptions" :key="d.value" :value="d.value">{{ d.label }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>

                                <!-- 质量分 -->
                                <a-col :span="6">
                                    <a-form-item label="质量分" class="form-item">
                                        <a-input v-model:value="conditionData.qualityScore" placeholder="-" />
                                    </a-form-item>
                                </a-col>

                                <!-- 运费模板 -->
                                <a-col :span="6">
                                    <a-form-item label="运费模板" class="form-item">
                                        <a-select v-model:value="conditionData.freightTemplate" placeholder="请选择" allowClear>
                                            <a-select-option value="">请选择</a-select-option>
                                            <a-select-option v-for="f in freightOptions" :key="f.value" :value="f.value">{{ f.label }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>

                                <!-- 是否分销 -->
                                <a-col :span="6">
                                    <a-form-item label="是否分销" class="form-item">
                                        <a-select v-model:value="conditionData.isDistribution" placeholder="全部商品" allowClear>
                                            <a-select-option value="">全部商品</a-select-option>
                                            <a-select-option value="1">是</a-select-option>
                                            <a-select-option value="0">否</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>

                                <!-- 货号 -->
                                <a-col :span="6">
                                    <a-form-item label="货号" class="form-item">
                                        <a-input-group compact class="compact-group">
                                            <a-select v-model:value="conditionData.goodsNoMatch" style="width: 80px;">
                                                <a-select-option value="exact">精确匹</a-select-option>
                                                <a-select-option value="contains">包含</a-select-option>
                                            </a-select>
                                            <a-input v-model:value="conditionData.goodsNo" placeholder='多个货号之间用","或空格分隔' style="width: calc(100% - 80px);" />
                                        </a-input-group>
                                    </a-form-item>
                                </a-col>

                                <!-- 标记鉴图 -->
                                <a-col :span="6">
                                    <a-form-item label="标记鉴图" class="form-item">
                                        <a-select v-model:value="conditionData.imageCheck" placeholder="全部" allowClear>
                                            <a-select-option value="">全部</a-select-option>
                                            <a-select-option value="1">已鉴图</a-select-option>
                                            <a-select-option value="0">未鉴图</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>

                                <!-- 是否搬家商品 -->
                                <a-col :span="6">
                                    <a-form-item label="是否搬家商品" class="form-item">
                                        <a-select v-model:value="conditionData.isMoved" placeholder="全部商品" allowClear>
                                            <a-select-option value="">全部商品</a-select-option>
                                            <a-select-option value="1">是</a-select-option>
                                            <a-select-option value="0">否</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>

                                <!-- 销量 -->
                                <a-col :span="6">
                                    <a-form-item label="销量" class="form-item">
                                        <a-input-group compact class="compact-group">
                                            <a-input-number v-model:value="conditionData.salesMin" placeholder="" style="width: calc(50% - 20px);" :min="0" />
                                            <span class="range-separator">-</span>
                                            <a-input-number v-model:value="conditionData.salesMax" placeholder="" style="width: calc(50% - 20px);" :min="0" />
                                            <span class="range-unit">件</span>
                                        </a-input-group>
                                    </a-form-item>
                                </a-col>

                                <!-- 是否草稿 -->
                                <a-col :span="6">
                                    <a-form-item label="是否草稿" class="form-item">
                                        <a-select v-model:value="conditionData.isDraft" placeholder="在售+待售商品" allowClear>
                                            <a-select-option value="">在售+待售商品</a-select-option>
                                            <a-select-option value="1">草稿</a-select-option>
                                            <a-select-option value="0">非草稿</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>

                                <!-- SKU编码 -->
                                <a-col :span="6">
                                    <a-form-item label="SKU编码" class="form-item">
                                        <a-input-group compact class="compact-group">
                                            <a-select v-model:value="conditionData.skuCodeMatch" style="width: 90px;">
                                                <a-select-option value="exact">精确匹配</a-select-option>
                                                <a-select-option value="contains">包含</a-select-option>
                                            </a-select>
                                            <a-input v-model:value="conditionData.skuCode" placeholder='多个用","或空格分隔' style="width: calc(100% - 90px);" />
                                        </a-input-group>
                                    </a-form-item>
                                </a-col>

                                <!-- SKU名称 -->
                                <a-col :span="6">
                                    <a-form-item label="SKU名称" class="form-item">
                                        <a-input-group compact class="compact-group">
                                            <a-select v-model:value="conditionData.skuNameMatch" style="width: 90px;">
                                                <a-select-option value="exact">精确匹配</a-select-option>
                                                <a-select-option value="contains">包含</a-select-option>
                                            </a-select>
                                            <a-input v-model:value="conditionData.skuName" placeholder='多个用","或空格分隔' style="width: calc(100% - 90px);" />
                                        </a-input-group>
                                    </a-form-item>
                                </a-col>

                                <!-- 搬家来源店铺 -->
                                <a-col :span="6">
                                    <a-form-item label="搬家来源店铺" class="form-item">
                                        <a-input v-model:value="conditionData.sourceShop" placeholder='多个来源店铺用空格分隔' />
                                    </a-form-item>
                                </a-col>
                            </a-row>

                            <!-- 底部操作 -->
                            <div class="condition-actions">
                                <a-space>
                                    <span class="multi-shop-text">
                                        多店铺操作
                                        <a-tooltip title="可对多个店铺同时进行检测">
                                            <QuestionCircleOutlined class="help-icon" />
                                        </a-tooltip>
                                    </span>
                                    <a-button type="primary" class="add-shop-btn">添加店铺</a-button>
                                    <a-button type="link" class="more-search-btn">更多搜索</a-button>
                                </a-space>
                            </div>
                        </a-form>
                    </div>

                    <!-- 检测内容 -->
                    <div class="section-card detect-content-section">
                        <div class="section-title">检测内容</div>
                        <div class="content-item">
                            <span class="content-label">检测内容：</span>
                            <span class="content-value">检测商品类目错放（抖店官方判定）</span>
                        </div>
                        <div class="content-item">
                            <span class="content-label">处理方式：</span>
                            <span class="content-value">先检测，再手动迁移</span>
                        </div>
                    </div>

                    <!-- 检测结果占位 -->
                    <div class="section-card result-section">
                        <div class="section-title">检测结果</div>
                        <a-empty description="请先设置检测条件并点击检测" />
                    </div>

                </a-tab-pane>

                <a-tab-pane key="history" tab="检测历史">
                    <div class="section-card">
                        <div class="section-title">检测历史</div>
                        <a-empty description="暂无检测历史" />
                    </div>
                </a-tab-pane>
            </a-tabs>

        </a-layout-content>

      </a-layout>
  </a-layout>
</template>
<script>
import { computed,ref,reactive,onMounted,h,onUnmounted } from 'vue';

// 网络请求工具引用
import axios from "axios";
import { useStore } from 'vuex'

import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

import { QuestionCircleOutlined } from '@ant-design/icons-vue';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";
// 组件引用=====开始
export default {
   name:'cateerror',
   components:{
        menu_left,
        menu_head,
        nav_pagination,
        QuestionCircleOutlined
   },
props: {
   data:{typr:Object}
},
setup(props,ctx) {
    const store = useStore();// 共享数据
    const tool = new TOOL.TOOL()            // 工具方法
    const API = new utils.A_Patch()         // 请求接口地址合集

    const activeTab = ref('detect');

    // 检测条件数据
    const conditionData = reactive({
        category: undefined,
        status: undefined,
        status2: undefined,
        titleMatch: 'contains',
        title: '',
        productIds: '',
        stockMin: null,
        stockMax: null,
        priceType: 'range',
        priceMin: null,
        priceMax: null,
        timeType: 'create',
        timeRange: null,
        brand: undefined,
        deliveryMode: undefined,
        qualityScore: '',
        freightTemplate: undefined,
        isDistribution: undefined,
        goodsNoMatch: 'exact',
        goodsNo: '',
        imageCheck: undefined,
        isMoved: undefined,
        salesMin: null,
        salesMax: null,
        isDraft: undefined,
        skuCodeMatch: 'exact',
        skuCode: '',
        skuNameMatch: 'exact',
        skuName: '',
        sourceShop: ''
    });

    // 组件挂之后---请求数据===============================开始
    const PAGEDATA = reactive({

            title:'类目错放',
            innerHeight: ref(window.innerHeight - 180), // 初始化列表高度

            menudata:{       // 菜单选中配置
                'key':'102',
                'openKeys':'Refine',
                },
            loading:true,         // 列表load状态
            justify:'center',     // 列表内容对齐：loading加载居中设定
            align:'center',       // 列表内容对齐：loading加载居中设定
            // 列表信息
            datalist:[],
            total_number:0,     // 内容总数
            List_conditions:ref({
                page:1
            })
    })

    // 选项数据（示例）
    const categoryOptions = ref([
        { label: '服装', value: 'clothing' },
        { label: '数码', value: 'digital' },
        { label: '家居', value: 'home' },
        { label: '美妆', value: 'beauty' }
    ]);

    const statusOptions = ref([
        { label: '在售', value: 'on_sale' },
        { label: '待售', value: 'pending' },
        { label: '下架', value: 'off_sale' }
    ]);

    const statusOptions2 = ref([
        { label: '正常', value: 'normal' },
        { label: '违规', value: 'violation' },
        { label: '审核中', value: 'auditing' }
    ]);

    const brandOptions = ref([
        { label: 'Apple', value: 'apple' },
        { label: '华为', value: 'huawei' },
        { label: '小米', value: 'xiaomi' }
    ]);

    const deliveryOptions = ref([
        { label: '现货发货', value: 'stock' },
        { label: '预售发货', value: 'presell' },
        { label: '阶梯发货', value: 'ladder' }
    ]);

    const freightOptions = ref([
        { label: '包邮', value: 'free' },
        { label: '固定运费', value: 'fixed' },
        { label: '按件计费', value: 'by_piece' }
    ]);

       return{
            PAGEDATA,
            store,
            activeTab,
            conditionData,
            categoryOptions,
            statusOptions,
            statusOptions2,
            brandOptions,
            deliveryOptions,
            freightOptions
       }
   }
}
</script>
<style scoped>
.cateerror-page {
    padding: 12px 16px;
    background: #f5f5f5;
}

.cateerror-tabs :deep(.ant-tabs-nav) {
    background: #ffffff;
    padding: 0 16px;
    margin-bottom: 12px;
    border-radius: 8px;
}

.cateerror-tabs :deep(.ant-tabs-content) {
    padding-bottom: 16px;
}

.section-card {
    background: #ffffff;
    border-radius: 8px;
    padding: 16px 20px;
    margin-bottom: 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.section-title {
    font-size: 14px;
    font-weight: 600;
    color: #262626;
    margin-bottom: 16px;
    padding-left: 10px;
    border-left: 3px solid #13c2c2;
}

.condition-form {
    width: 100%;
}

.form-item {
    width: 100%;
    margin-bottom: 0;
}

.form-item :deep(.ant-form-item-label) {
    width: 84px;
    text-align: right;
    padding-right: 8px;
}

.form-item :deep(.ant-form-item-label > label) {
    font-size: 13px;
    color: #595959;
}

.form-item :deep(.ant-form-item-control) {
    flex: 1;
}

.form-item :deep(.ant-select),
.form-item :deep(.ant-input),
.form-item :deep(.ant-input-number),
.form-item :deep(.ant-picker-range) {
    width: 100%;
    font-size: 13px;
}

.compact-group {
    display: flex;
    width: 100%;
    align-items: center;
}

.range-separator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 8%;
    color: #8c8c8c;
    font-size: 13px;
}

.range-unit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    color: #8c8c8c;
    font-size: 13px;
    margin-left: 4px;
}

.condition-actions {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px dashed #e8e8e8;
}

.multi-shop-text {
    font-size: 13px;
    color: #13c2c2;
    cursor: pointer;
}

.help-icon {
    margin-left: 4px;
    color: #bfbfbf;
}

.add-shop-btn {
    background: #13c2c2;
    border-color: #13c2c2;
}

.add-shop-btn:hover {
    background: #36cfc9;
    border-color: #36cfc9;
}

.more-search-btn {
    color: #13c2c2;
}

.detect-content-section .content-item {
    display: flex;
    align-items: baseline;
    margin-bottom: 10px;
    font-size: 13px;
}

.detect-content-section .content-item:last-child {
    margin-bottom: 0;
}

.content-label {
    width: 84px;
    text-align: right;
    color: #8c8c8c;
    flex-shrink: 0;
}

.content-value {
    color: #262626;
    margin-left: 8px;
}

.result-section {
    min-height: 200px;
    display: flex;
    flex-direction: column;
}
</style>
