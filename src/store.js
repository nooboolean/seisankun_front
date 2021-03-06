import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userByFirebase: {},
    userBySeisankun: {},
    status: false,
    redirectUrl: null,
    isSignout: false
  },
  plugins: [
    createPersistedState()
  ],
  mutations: {
    onFirebaseAuthStateChanged (state, user) {
      state.userByFirebase = user // firebaseが返した会員情報
    },
    onSeisankunAuthStateChanged (state, user) {
      state.userBySeisankun = user // seisankun_apiが返した会員情報
    },
    onUserStatusChanged (state, status) {
      state.status = status // ログインしてるかどうか true or false
    },
    setRedirectUrl (state, redirectUrl) {
      state.redirectUrl = redirectUrl
    },
    setSignoutState (state, signoutState) {
      state.isSignout = signoutState
    }
  },
  getters: {
    userByFirebase (state) {
      return state.userByFirebase
    },
    userBySeisankun (state) {
      return state.userBySeisankun
    },
    isSignedIn (state) {
      return state.status
    },
    redirectUrl (state) {
      return state.redirectUrl
    },
    isSignout (state) {
      return state.isSignout
    }
  }
})
