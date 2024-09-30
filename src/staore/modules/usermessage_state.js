// 会员信息请求共享
import axios from "axios";
// 引用外部方法
import * as utils from '@/assets/JS_Model/public_model';
const API = new utils.A_Patch()


/* State 数据暂存*/
const state = ()=>({
    message: {
        user_data:{},
        menu:[]
    }
})

/* Getter 操作数据方法==计算属性*/
const getters = {}


/* Mutation 同步操作，对state中数据更新*/
const mutations = {
    // 更新>详情
    detaile:(state, resdata)=>{
        state.message.menu = resdata.menu;
        delete resdata.menu
        state.message.user_data = resdata;

    },

}


/* Action */
const actions = {
    // 查询登录用户的信息
    get:({ commit })=>{

        try{

            let url = API.AdminAPI.user.message

            axios.get(url).then((response)=>{

                commit('detaile', response.data)

            })

        }catch (error){

            console.error('get team detaile request err!',error)

        }
    },
}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,// 空间命名，独立隔离
    // namespaced: true  命名空间这一行一定要写，这是vuex寻找子组件的依据；
}