import firebase from 'firebase'
import store from './store'
import router from './router'

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
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        alert('Create account: ', user.email)
      })
      .catch(error => {
        console.log('エラー処理')
        alert(error.message)
      })
  },
  login (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      user => {
        alert('Success!')
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
  onAuth () {
    firebase.auth().onAuthStateChanged(user => {
      user = user || {}
      store.commit('onAuthStateChanged', user)
      store.commit('onUserStatusChanged', !!user.uid)
    })
  }
}
