<!-- 素材列表--模板说明 -->
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


            <!-- 选择文件夹树形结构 开始 -->
            <a-layout-sider width="300">


                    <!-- 加载状态 -->
                    <div v-if="treeData.length == 0" style="text-align: center;margin-top: 65%;">
                        <a-spin />
                    </div>

                    <!-- 为空状态 -->
                    <div v-else-if="treeData.value === 'undefined'" style="text-align: center;margin-top: 65%;">
                        <a-empty />
                    </div>

                    <!-- 不为空状态 innerHeight -->
                    <div v-else style="height: 100px;"
                        :style="{
                            height: PAGEDATA.innerHeight + 100 + 'px',
                            overflowY:'auto',
                            overflowX:'auto',
                            marginTop:'10px',
                            marginBottom:'10px',
                            padding:'10px 0 0 2px',
                        }"
                    >
                        <!-- <p style="padding: 15px 0 0 32px;font-weight: bold;">
                            <FolderOutlined /> 选择文件夹
                        </p> -->
                        <a-tree
                            v-model:expandedKeys="expandedKeys"
                            v-model:selectedKeys="selectedKeys"
                            :load-data="onLoadData"
                            :tree-data="treeData"
                            @select="MaterialListMethod.Tree.handleSelect"
                            show-icon
                            style="font-size: 12px;"
                        >
                        
                            <template #icon="{ key, selected }">
                                <FolderOutlined />
                            </template>
                        </a-tree>
                    </div>
                    
                    
                    

            </a-layout-sider>
            <!-- 选择文件夹树形结构 结束 -->

            <!-- 素材列表 不为空状态 -->


            <a-layout-content class="content_border">

                <!-- 查询导航 
                    面包屑、id查询、关键字查询
                    开始
                -->

                <div :style="{
                    width: '100%',
                    height:'42px',
                    backgroundColor:'#f2f2f2',
                    borderRadius:'4px',
                    overflow:'hidden',
                }">
                    <a-row>
                        <!--面包屑导航-->
                        <a-col :span="12">
                            <a-space>
                                <div style="margin: 10px 0 0 20px;"> 
                                    <a-breadcrumb>
                                        <a-breadcrumb-item v-for=" item in PAGEDATA.BreadCrumb" href="#">
                                            <FolderOutlined />
                                            <span 
                                                @click="MaterialListMethod.SelectMaterial.breadcrumb_click(item.folder_id)" 
                                                class="font_size_12"
                                            >
                                            {{ item.folder_name }}
                                            </span>
                                        </a-breadcrumb-item>
                                    </a-breadcrumb>
                                </div>
                            </a-space>
                        </a-col>
                        <a-col :span="12" style="padding:8px 6px 0 0;">
                            <a-space>
                                <a-input 
                                    type="text" 
                                    placeholder="输入素材id"
                                    v-model:value="MaterialListMethod.SelectMaterial.m_id.value"
                                    autoComplete="off"
                                    >
                                </a-input>
                                <a-input 
                                    type="text" 
                                    placeholder="输入关键词"
                                    v-model:value="MaterialListMethod.SelectMaterial.key_word.value"
                                    autoComplete="off"
                                ></a-input>
                                <a-button 
                                type="primary" 
                                size="small"
                                @click="showQueryDrawer"
                                >查询</a-button>
                                <a-button type="primary" size="small" @click="showNetImageModal">网络图片上传</a-button>
                                <a-button type="primary" size="small" @click="showLocalUploadModal">本地图片上传</a-button>
                            </a-space>
                        </a-col>
                    </a-row>
                </div>
                <!-- 
                    查询导航 
                    面包屑、id查询、关键字查询
                    结束
                -->                


                <!-- 素材列表 不为空状态 -->
                <div :style="{
                    height: PAGEDATA.innerHeight + 'px',
                    overflowY:'auto',
                    overflowX:'hidden',
                    marginTop:'10px',
                    marginBottom:'10px',
                    padding:'10px 0 0 2px'

                }">
                    <a-checkbox-group  v-model:value="PAGEDATA.check_value" style="width: 100%;height: 100%;">
                    <a-list 

                        :grid="{ gutter: 0, column: 5 }"
                        size="default"
                        :data-source="PAGEDATA.datalist"
                        :loading="PAGEDATA.loading"
                    >

                        <template #renderItem="{ item }">

                            <a-card  v-if="item.material_type == 'photo'" size="small" class="card_style" hoverable>

                                <div class="floating-badge">
                                    <PictureOutlined /> 图片</div>

                                <div class="image_content_">
                                    <!--图片文件 显示方式-->
                                    <a-image
                                        :style="Material_Images.material_width(item.photo_info)"
                                        :src="item.byte_url"
                                    />
                                </div>
                                <div class="material-name" :title="item.materil_name">
                                    {{ item.materil_name }}
                                </div>
                                <template #actions>
                                    <a-checkbox 
                                        :value="item.material_id"
                                        @change="Material_Images.select_img_fun(item)"
                                    ></a-checkbox>
                                    <a href="#" class="font_size_12" @click="showChildimgDrawer(item)">详情</a>
                                    <a href="#" class="font_size_12" @click="MaterialListMethod.del.del_open(item)">删除</a>
                                    <a href="#" class="font_size_12" @click="MaterialListMethod.del.RecycleBin_open(item)">回收</a>
                                </template>
                            </a-card>

                            <!--视频 显示方式-->
                            <a-card v-else-if="item.material_type == 'video'" size="small" class="card_style" hoverable>
                                
                                <div class="floating-badge"><PlaySquareOutlined />视频</div>

                                <div class="image_content_">
                                <a-image
                                    :height="100"
                                    :src="item.video_info.video_cover_url"
                                />
                                </div>
                                <div class="material-name" :title="item.materil_name">
                                    {{ item.materil_name }}
                                </div>
                                <template #actions>
                                    <a-checkbox 
                                        :value="item.material_id"
                                        @change="Material_Images.select_img_fun(item)"
                                        class="font_size_12" 
                                    ></a-checkbox>
                                    <a href="#" class="font_size_12" @click="showChildvideoDrawer(item)">
                                        详情
                                    </a>
                                    <a href="#" class="font_size_12" @click="MaterialListMethod.del.del_open(item)">
                                        删除
                                    </a>
                                    <a href="#" class="font_size_12" @click="MaterialListMethod.del.RecycleBin_open(item)">
                                        回收
                                    </a>
                                </template>
                            </a-card>

                        </template>

                    </a-list>
                </a-checkbox-group>
                </div>


                <!-- 翻页 -->
                <a-layout-footer class="footerStyle">
                    <a-row>

                        <a-col :span="10" style="text-align: left;">
                            
                            <p class="font_size_12" style="padding: 6px 0 0 0;">

                                <a-space>

                                    <a-checkbox v-model:checked="MaterialListMethod.SelectMaterial.checked_status.value" @change="Material_Images.onCheckAllChange">全选</a-checkbox>
                                
                                    <a-tag :bordered="false">
                                        <FolderOpenOutlined /> 
                                        已选择图片
                                        {{ Material_Images.confirm_img_list.value.length }}
                                        张
                                    </a-tag>
                                    <a href="#" class="font_size_12" @click="Material_Images.clear_confirm_img_list"><ClearOutlined />清空</a>
                                    <a href="#" class="font_size_12" @click="console.log('批量删除')"><ClearOutlined />批量删除</a>
                                    <a href="#" class="font_size_12" @click="console.log('批量移入回收站')"><ClearOutlined />批量回收</a>

                                </a-space>
                            </p>
                        </a-col>
                        <a-col :span="14">
                            <nav_pagination :fandata="PAGEDATA" v-on:complete="MaterialListMethod.page_turning"/>
                        </a-col>
                    </a-row>
                </a-layout-footer>

            </a-layout-content>


        </a-layout>
            
    </a-layout>


    <!--图片详情 抽屉 -->
    <a-drawer v-model:open="childimgDrawer" title="图片详情" width="520" :closable="false">

        <div v-if="Material_Images.image_detaile !== undefined">

            <!--图片信息-->
            <p>所属文件夹ID：{{ Material_Images.image_detaile.value.folder_id }}</p>
            <p>素材ID：{{ Material_Images.image_detaile.value.material_id }}</P>
            <p>图片名称：{{ Material_Images.image_detaile.value.materil_name }}</p>
            
            <div v-if="Material_Images.image_detaile.value.origin_url !== ''">
                <p style="margin: 10px 0 10px 0;">来源地址：</p>
                <p style="margin: 10px 0 10px 0;">
                    <img width="50" :src="Material_Images.image_detaile.value.origin_url"></img>
                </p>
                <p style="width: 90%;font-size:12px;background-color: #f2f2f2;padding: 6px;border-radius: 4px; margin: 8px 0 0 0;">
                    <a-typography-paragraph :copyable="{ tooltip: false }">
                        {{ Material_Images.image_detaile.value.origin_url }}
                    </a-typography-paragraph>
                </p>
            </div>
            <p style="margin: 10px 0 10px 0;">素材地址：</p>
            <p style="margin: 10px 0 10px 0;"><img width="50" :src="Material_Images.image_detaile.value.byte_url"></img></p>

            <div style="width: 90%;font-size:12px;background-color: #f2f2f2;padding: 6px;border-radius: 4px;margin: 0 0 20px 0;">
                    <a-typography-paragraph :copyable="{ tooltip: false }">
                        {{ Material_Images.image_detaile.value.byte_url }}
                    </a-typography-paragraph>
            </div>

            <p v-if="Material_Images.image_detaile.value.photo_info !== undefined">
                图片长 {{ Material_Images.image_detaile.value.photo_info.width }}px
                宽  {{ Material_Images.image_detaile.value.photo_info.height }}px
                格式  {{ Material_Images.image_detaile.value.photo_info.format }}
            </p>
            <p>审核状态：
                <!--1-待审核；2-审核中；3-通过 4-拒绝；注意：只有audit_status =3时byte_url才会返回-->
                <span v-if="Material_Images.image_detaile.value.audit_status == '1'">待审核</span>
                <span v-else-if="Material_Images.image_detaile.value.audit_status == '2'">审核中</span>
                <span v-else-if="Material_Images.image_detaile.value.audit_status == '3'">审核通过</span>
                <span v-else-if="Material_Images.image_detaile.value.audit_status == '4'">拒绝</span>
            </p>

            <p v-if="Material_Images.image_detaile.value.audit_status == '4'">审核失败原因：{{ Material_Images.image_detaile.value.audit_reject_desc }}</p>

            <p material_type="">素材类型：
                <span v-if="Material_Images.image_detaile.value.material_type == 'photo'">图片</span>
                <span v-else-if="Material_Images.image_detaile.value.material_type == 'video'">视频</span>
            </p>

            <p operate_status="">文件夹状态：
                <!--0-待下载；1-有效；4-在回收站中-->
                <span v-if="Material_Images.image_detaile.value.operate_status == 0">待下载</span>
                <span v-else-if="Material_Images.image_detaile.value.operate_status == 1">有效</span>
                <span v-else-if="Material_Images.image_detaile.value.operate_status == 4">回收站中</span>
            </p>
            <p size="">文件大小：{{ Material_Images.image_detaile.value.size }} kb</p>
            <p material_type="">创建时间: {{ Material_Images.image_detaile.value.create_time }}</p>
            <p material_type="">修改时间: {{ Material_Images.image_detaile.value.update_time }}</p>

        </div>

        <div v-if="Material_Images.image_detaile == undefined">
                <a-spin />
        </div>

        <a-button size="small" @click="showChildimgDrawer">关闭</a-button>

    </a-drawer>

    <!--视频详情 抽屉 -->
    <a-drawer v-model:open="childvideoDrawer" title="视频详情" width="520" :closable="false">

        <div v-if="Material_Images.video_detaile.value !== undefined">
        <!--视频信息-->
            <p>所属文件夹ID：{{ Material_Images.video_detaile.value.folder_id }}</p>
            <p>素材ID：{{ Material_Images.video_detaile.value.material_id }}</P>
            <p>图片名称：{{ Material_Images.video_detaile.value.materil_name }}</p>

            <div v-if="Material_Images.video_detaile.value.origin_url !== ''">

                <p>来源地址：</p>

                <p class="sucai_url">
                    <a-typography-paragraph :copyable="{ tooltip: false }">
                        {{ Material_Images.video_detaile.value.origin_url }}
                    </a-typography-paragraph>
                </p>

                <video
                    :key="Material_Images.video_detaile.value.material_id"
                    controls
                    preload="metadata"
                    width="100%" 
                >
                    <source :src="Material_Images.video_detaile.value.origin_url" type="video/mp4"></source>
                </video>
            </div>

            <div style="margin: 10px 0 10px 0;" v-if="Material_Images.video_detaile.value.byte_url !== ''">
                素材地址：
                <p class="sucai_url">
                    <a-typography-paragraph :copyable="{ tooltip: false }">
                        {{ Material_Images.video_detaile.value.byte_url }}
                    </a-typography-paragraph>
                </p>
            </div>

            <p v-if="Material_Images.video_detaile.value.video_info !== undefined">
                视频时长 {{ Material_Images.video_detaile.value.video_info.duration }} 秒 
                格式 {{ Material_Images.video_detaile.value.video_info.format }}
            </p>
        </div> 

        <div v-if="Material_Images.video_detaile.value == undefined">
                <a-spin />
        </div>

        <a-button size="small" @click="showChildvideoDrawer">关闭</a-button>

    </a-drawer>

    <!--删除确认 弹出层 开始-->
    <a-modal v-model:open="MaterialListMethod.del.delOpenStatus.value" 
        title="确认删除"
        :confirm-loading="MaterialListMethod.del.buttonload.value"
        @ok="MaterialListMethod.del.del_material_ids"
    >
        <p style="margin: 10px 0 0 0;">是否确认删除素材，删除后将无法恢复！</p>
    </a-modal>
    <!--删除确认 弹出层 结束-->

    <!--回收确认 弹出层 开始-->
    <a-modal 
        v-model:open="MaterialListMethod.del.RecycleBinOpenStatus.value" 
        title="确认回收"
        :confirm-loading="MaterialListMethod.del.RecycleBinbuttonload.value"
        @ok="MaterialListMethod.del.MovetoRecycleBin_ids"
    >
        <p style="margin: 10px 0 0 0;">是否确认回收素材，回收后，素材将放入回收站！</p>
        <p style="margin: 10px 0 0 0;">删除成功后1-2分钟后生效 耐心等待后刷新查看。</p>

    </a-modal>
    <!--回收确认 弹出层 结束-->


    <!-- 查询详情抽屉 开始 -->
    <a-drawer v-model:open="queryDrawer" title="查询详情" width="400" :closable="true">
        <a-space direction="vertical" style="width: 100%;">
            <a-input 
                type="text" 
                placeholder="输入素材id"
                v-model:value="MaterialListMethod.SelectMaterial.m_id.value"
                autoComplete="off"
            />
            <a-input 
                type="text" 
                placeholder="输入关键词"
                v-model:value="MaterialListMethod.SelectMaterial.key_word.value"
                autoComplete="off"
            />
            <a-button type="primary" size="small" @click="handleQuery">查询</a-button>
        </a-space>
    </a-drawer>
    <!-- 查询详情抽屉 结束 -->

    <!-- 上传网络图片 弹出层 开始-->
    <a-modal 
        v-model:open="netImageModalVisible" 
        title="上传网络图片"
        @ok="handleNetImageOk"
        @cancel="handleNetImageCancel"
    >
        <a-form 
            ref="netImageFormRef"
            :model="netImageForm"
            :rules="netImageRules"
            layout="vertical"
            style="padding: 20px 0 0 0;"
        >

            <a-form-item label="选择文件夹" name="folderId">
                <a-cascader
                    v-model:value="netImageForm.folderId"
                    :options="netImageFolderOptions"
                    :load-data="loadNetImageFolder"
                    placeholder="请选择素材文件夹"
                    change-on-select
                />
            </a-form-item>
            
            <div style="margin-bottom: 16px;">

                <label style="display: block; margin: 0 0 8px 0;font-size: 12px;">
                    <span style="color: #ff4d4f;">*</span> 图片地址 
                </label>

                <div v-for="(url, index) in netImageForm.imageUrls" :key="index" style="margin-bottom: 8px;">
                        <a-form-item
                            :name="['imageUrls', index]"
                            :rules="[
                                { required: true, message: '请输入图片地址', trigger: 'blur' },
                                { pattern: /^http/, message: '图片地址必须以 http 开头', trigger: 'change' }
                            ]"
                            style="margin-bottom: 0;"
                        >
                            <a-row>
                                <a-col :span="20">
                                    <a-input 
                                        v-model:value="netImageForm.imageUrls[index]"
                                        :placeholder="'请输入图片地址'"
                                        size="middle"

                                    />
                                </a-col>
                                <a-col :span="4">
                                    <a-button 
                                        type="dashed" 
                                        size="small"
                                        @click="removeImageUrl(index)"
                                        style="margin: 2px 0 0 10px;width: 80%;"
                                        
                                    >
                                    删除
                                    </a-button>
                                </a-col>

                            </a-row>

                            
                        </a-form-item>

                </div>
                <div >
                    <a-button 
                        type="dashed" 
                        size="small"
                        @click="addImageUrl"
                        :disabled="netImageForm.imageUrls.length >= 10"
                        style="margin: 18px 0 18px 0;"
                    >
                        <PlusOutlined /> 添加地址
                    </a-button>
                    <span v-if="netImageForm.imageUrls.length >= 10" style="color: #ff4d4f; font-size: 12px; margin-left: 8px;">
                        最多添加10个图片地址
                    </span>
                </div>
            </div>
        </a-form>
    </a-modal>
    <!-- 上传网络图片 弹出层 结束-->

    <!-- 上传本地文件 弹出层 开始-->
    <a-modal 
        v-model:open="localUploadModalVisible" 
        title="上传本地文件"
        @ok="handleLocalUploadOk"
        @cancel="handleLocalUploadCancel"
        :width="560"
        
    >
        <a-upload-dragger
            v-model:fileList="localFileList"
            :multiple="true"
            :beforeUpload="beforeLocalUpload"
            :customRequest="handleLocalUpload"
            @change="handleLocalUploadChange"
            style="margin: 30px 0 20px 0;"
        >
            <p class="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p class="ant-upload-text">点击或拖拽文件到此处上传</p>
            <p class="ant-upload-hint">
                支持单次上传多个文件，文件大小不超过5MB，最多20个文件
            </p>
        </a-upload-dragger>
    </a-modal>
    <!-- 上传本地文件 弹出层 结束-->

</template>
<script>
import { computed,ref,reactive,onMounted,h,onUnmounted,watch } from 'vue';
import{Empty, message} from 'ant-design-vue'

import { useStore } from 'vuex'
// 网络请求工具引用FolderOutlined
import { FolderOutlined,CloseCircleOutlined,ClearOutlined,EyeOutlined,DownOutlined,FolderOpenOutlined,DeleteOutlined,PictureOutlined,PlaySquareOutlined, PlusOutlined, InboxOutlined} from '@ant-design/icons-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import * as MaterialList from '@/assets/douyinshop/productmanagement/material_list';// 商品管理->编辑操作方法

// 组件引用=====开始
import menu_left from '@/components/layout/menu_left.vue'
import menu_head from "@/components/layout/menu_head.vue";
import nav_pagination from "@/components/nav_pagination.vue";

export default {
    name:'materiallist',
    components:{
        menu_left,
        menu_head,
        nav_pagination,
        FolderOutlined,
        EyeOutlined,
        ClearOutlined,
        CloseCircleOutlined,
        DownOutlined,
        FolderOpenOutlined,
        DeleteOutlined,
        PictureOutlined,
        PlaySquareOutlined,
        PlusOutlined,
        InboxOutlined
   },
props: {
   data:{typr:Object}
},
setup(props,ctx) {

    const store = useStore();           // 共享数据
    const tool = new TOOL.TOOL()        // 工具方法
    const API = new utils.A_Patch()     // 请求接口地址合集
    const MaterialListMethod = new MaterialList.MaterialListMethod() // 加载数据方法

    // 组件挂之后---请求数据===============================开始
    const PAGEDATA = reactive({
        title:'素材列表',
        menudata:{      // 菜单选中配置
            'key':'115',
            'openKeys':'cloudstorage',
            },
        loading:true,         // 列表load状态
        justify:'center',     // 列表内容对齐：loading加载居中设定
        align:'center',       // 列表内容对齐：loading加载居中设定
        innerHeight: ref(window.innerHeight - 180), // 初始化列表高度
        innerWidth: ref(window.innerWidth - 230), // 初始化列表高度
        
        datalist:[],// 列表信息
        total_number:0,     // 内容总数
        List_conditions:ref({page:1}),// 翻页-当前页数
        childrenDrawer:ref(false),// 本地上传图片-抽屉状态
        childnetDrawer:ref(false),// 网络上传图片-抽屉状态
        BreadCrumb:ref([// 面包屑导航
            {
                "folder_name":"素材库",
                "folder_id":0
            }
        ]),
        check_value:ref([]),

        // 配置网络图片地址上传组件状态
        // 配置本地文件上传组件状态

    })

    MaterialListMethod.PAGEDATA = PAGEDATA; // 页面数据加载到脚本文件


    const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;   // 默认为空的图标


    const childimgDrawer = ref(false);                  // 图片详情状态
    const childvideoDrawer = ref(false);                // 视频详情状态
    const queryDrawer = ref(false);                     // 查询详情抽屉状态
    const netImageModalVisible = ref(false);            // 上传网络图片弹出层状态
    const netImageFormRef = ref(null);                  // 网络图片表单 ref
    const expandedKeys = ref([]);                       // 展开指定的树节点
    const selectedKeys = ref([]);                       // 选中的节点树
    const treeData = ref([]);

    // 在组件挂载时添加事件监听器
    onMounted(() => {
        window.addEventListener('resize', handleResize);// 窗口变换时候
    });

    // 定义一个函数来处理窗口大小变化 ==
    const handleResize = () => {
      PAGEDATA.innerHeight = window.innerHeight - 180; // 作为表格自适应高度
      PAGEDATA.innerWidth = window.innerWidth - 230; // 作为表格自适应高度

    };

    // 显示图片详情--按钮
    const showChildimgDrawer = (item) => {
        childimgDrawer.value = !childimgDrawer.value;
        // Material_Images.image_detaile.value = undefined;
        if(childimgDrawer.value){// 添加详情信息
            Material_Images.image_detaile.value = item;
        }else{ // 清空详情内容
            // Material_Images.image_detaile.value = undefined;
        }
    };
        
    // 显示视频详情--按钮
    const showChildvideoDrawer = (item) => {
        childvideoDrawer.value = !childvideoDrawer.value;
        if(childvideoDrawer.value){// 添加详情信息
            Material_Images.video_detaile.value = undefined;
            Material_Images.video_detaile.value = item;
            console.log(Material_Images.video_detaile.value)
        }else{ // 清空详情内容
            // Material_Images.video_detaile.value = undefined;
        }
    };

    // 显示查询详情抽屉
    const showQueryDrawer = () => {
        queryDrawer.value = true;
    };

    // 执行查询并关闭抽屉
    const handleQuery = () => {
        MaterialListMethod.SelectMaterial.select();
        queryDrawer.value = false;
    };

    // 联级选择器文件夹选项
    const netImageFolderOptions = ref([]);

    // 将 treeData 转换为 Cascader 选项
    const convertTreeToCascader = (nodes) => {
        if (!nodes || nodes.length === 0) return [];
        return nodes.map(node => ({
            value: String(node.key),
            label: node.title,
            isLeaf: node.isLeaf,
            children: node.children ? convertTreeToCascader(node.children) : undefined
        }));
    };

    // 异步加载联级选择器子文件夹
    const loadNetImageFolder = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        
        const folderId = targetOption.value;
        
        tool.Http_.post(API.AppSrtoreAPI.material.getfolder, {
            "folder_id": folderId,
            "page_num": 1,
            "page_size": 10
        }).then((res) => {
            const child_folder_list = res.data.data.folder_info.child_folder;
            
            if (child_folder_list.length > 0) {
                targetOption.children = child_folder_list.map(obj => ({
                    value: String(obj.folder_id),
                    label: obj.folder_name,
                    isLeaf: true
                }));
                
                // 检查子文件夹是否还有子文件夹
                const checks = targetOption.children.map(child => {
                    return tool.Http_.post(API.AppSrtoreAPI.material.getfolder, {
                        "folder_id": child.value,
                        "page_num": 1,
                        "page_size": 10
                    }).then((childRes) => {
                        const grandChildren = childRes.data.data.folder_info.child_folder;
                        child.isLeaf = grandChildren.length === 0;
                    });
                });
                
                Promise.all(checks).then(() => {
                    targetOption.loading = false;
                    netImageFolderOptions.value = [...netImageFolderOptions.value];
                });
            } else {
                targetOption.isLeaf = true;
                targetOption.loading = false;
                netImageFolderOptions.value = [...netImageFolderOptions.value];
            }
        });
    };

    // 网络图片表单数据
    const netImageForm = reactive({
        folderId: [],
        imageUrls: ['']
    });

    // 网络图片表单验证规则
    const netImageRules = {
        folderId: [
            { required: true, message: '请选择素材文件夹', trigger: 'change', type: 'array' }
        ]
    };

    // 显示上传网络图片弹出层
    const showNetImageModal = () => {
        netImageModalVisible.value = true;
        // 初始化文件夹选项（添加根节点素材库）
        if (treeData.value.length > 0) {
            netImageFolderOptions.value = [{
                value: '0',
                label: '素材库',
                isLeaf: false,
                children: convertTreeToCascader(treeData.value)
            }];
        }
    };

    // 添加图片地址输入框
    const addImageUrl = () => {
        if (netImageForm.imageUrls.length < 10) {
            netImageForm.imageUrls.push('');
        }
    };

    // 删除图片地址输入框
    const removeImageUrl = (index) => {
        if (netImageForm.imageUrls.length > 1) {
            netImageForm.imageUrls.splice(index, 1);
        }
    };

    // 确认上传网络图片
    const handleNetImageOk = () => {
        netImageFormRef.value.validate().then(() => {
            const folderId = netImageForm.folderId[netImageForm.folderId.length - 1];
            const urls = netImageForm.imageUrls.filter(url => url.trim() !== '');
            console.log('选择的文件夹ID：', folderId);
            console.log('网络图片地址列表：', urls);
            netImageModalVisible.value = false;
            // 重置表单
            netImageForm.folderId = [];
            netImageForm.imageUrls = [''];
        }).catch((error) => {
            console.log('表单验证失败', error);
        });
    };

    // 取消上传网络图片
    const handleNetImageCancel = () => {
        netImageModalVisible.value = false;
        netImageForm.folderId = [];
        netImageForm.imageUrls = [''];
    };

    // 上传本地文件弹出层状态
    const localUploadModalVisible = ref(false);
    const localFileList = ref([]);

    // 显示上传本地文件弹出层
    const showLocalUploadModal = () => {
        localUploadModalVisible.value = true;
    };

    // 本地文件上传前验证
    const beforeLocalUpload = (file, fileList) => {
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        const MAX_COUNT = 20;

        // 文件大小验证
        if (file.size > MAX_SIZE) {
            message.error(`文件 ${file.name} 超过5MB限制`);
            return false;
        }

        // 单次上传数量验证
        if (file === fileList[0] && fileList.length > MAX_COUNT) {
            message.error(`一次最多上传${MAX_COUNT}个文件`);
            return false;
        }

        return true;
    };

    // 自定义上传请求
    const handleLocalUpload = ({ file, onSuccess, onError }) => {
        console.log('上传触发，文件信息：', {
            name: file.name,
            size: file.size,
            type: file.type
        });
        
        // 模拟上传过程（实际项目中应替换为真实上传接口）
        setTimeout(() => {
            onSuccess('ok');
        }, 500);
    };

    // 上传状态变化处理
    const handleLocalUploadChange = (info) => {
        const status = info.file.status;
        if (status === 'done') {
            message.success(`${info.file.name} 上传成功`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    };

    // 确认关闭上传弹窗
    const handleLocalUploadOk = () => {
        localUploadModalVisible.value = false;
        localFileList.value = [];
    };

    // 取消关闭上传弹窗
    const handleLocalUploadCancel = () => {
        localUploadModalVisible.value = false;
        localFileList.value = [];
    };

    // 图片素材管理
    const Material_Images = {
        
        // 初始化素材菜单
        Loadtree:()=>{

            tool.Http_.post(API.AppSrtoreAPI.material.getfolder,{

                "folder_id":"0",// 文件夹id
                "page_num":1,
                "page_size":10

            }).then((res)=>{

                // res不为空
                PAGEDATA.loading = false
                
                // 子文件夹列表
                var folder_info_list = res.data.data.folder_info.child_folder;

                // 子素材列表
                var child_material = res.data.data.folder_info.child_material;

                // 符合条件文件夹数量
                var total_child_material_num = res.data.data.folder_info.total_child_material_num;

                // console.log(total_child_material_num)
                PAGEDATA.total_number = total_child_material_num

                // 添加菜单名称和id
                folder_info_list.forEach((obj, idx)=>{
                    
                    // console.log(obj.operate_status)

                    // parent_folder_id 父文件夹id
                    obj.title = obj.folder_name;
                    obj.key = obj.folder_id;                      
                    obj.isLeaf = true; 

                    // 面包屑
                    obj.breadcrumb = [
                        {
                        "folder_name":"素材库",
                        "folder_id":0
                        },{
                        "folder_name":obj.folder_name,
                        "folder_id":obj.folder_id
                        }
                    ]

                    tool.Http_.post(API.AppSrtoreAPI.material.getfolder,{
                        "folder_id":obj.folder_id,// 文件夹id
                        "page_num":1,
                        "page_size":10
                    }).then((res)=>{
                        var obj_child_f_list = res.data.data.folder_info.child_folder;
                        if(obj_child_f_list.length !== 0){obj.isLeaf = false;}
                    }).then(()=>{
                        treeData.value=[...folder_info_list]
                    })

                })

                // 初始化图片列表
                PAGEDATA.datalist = [...child_material]

            })

        },

        // 图片尺寸验证
        material_width:(_info)=>{
            
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
        },
        // 图片详情
        image_detaile:ref(undefined),
        // 视频详情
        video_detaile:ref(undefined),

        // 素材图片列表
        data_img_list:ref([]),


        // 已选图片素材数据列表
        confirm_img_list:ref([]),
        

        // 已选图片素材--清空
        clear_confirm_img_list:()=>{
            Material_Images.confirm_img_list.value.length = 0;
            PAGEDATA.check_value.length = 0;
            MaterialListMethod.SelectMaterial.checked_status.value = false;
        },

        // 全选/取消全选
        onCheckAllChange:(e)=>{

            var checked = e.target.checked

            MaterialListMethod.SelectMaterial.checked_status.value = checked;

            if (checked) {
                // 全选素材list
                PAGEDATA.datalist.forEach(item => {
                    var material_id = item.material_id;
                    PAGEDATA.check_value.push(material_id)
                    Material_Images.confirm_img_list.value.push(material_id)
                });

            } else {
                PAGEDATA.check_value.length = 0;
                Material_Images.confirm_img_list.value.length = 0;
            }
        },

        // 素材抽屉--取消按钮
        click_cancel:()=>{
            // console.log('取消按钮')
            props.data.selectimg_open = false;
        },

        // 选择素材图片方法
        select_img_fun:(item)=>{
            // 判断添加的图片是否重复
            if (Material_Images.confirm_img_list.value.includes(item.material_id)) {
                Material_Images.clear_img_fun(item.material_id)
            }else{
                Material_Images.confirm_img_list.value.push(item.material_id)
            }
        },
        // 获取checked状态
        get_checked_status:(event)=>{
            var m_checked = event.target.checked; // 选择状态
            var m_id = event.target.value;
            if(!m_checked){
                Material_Images.confirm_img_list.value.forEach((obj, idx)=>{
                    var s_id = obj.material_id;// 列表中素材id
                    console.log(s_id)
                    console.log(m_id)
                    if(m_id === s_id){
                        Material_Images.confirm_img_list.value.splice(idx, 1);
                    }
                })
            }

        },
        // 去除选中得素材图片方法
        clear_img_fun:(item)=>{
            const idx = Material_Images.confirm_img_list.value.indexOf(item);
            if (idx > -1) Material_Images.confirm_img_list.value.splice(idx, 1);
        },

    }

    // 初始化素材菜单
    Material_Images.Loadtree()

    // 点击菜单===》异步加载菜单
    const onLoadData = treeNode => {

        return new Promise(resolve => {

            // 如果存在子菜单 跳过
            if (treeNode.dataRef.children) {
                resolve();
                return;
            }

            var F_if = treeNode.key

            // console.log('加载树', F_if)

            // 请求文件夹信息
            tool.Http_.post(API.AppSrtoreAPI.material.getfolder,{

                "folder_id":F_if,// 文件夹id
                "page_num":1,
                "page_size":10

            }).then((res)=>{

                // 当前文件夹id
                var folder_id = res.data.data.folder_info.folder_id;

                // 当前文件夹类型
                var folder_type = res.data.data.folder_info.folder_type;

                // 当前文件夹名称
                var folder_name = res.data.data.folder_info.folder_name;

                // 文件夹状态：：1-有效 4-在回收站中
                var operate_status = res.data.data.folder_info.operate_status;

                // 子文件夹列表
                var child_folder_list = res.data.data.folder_info.child_folder

                var chile_folder_number = child_folder_list.length;

                // 子文件夹数量=0:禁用子菜单
                if(chile_folder_number == 0){
                    
                    // console.log('子文件夹为空', child_folder_list)
                    treeNode.isLeaf = true;
                    treeData.value = [...treeData.value];
                    resolve();

                }else {     // 数量!=0：加载子菜单

                    // console.log('子文件夹',child_folder_list)

                    // 添加菜单名称和id
                    child_folder_list.forEach((obj, idx)=>{
                        
                        // 面包屑
                        var breadcrumb = treeNode.dataRef.breadcrumb;

                        obj.title = obj.folder_name;
                        obj.key = obj.folder_id;
                        obj.isLeaf = true;
                        obj.breadcrumb = [...breadcrumb]
                        obj.breadcrumb.push({
                            "folder_id":obj.folder_id,
                            "folder_name":obj.folder_name
                        })

                        tool.Http_.post(API.AppSrtoreAPI.material.getfolder,{
                            "folder_id":obj.folder_id,// 文件夹id
                            "page_num":1,
                            "page_size":10
                        }).then((res)=>{
                            var obj_child_f_list = res.data.data.folder_info.child_folder;
                            if(obj_child_f_list.length !== 0){obj.isLeaf = false;}
                        })



                    })
                    treeNode.dataRef.children = child_folder_list;
                    treeData.value = [...treeData.value];
                    resolve();
                }

                // 子素材列表
                var child_material_list = res.data.data.folder_info.child_material
                console.log('子素材',child_material_list)

                // 文件夹下素材总数目
                var total_child_material_num = res.data.data.folder_info.total_child_material_num;
                console.log('子素材总数目',total_child_material_num)

            })
        });
    };
    

    // 【查询组件 回调方法】========================================结束

       return{
        PAGEDATA,
        store,
        MaterialListMethod, // 外部js方法
        childimgDrawer,
        childvideoDrawer,
        queryDrawer,
        showChildimgDrawer,
        showChildvideoDrawer,
        showQueryDrawer,
        handleQuery,
        Material_Images,
        expandedKeys,
        selectedKeys,
        treeData,
        onLoadData,
        simpleImage,
        handleResize,
        netImageModalVisible,
        netImageFormRef,
        netImageForm,
        netImageRules,
        netImageFolderOptions,
        showNetImageModal,
        handleNetImageOk,
        handleNetImageCancel,
        addImageUrl,
        removeImageUrl,
        loadNetImageFolder,
        localUploadModalVisible,
        localFileList,
        showLocalUploadModal,
        beforeLocalUpload,
        handleLocalUpload,
        handleLocalUploadChange,
        handleLocalUploadOk,
        handleLocalUploadCancel

       }
   }
}
</script>
<style scoped>
.box-left{background-color: white;height: 100%;overflow-y:auto;width: 100%;white-space:nowrap;padding: 0 6px;}
.headerStyle{text-align: left;background-color: #fff;height: 64px;line-height: 64px;}
.contentStyle{text-align: center;background-color: #fff;height: 100%;}
.footerStyle{text-align: center;background-color: #fff;padding: 0;}
.confimImg{text-align: left;padding: 10px 0 10px 0;margin: 0 0 10px 0;height:300px;width: 100%;overflow-x: auto;overflow-y: auto;border-bottom: 1px #f2f2f2 solid;}
.confimbox{width: 60px;height: 60px;margin: 10px 20px 30px 20px;padding: 4px; float: left;border: 1px #f2f2f2 solid;border-radius: 4px;text-align: center;}
.Listimgbox{border: 1px solid #f2f2f2; border-radius: 6px;padding: 10px 4px 4px 4px;text-align: center;}
.video_list_box{padding: 6px 0 0 0;margin: 4px 0 0 0;width: 100%;height: 28px;overflow: hidden;text-align: left;text-align: center;}
.img_list_box{padding: 2px;margin: 4px 0 0 0;width: 100%;height: 28px;overflow: hidden;text-align: left;}
.sucai_url{width: 90%;font-size:12px;background-color: #f2f2f2;padding: 6px;border-radius: 4px;margin: 0 0 20px 0;}
.ant-list{height: 100%  !important;width: 100% !important;}/**暂无数据垂直居中**/
.card_style{margin:0px 10px 10px 0;font-size: 12px;text-align: center;}
.image_content_{height: 100px;width: 100px;margin: 0 auto;display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中 */}
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
</style>