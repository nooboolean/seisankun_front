<template>
    <div id="nav">
      <div id="navbar-left">
        <router-link to="/top"><img class="top-logo" src="@/assets/logo.png"></router-link>
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
  methods: {
    menuToggle () {
      this.menuActive = !this.menuActive
    }
  }
}
</script>

<style scoped>
#nav {
  box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.4);
  border-bottom: solid 1px #fff;
  padding: 5px 5vw;
  display: flex;
}

.top-logo {
  margin-top: 5px;
  width: 10vw;
  max-width: 80px;
}

#navbar-left {
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
}
</style>
