<template>
  <div>
    <h1 class="title">会員登録</h1>
    <div class="base-box signup">
      <img class="logo" src="@/assets/logo.002.png">
      <div class="input-container">
        <p class="input-label">メールアドレス</p>
        <input type="text" placeholder="メールアドレス" v-model="email">
      </div>
      <div class="input-container">
        <p class="input-label">パスワード</p>
        <input type="password" placeholder="パスワード" v-model="password">
      </div>
      <div class="input-container">
        <p class="input-label">名前</p>
        <input type="text" placeholder="名前" v-model="name">
      </div>
      <!-- <h3>性別</h3>
      <select v-model="genderSelected">
        <option v-for="gender in genderOptions" v-bind:value="gender.value">
          {{ gender.text }}
        </option>
      </select> -->
      <!-- <h3>自己紹介文</h3>
      <textarea placeholder="Profile" v-model="profile"></textarea> -->
      <p class="terms-prompt"><router-link to="/tos" class="terms-button">利用規約</router-link>に同意の上会員登録してください</p>
      <button @click="signUp">会員登録</button>
      <div class="signin-router">
        <p>すでに会員登録がお済みの方はこちら</p>
        <router-link to="/signin" class="signin-path-button">ログイン</router-link>
      </div>
    </div>
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
      genderSelected: 0,
      genderOptions: [
        { text: '未設定', value: 0 },
        { text: '男', value: 1 },
        { text: '女', value: 2 },
        // eslint-disable-next-line standard/object-curly-even-spacing
        { text: 'その他', value: 4}
      ],
      profile: null,
      createdBy: 0
    }
  },
  methods: {
    signUp: async function () {
      if (!this.name) {
        this.name = '名無し'
      }
      let userByFirebase = await Firebase.signupByEmailAndPassword(this.email, this.password)
      this.$seisankunApi.post('/v1/user/info/register', {
        uid: userByFirebase.uid,
        name: this.name,
        gender: this.genderSelected,
        profile: this.profile,
        createdBy: this.createdBy
      })
        .then(async response => {
          this.$store.commit('onFirebaseAuthStateChanged', userByFirebase)
          this.$store.commit('onSeisankunAuthStateChanged', response.data)
          this.$store.commit('onUserStatusChanged', !!userByFirebase.uid)
          alert('会員登録完了！\n 引き続きサービスをご利用ください')
          await this.$router.push(this.$store.getters.redirectUrl)
          this.$store.commit('setRedirectUrl', null)
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    }
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
.signup {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center
}
.input-container{
  margin-bottom: 10px;
  text-align: left;
}
.input-label{
  margin: 0;
  padding:0;
  color: #2c3e50;
  font-size: 3vw;
}
input {
  margin:0;
  width: 50vw;
}
.terms-prompt{
  margin-top: 10px;
  font-size: 3vw;
}
.terms-button{
  color: #2c3e50;
}
.base-box{
  background-color: #1db8a3;
}

.signin-router{
  margin-top: 30px;
  font-size: 3vw;
}

.signin-path-button{
  color: #2c3e50;
  cursor: pointer;
}

.logo {
  width: 45vw;
}
</style>
