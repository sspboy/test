// store.js
import { createStore, createLogger } from 'vuex'
import menu_state from '@/staore/modules/menu_state'
import user_state from '@/staore/modules/user_state'
import fun_state from '@/staore/modules/fun_state'
import ver_state from '@/staore/modules/ver_state'
import usermessage_state from '@/staore/modules/usermessage_state'

import createPersistedState from 'vuex-persistedstate';

import department_state from "@/staore/modules/department_state";
import team_state from "@/staore/modules/team_state";
import role_state from "@/staore/modules/role_state";


const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    role:role_state,// 角色
    team:team_state,// 团队
    department:department_state,// 组织架构
    ver:ver_state,// 版本
    fun:fun_state,// 功能
    menu:menu_state,// 菜单+左侧菜单收起、展开状态共享
    user:user_state, // 用户
    member:usermessage_state// 会员信息
  },
  namespaced: true,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
// 用户数据共享

