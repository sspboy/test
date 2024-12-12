/** 复制商品方法 **/
import {ref, reactive} from 'vue';

export class CopyLog{
    
    // 列表方法
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
        }


    }



    // 编辑方法
    Edit = {
        
        title_Data:reactive({action:'',title:'',data:'',open:false}),// 标题绑定数据
        pic_Data:reactive({action:'',title:'',data:'',open:false}),// 主图绑定数据
        white_image_Data:reactive({action:'',title:'',data:'',open:false}),// 白底图数据
        video_Data:reactive({action:'',title:'',data:'',open:false}),// 视频数据
        SKU_Data:reactive({action:'',title:'',data:'',open:false}),// 规格数据
        format_Data:reactive({action:'',title:'',data:'',open:false}),// 属性数据
        des_Data:reactive({action:'',title:'',data:'',open:false}),// 描述数据
        pic_upload_Data:reactive({action:'',title:'',data:'',open:false}),// 图片上传数据
        class_Data:reactive({action:'',title:'',data:'',open:false}),// 分类数据

        title:(data)=>{
            this.Edit.title_Data.title = '编辑标题';
            this.Edit.title_Data.open = true
            this.Edit.title_Data.data = data.title
          },
        
        pic:(data)=>{
            this.Edit.pic_Data.title = '编辑主图';
            this.Edit.pic_Data.open = true
            this.Edit.pic_Data.data = data.top_pic
        },

        white_image:(data)=>{
            this.Edit.white_image_Data.title = '编辑白底图';
            this.Edit.white_image_Data.open = true
            this.Edit.white_image_Data.data = data.white_image
        },

        video:(data)=>{
            this.Edit.video_Data.title = '编辑视频';
            this.Edit.video_Data.open = true
            this.Edit.video_Data.data = data.video_url
        },

        SKU:(data)=>{
            this.Edit.SKU_Data.title = '编辑规格';
            this.Edit.SKU_Data.open = true
            this.Edit.SKU_Data.data = data.sku
        },

        format:(data)=>{
            this.Edit.format_Data.title = '编辑属性';
            this.Edit.format_Data.open = true
            this.Edit.format_Data.data = data.format
        },

        class:(data)=>{
            this.Edit.class_Data.title = '编辑分类';
            this.Edit.class_Data.open = true
            this.Edit.class_Data.data = data.cate_name
        },

        des:(data)=>{
            this.Edit.des_Data.title = '编辑描述';
            this.Edit.des_Data.open = true
            this.Edit.des_Data.data = data.description
        },

        pic_upload:(data)=>{
            this.Edit.pic_upload_Data.title = '上传图片';
            this.Edit.pic_upload_Data.open = true
            this.Edit.pic_upload_Data.data = data.pic_upload_res
        },


    }

    // 上传更新
    Upload = {

    }

    // 编辑标题
    Edit_title = {
        
        // 查看
        load:(data)=>{
            
        }

    }

    // 编辑主图
    Edit_pic = {}
    // 编辑视频
    Edit_video = {}
    // 编辑白底图
    Edit_white_image = {}
    // 编辑规格
    Edit_spec= {}
    // 编辑描述
    Edit_DES= {}
    // 编辑属性
    Edit_Format= {}
    // 编辑分类
    Edit_class={}


}