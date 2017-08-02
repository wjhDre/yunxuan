<template>
	<div class="buyCountDetail" @click='hideBuyDetail'>
		<!-- <div class="container"> -->
			<transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
			<div class="foodwrapper" v-show="buyDetail">
				<div class="title">购物车 <span class="remove" @click.stop="empty">清空</span></div>
				<div ref='container'class="container">
				<ul>
					<li class="foodsList" v-for="(v,index) in foodsList">
						<span>{{v.name}}</span>
						<buyCount :foods="foodsList[index]"></buyCount>
						<span class="price">￥{{v.price*v.count}}</span>
					</li>
				</ul>
				</div>
			</div>
			</transition>
		<!-- </div> -->
	</div>
	
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import buyCount from '../buycount/buycount.vue'
	import BScroll from 'better-scroll'

	export default {
		created(){
			this.$nextTick( ()=> {
			 	setTimeout( () => {
			 		if(!this.BuyDetailList){
			 			this.BuyDetailList=new BScroll(this.$refs.container,{
							click:true
						});
						console.log(1111);
			 		}else{
			 			this.BuyDetailList.refresh();
			 			console.log(this.BuyDetailList);
			 		}
			 	},10);
			});
		},
		props:['foodsList'],
		components:{
			buyCount
		},
		computed:{
			...mapGetters([
				'buyDetail'
			]),
		},
		watch:{
			foodsList(){
				if(this.foodsList[0]){
					return
				}else{
					this.$store.dispatch('hideBuyDetail');
				}
				
			}
		},
		methods:{
			empty(){
				for( var item of this.foodsList){
					item.count = 0;
				}
				this.$store.dispatch('hideBuyDetail');
			},
			hideBuyDetail(){
				this.$store.dispatch('hideBuyDetail');
			}
		}

	}	
</script>

<style lang="less" scoped>
	.buyCountDetail{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 1rem;
		z-index: 888;
		width: 100%;
		overflow: auto;
		background-color: rgba(7,17,27,0.8);
		
		.foodwrapper{
			position: absolute; 
			max-height: 50%;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #fff;
			overflow: hidden;
			.title{
				height: 0.8rem;
				padding: 0 0.36rem;
				font-size: 0.28rem;
				line-height: 0.8rem;
				font-weight: 200;
				background-color: #f3f5f7;
				color: rgb(7,17,27);
				overflow: hidden;
				.remove{
					float: right;
					&:active{
						color: rgb(0,160,220);
					}
				}
			}
			.container{
				height: auto;
				max-height: 6rem;
				overflow: hidden;
				.foodsList{
					height: 0.96rem;
					margin:0 0.36rem;
					padding: 0.24rem 0;
					box-sizing: border-box;
					border-bottom: 0.01rem solid rgba(7,17,27,0.1);
					font-size: 0.28rem;
					color: rgb(7,17,27);
					line-height: 0.48rem;
					overflow: hidden;
					.price{
						font-weight: 700;
						color: rgb(240,20,20);
						margin-right: 0.24rem;
						float: right;
					}
					.buyCount{
						float: right;
					}
				}
			}
		}
	}
</style>