// 部门&&团队成员
// 引用外部方法
import * as utils from '@/assets/JS_Model/public_model';
const API = new utils.A_Patch()
import axios from "axios";

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

            var shu = this.Table_List.test(data)


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