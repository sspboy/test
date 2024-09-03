// store.js
import { createStore, createLogger } from 'vuex'
import menu_state from './modules/menu_state'
import user_state from './modules/user_state'
import createPersistedState from 'vuex-persistedstate';



const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    menu:menu_state,       // 左侧菜单收起、展开状态共享
    user:user_state       // 头部会员信息共享
  },
    namespaced: true,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
// 用户数据共享

