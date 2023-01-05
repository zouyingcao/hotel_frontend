<template>
    <div>
        <Navbar ref="nav_ins" />
        <div class="主页" style="zoom: 90%">
            <div class="左侧菜单">
                <div class="价格区间">
                    <div class="标题">
                        <h3>星级选择</h3>
                    </div>
                    <div class='hr'></div>
                    <div class="价格区间按钮">
                        <el-slider v-model="StarRange" range :max="maxbar"></el-slider>
                        <el-input v-model="StarRange[0]" placeholder="请输入内容" class="range1"></el-input>
                        <el-input v-model="StarRange[1]" placeholder="请输入内容" class="range2"></el-input>
                    </div>
                </div>
                <div class="商品Tag">
                    <div class="标题">
                        <h3>推荐 Tag</h3>
                        <div class='hr'></div>
                        <div class="Tags">
                            <el-tag v-for="(tag,index) in dynamicTags" :key="index" 
                                closable :disable-transitions="false" 
                                @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="inputVisible" 
                                v-model="inputValue" ref="saveTagInput" size="small" 
                                @keyup.enter.native="handleInputConfirm" 
                                @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+新标签</el-button>
                        </div>
                    </div>
                </div>
                <div class="商品类别">
                    <div class="标题">
                        <h3>酒店类别偏好</h3>
                        <div class='hr'></div>
                        <el-checkbox-group v-model="checklist" class="checkbox">
                            <p><el-checkbox label="商务酒店"></el-checkbox></p>
                            <p><el-checkbox label="都市佳侣"></el-checkbox></p>
                            <p><el-checkbox label="舒适公寓"></el-checkbox></p>
                            <p><el-checkbox label="豪华度假村"></el-checkbox></p>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="筛选搜索">
                    <el-button type="warning" round @click="updateproducts(1)">重新筛选</el-button>
                </div>
                <div class="推荐商品" :v-if="cardloading">
                    <div class="标题">
                        <h3>猜你喜欢</h3>
                    </div>
                    <div class='hr'></div>
                    <el-card shadow="hover" class="商品格" v-for="(value,index) in 酒店推荐列表" :key="index" :v-if="cardloading">
                        <div class="商品图片格" @click="toshop(value.id)">
                            <el-image :src="value.picture" fit="none"></el-image>
                        </div>
                        <div class="商品价格" style="color: red;">¥{{value.price.toFixed(2)}}起</div>
                        <div class="商品标题">【精品推荐】{{value.name}}</div>
                    </el-card>
                </div>
            </div>
            <div class="右侧商品栏" v-loading="cardloading">
                <div class="顶部排序栏">
                    <el-button icon="el-icon-bottom" type="primary" plain @click="updateproducts(1)">综合</el-button>
                    <el-button icon="el-icon-sort" type="primary" plain @click="updateproducts(1)">销量</el-button>
                    <el-button icon="el-icon-sort" type="primary" plain @click="updateproducts(1)">价格</el-button>
                    <el-button icon="el-icon-sort" type="primary" plain @click="updateproducts(1)">评分</el-button>
                    <span class="top-page">
                        <el-button type="primary" v-if="currentPage!=1" icon="el-icon-arrow-left" @click="tolastpage">上一页</el-button>
                        <el-button type="primary" v-if="currentPage*PageNum<searchHits" @click="tonextpage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                    </span>
                </div>
                <div class="商品栏">
                    <el-card shadow="hover" class="商品格" v-for="(value,index) in 酒店列表" :key="index">
                        <div class="商品图片格" @click="toshop(value.id)">
                            <el-image :src="value.picture" fit="cover" style="height:250px"></el-image>
                        </div>
                        <div class="销量和价格">
                            <div class="商品价格">¥{{value.price.toFixed(2)}}起</div>
                            <div class="商品销量" style="text-align:right">舒适 | 商务 | 旅计划</div>
                        </div>
                        <div class="商品标题">
                            {{value.name}}
                        </div>
                        <div class="按钮栏">
                            <el-button type="warning" @click="addToCart(value.id)">收藏酒店</el-button>
                            <el-button type="primary" @click="toshop(value.id)">立刻预定</el-button>
                        </div>
                        <div class="小标签" style="margin-top: 15px; justify-content:space-between;display:flex;flex-direction:row;flex-wrap: wrap;">
                            <el-tag effect="plain" type="danger">特惠{{gen_discount(value.id)}}折</el-tag>
                            <el-tag type="danger" v-if="gen_hot(value.id)">当季热门</el-tag>
                            <el-tag effect="warning" type="info" v-if="!gen_hot(value.id)">河马推荐</el-tag>
                            <el-tag effect="plain" type="danger">新客立减{{gen_miss(value.id)}}元</el-tag>
                        </div>
                    </el-card>
                 </div>
                 <div class="分页栏">
                     <el-pagination
                        background
                        layout="prev, pager, next, jumper"
                        :page-size="PageNum"
                        :current-page.sync="currentPage"
                        :total="searchHits"
                        @current-change="pagechange">
                    </el-pagination>
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
import Navbar from './Navbar.vue'
export default {
    data (){
        return {
            cardloading:true,
            searchHits:0,
            // currentorder:0,
            currentPage:1,
            maxbar:5,
            PageSearch:'',
            PageNum:12,
            TotalPage:10,
            酒店列表:[],
            酒店推荐列表:[],
            StarRange:[0,5],
            dynamicTags: ['热门点击', '限时秒杀','每日精品推荐','折扣返利','盒马精选'],
            inputVisible: false,
            inputValue: '',
            checklist:['商务酒店','舒适公寓','豪华度假村','都市佳侣']
        }
    },
    components:{
        Navbar
    },
    methods:{
        gen_hot(id){
            var myseed = (id * 9301 * 9301 + 49297) % 233280;
            if (myseed/233280.0<0.5){
                return true;
            }
            else return false;
        },
        gen_discount(id){
            var myseed = (id * 9301 + 49297) % 233280;
            return (myseed/233280.0 * 5 + 5).toFixed(1);
        },
        gen_miss(id){
            var myseed = (id * 9301 * 9301 + 49297) % 233280;
            return ((myseed/233280.0).toFixed(3)*200).toFixed(0);
        },
        toshop (id) {
            this.$router.push({ path: '/hoteldetail', query: { id: id } })
        },
        tolastpage(){
            this.currentPage--;
            this.pagechange()
        },
        tonextpage(){
            this.currentPage++;
            this.pagechange()
        },
        pagechange(){
            this.updateproducts(this.currentPage);
        },
        getorderrank(id){
            this.orderrank[id]=!this.orderrank[id];
            return this.orderrank[id]+1;
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        updateproducts(page){
            this.cardloading=true
            axios.post("hotel/search", 
            {
                'searchKeyWord': this.PageSearch, 
                'pageNum': this.PageNum,
                // 'sort': sort,
                // 'order': order,
                'page': page-1,
                'lowerStar' : this.StarRange[0],
                'upperStar' : this.StarRange[1],
            }
            ).then(res => {
                this.酒店列表=res.data.data.hotels;
                this.searchHits=res.data.data.totalNumber;
                this.cardloading=false;
            })
        },
        updaterecommend(num){
            var goodslist=[];
            axios.post("hotel/recommend", {'num': num}).then(res => {
                console.log(res.data.data.hotels);
                this.酒店推荐列表=res.data.data.hotels;
            })
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
                    title: '无法操作',
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
    },
    created(){
        this.PageSearch=this.$route.query.productname;
    },
    mounted(){
        this.$refs.nav_ins.searchName = this.PageSearch
        this.updateproducts(1);
        this.updaterecommend(4);
    }
}
</script>

<style scoped>
    .销量和价格{
        width: 100%;
    }
    .top-page{
        float: right;
        /* margin: 5px; */
    }
    .分页栏{
        padding: 30px;
    }
    .价格区间按钮{
        margin: auto;
        width: 87%;
    }
    .筛选搜索{
        width: 80%;
        text-align: right;
    }
    .message-override {
        z-index: 9999999;
    }
    .顶部排序栏{
        padding: 10px;
        text-align: left;
        line-height: 50px;
        background-color: #f1f1f1;
        height: 50px;
        width: 95%;
    }
    .checkbox p{
        height: 20px;
        font-size: 20px;
    }
    .Tags{
        margin-top: 10px;
    }
    .el-tag {
        margin: 5px;
    }
    .button-new-tag {
        margin: 5px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin: 5px;
        vertical-align: bottom;
    }
    .价格区间 {
        height: 150px;
    }
    .价格区间 .range1{
        width: 30%;
        float:left;
    }
    .价格区间 .range2{
        width: 30%;
        float:right;
    }
    .el-slider{
        margin-top: 10px;
    }
    .推荐商品{
        margin-top: 70px;
    }
    .价格区间,.商品类别,.推荐商品{
        width: 80%;
    }
    .商品Tag{
        width: 90%;
    }
    .标题{
        text-align: left;
    }
    .hr {
        height: 1px;
        background-color: #ddd;
        width: 270px;
    }
    .左侧菜单{
        
        margin-left: 5%;
        float:left;
        width: 22%;
        display:inline;
    }
    .右侧商品栏{
        margin-top: 20px;
        float:left;
        width: 67%;
        display:inline
    }
    .商品栏{
        justify-content:space-between;
        border: 10px solid #f9f9f9;
        /* height: 1000px; */
        width: 95%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        /* display: flex;
        flex-direction: column;
        align-items: center; */
    }
    .推荐商品 .商品格{
        /* margin: 15px; */
        height: 300px;
        width: 300px;
    }

    .商品栏 .商品格{
        /* margin: 15px; */
        height: 500px;
        width: 320px;
    }
    .商品栏 .商品格 .商品价格{
        float: left;
        width: 50%;
        margin-top: 15px;
        line-height: 30px;
        font-size: 20px;
        color: red;
        text-indent: 10px;
        text-align: left;
        height: 30px;
    }
    .商品栏 .商品格 .商品销量{
        width: 50%;
        float: right;
        line-height: 30px;
        margin-top: 15px;
        font-size: 15px;
        color: #7d8086;
        text-align: left;
        height: 30px;
    }
    .商品栏 .商品格 .商品标题{
        font-weight: bold;
        width: 100%;
        height: 30px;
        overflow-y: scroll;
        display: block;
        padding: 10px;
        margin-bottom: 15px;
        font-size: 15px;
        text-align: left;
    }
    .商品栏 .商品格 .商品图片格{
        display :flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        /* height: 250px; */
        padding: 2px;
        border: 2px solid #f5f5f5;
    }
    .商品栏 .商品格 .计数器{
        height: 45px;
    }

    .商品栏 .商品格 .按钮栏{
        text-align: center;
    }
</style>