import { defineComponent,reactive,ref,shallowRef,onMounted,defineAsyncComponent,toRaw } from 'vue';
import axios from 'axios'; // 网络请求
import * as TOOL from '@/assets/JS_Model/tool';// 常用工具
import * as utils from '@/assets/JS_Model/public_model';// 接口地址配置
import { selectProps } from 'ant-design-vue/es/vc-select';
const tool = new TOOL.TOOL()            // 工具方法
const API = new utils.A_Patch()         // 请求接口地址合集

// 商品详情数据




// 加载详情数据到页面
export class Insetpagedata {
    
    product_id = undefined// 商品id
    product_detaile = undefined// 商品详情
    PAGEDATA = undefined// 页面数据
    formdata = undefined// 表单数据
    format_form_ref = undefined// 属性表单验证

    // 加载详情数据到页面
    load = async() =>{

        // 请求商品详情
        var res = await axios.post(API.AppSrtoreAPI.dou_product.detaile, {
            product_id:this.product_id
        })

        var ProductDetaile = res.data.data;
        this.product_detaile = res.data.data;
        this.PAGEDATA.product_data = false;// 页面load状态关闭

        this.formdata.pic = ProductDetaile.pic;// 主图
        this.formdata.name = ProductDetaile.name;// 标题
        var cateres = this.fun.cate.ex_cate_data(ProductDetaile.category_detail)// 分类
        this.formdata.cate_op.push(cateres); // 加载类目选项
        this.formdata.category_leaf_id = cateres.value; // 设置类目值
        this.fun.format.select_format(this.formdata.category_leaf_id, true)// 初次加载属性：true：写入详情值

    }

    // 操作方法
    fun = {

        // 主图操作方法
        pic:{
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

        },

        // 标题操作方法
        title:{
        
        },

        // 类目
        cate:{

            // 按钮状态
            loading:ref(false),

            // 下拉选择
            state:ref(true),

            // 类目预测
            check_cate:async()=>{
                
                this.fun.cate.loading.value = true;

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

                this.fun.cate.ex_cate_check_list(categoryDetails)

                this.fun.cate.loading.value = false;
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
                    var l_ = this.fun.cate.ex_cate_data(item.category_detail)
                    if(!cate_id_list.includes(l_.value)){
                        this.formdata.cate_op.push(l_)
                    }  
                })

                this.fun.cate.state.value = false;

            },
            // 切换类目事件:关联加载属性列表
            change:()=>{

                console.log(this.formdata.category_leaf_id)
                this.fun.format.select_format(this.formdata.category_leaf_id)// 查询属性

            }

        },

        // 属性
        format:{

            // 查询属性
            select_format:async(c_id, states)=>{
                
                var data = {
                    "category_leaf_id":c_id
                }

                var res = await axios.post(API.AppSrtoreAPI.dou_product.format,data);
                var format_detaile_value = res.data.data.data

                this.formdata.CateProperty = this.fun.format.sort_required_(format_detaile_value)   // 必填属性排序
                
                // states：：开关控制写入属性值到表单
                // 初次加载属性需要写入详情的属性值
                // 如果切换分类则不需要写入属性值

                if(states){

                    this.fun.format.load_inset_form(format_detaile_value)

                }
            },

            // 自定义【面料材质】的名称
            diy_name:ref(),

            // 添加自定义【面料材质】name -方法
            addItem:(op) => {

                var diy_name = this.fun.format.diy_name.value; // 自定义名称
                if(diy_name == undefined){
                    tool.Fun_.message('error','自定义值不能为空')
                }else{
                    op.unshift({
                        name: diy_name,
                        value:op.length + 1
                    });
                }

                this.fun.format.diy_name.value = undefined;
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
                this.fun.format.makeup(s_obj)

                return s_obj

            },

            // 构造绑定值数据结构
            makeup:(data)=>{

                data.forEach(item=>{
                    if(item.type == 'text'){    // 输入文本

                        this.formdata.format_form_data[item.property_id] = '';

                    }else if(item.type == 'select'){ // 单选

                        this.formdata.format_form_data[item.property_id] = [];

                    }else if(item.type == 'multi_select'){ // 多选

                        this.formdata.format_form_data[item.property_id] = []; 

                    }else if(item.type == 'measure'){ // 度量衡-单值

                        const measure_Data= reactive({})// 绑定表单dui像
                        item.measure_templates[0].value_modules.forEach(item=>{
                            measure_Data[item.module_id] = {
                                unit_id:'',
                                unit_name:''
                            }
                        })
                        this.formdata.format_form_data[item.property_id] = measure_Data;
                        console.log(this.formdata.format_form_data[item.property_id])

                    }else if(item.type == 'multi_value_measure'){   // 度量衡-多值

                        this.formdata.format_form_data[item.property_id] = [{}];

                    }else if(item.type == 'timestamp'){ // 时间戳

                        this.formdata.format_form_data[item.property_id] = ''; 

                    }else if(item.type == 'timerange'){ // 时间段

                        this.formdata.format_form_data[item.property_id] = ''; 

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
                 
                var format_detaile_obj = {}; // 类目id请求加载的属性

                data.forEach(item=>{
                    format_detaile_obj[item.property_id] = item
                })

                var detaile_format = JSON.parse(this.product_detaile.product_format_new) // 商品详情的属性

                var form_format = this.formdata.format_form_data;// 表单绑定属性对象

                // 迭代==>需要加载属性到表单
                Object.keys(detaile_format).forEach(key =>{

                    // 属性id
                    var PropertyId = key;

                    // 属性类型
                    var type = format_detaile_obj[key].type;

                    // 属性值
                    // console.log('需要加载属性',key, type, detaile_format[key])
                    
                    // 载入文本
                    if(type == 'text'){
                        form_format[key] = detaile_format[key][0].Name;
                    }else if(type == 'multi_select'){ // 多选
                        detaile_format[key].forEach(item=>{
                            form_format[key].push(item.Name)
                        })
                    }else if(type == 'select'){ // 单选
                        form_format[key].push(detaile_format[key][0].Name)
                    }else if(type == 'multi_value_measure'){ // 度量衡-多值

                    }else if(type =='measure'){ // 度量衡-单值

                        console.log(form_format[key])
                        

                    }else if(type ==''){ // 时间戳

                    }else if(type ==''){ // 时间段

                    }

                })

                // 加载文本
                function inset_text(data){

                }
                // 加载单选

                // 加载多选

                // 加载度量衡-多选

                // 加载度量衡-单选

                // 加载时间戳

                // 加载时间段
                


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
                                var value = obj.value_id + '';
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

            }

        },

        // 表单字段验证规则
        rule:{
            // 标题规则
            name:[
                {required: true, message: '标题不能为空', trigger: 'blur' },
                {max: 32,message: '不超过30个汉字,不能含emoj表情.',trigger: 'change'},
                {min: 4,message: '至少4个汉字.',trigger: 'change'},
            ]
        },

    }

    // 属性操作方法


    // 获取数据
    product_form={

        // get
        get:()=>{

            // 获取标题
            this.product_form.getname()
            
            // 获取主图
            if(this.formdata.pic.length > 0){// 不为空
                console.log('【主图】',toRaw(this.formdata.pic))
            }else{
                tool.Fun_.message('error','主图不能为空！')
                // activeKey.value = '1'
                return
            }

            // 获取类目
            this.product_form.getcateid()

            // 获取属性
            this.product_form.getformat()

            
        
        },
        // 标题
        getname:()=>{
            console.log('【标题】',this.formdata.name)
        },

        // 类目
        getcateid:()=>{
            console.log('【类目ID】',this.formdata.category_leaf_id)
        },

        // 获取表单属性
        getformat: async()=>{
            
            // console.log(toRaw(this.formdata.format_form_ref))

            // 验证是否必填全部填写
            var res = await this.formdata.format_form_ref.validate().then(()=>{

                console.log(toRaw(this.formdata.format_form_data))
                var format_result= toRaw(this.formdata.format_form_data)
                Object.keys(format_result).forEach(key=>{
                    console.log(key, format_result[key])
                })

                // var selected_mat = toRaw(CATE.format_formRef)// 选中的属性

                // var show_mat= toRaw(CATE.format.value)      // 当前展示的属性
                // var f_res_obj = {}
                // show_mat.forEach(obj => {
                //     let property_id = obj.property_id;
                //     if(selected_mat[property_id] !== undefined){
                //        var result_list = CATE.de_format_detail(obj, selected_mat[property_id])
                //        f_res_obj[property_id] = result_list
                //     }
                // });

                // return f_res_obj

            }).catch(error => {

                // tool.Fun_.message('error',error.errorFields[0].errors[0]);

                // activeKey.value = '1';

                // return false
            })

            // 文本获取方法
            // 传入id：和值
            // 获取配置
            // 值 不为空，构建提交数据格式；

            // 单选获取方法

            // 多选获取方法

            // 度量衡-单选-获取方法

            // 度量衡-多选-获取方法

            // 时间戳 - 获取方法

            // 时间段 - 获取方法

        },

    }

    // 提交数据
    update = {

    }

}

// 主图方法

// 标题

// 分类

// 属性

// 白底图

// 长图

// 视频

// 限购

// 规格

// 描述

// 资质

// 更新

