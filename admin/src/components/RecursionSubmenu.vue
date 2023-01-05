<template>
  <el-menu-item v-bind:index="menu.index" v-if="menu.children === undefined">
    {{menu.title}}
  </el-menu-item>
  <el-submenu v-bind:index="menu.index" v-else>
    <template slot="title">
      {{menu.title}}
    </template>
    <RecursionSubmenu
        v-for="(item, index) in menu.children"
        v-bind:menu="item"
        :key="index"
    ></RecursionSubmenu>
  </el-submenu>
</template>

<script>
export default {
  name: 'RecursionSubmenu',
  props: {
    menu: {
      type: Object,
      required: true
    }
  }
}
</script>
