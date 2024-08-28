// 会员信息请求共享
import axios from "axios";
import {ref} from "vue"

/* State 数据暂存*/
const state = ()=>({
    user_message: {
        data:{}
    }

})

/* Getter 操作数据方法==计算属性*/
const getters = {}

/* Mutation 同步操作，对state中数据更新*/
const mutations = {

    SetData:(state,resdata)=>{

        state.user_message.data = resdata;

    }
}

/* Action */
const actions ={

    get_user:({ commit },user_id)=>{

        try{

            let url = 'api/admin/user/' + user_id

            axios.get(url).then((response)=>{

                commit('SetData', response.data)

            })

        }catch (error){

            console.error('post request err!',error)

        }
    }


}


export default {
    state,
    getters,
    mutations,
    actions
}