<template>
    <div>
        <div class="空菜单栏"></div>
        <div class="顶部菜单栏">
            <el-menu mode="horizontal" background-color="#e5e5e5" router
            :default-active="this.$route.path">
                <el-menu-item index="/finalhome">酒店首页</el-menu-item>
                <!-- <el-menu-item index="/goodslist">商品列表页</el-menu-item> -->
                <!-- <el-menu-item index="/myordercenter">订单中心</el-menu-item> -->
                <el-menu-item index="/mydashboard">个人中心</el-menu-item>
                <!-- <el-menu-item index="/accountmodify">账户设置</el-menu-item> -->
                <el-menu-item index="/forumhome">Hippo论坛</el-menu-item>
                <el-menu-item v-show="this.$store.state.identity">
                  <a href="/admin/">管理员页面</a>
                </el-menu-item>
              <el-submenu index="4" class="用户头像">
                    <template #title>
                        <el-avatar v-if="userAvatar === null" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="medium"></el-avatar>
                        <el-avatar v-else v-bind:src="userAvatar" size="medium"></el-avatar>
                    </template>
                    <el-menu-item index="/login" class="展开菜单 头像展开菜单" v-show="!this.$store.state.isLogin">登录</el-menu-item>
                    <el-menu-item index="/mydashboard" class="展开菜单 头像展开菜单" v-show="this.$store.state.isLogin">个人信息管理</el-menu-item>
                    <el-menu-item index="/login" class="展开菜单 头像展开菜单" @click.native="logout" v-show="this.$store.state.isLogin">退出登陆</el-menu-item>
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
        }
    },

    props: {
      isLogin: {
        type: Boolean,
        required: true,
      },

      userAvatar: {
        type: String | null,
        required: true
      }
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
        z-index: 50000;
    }
    .顶部菜单栏 {
        width: 100%;
        /* margin-left: -5px; */
        z-index: 50000;
        position: fixed;
        height: 80px;
        top: 0;
    }
    .空菜单栏 {
        height: 65px;
        top: 0;
    }
</style>
