// ================================
// user module
// ================================
import {
  LOGIN,
  LOGIN_OUT
} from 'src/consts'
import { fetchLogin } from 'src/apis'

/** state */
const state = {
  userInfo: null, // 用户基本信息
  isLogin: false // 是否登录
}

/** fetch login */
const login = async ({ commit, state }, params) => {
  if (state.isLogin) return
  try {
    const { data } = await fetchLogin(params)
    commit(LOGIN, data)
  } catch (e) {
    commit(LOGIN_OUT)
  }
}

/** action */
const actions = {
  login
}

/** mutations */
const mutations = {
  [LOGIN] (state, userInfo) {
    state.userInfo = userInfo
    state.isLogin = true
  },
  [LOGIN_OUT] (state) {
    state.userInfo = null
    state.isLogin = false
  }
}

export default {
  state,
  actions,
  mutations
}
