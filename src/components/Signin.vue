<template>
  <div class="login">
    <h2 class="title">Login</h2>
    <input type="text" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <button class="login-button" @click="signIn">Login</button>
    <p>You don't have an account?
      <router-link to="/signup">create account now!!</router-link>
    </p>
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
  methods: {
    signIn: async function () {
      await Firebase.onAuth()
      Firebase.login(this.email, this.password)
    }
  }
}
</script>

<style scoped>
.title {
  letter-spacing: 10px;
}
.login {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  /* justify-content: center; */
  justify-content: flex-end;
  align-items: center
}
</style>
