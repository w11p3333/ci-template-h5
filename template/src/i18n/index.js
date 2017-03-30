// import i18n
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'

// default chinese also can switch to 'en'
Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  messages: {
    en: {
      ...en
    },
    zh: {
      ...zh
    }
  }
})
