<template>
    <div>
        <div class="订单列表内容">
            <el-table :data="订单列表" :header-cell-style="{background:'#eef1f6',color:'#606266'}" stripe border height="700" v-loading="loading">
                <el-table-column label="订单号" prop="orderId" header-align=center align="center" width="100px"></el-table-column>

                <el-table-column label="订单详情" header-align=center align="center" width="600">
                    <template slot-scope="scope">
                        <el-table :data="scope.row.orderdata">
                        <el-table-column label="酒店图片" header-align=center align="center" width="130">
                            <template slot-scope="scope1">
                                <img :src="scope1.row.hotelPictureUrl" alt="酒店图片" style="width: 80px; height: 80px">
                            </template>
                        </el-table-column>
                        <el-table-column label="酒店名称" header-align=center align="center" prop="hotelName"></el-table-column>
                        <el-table-column label="房型" header-align=center align="center" prop="roomCategoryName"></el-table-column>
                        <el-table-column label="房间号" header-align=center align="center" prop="roomname"></el-table-column>
                        <el-table-column label="房间单价" header-align=center align="center">
                            <template slot-scope="scope1">
                                <strong style="color:red ">{{(scope1.row.roomCategoryPrice).toFixed(2)}}</strong>
                            </template>
                        </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>


                <el-table-column label="总金额" header-align=center align="center" width="100">
                    <template slot-scope="scope">
                        <strong style="color:red">{{(scope.row.roomCategoryPrice*scope.row.roomNum).toFixed(2)}}</strong>
                    </template>
                </el-table-column>

                <el-table-column label="订单状态" header-align=center align="center" width="100">
                    <template slot-scope="scope">
                        {{scope.row.status=scope.row.status|orderType}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" header-align=center align="center" prop="quantity" width="150">
                    <template slot-scope="scope">
                            <div class="订单按钮">
                                <el-button v-if="scope.row.orderStatus==1" type="success" @click="payorder(scope.$index)">
                                    支付订单
                                </el-button>
                            </div>
                            <div class="订单按钮">
                                <el-button v-if="scope.row.orderStatus!=0" type="danger" @click="deleteorder(scope.$index)">
                                    删除订单
                                </el-button>
                            </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'
export default {
    methods: {
        payorder(index){
            localStorage.waitorderid=this.订单列表[index].orderId;
            this.$router.push('/ordercheck')
        },
        deleteorder(index){
            axios.post('order/delete',{"orderId": this.订单列表[index].orderId},{
                headers: {
                    'token': localStorage.getItem('currentuser'),
                    'Content-Type': 'application/json',
                }
              }).then(resp=>{
                this.$notify.success({
                    title: '订单删除成功',
                    message: "该订单已从您的账户内删除～",
                    offset:50
                })
                this.updateorder();
            })
        },
        updateorder(){
            this.loading=true;
            axios.post("order/information/all",{},{
              headers: {
                'token': localStorage.getItem('currentuser'),
                'Content-Type': 'application/json',
              }
            }).then(resp=>{
                this.订单列表=resp.data.data;

                var array_len= resp.data.data.length;
                console.log(array_len)
                var templist=[]
                for (var i=0;i<array_len;i++){
                    var listitem=[];

                    var temprep=resp.data.data[i];
                    console.log(temprep);
                    var len=temprep.roomNames.length;
                    for (var j=0;j<len;j++){
                      var pushitem=JSON.parse(JSON.stringify(temprep))
                      pushitem['roomname']=temprep.roomNames[j];
                      delete pushitem.roomNames;
                      listitem.push(pushitem);
                    }
                    templist.push(listitem);
                    this.订单列表[i]['orderdata']=JSON.parse(JSON.stringify(listitem));
                }
                this.loading=false;
            })
        }
    },
    data:function(){
        return {
            订单列表:[],
            loading: true
          }
    },
    components:{
        Navbar
    },
    filters:{
        orderType (num) {
        if (num == 0) {
            return "已删除"
        } else if (num == 1) {
            return "未支付"
        } else if (num == 2) {
            return "已支付"
        }
        },
    },
    created(){
        this.updateorder();
    }
}
</script>

<style scoped>
    .商品名称{
        font-size:10px
    }
    * {
        text-align: left;
    }
    .订单按钮{
        text-align:center;
        margin: 10px;
    }
    .正文{
        margin: auto;
    }
    .el-menu{
        height: 300px;
    }
    .hr {
        height: 1px;
        background-color: #ddd;
    }
    .订单列表内容{
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
</style>