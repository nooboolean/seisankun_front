<template>
  <div class="signup">
    <h2>会員登録</h2>
    <div class="base-box">
      <p>メールアドレス</p>
      <input type="text" placeholder="Email" v-model="email">
      <h3>パスワード</h3>
      <input type="password" placeholder="Password" v-model="password">
      <h3>名前</h3>
      <input type="text" placeholder="Name" v-model="name">
      <h3>年齢</h3>
      <select v-model="genderSelected">
        <option v-for="gender in genderOptions" v-bind:value="gender.value">
          {{ gender.text }}
        </option>
      </select>
      <h3>自己紹介文</h3>
      <textarea placeholder="Profile" v-model="profile"></textarea>
      <button @click="signUp">会員登録</button>
      <p>すでに会員登録がお済みの方はこちら</p>
      <router-link to="/signin">ログイン</router-link>
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
        .then(response => {
          this.$store.commit('onFirebaseAuthStateChanged', userByFirebase)
          this.$store.commit('onSeisankunAuthStateChanged', response.data)
          this.$store.commit('onUserStatusChanged', !!userByFirebase.uid)
          alert('会員登録完了！\n 引き続きサービスをご利用ください')
          this.$router.push('/top')
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

.base-box{
  background-color: #1db8a3;
}
</style>
