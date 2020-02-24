<template>
    <div id="nav">
      <nav class="navbar is-transparent" v-bind:class="{'is-fixed-bottom':menuPosition}">
        <div class="navbar-brand">
          <div class="navbar-burger burger " v-bind:class="{ 'is-active': menuActive }" v-on:click="menuToggle()" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navbarExampleTransparentExample" class="navbar-menu" v-bind:class="{ 'is-active': menuActive }">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/shumpay">しゅん</router-link>
            <div v-if="userStatus" key="login" class="navbar-item">
              <router-link class="navbar-item" to="/user_info">{{ userBySeisankun.name }}</router-link>
            </div>
          </div>
          <div class="navbar-end">
            <Authentication />
          </div>
        </div>
      </nav>
    </div>
</template>
<script>
import Authentication from '@/components/Authentication'
export default {
  name: 'navigation',
  components: {
    Authentication
  },
  created () {
    if (window.innerWidth < 920) {
      this.menuPosition = !this.menuPosition
    }
  },
  data () {
    return {
      menuActive: false,
      menuPosition: false
    }
  },
  methods: {
    menuToggle () {
      this.menuActive = !this.menuActive
    }
  },
  computed: {
    userBySeisankun () {
      return this.$store.getters.userBySeisankun
    },
    userStatus () {
      return this.$store.getters.isSignedIn
    }
  }
}
</script>

<style scoped>

</style>
