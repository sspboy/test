// 团队信息请求共享
import axios from "axios";

const API = {
    // 用户管理
    team: {
        "list": "api/admin/team/list",  // [post]列表 [put]data 批量删除
        "detaile": "api/admin/team/",   // [get]+id详情
        "delete": "api/admin/team/",    // [delete]+id删除
        "edit": "api/admin/team/",      // [put]setting_data+id 传数据更新
        "add": "api/admin/team/add"     // [post]
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
        bacth_del:'',
    }
})
/* Getter 操作数据方法==计算属性*/
const getters = {}
/* Mutation 同步操作，对state中数据更新*/
const mutations = {}
/* Action */
const actions = {}
export default {
    state,
    getters,
    mutations,
    actions
}