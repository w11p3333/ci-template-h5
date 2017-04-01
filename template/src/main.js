// import base module
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import components
import components from './components'
// import i18n
import i18n from './i18n'
// import fastclick
import fastClick from 'fastclick'
// import what you need from vux
import {
  LoadingPlugin,
  AlertPlugin,
  WechatPlugin
} from 'vux'
// import css
import 'vux/src/styles/reset.less'
import 'ci-components-h5/css/index.scss'

// use module
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(WechatPlugin)

// register global components  make hello => ci-hello
components.map(component => {
  Vue.component(component.name, component)
})

// fastClick
fastClick.attach(document.body)

// rem
const deviceWidth = 750
document.getElementsByTagName('html')[0].style.fontSize = (window.innerWidth / deviceWidth * 100) + 'px'

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
