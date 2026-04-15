// 素材列表
// 素材列表各种方法：加载、查看、翻页、删除....
import { defineComponent,reactive,ref,shallowRef,onMounted,defineAsyncComponent,toRaw } from 'vue';
import axios from "axios";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
const tool = new TOOL.TOOL()        // 工具方法
const API = new utils.A_Patch()     // 请求接口地址合集


export class MaterialListMethod {

    PAGEDATA = undefined; // 页面配置参数
    
    // 页面加载
    load={

        // 请求商品列表接口数据
        loadproductData:async(data) => {

            this.PAGEDATA.loading = true;

            // 请求素材接口
            const res = await axios.post(API.AppSrtoreAPI.material.getfolder, data)
            // console.log(res)

            var res_data = res.data.data;

            var folder_info = res_data.folder_info;

            // 素材列表
            var child_material = folder_info.child_material;

            // 素材总数 total_child_material_num
            var total = folder_info.total_child_material_num;

            // 请求数据为空
            if(child_material.length == 0){
                this.PAGEDATA.justify = 'center';
                this.PAGEDATA.align = 'center';
                this.PAGEDATA.loading = false;
                this.PAGEDATA.datalist = [];
                this.PAGEDATA.total_number = 0
            }else{
                setTimeout(() => {
                    this.PAGEDATA.loading = false;
                    this.PAGEDATA.justify = 'start';
                    this.PAGEDATA.align = 'start';
                    // 请求数据不为空
                    this.PAGEDATA.datalist = [...child_material];
                    this.PAGEDATA.total_number = total;
                }, 1000);
            }
        }

    }

    // 树形菜单
    Tree= {

        // 初始化菜单

        // 点击树型菜单方法
        handleSelect:(keys, event) =>{
            // console.log('文件夹id', keys) // 打印文件夹id
            // console.log('文件信息',event.node) // 打印节点信息
            this.PAGEDATA.BreadCrumb = [...event.node.breadcrumb] // 刷新面包屑
            // 判断是否刷新右侧素材列表
            if(keys.length > 0){
                this.navData.value.folder_id = keys[0]
                this.navData.value.page_num = 1;
                this.navData.value.page_size = 10;
                this.load.loadproductData(this.navData.value)
            }
        }
    }

    // 翻页查询条件
    navData=ref({
        "folder_id":0,//默认文件夹id
        "page_num":1,
        "page_size":10,
    })

    // 翻页方法
    page_turning = (data)=>{

        this.PAGEDATA.justify = 'flex-start';
        
        this.PAGEDATA.align = 'flex-start';

        this.navData.value.page_num = data.page;
        
        this.navData.value.page_size = data.page_size;

        this.load.loadproductData(this.navData.value)

    }

    // 查看详情
    detaile = {

    }

    // 素材删除
    del={

        delOpenStatus:ref(false), // 彻底删除弹出层状态

        material_ids:ref([]),// 删除素材列表

        buttonload:ref(false),// 删除按钮状态

        // 显示 删除对话框
        del_open:(item)=>{
            this.del.delOpenStatus.value = true;
            let material_id = item.material_id;// id
            let material_type = item.material_type; // type
            this.del.material_ids.value.length = 0
            this.del.material_ids.value.push(material_id)
        },
        // 隐藏 删除对话框
        del_closed:()=>{
            this.del.delOpenStatus.value = false;
        },
        // 彻底删除素材方法
        del_material_ids:()=>{

            this.del.buttonload.value = true; // 按钮状态-加载

            console.log(this.PAGEDATA.List_conditions.page,this.PAGEDATA.BreadCrumb)

            this.del.delOpenStatus.value = false;

            // 接口彻底删除
            // axios.post(API.AppSrtoreAPI.material.deletematerial,{
            //     "material_ids":this.del.material_ids.value
            // }).then((res)=>{
            //     console.log(res)
            //     let code = res.data.code;
            //     let sub_msg = res.data.sub_msg;// 错误信息
            //     if(code == 10000){// 删除成功

            //         this.del.buttonload.value = false; // 按钮状态-false
            //         this.del.delOpenStatus.value = false; // 关闭删除对话框
            //         tool.Fun_.message('success','删除操作成功！')// 提示-删除成功
            //         // 刷新当前页面page-
            //         // console.log(this.PAGEDATA)

            //     }else{ // 删除失败
                
            //         tool.Fun_.message('error', sub_msg)
                
            //     }
            // })

            
        },
        // 彻底删除方法
        deletematerial:()=>{

        }
        // 素材移动至回收站

        // 删除文件夹-彻底删除

        // 删除文件夹-移动至回收站
    }


    // 查询方法
    SelectMaterial={
        // id查询

        // 关键词查询
    }
}