<template>
  <div class="authentication">
    <!-- ログイン時にはフォームとログアウトボタンを表示 -->
    <div v-if="userStatus" key="login" class="navbar-item">
      <p class="navbar-item">{{ user.displayName }}</p>
      <button @click="signOut">Sign out</button>
    </div>
    <!-- 未ログイン時にはログインボタンを表示 -->
    <div v-else key="logout">
      <button @click="signIn">Signin</button>
    </div>
  </div>
</template>
<script>
import Firebase from './../firebase'
export default {
  name: 'authentication',
  created: function () {
    Firebase.onAuth()
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    userStatus () {
      return this.$store.getters.isSignedIn
    }
  },
  methods: {
    signIn () {
      this.$router.push('/signin')
    },
    signOut () {
      Firebase.logout()
    }
  }
}
</script>
<style scoped>

</style>
