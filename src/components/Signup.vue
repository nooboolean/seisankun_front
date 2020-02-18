<template>
  <div class="signup">
    <h2>会員登録</h2>
    <input type="text" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <input type="text" placeholder="Name" v-model="name">
    <input type="text" placeholder="Gender" v-model="gender">
    <input type="text" placeholder="Profile" v-model="profile">
    <button @click="signUp">Register</button>
    <p>すでに会員登録がお済みの方はこちら</p>
      <router-link to="/signin">ログイン</router-link>
  </div>
</template>

<script>
import Firebase from '../plugins/firebase'

export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      name: null,
      gender: 0,
      profile: null,
      createdBy: 0,
      user: ''
    }
  },
  methods: {
    signUp: async function () {
      this.user = await Firebase.signupByEmailAndPassword(this.email, this.password)
      await this.$notRequiresAuthApi.post('/v1/user/info/register', {
      // eslint-disable-next-line no-undef
        uid: this.user.uid,
        name: this.name,
        gender: this.gender,
        profile: this.profile,
        createdBy: this.createdBy
      })
        .then(response => {
          this.info = response.data
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
          // eslint-disable-next-line no-unused-expressions
          (this.errored = true),
          (this.error = err)
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
