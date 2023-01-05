<template>
  <div class="addContainer">
    <div style="min-width: 500px">
      <el-form :model="newHotel" label-width="80px">
        <el-form-item label="酒店名称">
          <el-input v-model="newHotel.hotelName"></el-input>
        </el-form-item>
        <el-form-item label="酒店位置">
          <el-input v-model="newHotel.hotelLocation"></el-input>
        </el-form-item>
        <el-form-item label="酒店星级">
          <el-rate style="line-height: 3" v-model="newHotel.hotelStar"></el-rate>
        </el-form-item>
        <el-form-item label="酒店描述">
          <el-input v-model="newHotel.hotelDescription"></el-input>
        </el-form-item>
        <el-form-item label="酒店图片">
          <el-upload
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="uploadPicture"
          >
            <el-popover
                title="预览"
                width="300"
                trigger="hover"
                v-if="newHotel.hotelPicture !== ''"
            >
              <el-image :src="newHotel.hotelPicture"></el-image>
              <div slot="reference">
                <i class="el-icon-document"></i>图片设置成功
              </div>
            </el-popover>
            <div v-else>
              <i class="el-icon-plus avatar-uploader-icon"></i>
              点此上传图片
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="uploadHotel">上传酒店</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.addContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      newHotel: {
        hotelName: '',
        hotelLocation: '',
        hotelPicture: '',
        hotelStar: '',
        hotelDescription: ''
      }
    }
  },

  methods: {
    // eslint-disable-next-line no-unused-vars
    uploadPicture(file, fileList) {
      this.newHotel.hotelPicture = URL.createObjectURL(file.raw)
    },

    uploadHotel() {
      axios.post('hotel/add', this.newHotel, {
        headers: {
          'token': localStorage.getItem('currentuser'),
          'Content-Type': 'application/json',
        }
      }).then(
          ({ data }) => {
            if (data.code === 200) {
              this.$notify.success({
                    title: '退出登陆成功',
                    message: "请重新登陆",
                    offset:50
                  })
            }
          }
      )
    }
  }
}
</script>
