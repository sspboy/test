// 公用方法开始
// 引用外部方法
import * as utils from '@/assets/JS_Model/public_model';// 公用路径方法
const API = new utils.A_Patch()

// 引用【复制记录】方法
import * as copyLog from '@/assets/douyinshop/copylog';
import { Alert } from 'ant-design-vue';
const CopyLog = new copyLog.CopyLog();

import axios from "axios";// 网络请求方法

// 获取所有角色
export class Role {

    // 获取所有部门
    all_ = {

        get_all_role:async (callback)=>{

            var data = {}
            data.page = 1
            data.page_size = 1000
            data.condition = [
                {
                    type: "orderby",
                    condition: [{'column_name': 'create_time', 'value': 'DESC', }]
                }
                // {
                //     type: "where",
                //     condition: [{'column_name':'b_id','value':brand_id,'operator':'='}]
                // }
            ]

            try{

                await axios.post(API.BasicsAPI.role.list, data).then((response)=> {

                    callback(response.data)

                })

            }catch (error){

                console.error('team list post request err!',error)

            }



        }
    }
}

// 获取所有部门
export class Depart {

    // 获取当前品牌下所有角色\
    all_={
        // 获取当前品牌下所有的部门
        get_all_department:async (callback)=>{
            var data = {}
            data.page = 1
            data.page_size = 1000
            data.condition = [
                {
                    type: "orderby",
                    condition: [{'column_name': 'create_time', 'value': 'DESC', }]
                }
            ]

            try{

                await axios.post(API.BasicsAPI.department.list, data).then((response)=> {

                    callback(response.data)

                })

            }catch (error){

                console.error('team list post request err!',error)

            }

        }
    }

    Table_List = {

        // 【list】获取一部门
        get_one_depart:(data)=>{
            var one_list = []
            for(let i of data){
                i.key = i.id
                if(i.parent_id == 0){
                   one_list.push(i)
                }
            }
            return one_list
        },

        // 【list】添加子部门
        get_first_depart:(data)=>{

            var onelist = this.Table_List.get_one_depart(data)

            for(let i of onelist){
                var c_list = this.Table_List.get_child(i,data)
                if(c_list.length !== 0){i.children = c_list}
            }

            return onelist

        },
        // 获取当前部门的子部门
        get_child:(n_obj, data)=>{
            var c_list = []
            for(let i of data){
                if(i.parent_id == n_obj.id){
                    c_list.push(i)
                }
            }
            return c_list
        },
        // 数组转换为树结构
        get_tree:(arr)=>{

            function ArrayToTree(arr, pid = 0) {

                // 判断是否是数组 不是数组就返回 []
                if (!Array.isArray(arr) || !arr.length) return [];

                let newArr = []

                // for迭代方法
                arr.forEach(item => {

                    // 判断 当前item.pid 和 传入的pid 是否相等，相等就push 进去
                    if (item.parent_id == pid) {

                        var rlist = ArrayToTree(arr, item.id)

                        if(rlist.length != 0){
                            newArr.push({...item, children: ArrayToTree(arr, item.id), "key":item.id, "value":item.id.toString(), "label":item.name})
                        }else {
                            newArr.push({...item, "key":item.id, "value":item.id.toString(), "label":item.name})
                        }

                    }

                })

                return newArr
            }

            let res = ArrayToTree(arr, '0')

            return res

        }
    }


    // 【list】当前点击部门


}

// 版本
export class Version {

    all_ = {

        // 获取当前所有的版本
        get_all_ver:async (callback)=>{
            var data = {}
            data.page = 1
            data.page_size = 1000
            data.condition = [
                {
                    type: "orderby",
                    condition: [{'column_name': 'create_time', 'value': 'DESC', }]
                }
            ]

            try{

                await axios.post(API.AdminAPI.version.list, data).then((response)=> {

                    callback(response.data)

                })

            }catch (error){

                console.error('team list post request err!',error)

            }

        }
    }
}

// 基础模块操作方法
export class TableOperate{

    message = {
        url:"",
        page:1,
        page_size:10,
        condition:'None',   // 查询条件
        colum:{},           // 表头设置
        data_list:{},       // 列表
        detaile:{},         // 详情
        del_state:'',       // 删除结果
        update_state:'',    // 更新结果
        add_state:'',       // 添加结果
        bacth_del:'',       // 批量删除结果
    }

    actions ={

        // 列表查询
        list:async ( data, callback )=>{

            try{

                await axios.post(this.message.url,data).then((response)=> {

                    callback(response.data)

                })

            }catch (error){

                console.error('list post request err!',error)

            }

        },
        // 单条查询
        get: ( data, callback)=>{

            try{

                let url = this.message.url + data.id

                axios.get(url).then((response)=>{

                    callback(response.data)

                })

            }catch (error){

                console.error('get detaile request err!',error)

            }
        },

        // 删除
        del:( data, callback)=>{

            let url = this.message.url + data.id

            try{

                axios.delete(url).then((response)=>{

                    callback(response.data)

                })
            }catch (error){

                console.error('del detaile request err!',error)

            }

        },

        // 添加
        add:( data, callback)=>{

            try{

                axios.post(this.message.url, data).then((response)=>{

                    callback(response.data)

                })

            }catch (error){

                console.error('add detaile request err!',error)

            }

        },
        // 更新
        update:(data,callback)=>{

            let user_id = data.id

            try{

                let url = this.message.url + user_id

                axios.put(url, data).then((response)=>{

                    callback(response.data)

                })

            }catch (error){

                console.error('put user detaile request err!',error)

            }

        },
        // 批量删除
        bacth_del:({ commit },data)=>{

            try{

                axios.put(API.AdminAPI.user.list, data).then((response)=>{

                    commit('bacth_del', response.data)

                })

            }catch (error){

                console.error('bacth del user request err!',error)

            }

        }

    }
    // 用户表头
    user={
        // 用户表格添加表头
        add_colum:(resdata)=>{

            for(let colums of resdata.colum){
                // 品牌id
                if(colums.field_name === "b_id"){
                  colums['align'] = 'center'
                  colums['width'] = 74
                }
                // 账号类型
                if(colums.field_name === "account_type"){
                  colums['align'] = 'center'
                  colums['width'] = 90
                }
                // 账号名称
                if(colums.field_name === "id"){
                  colums['align'] = 'left'
                  colums['width'] = 120
                }
                // 店铺关联id
                if(colums.field_name === "s_id"){
                  colums['align'] = 'center'
                  colums['width'] = 130
                }
                // 版本id
                if(colums.field_name === "v_id"){
                  colums['align'] = 'center'
                  colums['width'] = 74
                }
                // 昵称
                if(colums.field_name === "nickname"){
                  colums['align'] = 'center'
                  colums['width'] = 140
                }
                // 密码
                if(colums.field_name === "pass_word"){
                  colums['align'] = 'center'
                  colums['width'] = 140
                }
                // 品牌名称
                if(colums.field_name === "brand_name"){
                  colums['align'] = 'center'
                  colums['width'] = 140
                }
                // 手机号码
                if(colums.field_name == "mobile"){
                  colums['align'] = 'center'
                  colums['width'] = 130
                }
                // 角色
                if(colums.field_name === "role"){
                  colums['align'] = 'center'
                  colums['width'] = 140
                }
                // 部门id
                if(colums.field_name == "department_id"){
                  colums['align'] = 'center'
                  colums['width'] = 80
                }
                // 部门名称
                if(colums.field_name == "department_name"){
                  colums['align'] = 'center'
                  colums['width'] = 220
                }
                // 账号状态
                if(colums.field_name == "state"){
                  colums['align'] = 'center'
                  colums['width'] = 80
                }
                // 创建时间
                if(colums.field_name === "create_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }
                // 更新时间
                if(colums.field_name === "update_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }
            }

            var op = {

                  "dataIndex": "state",
                  "field_name": "state",
                  "field_type": "int",
                  "key": "operation",
                  "title": "操作",
                  "fixed": 'right',
                  "align":"center",
                  "width":100
            }

            resdata.colum.push(op) // 添加操作按钮
            this.message.page = resdata.now_page;
            this.message.page_size = resdata.page_size;

        }
    }
    // 功能表头
    fun={
        add_colum:(resdata)=>{
            for(let colums of resdata.colum){
                // id
                if(colums.field_name === "id"){
                  colums['align'] = 'center'
                  colums['width'] = 74
                }
                // 关联菜单id
                if(colums.field_name === "m_id"){
                  colums['align'] = 'center'
                  colums['width'] = 90
                }
                // 菜单名称
                if(colums.field_name === "m_name"){
                  colums['align'] = 'left'
                  colums['width'] = 120
                }
                // 功能名称
                if(colums.field_name === "name"){
                  colums['align'] = 'center'
                  colums['width'] = 140
                }
                // 函数名称
                if(colums.field_name === "def_name"){
                  colums['align'] = 'center'
                  colums['width'] = 174
                }
                // 描述
                if(colums.field_name === "miaoshu"){
                  colums['align'] = 'center'
                  colums['width'] = 100
                }
                // 创建时间
                if(colums.field_name === "create_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }
                // 更新时间
                if(colums.field_name === "update_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }
            }
    
            var op = {
    
                  "dataIndex": "state",
                  "field_name": "state",
                  "field_type": "int",
                  "key": "operation",
                  "title": "操作",
                  "fixed": 'right',
                  "align":"center",
                  "width":100
            }
    
            resdata.colum.push(op) // 添加操作按钮
            this.message.page = resdata.now_page;
            this.message.page_size = resdata.page_size;
        }
    }
    // 菜单表头
    menu={
        add_colum:(resdata)=>{
            
            var D = new Depart()

            var neirong_list = D.Table_List.get_tree(resdata.data)

            resdata.data = neirong_list

            for(let colums of resdata.colum){
                // 菜单id
                if(colums.field_name === "id"){
                  colums['align'] = 'center'
                  colums['width'] = 174
                }
                // 菜单父id
                if(colums.field_name === "parent_id"){
                  colums['align'] = 'center'
                  colums['width'] = 90
                }
                // 图片名称
                if(colums.field_name === "ico_name"){
                  colums['align'] = 'center'
                  colums['width'] = 160
                }
                // 菜单名称
                if(colums.field_name === "name"){
                  colums['align'] = 'center'
                  colums['width'] = 174
                }
                // 功能字符
                if(colums.field_name === "field"){
                  colums['align'] = 'center'
                  colums['width'] = 140
                }
                // 权限配置
                if(colums.field_name === "function_info"){
                  colums['align'] = 'left'
                  colums['width'] = 240
                }
                // 创建时间
                if(colums.field_name === "create_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }
                // 更新时间
                if(colums.field_name === "update_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }
            }
    
            var op = {
    
                  "dataIndex": "state",
                  "field_name": "state",
                  "field_type": "int",
                  "key": "operation",
                  "title": "操作",
                  "fixed": 'right',
                  "align":"center",
                  "width":100
            }
    
            resdata.colum.push(op) // 添加操作按钮
            this.message.page = 1
            this.message.page_size = 100
        }
    }
    // 版本表头
    version = {
        add_colum:(resdata)=>{
            for(let colums of resdata.colum){
                // id
                if(colums.field_name === "id"){
                  colums['align'] = 'center'
                  colums['width'] = 74
                }
                // 关联菜单id
                if(colums.field_name === "m_id"){
                  colums['align'] = 'center'
                  colums['width'] = 90
                }
                // 菜单名称
                if(colums.field_name === "m_name"){
                  colums['align'] = 'left'
                  colums['width'] = 120
                }
                // 功能名称
                if(colums.field_name === "name"){
                  colums['align'] = 'center'
                  colums['width'] = 140
                }
                // 函数名称
                if(colums.field_name === "def_name"){
                  colums['align'] = 'center'
                  colums['width'] = 174
                }
                // 描述
                if(colums.field_name === "miaoshu"){
                  colums['align'] = 'center'
                  colums['width'] = 100
                }
                // 创建时间
                if(colums.field_name === "create_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }
                // 更新时间
                if(colums.field_name === "update_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }
            }
    
            var op = {
    
                  "dataIndex": "state",
                  "field_name": "state",
                  "field_type": "int",
                  "key": "operation",
                  "title": "操作",
                  "fixed": 'right',
                  "align":"center",
                  "width":100
            }
    
            resdata.colum.push(op) // 添加操作按钮
            this.message.page = resdata.now_page;
            this.message.page_size = resdata.page_size;
        }
    }
    // 角色表头
    role = {
        add_colum:(resdata)=>{

            for(let colums of resdata.colum){
              
                // 账号名称
                if(colums.field_name === "id"){
                  colums['align'] = 'left'
                  colums['width'] = 40
                }
                // 品牌id
                if(colums.field_name === "b_id"){
                  colums['align'] = 'center'
                  colums['width'] = 74
                }
                // 账号类型
                if(colums.field_name === "role_name"){
                  colums['align'] = 'center'
                  colums['width'] = 90
                }
    
                // 版本id
                if(colums.field_name === "role_info"){
                  colums['align'] = 'center'
                  colums['width'] = 74
                }
                // 昵称
                if(colums.field_name === "role_state"){
                  colums['align'] = 'center'
                  colums['width'] = 100
                }
                // 视图权限
                if(colums.field_name === "view_permissions"){
                  colums['align'] = 'left'
                  colums['width'] = 80
                }
                // 数据权限
                if(colums.field_name === "data_permissions"){
                  colums['align'] = 'center'
                  colums['width'] = 80
                }
                // 功能权限
                if(colums.field_name === "fun_permissions"){
                  colums['align'] = 'left'
                  colums['width'] = 80
                }
                // 创建时间
                if(colums.field_name === "create_time"){
                  colums['align'] = 'center'
                  colums['width'] = 80
                }
                // 更新时间
                if(colums.field_name === "update_time"){
                  colums['align'] = 'center'
                  colums['width'] = 80
                }
            }
    
            var op = {
    
                  "dataIndex": "state",
                  "field_name": "state",
                  "field_type": "int",
                  "key": "operation",
                  "title": "操作",
                  "fixed": 'right',
                  "align":"center",
                  "width":100
            }
    
            resdata.colum.push(op) // 添加操作按钮
            this.message.page = resdata.now_page;
            this.message.page_size = resdata.page_size;
        }
    }
    // 部门表头
    department = {

        add_colum:(resdata)=>{

            var D = new Depart()

            var neirong_list = D.Table_List.get_tree(resdata.data)

            resdata.data = neirong_list

            for(let colums of resdata.colum){

                // 账号名称
                if(colums.field_name === "id"){
                    colums['align'] = 'center'
                    colums['width'] = 80
                }

                // 品牌id
                if(colums.field_name === "b_id"){
                    colums['align'] = 'center'
                    colums['width'] = 40
                }

                // 部门名称
                if(colums.field_name === "name"){
                    colums['align'] = 'center'
                    colums['width'] = 40
                }

                // 父部门
                if(colums.field_name === "parent_id"){
                    colums['align'] = 'center'
                    colums['width'] = 40
                }
                // 昵称
                if(colums.field_name === "in_number"){
                    colums['align'] = 'center'
                    colums['width'] = 100
                }
                // 创建时间
                if(colums.field_name === "create_time"){
                    colums['align'] = 'center'
                    colums['width'] = 80
                }
                // 更新时间
                if(colums.field_name === "update_time"){
                    colums['align'] = 'center'
                    colums['width'] = 80
                }
            }

            var op = {
                "dataIndex": "state",
                "field_name": "state",
                "field_type": "int",
                "key": "operation",
                "title": "操作",
                "fixed": 'right',
                "align":"center",
                "width":40
            }

            resdata.colum.push(op) // 添加操作按钮
            this.message.page = resdata.now_page;
            this.message.page_size = resdata.page_size;
        }
    }
    // 团队表头
    team = {
        add_colum:(resdata)=>{
            for(let colums of resdata.colum){
                // 账号名称
                if(colums.field_name === "id"){
                  colums['align'] = 'left'
                  colums['width'] = 40
                }
                // 品牌id
                if(colums.field_name === "name"){
                  colums['align'] = 'left'
                  colums['width'] = 174
                }
    
                // 部门名称
                if(colums.field_name === "b_id"){
                  colums['align'] = 'center'
                  colums['width'] = 90
                }
    
                // 父部门
                if(colums.field_name === "nickname"){
                  colums['align'] = 'center'
                  colums['width'] = 74
                }
                // 昵称
                if(colums.field_name === "mobile"){
                  colums['align'] = 'center'
                  colums['width'] = 100
                }
                            // 昵称
                if(colums.field_name === "password"){
                  colums['align'] = 'center'
                  colums['width'] = 100
                }
                            // 昵称
                if(colums.field_name === "state"){
                  colums['align'] = 'center'
                  colums['width'] = 100
                }
                                        // 昵称
                if(colums.field_name === "role"){
                  colums['align'] = 'center'
                  colums['width'] = 100
                }
                                        // 昵称
                if(colums.field_name === "department_id"){
                  colums['align'] = 'center'
                  colums['width'] = 100
                }
                                                    // 昵称
                if(colums.field_name === "department_name"){
                  colums['align'] = 'center'
                  colums['width'] = 100
                }
                // 创建时间
                if(colums.field_name === "create_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }
                // 更新时间
                if(colums.field_name === "update_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }
            }
    
            var op = {
    
                  "dataIndex": "state",
                  "field_name": "state",
                  "field_type": "int",
                  "key": "operation",
                  "title": "操作",
                  "fixed": 'right',
                  "align":"center",
                  "width":100
            }
    
            resdata.colum.push(op) // 添加操作按钮
            this.message.page = resdata.now_page;
            this.message.page_size = resdata.page_size;
        }
    }

    // 抖音订单表头
    douyinorder = {

        add_colum:(resdata)=>{

            for(let colums of resdata.colum){
                // id
                if(colums.field_name === "id"){
                  colums['align'] = 'left'
                  colums['width'] = 60
                }
                // 应用id
                if(colums.field_name === "app_id"){
                  colums['align'] = 'center'
                  colums['width'] = 170
                }
    
                // 店铺
                if(colums.field_name === "shop_id"){
                  colums['align'] = 'center'
                  colums['width'] = 110
                }
    
                // 订单id
                if(colums.field_name === "order_id"){
                  colums['align'] = 'center'
                  colums['width'] = 170
                }


                // 服务开始时间
                if(colums.field_name === "service_start_time"){
                  colums['align'] = 'center'
                  colums['width'] = 160
                }

                // 服务结束时间
                if(colums.field_name === "service_end_time"){
                  colums['align'] = 'center'
                  colums['width'] = 160
                }

                // 状态
                if(colums.field_name === "status"){
                  colums['align'] = 'center'
                  colums['width'] = 60
                }

                // 手机号
                if(colums.field_name === "phone"){
                  colums['align'] = 'center'
                  colums['width'] = 120
                }


                // 支付金额
                if(colums.field_name === "pay_amount"){
                  colums['align'] = 'center'
                  colums['width'] = 60
                }

                // 支付时间
                if(colums.field_name === "pay_time"){
                  colums['align'] = 'center'
                  colums['width'] = 160
                }
                
                // 订单创建时间
                if(colums.field_name === "order_create_time"){
                  colums['align'] = 'center'
                  colums['width'] = 160
                }
                
                // 支付类型
                if(colums.field_name === "pay_type"){
                  colums['align'] = 'center'
                  colums['width'] = 120
                }
                
                // 版本标题
                if(colums.field_name === "title"){
                  colums['align'] = 'center'
                  colums['width'] = 120
                }
                
                // 版本规格
                if(colums.field_name === "spec_value"){
                  colums['align'] = 'center'
                  colums['width'] = 120
                }
                
                // 时长
                if(colums.field_name === "duration"){
                  colums['align'] = 'center'
                  colums['width'] = 60
                }
                // 单位
                if(colums.field_name === "duration_unit"){
                  colums['align'] = 'center'
                  colums['width'] = 60
                }
                // 价格
                if(colums.field_name === "price"){
                  colums['align'] = 'center'
                  colums['width'] = 60
                }
                
                // 规格类型
                if(colums.field_name === "spec_type"){
                  colums['align'] = 'center'
                  colums['width'] = 120
                }

                // 创建时间
                if(colums.field_name === "create_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }



                // 更新时间
                if(colums.field_name === "update_time"){
                  colums['align'] = 'center'
                  colums['width'] = 200
                }
            }
    
            var op = {
    
                  "dataIndex": "state",
                  "field_name": "state",
                  "field_type": "int",
                  "key": "operation",
                  "title": "操作",
                  "fixed": 'right',
                  "align":"center",
                  "width":100
            }
    
            resdata.colum.push(op) // 添加操作按钮
            this.message.page = resdata.now_page;
            this.message.page_size = resdata.page_size;
        }

    }

    // 抖音店铺表头
    douyinshop = {
      
      add_colum:(resdata)=>{

        for(let colums of resdata.colum){
            // id
            if(colums.field_name === "id"){
              colums['align'] = 'left'
              colums['width'] = 160
            }

            // 店铺
            if(colums.field_name === "shop_id"){
              colums['align'] = 'center'
              colums['width'] = 120
            }

            // 店铺名称
            if(colums.field_name === "shop_name"){
              colums['align'] = 'center'
              colums['width'] = 170
            }


            // code
            if(colums.field_name === "shop_code"){
              colums['align'] = 'center'
              colums['width'] = 260
            }

            // 电话
            if(colums.field_name === "mobile"){
              colums['align'] = 'center'
              colums['width'] = 60
            }

            // token
            if(colums.field_name === "access_token"){
              colums['align'] = 'center'
              colums['width'] = 320
            }

            // 有效期
            if(colums.field_name === "expires_in"){
              colums['align'] = 'center'
              colums['width'] = 90
            }


            // 刷新口令
            if(colums.field_name === "refresh_token"){
              colums['align'] = 'center'
              colums['width'] = 320
            }

            // scope
            if(colums.field_name === "scope"){
              colums['align'] = 'center'
              colums['width'] = 70
            }
            
            // 过期日期
            if(colums.field_name === "token_over_time"){
              colums['align'] = 'center'
              colums['width'] = 160
            }
            
            // 店铺状态
            if(colums.field_name === "shop_status"){
              colums['align'] = 'center'
              colums['width'] = 120
            }
            
            // 类型
            if(colums.field_name === "action_type"){
              colums['align'] = 'center'
              colums['width'] = 60
            }
            
            // 绑定信息
            if(colums.field_name === "binding_inf"){
              colums['align'] = 'center'
              colums['width'] = 120
            }
            
            // 默认素材文件夹id
            if(colums.field_name === "material_object_id"){
              colums['align'] = 'center'
              colums['width'] = 360
            }
            // 单位
            if(colums.field_name === "duration_unit"){
              colums['align'] = 'center'
              colums['width'] = 60
            }
            // 价格
            if(colums.field_name === "price"){
              colums['align'] = 'center'
              colums['width'] = 60
            }
            
            // 规格类型
            if(colums.field_name === "spec_type"){
              colums['align'] = 'center'
              colums['width'] = 120
            }

            // 创建时间
            if(colums.field_name === "create_time"){
              colums['align'] = 'center'
              colums['width'] = 200
            }



            // 更新时间
            if(colums.field_name === "update_time"){
              colums['align'] = 'center'
              colums['width'] = 200
            }
        }

        var op = {

              "dataIndex": "state",
              "field_name": "state",
              "field_type": "int",
              "key": "operation",
              "title": "操作",
              "fixed": 'right',
              "align":"center",
              "width":100
        }

        resdata.colum.push(op) // 添加操作按钮
        this.message.page = resdata.now_page;
        this.message.page_size = resdata.page_size;
      }

    }

    // 复制记录表头
    copylog = {
  
      add_colum:(resdata)=>{

        // 过滤不用显示的字段
        resdata.colum.splice(1, 1)// 任务id
        resdata.colum.splice(1, 1)// 店铺id
        resdata.colum.splice(2, 1)// 商品id
        resdata.colum.splice(5, 1)// 主图列表
        resdata.colum.splice(8, 1)// 属性
        resdata.colum.splice(12, 1)// skumap
        resdata.colum.splice(0, 1)// id

        for(let colums of resdata.colum){

            // 店铺id
            if(colums.field_name === "shop_id"){
              colums['align'] = 'center'
              colums['width'] = 100
            }


            // 平台
            if(colums.field_name === "platform"){
              colums['align'] = 'center'
              colums['width'] = 40
              colums['customRender']=(text, record, index) => {
                var res = CopyLog.List.get_platform(text.value)
                return res
              }
            }

            // 商品id
            if(colums.field_name === "item_id"){
              colums['align'] = 'center'
              colums['width'] = 160
            }

            // 头图
            if(colums.field_name === "top_pic"){
              colums['align'] = 'center'
              colums['width'] = 60
            }

            // 白底图
            if(colums.field_name === "white_image"){
              colums['align'] = 'center'
              colums['width'] = 50
            }

            // 视频
            if(colums.field_name === "video_url"){
              colums['align'] = 'center'
              colums['width'] = 50
              colums['customCell']=(record, index)=>{
                var res = CopyLog.List.get_pic(record.video_url)
                return res
              }
            }


            // 主图
            if(colums.field_name === "pic"){
              colums['align'] = 'center'
              colums['width'] = 120
            }

            // 标题
            if(colums.field_name === "title"){
              colums['align'] = 'left'
              colums['width'] = 120
            }
            
            // 规格
            if(colums.field_name === "sku"){
              colums['align'] = 'left'
              colums['width'] = 100
            }
            
            // 规格列表
            if(colums.field_name === "sku_list"){
              colums['align'] = 'center'
              colums['width'] = 60
            }
            
            // 属性
            if(colums.field_name === "format"){
              colums['align'] = 'center'
              colums['width'] = 40
            }
            
            // 描述
            if(colums.field_name === "description"){
              colums['align'] = 'center'
              colums['width'] = 40
            }
            
            // 复制状态
            if(colums.field_name === "state"){
              colums['align'] = 'center'
              colums['width'] = 60
            }

            // 图片上传结果
            if(colums.field_name === "pic_upload_res"){
              colums['align'] = 'center'
              colums['width'] = 80
            }

            // 分类名称
            if(colums.field_name === "cate_name"){
              colums['align'] = 'center'
              colums['width'] = 60
            }
            
            // 规格地图
            if(colums.field_name === "skumap"){
              colums['align'] = 'center'
              colums['width'] = 80
            }

            // 减库存
            if(colums.field_name === "reduce_type"){
              colums['align'] = 'center'
              colums['width'] = 60
            }

            // 运费模板
            if(colums.field_name === "freight_id"){
              colums['align'] = 'center'
              colums['width'] = 60
              colums['customRender']=(text, record, index) => {
                var res = CopyLog.List.get_freight_id(text.value)
                return res
              }
            }

            // 客服电话
            if(colums.field_name === "mobile"){
              colums['align'] = 'center'
              colums['width'] = 80
            }

            // 提交方式
            if(colums.field_name === "commit"){
              colums['align'] = 'center'
              colums['width'] = 80
            }

            // 商品类型
            if(colums.field_name === "product_type"){
              colums['align'] = 'center'
              colums['width'] = 80
            }

            // 创建时间
            if(colums.field_name === "create_time"){
              colums['align'] = 'center'
              colums['width'] = 100
            }

            // 更新时间
            if(colums.field_name === "update_time"){
              colums['align'] = 'center'
              colums['width'] = 100
            }

        }

        var op = {

              "dataIndex": "operation",
              "field_name": "operation",
              "key": "operation",
              "title": "操作",
              "fixed": 'right',
              "align":"center",
              "width":60,

        }

        resdata.colum.push(op) // 添加操作按钮
        this.message.page = resdata.now_page;
        this.message.page_size = resdata.page_size;
      }

    }

}