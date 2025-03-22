/** 复制商品方法 **/
import {ref, reactive, computed} from 'vue';
import * as utils from '@/assets/JS_Model/public_model';
const API = new utils.A_Patch()       // 请求接口地址合集

// 复制商品记录列表
export class CopyLog{

    
    // 列表字段转义方法
    List = {

        load:()=>{
            
        },
        
        // 获取平台
        get_platform:(text)=>{
            if(text === '1'){
                return 'taobao'
            }else if(text === '2'){
                return 'tmall'
            }else if(text === '3'){
                return '1688'
            }else if(text === '4'){
                return 'PDD'
            }
        },
        // 视频图片
        get_pic:(obj)=>{
            if(obj !== null){
                var v_obj= JSON.parse(obj)
                return v_obj
            }else{
                return 0
            }
        },
        // 减库存方式
        get_reduce_type:(text)=>{
            if(text === '1'){
                return '拍下减库存'
            }else if(text === '2'){
                return '付款减库存'
            }
        },
        // 运费模板
        get_freight_id:(text)=>{
            if(text === '0'){
                return '包邮'
            }
        },
        // sku
        get_sku_name:(text)=>{
            var sku_obj = JSON.parse(text)
            var sku_name = ""
            for(let i of sku_obj){
                sku_name = sku_name + i.name +  ' | '
            }
            var new_name = sku_name.slice(0, -2);
            return new_name
        },
        // 提交方式
        get_commit:(text)=>{
            // false仅保存，true保存+提审
            if(text === 'false'){
                return '保存'
            }else if(text === 'true'){
                return '保存+提审'
            }
        },
        // 商品类型
        get_product_type:(text)=>{
            // 0-普通，3-虚拟，6玉石闪购，7云闪购
            if(text === '0'){
                return '普通'
            }else if(text === '3'){
                return '虚拟'
            }else if(text === '6'){
                return '玉石闪购'
            }else if(text === '7'){
                return '云闪购'
            }
        }
    }


    // 字段编辑
    Edit = {

        // 编辑数据定义
        pic_Data: reactive({action:'',title:'',data:'',open:false,}),           // 主图
        video_Data: reactive({action:'',title:'',data:'',open:false,}),         // 视频
        title_Data: reactive({action:'',title:'',data:'',open:false,}),         //标题
        white_image_Data: reactive({action:'',title:'',data:'',open:false,}),   //白底图
        SKU_Data: reactive({action:'',title:'',data:'',open:false,}),           //规格
        format_Data: reactive({action:'',title:'',data:'',open:false,}),        // 属性
        des_Data: reactive({action:'',title:'',data:'',open:false,}),           // 描述
        state_Data: reactive({action:'',title:'',data:'',open:false,}),         // 复制状态
        upload_imgage_Data: reactive({action:'',title:'',data:'',open:false,}), // 图片上传
        class_Data: reactive({action:'',title:'',data:'',open:false,}),         // 商品分类
        del_Data: reactive({action:'',title:'',data:'',open:false,}),           // 删除
        reduce_type_Data: reactive({action:'',title:'',data:'',open:false,}),   // 减库存
        commit_Data: reactive({action:'',title:'',data:'',open:false,}),        // 提交
        product_type_Data: reactive({action:'',title:'',data:'',open:false,}),  // 商品类型
        mobile_Data: reactive({action:'',title:'',data:'',open:false,}),        // 客服电话

        // 标题
        title:(data)=>{
            this.Edit.title_Data.title = '编辑标题';
            this.Edit.title_Data.open = true
            this.Edit.title_Data.action = API.AppSrtoreAPI.copyrecords.edit
            this.Edit.title_Data.data = ''
            this.Edit.title_Data.data = data.title
            this.Edit.title_Data.id = data.id

        },
        // 视频
        video:(data)=>{
            this.Edit.video_Data.title = '编辑视频';
            this.Edit.video_Data.open = true
            this.Edit.video_Data.id = ''
            this.Edit.video_Data.data = data.video_url
            this.Edit.video_Data.id = data.id

        },
        // 主图
        pic:(data)=>{
            this.Edit.pic_Data.title = '编辑主图';
            this.Edit.pic_Data.open = true
            this.Edit.pic_Data.data = ''
            this.Edit.pic_Data.data = data.pic
            this.Edit.pic_Data.id = data.id

        },
        // 白底图
        white_image:(data)=>{
            this.Edit.white_image_Data.title = '编辑白底图';
            this.Edit.white_image_Data.open = true
            this.Edit.white_image_Data.data = ''
            this.Edit.white_image_Data.data = data.white_image
            this.Edit.white_image_Data.id = data.id

        },
        // SKU
        SKU:(data)=>{
            this.Edit.SKU_Data.title = '编辑规格';
            this.Edit.SKU_Data.open = true
            this.Edit.SKU_Data.data = ''
            this.Edit.SKU_Data.data = data.sku
            this.Edit.SKU_Data.id = data.id
            this.Edit.SKU_Data.sku_list = ''
            this.Edit.SKU_Data.sku_list = data.sku_list
        },
        // SKU-LIST
        SKULIST:(data)=>{
            this.Edit.SKU_Data.title = '编辑规格';
            this.Edit.SKU_Data.open = true
            this.Edit.SKU_Data.data = data.sku_list
        },
        // 属性
        format:(data)=>{
            this.Edit.format_Data.title = '编辑属性';
            this.Edit.format_Data.open = true
            this.Edit.format_Data.data = data.format
        },
        // 描述
        des:(data)=>{
            this.Edit.des_Data.title = '编辑描述';
            this.Edit.des_Data.open = true
            this.Edit.des_Data.data = ''
            this.Edit.des_Data.data = data.description
            this.Edit.des_Data.id = data.id

        },
        // 图片上传
        upload_image:(data,user_data)=>{
            this.Edit.upload_imgage_Data.title = '图片上传';
            this.Edit.upload_imgage_Data.open = true
            this.Edit.upload_imgage_Data.data = data
            this.Edit.upload_imgage_Data.user_data = user_data

        },
        // 商品分类
        class:(data)=>{
            this.Edit.class_Data.title = '编辑分类';
            this.Edit.class_Data.open = true
            this.Edit.class_Data.data = data.cate_name
        },
        // 减库存
        reduce_type:(data)=>{
            this.Edit.reduce_type_Data.title = '减库存方式';
            this.Edit.reduce_type_Data.open = true
            this.Edit.reduce_type_Data.data = ''
            this.Edit.reduce_type_Data.data = data.reduce_type
            this.Edit.reduce_type_Data.id = data.id

        },
        // 运费模板
        freight_id:(data)=>{
            this.Edit.class_Data.title = '运费模板';
            this.Edit.class_Data.open = true
            this.Edit.class_Data.data = data.freight_id
        },
        // 客服电话
        mobile:(data)=>{
            this.Edit.mobile_Data.title = '客服电话';
            this.Edit.mobile_Data.open = true
            this.Edit.mobile_Data.data = ''
            this.Edit.mobile_Data.data = data.mobile
            this.Edit.mobile_Data.id = data.id

        },
        // 提交方式
        commit:(data)=>{
            this.Edit.commit_Data.title = '提交方式';
            this.Edit.commit_Data.open = true
            this.Edit.commit_Data.data = ''
            this.Edit.commit_Data.data = data.commit
            this.Edit.commit_Data.id = data.id

        },
        // 商品类型
        product_type:(data)=>{
            this.Edit.product_type_Data.title = '商品类型';
            this.Edit.product_type_Data.open = true
            this.Edit.product_type_Data.data = ''
            this.Edit.product_type_Data.data = data.product_type
            this.Edit.product_type_Data.id = data.id

        },
        // 删除
        model_del:(data)=>{
            this.Edit.del_Data.title = '确认删除选中数据吗？';
            this.Edit.del_Data.open = true
            this.Edit.del_Data.action = API.AppSrtoreAPI.copyrecords.delete
            this.Edit.del_Data.data = data.id
        }
    }


    // 批量勾选操作
    BatchConfig={

        // 定义行选择的selectedRowKeys
        selectedlist:ref([]),

        state:computed(() => this.BatchConfig.selectedlist.value.length > 0),
        
        columnWidth:18,     // 勾选列宽度

        fixed:true,         // 定位

        onChange:(selectedRowKeys, selectedRows)=>{
            console.log(selectedRowKeys)
            console.log(this.BatchConfig.state.value)
            this.BatchConfig.selectedlist.value = selectedRowKeys
        },

        // 定义行选择onChange事件处理函数
        onSelectChange: (selectedRowKeys, selectedRows) => {
            // 更新selectedRowKeys状态
            selectedRowKeys.value = selectedRowKeys;
            this.BatchConfig.selectedlist.value = []
        }

    }

    // 批量处理方法


}
