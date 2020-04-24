import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Signout from '@/components/Signout'
import Tos from '@/components/Tos'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import Top from '@/components/Top'
import UserInfo from '@/components/UserInfo'
import TravelInfo from '@/components/TravelInfo'
import TravelRegister from '@/components/TravelRegister'
import TravelEdit from '@/components/TravelEdit'
import PaymentRegister from '@/components/PaymentRegister'
import PaymentEdit from '@/components/PaymentEdit'
import ShowBorrowHistory from '@/components/ShowBorrowHistory'
import firebase from 'firebase'
import axios from 'axios'
import store from '../store'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },
    {
      path: '/top',
      name: 'Top',
      component: Top,
      meta: { requiresAuth: true }
    },
    {
      path: '/user_info',
      name: 'UserInfo',
      component: UserInfo,
      meta: { requiresAuth: true }
    },
    {
      path: '/travel/info/:travel_hash_id',
      name: 'TravelInfo',
      component: TravelInfo,
      meta: {
        requiresAuth: true,
        requireJoinTravel: true
      }
    },
    {
      path: '/travel/register',
      name: 'TravelRegister',
      component: TravelRegister,
      meta: { requiresAuth: true }
    },
    {
      path: '/travel/edit/:travel_hash_id',
      name: 'TravelEdit',
      component: TravelEdit,
      meta: {
        requiresAuth: true,
        requireJoinTravel: true
      }
    },
    {
      path: '/payment/register/:travel_hash_id',
      name: 'PaymentRegister',
      component: PaymentRegister,
      meta: {
        requiresAuth: true,
        requireJoinTravel: true
      }
    },
    {
      path: '/payment/edit/:payment_id/:travel_hash_id',
      name: 'PaymentEdit',
      component: PaymentEdit,
      meta: {
        requiresAuth: true,
        requireJoinTravel: true
      }
    },
    {
      path: '/borrowHistory/show/:borrower_id/:travel_hash_id',
      name: 'ShowBorrowHistory',
      component: ShowBorrowHistory,
      meta: {
        requiresAuth: true,
        requireJoinTravel: true
      }
    },
    {
      path: '/signout',
      name: 'Signout',
      component: Signout
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/tos',
      name: 'Tos',
      component: Tos
    },
    {
      path: '/privacy_policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    }
  ]
})

// eslint-disable-next-line no-undef
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requireJoinTravel = to.matched.some(record => record.meta.requireJoinTravel)
  if (requiresAuth) {
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        store.commit('onFirebaseAuthStateChanged', user)
      } else {
        next({
          path: '/signin',
          query: { redirectUrl: to.fullPath }
        })
      }
    })

    if (requireJoinTravel) {
      let firebaseUser = await store.getters.userByFirebase
      let userTravel = await existTravel(firebaseUser.uid, to.params.travel_hash_id)
      if (userTravel === '') {
        joinTravel(firebaseUser.uid, to.params.travel_hash_id)
      }
      next()
    } else {
      next()
    }

  } else {
    next()
  }
})

function existTravel (userId, travelHashId) {
  return axios
    .get('' + process.env.SEISANKUN_API_BASE_URL + '/v1/travel/' + travelHashId + '/exist/member/' + userId + '')
    .then(response => {
      return response.data
    })
    .catch(err => {
      let errStatus
      for (let key of Object.keys(err)) {
        if (key === 'response') {
          errStatus = err[key].status
        }
      }
      alert('ステータスコード：' + errStatus + '\nシステムエラーが発生しました。')
      return null
    })
}

function joinTravel (userId, travelHashId) {
  return axios
    .post('' + process.env.SEISANKUN_API_BASE_URL + '/v1/travel/join/hashId', {
      travelHashId: travelHashId,
      userUid: userId
    })
    .then(response => {
      return true
    })
    .catch(err => {
      let errStatus
      for (let key of Object.keys(err)) {
        if (key === 'response') {
          errStatus = err[key].status
        }
      }
      alert('ステータスコード：' + errStatus + '\nシステムエラーが発生しました。')
      return false
    })
}

export default router
