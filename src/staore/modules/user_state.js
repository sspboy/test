// 会员信息请求共享
import axios from "axios";
// 引用外部方法===接口地址
import * as utils from '@/assets/JS_Model/public_model';
const API = new utils.A_Patch()

/* State 数据暂存*/
const state = ()=>({

    message: {
        condition:'None',
        page:1,
        page_size:10,
        data_list:{},
        detaile:{},
        del_state:'',
        update_state:'',
        add_state:'',
        bacth_del:''
    }

})

/* Getter 操作数据方法==计算属性*/
const getters = {}

/* Mutation 同步操作，对state中数据更新*/
const mutations = {

    // 更新详情
    detaile:(state,resdata)=>{
        state.message.detaile = resdata;
    },

    // 更新列表
    data_list:(state, resdata)=>{
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
        state.message.page = resdata.now_page;
        state.message.page_size = resdata.page_size;
        state.message.data_list = resdata; // 接口返回数据
    },

    // 更新删除
    del_state:(state,resdata)=>{
        state.message.del_state = resdata;
    },

    // 更新编辑
    update_state:(state,resdata)=>{
        state.message.update_state = resdata;
    },

    // 更新编辑
    add_state:(state,resdata)=>{
        state.message.add_state = resdata;
    },

    // 批量删除
    bacth_del:(state,resdata)=>{
        state.message.bacth_del = resdata;
    }

}

/* Action */
const actions ={

    // 列表查询
    list:async ({ commit }, data)=>{

        try{

            await axios.post(API.AdminAPI.user.list, data).then((response)=> {

                commit('data_list', response.data)

            })

        }catch (error){

            console.error('user list post request err!',error)

        }

    },
    // 单条查询
    get: ({ commit },data)=>{

        try{

            let url = API.AdminAPI.user.detaile + data.user_id

            axios.get(url).then((response)=>{

                commit('detaile', response.data)

            })

        }catch (error){

            console.error('get user detaile request err!',error)

        }
    },
    // 删除
    del:({ commit }, user_id)=>{

        let url = API.AdminAPI.user.delete + user_id.user_id

        try{

            axios.delete(url).then((response)=>{

                commit('del_state', response.data)

            })
        }catch (error){

            console.error('get user detaile request err!',error)

        }

    },
    // 添加
    add:({ commit }, data)=>{

        try{

            axios.post(API.AdminAPI.user.add, data).then((response)=>{

                commit('add_state', response.data)

            })

        }catch (error){

            console.error('add user detaile request err!',error)

        }

    },
    // 更新
    update:({ commit },user_data)=>{

        let user_id = user_data.user_id

        try{

            let url = API.AdminAPI.user.edit + user_id

            axios.put(url, user_data).then((response)=>{

                commit('update_state', response.data)

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


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
    // namespaced: true  命名空间这一行一定要写，这是vuex寻找子组件的依据；
}