<template>
  <div>
    <div style="height: 20px"></div>
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="所有点评">
        <div class="commentPages">
          <div v-for="(item, index) in userComments" :key="index">
            <el-card class="commentCard">
              <div slot="header">
                <div style="float: left;">
                  <el-avatar v-bind:src=item.avatar></el-avatar>
                </div>
                <div style="min-height: 35px; margin-top: 10px;">
                  <span style="margin-left: 10px;">
                    {{item.username}}
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
                发布于{{item.createTime.split('T')[0]}}
              </div>
              <h3>
                {{item.hotelName}}
              </h3>
              <div>
                {{item.comment}}
              </div>
            </el-card>
          </div>
          <el-pagination
              layout="prev,pager,next"
              v-bind:total="commentNum"
              :current-page.sync="page"
              @prev-click="prevClickHandler"
              @next-click="nextClickHandler"
              @current-change="currentChangeHandler"
              v-if="this.commentNum > 1"
          >

          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="住宿点评">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.commentCard /deep/ .el-card__header {
  padding: 5px 10px;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tabPosition: 'left',
      commentNum: 0,
      userComments: [],
      page: 0
    }
  },

  methods: {
    prevClickHandler(page) {
      this.page = page
      this.$router.push({
        query:{
          page: page
        }
      })
    },

    nextClickHandler(page) {
      this.page = page
      this.$router.push({
        query:{
          page: page
        }
      })
    },

    currentChangeHandler(page) {
      this.page = page
      this.$router.push({
        query:{
          page: page
        }
      })
    },

    getComment(page) {
      axios.post('user/comment', {
        pageIndex: page - 1,
        commentNum: 5,
      },
          {
            headers: {
              'token': localStorage.getItem('currentuser'),
              'Content-Type': 'application/json',
            }
          }
      ).then(
          ({ data }) => {
            if (data.code === 200) {
              this.userComments = data.data
            }
            else {
              this.$notify({
              })
            }
          }
      )
    }
  },

  created() {
    if (this.$route.query.page === undefined) {
      this.page = 1
      this.$router.push({
        query: {
          page: this.page
        }
      })
    }
    let init = async () => {
      await axios.post('user/comment/totalNum', {}, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            this.commentNum = data.data.commentNum
          }
      )
      this.getComment(this.page)
    }
    init()
  },
  watch: {
    'page': 'getComment'
  }
}
</script>
