import { ref,reactive,toRaw,computed,nextTick } from 'vue'
import axios from 'axios';
import * as TOOL from '@/assets/JS_Model/tool';
import * as utils from '@/assets/JS_Model/public_model';

const tool = new TOOL.TOOL()            // 工具方法
const API = new utils.A_Patch()         // 请求接口地址合集

// 商品发布前验证
// 请求参数
// heck_types // List 校验类型，需要进行哪些校验，可以支持部分校验。 
// 店铺发品门槛校验：shop_publish_product_access，不需要传其他字段；
// 店铺使用类目权限校验：shop_use_category_access，需要传category_id字段；
// 商品标题校验:product_title_illegal_check，需要传title、title_prefix、title_suffix
// "shop_publish_product_access"
// "shop_use_category_access",
// "shop_out_product_id_unique"

const checkProductRelease = reactive({
    // 提交参数
    uplaodadata:{
        "heck_types":["shop_publish_product_access"],
        "category_id": 123456,
        "out_product_id": "123456",
        "title": "标题前缀我是个标题标题后缀",
        "title_prefix": "标题前缀",
        "title_suffix": "标题后缀"
    },

    // 返回参数
    response:{
        "data":{
            "common_check_results":[
                {
                    "check_result_code":"0", // 校验结果code，0：通过，其他：拦截
                    "check_result_msg":"success", // 文案提示
                    "check_type":"shop_publish_product_access" // 校验类型
                }]
            },
        "code":10000,
        "msg":"success",
        "sub_code":"",
        "sub_msg":""
    },

    // 商品发布门槛验证
    getReleaseCheckPublish:(data)=>{
        let up_data = {"heck_types":["shop_publish_product_access"]}// 店铺发品门槛校验
    },

    // 标题验证
    getReleaseCheckTitle:(data)=>{
        let up_data = {"heck_types":["product_title_illegal_check"],// 商品标题校验
            "title": data.title,
            "title_prefix": data.title_prefix,
            "title_suffix": data.title_suffix
        }
        
    },
    // 类目验证
    getReleaseCheckCategory:()=>{

        let up_data = {"heck_types":["shop_use_category_access"]}// 店铺使用类目权限校验
        

    },
    // 发布前请求方法全部验证
    getReleaseCheckData:(data)=>{

        let up_data = {
            "heck_types":[
                "shop_publish_product_access",// 店铺发品门槛校验
                "shop_use_category_access",// 店铺使用类目权限校验
                "product_title_illegal_check"// 商品标题校验
            ],
            "category_id": data.category_id,
            "out_product_id": "123456",
            "title": data.title,
            "title_prefix": data.title_prefix,
            "title_suffix": data.title_suffix
        }
        // 请求接口
        axios.post(API.AppSrtoreAPI.dou_product.publishPreCheck,up_data).then((res)=>{
            console.log(res)
        })

        return ''

    }


})
