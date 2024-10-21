// 部门&&团队成员
// 引用外部方法
import * as utils from '@/assets/JS_Model/public_model';
const API = new utils.A_Patch()
import axios from "axios";

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
                            newArr.push({...item, children: ArrayToTree(arr, item.id), "key":item.id})
                        }else {
                            newArr.push({...item, "key":item.id})
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
                  colums['width'] = 180
                }
                // 版本id
                if(colums.field_name === "v_id"){
                  colums['align'] = 'center'
                  colums['width'] = 74
                }
                // 昵称
                if(colums.field_name === "nickname"){
                  colums['align'] = 'center'
                  colums['width'] = 100
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

    ver_colum={}


}