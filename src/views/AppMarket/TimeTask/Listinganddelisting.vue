<!-- 模板说明
    1、定时上下架任务
    2、任务列表支持按名称、开始时间、结束时间筛选
    3、支持添加任务、查看详情、编辑、删除、批量删除
    4、列表样式与素材列表一致
-->
<template>
<a-layout style="height: 100vh;width: 100vw;">
    <menu_head />
    <a-layout>
        <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
            <menu_left :menudata="PAGEDATA.menudata"/>
        </a-layout-sider>
        <a-layout-content class="content_border">
            <!-- 筛选条件栏 -->
            <div :style="{width:'100%',height:'42px',backgroundColor:'#f2f2f2',borderRadius:'4px',overflow:'hidden'}">
                <a-row>
                    <a-col :span="24" style="padding:6px 6px 0 10px;">
                        <a-space>
                            <a-button type="primary" size="small" @click="showAddModal">添加任务</a-button>
                            <a-input type="text" placeholder="输入任务名称" v-model:value="queryForm.task_name" autoComplete="off" style="width:160px;"/>
                            <a-date-picker v-model:value="queryForm.start_time" placeholder="开始时间" style="width:140px;" size="small"/>
                            <a-date-picker v-model:value="queryForm.end_time" placeholder="结束时间" style="width:140px;" size="small"/>
                            <a-button type="primary" size="small" @click="handleQuery">查询</a-button>
                            <a-button type="default" size="small" @click="handleReset">重置</a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </div>
            <!-- 筛选条件栏 结束 -->

            <!-- 任务列表 -->
            <div :style="{height:PAGEDATA.innerHeight+'px',overflowY:'auto',overflowX:'hidden',marginTop:'10px',marginBottom:'10px',padding:'10px 0 0 2px'}">
                <a-checkbox-group v-model:value="PAGEDATA.check_value" style="width:100%;height:100%;">
                    <a-list :grid="{gutter:0,column:5}" size="default" :data-source="PAGEDATA.datalist" :loading="PAGEDATA.loading">
                        <template #renderItem="{item}">
                            <a-card size="small" class="card_style" hoverable>
                                <div class="floating-badge" :class="item.task_type=='上架商品'?'badge-up':'badge-down'">
                                    <CalendarOutlined/> {{item.task_type}}
                                </div>
                                <div class="task-content">
                                    <div class="task-icon">
                                        <CalendarOutlined :style="{fontSize:'48px',color:item.task_type=='上架商品'?'#52c41a':'#ff4d4f'}"/>
                                    </div>
                                    <div class="material-name" :title="item.task_name">{{item.task_name}}</div>
                                    <div class="task-time" :title="item.execute_time">{{item.execute_time}}</div>
                                </div>
                                <template #actions>
                                    <a-checkbox :value="item.id"></a-checkbox>
                                    <a href="#" class="font_size_12" @click.prevent="showDetail(item)">详情</a>
                                    <a href="#" class="font_size_12" @click.prevent="showEditDrawer(item)">编辑</a>
                                    <a href="#" class="font_size_12" @click.prevent="handleDelete(item)">删除</a>
                                </template>
                            </a-card>
                        </template>
                    </a-list>
                </a-checkbox-group>
            </div>
            <!-- 任务列表 结束 -->

            <!-- 底部操作栏 -->
            <a-layout-footer class="footerStyle">
                <a-row>
                    <a-col :span="12" style="text-align:left;">
                        <p class="font_size_12" style="padding:6px 0 0 0;">
                            <a-space>
                                <a-checkbox v-model:checked="checkedAll" @change="onCheckAllChange">全选</a-checkbox>
                                <a-tag :bordered="false"><CalendarOutlined/> 已选 {{PAGEDATA.selectedList.length}} 条</a-tag>
                                <a-button type="dashed" size="small" class="font_size_12" @click="clearSelected"><ClearOutlined/>清空</a-button>
                                <a-button type="dashed" size="small" class="font_size_12" @click="handleBatchDelete">批量删除</a-button>
                            </a-space>
                        </p>
                    </a-col>
                    <a-col :span="12"><nav_pagination :fandata="PAGEDATA" v-on:complete="pageTurning"/></a-col>
                </a-row>
            </a-layout-footer>
            <!-- 底部操作栏 结束 -->
        </a-layout-content>
    </a-layout>
</a-layout>

<!-- 任务详情 抽屉 -->
<a-drawer v-model:open="detailDrawer" title="任务详情" width="520" :closable="false">
    <div v-if="currentItem">
        <p>任务ID：{{currentItem.id}}</p>
        <p>任务名称：{{currentItem.task_name}}</p>
        <p>任务类型：{{currentItem.task_type}}</p>
        <p>执行时间：{{currentItem.execute_time}}</p>
        <p>商品信息：{{currentItem.product_name}}</p>
        <p>创建时间：{{currentItem.create_time}}</p>
        <p>更新时间：{{currentItem.update_time}}</p>
    </div>
    <a-button size="small" @click="detailDrawer=false">关闭</a-button>
</a-drawer>
<!-- 任务详情 抽屉 结束 -->

<!-- 添加任务 弹出层 -->
<a-modal v-model:open="addModalVisible" title="添加任务" :confirm-loading="addLoading" @ok="confirmAdd" @cancel="closeAddModal">
    <a-form layout="vertical" style="padding:10px 0 0 0;">
        <a-form-item label="任务类型" required>
            <a-select v-model:value="addForm.task_type" placeholder="请选择任务类型" :options="[{label:'上架商品',value:'上架商品'},{label:'下架商品',value:'下架商品'}]">
            </a-select>
        </a-form-item>
        <a-form-item label="执行时间" required>
            <a-date-picker v-model:value="addForm.execute_time" show-time placeholder="请选择执行时间" style="width:100%;"/>
        </a-form-item>
        <a-form-item label="选择商品" required>
            <a-select v-model:value="addForm.product_id" placeholder="请选择商品" :options="productOptions">
            </a-select>
        </a-form-item>
        <a-form-item label="任务名称" required>
            <a-input v-model:value="addForm.task_name" placeholder="请输入任务名称" autoComplete="off"/>
        </a-form-item>
    </a-form>
</a-modal>
<!-- 添加任务 弹出层 结束 -->

<!-- 编辑任务 抽屉 -->
<a-drawer v-model:open="editDrawerVisible" title="编辑任务" width="520" :closable="false">
    <div>
        <a-form layout="vertical" style="padding:10px 0 0 0;">
            <a-form-item label="任务类型" required>
                <a-select v-model:value="editForm.task_type" placeholder="请选择任务类型" :options="[{label:'上架商品',value:'上架商品'},{label:'下架商品',value:'下架商品'}]">
                </a-select>
            </a-form-item>
            <a-form-item label="执行时间" required>
                <a-date-picker v-model:value="editForm.execute_time" show-time placeholder="请选择执行时间" style="width:100%;"/>
            </a-form-item>
            <a-form-item label="选择商品" required>
                <a-select v-model:value="editForm.product_id" placeholder="请选择商品" :options="productOptions">
                </a-select>
            </a-form-item>
            <a-form-item label="任务名称" required>
                <a-input v-model:value="editForm.task_name" placeholder="请输入任务名称" autoComplete="off"/>
            </a-form-item>
        </a-form>
    </div>
    <div style="position:absolute;bottom:0;left:0;width:100%;border-top:1px solid #e9e9e9;padding:10px 16px;background:#fff;text-align:right;">
        <a-space>
            <a-button size="small" @click="editDrawerVisible=false">取消</a-button>
            <a-button type="primary" size="small" :loading="editLoading" @click="confirmEdit">确认</a-button>
        </a-space>
    </div>
</a-drawer>
<!-- 编辑任务 抽屉 结束 -->

<!-- 删除确认 弹出层 -->
<a-modal v-model:open="deleteModalVisible" title="确认删除" :confirm-loading="deleteLoading" @ok="confirmDelete">
    <p style="margin:10px 0 0 0;">是否确认删除任务「{{currentItem?.task_name}}」？</p>
    <p style="margin:10px 0 0 0;color:#ff4d4f;">删除后将无法恢复！</p>
</a-modal>
<!-- 删除确认 弹出层 结束 -->

<!-- 批量删除确认 弹出层 -->
<a-modal v-model:open="batchDeleteModalVisible" title="确认批量删除" :confirm-loading="batchDeleteLoading" @ok="confirmBatchDelete">
    <p style="margin:10px 0 0 0;">是否确认删除选中的 {{PAGEDATA.selectedList.length}} 个任务？</p>
    <p style="margin:10px 0 0 0;color:#ff4d4f;">删除后将无法恢复！</p>
</a-modal>
<!-- 批量删除确认 弹出层 结束 -->
</template>

<script>
import {ref,reactive,onMounted,onUnmounted,watch} from 'vue';
import {message} from 'ant-design-vue';
import {CalendarOutlined,ClearOutlined,EditOutlined} from '@ant-design/icons-vue';
import {useStore} from 'vuex'
import dayjs from 'dayjs';
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";

export default {
name:'Listinganddelisting',
components:{menu_left,menu_head,nav_pagination,CalendarOutlined,ClearOutlined,EditOutlined},
props:{data:{typr:Object}},
setup(props,ctx){
    const store=useStore();
    const tool=new TOOL.TOOL()
    const API=new utils.A_Patch()

    // 查询表单
    const queryForm=reactive({
        task_name:'',
        start_time:null,
        end_time:null
    });

    // 页面数据
    const PAGEDATA=reactive({
        title:'定时上下架',
        innerHeight:ref(window.innerHeight-180),
        menudata:{'key':'109','openKeys':'TimeTask'},
        loading:true,
        justify:'center',
        align:'center',
        datalist:[],
        total_number:0,
        List_conditions:ref({page:1,page_size:10}),
        check_value:ref([]),
        selectedList:ref([])
    });

    const checkedAll=ref(false);
    const detailDrawer=ref(false);
    const currentItem=ref(null);
    const deleteModalVisible=ref(false);
    const deleteLoading=ref(false);
    const batchDeleteModalVisible=ref(false);
    const batchDeleteLoading=ref(false);

    // 添加任务
    const addModalVisible=ref(false);
    const addLoading=ref(false);
    const addForm=reactive({
        task_name:'',
        task_type:'上架商品',
        execute_time:null,
        product_id:null
    });

    // 编辑任务
    const editDrawerVisible=ref(false);
    const editLoading=ref(false);
    const editForm=reactive({
        id:null,
        task_name:'',
        task_type:'上架商品',
        execute_time:null,
        product_id:null
    });

    // 商品选项（模拟数据）
    const productOptions=ref([
        {label:'商品A',value:'P001'},
        {label:'商品B',value:'P002'},
        {label:'商品C',value:'P003'},
        {label:'商品D',value:'P004'}
    ]);

    // 监听选中值变化
    watch(()=>PAGEDATA.check_value,(newVal)=>{
        PAGEDATA.selectedList=PAGEDATA.datalist.filter(item=>newVal.includes(item.id));
        checkedAll.value=PAGEDATA.datalist.length>0&&newVal.length===PAGEDATA.datalist.length;
    },{immediate:true});

    watch(()=>PAGEDATA.datalist,()=>{
        PAGEDATA.check_value=[];
        PAGEDATA.selectedList=[];
        checkedAll.value=false;
    });

    // 窗口大小变化
    const handleResize=()=>{PAGEDATA.innerHeight=window.innerHeight-180;};
    onMounted(()=>{window.addEventListener('resize',handleResize);loadData();});
    onUnmounted(()=>{window.removeEventListener('resize',handleResize);});

    // 模拟全部数据
    const allMockData=ref([]);

    const loadData=()=>{
        PAGEDATA.loading=true;
        setTimeout(()=>{
            if(allMockData.value.length===0){
                for(let i=0;i<25;i++){
                    const type=i%2===0?'上架商品':'下架商品';
                    allMockData.value.push({
                        id:i+1,
                        task_name:type+'任务_'+(i+1),
                        task_type:type,
                        execute_time:'2024-06-15 10:00:00',
                        product_id:'P00'+((i%4)+1),
                        product_name:'商品'+String.fromCharCode(65+i%4),
                        create_time:'2024-01-01 12:00:00',
                        update_time:'2024-01-02 12:00:00'
                    });
                }
            }
            let filtered=[...allMockData.value];
            if(queryForm.task_name.trim()){
                const keyword=queryForm.task_name.trim().toLowerCase();
                filtered=filtered.filter(item=>item.task_name.toLowerCase().includes(keyword));
            }
            const page=PAGEDATA.List_conditions.page;
            const pageSize=PAGEDATA.List_conditions.page_size||10;
            const start=(page-1)*pageSize;
            const end=start+pageSize;
            PAGEDATA.datalist=filtered.slice(start,end);
            PAGEDATA.total_number=filtered.length;
            PAGEDATA.loading=false;
        },500);
    };

    const handleQuery=()=>{PAGEDATA.List_conditions.page=1;loadData();};
    const handleReset=()=>{
        queryForm.task_name='';
        queryForm.start_time=null;
        queryForm.end_time=null;
        PAGEDATA.List_conditions.page=1;
        loadData();
    };
    const pageTurning=(page_message)=>{
        PAGEDATA.List_conditions.page=page_message.page;
        PAGEDATA.List_conditions.page_size=page_message.page_size;
        loadData();
    };
    const onCheckAllChange=(e)=>{
        if(e.target.checked){PAGEDATA.check_value=PAGEDATA.datalist.map(item=>item.id);}
        else{PAGEDATA.check_value=[];}
    };
    const clearSelected=()=>{PAGEDATA.check_value=[];checkedAll.value=false;};

    // 详情
    const showDetail=(item)=>{currentItem.value=item;detailDrawer.value=true;};

    // 删除
    const handleDelete=(item)=>{currentItem.value=item;deleteModalVisible.value=true;};
    const confirmDelete=()=>{
        console.log('删除任务ID：',currentItem.value.id);
        deleteLoading.value=true;
        setTimeout(()=>{
            message.success('删除成功，任务ID：'+currentItem.value.id);
            deleteLoading.value=false;
            deleteModalVisible.value=false;
            const index=allMockData.value.findIndex(s=>s.id===currentItem.value.id);
            if(index>-1){allMockData.value.splice(index,1);}
            loadData();
        },500);
    };

    // 批量删除
    const handleBatchDelete=()=>{
        if(PAGEDATA.selectedList.length===0){message.warning('请先选择要删除的任务');return;}
        batchDeleteModalVisible.value=true;
    };
    const confirmBatchDelete=()=>{
        batchDeleteLoading.value=true;
        setTimeout(()=>{
            message.success('批量删除成功');
            batchDeleteLoading.value=false;
            batchDeleteModalVisible.value=false;
            const ids=PAGEDATA.selectedList.map(item=>item.id);
            allMockData.value=allMockData.value.filter(item=>!ids.includes(item.id));
            clearSelected();
            loadData();
        },500);
    };

    // 添加任务
    const resetAddForm=()=>{
        addForm.task_name='';
        addForm.task_type='上架商品';
        addForm.execute_time=null;
        addForm.product_id=null;
    };
    const showAddModal=()=>{
        resetAddForm();
        addModalVisible.value=true;
    };
    const closeAddModal=()=>{
        addModalVisible.value=false;
    };
    const confirmAdd=()=>{
        if(!addForm.task_name.trim()){message.warning('请输入任务名称');return;}
        if(!addForm.task_type){message.warning('请选择任务类型');return;}
        if(!addForm.execute_time){message.warning('请选择执行时间');return;}
        if(!addForm.product_id){message.warning('请选择商品');return;}
        addLoading.value=true;
        setTimeout(()=>{
            const product=productOptions.value.find(p=>p.value===addForm.product_id);
            const timeStr=dayjs.isDayjs(addForm.execute_time)?addForm.execute_time.format('YYYY-MM-DD HH:mm:ss'):addForm.execute_time;
            const newId=allMockData.value.length>0?Math.max(...allMockData.value.map(i=>i.id))+1:1;
            allMockData.value.push({
                id:newId,
                task_name:addForm.task_name,
                task_type:addForm.task_type,
                execute_time:timeStr,
                product_id:addForm.product_id,
                product_name:product?product.label:'',
                create_time:'2024-01-01 12:00:00',
                update_time:'2024-01-02 12:00:00'
            });
            message.success('添加成功');
            addLoading.value=false;
            addModalVisible.value=false;
            loadData();
        },500);
    };

    // 编辑任务
    const showEditDrawer=(item)=>{
        editForm.id=item.id;
        editForm.task_name=item.task_name;
        editForm.task_type=item.task_type;
        editForm.execute_time=item.execute_time?dayjs(item.execute_time):null;
        editForm.product_id=item.product_id||null;
        editDrawerVisible.value=true;
    };
    const confirmEdit=()=>{
        if(!editForm.task_name.trim()){message.warning('请输入任务名称');return;}
        if(!editForm.task_type){message.warning('请选择任务类型');return;}
        if(!editForm.execute_time){message.warning('请选择执行时间');return;}
        if(!editForm.product_id){message.warning('请选择商品');return;}
        editLoading.value=true;
        setTimeout(()=>{
            const timeStr=dayjs.isDayjs(editForm.execute_time)?editForm.execute_time.format('YYYY-MM-DD HH:mm:ss'):editForm.execute_time;
            const printData={
                id:editForm.id,
                task_name:editForm.task_name,
                task_type:editForm.task_type,
                execute_time:timeStr,
                product_id:editForm.product_id
            };
            console.log('编辑表单字段：',printData);
            const product=productOptions.value.find(p=>p.value===editForm.product_id);
            const index=allMockData.value.findIndex(s=>s.id===editForm.id);
            if(index>-1){
                allMockData.value[index].task_name=editForm.task_name;
                allMockData.value[index].task_type=editForm.task_type;
                allMockData.value[index].execute_time=timeStr;
                allMockData.value[index].product_id=editForm.product_id;
                allMockData.value[index].product_name=product?product.label:'';
            }
            message.success('编辑成功');
            editLoading.value=false;
            editDrawerVisible.value=false;
            loadData();
        },500);
    };

    return{
        PAGEDATA,store,queryForm,checkedAll,
        detailDrawer,currentItem,
        deleteModalVisible,deleteLoading,
        batchDeleteModalVisible,batchDeleteLoading,
        addModalVisible,addLoading,addForm,
        editDrawerVisible,editLoading,editForm,productOptions,
        handleQuery,handleReset,pageTurning,
        onCheckAllChange,clearSelected,
        showDetail,handleDelete,confirmDelete,
        handleBatchDelete,confirmBatchDelete,
        showAddModal,closeAddModal,confirmAdd,
        showEditDrawer,confirmEdit
    }
}
}
</script>

<style scoped>
.content_border{padding:10px;background-color:#fff;}
.footerStyle{text-align:center;background-color:#fff;padding:0;}
.font_size_12{font-size:12px;}
.card_style{margin:0px 10px 10px 0;font-size:12px;text-align:center;}
.task-content{padding:10px 0;}
.task-icon{height:80px;display:flex;justify-content:center;align-items:center;}
.task-time{width:100%;height:24px;line-height:24px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;font-size:12px;color:#666;margin-top:2px;}
.material-name{width:100%;height:28px;line-height:28px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;font-size:12px;color:#333;margin-top:4px;}
.floating-badge{height:20px;position:absolute;z-index:100;border-radius:4px;padding:0 4px;font-size:12px;opacity:0.9;color:#fff;}
.badge-up{background-color:#52c41a;}
.badge-down{background-color:#ff4d4f;}
.ant-list{height:100% !important;width:100% !important;}
</style>
