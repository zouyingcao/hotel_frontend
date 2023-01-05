<template>
  <div style="background-color: #f2f4f8; margin-top: -3px;">
    <div class="正文" style="width: 1100px; margin: auto">
      <div class="酒店信息" style="padding-top: 30px">
        <el-card style="padding: 30px; padding-top: 10px">
          <div class="标题和星级和价格" style="padding-bottom:10px">
            <div style="display:inline-block; font-size: 25px; font-weight: bold; vertical-align: top">{{hotelInfo.name}}</div>
            <div style="display:inline-block; margin-top: 10px; margin-left: 30px; vertical-align: top;">
              <el-rate v-model="hotelInfo.star" isabled show-score text-color="#ff9900" score-template="{value} 星级" disabled></el-rate>
            </div>
            <div style="display:inline-block; float:right; font-size: 30px; color:red; margin-top: 30px; margin-right: 30px;">入住 ¥{{minprice.toFixed(2)}} 起</div>
          </div>
          <div style="margin-top: 15px; margin-left: 10px; width: 350px; display: inline-block;" class="酒店地址和酒店电话">
            <div style="height:auto;color: gray; font-size: 18px;">
              <i class="el-icon-location" style="color:gray;"></i>酒店地址：{{hotelInfo.location}}
            </div>
            <div style="height:auto;color:gray; font-size: 18px;margin-top: 10px;" >
              <i class="el-icon-phone" style="color:gray"></i>酒店电话：{{hotelInfo.phone === null ? '13865482739' : hotelInfo.phone}}
            </div>
          </div>

          <div class="酒店评分" style="display:inline-block;width:100px;vertical-align:top;margin-top:20px;background-color:#4978ce;
          font-size:22px;color:#fff;border-radius:2px;margin-left:50px;height: 30px;" >
            <div style="text-align:center">{{this.hotelInfo.avgScore==-1 ? "?.??" : (this.hotelInfo.avgScore).toFixed(2)}}分</div>
          </div>
          <div style="display:inline-block;margin-left: 20px;vertical-align:top; margin-top: 20px; font-size:22px; color:#4978ce;font-weight: 700;" >
            <div v-if="this.hotelInfo.avgScore==-1">等你评价</div>
            <div v-if="this.hotelInfo.avgScore==5 && this.hotelInfo.avgScore>4">好评如潮</div>
            <div v-if="this.hotelInfo.avgScore<=4 && this.hotelInfo.avgScore>3">评价不错</div>
            <div v-if="this.hotelInfo.avgScore<=3 && this.hotelInfo.avgScore>=0">评价一般</div>
          </div>


      <div class="酒店图片和信息" style="margin-top: 20px">
          <div class="酒店图片" style="display:inline-block; width: 500px; vertical-align: top">
            <el-image fit="scale-down" v-bind:src="hotelInfo.picture"></el-image>
          </div>
          <div class="右侧信息" style="display:inline-block; width: 450px; margin-left: 30px;">
              <el-card shadow="never" style="flex-grow: 1; background-color: #ffebeb">
                <i class="el-icon-warning" style="color:red"></i>
                <span style="margin-top: 0"> COVID-19相关: 预定酒店前请先查询当地疫情防控政策，以免影响您的出行。</span>
              </el-card>
              <div class="房型描述">
                <div v-for="(item,index) in hotelDataList" :key="index" style="margin-top: 20px; margin-left: 20px; font-size: 25px;">
                    <div class="房型" style="display: inline-block; width: 120px;">{{item.name}}: </div>
                    <div class="现价" style="display: inline-block; margin-left: 30px; color: orangered; font-weight: bold;">¥{{(item.price).toFixed(2)}}</div>
                    <div class="原价" style="display: inline-block; margin-left: 30px; color: gray; font-weight: bold;"><del>¥{{(item.price/gen_discount(hotelInfo.id)*10).toFixed(2)}}</del></div>
                </div>
              </div>
              <div class="小标签" style="margin-top: 30px; justify-content:space-between;display:flex;flex-direction:row;flex-wrap: wrap;">
                  <el-tag effect="plain" type="danger" style="font-size: 20px; font-weight: bolder;">特惠{{gen_discount(hotelInfo.id)}}折</el-tag>
                  <el-tag type="danger" v-if="gen_hot(hotelInfo.id)" style="font-size: 20px; font-weight: bolder;">当季热门</el-tag>
                  <el-tag effect="warning" type="info" v-if="!gen_hot(hotelInfo.id)" style="font-size: 20px; font-weight: bolder;">河马推荐</el-tag>
                  <el-tag effect="plain" type="danger" style="font-size: 20px; font-weight: bolder;">新客立减{{gen_miss(hotelInfo.id)}}元</el-tag>
            </div>
            </div>
          </div>
          </el-card>
        <div class="功能栏" style="margin-top: 30px">
          <el-card>
            <el-tabs :stretch="true">




              <el-tab-pane label="房间">
                <div v-for="data in hotelDataList" :key="data.id" class="roomlist-baseroom-card marginBottom">
                  <div class="roomCard">
                    <div class="roomPanel">
                      <div class="descriptions">
                        <div class="roomPanelPic">

                        </div>
                        <div class="roomName">
                          <div style="margin-top:20px">
                            <el-image v-if="data.name=='标准间'" src="https://st2.depositphotos.com/47577860/47846/v/600/depositphotos_478466394-stock-illustration-bed-single-bedrooms-icon-outline.jpg"></el-image>
                            <el-image v-if="data.name=='单人间'" src="https://st2.depositphotos.com/47577860/47850/v/600/depositphotos_478506712-stock-illustration-hotel-single-bed-icon-solid.jpg"></el-image>
                            <el-image v-if="data.name=='大床房'" src="https://st2.depositphotos.com/47577860/47838/v/600/depositphotos_478389796-stock-illustration-hotel-double-bed-icon-solid.jpg"></el-image>
                            <el-image v-if="data.name=='豪华套房'" src="https://st.depositphotos.com/1848791/4188/v/600/depositphotos_41883691-stock-illustration-magic-wand-and-hat.jpg"></el-image>
                          </div>
                          <div style="text-align:center">{{data.name}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="saleRoomList">
                      <div class="saleCardContainer">
                        <div class="saleCardFlex">
                          <div class="peopleBox">
                            <div style="width: 80px; padding-right: 21px; margin-top: 30px;">
                              <span style=" color: gray; ">房间人数:</span>
                              <i class="el-icon-user-solid" v-for="id in new Array(data.maxPeople)" v-bind:key="id"></i>
                            </div>
                            <div class="saleCardPrice">
                              <div style="margin-left: 40px; margin-top: 30px;">
                                客房面积：{{data.size}} 平方米
                              </div>
                            </div>
                          </div>
                          <div style="margin-left: 100px; margin-top: 5px; width: 200px;">
                            <div class="descriptions" v-if="data.wifi === 1">
                              <i class="el-icon-thumb"></i>  24小时 WI-FI 提供
                            </div>
                            <div class="descriptions" v-if="data.window === 1">
                              <i class="el-icon-view"></i>  全景窗 畅享美景
                            </div>
                            <div class="descriptions" v-if="data.breakfast === 1">
                              <i class="el-icon-fork-spoon"></i>  美味早餐
                            </div>
                          </div>
                          <div class="saleCardPrice" style="margin-left: 60px; margin-top:20px">
                            <div class="descriptions price" style="margin-top: 5px; width: 110px">¥{{data.price.toFixed(2)}}</div>
                            <el-button style="text-align: right;" @click="orderRoom(data.id, data.name)" type="danger">立刻预定</el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>




              <el-tab-pane label="评价">
                <el-card class="marginBottom">
                  <div slot="header">
                    <h2>酒店评论
                      <el-button style="float: right;" @click="commentVisible=true">写评论</el-button>
                    </h2>
                  </div>
                  <div v-if="this.hotelComments.length">
                    <div class="commentBlockWrapper" v-for="(item, index) in this.hotelComments" :key="index">
                      <el-card class="commentCard">
                        <div slot="header">
                          <div style="float: left;">
                            <el-avatar :src="item.avatar"></el-avatar>
                          </div>
                          <div style="min-height: 35px; margin-top: 10px;">
                          <span style="margin-left: 10px;">
                            {{item.userName}}
                          </span>
                          </div>
                          <div>
                            <el-rate
                                v-model="item.star"
                                disabled
                                show-score
                                style="padding-left: 48px; margin-top: -10px"
                            >

                            </el-rate>
                          </div>
                        </div>
                        <div style="font-size: 10pt">
                          {{item.createTime}}
                        </div>
                        <div>
                          {{item.content}}
                        </div>
                      </el-card>
                    </div>
                    <div class="clearLeft"></div>
                    <el-pagination
                        v-bind:total="Math.ceil(commentNum / 4)"
                        layout="prev, pager, next"
                        :current-page.sync="page"
                        @prev-click="prevClickHandler"
                        @next-click="nextClickHandler"
                        @current-change="currentChangeHandler"
                    ></el-pagination>
                  </div>
                  <div v-if="!hotelComments.length" style="text-align: center">
                    <h3>当前酒店暂时没有评论</h3>
                  </div>
                </el-card>
              </el-tab-pane>
              <el-tab-pane label="政策">
                <el-empty description="根据COVID-19, 相关政策正在准备中"></el-empty>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
        <el-dialog
            v-bind:title="orderDialog.name"
            :visible.sync="orderDialog.dialogVisible"
            width="450px"
            >
          <el-form
              :model="this.orderDialog.formData"
              style="padding-left: 30px; padding-top: 30px"
          >
            <el-form-item label="预定房间数:">
              <el-input-number
                  size="medium"
                  v-model="orderDialog.formData.number"
                  :min="1"
                  :max="3"
                  style="margin-left: 10px;width: 230px;">
              </el-input-number>
            </el-form-item>
            <el-form-item label="开始时间:">
              <el-date-picker
                  v-model="orderDialog.formData.startTime"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 20px; width: 240px;"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间:">
              <el-date-picker
                  v-model="orderDialog.formData.endTime"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 20px; width: 240px;"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <div style="margin-top: 30px; text-align: center;">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog
            :visible.sync="commentVisible"
            title="我的评分"
        >
          <el-form :model="commentDialog" :rules="commentRules" ref="commentForm">
            <el-form-item label="评分" prop="star">
              <el-rate
                  allow-half
                  v-model="commentDialog.star"
                  style="padding-top:11px;"
              >
              </el-rate>
            </el-form-item>
            <el-form-item label="评论" prop="comment">
              <el-input
                  type="textarea"
                  :rows="2"
                  v-model="commentDialog.myComment"
                  placeholder="请输入评论"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="commentVisible = false">取 消</el-button>
              <el-button type="primary" @click="addComment">确 定</el-button>
            </span>
        </el-dialog>
      </div>
    </div>
    <div class="底部大块">
      <video autoplay="autoplay" loop style="width: 1200px; margin: auto; border-radius: 15px" @click="tolists('酒店')">
        <source src="../video/bottom.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<style scoped lang="less">
.left_float_div {
  float: left;
  width: 25%;
  margin-top: 15px;
  min-height: max-content;
  margin-right: 20px;
}

.nav_bar_wrapper {
  margin: 0 auto;
  text-align: center;
  width: 100%;
}

.nav_bar_list {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: #ebf3ff;
}

.nav_bar_item {
  display: table-row;
  margin: 0 auto;
  text-decoration: none;
}

.hotel_info_card {
  margin-bottom: 15px;
}

.hotel_info_card /deep/ .el-card__header {
  background: #4C76B2;
  border-radius: 20px;
}

.roomContainer {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
}

.marginBottom {
  margin-bottom: 15px;
}

.main_div {
  overflow: hidden;
}

.commentBlockWrapper {
  float:left;
  min-width: 47%;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
}

.commentCard /deep/ .el-card__header {
  padding: 5px 10px;
}

.infoHeader {
  color: #ffffff;
}

.descCard /deep/ .el-card__body {
  display: flex;
  flex-direction: row;
}

.descriptions {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 6px;
}

.clearLeft {
  clear: left;
}

.horizontalSplit {
  height: 1px;
  background-color: #ddd;
}

.basicInfo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.mainImage {
  padding-left: 10px;
  padding-right: 10px;
  float: left;
  width: 50%;
}

.tagDiv {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.hotelTag {
  margin: 1em;
}

.roomCard {
  display: flex;
  width: 100%;
  height: 150px
}

.roomPanel {
  border-right: 1px solid #dadfe6;
  flex: auto;
  max-width: 124px;
  width: 124px;
}

.roomName {
  width: 100px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #0f294d;
  padding: 6px 0;
}

.saleRoomList {
  width: 786px;
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.saleCardContainer {
  padding: 24px 0 24px 24px;
  margin-left: -1px;
  position: relative;
  height: 90px;
}

.saleCardFlex {
  display: flex;
}

.peopleBox {
  display: flex;
}

.saleCardPrice {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.price {
  line-height: 28px;
  color: red;
  font-size: 24px;
  display: inline-block;
  font-weight: 600;
}

.底部大块 {
  margin-top:50px;
  background-color:#003580;
  text-align:center;
  height:400px;
  display: flex;
  align-items: center;
  /* font-weight: 700; */
  /* line-height: 62px; */
}


</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      minprice: 0,
      inDate: '',
      outDate: '',
      destination: '',
      hotelDataList: [],
      orderDialog: {
        dialogVisible: false,
        formData: {
          roomCategoryId: 0,
          number: 0,
          startTime: '',
          endTime: ''
        }
      },
      commentVisible: false,
      commentDialog: {
        star: 5.0,
        myComment: ''
      },
      hotelInfo: {
        id: 0,
        name: '',
        location: '',
        picture: '',
        star: 0,
        phone: null,
        description: null,
        createTime: '',
        maxPeople: 0
      },
      // 校验规则有点问题，之后再改
      commentRules: {
        star: [
          //{ required: true, message: '请为酒店打分', trigger: 'blur' },
        ],
        comment: [
          //{ required: true, message: '评论不能为空', trigger: 'blur' },
        ]
      },
      hotelComments: [],
      commentNum: 0,
      page: 1
    }
  },
  methods: {

    gen_hot(id){
        let myseed = (id * 9301 * 9301 + 49297) % 233280;
        if (myseed/233280.0<0.5){
            return true;
        }
        else return false;
    },

    gen_discount(id){
        let myseed = (id * 9301 + 49297) % 233280;
        return (myseed/233280.0 * 5 + 5).toFixed(1);
    },

    gen_miss(id){
        let myseed = (id * 9301 * 9301 + 49297) % 233280;
        return ((myseed/233280.0).toFixed(3)*200).toFixed(0);
    },

    getHotelDetail() {
      axios.post('hotel/room/information/all', {
        hotelId: this.hotelId
      }).then(
          ({ data }) => {
            if (data.code === 200) {
              this.hotelDataList = data.data
              this.minprice = this.hotelDataList[0].price;
              for (let i = 0; i < this.hotelDataList; i++) {
                this.minprice = Math.min(this.minprice, this.hotelDataList[i].price);
              }
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

      axios.post('hotel/information', {
        hotelId: this.hotelId
      }).then(
          ({ data }) => {
            console.log(data.data)
            this.hotelInfo = data.data
          })

      axios.post('hotel/comment', {
        hotelId: this.hotelId,
        pageIndex: this.page - 1,
        pageSize: 4
      }).then(
          ({ data }) => {
            if (data.code === 200){
              this.hotelComments = data.data
              console.log(this.hotelComments.length)
            }
          }
      )

      axios.post('hotel/comment/totalNum', {
        hotelId: 6564
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            this.commentNum = data.data.commentNum
          }
      )
    },

    doSearch() {
      console.log(this.destination)
      console.log(this.inDate)
      console.log(this.outDate)
    },

    orderRoom(id, name) {
      this.orderDialog.name = name
      this.orderDialog.formData.roomCategoryId = id
      this.orderDialog.dialogVisible = true
    },

    // {
    // rootCategoryId: 0,
    // number: 0,
    // startTime: '',
    // endTime: ''

    onSubmit() {
      let form = this.orderDialog.formData
      console.log(form.startTime)
      console.log(form.endTime)
      axios.post('order/create', {
        roomCategoryId: form.roomCategoryId,
        number: form.number,
        startTime: form.startTime.toString(),
        endTime: form.endTime.toString()
      }, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            if (data.code === 200){
              this.$notify({
                title: '成功',
                message: data.msg,
                type: 'success',
                offset: 50
              })
              console.log(data.data)
              this.$router.push({
                path: 'ordercheck',
                query: {
                  orderid: data.data.orderId
                }
              })
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
    },

    addComment() {
      this.$refs["commentForm"].validate((valid) => {
        console.log(this.commentDialog.star)
        console.log(this.commentDialog.myComment)
        if (valid) {
          location.reload()
          this.commentVisible = false
        }
        else {
          return false
        }
        axios.post('user/comment/make', {
          hotelId: this.hotelId,
          comment: this.commentDialog.myComment,
          star: this.commentDialog.star
        }, {
          headers: {
            'token': localStorage.getItem('currentuser'),
            'Content-Type': 'application/json',
          }
        })
      })
    },

    prevClickHandler(page) {
      axios.post('hotel/comment', {
        hotelId: this.hotelId,
        pageIndex: page - 1,
        pageSize: 4
      }).then(
          ({ data }) => {
            if (data.code === 200){
              this.hotelComments = data.data
              console.log(this.hotelComments.length)
            }
          }
      )
    },

    nextClickHandler(page) {
      axios.post('hotel/comment', {
        hotelId: this.hotelId,
        pageIndex: page - 1,
        pageSize: 4
      }).then(
          ({ data }) => {
            if (data.code === 200){
              this.hotelComments = data.data
              console.log(this.hotelComments.length)
            }
          }
      )
    },

    currentChangeHandler(page) {
      axios.post('hotel/comment', {
        hotelId: this.hotelId,
        pageIndex: page - 1,
        pageSize: 4
      }).then(
          ({ data }) => {
            if (data.code === 200){
              this.hotelComments = data.data
              console.log(this.hotelComments.length)
            }
          }
      )
    }
  },
  created() {
    // console.log(this.$route.query.id)
    // console.log(this.$route.query)
    this.hotelId = this.$route.query.id
  },
  mounted() {
    this.getHotelDetail()
  }

}
</script>