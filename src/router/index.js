import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Signout from '@/components/Signout'
import Top from '@/components/Top'
import UserInfo from '@/components/UserInfo'
import TravelInfo from '@/components/TravelInfo'
import TravelRegister from '@/components/TravelRegister'
import TravelEdit from '@/components/TravelEdit'
import PaymentRegister from '@/components/PaymentRegister'
import PaymentEdit from '@/components/PaymentEdit'
import firebase from 'firebase'

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
      meta: { requiresAuth: true }
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
      meta: { requiresAuth: true }
    },
    {
      path: '/payment/register/:travel_hash_id',
      name: 'PaymentRegister',
      component: PaymentRegister,
      meta: { requiresAuth: true }
    },
    {
      path: '/payment/edit/:payment_id/:travel_hash_id',
      name: 'PaymentEdit',
      component: PaymentEdit,
      meta: { requiresAuth: true }
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
    }
  ]
})

// eslint-disable-next-line no-undef
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})

export default router
