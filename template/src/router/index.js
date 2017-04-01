import Vue from 'vue'
import Router from 'vue-router'
import store from 'src/store'
import {
  SET_LOADING_STATUS,
  SET_DIRECTION
} from 'src/consts'
// import processbar
import processbar from 'nprogress'
import 'nprogress/nprogress.css'
processbar.configure({ showSpinner: false })
// import views
import index from 'views/index'
// async load
const notFound = resolve => import('views/notFound').then(resolve)

Vue.use(Router)

const meta = { requiresAuth: true } // pages with meta need auth

const router = new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      meta
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '*',
      component: notFound
    }
  ]
})

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

const setDirection = (to, from) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) store.commit(SET_DIRECTION, 'forward')
    else store.commit(SET_DIRECTION, 'reverse')
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit(SET_DIRECTION, 'forward')
  }
}

// everytime before router
router.beforeEach(async (to, from, next) => {
  store.commit(SET_LOADING_STATUS, true)
  // about animation direction
  setDirection(to, from)
  // scroll to top
  window.scroll(0, 0)
  if (to.path === from.path) return // when you change route in this function, it will invoker twice
  processbar.start() // start process
  // when not dev, everytime user route, check login state
  if (to.matched.some(record => record.meta.requiresAuth) && process.env.NODE_ENV !== 'development') {
    // const LOGIN_URL = ''
    const { appkey } = to.query
    try {
      if (appkey === undefined) throw new Error('参数缺失')
      // check login
      await store.dispatch('login', { appkey })
      const { isLogin, userInfo } = store.state.user // get login state
      console.log(`当前用户登录状态为已登录: ${isLogin} 用户信息: ${userInfo}`)
      if (!isLogin) throw new Error('登录失败')
      else next()
    } catch (error) {
      console.log(error)
      // window.location.href = `${LOGIN_URL}&appkey=${appkey}`
    }
  } else next()
})

// everytime after router
router.afterEach(_ => {
  store.commit(SET_LOADING_STATUS, false)
  processbar.done() // end process
})

export default router
