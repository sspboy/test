<!-- 模板说明:
组件名称：关键词搜索组件

-->
<template>

    <!-- id查询-关键词结果-抽屉 开始 -->
    <a-drawer v-model:open="props.data.open" :title="'关键词搜索 - ' + props.data.keyword" width="60%" :closable="true">

        <div :style="{
            height: PAGEDATA.innerHeight + 'px',
            overflowY:'auto',
            overflowX:'hidden',
            marginTop:'0px',
            marginBottom:'10px',
            padding:'0 0 0 2px'

        }">
            <!-- 批量操作栏 -->
            <p class="font_size_12" style="padding: 0 0 10px 2px;">
                <a-space>
                    <a-checkbox v-model:checked="checkedAllStatus" @change="SearchFunction.onCheckAllChange">全选</a-checkbox>
                    <a-tag :bordered="false"><PictureOutlined /> 已选 {{ PAGEDATA.confirm_img_list.length }} 张</a-tag>
                    <a-button type="dashed" size="small" class="font_size_12" @click="SearchFunction.clearSelected">清空</a-button>
                    <a-button type="dashed" size="small" class="font_size_12" @click="SearchFunction.batchDelOpen">批量删除</a-button>
                    <a-button type="dashed" size="small" class="font_size_12" @click="SearchFunction.batchRecycleOpen">批量回收</a-button>
                </a-space>
            </p>

            <a-checkbox-group  v-model:value="PAGEDATA.check_value" style="width: 100%;height: 100%;">
            <!-- 列表数据 -->
            <a-list 
                :grid="{ gutter: 0, column: 5 }"
                size="default"
                :loading="PAGEDATA.loading" 
                :data-source="PAGEDATA.datalist"
                style="width: 100%;height: 100%;"
                >
                <template #renderItem="{ item }">

                    <!--图片 显示方式-->
                    <a-card  v-if="item.material_type == 'photo'" size="small" class="card_style" hoverable>

                        <div class="floating-badge"><PictureOutlined /> 图片</div>

                        <div class="image_content_">
                            <!--图片文件 显示方式-->
                            <a-image
                                :style="material_width(item.photoInfo)"
                                :src="item.byte_url"
                            />
                        </div>
                        <div class="material-name" :title="item.materil_name">
                            {{ item.material_name }}
                        </div>
                        <template #actions>
                            <a-checkbox 
                                :value="item.material_id"
                            ></a-checkbox>
                            <a href="#" class="font_size_12" @click="SearchFunction.showChildrenDrawer(item)">详情</a>
                            <a href="#" class="font_size_12" @click="SearchFunction.delOpen(item)">删除</a>
                            <a href="#" class="font_size_12" @click="SearchFunction.recycleOpen(item)">回收</a>
                        </template>
                    </a-card>

                    <!--视频 显示方式-->
                    <a-card v-else-if="item.material_type == 'video'" size="small" class="card_style" hoverable>
                        
                        <div class="floating-badge-video"><PlaySquareOutlined />视频</div>

                        <div class="image_content_">
                        <a-image
                            :style="video_cover_width(item)"
                            :src="item.videoInfo.video_cover_url"
                        />
                        </div>
                        <div class="material-name" :title="item.materil_name">
                            {{ item.material_name }}
                        </div>
                        <template #actions>
                            <a-checkbox 
                                :value="item.material_id"
                                class="font_size_12" 
                            ></a-checkbox>
                            <a href="#" class="font_size_12" @click="SearchFunction.showChildrenDrawer(item)">
                                详情
                            </a>
                            <a href="#" class="font_size_12" @click="SearchFunction.delOpen(item)">
                                删除
                            </a>
                            <a href="#" class="font_size_12" @click="SearchFunction.recycleOpen(item)">
                                回收
                            </a>
                        </template>
                    </a-card>

                </template>
            </a-list>
            </a-checkbox-group>
        </div>

        <a-layout-footer class="footerStyle" v-show="!PAGEDATA.loading">
            <nav_pagination :fandata="PAGEDATA" v-on:complete="page_turning"/>
        </a-layout-footer>

        <!--详情-二次抽屉-->
        <a-drawer v-model:open="SearchFunction.childrenDrawer" title="素材详情" width="320" :closable="false">
            <p>素材详情-图片-视频</p>
        </a-drawer>

    </a-drawer>
    <!-- id查询-关键词结果-抽屉 结束 -->

    <!--删除 二次确认 弹出层-->
    <a-modal
        v-model:open="SearchFunction.delModalOpen"
        title="删除确认"
        :confirm-loading="SearchFunction.delConfirmLoading"
        @ok="SearchFunction.delConfirm"
        okText="删除"
        cancelText="取消"
    >
        <p style="margin-top: 20px;">确定删除该素材？数据删除后将无法恢复！</p>
    </a-modal>

    <!--回收 二次确认 弹出层-->
    <a-modal
        v-model:open="SearchFunction.recycleModalOpen"
        title="回收确认"
        :confirm-loading="SearchFunction.recycleConfirmLoading"
        @ok="SearchFunction.recycleConfirm"
        okText="回收"
        cancelText="取消"
    >
        <p style="margin-top: 20px;">确定将该素材移入回收站？</p>
    </a-modal>

    <!--批量删除 确认弹窗-->
    <a-modal
        v-model:open="SearchFunction.batchDelModalOpen"
        title="是否确认批量删除素材?"
        :confirm-loading="SearchFunction.batchDelConfirmLoading"
        @ok="SearchFunction.batchDelConfirm"
        okText="彻底删除"
        cancelText="取消"
        :centered="true"
    >
        <p style="margin: 10px 0 0 0; color:blue; font-weight: bold; margin-top: 20px;">注意：批量删除成功后1-2分钟后生效。</p>
        <p style="margin: 10px 0 0 0;">批量删除后将无法恢复！</p>
    </a-modal>

    <!--批量回收 确认弹窗-->
    <a-modal
        v-model:open="SearchFunction.batchRecycleModalOpen"
        title="是否确认批量回收素材?"
        :confirm-loading="SearchFunction.batchRecycleConfirmLoading"
        @ok="SearchFunction.batchRecycleConfirm"
        okText="确认回收"
        cancelText="取消"
        :centered="true"
    >
        <p style="margin: 10px 0 0 0; color:blue; font-weight: bold; margin-top: 20px;">注意：批量回收成功后1-2分钟后生效。</p>
        <p style="margin: 10px 0 0 0;">批量回收后素材将放入回收站，耐心等待后刷新查看。</p>
    </a-modal>

</template>
<script>

import { defineComponent,ref,reactive,onMounted,h, watch } from 'vue';
import { PictureOutlined,PlaySquareOutlined} from '@ant-design/icons-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import axios from 'axios'
import * as utils from '@/assets/JS_Model/public_model';
import nav_pagination from "@/components/nav_pagination.vue";
import { useStore } from 'vuex'
import { t } from '@wangeditor/editor';

// 组件引用=====开始
export default {
   name:'Keywordseach',
   components:{
    PictureOutlined,
    PlaySquareOutlined,
    nav_pagination
   },
props: {
   data:{typr:Object}
},
setup(props,ctx) {

    const API = new utils.A_Patch()     // 请求接口地址合集
    const tool = new TOOL.TOOL()        // 工具方法

    const PAGEDATA = reactive({
        innerHeight: ref(window.innerHeight - 160), // 初始化列表高度
        datalist:[],//列表数据
        total:0,//列表数据总条数
        loading:true,//列表加载状态
        total_number:0,     // 内容总数
        List_conditions:ref({page:1}),// 翻页-当前页数
        check_value:ref([]),// 选中状态-选中素材id列表
        confirm_img_list:[],// 已选素材id列表（用于批量操作）
    });

    const checkedAllStatus =ref(false) // 全选状态

    // 默认条件
    const navData = ref({
        "folder_id":"0",      // 文件夹id，0-素材中心； -1-回收站；
        "operate_status":[1], // 素材状态，0-待下载；1-有效；4-回收站中；
        "page_num": 1,
        "page_size": 10,
        "order_by":1 ,
        "material_name":undefined // 关键词=>素材名称模糊查询

    })

    // 查询方法
    const getKeyThenIncreaseKey=()=>{

        console.log('点击了关键词查询组件的按钮')

        navData.value.material_name = props.data.keyword;

        axios.post(API.AppSrtoreAPI.material.searchmaterial,navData.value).then((res)=>{

            let code = res.data.code;

            if(code == 10000){// 加载成功

                PAGEDATA.datalist = res.data.data.material_info_list; // 列表数据
                PAGEDATA.total_number = res.data.data.total; // 列表数据总条数
                PAGEDATA.loading = false; // 关闭加载状态-加载成功

            } else {

                // 加载失败
                PAGEDATA.loading = false; // 加载状态-加载失败
                tool.Fun_.message('error','关键词查询失败' + res.data.sub_msg)

            }            

        })
    }

    // 监听抽屉状态为true,即打开抽屉时，执行查询方法
    watch(()=>props.data.open,(newVal)=>{
        if(newVal){
            PAGEDATA.loading = true; // 打开抽屉即执行查询，设置加载状态为true
            PAGEDATA.datalist.length = 0; // 打开抽屉即执行查询，清空列表数据
            PAGEDATA.List_conditions.page=1; // 翻页-当前页数
            navData.value.page_num = 1; // 打开抽屉即执行查询，重置页数为1
            navData.value.page_size = 10; // 打开抽屉即执行查询，重置每页条数为10
            PAGEDATA.check_value = [];// 重置选中状态
            PAGEDATA.confirm_img_list = [];// 重置已选素材列表
            checkedAllStatus.value = false;// 重置全选状态
            getKeyThenIncreaseKey(); // 打开抽屉即执行查询
        }
    })

    // 翻页方法--文件夹下素材翻页-搜索查询结果翻页；
    const page_turning = (data)=>{

        PAGEDATA.justify = 'flex-start';
        
        PAGEDATA.align = 'flex-start';

        navData.value.page_num = data.page;
        
        navData.value.page_size = data.page_size;

        getKeyThenIncreaseKey()

    }

    // 图片尺寸验证
    const material_width = (_info) => {
        var width = _info.width;
        var height = _info.height;
        if(height == width){// 1:1
            var res =  {width:'100px'}
        }else if(width > height){// 长大于宽
            var res =  {width:'100px'}
        }else if(width < height){// 长小于宽
            var res =  {height:'100px'}
        }

        return  res
    }

    // 视频封面尺寸验证
    const video_cover_width = (_info) => {
        return {height:'100px'}
    }


    // 方法
    const SearchFunction = reactive({

        childrenDrawer:false,

        showChildrenDrawer:(item) => {
            console.log(item)
            SearchFunction.childrenDrawer = true;
        },

        // 删除确认弹窗
        delModalOpen: false,
        delConfirmLoading: false,
        currentDelItem: null,

        delOpen:(item) => {
            SearchFunction.currentDelItem = item;
            SearchFunction.delModalOpen = true;
        },

        delConfirm:() => {
            SearchFunction.delConfirmLoading = true;
            const item = SearchFunction.currentDelItem;
            axios.post(API.AppSrtoreAPI.material.deletematerial, {
                material_ids: [item.material_id]
            }).then((res) => {
                if(res.data.code == 10000){
                    tool.Fun_.message('success','删除成功');
                    getKeyThenIncreaseKey();
                }else{
                    tool.Fun_.message('error','删除失败：' + res.data.sub_msg);
                }
            }).catch(() => {
                tool.Fun_.message('error','删除请求异常');
            }).finally(() => {
                SearchFunction.delConfirmLoading = false;
                SearchFunction.delModalOpen = false;
                SearchFunction.currentDelItem = null;
            });
        },

        // 回收确认弹窗
        recycleModalOpen: false,
        recycleConfirmLoading: false,
        currentRecycleItem: null,

        recycleOpen:(item) => {
            SearchFunction.currentRecycleItem = item;
            SearchFunction.recycleModalOpen = true;
        },

        recycleConfirm:() => {
            SearchFunction.recycleConfirmLoading = true;
            const item = SearchFunction.currentRecycleItem;
            axios.post(API.AppSrtoreAPI.material.movematerialrecyclebin, {
                material_ids: [item.material_id]
            }).then((res) => {
                if(res.data.code == 10000){
                    tool.Fun_.message('success','回收成功');
                    getKeyThenIncreaseKey();
                }else{
                    tool.Fun_.message('error','回收失败：' + res.data.sub_msg);
                }
            }).catch(() => {
                tool.Fun_.message('error','回收请求异常');
            }).finally(() => {
                SearchFunction.recycleConfirmLoading = false;
                SearchFunction.recycleModalOpen = false;
                SearchFunction.currentRecycleItem = null;
            });
        },

        // 全选/取消全选
        onCheckAllChange:(e) => {
            
            const checked = e.target.checked;            

            checkedAllStatus.value=checked

            if (checked == true) {
                // 全选素材list
                PAGEDATA.datalist.forEach(item => {

                    var material_id = item.material_id;

                    // 判断是否在数组中
                    if(!PAGEDATA.check_value.includes(material_id)){
                        PAGEDATA.check_value.push(material_id)
                    }

                    if(!PAGEDATA.confirm_img_list.includes(material_id)){ 
                        PAGEDATA.confirm_img_list.push(material_id)
                    }
                });

            } else {

                PAGEDATA.check_value.length = 0;
                PAGEDATA.confirm_img_list.length= 0;

            }

        },

        // 清空已选
        clearSelected:() => {
            PAGEDATA.check_value.length = 0;
            PAGEDATA.confirm_img_list.length =0;
            checkedAllStatus.value=false

        },

        // 批量删除确认弹窗
        batchDelModalOpen: false,
        batchDelConfirmLoading: false,
        batchDelMaterialIds: [],
        
        // 二次确认批量删除
        batchDelOpen:() => {
            const v_number = PAGEDATA.confirm_img_list.length;
            if (v_number == 0) {
                tool.Fun_.message('warning', '请至少选择一条素材进行删除！');
            } else if (v_number > 100) {
                tool.Fun_.message('warning', '批量删除素材数量不能超过100条！');
            } else {
                SearchFunction.batchDelMaterialIds = [...PAGEDATA.confirm_img_list];
                SearchFunction.batchDelModalOpen = true;
            }
        },

        // 批量删除方法
        batchDelConfirm:() => {
            SearchFunction.batchDelConfirmLoading = true;
            axios.post(API.AppSrtoreAPI.material.deletematerial, {
                material_ids: SearchFunction.batchDelMaterialIds
            }).then((res) => {
                if (res.data.code == 10000) {
                    tool.Fun_.message('success', '删除操作成功！');
                    SearchFunction.clearSelected();
                    getKeyThenIncreaseKey();
                } else {
                    tool.Fun_.message('error', res.data.sub_msg);
                }
            }).catch(() => {
                tool.Fun_.message('error', '批量删除请求异常');
            }).finally(() => {
                SearchFunction.batchDelConfirmLoading = false;
                SearchFunction.batchDelModalOpen = false;
                SearchFunction.batchDelMaterialIds = [];
            });
        },

        // 批量回收确认弹窗
        batchRecycleModalOpen: false,
        batchRecycleConfirmLoading: false,
        batchRecycleMaterialIds: [],

        batchRecycleOpen:() => {
            const v_number = PAGEDATA.confirm_img_list.length;
            if (v_number == 0) {
                tool.Fun_.message('warning', '请至少选择一条素材进行回收！');
            } else if (v_number > 100) {
                tool.Fun_.message('warning', '批量回收素材数量不能超过100条！');
            } else {
                SearchFunction.batchRecycleMaterialIds = [...PAGEDATA.confirm_img_list];
                SearchFunction.batchRecycleModalOpen = true;
            }
        },
        
        // 批量回收方法
        batchRecycleConfirm:() => {
            SearchFunction.batchRecycleConfirmLoading = true;
            axios.post(API.AppSrtoreAPI.material.movematerialrecyclebin, {
                material_ids: SearchFunction.batchRecycleMaterialIds
            }).then((res) => {
                if (res.data.code == 10000) {
                    tool.Fun_.message('success', '成功放入回收站！');
                    SearchFunction.clearSelected();
                    getKeyThenIncreaseKey();
                } else {
                    tool.Fun_.message('error', res.data.sub_msg);
                }
            }).catch(() => {
                tool.Fun_.message('error', '批量回收请求异常');
            }).finally(() => {
                SearchFunction.batchRecycleConfirmLoading = false;
                SearchFunction.batchRecycleModalOpen = false;
                SearchFunction.batchRecycleMaterialIds = [];
            });
        }
    })




       return{
            props,
            PAGEDATA,
            page_turning,
            material_width,
            video_cover_width,
            SearchFunction,
            checkedAllStatus
       }

   }
}
</script>
<style scoped>
.card_style{margin:0px 10px 10px 0;font-size: 12px;text-align: center;}
.material-name {
    width: 100%;
    height: 28px;
    line-height: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    font-size: 12px;
    color: #333;
    margin-top: 4px;
}
/**！！！素材类型---相对定位！！！**/
.floating-badge {background-color: black;color: #fff;height: 20px;position: absolute;z-index: 100;border-radius: 4px;padding: 0 4px;font-size: 12px;opacity: 0.5}
.floating-badge-video {background-color:blue;color: #fff;height: 20px;position: absolute;z-index: 100;border-radius: 4px;padding: 0 4px;font-size: 12px;opacity: 0.5}
</style>