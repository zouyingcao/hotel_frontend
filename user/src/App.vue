<template>
  <div id="app">
    <Header v-bind:isLogin="this.$store.state.isLogin" v-bind:userAvatar="this.userAvatar"></Header>
    <router-view :key="this.$route.path"/>
    <!-- <nav style="text-align:center">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/AAtest">test</router-link>
    </nav> -->
  </div>
</template>


<script>
import Header from './views/Header.vue'
import axios from "axios";
export default {
  data() {
    return {
      userAvatar: null,
    }
  },

  methods: {
    getUserAvatar() {
      let token = localStorage.getItem('currentuser')
      axios.post('user/avatar/get', {}, {
        headers: {
          'token': token ? token : null,
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            if (data.code === 200) {
              this.userAvatar = data.data.avatar
              localStorage.setItem('userAvatar', data.data.avatar)
            }
            else {
              this.userAvatar = null
            }
          }
      ).catch(
          // eslint-disable-next-line
          reason => {
            this.userAvatar = null
          }
      )
    }
  },

  components:{
      Header
  },

  updated() {
    this.getUserAvatar()
    this.$store.commit('setLoginState', localStorage.getItem('currentuser') === null ? false : true)
    this.$store.commit('setUserAvatar', localStorage.getItem('userAvatar'))
    axios.post('/user/information', {}, {
      headers: {
        'token': localStorage.getItem('currentuser'),
        'Content-Type': 'application/json',
      }
    }).then(res=>{
      this.userInfo=res.data.data.user
    })
  },

  created() {
    this.getUserAvatar()
    this.$store.commit('setLoginState', localStorage.getItem('currentuser') === null ? false : true)
    this.$store.commit('setUserAvatar', localStorage.getItem('userAvatar'))
    axios.post('/user/information', {}, {
      headers: {
        'token': localStorage.getItem('currentuser'),
        'Content-Type': 'application/json',
      }
    }).then(res=>{
      this.$store.commit('setIdentity', res.data.data.user.identity)
    })
  }
}
</script>

<style>
  body{
    margin: 0;
  }
</style>
