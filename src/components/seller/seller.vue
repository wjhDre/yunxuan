<template>
	<div class="seller" ref="seller">
		<div>
		<div class="sellerInfo">
			<p class="sellerName">{{seller.name}}</p>
			<div class="sellerRating">
				<div class="ratingStar">
					<star :score="seller.score" :size="'small'"></star>
				</div><span class="rtxt">({{seller.ratingCount}})</span><span class="txt">月售{{seller.sellCount}}单</span>	
			</div>
			<div class="shoucang" v-if="!flag">
				<span class="icon-favorite xin" @click="getFlag" ></span>
				<p id="scTxt">收藏</p>
			</div>
			<div class="shoucang" v-if="flag">
				<span class="icon-favorite xin2" @click="getFlag" ></span>
				<p id="scTxt">已收藏</p>
			</div>
		</div>
		<div class="deliveryInfo">
			<div class="infoWrapper">
				<p>起送价</p>
				<p><span>{{seller.minPrice}}</span>元</p>
			</div>
			<div class="infoWrapper dprice">
				<p>商家配送</p>
				<p><span>{{seller.deliveryPrice}}</span>元</p>
			</div>
			<div class="infoWrapper">
				<p>平均配送时间</p>
				<p><span>{{seller.deliveryTime}}</span>分钟</p>
			</div>
		</div>
		<div class="space"></div>
		<div class="activity">
			<p class="title">公告与活动</p>
			<p class="public">{{seller.bulletin}}</p>
			<ul class="discount">
				<li v-for="(v,i) in seller.supports" class="discountList">
					<img :src="'../../../static/img/ds'+(i+1)+'.png'"><span>{{v.description}}</span>
				</li>
			</ul>
		</div>
		<div class="space"></div>
		<div class="photo">
			<p class="title">商家实景</p>
			<div class="imgWrapper" ref="imgWrapper">
				<div>
					<img v-for="v in seller.pics" :src="v">
				</div>
			</div>
		</div>
		<div class="space"></div>
		<div class="infos">
			<p class="title">商家信息</p>
			<ul style="margin-top:0.24rem">
				<li v-for="v in seller.infos" class="infoList">{{v}}</li>
			</ul>
		</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import star from '../star/star.vue'
	import BScroll from 'better-scroll'
 	export default {
 		created(){
 			this.$nextTick( ()=> {
				this._initseller();
				this._initimgWrapper();
			})
 		},
 		computed:{
 			...mapGetters([
 				'seller',
 				'flag',
 			]),
 		},
 		data(){
 			return {
 				'timer':{}
 			}
 		},
 		components:{
 			star
 		},
 		watch:{
			seller(){
				this.$nextTick( ()=> {
					this._initseller();
					this._initimgWrapper();
				})
			}
		},
 		methods:{
 			getFlag(){
 				clearTimeout(this.timer);
 				this.timer = setTimeout(() => {
 					console.log('11');
 					this.$store.dispatch('getFlag');
 					console.log(this.flag);
 				},0);
 				
 			},
 			_initseller(){
				this.sellerlist=new BScroll(this.$refs.seller,{
					click:true
				});
			},
			_initimgWrapper(){
				this.imgWrapper=new BScroll(this.$refs.imgWrapper,{
					click:true,
					scrollX:true
				});
			}
 		}

	}
</script>

<style lang="less" scoped>
	.seller{
		width: 100%;
		position: absolute;
		top: 3.49rem;
		bottom: 1rem;
		overflow: hidden;
		.sellerInfo{
			margin: 0 0.36rem;
			padding: 0.36rem 0;
			border-bottom: 0.01rem solid rgba(7,17,27,0.1);
			position: relative;
			.sellerName{
				font-size: 0.28rem;
				color: rgb(7,17,27);
				font-weight: 200;
			}
			.sellerRating{
				margin-top: 0.16rem;
				font-size: 0.2rem;
				color: rgb(77,85,93);
				.ratingStar{
					display: inline-block;
					vertical-align: top;
					.star{
						width: 2.4rem;
					}
				}
				.rtxt{
					margin-left: 0.16rem;
					display: inline-block;
					height:0.36rem;
					line-height: 0.36rem;
				}
			}
			.shoucang{
				text-align: center;
				height: 100%;
				width: 0.8rem;
				position: absolute;
				right: 0;
				top:-0.2rem;
				.xin{
					font-size: 0.48rem;
					color: rgb(77,85,93);
				}
				.xin2{
					font-size: 0.48rem;
					color: rgb(240,20,20);
				}
				#scTxt{
					font-size: 0.2rem;
					color: rgb(77,85,93);
				}
				
			}
		}
		.deliveryInfo{
			display: flex;
			.infoWrapper{
				flex: 1;
				margin: 0.36rem 0;
				p{
					font-size: 0.2rem;
					color: rgb(147,153,159);
					text-align: center;
					margin-bottom: 0.08rem;
					span{
						font-size: 0.48rem;
						font-weight: 200;
						color: rgb(7,17,27); 
					}
				}
				&.dprice{
					border-left: 0.01rem solid rgba(7,17,27,0.1);  
					border-right: 0.01rem solid rgba(7,17,27,0.1);  
				}
			}
		}
		.space{
			height: 0.32rem;
			background: #eee;
			border-top: 0.02rem solid rgba(7,17,27,0.1);
			border-bottom: 0.02rem solid rgba(7,17,27,0.1);
		}
		.activity{
			padding: 0.36rem;
			.public{
				margin-top: 0.16rem;
				padding: 0 0.24rem;
				font-size: 0.24rem;
				color: rgb(240,20,20);
				line-height: 0.48rem;
			}
			.discount{
				margin-top: 0.32rem;
				font-size: 0.24rem;
				font-weight: 200;
				color: rgb(7,17,27);
				.discountList{	
					padding: 0.32rem 0.24rem;
					border-top: 0.01rem solid rgba(7,17,27,0.1);  
					img{
						width: 0.32rem;
						height: 0.32rem;
						margin-right: 0.12rem;
						vertical-align: middle;
					}
				}
			}
		}
		.photo{
			padding: 0.36rem 0 0.36rem 0.36rem;
			.imgWrapper{
				margin-top: 0.24rem;
				white-space: nowrap;
				overflow: hidden;
				div{
					width: 8.72rem;
					img{
						width: 2rem;
						height: 1.5rem;
						margin-right: 0.12rem;
					}
				}
			}
		}
		.infos{
			padding: 0.36rem;
			.infoList{
				border-top:0.01rem solid rgba(7,17,27,0.1);
				padding: 0.32rem 0.24rem;
				font-size: 0.24rem;
				font-weight: 200;
				color: rgb(7,17,27);
			}
		}

	}
	.title{
		font-size:0.48rem;
		font-weight: 200;
	}
</style>