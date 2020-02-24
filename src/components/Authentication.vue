<template>
  <div class="authentication">
    <!-- ログイン時にはフォームとログアウトボタンを表示 -->
    <div v-if="userStatus" key="login" class="navbar-item">
      <button class="nav-auth-button" @click="signOut">Sign out</button>
    </div>
    <!-- 未ログイン時にはログインボタンを表示 -->
    <div v-else key="logout">
      <button @click="signIn">Signin</button>
      <button @click="signUp">Signup</button>
    </div>
  </div>
</template>
<script>
import Firebase from '../plugins/firebase'
export default {
  name: 'authentication',
  created: function () {
    Firebase.onAuth()
  },
  computed: {
    userStatus () {
      return this.$store.getters.isSignedIn
    }
  },
  methods: {
    signIn () {
      this.$router.push('/signin')
    },
    signUp () {
      this.$router.push('/signup')
    },
    signOut () {
      Firebase.logout()
    }
  }
}
</script>
<style scoped>
.nav-auth-button{
  padding: 5px 5px;
  background-color: #1db8a3;
  color: #fff;
}
.nav-auth-button:hover{
  background-color: #fff;
  color: #1db8a3;
}
</style>
