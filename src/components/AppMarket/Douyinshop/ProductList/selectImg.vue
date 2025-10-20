<!--抖音-选择图片、上传图片、本地上传图片 组件-->
<template>

    <a-drawer
        v-model:open="props.data.selectimg_open"
        width="60%"
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
                <a-layout-sider class="siderStyle" width="300">
                    <a-directory-tree
                        v-model:expandedKeys="expandedKeys"
                        v-model:selectedKeys="selectedKeys"
                        :load-data="onLoadData"
                        :tree-data="treeData"
                        @select="click_loadimglist"
                        multiple
                    />
                </a-layout-sider>
                <a-layout>

                    <a-layout-content class="contentStyle">

                        <div style="text-align: left;padding: 10px;height: 100px;">
                            已选择图片：
                        </div>

                        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="Material_Images.data_img_list.value">
                                <template #renderItem="{ item }">
                                <a-list-item>
                                    <a-checkbox-group v-model:value="Material_Images.check_value.value" style="width: 100%;height: 100%;">
                                        <a-card>
                                            <a-image
                                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            />
                                            <p>
                                                <a-checkbox value="A">文件名称</a-checkbox>
                                            </p>
                                        </a-card>
                                    </a-checkbox-group>

                                </a-list-item>
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
import { defineComponent,ref,reactive,onMounted,h } from 'vue';
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
    nav_pagination //翻页组件
   },
    props: {
        data:{typr:Object}
    },
    setup(props,ctx) {


        console.log(props)
        console.log(props.data.setimg_name)
        const PAGEDATA = reactive({
            List_conditions:reactive({     // 默认查询配置

                    "page":1,            // 当前页面
                    "size":10,           // 显示数量
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

                tool.Http_.post(API.AppSrtoreAPI.material.searchfolder,{

                    "parent_folder_id":"0",// 父文件夹id
                    "order_by":"0",// [必填]排序方式 0-创建时间倒序 1-创建时间正序 2-修改时间倒序 3-修改时间正序 4-文件夹名倒序 5-文件夹名正序
                    "page_num":"1",// [必填]
                    "page_size":"100"//[必填]

                }).then((res)=>{

                    // 不为空

                    // 为空

                    // console.log(res)

                    var folder_info_list = res.data.data.folder_info_list
                    var total=res.data.data.total; // 符合条件文件夹数量

                    folder_info_list.forEach((obj,idx)=>{
                        console.log(obj)
                        var t_obj={};
                        t_obj.title=obj.name;// 标题
                        t_obj.key=obj.folder_id;// k
                        t_obj.folder_id=obj.folder_id; // id
                        t_obj.folder_type=''; // 类型
                        t_obj.name=''; // 名称
                        t_obj.operate_status=''; // 文件夹状态。1-有效 4-在回收站中
                        t_obj.parent_folder_id=''; // 父文件夹id
                        t_obj.create_time=''; // 创建时间
                        t_obj.update_time=''; // 更新时间
                        t_obj.delete_time=''; // 删除时间
                        t_obj.folder_attr=''; // 父文件夹属性（文件夹属性，0-文件夹（不限素材类型），1-图片文件夹（只能上传图片），2-视频文件夹（只能上传视频））
                        treeData.value.push(t_obj)
                    })




                })
            },

            // 根据id查询
            Loadf_id:(l_id)=>{

            },
            // 素材图片列表
            data_img_list:ref([
                {
                    title: 'Title 1',
                },
                {
                    title: 'Title 2',
                },
                {
                    title: 'Title 3',
                },
                {
                    title: 'Title 4',
                },
            ]),
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
        const treeData = ref([
            // {
            //     title: 'Expand to load',
            //     key: '0',
            // },
            // {
            //     title: 'Expand to load',
            //     key: '1',
            // },
            // {
            //     title: 'Tree Node',
            //     key: '2',
            //     isLeaf: true,
            // },
        ]);

        // 初始化素材菜单
        Material_Images.Loadtree()

        // 点击菜单===》异步加载菜单
        const onLoadData = treeNode => {
            return new Promise(resolve => {

                // console.log(treeNode.key)
                if (treeNode.dataRef.children) {
                    resolve();
                    return;
                }
                setTimeout(() => {

                    treeNode.dataRef.children = [
                        {
                            title: 'Child Node',
                            key: `${treeNode.eventKey}-0`,
                        },
                        {
                            title: 'Child Node',
                            key: `${treeNode.eventKey}-1`,
                        },
                    ];

                    treeData.value = [...treeData.value];
                    resolve();

                }, 1000);
            });
        };

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