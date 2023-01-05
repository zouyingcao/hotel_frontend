<template>
    <div class="顶部集合">
        <div class="导航栏">
            <div class="logo">
                <img src="../img/logo.png" alt="Logo">
            </div>
            <div class="search">
                <div style="margin-top: 15px">
                    <el-autocomplete v-model="searchName" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect">
                        <el-select v-model="select" slot="prepend" placeholder="推荐类别(可选)">
                            <el-option label="商务酒店" value="1"></el-option>
                            <el-option label="舒适公寓" value="2"></el-option>
                            <el-option label="豪华度假村" value="3"></el-option>
                            <el-option label="完美别墅" value="4"></el-option>
                            <el-option label="惬意木屋" value="4"></el-option>
                            <el-option label="乡村别墅" value="4"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" type="success" @click="searchitem"></el-button>
                    </el-autocomplete>
                </div>
            </div>
            <div class="收藏">
                <div class="收藏按钮">
                    <el-button icon="el-icon-goods">我的收藏夹</el-button>
                    <p class="redtip" v-if="cartnum">{{cartnum}}</p>
                    <el-card class="收藏展开列表">
                        <div class="收藏标题" style="padding-bottom:10px">
                            <strong>最近添加的酒店</strong>
                        </div>
                        <div class="收藏列表内容">
                            <el-table :data="收藏列表">
                                <el-table-column label="酒店图片" header-align=center align="center" width="90px">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.picture" alt="酒店图片" style="width: 100%" @click="toshop(scope.row.id)">
                                    </template>
                                </el-table-column>
                                <el-table-column label="名称" header-align=center prop="name" width="200px">
                                </el-table-column>
                                <el-table-column label="星级" header-align=center align="center" width="80px">
                                    <template slot-scope="scope">
                                        {{scope.row.star}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" header-align=center align="center" width="80px">
                                    <template slot-scope="scope">
                                        <el-button type="danger" @click.native="delete_cart_item(scope.row.id)">删除</el-button>
                                    </template>
                                </el-table-column>
                                
                            </el-table>
                        </div>
                        <!-- <div class="结算按钮栏">
                            <el-button type="primary" @click.native="jumpcart">去收藏结算</el-button>
                        </div> -->
                    </el-card>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
const axios = require('axios');
export default{
  methods:{
        toshop (id) {
            console.log('fuck')
            this.$router.push({ path: '/hoteldetail', query: { id: id } })
        },
        delete_cart_item(productid){
            this.$notify({
                title: '删除成功',
                message: '已将酒店从收藏夹中移除',
                type: 'success',
                position: 'top-left',
                offset: 60
            })
            this.cart_local2vue();//开始操作
            for (var i=0;i<this.收藏列表.length;i++){//收藏的第几行
                if (this.收藏列表[i].id===productid){
                    this.收藏列表.splice(i,1);
                    break;
                }
            }
            this.cart_vue2local();//操作完成
            this.cart_local2vue();//重新同步
        },
        searchitem(){ 
            this.$router.push({ path: '/goodslist', query: { productname: this.searchName} })
            location.reload();
        },
        querySearchAsync(queryString, cb) {
            axios.post('hotel/name/completion', {
                    "hotel_name_prefix": queryString
                },{
                headers: {
                    'Content-Type': 'application/json',
                }
                }).then(res => {
                console.log(res.data.code);
                if (res.data.code == 200) {
                    var names=[];
                    console.log(res.data.data.suggestions.length);
                    for (var i=0;i<res.data.data.suggestions.length;i++){
                        names[i]={};
                        names[i].value=res.data.data.suggestions[i];
                    }
                    console.log(names)
                    cb(names);
                }
            })
        },
        handleSelect(item) {
            console.log(this.searchName, item);
            this.searchitem();
            // alert(this.searchName);
        },
        jumpcart(){
            this.$router.push({path:'/cart'})
        },
        navtest(){
            alert('Nav is called')
        },
        cart_local2vue(){
            var tempcart=JSON.parse(localStorage.getItem('tempcart'));
            this.收藏列表=tempcart;
            this.cartnum=tempcart.length;
        },
        cart_vue2local(){
            localStorage.tempcart=JSON.stringify(this.收藏列表);
        }
  },
  data (){
      return {
          searchName: '',
          cartnum:0,
          收藏列表:[],
          select: ''
      }
  },
  created(){
    if (!localStorage.hasOwnProperty('tempcart')) 
        localStorage.tempcart=JSON.stringify([]);
    else
        this.cart_local2vue();//获取本地收藏数据
  }
}
</script>
<style scoped>
    .顶部集合{
        width: 1300px;
        margin: auto;
    }
    .redtip {
        position: absolute;
        top: 2px;
        right: -8px;
        min-width: 8px;
        height: 20px;
        line-height: 20px;
        margin-top: -11px;
        padding: 0 6px;
        font-weight: normal;
        color: white;
        text-align: center;
        text-shadow: 0 1px rgba(0, 0, 0, 0.2);
        background: #e23442;
        border: 1px solid #911f28;
        border-radius: 11px;
        background-image: -webkit-linear-gradient(top, #e8616c, #dd202f);
        background-image: -moz-linear-gradient(top, #e8616c, #dd202f);
        background-image: -o-linear-gradient(top, #e8616c, #dd202f);
        background-image: linear-gradient(to bottom, #e8616c, #dd202f);
        -webkit-box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px rgba(0, 0, 0, 0.12);
        box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px rgba(0, 0, 0, 0.12);
    }


    .导航栏 .el-autocomplete {
        width: 80%;
    }

    .el-select{
        width: 150px
    }

    .导航栏 {
        height: 80px;
    }

    .logo {
        width: 20%;
        float: left;
    }

    .logo img {
        height: 60px
    }

    .search {
        float: left;
        width: 60%;
        height: 100%;
    }

    .收藏 {
        float: left;
        width: 200px;
        height: 100%;
    }

    .收藏按钮{
        position: relative;
        top:12%;
        float :right;
        text-align:right;
        z-index: 1000;
    }
    .收藏按钮 .收藏展开列表{
        display: none;
        text-align: left;
    }
    .收藏按钮:hover .收藏展开列表{
        display: block;
    }
    .收藏列表内容{
        margin-bottom: 10px;
        width: 450px;
        max-height: 300px;
        overflow: scroll;
    }
    .结算按钮栏{
        text-align: right;
    }
</style>