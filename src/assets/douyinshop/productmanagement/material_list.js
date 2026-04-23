// 素材列表
// 素材列表各种方法：加载、查看、翻页、删除....
import { defineComponent,reactive,ref,shallowRef,onMounted,defineAsyncComponent,toRaw } from 'vue';
import axios from "axios";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
import { BatchEdit_fun } from '../ProductList';
const tool = new TOOL.TOOL()        // 工具方法
const API = new utils.A_Patch()     // 请求接口地址合集

// 素材列表管理方法
export class MaterialListMethod {

    PAGEDATA = undefined; // 页面配置参数
    
    // 页面加载
    load={

        // 请求素材列表列表接口数据
        loadproductData:async(data) => {

            console.log(data)

            this.PAGEDATA.loading = true;

            // 请求素材接口
            const res = await axios.post(API.AppSrtoreAPI.material.getfolder, data)

            var res_data = res.data.data;

            var folder_info = res_data.folder_info;
            var child_material = folder_info.child_material;// 素材列表
            var total = folder_info.total_child_material_num;// 素材总数 total_child_material_num

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
                    this.PAGEDATA.justify = 'center';
                    this.PAGEDATA.align = 'center';
                    // 请求数据不为空
                    this.PAGEDATA.datalist = [...child_material];
                    this.PAGEDATA.total_number = total;

                }, 1000);
            
            }
        },

        // 点击菜单===》异步加载菜单
        onLoadData: treeNode => {

            return new Promise(resolve => {

                // 如果存在子菜单 跳过
                if (treeNode.dataRef.children) {
                    resolve();
                    return;
                }

                var F_if = treeNode.key

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

                    // 子文件夹数量=0:禁用子菜单
                    if(chile_folder_number == 0){
                        
                        // console.log('子文件夹为空', child_folder_list)
                        treeNode.isLeaf = true;
                        this.PAGEDATA.treeData.value = [...this.PAGEDATA.treeData.value];
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
                        this.PAGEDATA.treeData.value = [...this.PAGEDATA.treeData.value];
                        resolve();
                    }

                    // 子素材列表
                    var child_material_list = res.data.data.folder_info.child_material

                    // 文件夹下素材总数目
                    var total_child_material_num = res.data.data.folder_info.total_child_material_num;

                })
            });

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

        // 视频封面尺寸验证
        video_cover_width:(_info)=>{
            console.log(_info)
        },

        // 初始化素材菜单
        Loadtree:()=>{

            tool.Http_.post(API.AppSrtoreAPI.material.getfolder,{
                "folder_id":"0",// 文件夹id
                "page_num":1,
                "page_size":10

            }).then((res)=>{

                // res不为空
                this.PAGEDATA.loading = false
                
                // 子文件夹列表
                var folder_info_list = res.data.data.folder_info.child_folder;

                // 子素材列表
                var child_material = res.data.data.folder_info.child_material;

                // 符合条件文件夹数量
                var total_child_material_num = res.data.data.folder_info.total_child_material_num;

                // console.log(total_child_material_num)
                this.PAGEDATA.total_number = total_child_material_num

                // 添加菜单名称和id
                folder_info_list.forEach((obj, idx)=>{
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
                        this.PAGEDATA.treeData.value=[...folder_info_list]
                    })
                })

                // 初始化图片列表
                this.PAGEDATA.datalist = [...child_material]

            })

        },

        // 已选图片素材--清空
        clear_confirm_img_list:()=>{
            this.PAGEDATA.confirm_img_list.length = 0;
            this.PAGEDATA.check_value.length = 0;
            this.SelectMaterial.checked_status.value = false;
        },

        // 选择素材图片方法
        select_img_fun:(item)=>{
            // 判断添加的图片是否重复
            if (this.PAGEDATA.confirm_img_list.includes(item.material_id)) {
                this.PAGEDATA.confirm_img_list.splice(this.PAGEDATA.confirm_img_list.indexOf(item.material_id), 1);
            }else{
                this.PAGEDATA.confirm_img_list.push(item.material_id)
            }
        },

        // 全选/取消全选
        onCheckAllChange:(e)=>{
            
            var checked = e.target.checked

            this.SelectMaterial.checked_status.value = checked;

            if (checked) {
                // 全选素材list
                this.PAGEDATA.datalist.forEach(item => {
                    var material_id = item.material_id;
                    // 判断是否在数组中
                    if(!this.PAGEDATA.check_value.includes(material_id)){
                        this.PAGEDATA.check_value.push(material_id)
                    }
                    if(!this.PAGEDATA.confirm_img_list.includes(material_id)){ 
                        this.PAGEDATA.confirm_img_list.push(material_id)
                    }
                });
            } else {
                this.PAGEDATA.check_value.length = 0;
                this.PAGEDATA.confirm_img_list.length = 0;
            }
        },

        // 去除选中得素材图片方法
        clear_img_fun:(item)=>{
            const idx = PAGEDATA.confirm_img_list.value.indexOf(item);
            if (idx > -1) PAGEDATA.confirm_img_list.value.splice(idx, 1);
        },

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
                this.PAGEDATA.List_conditions.page = 1// 重置当前页数
                this.load.loadproductData(this.navData.value)
            }
        }
    }

    // 翻页查询条件
    navData = ref({
        "folder_id":0,//默认文件夹id
        "page_num":1,
        "page_size":10,
    })

    // 翻页方法--文件夹下素材翻页-搜索查询结果翻页；
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

        RecycleBinOpenStatus:ref(false),// 回收弹出层状态

        RecycleBinbuttonload:ref(false),// 回收确认按钮状态

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
        // 显示 回收对话
        RecycleBin_open:(item)=>{
            this.del.RecycleBinOpenStatus.value = true;
            let material_id = item.material_id;// id
            let material_type = item.material_type; // type
            this.del.material_ids.value.length = 0
            this.del.material_ids.value.push(material_id)
        },
        // 关闭 回收对话
        RecycleBin_closed:()=>{
            this.del.RecycleBinOpenStatus.value = false;
        },

        // 彻底删除素材方法
        del_material_ids:()=>{

            this.del.buttonload.value = true; // 按钮状态-加载
            let f_id = this.PAGEDATA.BreadCrumb.at(-1).folder_id; // 当前文件夹id
            let page = this.PAGEDATA.List_conditions.page;
            
            // 判断是否超过100个

            // 超过提示

            // 未超过执行

            // 接口彻底删除
            axios.post(API.AppSrtoreAPI.material.deletematerial,{
                "material_ids":this.del.material_ids.value
            }).then((res)=>{

                let code = res.data.code;
                let sub_msg = res.data.sub_msg;// 错误信息
                if(code == 10000){// 删除成功

                    this.del.buttonload.value = false; // 按钮状态-false
                    this.del.delOpenStatus.value = false; // 关闭删除对话框
                    tool.Fun_.message('success','删除操作成功！')// 提示-删除成功

                    // 重置当前页面
                    this.navData.value.folder_id = f_id + '' // 文件夹id
                    // 数据删除后,验证数量，矫正请求页数
                    this.navData.value.page_num = 1
                    this.PAGEDATA.List_conditions.page = 1// 重置当前页数

                    setTimeout(() => {
                        // 刷新删除后的页面
                        this.load.loadproductData(this.navData.value)

                    }, 1000);
                    

                }else{ // 删除失败
                
                    tool.Fun_.message('error', sub_msg)
                
                }
            })

            
        },

        // 素材移动至回收站
        MovetoRecycleBin_ids:()=>{
            
            this.del.RecycleBinbuttonload.value = true; // 按钮状态-加载

            let f_id = this.PAGEDATA.BreadCrumb.at(-1).folder_id; // 当前文件夹id
            
            // 判断是否超过100个

            // 超过提示

            // 未超过执行

            // 接口彻底删除
            axios.post(API.AppSrtoreAPI.material.movematerialrecyclebin,{
                "material_ids":this.del.material_ids.value
            }).then((res)=>{

                let code = res.data.code;
                let sub_msg = res.data.sub_msg;// 错误信息
                if(code == 10000){// 操作成功

                    this.del.RecycleBinbuttonload.value = false; // 按钮状态-false
                    this.del.RecycleBinOpenStatus.value = false; // 关闭回收对话框
                    tool.Fun_.message('success','成功放入回收站！')// 提示-删除成功

                    // 重置当前页面
                    this.navData.value.folder_id = f_id + '' // 文件夹id
                    // 数据删除后,验证数量，矫正请求页数
                    this.navData.value.page_num = 1
                    this.PAGEDATA.List_conditions.page = 1// 重置当前页数

                    setTimeout(() => {
                        // 刷新回收后的页面
                        this.load.loadproductData(this.navData.value)

                    }, 1000);
                    

                }else{ // 删除失败
                
                    tool.Fun_.message('error', sub_msg)
                
                }
            })

        },
        // 批量删除素材
        BatchEdl:()=>{
            console.log('批量删除素材数量', this.PAGEDATA.confirm_img_list.length)
            var v_number = this.PAGEDATA.confirm_img_list.length;
            if(v_number == 0){
                tool.Fun_.message('warning','请至少选择一条素材进行删除！')// 提示-请选择素材
            }else if(v_number > 100){
                tool.Fun_.message('warning','批量删除素材数量不能超过100条！')// 提示-超过数量限制
            }else{
                this.del.material_ids.value = [...this.PAGEDATA.confirm_img_list]
                // this.del.del_material_ids()
            }
        },

        // 批量移入回收站
        BatchMovetoRecycleBin:()=>{
            console.log('批量移入回收站素材数量', this.PAGEDATA.confirm_img_list.length)
            var v_number = this.PAGEDATA.confirm_img_list.length;
            if(v_number == 0){
                tool.Fun_.message('warning','请至少选择一条素材进行回收！')// 提示-请选择素材
            }else if(v_number > 100){
                tool.Fun_.message('warning','批量回收素材数量不能超过100条！')// 提示-超过数量限制
            }else{
                this.del.material_ids.value = [...this.PAGEDATA.confirm_img_list]
                this.del.MovetoRecycleBin_ids()
            }

        }


    }


    // 查询方法
    SelectMaterial={
        
        checked_status:ref(false),// 内容权限状态
        serch_status:ref(false),    // 搜索结果抽屉状态
        m_id:ref(undefined),        // 搜索素材id
        m_type:ref('photo'),        // 搜索素材类型
        key_word:ref(undefined),    // 搜索关键词

        // 面包屑点击查询
        breadcrumb_click:(f_id)=>{
            console.log(f_id)
            this.navData.value.folder_id = f_id + ''// 文件夹id
            this.navData.value.page_num = 1 // 请求当前页数
            this.PAGEDATA.List_conditions.page = 1// 重置当前页数
            this.load.loadproductData(this.navData.value);
        },

        // id\关键词-查询
        select:()=>{

            console.log(this.SelectMaterial.m_id.value,this.SelectMaterial.key_word.value)

            // 获取关键词
            // 获取id
            // 获取类型
            // 接口查询

            // 重置接口
            // 重置内容

        }


        // 关键词查询
    }
}

// 回收站管理方法
export class RecycleBinMethod {

    PAGEDATA = undefined; // 页面配置参数

    checked_status=ref(false)// 全选状态

    check_value=ref([])// 内容权限状态

    confirm_img_list=ref([])// 已选素材列表

    DelMaterialId=ref([])// 单个删除素材id
    RecoverMaterialId=ref([])// 单个恢复素材id
    BatchDelMaterialIdList=ref([])// 批量删除素材id列表
    BatchRecoverMaterialIdList=ref([])// 批量恢复素材id列表

    // 默认查询状态
    navData=ref({
        "folder_id":"-1",      // 文件夹id，0-素材中心； -1-回收站；
        "operate_status":[4],               // 素材状态，0-待下载；1-有效；4-回收站中；
        "page_num": 1,
        "page_size": 10,
        "order_by":0 
    })

    // 翻页方法--文件夹下素材翻页-搜索查询结果翻页；
    page_turning = (data)=>{

        this.PAGEDATA.justify = 'flex-start';
        
        this.PAGEDATA.align = 'flex-start';

        this.navData.value.page_num = data.page;
        
        this.navData.value.page_size = data.page_size;

        this.load.getmaterialData(this.navData.value)

    }
    
    // 初始化方法
    load={

        // 请求回收站素材列表列表接口数据
        getmaterialData:async(data) => {

            this.PAGEDATA.loading = true;

            // 请求素材接口
            const res = await axios.post(API.AppSrtoreAPI.material.searchmaterial, data)

            var res_data = res.data.data;
            var material_list = res_data.material_info_list;// 素材列表
            var total = res_data.total_num;// 素材总数 total_num
            console.log(res)

            // var folder_info = res_data.folder_info;
            // var child_material = folder_info.child_material;// 素材列表
            // var total = folder_info.total_child_material_num;// 素材总数 total_child_material_num

            // 请求数据为空
            if(material_list.length == 0){
                this.PAGEDATA.justify = 'center';
                this.PAGEDATA.align = 'center';
                this.PAGEDATA.loading = false;
                this.PAGEDATA.datalist = [];
                this.PAGEDATA.total_number = 0
            
            }else{
            
                this.PAGEDATA.loading = false;
                this.PAGEDATA.justify = 'center';
                this.PAGEDATA.align = 'center';
                // 请求数据不为空
                this.PAGEDATA.datalist = [...material_list];
                this.PAGEDATA.total_number = total;

            
            }
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
        
    }
    
    // 列表方法
    list = {

        // 加载页面数据
        getlistDate:()=>{
        },

        // 全选/取消全选
        onCheckAllChange:(e)=>{
            
            var checked = e.target.checked

            this.checked_status.value = checked;

            if (checked) {
                // 全选素材list
                this.PAGEDATA.datalist.forEach(item => {
                    var material_id = item.material_id;
                    // 判断是否在数组中
                    if(!this.check_value.value.includes(material_id)){
                        this.check_value.value.push(material_id)
                    }
                    if(!this.confirm_img_list.value.includes(material_id)){ 
                        this.confirm_img_list.value.push(material_id)
                    }
                });
            } else {
                this.check_value.value.length = 0;
                this.confirm_img_list.value.length = 0;
            }
        },

        // 已选图片素材--清空
        clear_confirm_img_list:()=>{
            this.confirm_img_list.value.length = 0;
            this.check_value.value.length = 0;
            this.checked_status.value = false;
        },
        
        // 单选选择素材图片方法
        select_img_fun:(item)=>{
            // 判断添加的图片是否重复
            if (this.confirm_img_list.value.includes(item.material_id)) {
                this.confirm_img_list.value.splice(this.confirm_img_list.value.indexOf(item.material_id), 1);
            }else{
                this.confirm_img_list.value.push(item.material_id)
            }
        },
    }

    // 删除单个素材确认：
    ConfirmDleteMaterial=(item)=>{
        this.DelMaterialId.value = [item.material_id];
        this.PAGEDATA.DeleteModalVisible = true;
    }
    // 恢复单个素材确认；
    ConfirmRecoverMaterial=(item)=>{
        this.RecoverMaterialId.value = [item.material_id];
        this.PAGEDATA.RecoverModalVisible = true;
    }
    // 批量删除素材确认；
    ConfirmBatchDeleteMaterial=()=>{
        this.PAGEDATA.BatchDeleteModalVisible.value = true;
        console.log('批量删除素材ID列表：')
    }
    // 批量恢复素材确认；
    ConfirmBatchRecoverMaterial=()=>{
        this.PAGEDATA.BatchRecoverModalVisible.value = true;
        console.log('批量恢复素材ID列表：')
    }

    // 彻底删除素材方法
    DelMaterial=()=>{
        console.log('删除素材ID：', this.DelMaterialId.value);
    }

    // 恢复素材方法
    RecoverMaterial=()=>{
        console.log('恢复素材ID：', this.RecoverMaterialId.value);

        // axios.post(API.AppSrtoreAPI.material.recovermaterial,{

        //     "material_ids":this.del.material_ids.value

        // }).then((res)=>{

        //     let code = res.data.code;

        //     let sub_msg = res.data.sub_msg;// 错误信息

        //     if(code == 10000){// 恢复成功

        //         tool.Fun_.message('success','恢复操作成功！')// 提示-恢复成功

        //         // 重置当前页面
        //         this.navData.value.page_num = 1;
        //         this.PAGEDATA.List_conditions.page = 1// 重置当前页数

        //     }else{ // 恢复失败
                
        //         tool.Fun_.message('error', sub_msg) 

        //     }
        // })
    }

    // 批量删除
    BatchDelMaterial=()=>{

    }
    // 批量恢复
    BatchRecoverMaterial=()=>{

    }
}