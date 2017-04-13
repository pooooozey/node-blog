import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from "vue-router";
import App from './components/App'
import MainBox from './components/MainBox.vue'
import Detail from './components/Detail.vue'
import List from './components/List.vue'

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
      component: MainBox
    },
    { 
      path: '/list',
      component: List
    },
    { 
      path: '/detail',
      component: Detail
    }
  ]
})

const app = new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
