import { defineComponent,reactive,ref,shallowRef,onMounted,defineAsyncComponent,toRaw } from 'vue';
import axios from 'axios'; // 网络请求
import * as TOOL from '@/assets/JS_Model/tool';// 常用工具
import * as utils from '@/assets/JS_Model/public_model';// 接口地址配置
import { selectProps } from 'ant-design-vue/es/vc-select';
import { t } from '@wangeditor/editor';
const tool = new TOOL.TOOL()            // 工具方法
const API = new utils.A_Patch()         // 请求接口地址合集

// 加载详情数据到页面
export class Insetpagedata {
    
    product_id = undefined;          // 商品id
    product_detaile = undefined;     // 商品详情
    PAGEDATA = undefined;            // 页面数据
    formdata = undefined;            // 表单数据
    format_form_ref = undefined;     // 属性表单验证

    // 加载详情数据到页面
    load = async() =>{

        // 1、请求商品详情
        var res = await axios.post(API.AppSrtoreAPI.dou_product.detaile, {
            product_id:this.product_id
        })
        var ProductDetaile = res.data.data;     // 获取商品详情信息
        this.product_detaile = res.data.data;   // 商品详情数据赋值到对象
        this.PAGEDATA.product_data = false;     // 页面load状态关闭

        //2、渲染主图
        this.formdata.pic = ProductDetaile.pic;// 主图

        //3、渲染标题
        this.formdata.name = ProductDetaile.name;// 标题

        //4、渲染分类-加载类目选项-设置类目值-加载属性
        var cateres = this.cate.ex_cate_data(ProductDetaile.category_detail)// 分类
        this.formdata.cate_op.push(cateres); // 加载类目选项
        this.formdata.category_leaf_id = cateres.value; // 设置类目值
        this.format.select_format(this.formdata.category_leaf_id, true)// 初次加载属性：true：写入详情值

        // 5、渲染规格

    }

    // 主图操作方法
    pic={
        // 删除主图
        del:(index)=>{
            this.formdata.pic.splice(index,1)
        },
        // 左移动
        left_inset:(index)=>{
            var fromIndex = index // 原始位置
            if(index > 0){
            var toIndex = index - 1 // 调整后的位置
            }else{
            var toIndex = 0 // 调整后的位置
            }
            const element = this.formdata.pic.splice(fromIndex, 1)[0]; // 删除并获取元素
            this.formdata.pic.splice(toIndex, 0, element);             // 插入到新位置
        },
        // 右移动
        right_inset:(index)=>{
            var fromIndex = index // 原始位置
            if(index < 4){
                var toIndex = index + 1 // 调整后的位置
            }else{
                var toIndex = 4 // 调整后的位置
            }
            const element = this.formdata.pic.splice(fromIndex, 1)[0]; // 删除并获取元素
            this.formdata.pic.splice(toIndex, 0, element);             // 插入到新位置

        },
        
        // 编辑
        edit:(index)=>{

        },
        
        // 添加
        add:(data)=>{

            // 加载素材组件
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
                        this.formdata.pic.push(obj.byte_url)
                    }else{
                    
                        tool.Fun_.message('info','主图长宽比例需要1:1,不小于600X600.')
                    
                    }

                }else if(material_type == 'video'){

                    tool.Fun_.message('info','【主图】不能选择视频，请选择图片素材！')
                
                }
            })

            // 只保留5张主图；
            if(this.formdata.pic.length > 5){
                this.formdata.pic = this.formdata.pic.slice(0, 5)
                tool.Fun_.message('info','最多上传5张主图')
            }
        },

        // 插入素材到页面
        inset_img:()=>{

        },

    }

    // 标题操作方法
    title={
    
    }

    // 类目
    cate={

        // 按钮状态
        loading:ref(false),

        // 下拉选择
        state:ref(true),

        // 类目预测
        check_cate:async()=>{
            
            this.cate.loading.value = true;

            var name = this.formdata.name; // 标题
            var pic = this.formdata.pic; // 主图
            // CATE.predict_status.value = true;

            // 判断标题是否为空
            if(name == undefined || name == ''){ 
                tool.Fun_.message('error', '预测类目>标题不能为空！');
                CATE.predict_status.value = false;
                return false
            }

            // 判断主图是否为空
            if(!pic || pic.length == 0){
                tool.Fun_.message('error', '预测分类>商品主图不能为空！');
                CATE.predict_status.value = false;
                return false
            }

            // 迭代图片数组格式
            var pic_list = [...pic];
            pic_list.forEach((obj,index)=>{
                pic_list[index] = {"url":obj}
            })

            // 请求接口
            var res = await axios.post(API.AppSrtoreAPI.dou_product.cate_predict,{
                "scene":"category_infer",
                // "scene":"smart_publish",
                "pic":pic_list,
                "name":name
            })

            
            // 获取预测的类目属性数据
            var categoryDetails = res.data.data.categoryDetails;

            // console.log(categoryDetails)

            this.cate.ex_cate_check_list(categoryDetails)

            this.cate.loading.value = false;
        },

        // 转义分类字符，提取分类id
        ex_cate_data:(data)=>{
            var n_text = ''
            var c_id = []
            if(data.first_cname !== ''){
                n_text = n_text + data.first_cname + '>'
            }
            if(data.second_cname !== ''){
                n_text = n_text + data.second_cname + '>'
            }
            if(data.third_cname !== ''){
                n_text = n_text + data.third_cname + '>'
            }
            if(data.fourth_cname !== ''){
                n_text = n_text + data.fourth_cname + '>'
            }
            if(data.first_cid !== 0){
                c_id.push(data.first_cid)
            }
            if(data.second_cid !== 0){
                c_id.push(data.second_cid)
            }
            if(data.third_cid !== 0){
                c_id.push(data.third_cid)
            }
            if(data.fourth_cid !== 0){
                c_id.push(data.fourth_cid)
            }

            // console.log(n_text.slice(0,-1))
            // console.log(c_id[c_id.length-1])
            var res = {
                label:n_text.slice(0,-1),
                value:c_id[c_id.length-1]
            }

            return res
        },

        // 转义预测分类字符
        ex_cate_check_list:(data)=>{

            var cate_id_list= []

            this.formdata.cate_op.forEach(item=>{
                cate_id_list.push(item.value)
            })
            // fun.cate.state.value = true;

            data.forEach(item=>{
                var l_ = this.cate.ex_cate_data(item.category_detail)
                if(!cate_id_list.includes(l_.value)){
                    this.formdata.cate_op.push(l_)
                }  
            })

            this.cate.state.value = false;

        },
        // 切换类目事件:关联加载属性列表
        change:()=>{

            console.log(this.formdata.category_leaf_id)
            this.format.select_format(this.formdata.category_leaf_id)// 查询属性

        }
    }

    // 属性
    format={

        // 查询属性
        select_format:async(c_id, states)=>{
            
            var data = {
                "category_leaf_id":c_id
            }

            var res = await axios.post(API.AppSrtoreAPI.dou_product.format,data);

            var format_detaile_value = res.data.data.data

            this.formdata.CateProperty = this.format.sort_required_(format_detaile_value)   // 必填属性排序

            if(states){
                // states：：开关控制写入属性值到表单
                // 初次加载属性需要写入详情的属性值
                // 如果切换分类则不需要写入属性值
                this.format.load_inset_form(format_detaile_value)
            }
        },

        // 自定义【面料材质】的名称
        diy_name:ref(),

        // 添加自定义【面料材质】name -方法
        addItem:(op) => {

            var diy_name = this.format.diy_name.value; // 自定义名称
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

            this.format.diy_name.value = undefined;
        },

        // 对选度量衡添加限制-不超过
        add_limit:(data_list,maxnumber)=>{
            if(data_list.length >= maxnumber){
                tool.Fun_.message('error','超过最大限制数量了，最多10个选项。')
            }else{
                data_list.push({value:undefined, percentage:undefined})
            }
        },

        // 属性必填项目排序-靠前-转义
        sort_required_:(data)=>{

            var quir_obj_top = []
            var quir_obj_end = []

            // 装载到对象
            data.forEach(item =>{

                if(item.required == 1){ // 必填项
                    quir_obj_top.push(item)
                }

                if(item.required == 0){ // 非必填
                    quir_obj_end.push(item)
                }
            })
            
            var s_obj = [...quir_obj_top,...quir_obj_end]

            // 构造数据结构
            this.format.make_format_binding(s_obj)

            return s_obj

        },

        // 构造绑定值数据结构
        make_format_binding:(data)=>{

            data.forEach(item=>{

                if(item.type == 'text'){    // 输入文本
                    this.formdata.format_form_data[item.property_id] = undefined;
                }else if(item.type == 'select'){ // 单选
                    this.formdata.format_form_data[item.property_id] = undefined;
                }else if(item.type == 'multi_select'){ // 多选
                    this.formdata.format_form_data[item.property_id] = undefined; 
                }else if(item.type == 'measure'){ // 度量衡-单值

                    // console.log('度量衡-单值',item)

                    const measure_Data= {} // 绑定表单dui像

                    item.measure_templates[0].value_modules.forEach(item=>{
                        var mo_obj = {}
                        mo_obj.module_id = item.module_id;
                        mo_obj.prefix = item.prefix;
                        mo_obj.suffix = item.suffix;
                        mo_obj.unit_name = '';
                        if(item.units.length >0){
                            mo_obj.unit_id = item.units[0].unit_id;
                            mo_obj.op = item.units;
                        }
                        measure_Data[item.module_id] = mo_obj;

                    })

                    this.formdata.format_form_data[item.property_id] = measure_Data;

                }else if(item.type == 'multi_value_measure'){   // 度量衡-多值
                    
                    // console.log('度量衡-多值',item)

                    this.formdata.format_form_data[item.property_id] = [{}];

                }else if(item.type == 'timestamp'){ // 时间戳
                    
                    this.formdata.format_form_data[item.property_id] = undefined;

                }else if(item.type == 'timerange'){ // 时间段
                    
                    this.formdata.format_form_data[item.property_id] = undefined; 
                
                }

                // 添加品牌无品牌选项
                var property_name = item.property_name
                if(property_name == '品牌'){
                    var No_brand_obj = {
                        "value_id": 596120136,
                        "sequence": 0,
                        "name": "无品牌",
                        "value": "596120136"
                    }
                    item.options.push(No_brand_obj)
                }
                // 无品牌添加结束
            })

        },

        // 商品已选择属性->加载到表单
        load_inset_form:(data)=>{
                
            var format_detaile_obj = {};                                              // 类目id请求加载的属性基础信息
            data.forEach(item=>{
                format_detaile_obj[item.property_id] = item
            })

            var detaile_format = JSON.parse(this.product_detaile.product_format_new) // 商品详情返回的选中属性值

            var form_format = this.formdata.format_form_data;                        // 表单绑定属性对象

            // 迭代==>需要加载属性到表单
            Object.keys(detaile_format).forEach(key =>{

                var PropertyId = key;                       // 属性id
                var type = format_detaile_obj[key].type;    // 属性类型
                var value_list = detaile_format[key];       // 属性值列表
                
                // 载入文本
                if(type == 'text'){
                    
                    form_format[key] = value_list[0].Name;

                }else if(type == 'multi_select' && value_list.length > 0){ // 多选且值不为空

                    form_format[key] = []; // 初始化数组

                    // 迭代加载多选属性值
                    value_list.forEach(item=>{
                        console.log('多选属性值',item)
                        let diy_type = item.diy_type; // 是否自定义值
                        let diy_value = item.Value; // 自定义值

                        // // 输入自定义的值 - 选择的是自定义值value=0
                        if(diy_type == 1 && diy_value == 0){
                            var value_number = format_detaile_obj[key].options.length + 1;
                            format_detaile_obj[key].options.push({
                                name:value_list[0].Name,
                                value:value_number + '',
                                value_id:value_number
                            })

                            form_format[key].push(value_number); // 添加自定id到表单绑定值

                        }else{
                            form_format[key].push(item.Value); // 添加选项值到表单绑定值
                        }
                        
                    })
                
                }else if(type == 'select'){ // 单选

                    // 输入自定义的值 - 选择的是自定义值value=0
                    if(format_detaile_obj[key].diy_type == 1 && value_list[0].Value == 0){

                        var value_number = format_detaile_obj[key].options.length + 1;

                        format_detaile_obj[key].options.push({
                            name:value_list[0].Name,
                            value:value_number + '',
                            value_id:value_number,
                            value_text:false// 自定义值标识
                        })

                        form_format[key] = value_number;

                    }else{// 自带选择的值
                        form_format[key] = value_list[0].Value;
                    }

                }else if(type == 'multi_value_measure'){ // 度量衡-多值
                    // 迭代加载多选属性值
                    value_list.forEach(item=>{
                        console.log('度量衡-多值',item)
                        let diy_type = item.diy_type; // 是否自定义值
                        let diy_value = item.Value; // 自定义值 
                    })

                }else if(type =='measure'){ // 度量衡-单值

                    // console.log('度量衡-单值',item)

                }else if(type ==''){ // 时间戳

                }else if(type ==''){ // 时间段

                }

            })

            // 品牌为空时候 默认填入无品牌
            if(detaile_format['1687'] === undefined ){
                form_format['1687'] = 596120136;
            }

        },

        // 多选属性-超过可选数量禁用勾选
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

        // 构造商品属性提交数据
        makeup_upload_format:(data)=>{
            
            var result = {} // 最终构造的提交数据
            var format_data = {}; // 类目属性基础数据
            this.formdata.CateProperty.forEach(item=>{
                format_data[item.property_id] = item
            })

            Object.keys(data).forEach(key=>{

                // key:属性id
                let value = data[key]; // 表单属性值
                let options = format_data[key].options; // 属性选项


                if(value !== undefined && value !== ''){// 迭代不为空的属性值
                    
                    var property_name = format_data[key].property_name; // 属性名称
                    var type = format_data[key].type; // 属性类型
                    var diy_type = format_data[key].diy_type; // 是否自定义值


                    // 构造属性提交数据结构
                    if(type == 'text'){// 文本

                        result[key] = [{"value":0,"name":value,"diy_type":0}]

                    }else if(type == 'select'){// 单选

                        result[key] = this.format.make_format_select_result(value, options, diy_type)
                        
                    }else if(type == 'multi_select'){// 多选

                       result[key] = this.format.make_format_multi_select_result(value, options, diy_type)

                    }else if(type == 'multi_value_measure'){// 度量衡-多值
                        var measure_templates = format_data[key].measure_templates; // 度量衡值模板
                        result[key] = this.format.make_format_multi_measure_result(value, options, diy_type,measure_templates)
                    }else if(type == 'measure'){// 度量衡-单值
                    }else if(type == 'timestamp'){// 时间戳
                    }else if(type == 'timerange'){// 时间段
                    }
                    
                }
            })

            // console.log('构造属性提交数据',result)

            return JSON.stringify(result)
        },

        // 构造单选属性提交数据
        make_format_select_result:(value, options, diy_type)=>{
            // [{"value":27664,"name":"复习资料","diy_type":0}]

            var res = ''
            if(diy_type == 1){ // 输入自定义的值 
                options.forEach(item=>{
                    if(item.value_id == value && item.value_text == false){// - 选择的是自定义值value=0
                        res= [{"value":0, "name":item.name, "diy_type":diy_type}]
                    }else if(item.value_id == value && item.value_text == undefined){ // 不是自定义值
                        res= [{"value":item.value_id, "name":item.name, "diy_type":diy_type}]
                    }
                })
            }else{
                options.forEach(item=>{
                    if(item.value_id == value){
                        res= [{"value":item.value_id, "name":item.name, "diy_type":diy_type}]
                    }
                })
            }
            // console.log('属性', diy_type, value,res)

            return res;
        },

        // 构造多选属性提交数据
        make_format_multi_select_result:(value, options, diy_type)=>{
            // console.log(value,options)
            var res = []
            value.map(val_id=>{
                if(diy_type == 1){ // 输入自定义的值
                    options.forEach(item=>{
                        if(item.value_id == val_id && item.value_text == false){// - 选择的是自定义值value=0
                            res.push({"value":0, "name":item.name, "diy_type":diy_type})
                        }else if(item.value_id == val_id && item.value_text == undefined){ // 不是自定义值
                            res.push({"value":item.value_id, "name":item.name, "diy_type":diy_type})
                        }
                    })
                }else{// 不是自定义值
                    options.forEach(item=>{
                        if(item.value_id == val_id){
                            res.push({"value":item.value_id, "name":item.name, "diy_type":diy_type})
                        }
                    })
                }
            })
            // console.log(res)
            return res;

            // "4074":[
            //{"value":27664,"name":"复习资料","diy_type":0},
            // {"value":0,"name":"复习资料1","diy_type":1}
            //]
        },

        // 构造度量衡-单值属性提交数据
        make_format_measure_result:(data)=>{

            // "4074":[
            //     {
            //         "measure_info": {
            //         "template_id": 126,
            //         "values": [
            //             {
            //             "module_id": 185,
            //             "prefix": "",
            //             "suffix": "-",
            //             "value": "300",
            //             "unit_id": 38,
            //             "unit_name": "cm"
            //             }
            //         ]
            //         },
            //         "value": 0,
            //         "diy_type": 1,
            //         "name": "300cm-"
            //     }
            // ]

        },

        // 构造度量衡-多值属性提交数据
        make_format_multi_measure_result:(value, options, diy_type, measure_templates)=>{

            // console.log('度量衡-多值',value, options, diy_type, measure_templates)

            var res = []

            value.map(val_obj=>{

                let val_id = val_obj.value;           // 选项id：对应options的value_id，选择出
                let percentage = val_obj.percentage;    // 度量衡百分比数字
                let template_id = measure_templates[0].template_id; // 度量衡模板id
                let value_modules = measure_templates[0].value_modules; // 度量衡模板的值模块
                if(diy_type == 1){ // 输入自定义的值
                    options.forEach(item=>{
                        if(item.value_id == val_id){
                            let v_obj = {
                                "measure_info": {
                                    "values": [
                                        {
                                            "module_id": value_modules[0].module_id,
                                            "value": item.name,
                                            "unit_id": 0
                                        },
                                        {
                                            "module_id": value_modules[1].module_id,
                                            "unit_name": "%",
                                            "unit_id": value_modules[1].units[0].unit_id,
                                            "value": percentage + ''
                                        }
                                    ],
                                        "template_id": template_id,
                                        "value_name": item.name + percentage + "%"
                                },
                                "value":0,
                                "name":item.name + percentage + "%",
                                "diy_type":diy_type
                            }
                        res.push(v_obj)
                        }
                    })

                }else{// 不是自定义值


                }

            })

            let demo_text= {
                "785": [
                    {
                    "measure_info": {
                            "values": [
                            {
                                "module_id": 466,
                                "value": "亚麻",
                                "unit_id": 0
                            },
                            {
                                "module_id": 467,
                                "unit_name": "%",
                                "unit_id": 15,
                                "value": "10"
                            }
                            ],
                            "template_id": 208,
                            "value_name": "亚麻10%"
                    },
                    "diy_type": 1,
                    "name": "亚麻10%",
                    "value": 0
                    },
                    {
                        "measure_info": {
                            "values": [
                            {
                                "module_id": 466,
                                "value": "棉",
                                "unit_id": 0
                            },
                            {
                                "module_id": 467,
                                "unit_name": "%",
                                "unit_id": 15,
                                "value": "90"
                            }
                            ],
                            "template_id": 208,
                            "value_name": "棉90%"
                        },
                    "diy_type": 1,
                    "name": "棉90%",
                    "value": 0
                    }
                ]
            }
            console.log('度量衡-多值-提交数据',res)
            return res;
        },

        // 构造【时间戳】属性提交数据
        make_format_timestamp_result:(data)=>{

        },

        // 构造【时间段】属性提交数据
        make_format_timerange_result:(data)=>{
            let demo_text = {
                "4032": [
                    {
                        "value": 0,
                        "name": "2024-03-28,2024-05-20",
                        "diy_type": 0,
                        "measure_info": {
                            "template_id": 145,
                            "values": [
                            {
                                "module_id": 393,
                                "value": "2024-03-28",
                                "unit_id": 0,
                                "unit_name": "",
                                "prefix": "",
                                "suffix": ","
                            },
                            {
                                "module_id": 394,
                                "value": "2024-05-20",
                                "unit_id": 0,
                                "unit_name": "",
                                "prefix": "",
                                "suffix": ""
                            }
                            ]
                        }
                    }
                ]
            }
        },
    }

    // 表单字段验证规则
    rule={
        // 标题规则
        name:[
            {required: true, message: '标题不能为空', trigger: 'blur' },
            {max: 32,message: '不超过30个汉字,不能含emoj表情.',trigger: 'change'},
            {min: 4,message: '至少4个汉字.',trigger: 'change'},
        ]
    }

    // 获取数据
    product_form={

        // get
        get:async()=>{

            // 获取属性数据-格式化提交数据
            var format_res = await this.product_form.get_product_format_form() 
            // console.log('请求属性结果',format_res)

            if(format_res){
                this.data.product_format_new = format_res; // 属性数据-字符串
                this.update()
            }else{
                console.log('获取属性数据失败')
            }
        },

        get_product_format_form:async()=>{

            // 验证是否必填全部填写
            var res = await this.formdata.format_form_ref.validate().then(()=>{

                var format_result_data = toRaw(this.formdata.format_form_data)

                var res = this.format.makeup_upload_format(format_result_data) // 属性-字符串

                return res

            }).catch(error => {

                console.log('表单不满足条件',error)

                // tool.Fun_.message('error',error.errorFields[0].errors[0]);

                // activeKey.value = '1';

                return false
            })

            return res
        }
    }

    data={}
    
    // 提交数据
    update = ()=>{

        // 1、商品id
        this.data.product_id = this.product_id; 
        // 2、提交方式
        this.data.commit = false;
        // 3、获取主图
        if(this.formdata.pic.length > 0){// 不为空
            this.data.pic = toRaw(this.formdata.pic).join('|')
        }else{
            tool.Fun_.message('error','主图不能为空！')
            return
        }
        // 4、获取标题
        this.data.name = this.formdata.name;

        this.data.category_leaf_id = this.formdata.category_leaf_id// 类目id

        console.log('提交数据',this.data);

        axios.post(API.AppSrtoreAPI.dou_product.edit, this.data).then(res=>{
            console.log('提交数据',res);
        }).catch(err=>{
            console.log('提交数据失败',err);
        })
        
    }

}


// 白底图

// 长图

// 视频

// 限购

// 规格

// 描述

// 资质

// 更新

