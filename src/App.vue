<template>
  <div id="app">
    <v-header></v-header>
    <div class="tabs">
    	<div class="tab-item">
			<router-link to="/goods">商品</router-link>
    	</div>
    	<div  class="tab-item">  		
			<router-link to="/ratings">评价</router-link>
    	</div>
    	<div  class="tab-item">
			<router-link to="/seller">商家</router-link>
    	</div>
	</div>
	<keep-alive>	
    	<router-view></router-view>
	</keep-alive>
    <div class="footer">
    	<div class="circle" :class="{'circle2':getPrice>0}" @click="showBuyDetail">
			<span class="icon-shopping_cart"></span>
    	</div>
    	<div class="price">
			<span style="padding-right:0.24rem">￥{{getPrice}}</span>
			<span class="deliveryPrice">另需配送费￥{{seller.deliveryPrice}}元</span>	
    	</div>
    	<div class="minPrice" :class="{'minPrice2':getPrice>=seller.minPrice}">
    		<span v-if="getPrice==0">￥{{seller.minPrice}}起送</span>
    		<span v-if="getPrice<seller.minPrice&&getPrice>0">还差{{seller.minPrice-getPrice}}元</span>
    		<span v-if="getPrice>=seller.minPrice">去结算</span>
    	</div>
    </div>
    <buyCountDetail :foodsList="getFood" v-if="buyDetail" ></buyCountDetail>
  </div>
</template>

<script>
import Header from './components/header/Header.vue'//导入header组件
import buyCountDetail from './components/buycount/buyCountDetail.vue'
import {mapGetters} from 'vuex'
export default {
  components:{
    'v-header':Header,//注册header组件
    buyCountDetail
  },
  computed:{
  	...mapGetters([
  		'seller',
  		'goods',
  		'buyDetail'
  	]),
  	getPrice(){
 		let allPrice = 0;
 		this.goods.forEach( value =>{
 			value.foods.forEach( item =>{
 				if(item.count){
 					allPrice+=item.count*item.price
 				}
 			});
 		});
 		return allPrice;
		
	},
	getFood(){
		let food = [];
		this.goods.forEach( value => {
			value.foods.forEach( item => {
				if(item.count){
					food.push(item);
				}
			})
		})
		return food;
	}
  },
  methods:{
  	showBuyDetail(){
  		if(this.getFood[0]){
  			this.$store.dispatch('showBuyDetail');
  		}else{
  			return
  		}
  	}
  }
}
</script>

<style lang="less" scoped>
	.tabs{
		display: flex;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		border-bottom: 0.01rem solid rgba(7,17,27,0.1);
		.tab-item{
			flex:1;
			text-align: center;
			a{
				display: block;
				font-size:0.28rem;
				color: rgb(77,85,93);
				&.active{
					color:rgb(240,20,20);
					border-bottom: 1px solid rgb(240,20,20);
				}
			}
		}
	}
	.footer{
		position: fixed;
		z-index: 1000;
		bottom: 0;
		left: 0;
		height: 1rem;
		width: 100%;
		background-color: #141d27;
		.circle{
			width: 1.12rem;
			height: 1.12rem;
			border: 0.12rem solid #141d27;
			border-radius: 0.56rem;
			position: absolute;
			// z-index: 1000;
			left: 0.36rem;
			bottom:0.12rem;
			// margin-left: 0.36rem;
			// margin-bottom: 0.16rem;
			// box-sizing: border-box;
			padding: 0.2rem;
			box-sizing: border-box;
			text-align: center;
			background: #2a333b;
			overflow: hidden;
			color: rgba(255,255,255,0.4);
			&.circle2{
				background: rgb(0,160,220);
				color: #fff; 
			}
			span{
				float: left;
				height: 0.48rem;
				font-size: 0.48rem;
			}
		}
		.price{
			position: absolute;
			left: 1.6rem;
			top: 0.24rem;
			height: 0.52rem;
			line-height: 0.52rem;
			font-size: 0.24rem;
			color: rgba(255,255,255,0.4);
			font-weight: 700;
			// border-right: 0.01rem solid rgba(255,255,255,0.4); 
			.deliveryPrice{
				font-weight: 200;
				padding: 0.1rem 0.24rem;
				border-left: 0.01rem solid rgba(255,255,255,0.4);
			}
		}
		.minPrice{
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			width: 2.1rem;
			background-color: rgba(255,255,255,0.2);
			color: rgba(255,255,255,0.4);
			font-size: 0.32rem;
			font-weight: 700;
			text-align: center;
			line-height: 1rem;
			&.minPrice2{
				background-color: lightgreen;
				color: #fff;
			}
		}
	}
</style>
