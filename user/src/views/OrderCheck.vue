<template>
  <div class="checkContainer">
    <div class="title">
      <h3>
        住客名单
        <el-popover
            placement="right-start"
            width="200"
            trigger="click"
            v-model="addVisible"
        >
          <div v-for="(item, index) in guests" :key="index" class="guestCard">
            <div slot="header" style="margin-top:10px;">
              <span style="font-weight: bold; font-size: 15px">{{item.name}}</span>: {{item.phone}}
              <el-button
                  type="text"
                  style="float: right; padding: 2px 0"
                  @click="addGuest(index)"
                  v-bind:disabled="added[item.id]"
              >添加</el-button>
            </div>
          </div>
          <el-button slot="reference" style="margin-left:20px">+ 增加住客</el-button>
        </el-popover>
      </h3>
    </div>
    <el-card v-for="(item, index) in addedGuests" :key="index" class="guestCard" shadow="hover">
      <div slot="header" style="margin-top:20px; margin-bottom: 20px; font-size: 17px;">
        <div style="display:inline-block;width:100px;font-weight:bold;">客户姓名:</div>{{item.name}}
      </div>
      <div class="卡片主体" style="line-height: 40px">
        <div>
          <div style="display:inline-block;width:100px;font-weight:bold;">手机号:</div>{{item.phone}}
        </div>
        <div>
          <div style="display:inline-block;width:100px;font-weight:bold;">身份证号:</div>{{item.idNumber}}
        </div>
      </div>
      <div style="height: 30px">
          <el-popconfirm title="确认删除该住客吗？" @confirm="deleteGuest(index)">
              <el-button type="text" style="font-size: 16px; float: right;" slot="reference">删除该住客</el-button>
          </el-popconfirm>
      </div>
    </el-card>
    <div class="horizontalSplit"></div>
    <div>
      <h3>
        支付方式
      </h3>
    </div>
    <el-card style="width: 300px; margin-bottom: 10px" shadow="hover">
      <el-image src="https://gw.alipayobjects.com/mdn/rms_7e962d/afts/img/A*yCL8TrkjIx8AAAAAAAAAAAAAARQnAQ"></el-image>
    </el-card>
    <div class="horizontalSplit"></div>
    <div>
      <h3>
        订单详情
      </h3>


      <div class="订单内容">
          <el-table :data="订单内容" show-summary :summary-method="getSummaries">
              <el-table-column label="酒店图片" header-align=center align="center" width="150">
                  <template slot-scope="scope">
                      <img :src="scope.row.hotelPictureUrl" alt="酒店图片" style="width: 80px; height: 80px">
                  </template>
              </el-table-column>
              <el-table-column label="酒店名称" header-align=center align="center" prop="hotelName"></el-table-column>
              <el-table-column label="房型" header-align=center align="center" prop="roomCategoryName"></el-table-column>
              <el-table-column label="房间号" header-align=center align="center" prop="roomname"></el-table-column>
              <el-table-column label="房间单价" header-align=center align="center">
                  <template slot-scope="scope">
                      <strong style="color:red ">{{(scope.row.roomCategoryPrice).toFixed(2)}}</strong>
                  </template>
              </el-table-column>
              <el-table-column label="房间数量" header-align=center align="center">1</el-table-column>
              <el-table-column label="房间总价" header-align=center align="center">
                  <template slot-scope="scope">
                      <strong style="color:red ">{{scope.row.sum=(scope.row.roomCategoryPrice).toFixed(2)}}</strong>
                  </template>
              </el-table-column>
          </el-table>
      </div>



    </div>
    <div class="submit" style="margin-top:50px; margin-bottom:100px">
      <el-button @click="submitOrder">提交订单</el-button>
      <el-button @click="backtohome">返回</el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.checkContainer {
  max-width: 1170px;
  margin: 0 auto;
}

.horizontalSplit {
  height: 1px;
  background-color: #ddd;
}

.guestCard /deep/ .el-card__header {
  padding: 5px 10px;
}

.guestCard {
  margin-bottom: 10px;
}

.guestCard {
  /deep/ .el-card__header {
    padding: 2px 20px;
  }

  /deep/ .el-button {
    padding: 5px 20px;
  }
}

.submit {
  text-align: right;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orderId: '',
      订单内容: [],
      guests: [],
      addVisible: false,
      added: {},
      addedGuests: []
    }
  },

  methods: {
    backtohome(){
      this.$router.push('/finalhome');
    },
    getsum() {
        var fuck = this.订单内容;
        var sum = 0
        for (var i = 0; i < fuck.length; i++) {
            sum += fuck[i].roomCategoryPrice;
        }
        this.fucksum = sum;
        return sum.toFixed(2);
    },
    getSummaries(param) {
        //此处打印param可以看到有两项，一项是columns，一项是data，最后一列可以通过columns.length获取到。
        const { columns, data } = param
        const len = columns.length
        const sums = []
        columns.forEach((column, index) => {
            //如果是第一列，则最后一行展示为“总计”两个字
            if (index === 0) {
            sums[index] = '总计'
            //如果是最后一列，索引为列数-1，则显示计算总和
            } else if (index === len - 1) {
            sums[index] = this.getsum()
            //如果是除了第一列和最后一列的其他列，则显示为空
            } else {
            sums[index] = ''
            }
          })
        return sums
      },
    addGuest(index) {
      this.addedGuests.push(this.guests[index])
      this.added[this.guests[index].id] = true
    },

    checkAdded(item) {
      console.log(item)
      for (let i = 0; i < this.addedGuests.length; i++) {
        if (item.id === this.addedGuests[i].id) {
          return true
        }
        return false
      }
    },

    deleteGuest(index) {
      this.added[this.addedGuests[index].id] = false
      let temp = []
      for (let i = 0; i < this.addedGuests.length; i++) {
        if (i !== index) {
          temp.push(this.addedGuests[i])
        }
      }
      this.addedGuests = temp
    },

    submitOrder() {
      var ppitem={
          orderId: this.orderId,
          PaymentType: '支付宝',
      };
      if (this.addedGuests.length==0){
        this.$notify.error({
            title: '订单提交失败',
            message: '您还没有添加顾客',
            offset: 50
        });
        return;
      }
      else{
          for (var i=0;i<this.addedGuests.length;i++){
              var str='guestId';
              ppitem[str+(i+1)]=this.addedGuests[i].userId
          }
          axios.post('alipay/topay', ppitem, {
            headers: {
              'token': localStorage.getItem('currentuser'),
              'Content-Type': 'application/json',
            }
          }).then(
              res => {
                document.querySelector('body').innerHTML = res.data;
                document.forms[0].submit();
              }
          )
        }
      }
  },

  created() {
    this.orderId = this.$route.query.orderid
    axios.post('guest/get', {}, {
      headers: {
        'token': localStorage.getItem('currentuser'),
        'Content-Type': 'application/json',
      }
    }).then(
      ({ data }) => {
        if (data.code === 200) {
          this.guests = data.data.guests
        }
        for (let i = 0; i < this.guests.length; i++) {
          this.added[this.guests[i].id] = false
        }
    })
    axios.post('order/getById',{
      'orderId':this.orderId
    },{
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
      }
    }).then(({data}) =>{
        if (data.code==200){
          console.log(data);
          var temprep=data.data;
          var len=temprep.roomNames.length;
          console.log(len);
          this.订单内容=[]
          for (var i=0;i<len;i++){
            var pushitem=JSON.parse(JSON.stringify(temprep))
            pushitem['roomname']=temprep.roomNames[i];
            delete pushitem.roomNames;
            this.订单内容.push(pushitem);
          }
          // console.log(this.订单内容)
        }
    })
  }
}
</script>