// 左侧菜单数据共享

/* State 数据暂存*/
const state = ()=>({
    'coll':false,
    'key':['6'],
    'openKeys':['sub1']
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
    // 切换选中的菜单
    switch_menu:(state, payload_obj)=>{
        state.key = payload_obj.key
        state.openKeys = payload_obj.openKeys
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