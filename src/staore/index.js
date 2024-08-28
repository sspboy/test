// store.js
import { createStore, createLogger } from 'vuex'
import left_menu_state from './modules/left_menu_state'
import head_user_msg from './modules/head_user_msg'
import createPersistedState from 'vuex-persistedstate';

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    left:left_menu_state, // 左侧菜单收起、展开状态共享
    head:head_user_msg          // 头部会员信息共享
  },
    namespaced: true,
  strict: debug,
  plugins: debug ? [createLogger(),
      // 数据持久化插件
      createPersistedState({
      storage: window.localStorage, // 或 window.sessionStorage
      paths: ['left', 'head'], // 指定需要持久化的模块

      reducer: (state) => ({

        user_message: state.head.user_message   // 本地缓存用户信息

      })
    })


  ] : []
})
// 用户数据共享

