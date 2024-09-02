// 左侧菜单数据共享

/* State 数据暂存*/
const state = ()=>({
    'coll':false
})

/* Getter 操作数据方法==计算属性*/
const getters = {

}

/* Mutation 同步操作，对state中数据更新*/
const mutations = {
    // 变更导航展开状态
    change:(state)=>{
        state.coll = !state.coll
    }
}

/* Action */
const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}