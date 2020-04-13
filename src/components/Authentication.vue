<template>
  <div id="nav-right">
    <div v-if="userStatus" key="login" class="nav-user-name">
      <router-link to="/user_info">{{ userBySeisankun.name }}</router-link>
    </div>
    <div class="nav-auth">
      <!-- ログイン時にはフォームとログアウトボタンを表示 -->
      <div v-if="userStatus" key="login" class="navbar-item">
        <button class="nav-auth-button" @click="signOut">ログアウト</button>
      </div>
      <!-- 未ログイン時にはログインボタンを表示 -->
      <div v-else key="logout">
        <button @click="signIn">ログイン</button>
        <button @click="signUp">会員登録</button>
      </div>
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
    },
    userBySeisankun () {
      return this.$store.getters.userBySeisankun
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
  padding: 0;
  background-color: #1db8a3;
  color: #fff;
}
.nav-auth-button:hover{
  background-color: #fff;
  color: #1db8a3;
}
.nav-user-name {
  font-size: 70%;
  align-self: baseline;
  margin-right: 1vw;
}

.nav-auth {
  align-self: baseline;
}

#nav-right {
  padding: 10px 0;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}
</style>
