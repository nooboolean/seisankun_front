<template>
    <div id="nav">
      <div id="navbar-left">
        <router-link v-if="userStatus" to="/top"><img class="top-logo" src="@/assets/logo.002.png"></router-link>
        <router-link v-else to="/"><img class="top-logo" src="@/assets/logo.002.png"></router-link>
      </div>
      <Authentication />
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
  computed: {
    userStatus () {
      return this.$store.getters.isSignedIn
    }
  },
  methods: {
    menuToggle () {
      this.menuActive = !this.menuActive
    }
  }
}
</script>

<style scoped>
#nav {
  /* box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.4); */
  border-bottom: solid 1px #fff;
  padding: 5px 5%;
  display: flex;
}

.top-logo {
  margin-top: 5px;
  width: 50%;
  max-width: 80px;
}

#navbar-left {
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
}
</style>
