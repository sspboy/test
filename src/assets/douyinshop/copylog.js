/** 复制商品方法 **/
import {ref, reactive, computed} from 'vue';

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

    // 编辑标题
    Edit_title = {
        
        // 查看
        load:(data)=>{
            
        }

    }

    // 字段编辑
    Edit={

        // 编辑数据定义
        pic_Data: reactive({action:'',title:'',data:'',open:false,}),   // 主图
        video_Data: reactive({action:'',title:'',data:'',open:false,}), // 视频
        title_Data: reactive({action:'',title:'',data:'',open:false,}), //标题
        white_image_Data: reactive({action:'',title:'',data:'',open:false,}),//白底图
        SKU_Data: reactive({action:'',title:'',data:'',open:false,}),   //规格
        format_Data: reactive({action:'',title:'',data:'',open:false,}),// 属性
        des_Data: reactive({action:'',title:'',data:'',open:false,}),   // 描述
        state_Data: reactive({action:'',title:'',data:'',open:false,}), // 复制状态
        upload_imgage_Data: reactive({action:'',title:'',data:'',open:false,}),// 图片上传
        class_Data: reactive({action:'',title:'',data:'',open:false,}), // 商品分类

        // 标题
        title:(data)=>{
            EditData.title = '编辑标题';
            EditData.open = true
            EditData.data = data.title
        },
        // 视频
        video:(data)=>{
            EditData.title = '编辑视频';
            EditData.open = true
            EditData.data = data.video_url
        },
        // 主图
        pic:(data)=>{
            EditData.title = '编辑标题';
            EditData.open = true
            EditData.data = data.pic
        },
        // 白底图
        white_image:()=>{

        },
        // SKU
        SKU:()=>{

        },


    }

    // 批量操作
    BatchConfig={

        // 定义行选择的selectedRowKeys
        selectedlist:ref([]),

        state:computed(() => this.BatchConfig.selectedlist.value.length > 0),
        
        columnWidth:16,

        fixed:true,

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
    // 更新方法
    Update={}

}