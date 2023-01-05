<template>
<div class="页面">
    <Navbar ref="nav_ins"></Navbar>
    <div id="商品详情页">
        <div id="商品信息">
            <div id="商品抬头"><h1>{{category_first}}</h1></div>
        </div>
        <div class="商品详情">
            <el-card style="height: 100px; width: 1200px; margin: auto; margin-top: 50px;">

            </el-card>



        </div>
        <div id="其他信息容器">
         <div id="其他信息">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="商品描述" name="first"><p>{{this.name}}</p></el-tab-pane>
                    <el-tab-pane label="其他信息" name="second">
                        <p>商品总库存 ：{{stock}}<br>
                        商品销量 ：{{saleamount}}<br>
                        </p>
                    </el-tab-pane>
                    <el-tab-pane label="评论" name="third">
                        <div id="评论区">
                            <div :v-if="comment.length!=0" v-for="(o, index) in comment" :key="index" id="单条评论">
                                <div id="评论用户" :v-if="comment.length!=0">
                                    <div id="评论用户头像">
                                        <img :src="comment[index].userAvatar" width="120px" height="120px">
                                    </div>
                                    <div id="评论用户名">
                                        <p>{{comment[index].username}}</p>
                                    </div>
                                </div>
                                <div id="评论内容" :v-if="comment.length!=0">
                                    <div id="评论星数">
                                        <el-rate
                                        v-model="comment[index].star"
                                        disabled
                                        :icon-classes="iconClasses"
                                        void-icon-class="icon-rate-face-off"
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                                        </el-rate>
                                    </div>
                                    <div id="评论文字" class='fuck'>
                                        {{comment[index].comment}}
                                    </div>
                                    <div id="评论时间" class='fuck'>
                                        {{comment[index].createTime}}
                                    </div>
                                </div>
                            </div>
                            <div id="写评论">
                                <div id="写评论用户">
                                    <div id="写评论用户头像">
                                        <img v-if="nowuser.avatar" :src="nowuser.avatar" width="120px" height="120px">
                                    </div>
                                    <div id="写评论用户名">
                                        <p>{{nowuser.name}}</p>
                                    </div>
                                </div>
                                <div id="写评论内容">
                                    <div id="写评论星数">
                                        <el-rate
                                            v-model="nowuser.star"
                                            :icon-classes="iconClasses"
                                            void-icon-class="icon-rate-face-off"
                                            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                                        </el-rate>
                                    </div>
                                    <div id="写评论文字">
                                       <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 3, maxRows: 3}"
                                            placeholder="请输入评论内容"
                                            v-model="nowuser.comment">
                                        </el-input>
                                    </div>
                                    <div id="发表评论">
                                        <el-button type="primary" @click="submitclick()">发表评论</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div id="相关商品">
            <div id="相关商品标题">
                <div id="标题栏">
                    <p style="font-size:30px"> 相 关 商 品 </p>
                </div>
            </div>
            <div id="相关商品展示区">
                 <div id="单个商品块" v-for="(o,  index ) in products" :key="index">
                    <div id="单个商品图片">
                        <a href="javascript:void(0);" @click="toshop(o.id)">
                            <img :src="o.pictureUrl"  width="150px" height="150px">
                        </a>
                    </div>
                    <div id="单个商品名称">
                        <a href="javascript:void(0);" @click="toshop(o.id)">
                            <p>{{o.name}}</p>
                        </a>
                    </div>
                    <div id="单个商品价格">
                        <a href="javascript:void(0);" @click="toshop(o.id)">
                            <p>
                                ￥{{o.price}}
                            </p>
                        </a>
                        <div id="销量">
                        <p >销量 :{{o.sales_amount}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
#评论内容 > div{
    font-weight: bold;
    margin: 20px;
}
#写评论内容 > div{
    font-weight: bold;
    margin-top: 20px;
}
.三图{
    margin-top: 50px;
}
.疫情相关{
    color: red;
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 16px;
    text-align: left;
}
#商品介绍{
    text-align: left;
    font-weight: bold;
}
.内容标题{
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
    margin-left: 30px;
}
a{
    text-decoration:none;
    color: black;
}
.计数器{
    margin-top: 10px;
}
.页面{
    margin-left: -10px;
}
/* -----------------------评论区------------- */
#评论区{
}
#单条评论, #写评论{
    display: flex;
    flex-direction: row;
    width: 960px;
    border-bottom-style: solid ;
    margin-top: 30px;
    border-bottom-color: rgb(214, 212, 212);
    border-bottom-width: 1px;
    border-collapse:collapse
}
#评论用户 ,#写评论用户{
    width: 200px;
    height: 180px;
}
#评论用户头像, #写评论用户头像{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
#写评论用户名 p ,#评论用户名 p{
    font-size: 25px;
    text-align: center;
}
#写评论 .el-textarea
{
    width: 760px!important;
}
#评论内容{
    text-align: left;
}
#写评论内容{
    text-align: left;
    height: 250px;
}
#商品抬头{
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("../img/inner-bg.jpg");
    background-size: 100%;
    background-position: top 50px left 0px;
    /* background-size: cover; */
    background-attachment: fixed;
}
#商品抬头 h1{
    color: white;
    font-size: 40px;
}
#头部{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#商品详情{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
#商品详情容器{
    width: 1200px;
    display: flex;
    flex-direction: row;
    padding-top: 70px;

}
#图片展示区{
    height: 625px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
#商品详情栏{
    width: 700px;
    height: 625px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 20px;
}
#商品名称{
    width: 290px;
    height: 100px;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#商品名称 p{
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 15px;
}
#商品价格{
    width: 290px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#商品价格 p{

    text-align: left;
    color: red;
    font-weight: bold;
    font-size: 30px;
}
.fuck{
    margin-left: 50px;
}
#商品介绍{
    height: 100px;
}
#商品详情栏下部容器{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 700px;
}
#购买数量{
    margin-left: 30px;
    font-size: 20px;
    font-weight: bold;
}
#计数器{
    width: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
}
#加入购物车{
    width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.el-card__body{
    padding: 0px!important;
    display: flex;
    flex-direction: row;
}
#商品详情栏下部{
    width: 650px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
#缩略图片1, #缩略图片2, #缩略图片3, #缩略图片4{
    width: 142px;
    padding-left: 2px;
    padding-right: 2px;
    height: 105px;
}
#缩略图片区{
    display: flex;
    flex-direction: row;
    padding-top: 5px;
}
#大图1, #大图2, #大图3, #大图4{
    display: none;
}
#大图1 {
    display: block;
}

#缩略图片区 button{
    opacity: 0;
}

#其他信息
{
    width: 1200px;
    padding-top: 20px;
    border-style: solid;
    border-color: rgb(223, 220, 220);
    margin-top: 70px;
    border-width: 1px;
}
#其他信息容器{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
#标题栏{
    background: url('https://static.360buyimg.com/mtd/pc/fresh_v3/1.0.0/home/images/fresh_mod_head_bg.png');
      height:200px;
      background-repeat: no-repeat;
      background-position:50% 50% ;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 1200px;
}
#标题栏 p{
    margin-bottom: 30px;
}
#相关商品展示区{
    height: 280px;
    width: 1200px;
    border-style: solid;
    margin-bottom: 100px;
    display: flex;
    flex-direction: row;
}
#相关商品{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#块{
    margin:20px;
    display: flex;
    flex-direction: row;
}
#块 #文字{
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: gray;
    padding-left: 5px;
}
#三图标{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
#其他信息{
    padding-left: 30px;
}
img{
    object-fit: cover;
}
#图片展示区 img{
     border-style:solid;
    border-width: 2px;
    border-color: rgb(223, 220, 220);
}
#商品介绍 div{
    font-size: 24px;
}

#单个商品块{
    width: 200px;
    height: 280px;
    display: flex;
    flex-direction: column;
}
#单个商品图片{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 12px;
}
#单个商品名称 p{
    padding-left: 20px;
    padding-right: 20px;
    height: 50px;
    overflow: hidden;
    line-height: 25px;
    font-size: 15px;
    margin-bottom: 0px;
}
#单个商品价格 p{
    font-size: 20px;
    color: orange;
    padding-left: 20px;
    padding-right: 20px;
}
#单个商品价格{
    display: flex;
    flex-direction: row;
    align-items: center;
}
#销量 p{
    color: #5e5f61!important;
    font-size: 13px;
}
</style>

<script>
const axios = require('axios');
import Navbar from './Navbar.vue'
export default {
  data () {
    return {
        iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],  
        num: 1,
        productnum:1,
        activeName: 'first',
        id: 3,
        name: '',
        price: '',
        picture: ['', '', '', ''],
        status: '',
        stock: '',
        saleamount: '',
        details: '',
        originplace: '',
        category_first: '',
        pictureOne: '',
        pictureTwo: '',
        pictureThree: '',
        pictureFour: '',
        products: [],
        comment: [],
        购物车列表: [],
        nowuser: {
            name: '',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            comment: '',
            star: null
        },
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  components: {
      Navbar
  },
  created () {},
  methods: {}
}

</script>
