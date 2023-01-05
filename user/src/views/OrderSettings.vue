<template>
  <div style="margin-top: 10px">
    <div class="main_div">
      <el-card class="marginBottom">
        <div slot="header" class="clearfix">
          <span>我的住客</span>
        </div>
        <div v-if="guests.length === 0">
          暂时还没有住客，
          <el-popover
              trigger="click"
              placement="right-start"
              width="200"
              v-model="addNewPopVisible"
          >
            <el-form :model="newGuest" class="addNew">
              <el-form-item label="姓名">
                <el-input v-model="newGuest.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="newGuest.phone"></el-input>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model="newGuest.idNumber"></el-input>
              </el-form-item>
              <el-form-item style="margin-top: 10px">
                <el-button type="primary" @click="addNewGuest">立即创建</el-button>
                <el-button @click="addNewPopVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
            <el-button type="text" style="font-size: 16px" slot="reference">添加住客</el-button>
          </el-popover>
        </div>
        <div v-if="this.guests.length">
          <el-card v-for="(item, index) in guests" :key="index" class="guestCard marginBottom" shadow="never">
            <div slot="header">
              {{item.name}}
              <el-popconfirm
                  title="确认删除该住客吗？"
                  @confirm="deleteGuest(index)"
              >
                <el-button type="text" style="font-size: 16px; float: right; margin-top: -2px" slot="reference">删除该住客</el-button>
              </el-popconfirm>
            </div>
            <div>
              手机号：{{item.phone}}
            </div>
            <div>
              身份证号：{{item.idNumber}}
            </div>
          </el-card>
          <el-popover
              trigger="click"
              placement="right-start"
              width="200"
              v-model="addNewPopVisible"
          >
            <el-form :model="newGuest" class="addNew">
              <el-form-item label="姓名">
                <el-input v-model="newGuest.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="newGuest.phone"></el-input>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model="newGuest.idNumber"></el-input>
              </el-form-item>
              <el-form-item style="margin-top: 10px">
                <el-button type="primary" @click="addNewGuest">立即创建</el-button>
                <el-button @click="addNewPopVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
            <el-button style="font-size: 16px" slot="reference">添加住客</el-button>
          </el-popover>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="less">
.left_float_div {
  float: left;
  width: 25%;
  margin-right: 20px;
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

.addNew /deep/ .el-form-item {
  margin-bottom: 0;
}

.guestCard {
  /deep/ .el-card__header {
    padding: 2px 20px;
  }

  /deep/ .el-button {
    padding: 5px 20px;
  }
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      guests: [],
      addNewPopVisible: false,
      newGuest: {
        name: '',
        phone: '',
        idNumber: ''
      }
    }
  },

  methods: {
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

    addNewGuest() {
      axios.post('guest/add', this.newGuest, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            if (data.code === 200) {
              this.$notify({
                title: '成功',
                message: data.msg,
                type: 'success',
                offset: 50
              })
              this.addNewPopVisible = false
            }
            this.getGuests()
          }
      )
    },

    deleteGuest(index) {
      axios.post('guest/delete', {
        guestId: this.guests[index].id
      }, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            if (data.code === 200) {
              this.$notify({
                title: '成功',
                message: data.msg,
                type: 'success',
                offset: 50
              })
              this.getGuests()
            }
          }
      )
    }
  },

  created() {
    this.getGuests()
  }
}
</script>