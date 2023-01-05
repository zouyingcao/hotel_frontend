<template>
  <div style="margin-top: 10px">
    <el-row>
      <el-col :span="10">
        <el-input placeholder="请输入酒店id" v-model="postData.hotelId">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button style="margin-left: 20px" @click="getBookingInfo">提交</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="hotelData.orders"
      stripe
      style="width: 100%; margin-top: 10px">
      <el-table-column
          prop="orderId"
          label="订单号"
          width="100"
          sortable
      >
      </el-table-column>
      <el-table-column
        prop="roomStartTime"
        label="预定开始日期"
        width="180"
      >
      </el-table-column>
      <el-table-column
          prop="roomEndTime"
          label="预定结束日期"
          width="180"
          sortable
      >
      </el-table-column>
      <el-table-column
          prop="roomCategory"
          label="房间类型"
          width="180"
      >
      </el-table-column>
      <el-table-column
          prop="orderMoney"
          label="实付款"
          width="100"
      >
      </el-table-column>
      <el-table-column
          label="房间"
          width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.roomNames.join(', ') }}
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
      >
        <el-button
          size="mini">
          查看住客信息
        </el-button>
        <el-button
            size="mini">
          入住
        </el-button>
        <el-button
            size="mini">
          退房
        </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      postData: {
        hotelId: 6457,
      },
      hotelData: {
        money: 0.0,
        bookNum: 0,
        freeNum: 0,
        orders: []
      }
    }
  },

  methods: {
    getBookingInfo() {
      axios.post('admin/hotelBooking', this.postData, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            this.hotelData = data.data
            console.log(this.hotelData.orders)
          }
      )
    }
  },
  created() {
    axios.post('admin/hotelBooking', this.postData, {
      headers: {
        'token': localStorage.getItem('currentuser'),
        'Content-Type': 'application/json',
      }
    }).then(
        ({ data }) => {
          this.hotelData = data.data
          console.log(this.hotelData.orders)
        }
    )
  }
}
</script>