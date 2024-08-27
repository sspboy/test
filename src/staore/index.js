// store.js
import { createStore, createLogger } from 'vuex'
import left_menu_state from './modules/left_menu_state'
import head_user_msg from './modules/head_user_msg'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    left:left_menu_state, // 左侧菜单收起、展开状态共享
    head:head_user_msg          // 头部会员信息共享
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
// 用户数据共享