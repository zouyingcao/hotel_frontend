<template>
  <div class="login_container">
    <div id="background_div"></div>
    <div class="login_box">
      <div><img src="../assets/loginicon.png" width="50%" alt=""></div>
      <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" v-show="loginByPassword">
        <!--用户名-->
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" prefix-icon="el-icon-user" placeholder="请输入手机号/邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetLoginForm">重置</el-button>
          <el-button @click="loginByPassword = false">验证码登录</el-button>
          <el-button @click="loginToRegister">注册</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="verCodeForm" ref="verCodeFormRef" v-show="!loginByPassword">
        <!--用户名-->
        <el-form-item prop="userName">
          <el-input v-model="verCodeForm.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-col :span="15">
            <el-input v-model="verCodeForm.verCode" prefix-icon="el-icon-lock" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="9">
            <el-button @click="getVerCode" v-bind:disabled=verCodeForm.buttonDisabled>获取验证码{{verCodeForm.countdown}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="loginByVerCode">登录</el-button>
          <el-button @click="resetVerCodeForm">重置</el-button>
          <el-button @click="loginByPassword = true">密码登录</el-button>
          <el-button @click="loginToRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
// eslint-disable-next-line
const axios = require('axios')
  export default {
    data() {
      return {
        loginForm: {
          userName: '',
          password: '',
        },

        verCodeForm: {
          phone: '',
          verCode: '',
          verCodeId: '',
          buttonDisabled: false,
          countdown: '',
        },

        loginFormRules: {
          userName: [{ required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        },

        loginByPassword: true,
      }
    },

    methods: {
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      },

      login() {
        axios.post('/user/login/password', {
          'tele_email': this.loginForm.userName,
          'password': this.loginForm.password
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(
            ({ data }) => {
              if (data.code === 200) {
                this.$notify({
                  title: '登录成功，自动跳转到主页',
                  message: data.msg,
                  type: 'success',
                  offset: 50
                })
                this.$store.commit('setLoginState', true)
                this.$store.commit('setIdentity', data.data.identity)
                console.log(data.data.token)
                localStorage.setItem('identity', data.data.identity)
                localStorage.setItem('currentuser', data.data.token)
                if (this.$store.state.identity) {
                  window.location.assign('/admin/')
                }
                // axios.defaults.headers.common.Authorization = JSON.parse(localStorage.currentuser).token
                localStorage.getItem('currentuser')
                axios.post('/user/information', {}, {
                  headers: {
                    'token': localStorage.getItem('currentuser'),
                    'Content-Type': 'application/json',
                  }
                }).then(
                    ({ data }) => {
                      localStorage.setItem('userAvatar', JSON.stringify(data.data))
                      this.$router.push('/finalhome')
                    }
                )
              }
              else {
                this.$notify.error({
                  title: '错误',
                  message: data.msg,
                  offset: 50
                })
              }
            }
        ).catch(
            reason => {
              this.$notify.error({
                title: '错误',
                message: reason.message,
                offset: 50
              })
            }
        )
      },

      loginToRegister() {
        this.$router.push('/register')
      },

      getVerCode() {
        if (this.verCodeForm.phone === '') {
          this.$notify.error({
            title: '错误',
            message: '请先填写手机号',
            offset: 50
          })
        }
        else {
          let count = 60
          let timer = setInterval(
              () => {
                console.log('timer')
                if (count >= 0) {
                  this.verCodeForm.countdown = '(' + count.toString() + 's)'
                  this.verCodeForm.buttonDisabled = true
                  count--
                }
                else {
                  clearInterval(timer)
                  this.verCodeForm.countdown = ''
                  this.verCodeForm.buttonDisabled = false
                }
              },
              1000)
          axios.post('verification/phone', {'phone': parseInt(this.verCodeForm.phone)}).then(
              ({ data }) => {
                if (data.code === 200) {
                  this.$notify.success({
                    title: '成功',
                    message: data.msg,
                    offset: 50
                  })
                  this.verCodeForm.verCodeId=data.data.verCodeId
                  console.log(data.data.verCodeId)
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

      loginByVerCode() {
        console.log('fuck')
        axios.post('user/login/verfication', {
          phone: this.verCodeForm.phone,
          verCode: this.verCodeForm.verCode,
          verCodeId: this.verCodeForm.verCodeId
        }).then(
            ({ data }) => {
              console.log(data)
              if (data.code === 200) {
                this.$notify({
                  title: '登录成功，自动跳转到主页',
                  message: data.msg,
                  type: 'success',
                  offset: 50
                })
                console.log(data.data.token)
                localStorage.setItem('currentuser', data.data.token)
                // axios.defaults.headers.common.Authorization = JSON.parse(localStorage.currentuser).token
                localStorage.getItem('currentuser')
                axios.post('/user/information', {}, {
                  headers: {
                    'token': localStorage.getItem('currentuser'),
                    'Content-Type': 'application/json',
                  }
                }).then(
                    ({ data }) => {
                      localStorage.setItem('userAvatar', JSON.stringify(data.data))
                      this.$router.push('/finalhome')
                    }
                )
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

      resetVerCodeForm() {
        console.log('reset')
        this.$refs.verCodeFormRef.resetFields()
      }
    }
  }
</script>
<style scoped>
  .login_container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  }

  .login_box {
    max-width: 410px;
    text-align: center;
    background: #FFFFFF60;
    border-radius: 30px;
    padding: 20px 50px;
  }

  #background_div {
    position: fixed;
    left: 0;
    width: 100%;
    height: 130%;
    z-index: -10;
    object-fit: cover;
    background: #3F74BF;
  }
</style>
