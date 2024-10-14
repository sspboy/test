// 【团队信息】--===请求共享
import axios from "axios";
// 引用外部方法
import * as utils from '@/assets/JS_Model/public_model';
const API = new utils.A_Patch()


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
        all_brand_role:[],// 下拉选择品牌下的所有角色
        all_brand_department:[]// 下拉选择品牌下所有的部门
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

        for(let colums of resdata.colum){
            // 账号名称
            if(colums.field_name === "id"){
              colums['align'] = 'left'
              colums['width'] = 40
            }
            // 品牌id
            if(colums.field_name === "name"){
              colums['align'] = 'center'
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
    },


}

/* Action */
const actions = {
// 查询列表
    list:async ({ commit },data)=>{

        try{

            await axios.post(API.BasicsAPI.team.list, data).then((response)=> {

                if(response.data.data !== 'None'){
                    commit('data_list', response.data)
                }


            })

        }catch (error){

            console.error('team list post request err!',error)

        }
    },
    // 查询菜单详情
    get:({ commit }, data)=>{
        try{

            let url = API.BasicsAPI.team.detaile + data.id

            axios.get(url).then((response)=>{

                commit('detaile', response.data)

            })

        }catch (error){

            console.error('get team detaile request err!',error)

        }
    },
    // 添加菜单
    add:({ commit },data)=>{

        try{

            axios.post(API.BasicsAPI.team.add, data).then((response)=>{

                commit('add_state', response.data)

            })

        }catch (error){

            console.error('add team detaile request err!',error)

        }
    },
    // 更新
    update:({ commit }, data)=>{

        try{

            let url = API.BasicsAPI.team.edit + data.id

            axios.put(url, data).then((response)=>{

                commit('update_state', response.data)

            })

        }catch (error){

            console.error('put team detaile request err!',error)

        }
    },
    // 删除菜单
    del:({ commit },data)=>{

        let url = API.BasicsAPI.team.delete + data.id

        try{

            axios.delete(url).then((response)=>{

                commit('del_state', response.data)

            })
        }catch (error){

            console.error('del team detaile request err!',error)

        }
    },
    // 批量删除菜单
    batch_del:({ commit },data)=>{

        try{

            axios.put(API.BasicsAPI.team.list, data).then((response)=>{

                commit('bacth_del', response.data)

            })

        }catch (error){

            console.error('bacth del team request err!',error)

        }
    },
    // 获取当前品牌下所有角色
    get_all_role:async ({ commit }, brand_id)=>{
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

            await axios.post(API.BasicsAPI.role.list, data).then((response)=> {

                commit('data_list', response.data)

            })

        }catch (error){

            console.error('team list post request err!',error)

        }



    },

    // 获取当前品牌下所有的部门
    get_all_department:({ commit },brand_id)=>{

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