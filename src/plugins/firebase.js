import firebase from 'firebase'
import store from '../store'
import router from '../router'
import axios from 'axios'
import firebaseError from './firebaseError'

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
        alert(firebaseError(error, 'signup'))
      })
  },
  login (email, password, redirectUrl) {
    if (redirectUrl === null) {
      redirectUrl = '/top'
    }
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      async user => {
        await this.onAuth()
        await alert('ログイン！\n 引き続きサービスをご利用ください')
        await store.commit('setRedirectUrl', null)
        await router.push(redirectUrl)
      },
      error => {
        alert(firebaseError(error, 'signup'))
      }
    )
  },
  logout () {
    firebase.auth().signOut()
      .then(async _ => {
        await store.commit('setRedirectUrl', null)
        await store.commit('setSignoutState', true)
        await router.push('/signin')
      })
  },
  getCurrentUser () {
    firebase.auth().currentUser()
  },
  async onAuth () {
    // eslint-disable-next-line no-undef
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await axios
          .get('' + process.env.SEISANKUN_API_BASE_URL + '/v1/user/info/' + user.uid + '', {
            auth: {
              username: process.env.BASIC_AUTH_API_USER_NAME,
              password: process.env.BASIC_AUTH_API_PASSWORD
            }
          })
          .then(response => (
            // eslint-disable-next-line no-sequences
            store.commit('onFirebaseAuthStateChanged', user),
            store.commit('onSeisankunAuthStateChanged', response.data),
            store.commit('onUserStatusChanged', user.uid)))
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
      } else {
        // eslint-disable-next-line no-unused-expressions
        store.commit('onFirebaseAuthStateChanged', {}),
        store.commit('onSeisankunAuthStateChanged', {}),
        store.commit('onUserStatusChanged', false)
      }
    })
  }
}
