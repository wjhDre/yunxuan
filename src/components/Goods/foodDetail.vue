<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
	<div class="foodDetail"  ref="foodDetail">
		<div>
		<div class="imgWrapper">
			<img :src="foods.image" alt="">
			<span class="icon-arrow_lift ico" @click="hideFoodDetail"></span>
		</div>
		<div class="foodTitle">
			<p class="name">{{foods.name}}</p>
			<p style="font-size:0.2rem;color:rgb(147,153,159);margin-top:0.16rem;">月售{{foods.sellCount}}份<span style="margin-left:0.24rem;">好评率{{foods.rating}}%</span></p>
			<p class="price">￥{{foods.price}} <span v-if="foods.oldPrice">￥{{foods.oldPrice}}</span><span class="carBtn" v-if="!foods.count" @click="addCount2">加入购物车</span><buyCount :foods='foods' v-if="foods.count"></buyCount> </p>
		</div>
		<div class="space"></div>
		<div class="foodInfo">
			<p class="title">商品介绍</p>
			<p class="info">{{foods.info}}</p>
		</div>
		<div class="space"></div>
		<div class="ratingsBtn">
		    <p class="title">商品评价</p>
			<div class="all" @click="selectRatings(2)" :class="{'all2':ratingsFlag==2}">全部</div>
			<div class="like" @click="selectRatings(1)" :class="{'like2':ratingsFlag==1}">推荐</div>
			<div class="dislike" @click="selectRatings(0)" :class="{'dislike2':ratingsFlag==0}">吐槽</div>
		</div>
		<div class="justContainer">
			<p @click="selectContainer">
				<span class="icon-check_circle" style="font-size:0.48rem;vertical-align:middle;margin-right:0.08rem;" ref='ico'></span>只看有内容的评价
			</p>
		</div>
		<ul>
			<li class="ratingList" v-for="(v,i) in foods.ratings" v-if="!(v.rateType==ratingsFlag)" v-show="container==''?true:container[i]">
				<p class="timeAndName"><span>{{time[i]}}</span><img :src="v.avatar" alt="" class="avatar"><span class="username">{{v.username}}</span></p>
				<p class="text">
					<span class="icon-thumb_up" v-if="v.rateType==0"></span>
					<span class="icon-thumb_down" v-if="v.rateType==1"></span>
					<span>{{v.text}}</span>
				</p>
			</li>
		</ul>
		</div>
	</div>
	</transition>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import BScroll from 'better-scroll'
	import 'animate.css/animate.css'
	import buyCount from '../buycount/buycount.vue'

	export default {
		created(){
			 this.$nextTick( ()=> {
				this._initfoodDetail();
			})
		},
		components:{
			buyCount
		},
		data(){
			return {
				'ratingsFlag':2,
				'container':'',
				'timer':{}
			}
		},
		props:['foods'],
		computed:{
			...mapGetters([
				'seller',
				'foodDetail'
			]),
			time:function(){
				var times = [];
				for(var item of this.foods.ratings){
					let time = new Date(item.rateTime);
					let y = time.getFullYear();
					let m = time.getMonth()+1;
					let d = time.getDate();
					let h = time.getHours();
					let M = time.getMinutes();
					if(m<10){
						var mm = "0" + m;
					}
					let str = y+'-'+mm+'-'+d+' '+h+':'+M;
					times.push(str);
				}
				return times
			}
		},
		/*watch:{
			foods(){
				this.$nextTick( ()=> {
					this._initfoodDetail();
				})
			}
		},*/
		methods:{
			hideFoodDetail(){
				this.$store.dispatch('hideFoodDetail');
			},
			_initfoodDetail(){
				this.foodDetailList=new BScroll(this.$refs.foodDetail,{
					click:true
				});
			},
			selectRatings(type){
				console.log(1111);
				this.ratingsFlag = type;
			},
			selectContainer(){
				clearTimeout(this.timer);
				this.timer =setTimeout(() => {
					console.log(111)	
					if(this.container == ''){
						this.$refs.ico.style.color="rgb(0,160,220)";
						this.container = [];
						for(var item of this.foods.ratings){
							if(item.text == ''){
								this.container.push(false);
							}else{
								this.container.push(true);
							}
						}
					}else{
						this.container = '';
						this.$refs.ico.style.color="rgb(147,153,159)";
					}
				},0);	
			},
			addCount2(){
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.$set(this.foods,'count',1);
				},0);
			},
		}
	}	
</script>

<style lang="less" scoped>
	.foodDetail{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 1rem;
		z-index: 666;
		width: 100%;
		// height: 100%;
		overflow: hidden;
		background-color: #fff;
		.imgWrapper{
			width: 100%;
			height: 0;
			position: relative;
			padding-bottom: 100%;
			img{
				position: absolute;
				width: 100%;
				height: 100%;
			}
			.ico{
				font-size: 0.48rem;
				position: absolute;
				top: 0.36rem;
				left: 0.36rem;
				z-index: 1000;
				color: #fff;
			}
		}
		.foodTitle{
			padding: 0.36rem;
			.name{
				font-size: 0.28rem;
				font-weight: 700;
				color: rgb(7,17,27); 		
			}
			.price{
				margin-top: 0.36rem;
				height: 0.48rem;
				font-size: 0.28rem;
				font-weight: 700;
				color: rgb(240,20,20);
				line-height: 0.48rem;
				span{
					font-size: 0.2rem;
					font-weight: normal;
					color: rgb(147,153,159);
					text-decoration: line-through;
				}
				.carBtn{
					display: inline-block;
					float: right;
					width: 1.48rem;
					height: 0.48rem;
					box-sizing: border-box;
					font-size: 0.24rem;
					line-height: 0.24rem;
					text-align: center;
					border-radius: 0.24rem;
					text-decoration: none;
					color: #fff;
					background-color: rgb(0,160,220);
					padding: 0.12rem 0;
				}
				.buyCount{
					float: right;
				}
			}
		}
		.space{
			height: 0.32rem;
			background: #eee;
			border-top: 0.02rem solid rgba(7,17,27,0.1);
			border-bottom: 0.02rem solid rgba(7,17,27,0.1);
		}
		.foodInfo{
			padding: 0.36rem;
			.info{
				margin: 0.12rem 0.16rem;
				font-size: 0.24rem;
				color: rgb(77,85,93);
				line-height: 0.48rem;
			}
		}
		.ratingsBtn{
			padding: 0.36rem 0;
			margin: 0 0.36rem;
			border-bottom: 0.01rem solid rgba(7,17,27,0.1);
			overflow: hidden; 
			.title{
				margin-bottom: 0.36rem;
			}
			.all{
				padding: 0.16rem 0.24rem;
				margin-right: 0.16rem;
				display: inline-block;
				background-color: rgba(0,160,220,0.2);
				font-size: 0.24rem;
				color: rgb(77,85,93);
				border-radius: 0.04rem;
				float: left;
				&.all2{
					background-color: rgba(0,160,220,1);
					color: #fff;
				}
			}
			.like{
				padding: 0.16rem 0.24rem; 
				margin-right: 0.16rem;
				display: inline-block;
				background-color: rgba(0,160,220,0.2);
				font-size: 0.24rem;
				color: rgb(77,85,93);
				border-radius: 0.04rem;
				float: left;
				&.like2{
					background-color: rgba(0,160,220,1);
					color: #fff;
				}
			}
			.dislike{
				padding: 0.16rem 0.24rem; 
				margin-right: 0.16rem;
				display: inline-block;
				background-color: rgba(77,85,93,0.2);
				font-size: 0.24rem;
				color: rgb(77,85,93);
				border-radius: 0.04rem;
				float: left;
				&.dislike2{
					background-color: rgba(77,85,93,0.5);
					color: #fff;
				}
			}
		}
		.justContainer{
			padding: 0.24rem 0.36rem;
			border-bottom: 0.01rem solid rgba(7,17,27,0.1);
			p{
				height:0.48rem;
				color: rgb(147,153,159);
				font-size: 0.24rem;
			}
		}
		.ratingList{
			margin: 0 0.36rem;
			padding: 0.32rem 0;
			border-bottom: 0.01rem solid rgba(7,17,27,0.1);
			.timeAndName{
				font-size: 0.24rem;
				color: rgb(147,153,159);
				overflow: hidden;
				.username{
					float: right;
				}
				.avatar{
					width: 0.24rem;
					height: 0.24rem;
					border-radius: 0.12rem;
					margin-left: 0.12rem;
					float: right;
				}
			}
			.text{
				margin-top: 0.12rem;
				font-size: 0.24rem;
				.icon-thumb_up{
					color: rgb(0,160,220);
				}
				.icon-thumb_down{
					color: rgb(147,153,159);
				}
			}
		}

	}
	.title{
		font-weight: 200;
		font-size: 0.48rem;
		color: #000;
		font-weight: 200;
	}
</style>