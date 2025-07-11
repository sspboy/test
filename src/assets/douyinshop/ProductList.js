import { reactive } from "vue"

//**商品列表 js方法**//
export class ProductList_fun {

    PageConfig = reactive({

        "page":1,           // 当前页面
        "size":10,          // 页面内容数量    
        "status":0,         // 0-在线；1-下线；2-删除；
        "check_status":3,   // 1-未提交；2-待审核；3-审核通过；4-审核未通过；5-封禁；7-审核通过待上架；
        
        "can_combine_product":true, // 是否可搭配
        
        // 查询option
        "lookup_option":{
          "need_name_affix":true,       // 是否需要获取标题前后缀
          "need_title_limit":true,      //是否需要获取商品标题长度限制规则
        },

        "need_rectification_info":true, // 是否需要自动整改信息

    })

    // 表单数据验证
    FromDataverify = (values) =>{

        const submit_obj = {};

        // 商品类型
        if(values.product_type !== null && values.product_type !== undefined && values.product_type !== ""){
            submit_obj.product_type = values.product_type
        }else{
            delete submit_obj.product_type
        }

        // 商品状态
        if(values.status!== null && values.status!== undefined && values.status!== ""){
            submit_obj.status = values.status
        }else{
            delete submit_obj.status;
        }

        // 审核状态
        if(values.check_status!== null && values.check_status!== undefined && values.check_status!== ""){
            submit_obj.check_status = values.check_status
        }else{
            delete submit_obj.check_status;
        }
        
        // 创建时间
        if(values.create_time !== null && values.create_time !== undefined && values.create_time !== ""){
            // console.log('创建时间',values.create_time[0].format('YYYY-MM-DD HH:mm:ss'),values.create_time[1].format('YYYY-MM-DD HH:mm:ss'))
            // submit_obj.start_time = values.create_time[0].format('YYYY-MM-DD HH:mm:ss');
            // submit_obj.end_time = values.create_time[1].format('YYYY-MM-DD HH:mm:ss');
            submit_obj.start_time = values.create_time[0].unix();
            submit_obj.end_time = values.create_time[1].unix();
        }else{
            delete submit_obj.start_time
            delete submit_obj.end_time
        }

        // 更新时间
        if(values.update_time !== null && values.update_time !== undefined && values.update_time !== ""){
            // console.log('创建时间',values.update_time[0].format('YYYY-MM-DD HH:mm:ss'),values.update_time[1].format('YYYY-MM-DD HH:mm:ss'))
            // submit_obj.update_start_time = values.update_time[0].format('YYYY-MM-DD HH:mm:ss'),
            // submit_obj.update_end_time = values.update_time[1].format('YYYY-MM-DD HH:mm:ss')
            submit_obj.update_start_time = values.update_time[0].unix();
            submit_obj.update_end_time = values.update_time[1].unix();
        }else{
            delete submit_obj.update_start_time
            delete submit_obj.update_end_time
        }

        // 标题关键字
        if(values.title_key!== null && values.title_key !== undefined && values.title_key!== ""){
            submit_obj.name = values.title_key
        }else{
            delete submit_obj.name
        }

        // 商品id
        if(values.product_id !== null && values.product_id !== undefined && values.product_id!== ""){
            submit_obj.product_id = values.product_id
        }else{
            delete submit_obj.product_id
        }

        return submit_obj;
    }

    // 列表容器==布局监听方法

    // 字段转义
    Field_translation = {

        // 上架状态
        product_status:(data)=>{
            if(data == 0){
                return '在线'
            }else if(data == 1){
                return '下线'
            }else if(data == 2){
                return '删除'
            }
        },
        // 审核状态
        product_check_status_info:(data)=>{
            if(data == 1){
                return '未提交'
            }else if(data == 2){
                return '待审核'
            }else if(data == 3){
                return '审核通过'
            }else if(data == 4){
                return '审核未通过'
            }else if(data == 5){
                return '封禁'
            }else if(data == 7){
                return '待上架'
            }
        },

        // 商品类型
        product_type_info:(data)=>{
            if(data == 0){
                return '普通商品'
            }else if(data == 1){
                return '新客商品'
            }else if(data == 3){
                return '虚拟商品'
            }else if(data == 6){
                return '玉石闪购'
            }else if(data == 7){
                return '云闪购'
            }else if(data == 127){
                return '其他商品'
            }
        },
        // 商品类目
        product_cate_name_info:(data) =>{

            var first_cname = data.first_cname;
            var second_cname = data.second_cname;
            var third_cname = data.third_cname;
            var fourth_cname = data.fourth_cname;
            var cate_text = '';
            if(first_cname !== ''){
                cate_text = cate_text + first_cname + '>' 
            }
            if(second_cname !== ''){
                cate_text = cate_text + second_cname + '>' 
            }
            if(third_cname !== ''){
                cate_text = cate_text + third_cname + '>' 
            }
            if(fourth_cname !== ''){
                cate_text = cate_text + fourth_cname + '>' 
            }

            var cate_obj = {}
            var full_cate = cate_text.slice(0,cate_text.length-1);
            cate_obj.full_cate = full_cate
            cate_obj.last_cate = full_cate.split('>').slice(-1)[0];

            return cate_obj
        }


    }


}