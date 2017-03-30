<template>
  <div>
    <vux-ButtonTab
      class="language-tab"
      v-model="tabIndex">
      <vux-ButtonTabItem @on-item-click="changeLanguage">English</vux-ButtonTabItem>
      <vux-ButtonTabItem @on-item-click="changeLanguage">中文</vux-ButtonTabItem>
    </vux-ButtonTab>
    <div class="hello">
      <img src="../assets/image/logo.png">
      <h1>\{{ titleText }}</h1>
      <vux-XButton
        type="primary"
        :mini="true"
        @click.native="getData">
        \{{ $t('hello.network') }}
      </vux-XButton>
      <pre>\{{ help }}</pre>
      <ul>
        <li v-for="list of linkList">
          <a :href="list.href" target="_blank">{{ list.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

// import Vue from 'vue'

/** *********************** register directive  ************************* **/
// Vue.directive('focus', {
//   bind: function () {},
//   inserted: function (el) {
//     el.focus()
//   }
// })

/** *********************** register mixin  ************************* **/
// const HELLO_MIXIN = {
//   created () {
//     console.log('hello world')
//   }
// }

import * as apis from 'src/apis'

export default {
  name: 'hello',

  /** *********************** mixin  ************************* **/
  // mixins: [HELLO_MIXIN],

  /** *********************** register local components  ************************* **/
  components: {
  },

  /** ***********************  data from parent component ************************* **/
  props: {
  },

  /** ***********************  local data  ************************* **/
  data () {
    return {
      tabIndex: 0,
      help: 'write in src/components/Hello.vue and save',
      linkList: [
        { href: 'http://router.vuejs.org/', name: 'vue-router' },
        { href: 'http://vuex.vuejs.org/', name: 'vuex' },
        { href: 'http://vue-loader.vuejs.org/', name: 'vue-loader' },
        { href: 'https://github.com/vuejs/awesome-vue', name: 'awesome-vue' }
      ]
    }
  },

  /** ***********************  data after computed  ************************* **/
  computed: {
    titleText () {
      return this.$t('hello.title')
    },
    languageBtnText () {
      return this.$t('hello.languageBtn')
    }
  },

  /** ***********************  life ciycle  ************************* **/

  beforeCreate () {},
  created () {
    this.tabIndex = this.$i18n.locale === 'en' ? 0 : 1
  }, // before dom create

  mounted () {
    // everytime dom render over
    this.$nextTick(_ => {
     // document.getElementsById
    })
  }, // after dom created

  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},

  /** ***********************  functions  ************************* **/
  methods: {

    changeLanguage () {
      this.$i18n.locale = this.tabIndex === 0 ? 'en' : 'zh'
    },

    async getData () {
      this.$vux.loading.show({
        text: this.$t('loading.text')
      })
      try {
        await apis.fetchLogin({})
      } catch ({ message }) {
        this.$vux.alert.show({
          title: message
        })
      } finally {
        this.$vux.loading.hide()
      }
      // Another way
      // this.$createApi(url, params)
      // .then(res => {
      // })
      // .catch(error => {
      // })
      // also can use $http
      // this.$http.post  || this.$http.get
    }

  },

  /** ***********************  watch for data change  ************************* **/
  watch: {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.language-tab {
  margin-top: 0.7rem;
}
.hello {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1.5rem;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
