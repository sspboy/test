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
        get_all_department:async (brand_id, callback)=>{
            var data = {}
            data.page = 1
            data.page_size = 1000
            data.condition = [
                {
                    type: "orderby",
                    condition: [{'column_name': 'create_time', 'value': 'DESC', }]
                },
                {
                    type: "where",
                    condition: [{'column_name':'b_id','value':brand_id,'operator':'='}]
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
}