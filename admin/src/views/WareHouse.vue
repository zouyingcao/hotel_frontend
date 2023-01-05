<template>
  <div>
    <div class="buttonBox">
      <el-button @click="dialogShow = true">增加物品</el-button>
      <el-popconfirm
        title="这将删除所有仓库内容，确定要继续吗"
        @confirm="clearAll"
      >
        <el-button slot="reference">清仓</el-button>
      </el-popconfirm>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="itemName"
        label="物品名称"
        width="180">
      </el-table-column>
      <el-table-column
          label="剩余数量"
          width="200"
      >
        <template slot-scope="scope">
          <div style="display: inline-block" v-show="scope.$index !== editIdx">
            {{scope.row.itemNumber}}
          </div>
          <div style="display: inline-block" v-show="scope.$index === editIdx">
            <el-input-number
              v-model="editData"
              size="mini"
            >
            </el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            v-show="scope.$index !== editIdx"
          >
            编辑
          </el-button>
          <el-button
              size="mini"
              @click="handleSubmit(scope.$index, scope.row)"
              v-show="scope.$index === editIdx"
              style="margin: 0"
          >
            确定
          </el-button>
          <el-button
              size="mini"
              @click="handleCancel"
              v-show="scope.$index === editIdx"
          >
            取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="增加物品"
      :visible.sync="dialogShow"
      width="30%"
      >
      <el-form :model="formData">
        <el-form-item label="物品名称">
          <el-input v-model="formData.itemName" placeholder="请输入物品名称"></el-input>
        </el-form-item>
        <el-form-item label="物品数量">
          <el-input-number v-model="formData.itemNumber"></el-input-number>
        </el-form-item>
      </el-form>
      <div style="display: inline-block" slot="footer">
        <el-button @click="addNewItem">
          确定
        </el-button>
        <el-button @click="dialogShow = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      formData: {
        itemName: '',
        itemNumber: 0,
      },
      tableData: [
      ],

      editIdx: -1,
      editData: 0,
      dialogShow: false,
    }
  },

  methods: {
    handleEdit(index, row) {
      this.editData = row.itemNumber
      this.editIdx = index
    },

    handleCancel() {
      this.editIdx = -1
    },

    handleSubmit(index, row) {
      axios.post('warehouse/modify', {
        itemName: row.itemName,
        itemNumber: row.itemNumber
      }, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            if (data.code === 200) {
              this.$notify.success('修改成功')
              row.itemNumber = this.editData
            }
          }
      )
      this.editIdx = -1
    },

    addNewItem() {
      axios.post('warehouse/add', this.formData, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            if (data.code === 200) {
              this.$notify.success('添加物品成功')
            }
          }
      )
      this.dialogShow = false
      this.getAll()
    },

    getAll() {
      axios.post('warehouse/get/all', {},{
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }}).then(
          ({ data }) => {
            if (data.code === 200) {
              this.tableData = data.data.warehouses
              console.log(this.tableData)
            }
          }
      )
    },

    clearAll() {
      axios.post('warehouse/clear', {}, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }}).then(
          ({ data }) => {
            if (data.code === 200) {
              this.$notify.success(data.msg)
              this.getAll()
            }
          }
      )
    }
  },

  created() {
    this.getAll()
  }
}
</script>

<style scoped>
.buttonBox {
  text-align: right;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}
</style>
