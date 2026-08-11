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

        <a-layout-content class="content_border" >
        
            <div>
                <a-row>
                    <a-col :span="12">
                        <a-radio-group 
                            v-model:value="conditionData.data_type" 
                            button-style="solid" 
                            class="font_size_12"
                            size="small"
                            @change="Tabchange"
                            >
                            <a-radio-button value="0" class="font_size_12">待诊断</a-radio-button>
                            <a-radio-button value="1" class="font_size_12">待优化</a-radio-button>
                            <a-radio-button value="2" class="font_size_12">已修改审核中</a-radio-button>
                            <a-radio-button value="3" class="font_size_12">已优化</a-radio-button>
                        </a-radio-group>


                    </a-col>
                    <a-col :offset="8" :span="4">
                        <a-button type="primary" class="font_size_12" size="small" style="font-size: 12px;margin:0 0 0 6px;float: right;">查询</a-button>
                        <a-input 
                            placeholder="商品id查询"
                            type="text" 
                            class="font_size_12"
                            style="padding: 2px;width: 140px;float: right;"
                            allowClear  
                            size="small"
                        ></a-input>
                    </a-col>
                </a-row>
            </div>


        <a-flex :style="{height:PAGEDATA.innerHeight + 'px'}" class="FlexBox" :justify="PAGEDATA.justify" :align="PAGEDATA.align">

            <a-list 
                size="default"
                :data-source="PAGEDATA.datalist"
                :loading="PAGEDATA.loading" 
                style="width: 100%;"
                :split="false"
                class="quality-list"
                >

                <template #renderItem="{ item }">
                    
                    <a-list-item class="quality-card">

                        <!-- 卡片头部 -->
                        <div class="card-header">
                            <div class="header-left">
                                <a-tag v-if="item.meet_standard == 1" color="green" class="status-tag">已达标</a-tag>
                                <a-tag v-else color="red" class="status-tag">未达标</a-tag>
                                <span class="product-id">商品ID: {{ item.product_id || '-' }}</span>
                                <span class="company-name">{{ item.product_name }}</span>
                                <a-rate v-model:value="item.quality_score.score" disabled class="header-rate"/>
                            </div>
                        </div>

                        <!-- 卡片主体 -->
                        <div class="card-body">

                            <!-- 质量分 -->
                            <div class="info-col score-col">
                                <div class="score-block">
                                    <div class="score-value">{{ item.quality_score.score || 0 }}</div>
                                    <div class="score-label">质量分</div>
                                </div>
                            </div>

                            <!-- 诊断问题 -->
                            <div class="info-col problem-col">
                                <div class="col-title">诊断问题</div>
                                <div class="col-content">
                                    <span v-if="!item.field_problem || item.field_problem.length === 0" class="empty-text">暂无问题</span>
                                    <div v-else class="problem-tags">
                                        <a-tag v-for="i in item.field_problem" :key="i.field_name + i.problem_name" class="problem-tag">
                                            <a-tooltip>
                                                {{ i.field_name }} - {{ i.problem_name }}
                                                <template #title>
                                                    <div v-html="i.suggestion" class="font_size_12"></div>
                                                </template>
                                            </a-tooltip>
                                        </a-tag>
                                    </div>
                                </div>
                            </div>

                            <!-- 问题统计 -->
                            <div class="info-col count-col">
                                <div class="col-title">待优化问题</div>
                                <div class="col-content">
                                    <span class="count-value">{{ item.problem_num_to_improve || 0 }}</span>
                                    <span class="count-unit">项</span>
                                </div>
                            </div>

                            <!-- 优化建议摘要 -->
                            <div class="info-col suggestion-col">
                                <div class="col-title">优化建议</div>
                                <div class="col-content">
                                    <span v-if="!item.field_problem || item.field_problem.length === 0" class="empty-text">-</span>
                                    <span v-else class="suggestion-text">
                                        {{ item.field_problem[0].suggestion ? item.field_problem[0].suggestion.replace(/<[^>]+>/g, '').slice(0, 40) : '-' }}
                                        <template v-if="item.field_problem[0].suggestion && item.field_problem[0].suggestion.replace(/<[^>]+>/g, '').length > 40">...</template>
                                    </span>
                                </div>
                            </div>

                            <!-- 右侧操作 -->
                            <div class="info-col action-col">
                                <div class="action-block">
                                    <a key="list-loadmore-edit" class="detail-link" @click="openDetail(item)">查看详情</a>
                                </div>
                            </div>

                        </div>

                    </a-list-item>

                </template>
            </a-list>
        </a-flex>



            <!--翻页组件 -->
            <span style="padding:14px 0 0 0 ;display: block;float: left;">
                <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 6px;" ghost><RedoOutlined /> 刷新列表</a-button>
                <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 6px;" ghost><DeleteOutlined /> 批量删除</a-button>
                <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 6px;" ghost><EditOutlined /> 批量修改</a-button>
                <a-button size="small" type="primary" style="font-size: 12px;float: right;margin:4px 0 0 0;" ghost ><CheckCircleOutlined /> 全选</a-button>
            </span>
            
            <nav_pagination :fandata="PAGEDATA" v-on:complete="page_turning"/>

            <!-- 详情抽屉 -->
            <a-drawer
                v-model:open="drawerVisible"
                title="商品质量详情"
                placement="right"
                :width="520"
                :closable="true"
                class="quality-detail-drawer"
            >
                <div v-if="selectedItem" class="drawer-content">
                    <!-- 基本信息 -->
                    <div class="drawer-section">
                        <div class="section-title">基本信息</div>
                        <a-descriptions :column="1" size="small" bordered>
                            <a-descriptions-item label="商品ID">{{ selectedItem.product_id || '-' }}</a-descriptions-item>
                            <a-descriptions-item label="商品名称">{{ selectedItem.product_name || '-' }}</a-descriptions-item>
                            <a-descriptions-item label="达标状态">
                                <a-tag v-if="selectedItem.meet_standard == 1" color="green">已达标</a-tag>
                                <a-tag v-else color="red">未达标</a-tag>
                            </a-descriptions-item>
                            <a-descriptions-item label="质量评分">
                                <a-rate v-model:value="selectedItem.quality_score.score" disabled />
                                <span class="score-number">{{ selectedItem.quality_score.score || 0 }} 分</span>
                            </a-descriptions-item>
                            <a-descriptions-item label="待优化问题">{{ selectedItem.problem_num_to_improve || 0 }} 项</a-descriptions-item>
                        </a-descriptions>
                    </div>

                    <!-- 诊断问题 -->
                    <div class="drawer-section">
                        <div class="section-title">诊断问题与建议</div>
                        <div v-if="!selectedItem.field_problem || selectedItem.field_problem.length === 0" class="empty-block">暂无诊断问题</div>
                        <a-collapse v-else ghost class="problem-collapse">
                            <a-collapse-panel
                                v-for="(problem, index) in selectedItem.field_problem"
                                :key="index"
                                :header="problem.field_name + ' - ' + problem.problem_name"
                            >
                                <div class="suggestion-content">
                                    <div class="suggestion-label">优化建议：</div>
                                    <div v-html="problem.suggestion" class="suggestion-html"></div>
                                </div>
                            </a-collapse-panel>
                        </a-collapse>
                    </div>
                </div>
            </a-drawer>

            <!--翻页组件 -->
        </a-layout-content>

    </a-layout>

</a-layout>


</template>
<script>
import { ref,reactive,onMounted,onUnmounted } from 'vue';
import { useStore } from 'vuex'
import { DeleteOutlined,EditOutlined,RedoOutlined,CheckCircleOutlined} from '@ant-design/icons-vue';

// 网络请求工具引用
import axios from "axios";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";

export default {
   name:'quality',
   components:{
        menu_left,
        menu_head,
        DeleteOutlined,
        EditOutlined,
        RedoOutlined,
        CheckCircleOutlined,
        nav_pagination

   },
    props: {
    data:{typr:Object}
    },
    setup(props,ctx) {

    const store = useStore();// 共享数据
    const tool = new TOOL.TOOL()            // 工具方法
    const API = new utils.A_Patch()         // 请求接口地址合集
    // 组件挂之后---请求数据===============================开始

    // 定义一个函数来处理窗口大小变化 ==
    const handleResize = () => {
      PAGEDATA.innerHeight = window.innerHeight - 180; // 作为表格自适应高度
    };

    // 在组件挂载时添加事件监听器
    onMounted(() => {
        window.addEventListener('resize', handleResize);// 窗口变换时候
        loadproductData(conditionData.default)
    });

    // 在组件卸载时移除事件监听器
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    // 【组件挂载】========================================结束

    // 详情抽屉状态
    const drawerVisible = ref(false);
    const selectedItem = ref(null);

    // 打开详情抽屉
    const openDetail = (item) => {
        selectedItem.value = item;
        drawerVisible.value = true;
    }

    const PAGEDATA = reactive({

            title:'诊断中心',
            innerHeight: ref(window.innerHeight - 180), // 初始化列表高度

            menudata:{       // 菜单选中配置
                'key':'95',
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


    // 筛选条件数据
    const conditionData = reactive({

        data_type:"1", // 查询tab状态

        // 默认查询条件
        default:{
            order_by:"desc",// 排序方式
            page:1,
            page_size:10,
            task_id:9999999999,
            diagnose_status:[1], //商品诊断状态
        }
    })

    // 加载数据
    const loadproductData = async(data) => {

        PAGEDATA.loading = true;

        // 请求商品接口
        const res = await axios.post(API.AppSrtoreAPI.dou_product.qualitylist, data)

        var code = res.data.code;               // 请求返回是否成
        var res_data = res.data.data;           // 返回数据集
        var res_list = res_data.quality_list;   // 列表数据
        var total = res_data.total;             // 数据总量
        console.log(res_list.length)

        if(res_list.length === 0){

          PAGEDATA.justify = 'center';
          PAGEDATA.align = 'center';
          PAGEDATA.loading = false;
          PAGEDATA.datalist = [];
          PAGEDATA.total_number = 0

        }else{
            setTimeout(() => {
                PAGEDATA.loading = false;
                PAGEDATA.justify = 'start';
                PAGEDATA.align = 'start';
                // 请求数据不为空
                PAGEDATA.datalist = res_list;
                PAGEDATA.total_number = total;
          }, 1000);

        }
    }

    // 【翻页-组件 回调方法】========================================开始
    const page_turning = (data)=>{
        PAGEDATA.justify = 'flex-start';
        PAGEDATA.align = 'flex-start';
        conditionData.default.page = data.page;
        conditionData.default.page_size = data.page_size;
        conditionData.default.diagnose_status = [conditionData.data_type];
        loadproductData(conditionData.default)
    }
    // 【查询组件 回调方法】========================================结束

    // tab切换状态方法
    const Tabchange=()=>{
        conditionData.default.page = 1;
        conditionData.default.page_size = 10;
        conditionData.default.diagnose_status = [Number(conditionData.data_type)];
        loadproductData(conditionData.default)
    }


       return{
            PAGEDATA,
            conditionData,
          store,
          page_turning,
          Tabchange,
          drawerVisible,
          selectedItem,
          openDetail

       }
   }
}
</script>
<style scoped>
.FlexBox{overflow:auto; transition:height 0.5s ease;margin:4px 0 0 0;}

/* 列表容器 */
.quality-list {
    padding: 8px 4px;
}

/* 卡片整体样式 */
.quality-card {
    background: #ffffff;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    padding: 16px 20px !important;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    flex-direction: column !important;
    align-items: stretch !important;
}

.quality-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
}

/* 卡片头部 */
.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.status-tag {
    margin: 0 !important;
    font-size: 12px;
    line-height: 20px;
    padding: 0 8px;
    border-radius: 4px;
}

.product-id {
    font-size: 13px;
    color: #8c8c8c;
    font-weight: 500;
}

.company-name {
    font-size: 15px;
    color: #262626;
    font-weight: 600;
}

.header-rate {
    margin: 0 0 0 4px;
    font-size: 14px;
}

/* 卡片主体：多列布局 */
.card-body {
    display: flex;
    align-items: stretch;
    gap: 24px;
}

.info-col {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
}

.col-title {
    font-size: 13px;
    font-weight: 600;
    color: #262626;
    line-height: 20px;
}

.col-content {
    font-size: 13px;
    color: #595959;
    line-height: 20px;
}

.empty-text {
    color: #bfbfbf;
}

/* 诊断问题列 */
.problem-col {
    flex: 1.6;
}

.problem-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.problem-tag {
    margin: 0 !important;
    font-size: 12px;
    color: #595959;
    background: #f5f5f5;
    border-color: #d9d9d9;
    cursor: pointer;
}

.problem-tag:hover {
    color: #1890ff;
    border-color: #1890ff;
}

/* 问题统计列 */
.count-col {
    flex: 0.5;
    min-width: 90px;
}

.count-value {
    font-size: 20px;
    font-weight: 700;
    color: #262626;
}

.count-unit {
    font-size: 13px;
    color: #8c8c8c;
    margin-left: 4px;
}

/* 建议列 */
.suggestion-col {
    flex: 1.2;
}

.suggestion-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #595959;
}

/* 质量分列 */
.score-col {
    flex: 0 0 100px;
    min-width: 90px;
    align-items: flex-start;
    justify-content: center;
}

.score-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

/* 右侧操作列 */
.action-col {
    flex: 0 0 80px;
    border-left: 1px solid #f0f0f0;
    padding-left: 20px;
    align-items: flex-end;
    justify-content: center;
    text-align: right;
    gap: 8px;
}

.score-value {
    font-size: 28px;
    font-weight: 700;
    color: #1890ff;
    line-height: 32px;
}

.score-label {
    font-size: 12px;
    color: #8c8c8c;
    line-height: 18px;
}

.action-block {
    margin-top: 4px;
}

.detail-link {
    font-size: 13px;
    color: #1890ff;
    font-weight: 500;
}

.detail-link:hover {
    color: #40a9ff;
}

/* 详情抽屉样式 */
.quality-detail-drawer :deep(.ant-drawer-body) {
    padding: 16px 20px;
    background: #f5f5f5;
}

.drawer-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.drawer-section {
    background: #ffffff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.section-title {
    font-size: 15px;
    font-weight: 600;
    color: #262626;
    margin-bottom: 12px;
    padding-left: 10px;
    border-left: 3px solid #1890ff;
}

.score-number {
    margin-left: 8px;
    color: #595959;
    font-size: 13px;
}

.empty-block {
    padding: 24px 0;
    text-align: center;
    color: #bfbfbf;
    font-size: 13px;
    background: #fafafa;
    border-radius: 6px;
}

.problem-collapse :deep(.ant-collapse-header) {
    font-size: 13px;
    font-weight: 500;
    color: #262626;
    padding: 10px 0 !important;
}

.problem-collapse :deep(.ant-collapse-content-box) {
    padding: 8px 0 12px 0 !important;
}

.suggestion-content {
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 6px;
    padding: 12px;
}

.suggestion-label {
    font-size: 13px;
    font-weight: 600;
    color: #389e0d;
    margin-bottom: 6px;
}

.suggestion-html {
    font-size: 13px;
    color: #595959;
    line-height: 1.6;
}

.suggestion-html :deep(p) {
    margin: 0 0 6px 0;
}

.suggestion-html :deep(p:last-child) {
    margin-bottom: 0;
}

/* 响应式：小屏幕下改为垂直堆叠 */
@media (max-width: 900px) {
    .card-body {
        flex-direction: column;
        gap: 16px;
    }

    .score-col {
        flex: 1 1 auto;
        align-items: flex-start;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 12px;
    }

    .action-col {
        border-left: none;
        border-top: 1px solid #f0f0f0;
        padding-left: 0;
        padding-top: 12px;
        flex: 1 1 auto;
        align-items: flex-start;
        text-align: left;
        flex-direction: row;
        justify-content: space-between;
    }
}
</style>
