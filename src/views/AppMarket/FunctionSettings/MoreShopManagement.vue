<!-- 模板说明 
    1、多店铺管理
    2、店铺列表
    3、通过shopcode添加绑定店铺
    4、支持店铺名称查询、店铺code查询
    5、店铺列表支持分页显示
    6、列表支持单选、全选、查看详情、删除、批量删除操作
-->
<template>
<a-layout style="height: 100vh;width: 100vw;">
    <menu_head />
    <a-layout>
        <a-layout-sider v-model:collapsed="store.state.menu.coll" :trigger="null" collapsible>
            <menu_left :menudata="PAGEDATA.menudata"/>
        </a-layout-sider>
        <a-layout-content class="content_border">
            <div :style="{width:'100%',height:'42px',backgroundColor:'#f2f2f2',borderRadius:'4px',overflow:'hidden'}">
                <a-row>
                    <a-col :span="24" style="padding:6px 6px 0 10px;">
                        <a-space>
                            <a-input type="text" placeholder="输入店铺名称" v-model:value="queryForm.shop_name" autoComplete="off" style="width:160px;"/>
                            <a-input type="text" placeholder="输入店铺code" v-model:value="queryForm.shop_code" autoComplete="off" style="width:160px;"/>
                            <a-button type="primary" size="small" @click="handleQuery">查询</a-button>
                            <a-button type="default" size="small" @click="handleReset">重置</a-button>
                            <a-button type="primary" size="small" @click="showAddModal">添加绑定店铺</a-button>
                            <a-input type="text" v-model:value="currentShopCode" disabled placeholder="当前店铺code" autoComplete="off" style="width:160px;"/>
                            <a-button type="default" size="small" @click="copyShopCode">复制授权码</a-button>
                        </a-space>
                    </a-col>
                </a-row>
            </div>
            <div :style="{height:PAGEDATA.innerHeight+'px',overflowY:'auto',overflowX:'hidden',marginTop:'10px',marginBottom:'10px',padding:'10px 0 0 2px'}">
                <a-checkbox-group v-model:value="PAGEDATA.check_value" style="width:100%;height:100%;">
                    <a-list :grid="{gutter:0,column:5}" size="default" :data-source="PAGEDATA.datalist" :loading="PAGEDATA.loading">
                        <template #renderItem="{item}">
                            <a-card size="small" class="card_style" hoverable>
                                <div class="shop-content">
                                    <div class="shop-icon"><ShopOutlined style="font-size:48px;color:#1890ff;"/></div>
                                    <div class="material-name" :title="item.shop_name">{{item.shop_name}}</div>
                                    <div class="shop-code" :title="item.shop_code">{{item.shop_code}}</div>
                                </div>
                                <template #actions>
                                    <a-checkbox :value="item.id"></a-checkbox>
                                    <a href="#" class="font_size_12" @click.prevent="showDetail(item)">详情</a>
                                    <a href="#" class="font_size_12" @click.prevent="handleDelete(item)">解绑</a>
                                </template>
                            </a-card>
                        </template>
                    </a-list>
                </a-checkbox-group>
            </div>
            <a-layout-footer class="footerStyle">
                <a-row>
                    <a-col :span="12" style="text-align:left;">
                        <p class="font_size_12" style="padding:6px 0 0 0;">
                            <a-space>
                                <a-checkbox v-model:checked="checkedAll" @change="onCheckAllChange">全选</a-checkbox>
                                <a-tag :bordered="false"><ShopOutlined/> 已选 {{PAGEDATA.selectedList.length}} 条</a-tag>
                                <a-button type="dashed" size="small" class="font_size_12" @click="clearSelected"><ClearOutlined/>清空</a-button>
                                <a-button type="dashed" size="small" class="font_size_12" @click="handleBatchDelete">批量解绑</a-button>
                            </a-space>
                        </p>
                    </a-col>
                    <a-col :span="12"><nav_pagination :fandata="PAGEDATA" v-on:complete="pageTurning"/></a-col>
                </a-row>
            </a-layout-footer>
        </a-layout-content>
    </a-layout>
</a-layout>
<a-drawer v-model:open="detailDrawer" title="店铺详情" width="520" :closable="false">
    <div v-if="currentItem">
        <p>店铺ID：{{currentItem.id}}</p>
        <p>店铺名称：{{currentItem.shop_name}}</p>
        <p>店铺Code：{{currentItem.shop_code}}</p>
        <p>创建时间：{{currentItem.create_time}}</p>
        <p>更新时间：{{currentItem.update_time}}</p>
    </div>
    <a-button size="small" @click="detailDrawer=false">关闭</a-button>
</a-drawer>
<a-modal v-model:open="deleteModalVisible" title="确认删除" :confirm-loading="deleteLoading" @ok="confirmDelete">
    <p style="margin:10px 0 0 0;">是否确认删除店铺「{{currentItem?.shop_name}}」？</p>
    <p style="margin:10px 0 0 0;color:#ff4d4f;">删除后将无法恢复！</p>
</a-modal>
<a-modal v-model:open="batchDeleteModalVisible" title="确认批量删除" :confirm-loading="batchDeleteLoading" @ok="confirmBatchDelete">
    <p style="margin:10px 0 0 0;">是否确认删除选中的 {{PAGEDATA.selectedList.length}} 个店铺？</p>
    <p style="margin:10px 0 0 0;color:#ff4d4f;">删除后将无法恢复！</p>
</a-modal>
<a-modal v-model:open="addModalVisible" title="添加绑定店铺" :confirm-loading="addLoading" @ok="confirmAdd">
    <a-form layout="vertical" style="padding:10px 0 0 0;">
        <a-form-item label="店铺code" required>
            <a-input v-model:value="addForm.shop_code" placeholder="请输入店铺code" autoComplete="off"/>
        </a-form-item>
    </a-form>
</a-modal>
</template>
<script>
import {ref,reactive,onMounted,onUnmounted,watch} from 'vue';
import {message} from 'ant-design-vue';
import {ShopOutlined,ClearOutlined} from '@ant-design/icons-vue';
import {useStore} from 'vuex'
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";
export default {
name:'MoreShopManagement',
components:{menu_left,menu_head,nav_pagination,ShopOutlined,ClearOutlined},
props:{data:{typr:Object}},
setup(props,ctx){
    const store=useStore();
    const tool=new TOOL.TOOL()
    const API=new utils.A_Patch()
    const queryForm=reactive({shop_name:'',shop_code:''});
    const PAGEDATA=reactive({
        title:'多店管理',
        innerHeight:ref(window.innerHeight-180),
        menudata:{'key':'108','openKeys':'FunctionSettings'},
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
    const addModalVisible=ref(false);
    const addLoading=ref(false);
    const addForm=reactive({shop_code:''});
    const currentShopCode=ref('');
    const copyShopCode=()=>{
        if(!currentShopCode.value){message.warning('暂无店铺授权码可复制');return;}
        if(navigator.clipboard&&navigator.clipboard.writeText){
            navigator.clipboard.writeText(currentShopCode.value).then(()=>{message.success('复制店铺授权码成功');}).catch(()=>{message.error('复制失败');});
        }else{
            const textarea=document.createElement('textarea');
            textarea.value=currentShopCode.value;
            textarea.style.position='fixed';
            textarea.style.opacity='0';
            document.body.appendChild(textarea);
            textarea.select();
            try{document.execCommand('copy');message.success('复制店铺授权码成功');}catch(err){message.error('复制失败');}
            document.body.removeChild(textarea);
        }
    };
    watch(()=>PAGEDATA.check_value,(newVal)=>{
        PAGEDATA.selectedList=PAGEDATA.datalist.filter(item=>newVal.includes(item.id));
        checkedAll.value=PAGEDATA.datalist.length>0&&newVal.length===PAGEDATA.datalist.length;
    },{immediate:true});
    watch(()=>PAGEDATA.datalist,()=>{
        PAGEDATA.check_value=[];
        PAGEDATA.selectedList=[];
        checkedAll.value=false;
    });
    const handleResize=()=>{PAGEDATA.innerHeight=window.innerHeight-180;};
    onMounted(()=>{window.addEventListener('resize',handleResize);currentShopCode.value=store.state.member?.message?.shop?.shop_code||'';loadData();});
    onUnmounted(()=>{window.removeEventListener('resize',handleResize);});
    const allMockData=ref([]);
    const loadData=()=>{
        PAGEDATA.loading=true;
        setTimeout(()=>{
            if(allMockData.value.length===0){
                for(let i=0;i<23;i++){
                    allMockData.value.push({
                        id:i+1,
                        shop_name:'测试店铺_'+(i+1),
                        shop_code:'SHOP'+String(i+1).padStart(4,'0'),
                        create_time:'2024-01-01 12:00:00',
                        update_time:'2024-01-02 12:00:00'
                    });
                }
            }
            let filtered=[...allMockData.value];
            if(queryForm.shop_name.trim()){
                const keyword=queryForm.shop_name.trim().toLowerCase();
                filtered=filtered.filter(item=>item.shop_name.toLowerCase().includes(keyword));
            }
            if(queryForm.shop_code.trim()){
                const keyword=queryForm.shop_code.trim().toLowerCase();
                filtered=filtered.filter(item=>item.shop_code.toLowerCase().includes(keyword));
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
    const handleReset=()=>{queryForm.shop_name='';queryForm.shop_code='';PAGEDATA.List_conditions.page=1;loadData();};
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
    const showDetail=(item)=>{currentItem.value=item;detailDrawer.value=true;};
    const handleDelete=(item)=>{currentItem.value=item;deleteModalVisible.value=true;};
    const confirmDelete=()=>{
        deleteLoading.value=true;
        setTimeout(()=>{
            message.success('删除成功');
            deleteLoading.value=false;
            deleteModalVisible.value=false;
            const index=allMockData.value.findIndex(s=>s.id===currentItem.value.id);
            if(index>-1){allMockData.value.splice(index,1);}
            loadData();
        },500);
    };
    const handleBatchDelete=()=>{
        if(PAGEDATA.selectedList.length===0){message.warning('请先选择要删除的店铺');return;}
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
    const showAddModal=()=>{addForm.shop_code='';addModalVisible.value=true;};
    const confirmAdd=()=>{
        if(!addForm.shop_code.trim()){message.warning('请输入店铺code');return;}
        addLoading.value=true;
        setTimeout(()=>{
            console.log('店铺code：',addForm.shop_code.trim());
            message.success('绑定成功，code：'+addForm.shop_code.trim());
            addLoading.value=false;
            addModalVisible.value=false;
        },500);
    };
    return{
        PAGEDATA,store,queryForm,checkedAll,detailDrawer,currentItem,
        deleteModalVisible,deleteLoading,batchDeleteModalVisible,batchDeleteLoading,addModalVisible,addLoading,addForm,
        currentShopCode,copyShopCode,handleQuery,handleReset,pageTurning,onCheckAllChange,clearSelected,
        showDetail,handleDelete,confirmDelete,handleBatchDelete,confirmBatchDelete,showAddModal,confirmAdd
    }
}
}
</script>
<style scoped>
.content_border{padding:10px;background-color:#fff;}
.footerStyle{text-align:center;background-color:#fff;padding:0;}
.font_size_12{font-size:12px;}
.card_style{margin:0px 10px 10px 0;font-size:12px;text-align:center;}
.shop-content{padding:10px 0;}
.shop-icon{height:80px;display:flex;justify-content:center;align-items:center;}
.shop-code{width:100%;height:24px;line-height:24px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;font-size:12px;color:#666;margin-top:2px;}
.material-name{width:100%;height:28px;line-height:28px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;font-size:12px;color:#333;margin-top:4px;}
.floating-badge{background-color:#1890ff;color:#fff;height:20px;position:absolute;z-index:100;border-radius:4px;padding:0 4px;font-size:12px;opacity:0.8;}
.ant-list{height:100% !important;width:100% !important;}
</style>
