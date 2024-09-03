// 左侧菜单数据共享
import axios from "axios";

const API = {

    // 菜单管理
    menu:{
        "list": "api/admin/menu/list",  // [post]列表 [put]data 批量删除
        "detaile": "api/admin/menu/",   // [get]+id详情
        "delete": "api/admin/menu/",    // [delete]+id删除
        "edit": "api/admin/menu/",      // [put]setting_data + id 传数据更新
        "add": "api/admin/menu/add"     // [post]
    }

}

/* State 数据暂存*/
const state = ()=>({
    'coll':false,
    message: {
        data_list:{},
        detaile:{},
        del_state:'',
        update_state:'',
        add_state:'',
        bacth_del:'',
    }
})

/* Getter 操作数据方法==计算属性*/
const getters = {

}

/* Mutation 同步操作，对state中数据更新*/
const mutations = {
    // 变更导航展开状态
    change:(state)=>{
        state.coll = !state.coll
    },
    // 更新>详情
    detaile:(state, resdata)=>{
        state.message.detaile = resdata;
    },

    // 更新>列表
    data_list:(state,resdata)=>{
        state.message.data_list = resdata;
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
        state.menu_message.bacth_del = resdata;
    }
}

/* Action */
const actions = {

    // 查询列表
    list:({ commit },data)=>{
        try{

            axios.post(API.menu.list, data).then((response)=> {

                commit('data_list', response.data)

            })

        }catch (error){

            console.error('meun list post request err!',error)

        }
    },
    // 查询菜单详情
    get_menu:({ commit }, data)=>{
        try{

            let url = API.menu.detaile + data.m_id

            axios.get(url).then((response)=>{

                commit('detaile', response.data)

            })

        }catch (error){

            console.error('get menu detaile request err!',error)

        }
    },
    // 添加菜单
    add_menu:({ commit },data)=>{

        try{

            axios.post(API.menu.add, data).then((response)=>{

                commit('add_state', response.data)

            })

        }catch (error){

            console.error('add user detaile request err!',error)

        }
    },
    // 更新
    update_menu:({ commit }, data)=>{

        let m_id = data.id

        try{

            let url = API.menu.edit + m_id

            axios.put(url, data).then((response)=>{

                commit('update_state', response.data)

            })

        }catch (error){

            console.error('put user detaile request err!',error)

        }
    },
    // 删除菜单
    del_menu:({ commit },data)=>{

        let url = API.menu.delete + data.m_id

        try{

            axios.delete(url).then((response)=>{

                commit('del_state', response.data)

            })
        }catch (error){

            console.error('get menu detaile request err!',error)

        }
    },
    // 批量删除菜单
    bacth_del:({ commit },data)=>{

        try{

            axios.put(API.menu.list, data).then((response)=>{

                commit('bacth_del', response.data)

            })

        }catch (error){

            console.error('bacth del menu request err!',error)

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