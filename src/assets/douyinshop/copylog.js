/** 复制商品方法 **/

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

    // 更新方法
    Update={}

}