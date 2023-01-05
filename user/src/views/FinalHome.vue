<template>
    <div class="页面">
        <div class="头部">
            <Navbar ref="nav_ins"></Navbar>
        </div>
        <div style="background-color: #003580;" class="顶部大块">
          <div class="一级标题">
              <span>河马酒店，竭心伴你，舒适旅行</span>
          </div>
          <div class="二级标题">
              <span>为你的旅行获取礼遇 - 使用免费的hemahotel.xyz帐号，即刻解锁至少10%的优惠</span>
          </div>
          <div class="按钮所在行">
            <el-button class="按钮" type="primary" @click="gotologin">立刻登录/注册</el-button>
          </div>
        </div>
        <div class="页面正文">
          <el-backtop style="height:70px;width:70px;font-size:30px;box-shadow:0 0 6px rgba(0,0,0,0.5);"></el-backtop>
          <div>
            <div class="子标题">热门城市或地区: 优惠订购</div>
              <el-carousel :interval="4000" type="card" height="250px" style="/* margin-left:-130px */">
              <el-carousel-item v-for="(item,index) in cata2" :key="index">
                <div class="图片框" style="text-align:center" @click="tolists(item.name)">
                  <div style="font-size:30px; font-weight: bold; color: red">🔥{{item.name}}</div>
                  <el-image 
                  style="width:500px; height:200px"
                  :src="require('../img/城市/'+item.name+'.jpg')" fit="cover"></el-image>
                </div>
              </el-carousel-item>
            </el-carousel>

          </div>
          <div class="住宿类型栏目">
            <div class="子标题">多种住宿类型: 任你挑选</div>
            <div class="住宿类型">
              <el-card shadow="hover" class="种类格" v-for="(item,index) in cata1" :key="index">
                <div class="图片框" style="text-align:center">
                  <el-image 
                  style="width:225px; height:225px"
                  :src="require('../img/'+item.name+'.jpg')" fit="cover" @click="tolists(item.name)"></el-image>
                </div>
                <div style="font-size:20px;margin-top:10px;font-weight: bold;">
                  {{item.name}}
                </div>
                <div style="color: #909090;">
                  共有{{item.num}}家{{item.name}}
                </div>
              </el-card>
            </div>
          </div>
          
          <div class="商品推荐">
            <div class="子标题">客人喜爱的旅行住处</div>
              <div class="推荐商品">
                <el-card shadow="hover" class="商品格" v-for="(value,index) in 酒店列表" :key="index">
                    <!-- <el-skeleton :loading="recommend_loading" animated>
                      <template slot="template">
                        <div class="商品图片格">
                          <el-skeleton-item variant="image" style="width: 250px; height: 250px;"/>
                        </div>
                        <el-skeleton :rows="4" animated />
                      </template>
                    </el-skeleton> -->
                    <div class="商品图片格">
                      <el-image :src="value.picture" style="width:280px; height:250px" fit="cover" @click="toshop(value.id)"></el-image>
                    </div>
                    <div class="销量和价格">
                        <div class="商品价格">¥{{value.price.toFixed(2)}}</div>
                    </div>
                    <div class="商品标题">
                        {{value.name}}
                    </div>
                    <div class="按钮栏">
                        <el-button type="warning" @click="addToCart(value.id)">收藏酒店</el-button>
                        <el-button type="primary" @click="toshop(value.id)">立刻预定</el-button>
                    </div>
                  </el-card>     
              </div>
            </div>
          <div class="城市选择">
            <div class="子标题">更多目的地选择</div>
            <div style="width:1080px; margin: 0 auto">
              <el-tabs type="border-card">
                <el-tab-pane label="省份与直辖市">
                  <div shadow="hover" class="tab格" style="padding:0"
                  v-for="(value,index) in cata4" 
                  :key="index">
                      <div style="font-weight: bold">{{value.name}}</div>
                      <div style="color: gray">共{{value.num}}处住宿</div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="区域">
                  <div shadow="hover" class="tab格" style="padding:0"
                  v-for="(value,index) in cata5" 
                  :key="index">
                      <div style="font-weight: bold">{{value.name}}</div>
                      <div style="color: gray">共{{value.num}}处住宿</div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="周边地标/景点">
                  <div shadow="hover" class="tab格" style="padding:0"
                  v-for="(value,index) in cata6" 
                  :key="index">
                      <div style="font-weight: bold">{{value.name}}</div>
                      <div style="color: gray">共{{value.num}}处住宿</div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
        <div class="底部大块">
          <video autoplay="autoplay" loop style="width: 1200px; margin: auto; border-radius: 15px" @click="tolists('酒店')">
            <source src="../video/bottom.mp4" type="video/mp4" />
          </video>
        </div>
    </div>
</template>

<style scoped>

.tab格{
  float: left;
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
  width: 185px;
  /* background-color: rgba(147, 156, 164, 0.05); */
}

.商品格{
  margin: 3px;
  width: 350px;
  background-color: rgba(147, 156, 164, 0.1);
}
.推荐商品{
  /* height: 700px; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.住宿类型{
  /* height: 700px; */
  /* width: 1200px; */
  display: flex;
  flex: auto;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.种类格{
  margin: 3px;
  width: 270px;
}
.页面正文{
  margin: 0 auto;
  max-width: 1170px;
}
.子标题 {
  margin-top: 20px;
  margin-left: -50px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 30px;
}

.顶部大块{
  height: 350px;
  text-align: left;
  /* font-weight: 700; */
  /* line-height: 62px; */
}

.底部大块{
  margin-top:50px;
  background-color:#003580;
  text-align:center;
  height:400px;
  display: flex;
  align-items: center;
  /* font-weight: 700; */
  /* line-height: 62px; */
}

.一级标题{
  color: #ffffff;
  font-weight: bold;
  font-size: 50px;
  padding-top: 50px;
  margin: auto 10%;
}

.二级标题{
  color: #ffffff;
  font-size: 25px;
  margin: auto 10%;
}

.按钮所在行{
  margin-top: 100px;
  margin-left: 10%;
}

.商品价格{
    float: left;
    width: 30%;
    margin-top: 15px;
    line-height: 30px;
    font-size: 20px;
    color: red;
    text-indent: 10px;
    text-align: left;
    height: 30px;
}
.商品销量{
    width: 30%;
    float: right;
    line-height: 30px;
    margin-top: 15px;
    font-size: 15px;
    color: #5f6062;
    text-align: left;
    height: 30px;
}
.商品标题{
    width: 100%;
    height: 30px;
    overflow-y: scroll;
    display: block;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 15px;
    text-align: left;
}
.商品图片格{
    display :flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 250px;
    border: 2px solid #f5f5f5;
}
.计数器{
    height: 45px;
    text-align: center;
}

.按钮栏{
    text-align: center;
}


</style>

<script>
const axios = require('axios');
/* import App from '../App.vue' */
import Navbar from './Navbar.vue'
import Header from './Header.vue'
// import Bottom from './Bottom.vue'
export default {
  components: {
    Navbar,
    Header,
    // Bottom
  },
  created () {
    this.recommend_loading=true;
    axios.post('hotel/recommend', 
      {'num': 6}).then(res => {
        console.log(res.data.data.hotels);
        this.酒店列表=res.data.data.hotels;
        console.log(this.酒店列表)
    })
    this.recommend_loading=false;
  },
  data () {
    return {
      recommend_loading: true,
      酒店列表:[

      ],
      cata1:[
        {name:"酒店", num:1223},
        {name:"公寓", num:987},
        {name:"风情木屋", num:67},
        {name:"度假村", num:8752},
        {name:"别墅", num:1062},
        {name:"公寓式酒店", num:7647},
        {name:"日式旅馆", num:78},
        {name:"豪华帐篷", num:123},
      ],
      cata2:[
        {name:'苏州'},
        {name:'上海'},
        {name:'南京'},
        {name:'广东'},
        {name:'北京'}
      ],
      cata5:[
        {name:'华东地区',num:86582542},
        {name:'东北地区',num:114523},
        {name:'华中地区',num:12134509},
        {name:'华北地区',num:102120},
        {name:'华南地区',num:962030},
        {name:'西南地区',num:86500},
        {name:'东北地区',num:752352},
        {name:'西北地区',num:202},
      ],
      cata4:[
        {name:'河北省',num:256073},
        {name:'山西省',num:916245},
        {name:'辽宁省',num:290006},
        {name:'吉林省',num:38829},
        {name:'黑龙江省',num:742925},
        {name:'江苏省',num:770620},
        {name:'浙江省',num:477640},
        {name:'安徽省',num:108411},
        {name:'福建省',num:6188},
        {name:'江西省',num:581094},
        {name:'山东省',num:826977},
        {name:'河南省',num:343757},
        {name:'湖北省',num:640725},
        {name:'湖南省',num:17593},
        {name:'广东省',num:490575},
        {name:'海南省',num:979135},
        {name:'四川省',num:763320},
        {name:'贵州省',num:450692},
        {name:'云南省',num:779214},
        {name:'陕西省',num:150990},
        {name:'甘肃省',num:307669},
        {name:'青海省',num:4104},
        {name:'台湾省',num:834596},
      ],
      cata6:[
        {name:'四面佛',num:20},
        {name:'新关仔角',num:47},
        {name:'南京金鹰购物中心',num:72},
        {name:'浅水湾',num:96},
        {name:'公主港',num:73},
        {name:'逢甲夜市',num:61},
        {name:'第一世界广场',num:44},
        {name:'苏州乐高乐园',num:9},
        {name:'北投温泉',num:75},
        {name:'香港迪士尼乐园',num:73},
        {name:'上下九步行街',num:4},
        {name:'双威水上乐园',num:50},
        {name:'上海迪士尼乐园',num:11},
        {name:'奥兰多迪士尼乐园',num:69},
        {name:'台中火车站',num:56},
      ]
    }
  },
  function: {},
  methods: {
    gotologin(){
      this.$router.push('/login')
    },
    tolists(name){
      console.log('fuck');
      this.$router.push({ path: '/goodslist', query: { productname: name} })
      location.reload();
    },
    toshop (id) {
        this.$router.push({ path: '/hoteldetail', query: { id: id } })
    },
    addToCart(productid){
      this.$refs.nav_ins.cart_local2vue();
      var finditem=0;
      for (var i=0;i<this.$refs.nav_ins.收藏列表.length;i++){//收藏的第几行
          if (this.$refs.nav_ins.收藏列表[i].id===productid){
              finditem=1;
              break;
          }
      }
      if (!finditem){
          this.$notify({
              title: '添加成功',
              message: '已将酒店添加至收藏夹',
              type: 'success',
              position: 'top-left',
              offset: 60
          })
          for (var i=0;i<this.酒店列表.length;i++){
              if (this.酒店列表[i].id===productid){
                  var pushitem={
                      "id": this.酒店列表[i].id,
                      "picture": this.酒店列表[i].picture,
                      "name" :this.酒店列表[i].name,
                      "star": this.酒店列表[i].star,
                  }
                  this.$refs.nav_ins.收藏列表.push(pushitem);
                  break;
              }
          }
      }
      else {
          this.$notify({
              title: '提示',
              message: '此酒店已在您的收藏夹中，请勿重复添加',
              type: 'warning',
              position: 'top-left',
              offset: 60
          })
      }
      localStorage.tempcart=JSON.stringify(this.$refs.nav_ins.收藏列表);//更新本次缓存
      this.$refs.nav_ins.cart_vue2local();//操作完成，vue数据存在local中
      this.$refs.nav_ins.cart_local2vue();//再次同步
    },
  }
}
</script>
