import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './theme/index.css'
import InfoEdit from "./components/InfoEdit";
import axios from "axios";
import PersonalCenterMain from "./views/PersonalCenterMain";
import MyComments from "./views/MyComments";
import store from "./store/index";
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.component('InfoEdit', InfoEdit)
Vue.component('PersonalCenterMain', PersonalCenterMain)
Vue.component('MyComments', MyComments)

const BASE_URL = 'http://81.69.175.215:8080/api'
axios.defaults.baseURL = BASE_URL

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.path === '/login' || to.meta.token_require===false) {
    document.title = to.meta.title
    next();
  }
  else {
      // eslint-disable-next-line no-prototype-builtins
    if (!localStorage.hasOwnProperty('currentuser')){
        ElementUI.Notification({
            title: '警告',
            message: '请先登陆河马生鲜',
            type: 'warning',
            offset:50
        });
        next('/login')
    }
    else{
        next();
        // let token = localStorage.getItem('currentuser')
        // if (token === 'null' || token === '') {
        //     // alert('fuck');
        //     next('/login');
        // } else {
        //     next();
        // }
    }
  }
})

// router拦截器，当token过期时移除token并转到login
axios.interceptors.response.use(
    response => {
        if (response.data.code === 408) {
            localStorage.removeItem('currentuser')
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

new Vue({
    router,
    render: h => h(App),
    store: store
}).$mount('#app')
