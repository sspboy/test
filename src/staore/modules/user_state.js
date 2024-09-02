// 会员信息请求共享
import axios from "axios";

const API = {

    // 用户管理
    user: {
        "list": "api/admin/user/list",  // [post]列表 [put]data 批量删除
        "detaile": "api/admin/user/",   // [get]+id详情
        "delete": "api/admin/user/",    // [delete]+id删除
        "edit": "api/admin/user/",      // [put]setting_data+id 传数据更新
        "add": "api/admin/user/add"     // [post]
    }

}

/* State 数据暂存*/
const state = ()=>({

    message: {
        data_list:{},
        detaile:{},
        del_state:'',
        update_state:'',
        add_state:'',
        bacth_del:{}
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
    data_list:(state,resdata)=>{
        state.message.data_list = resdata;
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
    list:({ commit },data)=>{

        // let page = ''
        // let page_size = ''
        // let tiaojian = ''

        let url = ''

        try{
            axios.post(url, data).then((response)=> {
                commit('data_list', response.data)
            })
        }catch (error){

            console.error('user list post request err!',error)

        }

    },
    // 单条查询
    get_user: ({ commit },user_id)=>{

        try{

            let url = API.user.detaile + user_id.user_id

            axios.get(url).then((response)=>{

                commit('detaile', response.data)

            })

        }catch (error){

            console.error('get user detaile request err!',error)

        }
    },
    // 删除
    del_user:({ commit }, user_id)=>{

        let url = API.user.delete + user_id.user_id

        try{

            axios.delete(url).then((response)=>{

                commit('del_state', response.data)

            })
        }catch (error){

            console.error('get user detaile request err!',error)

        }

    },
    // 添加
    add_user:({ commit }, data)=>{

        try{

            let url = API.user.add

            axios.post(url, data).then((response)=>{

                commit('add_state', response.data)

            })

        }catch (error){

            console.error('add user detaile request err!',error)

        }

    },
    // 更新
    update_user:({ commit },user_data)=>{

        let user_id = user_data.user_id

        let data = user_data.data

        try{

            let url = API.user.edit + user_id

            axios.put(url, data).then((response)=>{

                commit('update_state', response.data)

            })

        }catch (error){

            console.error('put user detaile request err!',error)

        }

    },
    // 批量删除
    bacth_del:({ commit },user_data)=>{

        try{

            axios.put(API.user.list, user_data).then((response)=>{

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
    actions
}