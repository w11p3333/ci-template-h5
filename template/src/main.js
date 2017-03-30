// import base module
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import i18n
import i18n from './i18n'
// import fastclick
import fastClick from 'fastclick'
// import components
import components from './components'
// import components framework
import CIComponents from 'ci-components-h5'

// remember to Vue.use() every module
Vue.use(CIComponents)

// register global components  make hello => ci-hello
components.map(component => {
  Vue.component(`ci-${component.name}`, component)
})

fastClick.attach(document.body)

// rem
document.getElementsByTagName('html')[0].style.fontSize = (window.innerWidth / 375 * 50) + 'px'

// mounted vue to App component
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  render: h => h(App),
  template: '<App/>',
  components: { App }
})
