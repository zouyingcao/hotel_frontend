<template>
  <div>
    <div class="顶部菜单栏">
      <el-menu mode="horizontal" background-color="#e5e5e5">
        <el-menu-item>
          <a href="/#/mydashboard" style="text-decoration:none">个人中心</a>
        </el-menu-item>
        <el-menu-item>Hippo论坛</el-menu-item>
        <el-submenu index="4" class="用户头像">
          <template #title>
            <el-avatar v-if="userAvatar === null" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="medium"></el-avatar>
            <el-avatar v-else v-bind:src="userAvatar" size="medium"></el-avatar>
          </template>
          <el-menu-item class="展开菜单 头像展开菜单" v-show="!this.$store.state.isLogin">
            <a href="/#/login" style="text-decoration:none">登录</a>
          </el-menu-item>
          <el-menu-item class="展开菜单 头像展开菜单" v-show="this.$store.state.isLogin">
            <a href="/#/mydashboard" style="text-decoration: none">
              个人信息管理
            </a>
          </el-menu-item>
          <el-menu-item class="展开菜单 头像展开菜单" @click.native="logout" v-show="this.$store.state.isLogin">退出登陆</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      localStorage.removeItem('currentuser');
      this.$notify.success({
        title: '退出登陆成功',
        message: "请重新登陆",
        offset:50
      })
      this.$store.commit('setLoginState', false)
      window.location.assign('/#/login/')
    }
  },

  data() {
    return {
      userAvatar: '',
    }
  },

  created() {
    this.userAvatar = this.$store.state.userAvatar
  },

  updated() {
    this.userAvatar = this.$store.state.userAvatar
  }
}
</script>

<style scoped>
.展开菜单{
  text-align: center;
  z-index: 50000;
}
.用户头像{
  position:absolute;
  right: 10px;
}
.顶部菜单栏 {
  width: 100%;
  /* margin-left: -5px; */
  z-index: 50000;
  height: 80px;
  top: 0;
}
</style>
