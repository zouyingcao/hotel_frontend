<template>
  <div class="accountModify">
    <div class="userCover"></div>
    <div
        @mouseover="hoverAvatar=true"
        @mouseleave="hoverAvatar=false"
    >
      <div class="userAvatar">
        <div v-if="this.userInfo.avatar === null" style="text-align: center; opacity: unset">
          用户还没有头像<br>
          <el-upload
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="uploadImage"
              style="opacity: 100%"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <div v-else class="avatarContainer"
        >
          <el-image :size="100" :src="userInfo.avatar" @error="true" v-show="!hoverAvatar">
          </el-image>
          <el-upload
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="uploadImage"
              v-show="hoverAvatar"
          >
            <el-button size="small" type="primary">点击上传新头像</el-button>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="accountEdit">
      <!--编辑用户名-->
      <div
          class="field"
          @mouseover="hoverUserName = true"
          @mouseleave="hoverUserName = false"
      >
        <div class="fieldLabel">
          用户名
        </div>
        <div class="fieldContent">
          <div v-show="!editUserName">
            <div class="fieldText" style="display:inline-block; width: 100px;">{{updatedInfo.username}}</div>
            <div v-show="hoverUserName" style="display:inline-block; width: 100px; margin-top: -10px;">
              <button type="button" class="fieldModify editButton" @click="editUserName = true"
              >
                <i class="el-icon-edit"></i>
                修改
              </button>
            </div>
          </div>
          <div v-show="editUserName">
            <el-input
                placeholder="请输入新用户名"
                v-model="updatedInfo.username"
                style="max-width: 200px; padding-right: 10px"
            ></el-input>
            <el-button type="primary" @click="submitChange('editUserName')">确定</el-button>
            <el-button @click="editUserName = false">取消</el-button>
          </div>
        </div>
      </div>
      <!--编辑性别-->
      <div
          class="field"
          @mouseover="hoverGender = true"
          @mouseleave="hoverGender = false"
      >
        <div class="fieldLabel">
          性别
        </div>
        <div class="fieldContent">
          <div v-show="!editGender">
            <div class="fieldText" style="display:inline-block">{{updatedInfo.gender === 1 ? '男' : updatedInfo.gender === 0 ? '女' : '未知'}}</div>
            <div style="display:inline-block;margin-top: -10px;" v-show="hoverGender">
              <button
                  type="button"
                  class="fieldModify editButton"
                  @click="editGender = true"
              >
                <i class="el-icon-edit"></i>
                修改
              </button>
            </div>
          </div>
          <div v-show="editGender">
              <el-radio v-model="updatedInfo.gender" label="1">男</el-radio>
              <el-radio v-model="updatedInfo.gender" label="0">女</el-radio>
              <el-button type="primary" @click="submitChange('editGender')">确定</el-button>
              <el-button @click="editGender = false">取消</el-button>
          </div>
        </div>
      </div>
      <!--编辑生日-->
      <div
          class="field"
          @mouseover="hoverBirth = true"
          @mouseleave="hoverBirth = false"
      >
        <div class="fieldLabel">
          生日
        </div>
        <div class="fieldContent">
          <div v-show="!editBirth">
            <div class="fieldText" style="display:inline-block">{{updatedInfo.birth_date}}</div>
            <div v-show="hoverBirth" style="display:inline-block; margin-top: -10px;">
              <button type="button" class="fieldModify editButton" @click="editBirth = true">
                <i class="el-icon-edit"></i>
                修改
              </button>
            </div>
          </div>
          <div v-show="editBirth">
            <el-date-picker value-format="yyyy-MM-dd" v-model="updatedInfo.birth_date" style="padding-right: 10px"></el-date-picker>
            <el-button type="primary" @click="submitChange('editBirth')">确定</el-button>
            <el-button @click="editBirth = false">取消</el-button>
          </div>
        </div>
      </div>
      <!--编辑签名-->
      <div
          class="field"
          @mouseover="hoverSig = true"
          @mouseleave="hoverSig = false"
      >
        <div class="fieldLabel">
          个性签名
        </div>
        <div class="fieldContent">
          <div v-show="!editSig">
            <div style="display:inline-block" class="fieldText">{{this.updatedInfo.signature ? this.updatedInfo.signature : '无'}}</div>
            <div style="display:inline-block;margin-top:-10px">
              <button v-show="hoverSig" type="button" class="fieldModify editButton" @click="editSig = true">
                <i class="el-icon-edit"></i>
                修改
              </button>
            </div>
          </div>
          <div v-show="editSig">
            <el-input
                placeholder="请输入新签名"
                v-model="updatedInfo.signature"
                style="max-width: 200px; padding-right: 10px"
            ></el-input>
            <el-button type="primary" @click="submitChange('editSig')">确定</el-button>
            <el-button @click="editSig = false">取消</el-button>
          </div>
        </div>
      </div>
      <!--编辑地址-->
      <div
          class="field"
          @mouseover="hoverAddress = true"
          @mouseleave="hoverAddress = false"
      >
        <div class="fieldLabel">
          地址
        </div>
        <div class="fieldContent">
          <div v-show="!editAddress">
            <div style="display:inline-block;" class="fieldText">{{updatedInfo.address}}</div>
            <div style="display:inline-block; margin-top: -10px;" v-show="hoverAddress">
              <button type="button" class="fieldModify editButton" @click="editAddress = true">
                <i class="el-icon-edit"></i>修改
              </button>
            </div>
          </div>
          <div v-show="editAddress">
            <el-input
                placeholder="请输入地址"
                v-model="updatedInfo.address"
                style="max-width: 200px; padding-right: 10px"
            ></el-input>
            <el-button type="primary" @click="submitChange('editAddress')">确定</el-button>
            <el-button @click="editAddress = false">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accountModify {
  /* margin: 0 auto; */
  position: relative;
}

.userCover {
  position: relative;
  height: 120px;
  overflow: hidden;
  background: #003580;
}

.userAvatar {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  margin: 105px 20px 24px;
  left: 0;
  z-index: 1;
  width: 160px;
  height: 160px;
  background-color: #dddddd50;

}

.accountEdit {
  padding-top: 16px;
  padding-left: 32px;
  border-left: 164px solid transparent;
}

.field {
  padding: 30px 0;
  border-bottom: 1px solid #ebebeb;
  margin: 14px auto;
  font-size: 15px;
  height: 50px;
}

.fieldLabel {
  line-height: 36px;
  color: #444;
  position: absolute;
  font-size: 17px;
}

.fieldContent {
  margin-top: 10px;
  padding: 0 64px 0 140px;
  width: 1000px;
  font-size: 15px;
}

.fieldModify {
  position: relative;
  margin: 0 16px;
  line-height: 36px;
}

div {
  font: inherit;
  font-weight: 600;
}

.editButton {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  appearance: none;
  outline: none;
  border: none;
  background-color: transparent;
  color: #175199;
  font-size: 15px
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      hoverUserName: false,
      editUserName: false,
      hoverGender: false,
      editGender: false,
      hoverBirth: false,
      editBirth: false,
      hoverPref: false,
      editPref: false,
      hoverSig: false,
      editSig: false,
      hoverAddress: false,
      editAddress: false,
      hoverAvatar: false,
      userInfo: {
        id: 1,
        username: "闫志豪",
        email: "459155106@qq.com",
        phone: "18852078152",
        avatar: null,
        gender: 1,
        birthDate: "2022-04-01",
        identity: 0,
        hotelId: null,
        status: 0,
        createTime: "2022-05-08 15:47:19",
        updateTime: "2022-05-08 15:47:22"
      },

      updatedInfo: {
        username: '',
        gender: '1',
        birth_date: '',
        preference_label: '',
        signature: '',
        address: ''
      },
      fileList: [],
    }
  },

  methods: {
    submitChange(labelName) {
      this[labelName] = false
      console.log(this.updatedInfo)
      axios.post('user/information/modify', this.updatedInfo, {
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
            }
            this.refreshUser()
          }
      )
    },

    uploadImage(file, fileList) {
      this.fileList = fileList
      const formData = new FormData()
      formData.set('file', this.fileList[this.fileList.length - 1].raw)
      axios.post('user/avatar/upload', formData, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            if (data.code === 200) {
              this.$notify({
                title: '头像更新成功',
                message: data.msg,
                type: 'success',
                offset: 50
              })
            }
            axios.post('user/information', {}, {
              headers: {
                'token': localStorage.getItem('currentuser'),
                'Content-Type': 'application/json',
              }
            }).then(
                ({ data }) => {
                  if (data.code === 200) {
                    this.userInfo = data.data.user
                  }
                  else {
                    this.$notify.error({
                      title: '错误',
                      message: data.msg,
                      offset: 50
                    })
                  }
                }
            )
          }
      )
    },
    refreshUser() {
      axios.post('user/information', {}, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            if (data.code === 200) {
              console.log(data.data.user)
              this.userInfo = data.data.user
              this.updatedInfo.email = this.userInfo.email ? this.userInfo.email : ''
              this.updatedInfo.phone = this.userInfo.phone ? this.userInfo.phone : ''
              this.updatedInfo.gender = this.userInfo.gender ? this.userInfo.gender : ''
              this.updatedInfo.username = this.userInfo.username ? this.userInfo.username : ''
              this.updatedInfo.birth_date = this.userInfo.birthDate ? this.userInfo.birthDate : ''
            }
            else {
              this.$notify.error({
                title: '错误',
                message: data.msg,
                offset: 50
              })
            }
          }
      )
    }
  },

  created() {
    axios.post('user/information', {}, {
      headers: {
        'token': localStorage.getItem('currentuser'),
        'Content-Type': 'application/json',
      }
    }).then(
        ({ data }) => {
          if (data.code === 200) {
            console.log(data.data.user)
            this.userInfo = data.data.user
            this.updatedInfo.email = this.userInfo.email
            this.updatedInfo.phone = this.userInfo.phone
            this.updatedInfo.gender = this.userInfo.gender
            this.updatedInfo.username = this.userInfo.username
            this.updatedInfo.birth_date = this.userInfo.birthDate
            this.updatedInfo.address = this.userInfo.address
          }
          else {
            this.$notify.error({
              title: '错误',
              message: data.msg,
              offset: 50
            })
          }
        }
    )
  },

  computed: {
    tableData: function () {
      let gender = !this.updatedInfo.gender ? '未知' : this.updatedInfo.gender === 1 ? '男' : '女'
      let email = !this.updatedInfo.email ? '未知' : this.updatedInfo.email
      return [
        {
          name: '性别',
          attr: gender,
          index: 0
        },
        {
          name: '手机号',
          attr: this.updatedInfo.phone,
          index: 1
        },
        {
          name: '电子邮箱',
          attr: email,
          index: 2
        },
        {
          name: '用户名',
          attr: this.updatedInfo.username,
          index: 3
        },
        {
          name: '生日',
          attr: this.updatedInfo.birthDate,
          index: 4
        },
      ]
    }
  }
}
</script>
