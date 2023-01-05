import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import Vuex from 'vuex'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)

const BASE_URL = 'http://81.69.175.215:8080/api'
axios.defaults.baseURL = BASE_URL

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  console.log(store.state.identity)
  axios.post('user/information', {}, {
    headers: {
      'token': localStorage.getItem('currentuser'),
      'Content-Type': 'application/json',
    }
  }).then(
      ({ data }) => {
        if (data.code === 200) {
          store.commit('setUserAvatar', data.data.user.avatar)
          store.commit('setIdentity', data.data.user.identity)
          if (!store.state.identity) {
            localStorage.removeItem('currentuser')
            window.location.assign('/login')
            ElementUI.Notification({
              title: '警告',
              message: '请先登陆河马生鲜',
              type: 'warning',
              offset:50
            });
          }
        }
      }
  )
  next()
  // if (to.path === '/login' || to.meta.token_require===false) {
  //   document.title = to.meta.title
  //   next();
  // }
  // else {
  //   // eslint-disable-next-line no-prototype-builtins
  //   if (!localStorage.hasOwnProperty('currentuser')){
  //     ElementUI.Notification({
  //       title: '警告',
  //       message: '请先登陆河马生鲜',
  //       type: 'warning',
  //       offset:50
  //     });
  //     next('/login')
  //   }
  //   else{
  //     next();
  //     // let token = localStorage.getItem('currentuser')
  //     // if (token === 'null' || token === '') {
  //     //     // alert('fuck');
  //     //     next('/login');
  //     // } else {
  //     //     next();
  //     // }
  //   }
  // }
})

new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app')
