<template>
  <!-- <div class="dashboard-container">
    <el-menu :default-active="this.$route.path" mode="horizontal" router class="centerSubmenu">
      <el-menu-item class="centerSubmenuItem" index="/mydashboard">我的个人中心</el-menu-item>
      <el-menu-item class="centerSubmenuItem" index="/mycomments">评语</el-menu-item>
      <el-menu-item class="centerSubmenuItem" index="/accountmodify">账户修改</el-menu-item>
      <el-menu-item class="centerSubmenuItem" index="/passwordmodify">密码修改</el-menu-item>
      <el-menu-item class="centerSubmenuItem" index="/ordersettings">订单设置</el-menu-item>
      <el-menu-item class="centerSubmenuItem" index="myhippo">我的河马</el-menu-item>
    </el-menu>
    <router-view/>
  </div> -->
  <div class="主页">
    <div class="导航栏">
      <el-menu
          :default-active="this.$route.path"
          router>
        <el-submenu index="1" >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>个人信息</span>
          </template>
          <el-menu-item index="/mydashboard">我的个人中心</el-menu-item>
          <!-- <el-menu-item index="/mymodifyinformation">信息修改</el-menu-item> -->
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>账户设置</span>
          </template>
          <el-menu-item index="/accountmodify">账户修改</el-menu-item>
          <el-menu-item index="/passwordmodify">密码修改</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>订单设置</span>
          </template>
          <el-menu-item index="/ordersettings">我的住客</el-menu-item>
          <el-menu-item index="/myordercenter">我的订单</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="/myhippo">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>我的河马</span>
          </template>
        </el-menu-item> -->
      </el-menu>
    </div>
    <router-view class='menu-right'  />
  </div>
</template>

<style scoped lang="less">
.主页{
  width: 95%;
  margin: auto;
}
.导航栏{
  width: 20%;
  float:left;
  display:inline;
}
.menu-right{
  margin-left:300px;
}
.左侧菜单{
  /* float:left; */
  width: 15%;
  display:inline;
}

</style>

<script>
export default {
  data() {
    return {}
  },

  methods: {

  }
}
</script>