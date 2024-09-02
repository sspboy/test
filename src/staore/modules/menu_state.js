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
    coll:false,
    message: {
        data_list:{},
        detaile:{},
        del_state:'',
        update_state:'',
        add_state:'',
        bacth_del:{},
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
    detaile:(state,resdata)=>{
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
        state.message.bacth_del = resdata;
    }
}

/* Action */
const actions = {

    // 查询列表
    list:()=>{

    },
    // 查询菜单详情
    get_menu:()=>{

    },
    // 添加菜单
    add_menu:()=>{

    },
    // 编辑菜单
    update_menu:()=>{

    },
    // 删除菜单
    del_menu:()=>{

    },
    // 批量删除菜单
    bacth_del:()=>{

    }

}

export default {
    state,
    getters,
    mutations,
    actions
}