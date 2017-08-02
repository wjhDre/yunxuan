<template>
	<div class="header">
		<img :src="seller.avatar" class="bgimg">
		<div class="headerBar">
			<img :src="seller.avatar" id="avatar">
			<div class="container">
				<div class="sellerName">
					<img src="../../../static/img/brand@2x.png" id="pinpai">{{seller.name}}
				</div>
				<p class="deliveryTime">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
				<div class="discount">
					<img src="../../../static/img/d1.png" id="jian">
					<span v-if="seller.supports">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<!-- 点击显示详情页 -->
			<div class="discountNo" @click="showDetail"><span>5个</span><span class="icon-keyboard_arrow_right ico"></span></div>
		</div>
		<div class="public" @click="showDetail"><!-- 点击显示详情页 -->
			<img src="../../../static/img/bulletin@2x.png" id="gonggao">
			<div class="publicNotice">{{seller.bulletin}}</div><span class="icon-keyboard_arrow_right ico2" ></span>
		</div>
		<Detail></Detail>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Detail from './detail.vue'//导入详情页组件
	export default {
		created(){
			this.$store.dispatch('getSeller');//给actions发送getSeller事件
		},
		computed:{
			...mapGetters([
				'seller',
				'detailShow'
			])
		},
		components:{
			Detail//注册详情页组件
		},
		methods:{
			showDetail(){
				this.$store.dispatch('showDetail');//给actions发送showDetail事件
			}
		}
	}
</script>

<style lang="less" scoped>
	.header{
		height: 2.68rem;
		background-color: rgba(7,17,27,0.5);	
		position: relative;
		.bgimg{
			width: 100%;
			height: 100%;
			position:absolute;
			z-index: -99;
			filter: blur(10px);
		}
		.headerBar{
			height: 2.12rem;
			padding: 0.48rem 0 0.36rem 0.48rem;
			box-sizing: border-box;
			#avatar{
				width: 1.28rem;
				height: 1.28rem;
				border-radius: 0.04rem;
				vertical-align: top;
			}
			.container{
				position: absolute;
				top:0.48rem;
				left: 2.08rem;
				.sellerName{
					height:0.36rem;
					margin-top: 0.04rem;
					font-size: 0.3rem;
					font-weight: bold;
					color:#fff;
					#pinpai{
						width: 0.6rem;
						height:0.36rem;
						margin-right: 0.12rem;
						vertical-align: top;
					}	
				}
				.deliveryTime{
					margin-top: 0.16rem;
					font-size: 0.24rem;
					font-weight: 200;
					color: #fff;
				}
				.discount{
					margin-top: 0.2rem;
					height: 0.24rem;
					color: #fff;
					font-size: 0.2rem;
					font-weight: 200;
					// overflow: hidden;
					#jian{
						// float: left;
						width: 0.24rem;
						height:0.24rem;
						margin-right: 0.08rem;
						vertical-align: middle;

					}
				}
			}
			.discountNo{
				position: absolute;
				right: 0.24rem;
				bottom: 0.86rem;
				height: 0.48rem;
				width: 0.96rem;
				color: #fff;
				background-color: rgba(0,0,0,0.2);
				border-radius: 0.24rem;
				font-size: 0.2rem;
				line-height: 0.48rem;
				padding-left: 0.22rem;
				box-sizing: border-box;
				.ico{
					font-size: 0.24rem;
					position: absolute;
					top: 0.12rem;
					right: 0.16rem;
				}
			}
		}
		.public{
			height: 0.56rem;
			width: 100%;
			background-color: rgba(7,17,27,0.2);
			color: #fff;
			font-weight: 200;
			font-size: 0.2rem;
			line-height: 0.56rem;
			#gonggao{
				float: left;
				width: 0.44rem;
				height: 0.24rem;
				margin:0.16rem 0.08rem 0 0.24rem;
			}
			.publicNotice{
				height: 100%;
				margin-right: 0.48rem;
				overflow: hidden;
				white-space: nowrap; 
				text-overflow: ellipsis;
			}
			.ico2{
				font-size: 0.24rem;
				position: absolute;
				right: 0.24rem;
				bottom: 0.16rem;

			}
		}	
	}
</style>
