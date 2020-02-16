import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Signout from '@/components/Signout'
import TestRouter from '@/components/TestRouter'
import UserInfo from '@/components/UserInfo'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },
    {
      path: '/shumpay',
      name: 'TestRouter',
      // eslint-disable-next-line no-undef
      component: TestRouter,
      meta: { requiresAuth: true }
    },
    {
      path: '/user_info',
      name: 'UserInfo',
      component: UserInfo,
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
