<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%"
    >
      <el-table-column>
        <el-table-column
            prop="roomNumber"
            label="日期"
            width="180">
        </el-table-column>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          roomNumber: 0
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
