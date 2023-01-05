<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async created() {
    await axios.post('user/information', {}, {
      headers: {
        'token': localStorage.getItem('currentuser'),
        'Content-Type': 'application/json',
      }
    }).then(
        ({data}) => {
          if (data.code === 200) {
            this.$store.commit('setUserAvatar', data.data.user.avatar)
            this.$store.commit('setIdentity', data.data.user.identity)
            this.$store.commit('setLoginState', true)
          }
        }
    )
  }
}
</script>
