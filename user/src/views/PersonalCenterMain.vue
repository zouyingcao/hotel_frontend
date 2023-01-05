<template>
  <div style="padding-top: 20px">
    <div class="left_float_div">
      <el-card style="vertical-align: center" class="marginBottom">
        <div style="float: left">
          <el-avatar :src="userInfo.avatar" v-if="userInfo.avatar"></el-avatar>
          <el-avatar icon="el-icon-user-solid" v-else></el-avatar>
        </div>
        <div style="text-align: center; margin-top: 10px;">
          {{userInfo.username}}
        </div>
        <div class="clearfix"></div>
        <!-- <div>今天是我加入河马酒店的第天</div> -->
      </el-card>
      <el-card style="background: #febb02">
        <div slot="header">
          <span>搜索酒店</span>
        </div>
        <el-form label-position="top" size="mini">
          <el-form-item label="目的地">
            <el-input
                v-model="destination"
                style="width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item label="入住日期">
            <el-date-picker
                v-model="inDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="退房日期">
            <el-date-picker
                v-model="outDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button type="primary" @click="doSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="main_div">
      <div style="font-weight: bolder">欢迎来到河马酒店！</div>
      <el-card class="marginBottom">
        <div slot="header">
          <span>个人信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="editPersonalInfo">编辑个人信息</el-button>
        </div>
        <el-descriptions>
          <el-descriptions-item label="用户名">{{userInfo.username}}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{userInfo.phone}}</el-descriptions-item>
          <el-descriptions-item label="电子邮箱">{{userInfo.email}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
          <el-descriptions-item label="性别">{{userInfo.gender === null ? '未知' : userInfo.gender === 1 ? '男' : '女'}}</el-descriptions-item>
          <el-descriptions-item label="出生年月">{{userInfo.birthDate === null ? '未知' : userInfo.birthDate}}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="marginBottom orderCard">
        <div slot="header">
          <span>我的订单</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push('myordercenter')">查看更多</el-button>
        </div>
        <div class="orderCenterContainer">
          <el-empty description="这里还没有订单" v-if="myOrder.length === 0"></el-empty>
          <div v-else class="infoContainer">
            <div v-for="(item, index) in this.myOrder" v-bind:key="index">
              <el-card
                  class="marginBottom infoCard"
                  style="margin-left: 5px; margin-right: 5px"
                  shadow="never"
              >
                <div slot="header" style="height: auto; display: flex; justify-content: space-between">
                  <div style="display: inline-block">
                    {{item.hotelName}}
                  </div>
                  <div style="display: inline-block">
                    {{item.createTime}}
                  </div>
                </div>
                <div class="mainContent">
                  <div style="max-width: 60%; padding-left: 10px; display: inline-block;">
                    <div v-for="name in item.roomNames" v-bind:key="name">
                      预定房间名称：{{name}}
                    </div>
                    <div>
                      开始时间：{{item.startTime}}
                    </div>
                    <div>
                      结束时间：{{item.endTime}}
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="marginBottom">
        <div slot="header">
          <span>我的评语</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push('mycomments')">查看更多</el-button>
        </div>
        <div v-for="(item, index) in userComments" :key="index">
          <el-card class="marginBottom commentCard" shadow="never">
            <div slot="header">
              <div style="float: left;">
                <el-avatar v-bind:src=item.avatar></el-avatar>
              </div>
              <div style="min-height: 35px; margin-top: 10px;">
                  <span style="margin-left: 10px;">
                    {{item.username}}
                  </span>
              </div>
              <div>
                <el-rate
                    v-model="item.star"
                    disabled
                    show-score
                    style="padding-left: 48px; margin-top: -10px"
                >

                </el-rate>
              </div>
            </div>
            <div style="font-size: 10pt">
              发布于{{item.createTime.split('T')[0]}}
            </div>
            <h3>
              {{item.hotelName}}
            </h3>
            <div>
              {{item.comment}}
            </div>
          </el-card>
        </div>
      </el-card>
      <el-card class="marginBottom">
        <div slot="header">
          <span>我的住客信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push('ordersettings')">查看更多</el-button>
        </div>
        <el-card v-for="(item, index) in guests" :key="index" class="guestCard marginBottom" shadow="never">
          <div>
            姓名：{{item.name}}
          </div>
          <div>
            手机号：{{item.phone}}
          </div>
          <div>
            身份证号：{{item.idNumber}}
          </div>
        </el-card>
      </el-card>
    </div>
    <el-dialog title="编辑个人信息" :visible.sync="editDialogVisible" width="40%" class="修改个人信息对话框"
    >
      <div class="主体">
        <!-- <el-form label-position="right">
          <info-edit old-data="123456" label="用户名" ref="nameEdit"></info-edit>
          <info-edit label="电子邮箱" old-data="123456789@qq.com" ref="emailEdit"></info-edit>
          <info-edit label="手机号" old-data="123456789" ref="phoneEdit"></info-edit>
          <info-edit label="密码" old-data="123456789" v-bind:show-password=true ref="passwordEdit"></info-edit>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitInfo">确 定</el-button>
        </span> -->

        <img src="src/img/user_icon.png" width="15%" style="margin:30px">
        <div class="表单">
          <div class="sb">
            <div class="内容标题">用户名称：</div>
            <div class="标题对应内容 用户名称">{{userInfo.username}}</div>
          </div>
          <div class="sb">
            <span class="内容标题">手机号码：</span>
            <div class="输入框">
              <el-input v-model="userInfo.phone" placeholder="请输入您的手机号码"></el-input>
            </div>
          </div>
          <div class="sb">
            <span class="内容标题">电子邮箱：</span>
            <div class="输入框">
              <el-input v-model="userInfo.email" placeholder="请输入电子邮箱"></el-input>
            </div>
          </div>
          <el-button class="按钮" type="success" @click="submitInfo">提交修改</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.left_float_div {
  float: left;
  width: 25%;
  margin-right: 20px;
}

.main_div {
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.marginBottom {
  margin-bottom: 10px;
}

.main_div {
  overflow: hidden;
}

.mainContent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.infoCard {
  /deep/ .el-card {
  }
}

.orderCard {
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      activeName: '1',
      inDate: '',
      outDate: '',
      tabPosition: 'left',
      destination: '',
      editDialogVisible: false,
      userInfo: {
        avatar: null,
        birthDate: null,
        email: null,
        gender: null,
        hotelId: null,
        phone: null,
        username: null
      },
      userComments: [],
      myOrder: [],
      guests: []
    }
  },

  methods: {
    editPersonalInfo() {
      this.$router.push('accountmodify')
    },

    doSearch() {
      console.log(this.destination)
      console.log(this.inDate)
      console.log(this.outDate)
    },

    submitInfo() {
      console.log(this.$refs.nameEdit.data)
      console.log(this.$refs.emailEdit.data)
      console.log(this.$refs.phoneEdit.data)
      console.log(this.$refs.passwordEdit.data)
      this.editDialogVisible = false
    },

    getGuests() {
      axios.post('guest/get', {}, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            if (data.code === 200) {
              this.guests = data.data.guests
            }
          })
    },

    getOrders() {
      axios.post('order/information/all', {}, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            if (data.code === 200) {
              this.myOrder = data.data
              console.log(this.myOrder)
              this.myOrder = this.myOrder.slice(0, Math.min(this.myOrder.length, 3))
              console.log(this.myOrder)
            }
          }
      )
    }
  },

  created() {
    axios.post('/user/information', {}, {
      headers: {
        'token': localStorage.getItem('currentuser'),
        'Content-Type': 'application/json',
      }
    }).then(res=>{
      this.userInfo=res.data.data.user
    })

    this.getGuests()
    this.getOrders()
    axios.post('user/comment', {
          pageIndex: 0,
          commentNum: 3,
        },
        {
          headers: {
            'token': localStorage.getItem('currentuser'),
            'Content-Type': 'application/json',
          }
        }
    ).then(
        ({ data }) => {
          if (data.code === 200) {
            this.userComments = data.data
          }
          else {
            this.$notify({
            })
          }
        }
    )
  }
}
</script>
