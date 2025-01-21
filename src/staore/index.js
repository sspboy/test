// store.js
import { createStore, createLogger } from 'vuex'
import menu_state from '@/staore/modules/menu_state'
import usermessage_state from '@/staore/modules/usermessage_state'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {

    menu:menu_state,// 菜单+左侧菜单收起、展开状态共享
    member:usermessage_state// 会员信息
  },
  namespaced: true,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
// 用户数据共享

