import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from "../views/MainView";
import AboutView from "../views/AboutView";
import DashBoard from "../views/DashBoard";
import OrdersView from "../views/OrdersView";
import HotelManagement from '../views/HotelManagement'
import WareHouse from '../views/WareHouse'
import BookingView from "../views/BookingView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView,
    children: [
      {
        path: '/about',
        name: 'about',
        component: AboutView,
        meta: {
          title: '关于'
        }
      },
      {
        path: 'dashboard',
        name: 'DashBoard',
        component: DashBoard,
        meta: {
          title: '大数据展示中心'
        }
      },
      {
        path: 'ordersview',
        name: 'OrdersView',
        component: OrdersView,
        meta: {
          title: '订单展示'
        }
      },
      {
        path: 'hotelmanagement',
        name: 'HotelManagement',
        component: HotelManagement,
        meta: {
          title: '增加酒店'
        }
      },
      {
        path: 'warehouse',
        name: 'WareHouse',
        component: WareHouse,
        meta: {
          title: '仓库管理'
        }
      },
      {
        path: 'booking',
        name: 'Booking',
        component: BookingView,
        meta: {
          title: '入住管理'
        }
      }
    ],
    meta: {
      title: '管理员首页'
    }
  },
  {
    path: '/login',
    name: 'LoginView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
