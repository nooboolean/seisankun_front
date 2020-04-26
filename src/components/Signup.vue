<template>
  <div>
    <h1 class="title">会員登録</h1>
    <div class="base-box signup">
      <img class="logo" src="@/assets/logo.002.png">
      <div class="input-container">
        <p class="input-label">メールアドレス</p>
        <input type="text" placeholder="メールアドレス" v-model="email" v-bind:class="{'valid-error-active': Validation.email}">
        <div class="valid-message-container">
          <p class="input-valid-message">※128文字以内でご入力ください</p>
          <p v-if="Validation.email" class="valid-error">
            {{ Validation.email }}
          </p>
        </div>
      </div>
      <div class="input-container">
        <p class="input-label">パスワード</p>
        <input type="password" placeholder="パスワード" v-model="password" v-bind:class="{'valid-error-active': Validation.password}">
        <div class="valid-message-container">
          <p class="input-valid-message">※4文字以上でご入力ください</p>
          <p v-if="Validation.password" class="valid-error">
            {{ Validation.password }}
          </p>
        </div>
      </div>
      <div class="input-container">
        <p class="input-label">名前</p>
        <input type="text" placeholder="名前" v-model="name" v-bind:class="{'valid-error-active': Validation.name}">
        <div class="valid-message-container">
          <p class="input-valid-message">※ユーザー名の入力は必須です</p>
          <p class="input-valid-message">※10文字以内でご入力ください</p>
          <p v-if="Validation.name" class="valid-error">
            {{ Validation.name }}
          </p>
        </div>
      </div>
      <!-- <h3>性別</h3>
      <select v-model="genderSelected">
        <option v-for="gender in genderOptions" v-bind:value="gender.value">
          {{ gender.text }}
        </option>
      </select> -->
      <!-- <h3>自己紹介文</h3>
      <textarea placeholder="Profile" v-model="profile"></textarea> -->
      <div class="button-container">
        <p class="terms-prompt"><router-link to="/tos" class="terms-button">利用規約</router-link>に同意の上会員登録してください</p>
        <button class="signup-button" @click="validForm">規約に同意して<br><span class="signup-button-label">会員登録</span></button>
      </div>
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
      name: '',
      genderSelected: 0,
      genderOptions: [
        { text: '未設定', value: 0 },
        { text: '男', value: 1 },
        { text: '女', value: 2 },
        // eslint-disable-next-line standard/object-curly-even-spacing
        { text: 'その他', value: 4}
      ],
      profile: null,
      createdBy: 0,
      Validation: {
        email: null,
        password: null,
        name: null
      }
    }
  },
  methods: {
    validForm: function (e) {
      let validEmail = false
      let validPassword = false
      let validUserName = false

      // メールアドレスのバリデーション
      if (!this.email.trim()) {
        this.Validation.email = 'メールアドレスの入力は必須です'
      } else if (!this.email.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)) {
        this.Validation.email = '正しいメールアドレスを入力してください'
      } else if (this.email.length > 128) {
        this.Validation.email = 'メールアドレスは128文字以内でご入力ください'
      } else {
        this.Validation.email = null
        validEmail = true
      }

      // パスワードのバリデーション
      if (!this.password.trim()) {
        this.Validation.password = 'パスワードの入力は必須です'
      } else if (!this.password.match(/^[A-Za-z0-9]*$/)) {
        this.Validation.password = 'パスワードは半角英数字でご入力ください'
      } else if (this.password.length < 4) {
        this.Validation.password = 'パスワードは4文字以上でご入力ください'
      } else {
        this.Validation.password = null
        validPassword = true
      }

      // ユーザー名のバリデーション
      if (!this.name.trim()) {
        this.Validation.name = 'ユーザー名の入力は必須です'
      } else if (this.name.length > 10) {
        this.Validation.name = 'ユーザー名は10文字以内でご入力ください'
      } else {
        this.Validation.name = null
        validUserName = true
      }

      if (validEmail === true && validPassword === true && validUserName === true) {
        this.signUp()
      } else {
        scrollTo(0, 0)
      }
      e.preventDefault()
    },
    signUp: async function () {
      let redirectUrl = this.$store.getters.redirectUrl
      if (redirectUrl === null) {
        redirectUrl = '/top'
      }
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
          await this.$router.push(redirectUrl)
          this.$store.commit('setRedirectUrl', null)
        })
        .catch(err => {
          let errStatus
          for (let key of Object.keys(err)) {
            if (key === 'response') {
              errStatus = err[key].status
            }
          }
          if (typeof errStatus === 'undefined') {
            errStatus = 'なし'
          }
          alert('ステータスコード：' + errStatus + '\nシステムエラーが発生しました。')
        })
    }
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
.title {
  font-family: 'Hiragino Kaku Gothic Pro';
}
.signup {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}
.input-container{
  margin-bottom: 10px;
  text-align: left;
  width: 60%;
}
.input-label{
  margin: 0;
  padding:0;
  color: #2c3e50;
  font-size: 70%;
}
input {
  margin:0;
  width: 90%;
}
.button-container {
  width: 60%;
}
.terms-prompt{
  margin-top: 10px;
  font-size: 70%;
}
.terms-button{
  color: #2c3e50;
}
.base-box{
  background-color: #1db8a3;
}
.signup-button{
  height: 50px;
  font-size: 70%;
}

.signin-router{
  width: 60%;
  margin-top: 30px;
  font-size: 75%;
}

.signin-path-button{
  color: #2c3e50;
  cursor: pointer;
}

.logo {
  width: 50%;
}

button{
  width: 100%;
  height: 10vw;
}
.signup-button-label {
  font-size:150%;
  font-weight: bold;
}
</style>
