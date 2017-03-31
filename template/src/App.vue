<template>

  <div id="app" class="container">
    <!-- header start -->
    <XHeader
      :transition="headerTransition"
      :title="headerTitle"
      :left-options="headerOptions.left"
      :right-options="headerOptions.right"
      @on-click-title="scrollToTop" />
    <!-- header end -->

    <!-- container start -->
    <div class="content">
      <ButtonTab
        class="language-tab"
        v-model="tabIndex">
        <ButtonTabItem @on-item-click="changeLanguage">English</ButtonTabItem>
        <ButtonTabItem @on-item-click="changeLanguage">中文</ButtonTabItem>
      </ButtonTab>
      <transition :name="'pop-' + (direction === 'forward' ? 'in' : 'out')">
        <router-view class="router-view" />
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
  ButtonTab,
  ButtonTabItem,
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
    ButtonTab,
    ButtonTabItem,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading
  },

  data () {
    return {
      tabIndex: 0
    }
  },

  computed: {

    ...mapState({
      isLoading: state => state.isLoading,
      direction: state => state.direction
    }),

    headerTransition () {
      return this.direction === 'forward' ? 'header-fade-in-right' : 'header-fade-in-left'
    },

    headerTitle () {
      for (const item of this.tabbarItems) if (this.isTabbarSelected(item.link)) return item.name
    },

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
          link: { name: 'index', query: this.$route.query },
          name: this.$t('tab.index')
        },
        {
          link: { path: '/notFound', query: this.$route.query },
          name: '404'
        }
      ]
    }
  },

  methods: {

    scrollToTop () {
      window.scroll(0, 0)
    },

    changeLanguage () {
      this.$i18n.locale = this.tabIndex === 0 ? 'en' : 'zh'
    },

    isTabbarSelected ({ link, name }) {
      return link === this.$route.path || name === this.$route.name
    }

  }

}
</script>

<style lang="scss" scope>
  @import 'src/assets/css/index.scss';

  .language-tab {
    margin-top: .2rem;
  }
</style>
