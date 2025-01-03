// 部门-【组织架构】===信息请求共享
import axios from "axios";
// 引用外部方法
import * as utils from '@/assets/JS_Model/public_model';
import * as DEP from "@/assets/JS_Model/TableOperate";

const API = new utils.A_Patch()
const Depart = new DEP.Depart()

/* State 数据暂存*/
const state = ()=>({
    message: {
        condition:'None',
        page:1,
        page_size:10,
        data_list:undefined,
        detaile:{},
        del_state:'',
        update_state:'',
        add_state:'',
        bacth_del:'',
    }
})
/* Getter 操作数据方法==计算属性*/
const getters = {}


/* Mutation 同步操作，对state中数据更新*/
const mutations = {
    // 更新>详情
    detaile:(state, resdata)=>{
        state.message.detaile = resdata;
    },

    // 更新>列表
    data_list:(state, resdata)=>{

        var neirong_list = Depart.Table_List.get_tree(resdata.data)

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
        state.message.page = resdata.now_page;
        state.message.page_size = resdata.page_size;
        state.message.data_list = resdata; // 接口返回数据

    },

    // 更新>删除
    del_state:(state,resdata)=>{
        state.message.del_state = resdata;
    },

    // 更新>编辑
    update_state:(state,resdata)=>{
        state.message.update_state = resdata;
    },

    // 更新>编辑
    add_state:(state,resdata)=>{
        state.message.add_state = resdata;
    },

    // 批量>删除
    bacth_del:(state,resdata)=>{
        state.message.bacth_del = resdata;
    }


}

/* Action */
const actions = {

    // 查询列表
    list:async ({ commit },data)=>{

        try{

            await axios.post(API.BasicsAPI.department.list, data).then((response)=> {

                if(response.data.data !== 'None'){

                    commit('data_list', response.data)

                }


            })

        }catch (error){

            console.error('department list post request err!',error)

        }
    },
    // 查询菜单详情
    get:({ commit }, data)=>{

        try{

            let url = API.BasicsAPI.department.detaile + data.id

            axios.get(url).then((response)=>{

                commit('detaile', response.data)

            })

        }catch (error){

            console.error('get department detaile request err!',error)

        }
    },
    // 添加菜单
    add:({ commit },data)=>{

        try{

            axios.post(API.BasicsAPI.department.add, data).then((response)=>{

                commit('add_state', response.data)

            })

        }catch (error){

            console.error('add department detaile request err!',error)

        }
    },
    // 更新
    update:({ commit }, data)=>{

        try{

            let url = API.BasicsAPI.department.edit + data.id

            axios.put(url, data).then((response)=>{

                commit('update_state', response.data)

            })

        }catch (error){

            console.error('put department detaile request err!',error)

        }

    },
    // 删除菜单
    del:({ commit },data)=>{

        let url = API.BasicsAPI.department.delete + data.id

        try{

            axios.delete(url).then((response)=>{

                commit('del_state', response.data)

            })
        }catch (error){

            console.error('del department detaile request err!', error)

        }
    },
    // 批量删除菜单
    batch_del:({ commit },data)=>{

        try{

            axios.put(API.BasicsAPI.department.list, data).then((response)=>{

                commit('bacth_del', response.data)

            })

        }catch (error){

            console.error('bacth del department request err!',error)

        }
    }


}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,// 空间命名，独立隔离
    // namespaced: true  命名空间这一行一定要写，这是vuex寻找子组件的依据；
}