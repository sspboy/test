import { reactive,ref } from "vue"
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';
const tool = new TOOL.TOOL()            // 工具方法
const API = new utils.A_Patch()         // 请求接口地址合集

//**商品列表 js方法**//
export class ProductList_fun {

    PageConfig = reactive({

        // 默认查询条件
        "can_combine_product":true,       // 是否可搭配--默认
        "need_rectification_info":true,   // 是否需要自动整改信息 -- 默认

        "lookup_option":ref({             // 查询option--默认
            "need_name_affix":true,       // 是否需要获取标题前后缀
            "need_title_limit":true,      //是否需要获取商品标题长度限制规则
        }),

        "page":1,                         // 当前页面 -- 默认
        "size":10,                        // 显示数量 -- 默认


        // 翻页查询条件
        "product_type":ref(undefined),    // 商品类型
        "product_type_op":[
        {
            "label":"普通商品",
            "value":0
        },
        {
            "label":"新客商品",
            "value":1
        },
        {
            "label":"虚拟商品",
            "value":3
        },
        {
            "label":"玉石闪购",
            "value":6
        },
        {
            "label":"云闪购",
            "value":7
        },
        {
            "label":"其他",
            "value":127
        },
        ],

        "status":ref(undefined),          //  在线状态
        "status_op":[
        {
            "label":"在线",
            "value":0
        },
        {
            "label":"下线",
            "value":1
        },
        {
            "label":"删除",
            "value":2
        }

        ],

        "check_status":ref(undefined),    // 审核状态
        "check_status_op":[
        {
            "label":"未提交",
            "value":1
        },
        {
            "label":"待审核",
            "value":2
        },
        {
            "label":"审核通过",
            "value":3
        },
        {
            "label":"审核未通过",
            "value":4
        },
                    {
            "label":"封禁",
            "value":5
        },
                    {
            "label":"审核通过待上架",
            "value":7
        },
        ],

        "create_time":ref(undefined),     // 创建时间
        "update_time":ref(undefined),     // 更新时间

        "product_id":ref(undefined),      // id查询最多支持  -- 选填
        "sku_codes":ref(undefined),       // 商家编码查询    -- 选填
        "store_id":ref(undefined),        // 小时达商家门店id-- 选填

        "selectGroup":ref([]),            // need_check_out 只显示需要核销商品--exist_audit_reject_suggest 只显示驳回商品
        "need_check_out":ref(false),                // 只显示需要核销商品 -- 选填
        "exist_audit_reject_suggest":ref(false),    // 只显示驳回商品 -- 选填
        


    })

    // 查询【提交表单】数据验证
    FromDataverify = (values) =>{

        const submit_obj = {};

        // 获取表单值是否为空

        // 默认值
        submit_obj.page = 1
        submit_obj.size = 10
        submit_obj.can_combine_product = true;      // 是否可搭配
        submit_obj.lookup_option = {
          "need_name_affix":true,                   // 是否需要获取标题前后缀
          "need_title_limit":true,                  //是否需要获取商品标题长度限制规则
        }
        submit_obj.need_rectification_info = true;  // 是否需要自动整改信息

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

        // 商品id查询
        // if(DataObj.product_id){
        //     return ''
        // }
        
        // 商家编码查询
        
        // 门店id查询
        
        // 只看核销

        // 只看驳回建议
        if(values.exist_audit_reject_suggest === true){
            submit_obj.query_options = {
                "exist_audit_reject_suggest":true,
                "need_audit_reject_suggest":true
            }
        }else{
            delete submit_obj.exist_audit_reject_suggest
        }

        return submit_obj;
    }

    // 列表容器==布局监听方法

    // 字段转义
    Field_translation = {
        // 短标题
        short_product_name:(data)=>{
            // console.log('短标题',data)
            if(data == ''){
                return '暂无'
            }else {
                return data
            }
        },
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
        },
        // 草稿状态
        product_draft_status_info:(data)=>{
            if(data == 0){
                return '无草稿'
            }else if(data == 1){
                return '未提审'
            }else if(data == 2){
                return '待审核'
            }else if(data == 3){
                return '审核通过'
            }else if(data == 4){
                return '审核未通过'
            }
        },
        // 售卖方式
        product_sale_type_info:(data)=>{
            if(data[0] == 0){
                return '全渠道手售卖'
            }else if(data[0] == 1){
                return '仅指定直播间售卖'
            }
        },
        // 减库存方式
        product_reduce_type:(data)=>{
            if(data == 1){
                return '拍下减库存'
            }else if(data == 2){
                return '付款减库存'
            }
        },
        // 大件商品售后服务新结构
        product_after_sale_service_v2:(data)=>{
            // console.log('售后服务新结构',data)

            var is_large_product = data.is_large_product

            // 是否大件商品
            if(is_large_product === null){

                return '无大件商品售后'

            }else if(is_large_product !== null){

                // 三包服务承诺配置信息
                var three_guarantees = data.three_guarantees;
                // 售后天数
                var duration = three_guarantees.duration;
                // 服务类型
                var service_type = data.service_type;

                if(duration === undefined){
                    var duration_text = '暂无'
                }else {
                    var duration_text = duration + '天'
                }

                if(service_type == 1){
                    var service_type_text = '寄修'
                }else if(service_type == 2){
                    var service_type_text = '延保'
                }else if(service_type === undefined){
                    var service_type_text = '暂无'
                }

                var res = '服务类型:' + service_type_text + '售后' + duration_text

                return res
            }
        },
        // 普通商品售后
        product_after_sale_service:(data)=>{
            console.log('普通商品售后',data)
            var obj = JSON.parse(data)
            var res = {
                "supply_7day_return":"1",
                "supply_day_return_code":"1",
                "supply_day_return_copywriting":"7天无理由退货",
                "supply_day_return_days":"7",
                "supply_day_return_selector":"7-1"// (n-代号)N只支持7或15；代号【】
            }
            var supply_7day_return = obj.supply_7day_return //是否支持7天无理由，0不支持，1支持，2支持(拆封后不支持)
            var supply_day_return_code = obj.supply_day_return_code;
            var supply_day_return_days = obj.supply_day_return_days;
            var supply_day_return_copywriting = obj.supply_day_return_copywriting;

            if(supply_day_return_code === '1'){
                return '支持'
            }else if(supply_day_return_code === '0'){
                return '不支持'
            }else if(supply_day_return_code === '2'){
                return supply_day_return_copywriting 
            }else if(supply_day_return_code === '3'){
                return supply_day_return_copywriting 
            }else if(supply_day_return_code === '4'){
                return supply_day_return_copywriting 
            }else if(supply_day_return_code === '5'){
                return supply_day_return_copywriting 
            }else if(supply_day_return_code === '6'){
                return supply_day_return_copywriting
            }else if(supply_day_return_code === '8'){
                return supply_day_return_copywriting
            }

        },
        // 提取方式
        product_pickup_method:(data)=>{
            if(data == 0){
                return '普通商品-使用物流发货'
            }else if(data == 1){
                return '虚拟商品-无需物流与电子交易凭证'
            }else if(data == 2){
                return '虚拟商品-使用电子交易凭证'
            }else if(data == 3){
                return '虚拟商品-充值直连'
            }
        },
        // 重量单位
        product_weight_unit:(data)=>{
            if(data == 0){
                return 'kg'
            }else if(data == 1){
                return 'g'
            }
        },
        // 运费模板
        product_freight_template:(data)=>{
            console.log('运费模板',data)


            if(data == 0){
                return '包邮'
            }else{
                tool.Http_.post(API.AppSrtoreAPI.dou_product.freight,{
                    template_id:data
                }).then(res=>{
                    console.log('运费模板',res)
                })
            }
        },
        // 尺码模板
        product_size_template:(data)=>{
            if(data == 0){
                return '无尺码模板'
            }
        },
        // 品牌
        product_brand_info:(data)=>{
            if(data == '596120136'){
                return '无品牌'
            }
        },


    }


}