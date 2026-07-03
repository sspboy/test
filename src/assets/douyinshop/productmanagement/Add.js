// 新建商品组件：方法调用
import { ref,reactive,toRaw,computed,nextTick } from 'vue'
import * as TOOL from '@/assets/JS_Model/tool';
import * as TABLE from '@/assets/JS_Model/TableOperate';
import * as utils from '@/assets/JS_Model/public_model';
import axios from 'axios';
const tool = new TOOL.TOOL()            // 工具方法
const API = new utils.A_Patch()         // 请求接口地址合集




// 类目预测==开始
// 主图对象
export const Pic_Fun = reactive({

    PicList:[], // 主图列表
    name:undefined,// 商品标题
    selectimg_open:false, // 选择主图素材
    
    // 选择主图图片素材
    change_material_type:()=>{
        Pic_Fun.selectimg_open = true;
    },

    Add_Callback:(data)=>{
        Pic_Fun.add(data)
    },


    // 删除图片
    del_pic:(index)=>{
        Pic_Fun.PicList.splice(index, 1)
    },

    // 添加图片
    add:(data)=>{

        data.forEach((obj,idx)=>{
            // 判断是否图片素材
            var material_type = obj.material_type;

            // console.log(material_type)
            // 是图片=>添加到数组
            if(material_type == 'photo'){
                var photo_info = obj.photo_info;
                var pic_width = photo_info.width;      // 宽度
                var pic_height = photo_info.height;     // 高度
                if(pic_width == pic_height){
                    Pic_Fun.PicList.push(obj)
                }else{
                
                    tool.Fun_.message('info','主图长宽比例需要1:1,不小于600X600.')
                
                }
            }else if(material_type == 'video'){

                tool.Fun_.message('info','【主图】不能选择视频，请选择图片素材！')
            
            }
        })

        // 只保留5张主图；
        if(Pic_Fun.PicList.length > 5){
            Pic_Fun.PicList = Pic_Fun.PicList.slice(0, 5)
            tool.Fun_.message('info','最多上传5张主图')
        }

    },
    
    // 获取主图
    get:()=>{

        var pic = Pic_Fun.PicList;
        if(pic.length == 0){
            return false
        }else{
            var res_text = ''
            pic.forEach((obj,index)=>{
                res_text = res_text + obj.byte_url  + '|'
            })
            return res_text.slice(0, -1)
        }
    },

    // 填写商品信息按钮
    fill_in_product_info:()=>{

        if(CATE.cate_value.value){// 填写了分类

            CATE.cate_status.value = false; // 显示填写信息

        }else{ // 未填写分类

            tool.Fun_.message('info','请选择商品类目' +  CATE.cate_value.value)

        }

        // 测试用流程
        productRule.get()// 请求发布规则【 需要在 获取分类ID后执行】
        // 加载属性
        CATE.loadFormat();// 加载对应商品属性
    }

})

// 分类&属性
export const CATE = {

    cate_status:ref(true),      // 预测类目是否显示状态

    cate_name:ref([]),          // 分类

    predict_status:ref(false),  // 预测按钮状态

    select_loading:ref(true),  // 预测选项状态

    cate_value:ref(undefined),  // 选中分类

    options:ref([]),            // 分类选项

    // 商品属性结构数据：：渲染表单格式
    format:ref([]),

    // 表单数据绑定:
    form_ref:ref(),

    format_formRef:reactive({}),

    // 吊牌-水洗标
    category_property_pics:ref(undefined),

    // 自定义【面料材质】的名称
    diy_name:ref(),

    // 添加自定义【面料材质】name -方法
    addItem:(op) => {

        var diy_name = CATE.diy_name.value; // 自定义名称
        if(diy_name == undefined){
            tool.Fun_.message('error','自定义值不能为空')
        }else{
            op.unshift({
                name: diy_name,
                value: op.length + 1 + '',
                value_id:op.length + 1,
                value_text:false // 自定义值标识
            });
        }

        CATE.diy_name.value = undefined;
    },
    // 对选度量衡添加限制-不超过
    add_limit:(data_list,maxnumber)=>{
        if(data_list.length >= maxnumber){
            tool.Fun_.message('error','超过最大限制数量了，最多10个选项。')
        }else{
            data_list.push({value:undefined, percentage:undefined})
        }
    },
    // 删除面料材质属性
    material_del:(index,data)=>{
        data.splice(index,1)
    },

    // 变化选项时禁选
    material_change:(select_data,data)=>{
        var s_list = [] // 选中的id
        select_data.forEach(item=>{
        if(item.value !== undefined){
            s_list.push(item.value)
        }
        })
        // 设置下拉选中的值禁用
        data.forEach(item=>{
        if(s_list.includes(item.value)){
            item.disabled = true; // 禁用
        }else{
            item.disabled = false;// 启用

        }
        })

    },

    // 类目列表转换
    get_cate_list:(obj)=>{
        var obj_list = []
        for(let i of obj){
            let cate_obj = {}
            cate_obj.value = i.id;
            cate_obj.label = i.name;
            cate_obj.isLeaf = i.is_leaf;
            obj_list.push(cate_obj)
        }
        return obj_list
    },
    // 选择下级分类加载方法
    loadData:selectedOptions =>{

        const targetOption = selectedOptions[selectedOptions.length - 1];

        var cid = targetOption.value;       // 分类id

        var isLeaf = targetOption.isLeaf;   // 是否叶子类目

        targetOption.loading = true; // load options
        
        axios.post(API.AppSrtoreAPI.dou_product.cate, {"cid":cid}).then(res=>{
            targetOption.loading = false;
            targetOption.children = CATE.get_cate_list(res.data.data)
            CATE.options.value = [...CATE.options.value]
        })
    },

    // 请求属性:加载到列表
    loadFormat:async()=>{

        var cate_id = CATE.cate_value.value

        productRule.get()// 请求发布规则【 需要在 获取分类ID后执行】

        // 请求类目对应的属性值
        var res = await axios.post(API.AppSrtoreAPI.dou_product.format, {
            "category_leaf_id":cate_id
        })

        var data_list = res.data.data.data; // 属性值列表

        Object.keys(CATE.format_formRef).forEach(key => delete CATE.format_formRef[key]); // 清空

        // 加载属性结构
        data_list.forEach((obj,index)=>{

            // 添加品牌无品牌选项
            var property_name = obj.property_name

            if(property_name == '品牌'){
                var No_brand_obj = {
                    "value_id": 596120136,
                    "sequence": 0,
                    "name": "无品牌",
                    "value": "596120136"
                }
                obj.options.push(No_brand_obj)
            }
            // 无品牌添加结束

            var type = obj.type; // 属性标签

            if(type == 'select'){// 单选

                CATE.format_formRef[obj.property_id] = undefined;

            }else if(type == 'multi_select'){ // 多选

                CATE.format_formRef[obj.property_id] = undefined;

            }else if(type == 'text'){ // 文本

                CATE.format_formRef[obj.property_id] = undefined;
            
            }else if(type == 'multi_value_measure'){// 度量衡-多选-材质属性

                CATE.format_formRef[obj.property_id] = [{}];

            }else if(type =='measure'){// 度量衡-单选
                
                console.log(obj)

                const measure_Data= {} // 绑定表单dui像

                obj.measure_templates[0].value_modules.forEach(item=>{
                    var mo_obj = {}
                    mo_obj.module_id = item.module_id;
                    mo_obj.prefix = item.prefix;
                    mo_obj.suffix = item.suffix;
                    mo_obj.value = '';
                    if(item.units.length >0){
                        mo_obj.unit_id = item.units[0].unit_id;
                        mo_obj.op = item.units;
                    }
                    measure_Data[item.module_id] = mo_obj;

                })

                CATE.format_formRef[obj.property_id] = measure_Data;

            }else if(type =='timestamp'){// - 时间戳timestamp

                CATE.format_formRef[obj.property_id] = undefined;

            }else if(type =='timerange'){// - 时间段timerange

                CATE.format_formRef[obj.property_id] = undefined;

            }

        })

        CATE.format.value = res.data.data.data;

    },

    // 多选-禁用超过限制选项
    dis_ops:(item, data)=>{

        if(data !== undefined){// 提交数据不为空时

            var type = item.type; // 类别
            var multi_select_max = item.multi_select_max;
            var result_value = data; // 选中的值
            var options = item.options; // 选项
            var diy_type = item.diy_type; // 是否支撑自定义
            
            if(type == 'multi_select' || type == 'multi_value_measure'){ // 多选 'multi_select' & 'multi_value_measure'

                // 选中值--超过限制
                if(result_value.length >= multi_select_max){

                    // 非选中值添加禁用属性
                    options.forEach((obj,index)=>{

                        var value = obj.value_id;

                        // 过滤选中值
                        if(!result_value.includes(value)){
                            obj.disabled = true
                        }
                    })

                }else{// 选中值--没有超过限制

                    // 非选中值添加禁用属性
                    options.forEach((obj,index)=>{
                        obj.disabled = false
                    })

                }
            }
        }
    },

    // 获取多选属性值
    select_name:(v_id,op)=>{
        var r_name = ''
        op.forEach((obj,index)=>{
            var name = obj.name;
            if(v_id == obj.value_id){
                r_name = name
            }
        })
        return r_name

    },
    
    // 获取分类
    get_cate:()=>{
        var cate_values = toRaw(CATE.cate_value.value)
        if(cate_values > 0){// 分类不为空
            return cate_values
        }else{ // 分类为空
            tool.Fun_.message('error', '商品分类不能为空！');
            activeKey.value = '1';
            return false
        }
    },

    // 获取属性
    get_format: async()=>{

        // 验证是否必填全部填写
        var res = await CATE.form_ref.value?.validate().then(()=>{
            
            var selected_mat = toRaw(CATE.format_formRef)// 选中的属性
            var show_mat= toRaw(CATE.format.value)      // 当前展示的属性
            var f_res_obj = {}
            show_mat.forEach(obj => {
                let property_id = obj.property_id;
                if(selected_mat[property_id] !== undefined){
                    var result_list = CATE.de_format_detail(obj, selected_mat[property_id])
                    f_res_obj[property_id] = result_list
                }
            });

            return f_res_obj

        }).catch(error => {

            tool.Fun_.message('error',error.errorFields[0].errors[0]);

            activeKey.value = '1';

            return false
        })
        
        console.log('属性', res) // 打印获取去的商品属性

        return res
    },

    // 获取属性时候-转义属性格式：：提交上传商品
    de_format_detail:(item, data)=>{

        let property_id = item.property_id;
        let type = item.type; // 类别
        let result_value = data; // 选中的值
        let multi_select_max = item.multi_select_max;
        let options = item.options; // 选项
        let diy_type = item.diy_type; // 是否支撑自定义


        // 文本 text
        if(type == 'text'){

            var result = [{"value":0,"name":result_value,"diy_type":diy_type}]
            return result

        }else if(type == 'select'){// 单选 select

            // 单选 [{"value":data,"name":v_name,"diy_type":diy_type}]
            var v_name = ''
            options.forEach((obj,index)=>{
                if(obj.value_id == data){v_name = obj.name}
            })

            var result = [{"value":data,"name":v_name,"diy_type":diy_type}]

            return result

        }else if(type == 'multi_select'){ // 多选

            var res_lisr = []

            // 如果不是数组类型转换为数组
            if(!Array.isArray(result_value)){result_value = [result_value]}
            result_value.forEach((obj,index)=>{
                var r_name = CATE.select_name(obj,options)
                var r_obj = {"value":obj,"name":r_name,"diy_type":diy_type}
                res_lisr.push(r_obj)
            })

            return res_lisr

        }else if(type == 'multi_value_measure'){// 度量衡-多选-材质属性

            // item参数参考值 data：获取值；
            // console.log('面料材质多选', item, data)
            var result = CATE.de_m_v_m(item, data) // 转义数据格式-返回给-提交对象de_m_v_m方法
            return result

        }else if(type =='measure'){// 度量衡-单选

            let value_modules = item.measure_templates[0].value_modules;
            if(value_modules.length == 1){// 单值 
                var result = CATE.de_m_v_one(item, data) // 转义数据格式-返回给-提交对象de_m_v_m方法
                return result
            }else if(value_modules.length > 1){ // 多值-长宽高等
                var result = CATE.de_m_v_more(item, data) // 转义数据格式-返回给-提交对象de_m_v_m方法
                return result
            }

        }else if(type =='timestamp'){// - 时间戳timestamp

            console.log('时间戳',item, data)

            // 时间戳：面条(24814) — 生产日期

        }else if(type =='timerange'){// - 时间段timerange

            console.log('时间段',item, data)

            // 时间段：阿胶块(28948) — 生产日期

        }

    },

    // 类目预测
    Check_Cate:async(formdata)=>{
        
        var name = Pic_Fun.name; // 标题
        var pic = Pic_Fun.get(); // 主图

        CATE.predict_status.value = true;

        // 判断标题是否为空
        if(name === undefined || name === ''){ 
            
            tool.Fun_.message('error', '预测类目>标题不能为空！');
            CATE.predict_status.value = false;
            return false
        }

        // 判断主图是否为空
        if(!pic){
            tool.Fun_.message('error', '预测分类>商品主图不能为空！');
            CATE.predict_status.value = false;
            return false
        }

        // 迭代图片数组格式
        var pic_list = pic.split('|');

        pic_list.forEach((obj,index)=>{

            pic_list[index] = {"url":obj}

        })

        // 请求类目预测接口
        var res = await axios.post(API.AppSrtoreAPI.dou_product.cate_predict,{
            "scene":"category_infer",
            // "scene":"smart_publish",
            "pic":pic_list,
            "name":name
        })

        var categoryDetails = res.data.data.categoryDetails;

        if(categoryDetails.length > 0){

            var cate_list = []

            categoryDetails.forEach((obj,index)=>{

                var op = CATE.de_cate_detaile(obj) // 迭代预测类目选项obj

                cate_list.push(op)

            })

            tool.Fun_.message('success', '预测分类成功！');

            CATE.options.value = cate_list;
            // console.log('可选分类', cate_list)

            CATE.cate_value.value = cate_list[0].value; // 下拉选择赋值
            // console.log('预测类目', CATE.cate_value.value)

            CATE.loadFormat();// 加载对应商品属性
            
            CATE.Ceck_format()// 迭代预测的属性到页面

            CATE.predict_status.value = false; // 按钮load状态停止

            CATE.select_loading.value = false; // 下拉禁用状态停止

        }else{

            tool.Fun_.message('error', '预测分类失败，请更换主图或标题！');

            CATE.predict_status.value = false;

            return false
        }


    },

    // 迭代预测类目选项obj
    de_cate_detaile:(obj)=>{

        var cate_obj = {}
        var qualification_status = obj.qualification_status; // 类目资质qualification_status: 0-有资质；1-资质过期；2-无资质// disabled: true,
        var category_detail = obj.category_detail;           // 类目信息


        let first_cname = category_detail.first_cname;
        let second_cname = category_detail.second_cname;
        let third_cname = category_detail.third_cname;
        let fourth_cname = category_detail.fourth_cname;

        let first_cid = category_detail.first_cid;
        let second_cid = category_detail.second_cid;
        let third_cid = category_detail.third_cid;
        let fourth_cid = category_detail.fourth_cid;
        // ids
        var value_id_list = [first_cid,second_cid,third_cid,fourth_cid];
        // 名称
        var value_label_list = [first_cname,second_cname,third_cname,fourth_cname];
        value_id_list.forEach((id,index)=>{
            if(id == 0){
                value_id_list = value_id_list.slice(0, index)
                value_label_list = value_label_list.slice(0, index)
            }
        })
        
        cate_obj.value = value_id_list.at(-1)
        cate_obj.label = value_label_list.join('>')
        // 判断资质是否过期
        if(qualification_status !== 0){
            cate_obj.disabled = true
        }

        return cate_obj
    },

    // 预测属性：===> 填充到页面
    Ceck_format:async()=>{

        var c_id = CATE.cate_value.value // id

        if(c_id == undefined || c_id == ''){
            tool.Fun_.message('error', '需要分类才能预测');
            return
        }
        var pic = Pic_Fun.get().split('|'); // 主图
        var title_name = Pic_Fun.name; // 标题

        // 请求接口
        var res = await axios.post(API.AppSrtoreAPI.dou_product.format_recommend,{
            "category_id":c_id,// 类目id-必填
            "img_urls":pic,// 商品图片-非必填
            "name":title_name// 商品标题-非必填
        })
        var checkformat_result_list = res.data.data.properties;
        checkformat_result_list.forEach(obj=>{
            var property_id = obj.property_id;
            var property_values_id = obj.property_values[0].value_id;
            Object.keys(CATE.format_formRef).forEach(key=>{
                if(key == property_id && property_values_id !== 0)(
                    CATE.format_formRef[key] = property_values_id
                )
            })
        })
    },

    // 清空商品属性
    Clear_format:()=>{
        Object.keys(CATE.format_formRef).forEach(key=>{
            CATE.format_formRef[key] = undefined
        })
    },

    // 度量衡 多选-上传商品json-转义
    de_m_v_m:(item, data)=>{

        // item参数参考值 data：获取值；
        // 我们将data选中得值id+百分比转义为提交新建商品得json数据格式

        var resultList = []
        let template_id = item.measure_templates[0].template_id;// 模板id
        let value_modules_list = item.measure_templates[0].value_modules; // 输入值的模板
        // console.log(value_modules_list)

        data.forEach(obj=>{

            var n_obj = {}
            let value_id = obj.value;// 选中的材质id
            let percentage = obj.percentage + '%'; // 百分比

            // 从 options 中查找对应的 name
            let selected = item.options.find(opt => opt.value_id === value_id)
            let name_text = selected?.name || '';
            let name = name_text + percentage; // 例如："name": "亚麻10%",
            // 第一层级
            n_obj.diy_type = 1;
            n_obj.value = 0;
            n_obj.name =  name;

            // 第二层级measure_info      
            n_obj.measure_info = {
                "values": [
                {
                    "module_id": value_modules_list[0].module_id,
                    "value": name_text,
                    "unit_id": 0
                },
                {
                    "module_id": value_modules_list[1].module_id,
                    "unit_name": value_modules_list[1].units[0].unit_name,
                    "unit_id": value_modules_list[1].units[0].unit_id,
                    "value": obj.percentage + ''
                }
                ],
                "template_id": template_id,
                "value_name": name
            }

            resultList.push(n_obj)
        })

        // console.log(resultList)
        return resultList

    },

    // 度量衡 单选 单值- 上传商品json-转义
    de_m_v_one:(item, data)=>{

        var resultList = []
        let value_modules = item.measure_templates[0].value_modules;
        let template_id = item.measure_templates[0].template_id;// 模板id
        let module_id = parseInt(Object.keys(data)[0]);
        let obj = data[module_id]
        // console.log('度量衡-单选-单值',obj)

        let selected = obj.op.find(opt => opt.unit_id === obj.unit_id)

        let unit_name = selected?.unit_name || '';

        // console.log('度量衡-单选-单值',unit_name)

        let name = obj.value + unit_name;  // 选中的材质id

        let n_obj = {
                    "measure_info": {
                        "template_id": template_id,
                        "values": [
                            {
                            "module_id": module_id,
                            "prefix": obj.prefix,
                            "suffix": obj.suffix,
                            "value": String(obj.value),
                            "unit_id": obj.unit_id,
                            "unit_name": unit_name
                            }
                        ]
                    },
                    "value": 0,
                    "diy_type": 1,
                    "name": name
        }

        resultList.push(n_obj)

        return resultList
    },

    // 度量衡 单选 多值-上传商品json-转义
    de_m_v_more:(item, data)=>{

        console.log('度量衡-单选-多值',item,data)

        var resultList = []
        let value_modules = item.measure_templates[0].value_modules;
        let demo = [
                {
                    "measure_info": {
                    "template_id": 126,
                    "values": [
                        {
                        "module_id": 185,
                        "prefix": "",
                        "suffix": "-",
                        "value": "300",
                        "unit_id": 38,
                        "unit_name": "cm"
                        }
                    ]
                    },
                    "value": 0,
                    "diy_type": 1,
                    "name": "300cm-"
                }
            ]
        return resultList
    },
    // 水洗标-吊牌图片
    add_img:(data)=>{
        var img_byte_url = data[0].byte_url
        CATE.category_property_pics.value = img_byte_url
        console.log(CATE.category_property_pics.value)
    },
    // 清除水洗标-吊牌图片
    clear_img:()=>{
        CATE.category_property_pics.value = undefined;
    }

}

// export const Predict_message = reactive({
//     pic:[],
//     name:'',
// })
// 预测类目==开始


// 通过执行Rule.get() 获取数据
export class ProductUpdateRule {

    senses=ref(undefined) // 闪购定制参数，普通发品忽略
    standard_brand_id=ref(undefined) // 品牌id
    spu_id=ref(undefined) // spu_id
    info=ref(undefined) // 发布规则信息对象

    // 获取发布规则
    get=()=>{

        // 判断类是否选择
        if (!CATE.cate_value.value) {
            tool.Fun_.message('info', '请先选择商品类目后，才能查看对应发布规则.')
            return
        }

        // console.log('当前类目', CATE.cate_value.value)

        axios.post(API.AppSrtoreAPI.dou_product.addrule, {

            category_leaf_id: CATE.cate_value.value,

        }).then((response) => {

            this.info.value = response.data.data; // 规则赋值

            // console.log(this.info.value)

        }).catch((error) => {

            console.log(error);

        });
    }

    // 商品标题推荐规则recommend_name_rule
    // 参考价相关规则reference_price_rule
    // 商品主图3:4配置规则main_image_three_to_four_rule

    // 售后服务规则after_sale_rule

    // 商品规格约束product_spec_rule

    // 商品尺码模板配置规则component_template_rule

    // sku规则sku_rule

    // 资质规则，类目属性影响资质必填和资质属性必填qualification_rule

    // spu管控规则spu_control_rule
    // 交易相关的规则trade_rule
    // 提取方式规则pick_up_method_rule
    // 金价信息gold_price_rule
    // 其他规则extra_rule
    // 商品【履约发货】

}
const productRule = new ProductUpdateRule() // 初始化 规格调用方法
// 获取商品发布规则方法===结束、


// 基础信息===========开始

// 基础信息【验证】
export const Basedata = reactive({

    freighttemplate_open:false,     // 运费模板-图片显示状态配置
    sizetemplate_open:false,        // 尺码模板-图片显示状态配置
    brand_list_open:false,          // 品牌列表-组件显示状态配置
    selectimg_open:false,           // 选择图片素材-组件显示状态配置
    setimg_name:undefined,              // 指定添加图片的对象

    // 变更添加素材类型
    change_material_type:(typeName)=>{
        Basedata.selectimg_open = true;
        Basedata.setimg_name = typeName; // 指定添加图片的对象
    },
    // 规格图片
    change_spec_imng_fun:(typeName, item)=>{
        Basedata.selectimg_open = true;
        Basedata.setimg_name = typeName; // 指定添加图片的对象
        Basedata.sku_img_obj = item;
    },
    // 选择尺码
    chang_sizetemplate:()=>{
        Basedata.sizetemplate_open = true;
    },

    // 选择运费模板
    chang_freighttemplate:()=>{
        Basedata.freighttemplate_open = true;
    },

    // 选择品牌
    change_brand_list:()=>{
        Basedata.brand_list_open = true;
    },

    // 选择运费模板==回调方法
    selectfreight_callback: (data)=>{
        // 填充id
        var f_id = data.id
        var f_name = data.name
        // 填充名称
        formState.freight_id.value = f_id
        formState.freight_id.name = f_name
        // console.log(formState.freight_id)
    },

    // 选择尺码模板==回调方法
    selectsizetemplate_callback: (data)=>{
        // 填充id
        var s_id = data.id;
        var s_name = data.name;
        // 填充名称
        formState.size_info_template_id.value = s_id
        formState.size_info_template_id.name = s_name
        // console.log(formState.size_info_template_id)
    },

    // 选择品牌回调方法
    selectbrand_callback: (data) => {
        // 填充id
        formState.standard_brand_id.brand_id = data.brand_id;
        formState.standard_brand_id.brand_name = data.name_cn;
        console.log(data)
    },

    // 选择图片回调
    Add_Callback:(data)=>{

        var type = Basedata.setimg_name;        // 添加类型
        if(type == 'long_img_List'){            // 判断回调type：：：3:4长图添加
            Longimg_Fun.add(data)               // 添加长图方法
        }else if(type == 'white_img'){          // 判断回调type：：：白底图添加
            whiteimg_Fun.add(data)              // 添加白底图方法
        }else if(type == 'video_info'){
            video_Fun.add(data)                 // 添加视频方法
        }
    },

    // 转移售后服务0-8
    after_sale_list:(data)=> {

        var value = "7-"+ data
        return {"supply_day_return_selector":value}
        // {value:0,name:'不支持退换'},
        // {value:1,name:'支持7天无理由退换'},
        // {value:2,name:'支持15天无理由退换'},
        // {value:3,name:'支持30天无理由退换'},
        // {value:4,name:'支持60天无理由退换'},
        // {value:5,name:'支持90天无理由退换'},
        // {value:6,name:'支持180天无理由退换'},
        // {value:7,name:'支持365天无理由退换'},
        // {value:8,name:'其他售后服务'}
    },

})

export const Base_formRef = ref();// 基础信息验证对象

// 表单数据绑定
export const formState = reactive({
    product_type:'0',               // 商品类别
    mobile:'18888888888',           // 客服电话
    name:undefined,                 // 商品标题
    recommend_remark:undefined,     // 推荐语：不能含emoj表情
    standard_brand_id:{brand_id: undefined, brand_name: undefined},    //品牌id
    pay_type:'1',                   // 支付类型
    freight_id:{"name":"包邮","value":0},           // 运费模板
    size_info_template_id:{"name":undefined,"value":undefined},// 尺码模板
    commit:'false',                 // 提交
    remark:undefined,               // 商家备注
    
    // 限购
    limit_per_buyer:undefined,          // 每个用户累计限购件数
    maximum_per_order:undefined,        // 每个用户每次下单限购件数
    minimum_per_order:undefined,        // 每个用户每次下单至少购买的件数

    // 导购短标题
    short_product_name:undefined,

    // 售后保障-7天无理由 "after_sale_service":"{\"supply_day_return_selector\":\"7-0\"}" 
    after_sale_service:"1",
    
})

// 基础信息验证规则
export const rules = {

    // 标题
    name: [
        {
            required: true,
            message: '商品标题不能为空',
            trigger: 'change',
        },
        {
            min: 4,
            max: 30,
            message: '至少4个汉字,不超过30个汉字,不能含emoj表情.',
            trigger: 'blur',
        },
    ],

    // 客服电话
    mobile:[{
            required: true,
            message: '客服电话不能为空',
            trigger: 'change',
    }],

    // 商品类型
    product_type:[{
        required: true,
        message: '类型不能为空!',
        trigger: 'change',
    }],

    // 支付方式
    pay_type:[
        {
            required: true,
            message: '支付方式不能为空!',
            trigger: 'change',
    }],

    // 提交方式
    commit:[
        {
            required: true,
            message: '提交方式不能为空!',
            trigger: 'change',
    }],
    // 运费模板
    freight_id:[
        {
            required: true,
            message: '运费模板不能为空!',
            trigger: 'change',
    }],
}

// 3:4长图
export const Longimg_Fun = {

    PicList:ref([]),
    // 删除长图
    del:(idx)=>{
        Longimg_Fun.PicList.value.splice(idx, 1);
    },
    // 添加长图
    add:(data)=>{
        data.forEach((obj,idx)=>{
            Longimg_Fun.PicList.value.push(obj)
        })
        if(Longimg_Fun.PicList.value.length > 5){
            Longimg_Fun.PicList.value = Longimg_Fun.PicList.value.slice(0, 5)
        }
    },
    // 获取长图
    get:()=>{

        var res = Longimg_Fun.PicList.value;

        if(res.length >0){

            var res_text = ''
            res.forEach((obj,index)=>{
                res_text = res_text + obj.byte_url  + '|'
            })

            return res_text.slice(0, -1)

        }else{
            return false
        }
    }
}

// 白底图
export const whiteimg_Fun={

    PicList:ref([]),

    // 删除白底图
    del:()=>{
        whiteimg_Fun.PicList.value.length = 0
    },
    // 添加白底图
    add:(data)=>{
        whiteimg_Fun.PicList.value.length = 0;
        var obj = data[0];
        var material_type = obj.material_type;
        if(material_type == 'photo'){
            var photo_info = obj.photo_info;
            var pic_width = photo_info.width;      // 宽度
            var pic_height = photo_info.height;     // 高度
            if(pic_width == pic_height){
                whiteimg_Fun.PicList.value.push(obj)
            }else{
                tool.Fun_.message('info','主图长宽比例需要1:1,不小于600X600.')
            }
        }else if(material_type == 'video'){
            tool.Fun_.message('info','【白底图】不能选择视频，请选择图片素材！')
        }
    },
    // 验证白底图
    get:()=>{
        var res = whiteimg_Fun.PicList.value;
        if(res.length >0){
            return res[0].byte_url
        }else{
            return false
        }
    }
}

// 视频video
export const video_Fun={

    PicList:ref([]),

    // 删除视频
    del:()=>{
        video_Fun.PicList.value.length = 0;
    },
    // 添加视频
    add:(data)=>{

        var obj = data[0]
        var material_type = obj.material_type; // 对象类型图片、视频

        // 判断添加素材类型：仅允许添加
        if(material_type == 'photo'){
            tool.Fun_.message('info', '请选择视频文件')
        }else if(material_type == 'video'){
            video_Fun.PicList.value.length = 0;
            video_Fun.PicList.value.push(data[0])
        }
    },
    get:()=>{

        var res = video_Fun.PicList.value;

        if(res.length >0){
            
            return res
        
        }else{
        
            return false
        
        }
    }
}

// 基础信息===========结束



// 商品属性




// 商品发布规则：跟随分类id变化
// 支持那些必填字段
// 字段的输入规范（长度、格式等）
// 点击[预测商品类目Check_Cate]=>获取到类目触发加载规则==ok 赋值[Rule.category_id.value]
// 请求属性:加载到列表[loadFormat]=>触发加载规格==ok 赋值[Rule.category_id.value]
// 监听类目赋值成功后：：启用TAB选项卡：：watch(CATE.cate_value ,(newVal, oldVal)=>{})
// 点击【库存发货】选项卡后click_tab，加载可用发货模式
// 对应读取发货规则,渲染可用发货表单Fulfillment.load


// 【现货发货说明】
// 发货模式：：presell_type=1 
// 承诺发货时间，在现货模式下填写。delivery_delay_day： 承诺发货时间，单位是天,不传则默认为2天。现货发货(presell_type=0)模式下，支持传入9999 、1、 2 （分别表示当日发、次日发、48小时发），具体支持传入的参数范围：/product/getProductUpdateRule。

// 【新-现货+预售说明】
// 现货+预售(逐步下线)：  presell_type=1&&presell_config_level=2；
// 阶梯发货模式(逐步下线)： presell_type=2&&new_step_product=false；
// 上述两种方式的升级版 - (新)现货+预售： presell_type=2&&new_step_product=true；











// 履约发货=========开始
// 发货模式 presell_type ，0-现货发货，1-预售发货，2-阶梯发货，默认0
export const presell_formdata = reactive({
    // 发货模式==字段开始
    presell_type: 0, // 发货模式，0-现货发货，1-预售发货，2-阶梯发货，默认0
    presell_config_level: 0, // 默认0，0：全款预售，1：sku预售，2：现货+预售 ，3：新预售
    // 发货模式 tab list
    options:[
        {
            label: '现货发货',
            value: 0,
            name:'normal_rule',
            disabled:false // 禁用状态
        },
        {
            label: '现货预售混合发货',
            value: 2,
            name:'step_rule',
            disabled:false
        },
        {
            label: '预售发货',
            value: 1,
            name:'product_presell_rule',
            disabled:false
        }
    ],
    reduce_type:1,// 减库存类型：1-拍下减库存 2-付款减库存 number
    reduce_options:[
        {
            label: '拍下减库存',
            value: 1
        },
        {
            label: '付款减库存',
            value: 2
        }
    ]
})

// 现货表单
export const spot_formdata = reactive({
    // 现货发货
    delivery_delay_day:'9999',// 现货承若发货时间
    //现货发货 承若发货时间--下拉选项
    delay_op:[{
        label: '当日发',
        value: '9999',
    },{
        label: '次日发',
        value: '1',
    },{
        label: '48小时发',
        value: '2',
    }],
})

// 现货表单规则
export const spot_formdata_rule = {
    // 现货发货承若时间
    delivery_delay_day:[{
        required: true,
    }],
}

// 预售表单
export const presale_formdata =  reactive({

    // 现货发货
    delivery_delay_day:'9999',// 现货承若发货时间
    //现货发货 承若发货时间--下拉选项
    delay_op:[{
        label: '当日发',
        value: '9999',
    },{
        label: '次日发',
        value: '1',
    },{
        label: '48小时发',
        value: '2',
    }],

    presell_end_time: undefined, // 预售结束时间
    presell_end_time_status:false,// 是否需要选择结束时间点
    time_selected:0, // 选择发货时间方式
    time_end_op:[
        {
            label: '设置预售结束时间',
            // 预售结束后发货 presell_delivery_type=0 需要传值presell_end_time
            value: 0},
        {
            label: '无预售结束时间',
            // 支付完成后发货 presell_delivery_type=1 不需要传值presell_end_time
            value: 1
        },
    ],

    presell_delivery_type: 0,  // 全款预售和sku预售时传递，其他不传： 0 预售结束后发货 1支付完成后发货
    delivery_op:[{
        label: '预售结束后',
        value: 0
    },{
        label: '支付完成后',
        value: 1
    }],

    presell_delay: '5', //预售承诺发货时间
    
    // 预售时间点==presell_end_time 最多支持设置距离当前30天
    get_end_time:(value)=>{

        let str = value?.format('YYYY-MM-DD HH:mm:ss') || undefined;
        // 获取当前天数
        // 获取 支付结束后 && 预售结束后
        // 获取最长预售结束时间 Rule.info
        presale_formdata.presell_end_time = str

    },
    // 设置预售时间方式
    set_time_selected:(value)=>{

        // 为1，无需设置时间点-支付完成后-指定天数发货
        if(value == '1'){
            presale_formdata.presell_delivery_type = 1
            presale_formdata.delivery_op.forEach(item=>{
                if(item.value == 0){
                    item.disabled = true;
                }
            })
            presale_formdata.presell_end_time_status = true;
            presale_formdata_rule.presell_end_time[0].required = false; // 非必填
        }else if(value == '0'){
            // 为0，需要设置结束时间-预售结束后-指定天数发货
            presale_formdata.presell_end_time_status = false;
            presale_formdata.delivery_op.forEach(item=>{
                if(item.value == 0){
                    item.disabled = false;
                }
            })
            presale_formdata_rule.presell_end_time[0].required = true; // 必填
        }
    }
})

// 预售表单规则
export const presale_formdata_rule = {
    delivery_delay_day:[{
        required: true,
    }],
    time_selected:[{
        required: true,

    }],
    presell_end_time:[{
        required: true,
        message: '时间不能为空!',
        trigger: 'change',
    }],
    presell_delay:[{
        required: true,
        message: '不能为空!',
        trigger: 'change',
    }]
}

// 新-现货+预售 混合发货表单
export const step_formdata = reactive({

    // 现货发货
    delivery_delay_day:'9999',// 现货承若发货时间

    //现货发货 承若发货时间--下拉选项
    delay_op:[{
        label: '当日发',
        value: '9999',
    },{
        label: '次日发',
        value: '1',
    },{
        label: '48小时发',
        value: '2',
    }],
    
    presell_delay:[],

    de_op:[],

})

// 新-现货+预售 规则
export const step_formRef = ref();
export const step_formdata_rule = {
    delivery_delay_day:[{
        required: true,
    }],
    // 新现货+预售发货模式
    presell_delay:[{
        required: true,
        message: '不能为空!',
        trigger: 'change',
        type: 'array',        // 必须是数组类型
        min: 1,               // 数组长度至少为1
    }]

}

// 履约方法
export class Fulfillment {

    // 加载履约方式：：渲染支持的发货方式
    load(){

        var data_obj = toRaw(productRule.info.value)

        console.log('发货模式-读取规则',data_obj)

        var fulfillment_rule = data_obj.fulfillment_rule

        Object.keys(fulfillment_rule).forEach(key=>{

            let obj = fulfillment_rule[key]

            let support = obj.support;// 是否支持

            // 设置支持的发货模式
            // presell_formdata.options.forEach(item=>{
            //     if(item.name === key){
            //         item.disabled = !support
            //     }
            // })

            if(key === 'normal_rule' && support === true){
                // 现货发货表单渲染方法
                this.rendering_normal(obj)
            }else if(key === 'step_rule' && support === true){

                // 阶梯发货模渲染方法
                this.step_rule(obj)

            }else if(key === 'product_presell_rule' && support === true){
                // 全款预售发货渲染方法
            }
        })
    }

    // 渲染【现货]】表单初始值
    rendering_normal(data){
        console.log('现货发货', data)
    }

    // 渲染【全款预售】表单
    rendering_product_presell(data){
        console.log('全款预售发货', data)
    }

    // 渲染【现货+预售】表单
    step_rule(data){
        let step_delay_options = data.delay_options; // 现货时效
        let multi_times = data.multi_times;// 渲染预售发货时效
        step_formdata.de_op = [] // 清空
        step_formdata.presell_delay = [multi_times[0].time_type];
        multi_times.forEach(item=>{
            item.value = item.time_type;
            item.label = item.time_desc;
            step_formdata.de_op.push(item)
        })
    }

    // 获取 发货模式 表单值
    get_presell(){

        if(presell_formdata.presell_type==0){// 现货

            let obj = {
                reduce_type:presell_formdata.reduce_type, // 减库存类型
                presell_type:0,
                delivery_delay_day:spot_formdata.delivery_delay_day
            }

            console.log('现货', obj)

            return obj

        }else if(presell_formdata.presell_type==1){// 全款预售

            let obj = {
                reduce_type:presell_formdata.reduce_type,// 减库存类型
                presell_type:1,
                presell_config_level:0,
                presell_delivery_type:presale_formdata.presell_delivery_type, // 0 预售结束后发货(不超过当前距离30天) 1支付完成后发货(无需结束时间点)
                presell_end_time:presale_formdata.presell_end_time,
                presell_delay:presale_formdata.presell_delay
            }

            console.log('全款预售', obj)
            return obj
        }else if(presell_formdata.presell_type==2){// 新现货+预售
            
            // 验证表单
            step_formRef.value.validate().then(() => {
                
                let obj = {
                    reduce_type:presell_formdata.reduce_type,// 减库存类型
                    presell_type:2,
                    presell_config_level:0,
                    delivery_delay_day:step_formdata.delivery_delay_day,
                }
                console.log('新-现货+预售',obj)

                return obj

            }).catch(err => {
                
                // 指定tab 到 库存发货
                console.log('校验失败', err);
                
                return

            });
            
            // spec_prices_v2.stock_num传现货库存
            // spec_prices_v2.multi_time_stocks数组传各个时效库存

        }

    }

    // 预售库存
    get_same_value(value){
        console.log(value)
    }
}

// ===============================履约结束



// 库存===开始
export const skulistRef = ref(); // 验证库存表单
export const skulist_formState = reactive({
    skucolumns:[],
    skudatelist: []
})

// 库存批量操作表单
export const stock_operation_formdata = reactive({
    spec:[],// 规格树
    price:undefined,// 价格
    stock:undefined,// 现货库存
    presale:[],// 预售类型
    presale_stock:undefined,// 预售库存
    code:undefined// 编码
})

// 现货库存 预售库存 批量设置价格 批量设置现货库存 批量设置预售库存
export class StockFun {

        sepec_info = SPECS.Obj; // 规格详情

        multi_time_list=reactive([])// 预售库存表单绑定

        // 获取SKU信息
        get_specs = () =>{
            let a = this.get_colums()
            let b = this.get_data()
            console.log('规格信息',a)
            console.log('规格信息',b)
        }

        // 笛卡尔积方法sku_value数组取值
        get_value_sku_list = () =>{
            
            var res_list = []

            var datalist = this.sepec_info;
            
            // 规格取值
            for(let i of datalist){
                var v_list = []
                for(let y of i.values){
                    v_list.push(y.value_name)
                }
                res_list.push(v_list)
            }

            // 笛卡尔积方法
            var d_list = tool.Fun_.cartesianProduct(res_list)

            return d_list

        }

        // comlum表头取值
        get_colums=() =>{

            var name_list = this.get_name_sku_list()

            var res_list = []

            for(let i of name_list){
                let c_obj = {}
                c_obj.title = i;
                c_obj.dataIndex = i;
                if(i){res_list.push(c_obj)}
            }

            if(res_list.length>0){
                let price_obj = {title:'价格',dataIndex:'price',width:'140px'}
                let stock_num_obj = {title:'库存',dataIndex:'stock_num',width:'140px'}
                let code_obj = {title:'编码',dataIndex:'code',width:'140px'}
                res_list.push(price_obj)
                res_list.push(stock_num_obj)
                res_list.push(code_obj)
            }

            return res_list

        }

        // 规格表单data取值(实时)
        get_data = () =>{

            var name_list = this.get_name_sku_list()//名称列表

            var d_list = this.get_value_sku_list()// 笛卡尔积-值列表

            // 发货模式：现货、预售+现货 返回不一样的结果
            
            var data_list = []

            for(let y of d_list){

                var y_text_name = y.join('')

                var data = {}

                for(var i=0;i<name_list.length;i++){

                    data[name_list[i]] = y[i];
                    data['price'] = ''; // 价格
                    data['stock_num'] = '';// 库存
                    data['open'] = ref(false) // 预售库存弹窗状态
                    data['multi_time_stocks'] = reactive([])//  预售库存表单
                    

                }

                if(y[0]){data_list.push(data)}
                
            }

            return data_list

        }

        // 提取sku的name数组
        get_name_sku_list = () =>{
            var name_list = []
            var datalist = this.sepec_info;
            for(let i of datalist){
                name_list.push(i.property_name)
            }
            return name_list
        }

        // 提取-初始情况下-sku_价格、库存
        get_p_s_obj = () => {
            var res_obj = {}
            for(let i of this.sepec_info){
                for(let y of i.values){
                    if(y.price != undefined){
                        var p_s_obj = {}
                        p_s_obj.price === undefined ? '':y.price
                        p_s_obj.stock_num === undefined ? '':y.stock_num
                        p_s_obj.code = y.code === undefined ? '':y.code
                        res_obj[y.value] = p_s_obj
                    }
                }
            }
            return res_obj
        }
        
        // 获取库存验证
        get_sku_list = async()=>{

            // 库存未初始化
            if(skulistRef.value === undefined){

                tool.Fun_.message('error', '库存信息不能为空！');

                return false

            }

            // 库存以及初始化：：现货、全款预售、现货+预售(混合模式)
            var res = await skulistRef.value.validate().then(()=>{

                var sku_list_res = skulist_formState.skudatelist;

                if(presell_formdata.presell_type === 0){// 0 现货 
                    
                    console.log('获取现货')

                }else if(presell_formdata.presell_type === 1){// 1 全款预售
                    
                    console.log('全款预售')

                }else if(presell_formdata.presell_type === 2){// 2 现货+预售
                    
                    console.log('现货+预售')

                }

                var s_list = []

                sku_list_res.forEach(obj=>{

                    var o = {}

                    var sell_obj = []

                    Object.keys(obj).forEach(key=>{
                        let clear_list = ['stock_num','price','open','code','multi_time_stocks']
                        if(!clear_list.includes(key)){
                            var s_obj = {}
                            s_obj.property_name = key;
                            s_obj.value_name = obj[key]
                            sell_obj.push(s_obj)
                        }
                    })

                    o.sell_properties = sell_obj; //名称对象
                    o.sku_type = 0;
                    o.stock_num = obj.stock_num;
                    o.price = obj.price * 100;// 价格转换为分
                    o.code = obj.code; // 商家编码
                    s_list.push(o)

                })

                console.log(s_list)

                return s_list

            }).catch(error => {// 验证表单错误

                console.log(error)
                
                tool.Fun_.message('error',error.errorFields[0].errors[0]);
                
                return false
            
            })

            // 提交数据格式
            let spec_prices_v2 = [
                {
                    "spec_detail_name1": "全黑色",
                    "spec_detail_name2": "",
                    "spec_detail_name3": "",
                    "stock_num": 11, // 现货库存
                    "price": 100,
                    "code": "",
                    "supplier_id": "", // 供应商ID
                    "outer_sku_id": "",// 外部sku id
                    "delivery_infos": [
                        {
                            "info_type": "weight",
                            "info_value": "100",
                            "info_unit": "mg"
                        }
                    ],
                    "multi_time_stocks": [ // 时效库存，替代原阶梯库存step_stock_num字段
                        {
                            "time_type": 25,      // 时效类型，25天内发货
                            "time_desc": "25天内发货", // 时效描述
                            "stock_num": 100      // 库存数
                        },
                        {
                            "time_type": 30,
                            "time_desc": "30天内发货",
                            "stock_num": 10
                        }
                    ]
                }
            ]

            return res
        }

        // 批量设置库存
        batch_set = () =>{

            // console.log('批量设置的表单',stock_operation_formdata)
            // console.log('被修改的skuList',skulist_formState.skudatelist)

            let price = stock_operation_formdata.price
            let stock = stock_operation_formdata.stock
            let presale_stock = stock_operation_formdata.presale_stock // 预售库存数量
            let code = stock_operation_formdata.code

            skulist_formState.skudatelist.forEach(item=>{
                // 设置价格
                if(price){item.price =Number(price).toFixed(2)}
                // 设置现货库存
                if(stock){item.stock_num = Number(stock)}
                // 设置预售库存数量
                if(presale_stock){item.multi_time_stocks.forEach(obj=>{obj.stock_num = presale_stock})}
                // 设置商家编码
                if(code){item.code = code}
            })

            // ✅ 手动触发验证
            nextTick(() => {
                skulistRef.value?.validate()
            })
        }

        // 全部清除
        clear_all=()=>{
            stock_operation_formdata.spec=[],// 规格树
            stock_operation_formdata.price=undefined,// 价格
            stock_operation_formdata.stock=undefined,// 现货库存
            stock_operation_formdata.presale=[],// 预售类型
            stock_operation_formdata.presale_stock=undefined,// 预售库存
            stock_operation_formdata.code=undefined// 编码
        }

        // 预售库存[切换]
        change_presale=(skumodel)=>{

            // 判断预售库存colums是否存在
            const index = skulist_formState.skucolumns.findIndex(item => item.title === '库存')
            
            // 预售+现货混合模式且表头不为空（sku信息）
            if(presell_formdata.presell_type === 2 && index > -1){

                let presale_num_obj = {title:'预售库存',dataIndex:'presale_stock_num',width:'140px'}
                
                // 如果预售库存表头不存在插入
                if(!skulist_formState.skucolumns.some(item => item.title === '预售库存')){

                    // 插入预售库存表头到库存后面
                    skulist_formState.skucolumns.splice(index + 1, 0, presale_num_obj)
                    
                    console.log(skulist_formState.skucolumns)

                }

            }else{// 删除'预售库存表头'

                const index = skulist_formState.skucolumns.findIndex(item => item.title === '预售库存')

                if(index > -1){
                    skulist_formState.skucolumns.splice(index, 1)
                }

            }

        }

        // 勾选预售发货时效=设置时效库存数量弹出窗口
        set_presale_stock = (item) =>{

            // console.log(item.open)

            // 预售库存初始化
            console.log('预售发货时效', step_formdata.presell_delay)

            if(step_formdata.presell_delay.length>0){
                
                // 增量添加值
                step_formdata.presell_delay.forEach(value=>{
                    
                    console.log(value)

                    // 查找选中的时效value
                    var multi_res =  item.multi_time_stocks.find(items=>items.time_type === value)
                    
                    // 时效已存在：库存值不变
                    if(multi_res){
                        
                    }else{// 时效不存在：添加
                        var m_obj = {
                            "time_type": value,      // 时效类型，25天内发货
                            "time_desc": value + "天内发货",
                            "stock_num": 0      // 库存数
                        }
                        item.multi_time_stocks.push(m_obj)
                    }
                })

                // 清理不需要的值
                // 方法1: filter 生成新数组（推荐）
                const remaining = item.multi_time_stocks.filter(obj => step_formdata.presell_delay.includes(obj.time_type));
                // console.log(remaining)
                remaining.sort((a, b) => a.time_type - b.time_type);// 按time_type排序
                item.multi_time_stocks = remaining


            }

            item.open = true; // 开启弹窗

        }

        // 预售发货时效 添加库存
        same = () =>{

            // 触发条件 ：：：发货模式为预售 presell_type === 2：且：colums 不为空
            // 添加表头
            // 添加数据列-查看预售库存
            console.log('发货方式',presell_formdata.presell_type)

            // 预售发货时效
            // console.log('预售发货时效', step_formdata.presell_delay)
            
            // colums
            // 触发预售库存，添加预售库存选择栏目
            // console.log('表头',this.get_colums())

            // datalist
            // 触发预售库存，添加可输入库存表单
            console.log('sku数据',skulist_formState.skudatelist.length)

            


        }

        // 现货数据数据获取
        get_spot = (sku_list_data)=>{

            // 减库存方式reduce_type & 发货模式 presell_type
            console.log(sku_list_data)

            // 库存数据spec_prices_v2 数组
            console.log(sku_list_data)
        }

        // 现货+预售数据获取
        get_spot_presale = (sku_list_data)=>{
            // 减库存方式reduce_type & 发货模式 presell_type
            // 库存数据spec_prices_v2 数组

        }

        // 全款预售数据获取
        get_presale = (sku_list_data)=>{
            // 减库存方式reduce_type & 发货模式 presell_type
            // 库存数据spec_prices_v2 数组
        }


}
// 库存===结束

// 资质方法===开始

export class Quality  {
    
    rule = productRule.info.value;
    list = ref([]); // 列表数据源头

    // 素材组件参数
    selectimg=reactive(
        {
            selectimg_open:false,     // 素材组件开启状态
            key:undefined          // 选择图片对象：key：name：
        }
    )

    add = {

        // 加载页面
        load:()=>{

            let quality_rules_list = this.rule.qualification_rule;

            quality_rules_list.forEach(item=>{

                this.list.value.push(item)
                // console.log(item.name,item)

            })

        },
        // 选择图片::加载素材组件
        load_img:(key)=>{
            
            this.selectimg.selectimg_open = true;
            this.selectimg.key = key;

        },
        // 选择素材组件：：回调方法->图片url加载到页面
        callbak:(data)=>{

            let material_type = data[0].material_type;// 验证仅支持图片素材
            if(material_type === 'video'){// 非图片提示 return
                
                tool.Fun_.message('info','请选择图片素材,资质仅支持图片格式。')
                return

            }else if(material_type === 'photo'){
                this.list.value.forEach(item=>{
                    if(item.key == this.selectimg.key){
                        console.log(data)
                        item.byte_url = data[0].byte_url
                    }
                })
            }

        },
        // 移除图片
        del_img:(item)=>{
            delete item.byte_url
        },
        // 获取资质图片方法：返回
        get_quality_image_result:()=>{

            var quality_list = [];

            // 结果绑定对象
            let quality_rules_list = this.rule.qualification_rule;

            quality_rules_list.forEach(item=>{

                let is_required = item.is_required; // 是否必填
                let byte_url = item.byte_url
                let key = item.key
                let name = item.name

                // 必填且值为空，提示完成必填
                if(is_required === true && byte_url === undefined){

                    tool.Fun_.message('error',name + '资质图片不能为空！')

                    return false

                }else if(byte_url !== undefined){

                    var res_obj = {
                        quality_key:item.key,
                        quality_name:item.name,
                        quality_attachments:{
                            url:item.byte_url,
                            media_type:1
                        }
                    }

                    quality_list.push(res_obj)

                }
            })

            if(quality_list.length>0){
                console.log(quality_list)
                return quality_list
            }else{
                return false
            }
            

        }

    }

    edit = {

    }

}

// 资质方法===结束

// 自定义规格===开始
export const sku_formRef = ref()
export const SPECS = reactive({
        
        SpecImag:true,// 是否添加规格图片

        spec_image_index:{// 规格值 图片url对象index
            index:undefined,
            spec_value_index:undefined,
        },

        // 规格数据对象
        Obj:ref([
            {
                property_name:undefined,
                values:[{
                    value_name:undefined,  // 值名称
                    url:undefined          // 规格图片
                }],
            }
        ]),

})

//系统推荐==表单数据格式
export const sku_diy_formRef = ref()
export const SPECS_DIY = reactive({

    image_checked:true, // 规格图片

    // 规格数据对象
    Obj:[],

})

export class Spec {


    rule = productRule.info.value;// 规格-规则

    // 规格模式：自定义模式、系统推荐模式
    type_formdata = reactive({

        selectimg_open:false,// 素材组件状态

        support_property_diy:0,

        support_property_options:[
            {
                label: '自定义规格',
                value: 0,
                disabled:false // 禁用状态
            },
            {
                label: '系统推荐规格',
                value: 1,
                disabled:false
            },
        ],
        // 勾选中的推荐规格
        selected_value_list:[],
        // 勾选显示推荐规格
        selected_diy_spec_options:[],
        // 切换规格选择模式
        change_spec_model:()=>{
            let model_style = this.type_formdata.support_property_diy
            if(model_style === 0){// 0 自定义规格

            }else if(model_style === 1){// 1 推荐规格
                
            }

            

        }
    })



    // 自定义 add
    add={

        load:()=>{

        },

        // 查看规则
        get_rule:()=>{
            console.log(this.rule)
        },

        // 添加规格
        insert:() =>{

            var obj_number = SPECS.Obj.length;

            if(obj_number>=3){
            
                tool.Fun_.message('info','规格最多不能超过三组！');
                
                return false

            }else if(obj_number == 0){

                SPECS.Obj.push({
                    property_name:undefined,
                    values:[{
                        value_name:undefined,   // 值名称
                        url:undefined           // 图片地址
                    }],
                })

            }else if(obj_number >= 1){

                SPECS.Obj.push({
                    property_name:undefined,
                    values:[{
                        value_name:undefined,       // 值名称
                    }],
                })
            }
        },

        // 删除规格
        del:(item)=>{

            let index = SPECS.Obj.indexOf(item);
            if (index !== -1) {
                SPECS.Obj.splice(index, 1);
            }
        },

        // 添加规格值
        pushvalue:(data)=>{

            var value_number = SPECS.Obj[data].values.length;

            if(value_number >= 20){
                tool.Fun_.message('error', '规格值最多不能超过20组！')
                return false
            }else{
                SPECS.Obj[data].values.push({
                    value_name:undefined,// 值名称
                    url:undefined//
                });

            }
        },

        // 删除规格值
        removevalue:(item,data)=>{
            let index = SPECS.Obj[data].values.indexOf(item);
            if (index !== -1) {
                SPECS.Obj[data].values.splice(index, 1);
            }
        },

        // 点击勾选
        SpecImagState_change_fun:()=>{SPECS.SpecImag = !!SPECS.SpecImag},

        // 选择规格图片
        add_img:(data)=>{
            var img_byte_url = data[0].byte_url
            PAGEDATA.sku_img_obj.url = img_byte_url
        },

        // 清除规格图片
        remove_img:(item)=>{
            item.url = ''
        },
        // 获取自定已规格
        get_specs_obj: async()=>{

            // 打印选择得规格模式
            console.log('规格模式',this.type_formdata.support_property_diy)

            // 验证规格
            var res = await sku_formRef.value.validate().then(() => {

                var spec_list = toRaw(SPECS.Obj)  // 

                var spece_value_number = spec_list[0].values.length;// 主规格值 数量;

                var spec_img_list = [] // 规格图片列表

                spec_list[0].values.forEach((obj, index)=>{// 迭代规格图片

                    var o_img_u = obj.url;

                    if(o_img_u !== undefined && o_img_u !== ''){
                        spec_img_list.push(obj.url)
                    }

                })

                var s_img_number = spec_img_list.length; // 主规格值图片数量;

                // 如果需要上传图片
                if(SPECS.SpecImag){

                    if(spece_value_number == s_img_number){

                        var spec_pic = spec_img_list.join(',');// 规格图片:图片数量需要好与主规格值数量一直

                    }else{

                        tool.Fun_.message('error', '规格图片需要填写，图片数量要与规格数量一致！');

                        return false
                    }
                }

                var copy_list = structuredClone(spec_list)// 拷贝

                copy_list[0].values.forEach((obj,index)=>{delete obj.url;})// 删除url键值

                var result = {"spec_pic": spec_pic, "spec_values":copy_list}// 规格文案对象获取
                console.log(result)
                return result

            }).catch( error => {

                tool.Fun_.message('error', '规格信息不能为空！');// 规格错误提示
                
                return false

            })

            return res
        },
        // 选择素材
        change_spec_img_fun:(index, spec_value_index)=>{
            this.type_formdata.selectimg_open = true;
            SPECS.spec_image_index.index = index;
            SPECS.spec_image_index.spec_value_index = spec_value_index;
            // console.log(SPECS.Obj[index].values[spec_value_index])
        },
        // 选择素材=>回调方法
        select_spec_ima_call_back:(data)=>{
            console.log(data)
            let material_type= data[0].material_type;
            let index = SPECS.spec_image_index.index;
            let spec_value_index = SPECS.spec_image_index.spec_value_index;
            if(material_type === 'photo'){
                SPECS.Obj[index].values[spec_value_index].url = data[0].byte_url;
            }else{
                tool.Fun_.message('info','请选择图片素材！')
            }

            console.log(SPECS.Obj[index].values[spec_value_index])

        }
    }

    // 推荐 add
    recommendation_add={

        load:()=>{

            console.log('初始化规格')
            let max_spec_num_limit = this.rule.max_spec_num_limit;// 最大可选规格数量
            
            // 初始化 推荐规格可选项目
            this.recommendation_add.set_load_selected();

            // 初始化 推荐规格表单配置
            this.recommendation_add.set_load_spec_diy_obj();
        },

        // 推荐规格可选项目
        set_load_selected:()=>{

            let max_spec_num_limit = this.rule.max_spec_num_limit;// 最大可选规格数量
            
            console.log(this.rule)

            return

            this.rule.required_spec_details.forEach((obj, index)=>{

                let name = obj.sell_property_name

                let dit_obj = {
                    label:name,
                    value:name
                }

                // 勾选最大数量
                if(index <= max_spec_num_limit-1){

                    dit_obj.disabled = false;
                    this.type_formdata.selected_value_list.push(name);
                    this.rule.required_spec_details[index].disabled = false; // 显示规格

                }else{

                    dit_obj.disabled = true;// 隐藏规格
                }

                // 初始化可选规格
                if(!this.type_formdata.selected_diy_spec_options.some(n=>n.label === name)){
                    this.type_formdata.selected_diy_spec_options.push(dit_obj)

                }

            })
        },

        // 推荐规格表单配置
        set_load_spec_diy_obj:()=>{
            
            let max_spec_num_limit = this.rule.max_spec_num_limit;// 最大可选规格数量
            
            console.log(this.rule)

            return

            // 迭代 推荐规格
            this.rule.required_spec_details.forEach((obj, index)=>{

                let name = obj.sell_property_name

                let o = {
                    property_name:name,
                    values:[{
                        value_name:undefined,  // 值名称
                        url:undefined          // 规格图片
                    }],
                    disabled:false
                }

                if(!SPECS_DIY.Obj.some(r=>r.property_name ===name)){

                    // 添加最大允许数量的规格 为显示状态
                    if(SPECS_DIY.Obj.length < max_spec_num_limit){

                        SPECS_DIY.Obj.push(o)

                    }else{ // 添加超出数量的规格 为隐藏状态
                        
                        o.disabled = true;

                        SPECS_DIY.Obj.push(o)
                    }

                }
            })
            console.log(SPECS_DIY.Obj)

        },

        // need_paging_query_value 是否需要二次查询规格值
        // 二次查询/product/getCategoryPropertyValue
        // 入参
        // {
        //  "category_id": 20219,
        //     "property_id": 4704,
        //     "page_size":0,
        //     "page_num":2000
        // }

        // value_display_style 规格样式，cascader是为导航样式
        
        
        // 勾选自定义规格
        change_selected:(value)=>{

            // console.log(value)

            let max_spec_num_limit = this.rule.max_spec_num_limit;// 最大可选规格数量
            
            // 仅支持勾选最大数量效验
            if(value.length < max_spec_num_limit){ // 小于最高规格数，全部可选
                
                // 勾选框状态全部可选
                this.type_formdata.selected_diy_spec_options.forEach(o=>o.disabled=false)
                
            }else if(value.length >= max_spec_num_limit ){ // 大于等于规格数，超出部分禁用
                
                // 勾选框状态，超出部分禁止
                this.type_formdata.selected_diy_spec_options.forEach(o=>{
                    if(!value.includes(o.label)){o.disabled=true}
                })
                
            }

            // 列表对应勾选规格 显示状态设置 显示选中的规格
            SPECS_DIY.Obj.forEach(r=>{
                if(value.includes(r.property_name)){
                    r.disabled=false;
                }else{
                    r.disabled=true;
                }
            })
            

            
        },
        // 添加值
        add_value:(index)=>{
            console.log('添加值', index)
            var value_number = SPECS_DIY.Obj[index].values.length;

            if(value_number >= 20){
                tool.Fun_.message('error', '规格值最多不能超过20组！')
                return
            }else{
                SPECS_DIY.Obj[index].values.push({
                    value_name:undefined,// 值名称
                    url:undefined//
                });
            }
        },
        // 删除值
        del_value:(index,spec_value_index)=>{
            console.log('删除值', index, spec_value_index)
            SPECS_DIY.Obj[index].values.splice(spec_value_index, 1);
        },
        // 获取推荐规格
        get_spec_diy_obj:()=>{

            sku_diy_formRef.value.validate().then(() => {
                
                console.log(SPECS_DIY.Obj)

                // 过滤隐藏的规格



            }).catch( error => {

                tool.Fun_.message('error', '规格信息不能为空！');// 规格错误提示
                
                return false

            })
        }
    }

}

// 规格===结束


// 上传商品类
export class UploadProduct {

    // 获取基础信息
    get= async ()=>{

        var product_data_obj = {} // 商品上传JSON

        try{

            await Base_formRef.value.validate() // 验证基础信息表单

            // 验证商品属性

            // 验证商品规格

            // 验证库存发货

            // 验证描述详情

            this.get_base_info(product_data_obj)// 基础信息验证

        }catch (error) {
            
            console.log('验证失败', error)

        }

    }


    // 基础信息 获取
    get_base_info=(product_data_obj)=>{

        // 主图验证
        if(Pic_Fun.get()){// 不为空
            product_data_obj.pic = Pic_Fun.get()
        }else{
            tool.Fun_.message('error','主图不能为空！')
            // activeKey.value = '1'
            return
        }

        // 白底图
        if(whiteimg_Fun.get()){
            product_data_obj.white_back_ground_pic_url = whiteimg_Fun.get();// 白底图：url(仅素材中心url有效)，白底图比例要求1:1
            console.log('白底图', whiteimg_Fun.get())
        }

        // 长图
        if(Longimg_Fun.get()){
            product_data_obj.long_pic_url = Longimg_Fun.get();// 长图
            console.log('长图', Longimg_Fun.get())
        }

        // 视频信息
        if(video_Fun.get()){
            var video_obj = video_Fun.get()
            var material_video_id = video_obj[0].video_info.vid;
            product_data_obj.material_video_id = material_video_id;// 视频id
            // console.log('视频素材id', material_video_id)
        }

        // 分类
        var cate_obj = CATE.get_cate()
        if(cate_obj){
            // 正常获取分类
            product_data_obj.category_leaf_id = cate_obj;
        }else{
            return
        }

        // 正常获取
        product_data_obj.name = Pic_Fun.name;              // 标题-必填
        product_data_obj.product_type = formState.product_type;  // 商品类型-必填
        product_data_obj.recommend_remark = formState.recommend_remark;// 推荐语
        product_data_obj.remark = formState.remark;              // 商家备注
        product_data_obj.pay_type = formState.pay_type;          // 支付方式
        product_data_obj.mobile = formState.mobile;              // 电话
        product_data_obj.freight_id = formState.freight_id.value;// 运费模板
        product_data_obj.size_info_template_id = formState.size_info_template_id.value// 尺码模板
        product_data_obj.standard_brand_id = formState.standard_brand_id.brand_id;// 品牌id
        product_data_obj.minimum_per_order = formState.minimum_per_order; // 最少下单购买件数
        product_data_obj.maximum_per_order = formState.maximum_per_order; // 最多下单购买件数
        product_data_obj.limit_per_buyer = formState.limit_per_buyer; // 累计购买件数
        product_data_obj.short_product_name = formState.short_product_name;// 导购短标题
        product_data_obj.after_sale_service = Basedata.after_sale_list(formState.after_sale_service);//售后服务

        console.log('获取基础信息，验证通过', product_data_obj)
    }
    
    // 获取属性信息
    get_attr_info=(product_data_obj)=>{
        // 吊牌、水系标图片
        // 属性结果
    }
    // 获取规格信息



    // 发布上线
    upload=()=>{

    }

    // 放入草稿
}