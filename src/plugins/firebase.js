import firebase from 'firebase'
import store from '../store'
import router from '../router'
import axios from 'axios'

const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: process.env.FIRE_BASE_AUTH_DOMAIN,
  databaseURL: process.env.FIRE_BASE_DATABASE_URL,
  projectId: process.env.FIRE_BASE_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.FIRE_BASE_MESSAGEING_SENDERID,
  appId: process.env.FIRE_BASE_APP_ID
}

export default {
  init () {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  },
  signupByEmailAndPassword (email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        return firebase.auth().currentUser
      })
      .catch(error => {
        console.log('エラー処理')
        alert(error.message)
      })
  },
  login (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      user => {
        alert('ログイン！\n 引き続きサービスをご利用ください')
        router.push('/shumpay')
      },
      err => {
        console.log('エラー処理')
        alert(err.message)
      }
    )
  },
  logout () {
    firebase.auth().signOut()
  },
  getCurrentUser () {
    firebase.auth().currentUser()
  },
  onAuth () {
    // eslint-disable-next-line no-undef
    firebase.auth().onAuthStateChanged(async user => {
      let userByFirebase = {}
      // eslint-disable-next-line no-redeclare
      let userBySeisankun = {}
      // eslint-disable-next-line no-undef
      if (user) {
        // eslint-disable-next-line no-undef
        userByFirebase = user
        // eslint-disable-next-line no-self-assign
        // eslint-disable-next-line no-undef
        await axios
          .get('' + process.env.SEISANKUN_API_BASE_URL + '/v1/user/info/' + user.uid + '')
          .then(response => (userBySeisankun = response.data))
          .catch(err => {
            for (let key of Object.keys(err)) {
              console.log(key)
              console.log(err[key])
            }
          })
      }
      store.commit('onFirebaseAuthStateChanged', userByFirebase)
      await store.commit('onSeisankunAuthStateChanged', userBySeisankun)
      store.commit('onUserStatusChanged', !!userByFirebase.uid)
    })
  }
}
