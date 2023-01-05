<template>
  <div class="register_container">
    <div id="background_div"></div>
    <div class="login_box">
      <div><img src="../assets/loginicon.png" width="25%" alt=""></div>
      <el-form :model="registerForm" ref="registerFormRef" :rules="registerFormRules">
        <!--用户名-->
        <el-form-item prop="phone">
          <el-input v-model="registerForm.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="retypePassword">
          <el-input v-model="registerForm.retypePassword" prefix-icon="el-icon-lock" placeholder="请重复输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="verCode">
          <el-col :span="15">
            <el-input v-model="registerForm.verCode" prefix-icon="el-icon-lock" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="9">
            <el-button @click="getVerCode" v-bind:disabled=registerForm.buttonDisabled>获取验证码{{registerForm.countdown}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button @click="resetRegisterForm">重置</el-button>
          <el-button @click="registerToLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.register_container {
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

<script>
import axios from "axios";

export default {
  data() {
    let checkPassword = (rule, value, callback) => {
      console.log(this.password)
      console.log(this.retypePassword)
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'))
      }
      callback()
    }

    return {
      registerForm: {
        phone: '',
        password: '',
        retypePassword: '',
        verCode: '',
        verCodeId: '',
        buttonDisabled: false,
        countdown: ''
      },

      registerFormRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '请输入有效的中国大陆手机号', trigger: 'blur'},
        ],

        retypePassword: [
          { required: true, message: '请重复输入密码', trigger: 'blur' },
          { validator: checkPassword, message: '两次输入密码不一致', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    register() {
      axios.post('user/register',{
        "telephone":this.registerForm.phone,
        "password":this.registerForm.password,
        "verCode":this.registerForm.verCode,
        "verCodeId":this.registerForm.verCodeId
        }).then(res=>{
          console.log(res);
          if(res.data.code==200){
              this.$notify.success({
              title: '注册成功',
              message: '自动跳转至登录页面',
              offset: 50
            })
            this.registerToLogin();
          }
          else{
            this.$notify.error({
              title: '错误',
              message: res.data.msg,
              offset: 50
            })
          }
      })
    },

    registerToLogin() {
      this.$router.push('/login')
    },

    resetRegisterForm() {
      this.$refs.registerFormRef.resetFields()
    },

    getVerCode() {
      if (this.registerForm.phone === '') {
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
                this.registerForm.countdown = '(' + count.toString() + 's)'
                this.registerForm.buttonDisabled = true
                count--
              }
              else {
                clearInterval(timer)
                this.registerForm.countdown = ''
                this.registerForm.buttonDisabled = false
              }
            },
            1000)
        axios.post('verification/phone', {'phone': parseInt(this.registerForm.phone)}).then(
            ({ data }) => {
              if (data.code === 200) {
                this.$notify.success({
                  title: '成功',
                  message: data.msg,
                  offset: 50
                })
                this.registerForm.verCodeId=data.data.verCodeId;
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
    }
  }
}
</script>