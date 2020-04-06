// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import seisankunApi from './plugins/seisankunApi'

import Firebase from './plugins/firebase'

Vue.use(seisankunApi)
Firebase.init()

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  seisankunApi,
  components: { App },
  template: '<App/>'
})
