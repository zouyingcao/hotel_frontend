<template>
  <el-menu
      :default-active="this.$route.path"
      router
  >
    <RecursionSubmenu
        v-for="(item, index) in myMenu"
        v-bind:menu="item"
        :key="index"
    >
    </RecursionSubmenu>
  </el-menu>
</template>

<script>
import RecursionSubmenu from "./RecursionSubmenu";
export default {
  components: {RecursionSubmenu},
  props: {
    myMenu: {
      type: Array,
      required: true
    }
  }
}
</script>
