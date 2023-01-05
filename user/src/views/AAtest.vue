<script>
import Navbar from './Navbar.vue'

export default {
  components: {
    Navbar,
},
  mounted() {
    this.$refs.child.navtest();
  }
}
</script>

<template>
<div>
    hello
    <Navbar ref="child" />
</div>
</template>
