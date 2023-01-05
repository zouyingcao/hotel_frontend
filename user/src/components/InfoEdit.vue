<template>
  <el-form-item v-bind:label="label">
    <el-input
        v-model="data"
        style="max-width: 150px"
        v-bind:disabled=disabled
        v-bind:show-password=showPassword
    ></el-input>
    <el-button
        type="text"
        style="margin-left: 10px"
        @click="onChangeEditable"
        v-show="disabled"
    >编辑</el-button>
    <el-button
        type="text"
        style="margin-left: 10px"
        v-show="!disabled"
    >确定</el-button>
    <el-button
        type="text"
        style="margin-left: 10px"
        @click="rollbackItem"
        v-show="!disabled"
    >取消</el-button>
  </el-form-item>
</template>

<script>
  export default {
    name: "InfoEdit",

    data() {
      return {
        data: this.oldData,
        hasChanged: (()=>{return this.data===this.oldData})(),
        disabled: true
      }
    },

    props: {
      oldData: {
        type: String,
        required: true
      },

      label: {
        type: String,
        required: true
      },

      showPassword: {
        type: Boolean,
        required: false
      }
    },

    methods: {
      onChangeEditable() {
        this.disabled = !this.disabled
      },

      rollbackItem() {
        this.data = this.oldData
        this.disabled = !this.disabled
      }
    }
  }
</script>