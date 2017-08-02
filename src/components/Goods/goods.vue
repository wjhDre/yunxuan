<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(v,key) in goods" :class = "{'current' : key === currentIndex}" @click = 'selectmunu(key,$event)'><div class="text">{{v.name}}</div></li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper" >
			<ul>
				<li v-for="(value,key) in goods" class="foodList">
					<div class="itemName">{{value.name}}</div>
					<div class="foodContainer" v-for="v in value.foods"  @click="shoFoodDetail(v)">
						<img :src="v.icon" alt="" class="foodImg">
						<div class="foodInfo">
							<p class="foodName">{{v.name}}</p>
							<p class="description" v-if="v.description">{{v.description}}</p>
							<p class="rating">月售{{v.sellCount}}份 好评{{v.rating}}%</p>	
							<p class="price"><span class="newPrice">￥{{v.price}}</span><span class="oldPrice" v-if="v.oldPrice">￥{{v.oldPrice}}</span></p>
						</div>
						<buyCount :foods="v"></buyCount>
					</div>
				</li>
			</ul>
		</div>
		<foodDetail :foods="foods" v-if="foodDetail"></foodDetail>
	</div>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import foodDetail from './foodDetail.vue'
	import buyCount from '../buycount/buycount.vue'
	export default {
		created(){
			this.$store.dispatch('getGoods');
		},
		components:{
			foodDetail,
			buyCount
		},
		computed:{
			...mapGetters([
				'goods',
				'foodDetail'
			]),
			currentIndex(){
				for ( let i = 0 ; i < this.listHeight.length ; i++ ){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if( this.scrollY >= height1 &&  this.scrollY < height2 ){
						return i;
					}
				}
				return 0;
			}
		},
		data () {
			return {
				listHeight : [],
				scrollY : '',
				foods:{}
			}
		},
		watch:{
			goods(){
				this.$nextTick( ()=> {
					this._initmenulist();
					this._initfooodlist();
					this._initHeight();
				});
			}
		},
		methods:{
			shoFoodDetail(foods){
				this.$store.dispatch('shoFoodDetail');
				this.foods = foods;
			},
			_initmenulist(){
				this.menulist=new BScroll(this.$refs.menuWrapper,{
					click:true
				});
			},
			_initfooodlist(){
				this.foodwrap=new BScroll(this.$refs.foodWrapper,{
					click:true,
					probeType: 3
				});
				this.foodwrap.on('scroll', (pos) => {
						// console.log(Math.abs(Math.round(pos.y)));
						this.scrollY = Math.abs(Math.round(pos.y));
						// console.log(this.scrollY);		
				})
			},
			_initHeight(){
				let foodlist = this.$refs.foodWrapper.getElementsByClassName('foodList');
				let height = 0;
				this.listHeight.push(height);
				for( let i = 0 ; i < foodlist.length ; i++ ){
					height += foodlist[i].clientHeight;
					this.listHeight.push(height);
				} 
			},
			selectmunu(k,e){
				let foodlist = this.$refs.foodWrapper.getElementsByClassName('foodList');
				this.foodwrap.scrollToElement(foodlist[k],300);
			}
		}
	}	
</script>

<style lang="less" scoped>
	.goods{
		display: flex;
		width: 100%;
		position: absolute;
		top: 3.49rem;
		bottom: 1rem;
		overflow: hidden;
		.menu-wrapper{
			flex:0 0 1.6rem;
			width: 1.6rem;
			background-color: #f3f5f7;
			li{
				height: 1.08rem;
				// width: 1.12rem;
				// margin: 0 auto;
				padding: 0 0.24rem;
				display: table;
				// border-bottom:0.01rem solid rgba(7,17,27,0.1);
				&.current{
					color:red;
					background-color: #fff;
					border-left:0.02rem solid rgb(240,20,20);
				}
				.text{
					font-size: 0.24rem;
					font-weight: 200;
					width: 1.12rem;
					display: table-cell;
					vertical-align: middle;
					border-bottom:0.01rem solid rgba(7,17,27,0.1);
				}
			}
		}
		.foods-wrapper{
			flex:1;
			.foodList{
				.itemName{
					font-size: 0.24rem;
					color: rgb(147,153,159);
					height: 0.52rem;
					line-height: 0.52rem;
					font-weight: 400;
					background-color: #f3f5f7;
					padding-left: 0.28rem;
					box-sizing: border-box;
					border-left: 0.05rem solid #d9dde1; 
				}
				.foodContainer{
					border-bottom: 0.01rem solid rgba(7,17,27,0.1);
					padding: 0.36rem 0;
					margin: 0 0.36rem;
					position: relative;
					display: flex;
					flex-direction: row;
					.foodImg{
						width: 1.28rem;
						height: 1.28rem;
						margin-right: 0.2rem;
						border-radius: 0.04rem;
					}
					.foodInfo{
						// position: absolute;
						// top: 0.36rem;
						// left: 1.84rem;
						overflow: hidden;
						.foodName{
							margin-top: 0.04rem;
							font-size: 0.28rem;
							color: rgb(7,17,27);	
						}
						.description{
							margin-top: 0.16rem;
							font-size: 0.2rem;
							color: rgb(147,153,159);
						}
						.rating{
							margin-top: 0.16rem;
							font-size: 0.2rem;
							color:rgb(147,153,159);
						}
						.price{
							height: 0.28rem;
							margin-top: 0.16rem;
							overflow: hidden;
							.newPrice{
								float: left;
								font-size: 0.28rem;
								color: rgb(240,20,20);
								margin-right: 0.16rem; 
							}
							.oldPrice{
								float: left;
								font-size: 0.2rem;
								color: rgb(147,153,159);
								text-decoration: line-through;
							}

						}
					}
					.buyCount{
						position: absolute;
						right: 0;
						bottom: 0.36rem;
					}
				}	
			}
		}
	}
</style>