// 素材列表
// 素材列表各种方法：加载、查看、翻页、删除....
import { defineComponent,reactive,ref,shallowRef,onMounted,defineAsyncComponent,toRaw } from 'vue';
import axios from "axios";
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
const tool = new TOOL.TOOL()        // 工具方法
const API = new utils.A_Patch()     // 请求接口地址合集


export class MaterialListMethod {
    
    // 树形菜单
    
    // 查看详情


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

            // 接口彻底删除
            axios.post(API.AppSrtoreAPI.material.deletematerial,{
                "material_ids":this.del.material_ids.value
            }).then((res)=>{
                console.log(res)
                let code = res.data.code;
                let sub_msg = res.data.sub_msg;// 错误信息
                if(code == 10000){// 删除成功
                    this.del.buttonload.value = false; // 按钮状态-false
                    this.del.delOpenStatus.value = false; // 关闭删除对话框
                    tool.Fun_.message('success','删除操作成功！')// 提示-删除成功
                    // 刷新当前页面page

                }else{ // 删除失败
                
                    tool.Fun_.message('error', sub_msg)
                
                }
            })

            
        },
        // 彻底删除方法
        deletematerial:()=>{

        }
        // 素材移动至回收站

        // 删除文件夹-彻底删除

        // 删除文件夹-移动至回收站
    }


    // 查询方法
    selectmaterial={
        // id查询

        // 关键词查询
    }
}