<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <DynamicMenu v-bind:myMenu="this.myMenu"></DynamicMenu>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderBar></HeaderBar>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import DynamicMenu from "../components/DynamicMenu";
import HeaderBar from "../components/HeaderBar";
export default {
  components: {
    DynamicMenu,
    HeaderBar
  },
  data() {
    return {
      myMenu: [
        {
          index: "dashboard",
          title: "大数据展示"
        },
        {
          index: "ordersview",
          title: "酒店订单查看"
        },
        {
          index: "warehouse",
          title: "仓库用品管理"
        },
        {
          index: 'hotelmanagement',
          title: '增加酒店'
        },
        {
          index: "1",
          title: "住客管理",
          children: [
            {
              index: "booking",
              title: "查看基本情况"
            },
            {
              index: "2-1",
              title: "导航二"
            },
          ]
        },
      ]
    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  text-align: center;
  height: 100vh;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-header {
  padding: 0;
}
</style>
