<template>

  <div id="app">
    <!-- header start -->
    <XHeader
      :title="headerOptions.title"
      :left-options="headerOptions.left"
      :right-options="headerOptions.right" />
    <!-- header end -->

    <!-- container start -->
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <!-- container end -->

    <!-- tabbar start -->
    <Tabbar>
      <TabbarItem
        v-for="(item, index) of tabbarItems"
        :key="index"
        :selected="isTabbarSelected(item.link)"
        :icon-class="item.icon"
        :link="item.link">
        <span slot="label">\{{ item.name }}</span>
      </TabbarItem>
    </Tabbar>
    <!-- tabbar end -->

    <!-- loading -->
    <div v-transfer-dom>
      <Loading v-model="isLoading" :text="$t('loading.text')" />
    </div>

  </div>

</template>

<script>

import {
  XHeader,
  Tabbar,
  TabbarItem,
  Loading,
  TransferDomDirective as TransferDom
} from 'vux'

import {
  mapState
} from 'vuex'

export default {

  name: 'app',

  directives: {
    TransferDom
  },

  components: {
    XHeader,
    Tabbar,
    TabbarItem,
    Loading
  },

  computed: {

    ...mapState({
      isLoading: state => state.isLoading
    }),

    headerOptions () {
      return {
        title: this.$t('nav.title'),
        left: {
          showBack: true,
          backText: this.$t('nav.back')
        },
        right: {
          showMore: true
        }
      }
    },

    tabbarItems () {
      return [
        {
          link: '/index',
          name: this.$t('tab.index')
        },
        {
          link: '/notFound',
          name: '404'
        }
      ]
    }
  },

  methods: {

    isTabbarSelected (link) {
      return link === this.$route.path
    }

  }

}
</script>

<style lang="scss" scope>
  @import 'src/assets/css/index.scss'
</style>
