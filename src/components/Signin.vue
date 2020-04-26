<template>
  <div>
    <h1 class="title">ログイン</h1>
    <div class="base-box login">
      <img class="logo" src="@/assets/logo.002.png">
      <div class="input-container">
        <input class="login-text" type="text" placeholder="メールアドレス" v-model="email" v-bind:class="{'valid-error-active': Validation.email}">
        <div class="valid-message-container">
          <p v-if="Validation.email" class="valid-error">
            {{ Validation.email }}
          </p>
        </div>
      </div>
      <div class="input-container">
        <input class="login-text" type="password" placeholder="パスワード" v-model="password" v-bind:class="{'valid-error-active': Validation.password}">
        <div class="valid-message-container">
          <p v-if="Validation.password" class="valid-error">
            {{ Validation.password }}
          </p>
        </div>
      </div>
      <button class="login-button" @click="validForm">ログイン</button>
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
      password: '',
      Validation: {
        email: null,
        password: null
      }
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
    validForm: function (e) {
      let validEmail = false
      let validPassword = false

      // メールアドレスのバリデーション
      if (!this.email.trim()) {
        this.Validation.email = 'メールアドレスの入力は必須です'
      } else if (!this.email.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)) {
        this.Validation.email = '正しいメールアドレスを入力してください'
      } else {
        this.Validation.email = null
        validEmail = true
      }

      // パスワードのバリデーション
      if (!this.password.trim()) {
        this.Validation.password = 'パスワードの入力は必須です'
      } else if (!this.password.match(/^[A-Za-z0-9]*$/)) {
        this.Validation.password = 'パスワードは半角英数字でご入力ください'
      } else {
        this.Validation.password = null
        validPassword = true
      }

      if (validEmail === true && validPassword === true) {
        this.signIn()
      } else {
        scrollTo(0, 0)
      }
      e.preventDefault()
    },
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
  width: 60%;
  font-size: 75%;
}

.signup-path-button{
  color: #2c3e50;
  cursor: pointer;
}
.input-container {
  width: 60%;
}

.login-text{
  width: 90%;
}

.logo {
  width: 50%;
}
button{
  margin-top: 10px;
  width: 60%;
  height: 40px;
}
</style>
