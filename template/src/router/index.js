import Vue from 'vue'
import Router from 'vue-router'
import store from 'src/store'
// import processbar
import processbar from 'nprogress'
import 'nprogress/nprogress.css'
// import views
import index from 'views/index'
// async load
const notFound = resolve => import('views/notFound').then(resolve)
const noAccess = resolve => import('views/noAccess').then(resolve)

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
      path: '/noAccess',
      name: 'noAccess',
      component: noAccess
    },
    {
      path: '*',
      component: notFound
    }
  ]
})

// everytime before router
router.beforeEach(async (to, from, next) => {
  store.commit(SET_LOADING_STATUS, { isLoading: true })
  window.scroll(0, 0)
  if (to.path === from.path) return // when you change route in this function, it will invoker twice
  processbar.start() // start process
  // when not dev, everytime user route, check login state
  if (to.matched.some(record => record.meta.requiresAuth) && process.env.NODE_ENV !== 'development') {
  } else next()
})

// everytime after router
router.afterEach(_ => {
  store.commit(SET_LOADING_STATUS, { isLoading: false })
  processbar.done() // end process
})

export default router
