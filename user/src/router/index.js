import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "../views/LoginView";
import GoodsList from "../views/GoodsList.vue"
import FinalHome from '../views/FinalHome.vue'
import MyDashBoard from '../views/MyDashBoard.vue'
import RegisterView from "../views/RegisterView";
import MyComments from "../views/MyComments";
import PersonalCenterMain from "../views/PersonalCenterMain";
import AccountModify from "../views/AccountModify";
import PasswordModify from "../views/PasswordModify";
import OrderSettings from "../views/OrderSettings";
import HotelDetail from "../views/HotelDetail";
import AAtest from "../views/AAtest"
import OrderCheck from "../views/OrderCheck";
import MyOrderCenter from "../views/MyOrderCenter";

import HippoForum from '../views/HippoForum.vue'
import ForumHome from '../views/ForumHome.vue'
import PostForum from '../views/PostForum.vue'
import ForumContent from '../views/ForumContent.vue'

Vue.use(VueRouter)

const routes = [
    {
      path:'/hippoforum',
      name:'HippoForum',
      component :HippoForum,
      meta:{
          title: '河马广场',
          token_require: true
      },
      children:[
          {
              path:'/forumcontent',
              name:'ForumContent',
              component :ForumContent,
              meta:{
                  title: '帖子内容',
                  token_require:false
              }
          },
          {
              path:'/forumhome',
              name:'ForumHome',
              component :ForumHome,
              meta:{
                  title: '论坛首页',
                  token_require:false
              }
          },
          {
              path:'/recommendforum',
              name:'RecommendForum',
              component :ForumHome,
              meta:{
                  title: '每日好贴推荐',
                  token_require:false
              }
          },
          {
              path:'/goodsforum',
              name:'GoodsForum',
              component :ForumHome,
              meta:{
                  title: '每日好物推荐',
                  token_require:false
              }
          },
          {
              path:'/postforum',
              name:'PostForum',
              component : PostForum,
              meta:{
                  title: '晒出我的河马生活～',
                  token_require:true
              }
          },
      ]
  },
  {
    path: "/aatest",
    name : 'AAtest',
    component: AAtest,
    meta:{
        title: 'Test',
        token_require:false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: FinalHome,
    meta:{
        title: '商场首页',
        token_require:false
    }
  },//默认跳转主页
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: '登录',
      token_require: false
    }
  },
  {
    path: "/finalhome",
    name : 'FinalHome',
    component: FinalHome,
    meta:{
        title: '首页',
        token_require:false
    }
  },
  {
    path: "/goodslist",
    name : 'GoodsList',
    component: GoodsList,
    meta:{
        title: '商品搜索结果',
        token_require:false
    }
  },
  {
    path: "/personalcenter",
    name : 'personalcenter',
    component: MyDashBoard,
    meta: {
      title: '个人中心',
      token_require: true
    },
    children: [
      {
        path: "/mycomments",
        name: "MyComments",
        component: MyComments,
        meta: {
          title: '我的评语',
          token_require: true
        }
      },
      {
        path: "/accountmodify",
        name: "AccountModify",
        component: AccountModify,
        meta: {
          title: '账户信息修改',
          token_require: true
        },
      },
      {
        path: "/mydashboard",
        name: "MyDashBoard",
        component: PersonalCenterMain,
        meta: {
          title: '我的主页',
          token_require: true
        }
      },
      {
        path: "/passwordmodify",
        name: "PasswordModify",
        component: PasswordModify,
        meta: {
          title: '修改密码',
          token_require: true
        }
      },
      {
        path: "/ordersettings",
        name: "OrderSettings",
        component: OrderSettings,
        meta: {
          title: '订单设置',
          token_require: true
        }
      },
      {
        path: "/myordercenter",
        name: "MyOrderCenter",
        component: MyOrderCenter,
        meta: {
          title: '我的订单中心',
          token_require: true
        }
      },
    ]
  },
  {
    path: "/register",
    name : 'Register',
    component: RegisterView,
    meta: {
      title: '注册',
      token_require: false
    }
  },
  {
    path: "/hoteldetail",
    name : 'HotelDetail',
    component: HotelDetail,
    meta: {
      title: '酒店信息',
      token_require: true
    }
  },
  {
    path: "/ordercheck",
    name: "OrderCheck",
    component: OrderCheck,
    meta: {
      title: '订单结算',
      token_require: true
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
