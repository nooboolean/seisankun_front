<template>
    <div id="nav">
      <div id="navbar-left">
        <router-link to="/top"><img class="top-logo" src="@/assets/logo.png"></router-link>
      </div>
      <div id="navbar-right">
        <div v-if="userStatus" key="login" class="nav-user-name">
          <router-link to="/user_info">{{ userBySeisankun.name }}</router-link>
        </div>
        <div class="nav-auth">
          <Authentication />
        </div>
      </div>
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

#navbar-right {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}

.nav-user-name {
  font-size: 100%;
  align-self: center;
  margin-right: 1vw;
}

.nav-auth {
  align-self: center;
}
</style>
