<template>

  <div id="app" class="container">
    <!-- header start -->
    <XHeader
      :title="headerOptions.title"
      :left-options="headerOptions.left"
      :right-options="headerOptions.right" />
    <!-- header end -->

    <!-- container start -->
    <div class="content">
      <ButtonTab
        class="language-tab"
        v-model="tabIndex">
        <ButtonTabItem @on-item-click="changeLanguage">English</ButtonTabItem>
        <ButtonTabItem @on-item-click="changeLanguage">中文</ButtonTabItem>
      </ButtonTab>
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

    changeLanguage () {
      this.$i18n.locale = this.tabIndex === 0 ? 'en' : 'zh'
    },

    isTabbarSelected (link) {
      return link === this.$route.path
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
