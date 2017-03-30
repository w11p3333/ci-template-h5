<template>

  <div id="app">
    <!-- header start -->
    <vux-XHeader
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
    <vux-Tabbar>
      <vux-TabbarItem
        v-for="item of tabbarItems"
        :key="index"
        :selected="isTabbarSelected(item.link)"
        :icon-class="item.icon"
        :link="item.link">
        <span slot="label">\{{ item.name }}</span>
      </vux-TabbarItem>
    </vux-Tabbar>
    <!-- tabbar end -->

  </div>

</template>

<script>
export default {

  name: 'app',

  computed: {

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
  body {
    font-size: 0.25rem;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
