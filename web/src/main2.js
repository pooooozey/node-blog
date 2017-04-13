// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import App from './components/App'
import Hello from './components/Hello'
import Hello2 from './components/Hello2'

/* eslint-disable no-new */

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    testnum : "1"
  },
  mutations: {
    changeColumn (state,testnum) {
      state.testnum = testnum;
    }
  }
})

const router = new VueRouter({
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Hello
    },
    { 
      path: '/Hello2',
      component: Hello2
    }
  ]
})

const app = new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
