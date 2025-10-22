<!--抖音-选择图片、上传图片、本地上传图片 组件-->
<template>

    <a-drawer
        v-model:open="props.data.selectimg_open"
        width="80%"
        :closable="false"
        :footer-style="{ textAlign: 'left' }"
        @close="onClose"
    >

        <!-- 素材列表 抽屉内容区域 -->
        <div style="height: 100%;">

            <a-row>

                <a-col :span="6">
                    <!--图片上传按钮-->
                    <a-space>
                        <h3 style="margin: 4px 0 0 0;">选择素材</h3>
                        <!--本地上传图片 按钮-->
                        <a-button type="primary" @click="showChildrenDrawer">本地上传图片</a-button>
                        <!--网络地址上传图片 按钮-->
                        <a-button @click="showChildnetDrawer">网络地址上传图片</a-button>
                    </a-space>
                </a-col>

                <a-col :span="18">
                    <!--面包屑导航-->
                    <!-- <div style="margin: 6px 0 0 0;"> 
                        <a-breadcrumb>
                            <a-breadcrumb-item href="">
                                <FolderOutlined />
                                <span>主目录</span>
                            </a-breadcrumb-item>

                            <a-breadcrumb-item href="">
                                <UserOutlined />
                                <span>Application List</span>
                            </a-breadcrumb-item>

                            <a-breadcrumb-item>
                                Application
                            </a-breadcrumb-item>
                        </a-breadcrumb>
                    </div> -->
                </a-col>
            </a-row>


            <a-layout style="height: 96%; margin-top: 16px;">
                
                <!-- 左侧素材选择树 菜单 -->
                <a-layout-sider class="siderStyle" width="300">

                    <!-- 加载状态 -->
                    <div v-if="treeData.length == 0" style="text-align: center;margin-top: 65%;"><a-spin /></div>

                    <!-- 为空状态 -->
                    <div v-if="treeData.value === 'undefined'" style="text-align: center;margin-top: 65%;"><a-empty /></div>

                    <!-- 不为空状态 -->
                    <a-tree
                        v-model:expandedKeys="expandedKeys"
                        v-model:selectedKeys="selectedKeys"
                        :load-data="onLoadData"
                        :tree-data="treeData"
                        show-icon
                    >
                    <template #icon="{ key, selected }">
                        <FolderOutlined />
                    </template>
                    </a-tree>

                </a-layout-sider>

                <a-layout>

                    <a-layout-content class="contentStyle">

                        <div style="text-align: left;padding: 10px;height: 100px;">
                            已选择图片：
                        </div>

                        <a-list :grid="{ gutter: 6, column: 5 }" :data-source="Material_Images.data_img_list.value">
                                <template #renderItem="{ item }">
                                                                            <a-checkbox-group v-model:value="Material_Images.check_value.value" style="width: 100%;height: 100%;">

                                    <a-list-item>

                                            <!--图片文件 显示方式-->
                                            <div v-if="item.material_type == 'photo'" style="border: 1px solid silver; border-radius: 6px;padding: 4px;">
                                                
                                                <a-image
                                                    width="200"
                                                    :src="item.byte_url"
                                                />
                                                <p style="padding: 2px;margin: 4px 0 0 0;width: 140px;height: 28px;overflow: hidden;">
                                                    <a-checkbox v-model:value="item.byte_url">{{ item.materil_id }}</a-checkbox>
                                                </p>

                                            </div>

                                            <!--视频 显示方式-->
                                            <div v-if="item.material_type == 'video'" style="border: 1px solid silver; border-radius: 6px;padding: 4px;">
                                                <a-image
                                                    width="200"
                                                    :src="item.video_info.video_cover_url"
                                                />
                                                <p style="padding: 2px;margin: 4px 0 0 0;width: 140px;height: 28px;overflow: hidden;">
                                                    <a-checkbox v-model:value="item.byte_url">{{item.materil_id}}</a-checkbox>
                                                </p>
                                            </div>



                                    </a-list-item>
                                    </a-checkbox-group>

                                </template>
                        </a-list>

                    </a-layout-content>
                    <a-layout-footer class="footerStyle">          
                        <nav_pagination :fandata="PAGEDATA" v-on:complete="console.log('hehe')"/>
                    </a-layout-footer>
                </a-layout>
            </a-layout>


        </div>

        <!--本地上传 抽屉 -->
        <a-drawer v-model:open="childrenDrawer" title="本地上传" width="320" :closable="false">

            <a-button type="primary" @click="showChildrenDrawer">This is two-level drawer</a-button>

        </a-drawer>


        <!--网络上传 抽屉 -->
        <a-drawer v-model:open="childnetDrawer" title="网络地址上传" width="320" :closable="false">

            <a-button type="primary" @click="showChildnetDrawer">This is two-level drawer</a-button>

        </a-drawer>


        <!--底部按钮-->
        <template #footer>

            <a-button style="margin-right: 8px" type="primary" @click="onClose">确认</a-button>

            <a-button  @click="onClose">取消</a-button>
            
        </template>

    </a-drawer>

</template>

<script>
import { defineComponent,ref,reactive,onMounted,h,watch } from 'vue';
import { FolderOutlined,HomeOutlined,UserOutlined} from '@ant-design/icons-vue';
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

// 组件引用=====开始
import nav_pagination from "@/components/nav_pagination.vue";

export default defineComponent({
   name:'Materialplus',
   components:{
    FolderOutlined,
    UserOutlined,
    HomeOutlined,
    nav_pagination, //翻页组件
   },
    props: {
        data:{typr:Object}
    },
    setup(props,ctx) {


        console.log(props)
        console.log(props.data.setimg_name)
        const PAGEDATA = reactive({
            total_number:ref(0),         // 图片列表内容总数
            f_id:0,          // 根目录id
            List_conditions:reactive({   // 默认查询配置
                "page":1,            // 当前页面
                "size":10,           // 显示数量
                "total":0           // 总页数
            })
        })
              

        const tool = new TOOL.TOOL()            // 工具方法
        const API = new utils.A_Patch()         // 请求接口地址合集

        const childrenDrawer = ref(false); // 本地上传抽屉状态
        const childnetDrawer = ref(false);// 网络上传抽屉状态

        // 关闭选择素材抽屉
        const onClose = () => {
            props.data.selectimg_open = false;
        };

        // 显示本地上传--按钮
        const showChildrenDrawer = () => {
            childrenDrawer.value = !childrenDrawer.value;
        };

        // 显示网络上传--按钮
        const showChildnetDrawer = () => {
            childnetDrawer.value = !childnetDrawer.value;
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

                    // res为空

                    // res不为空

                    // 子文件夹列表
                    var folder_info_list = res.data.data.folder_info.child_folder

                    // 子素材列表
                    var child_material = res.data.data.folder_info.child_material

                    // 符合条件文件夹数量
                    var total_child_material_num = res.data.data.folder_info.total_child_material_num;
                    console.log(total_child_material_num)
                    PAGEDATA.total_number = total_child_material_num

                    // 添加菜单名称和id
                    folder_info_list.forEach((obj, idx)=>{

                        obj.title = obj.folder_name;
                        obj.key = obj.folder_id;
                        obj.isLeaf = true;

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

                    // 添加图片列表
                    child_material.forEach((obj, idx)=>{
                        console.log(obj)
                        obj.title=obj.materil_name; // 图片名称
                        Material_Images.data_img_list.value.push(obj)
                    })
                })
            },


            // 根据id查询文件夹下 素材列表 翻页
            Get_material_list:(l_id, page, page_size)=>{
                
                tool.Http_.post(API.AppSrtoreAPI.material.getfolder,{
                    "folder_id":l_id,// 文件夹id
                    "page_num":1,
                    "page_size":100
                }).then((res)=>{

                    // 子文件夹
                    var child_folder = res.data.data.folder_info.child_folder
                    console.log('子文件夹',child_folder)

                    // 子素材
                    var child_material = res.data.data.folder_info.child_material
                    console.log('子素材',child_material)

                })

            },


            // 根据id_查询素材文件+素材图片


            // 素材图片列表
            data_img_list:ref([]),
            
            // 勾选素材对象
            check_value:ref([]),


            // 本地上传图片

            // 网络地址上传图片

            // 单张上传图片

            // 批量上传图片
            
            // 请求素材所以后文件夹
            // 列表默认打开文件
            // 素材列表
            // 点击文件夹

        }


        const expandedKeys = ref([]);
        const selectedKeys = ref([]);
        const treeData = ref([]);

        // 初始化素材菜单
        Material_Images.Loadtree()

        // 点击菜单===》异步加载菜单
        const onLoadData = treeNode => {
            return new Promise(resolve => {

                var F_if = treeNode.key

                console.log('加载树', F_if)

                // 请求文件夹信息
                tool.Http_.post(API.AppSrtoreAPI.material.getfolder,{
                    "folder_id":F_if,// 文件夹id
                    "page_num":1,
                    "page_size":100
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

                    // 数量=0:禁用子菜单
                    if(chile_folder_number == 0){
                        console.log('子文件夹为空', child_folder_list)
                        treeNode.isLeaf = true;
                        treeData.value = [...treeData.value];
                        resolve();
                    }else {// 数量!=0：加载子菜单
                        console.log('子文件夹',child_folder_list)
                        // 添加菜单名称和id
                        child_folder_list.forEach((obj, idx)=>{
                            obj.title = obj.folder_name;
                            obj.key = obj.folder_id;
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

                // 如果存在子菜单 跳过
                if (treeNode.dataRef.children) {
                    resolve();
                    return;
                }


                // 如果没有子菜单 则添加子菜单
                // setTimeout(() => {

                //     treeNode.dataRef.children = [
                //         // {
                //         //     title: 'Child Node',
                //         //     key: `${treeNode.eventKey}-0`,
                //         // },
                //         // {
                //         //     title: 'Child Node',
                //         //     key: `${treeNode.eventKey}-1`,
                //         // },
                //     ];

                //     treeData.value = [...treeData.value];

                //     resolve();

                // }, 1000);
            });
        };
        // 点击菜单===》 加载图片列表
        watch(selectedKeys, () => {
            console.log('selectedKeys', selectedKeys);
        });

        // 点击菜单--加载素材列表
        const click_loadimglist = (e)=>{
            console.log(e)
            var api_url = ''
        }


        return{
            props,
            PAGEDATA,
            childrenDrawer,
            childnetDrawer,
            onClose,
            showChildrenDrawer,
            showChildnetDrawer,
            Material_Images,
            expandedKeys,
            selectedKeys,
            treeData,
            onLoadData,
            click_loadimglist
        }
    }
})
</script>
<style scoped>
.headerStyle{text-align: left;background-color: #fff;height: 64px;line-height: 64px;}
.contentStyle{text-align: center;background-color: #fff;}
.siderStyle{background-color: #fff;overflow: auto;padding: 10px 10px 10px 0;width: 400px;}
.footerStyle{text-align: center;background-color: #fff;}
</style>