//**批量修改js方法**//
export class B_Fun {

    // 验证第一步查询数据
    verify_first_submit = (values) => {

        const submit_obj = {};

        // 分类
        if(values.cate_name!== null && values.cate_name!== undefined){
            submit_obj.cate_name = Object.values(values.cate_name)
        }

        // 商品状态信息
        if(values.status!== null && values.status!== undefined){
            submit_obj.status = values.status 
        }

        // 商品审核信息
        if(values.check_status!== null && values.check_status!== undefined){
            submit_obj.check_status = values.check_status
        }
        
        // 创建时间
        if(values.create_time !== null && values.create_time !== undefined){
            console.log('创建时间',values.create_time[0].format('YYYY-MM-DD HH:mm:ss'),values.create_time[1].format('YYYY-MM-DD HH:mm:ss'))
            submit_obj.create_time = {
                start_time:values.create_time[0].format('YYYY-MM-DD HH:mm:ss'),
                end_time:values.create_time[1].format('YYYY-MM-DD HH:mm:ss')
            }
        }

        // 更新时间
        if(values.update_time !== null && values.update_time !== undefined){
            console.log('创建时间',values.update_time[0].format('YYYY-MM-DD HH:mm:ss'),values.update_time[1].format('YYYY-MM-DD HH:mm:ss'))
            submit_obj.update_time = {
                start_time:values.update_time[0].format('YYYY-MM-DD HH:mm:ss'),
                end_time:values.update_time[1].format('YYYY-MM-DD HH:mm:ss') 
            }
        }

        // 标题关键字
        if(values.title_key!== null && values.title_key!== undefined){
            submit_obj.title_key = values.title_key
        }

        return submit_obj;
    }

    // 验证第二步操作方法数据
    verify_second_submit = (values) => {

        // console.log(values)
        const submit_obj = {};// 提交数据
        const title_obj = {}; // 标题数据

        var title = values.title;
        var after_key= title.after_key;// 后缀
        var before_key= title.before_key;// 前缀
        var replace_key= title.reduce_type;// 替换关键字
        var target_key = title.target_key;// 目标关键字
        var filter_key = title.filter_key;// 过滤关键字

        // 前缀验证
        if(before_key !== '' && before_key !== undefined){
            title_obj.before_key = before_key
        }

        // 后缀验证
        if(after_key !== '' && after_key !== undefined){
            title_obj.after_key = after_key
        }

        // 目标关键字验证
        if(target_key !== '' && target_key !== undefined){

            title_obj.target_key = target_key
        }

        // 替换关键字验证
        if(replace_key !== '' && replace_key !== undefined){

            title_obj.replace_key = replace_key
        }
        // 过滤关键字验证
        if(filter_key !== '' && filter_key !== undefined){
            title_obj.filter_key = filter_key
        }
        // 标题
        if(JSON.stringify(title_obj) !== "{}"){
            submit_obj.title = title_obj;
        }


        // 电话
        if(values.mobile !== '' && values.mobile!== undefined){
            submit_obj.mobile = values.mobile
        }

        // 库存类型
        if(values.reduce_type !== '' && values.reduce_type!== undefined){
            submit_obj.reduce_type = values.reduce_type
        }

        // 运费模板
        if(values.freight_id !== '' && values.freight_id!== undefined){
            submit_obj.freight_id = values.freight_id
        }

        // 发货模式
        if(values.presell_config_level !== null && values.presell_config_level!== undefined){
            submit_obj.presell_config_level = values.presell_config_level
        }

        return submit_obj;

    }

    // 筛选回调商品：类目、
    filter_product = (values, product_list) => {

        const submit_obj = {};
        
        cate_name = []


    }



}