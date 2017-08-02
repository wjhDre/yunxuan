<template>
	<transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
	<div class="detail" v-show="detailShow">
		<div class="name">{{seller.name}}</div>
		<star :score="seller.score" :size="'big'"></star>	
		<div class="title">
			<div class="line" ></div>
			<span>优惠信息</span>
			<div class="line" ></div>
		</div>
		<div class="discount">
			<discount></discount>	
		</div>
		<div class="title">
			<div class="line" ></div>
			<span>商家公告</span>
			<div class="line" ></div>
		</div>
		<div class="pulick">
			{{seller.bulletin}}
		</div>
		<div class="close">
			<span class="icon-close" @click="hideDetail"></span>
		</div>
	</div>
	</transition>	
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import discount from '../discount/discount.vue'
	import star from '../star/star.vue'
	export default {
		computed:{
			...mapGetters([
				'seller',
				'detailShow'
			])
		},
		components:{
			discount,
			star
		},
		methods:{
			hideDetail(){
				this.$store.dispatch('hideDetail');
			}
		}

	}	
</script>

<style lang='less' scoped>
	.detail{
		position: fixed;
		top: 0;
		left: 0;
		padding-bottom: 0.64rem;
		box-sizing: border-box;
		z-index: 9999;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(7,17,27,0.8);
		color: #fff;
		.name{
			font-size: 0.32rem;
			text-align: center;
			margin-top: 1.28rem;
			font-weight: 700;

		}
		.star{
			margin: 0.32rem auto 0;
			text-align: center;
		}
		.title{
			margin: 0.56rem 0.72rem 0 0.72rem;
			font-size: 0.3rem;
			font-weight: 700;
			height: 0.32rem;
			display: flex;
			justify-content: space-between;
			.line{
				width: 2rem;
				height: 0;
				margin-top: 0.14rem;
				display: inline-block;
				border: 0.02rem solid rgba(255,255,255,0.2);	
			}

		}
		.discount{
			margin: 0.48rem 0.72rem 0 0.72rem;	
		}
		.pulick{
			margin:0.48rem 0.96rem;	
			font-size: 0.24rem;
			font-weight: 200;
			line-height: 0.48rem;
		}
		.close{
			position: absolute;
			bottom: 0.64rem;
			width: 100%;
			text-align: center;
			font-size: 0.64rem;
			color:rgba(255,255,255,0.5);
		}
	}
	
</style>