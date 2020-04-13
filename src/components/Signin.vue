<template>
  <div>
    <h1 class="title">ログイン</h1>
    <div class="base-box login">
      <img class="logo" src="@/assets/logo.002.png">
      <input class="login-text" type="text" placeholder="メールアドレス" v-model="email">
      <input class="login-text" type="password" placeholder="パスワード" v-model="password">
      <button class="login-button" @click="signIn">ログイン</button>
      <div class="signup-router">
        <p>会員をお持ちでない方はこちらから</p>
        <router-link to="/signup" class="signup-path-button">新規会員登録へ</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from '../plugins/firebase'

export default {
  name: 'Signin',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  created () {
    if (this.$store.getters.redirectUrl === null) {
      let redirectUrl = this.$route.query.redirectUrl
      if (typeof redirectUrl === 'undefined') {
        redirectUrl = '/top'
      }
      if (this.$store.getters.isSignout) {
        redirectUrl = null
      }
      this.$store.commit('setRedirectUrl', redirectUrl)
      this.$store.commit('setSignoutState', false)
    }
  },
  methods: {
    signIn: async function () {
      await Firebase.onAuth()
      await Firebase.login(this.email, this.password, this.$store.getters.redirectUrl)
    }
  }
}
</script>

<style scoped>
.title {
  font-family: 'Hiragino Kaku Gothic Pro';
}
.login {
  background-color :#1db8a3;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center
}

.signup-router{
  margin-top: 20px;
  font-size: 3vw;
}

.signup-path-button{
  color: #2c3e50;
  cursor: pointer;
}

.login-text{
  width: 45vw;
}

.logo {
  width: 45vw;
}
</style>
