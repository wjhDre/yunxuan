<template>
	<div class="ratings" ref="rating">
		<div>
		<div class="ratingScore">
			<div class="score">
				<p style="font-size:0.48rem;color:rgb(255,153,0);">{{seller.score}}</p>
				<p style="font-size:0.24rem;color:rgb(7,17,27);margin-top:0.16rem;">综合评分</p>
				<p style="font-size:0.2rem;color:rgb(147,153,159);margin-top:0.16rem;">高于周边{{seller.rankRate}}%的商家</p>
			</div>
			<div class="ratingStar">
					<div style="font-size:0.24rem;height:0.36rem;line-height:0.36rem;">服务态度
						<div style="display:inline-block;vertical-align:middle;margin:0 0.12rem;">
							<star :score="seller.serviceScore" :size="'small'" style="width:2rem"></star>
						</div>
						<span style="color:rgb(255,153,0);">{{seller.serviceScore}}</span>
					</div>
					<div style="font-size:0.24rem;height:0.36rem;line-height:0.36rem;margin-top:0.16rem;">食品口味
						<div style="display:inline-block;vertical-align:middle;margin:0 0.12rem;">
							<star :score="seller.foodScore" :size="'small'" style="width:2rem"></star>
						</div>
						<span style="color:rgb(255,153,0);">{{seller.foodScore}}</span>
					</div>
					<div style="font-size:0.24rem;height:0.36rem;line-height:0.36rem;margin-top:0.16rem;">送达时间<span style="color:rgb(147,153,159);margin-left:0.12rem;">{{seller.deliveryTime}}分钟</span>
					</div>
			</div>
		</div>
		<div class="space"></div>
		<div class="btnWrapper">
			<div class="all" @click="selectRatings(2)" :class="{'all2':ratingsFlag==2}">全部</div>
			<div class="like" @click="selectRatings(1)" :class="{'like2':ratingsFlag==1}">满意</div>
			<div class="dislike" @click="selectRatings(0)" :class="{'dislike2':ratingsFlag==0}">不满意</div>
		</div>	
		<div class="justContainer">
			<p @click="selectContainer">
				<span class="icon-check_circle" style="font-size:0.48rem;vertical-align:middle;margin-right:0.08rem;" ref='ico'></span>只看有内容的评价
			</p>
		</div>
		<ul>
			<li class="ratingList" v-for="(v,i) in ratings" v-if="!(v.rateType==ratingsFlag)" v-show="container==''?true:container[i]">
				<img :src="v.avatar" alt="" class="avatar">
				<div class="container">
					<p class="username">{{v.username}}<span style="float:right;color:rgb(147,153,159);font-size:0.24rem;">{{time[i]}}</span></p>
					<div class="starWrapper">
						<div style="display:inline-block;float:left;margin-right:0.12rem;">
							<star :score="v.score" :size="'smaller'" style="width:1.6rem;"></star>
						</div>
						<span style="font-size:0.2rem;color:rgb(147,153,159);float:left;" v-if="v.deliveryTime">{{v.deliveryTime}}分钟送达</span>	
					</div>
					<div class="txt">
						{{v.text}}
					</div>
					<div class="tuijian">
						<span class="icon-thumb_up ico" style="color:rgb(0,160,220);" v-if="v.rateType==0"></span>
						<span class="icon-thumb_down ico" style="color:rgb(183,187,191);" v-if="v.rateType==1"></span>
						<span v-for="val in v.recommend" class="recommend">{{val}}</span>
					</div>
				</div>
			</li>
		</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import star from '../star/star.vue'
	import BScroll from 'better-scroll'
	
	export default {
		created(){
			this.$store.dispatch('getRatings');
			// this.selectRatings=this.ratings;
		},
		data(){
			return {
				'ratingsFlag':2,
				'container':''
			}
		},
		computed:{
			...mapGetters([
				'seller',
				'ratings'
			]),
			time:function(){
				var times = [];
				for(var item of this.ratings){
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
		components:{
			star
		},
		watch:{
			ratings(){
				this.$nextTick( ()=> {
					this._initratings();
					console.log('aaaa')
				})
			}
		},
		methods:{
			_initratings(){
				this.ratingslist = new BScroll(this.$refs.rating,{
					click:true
				});
			},
			selectRatings(type){
				this.ratingsFlag = type;
				setTimeout( () => {
					this.ratingslist.refresh();
				},100);
			},
			selectContainer(){	
				if(this.container == ''){
					this.$refs.ico.style.color="rgb(0,160,220)";
					this.container = [];
					for(var item of this.ratings){
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
				setTimeout( () => {
					this.ratingslist.refresh();
				},100);
				
			},
		}
	}	
</script>

<style lang="less" scoped>
	.ratings{
		width: 100%;
		position: absolute;
		top: 3.49rem;
		bottom: 1rem;
		overflow: hidden;
		.ratingScore{
			padding: 0.36rem 0;
			// position: relative;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			.score{
				// display: inline-block;
				text-align: center;
			}
			.ratingStar{
				// position: absolute;
				// top: 0.36rem;
				// right: 0.48rem;
				padding-left: 0.36rem;
				border-left: 0.01rem solid rgba(7,17,27,0.1);
			}
		}
		.space{
			height: 0.32rem;
			background: #eee;
			border-top: 0.02rem solid rgba(7,17,27,0.1);
			border-bottom: 0.02rem solid rgba(7,17,27,0.1);
		}
		.btnWrapper{
			margin: 0 0.36rem;
			padding: 0.36rem 0;
			border-bottom: 0.01rem solid rgba(7,17,27,0.1);
			overflow: hidden;
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
			padding: 0.36rem 0;
			margin: 0 0.36rem;
			border-bottom: 0.01rem solid rgba(7,17,27,0.1);
			position: relative;
			.avatar{
				width: 0.56rem;
				height: 0.56rem;
				position: absolute;
				top: 0.36rem;
				left: 0;
				border-radius: 0.28rem;
			}
			.container{
				margin-left: 0.8rem;
				.username{
					font-size: 0.36rem;
					color: rgb(7,17,27);
				}
				.starWrapper{
					overflow: hidden;
					margin-top: 0.08rem;

				}
				.txt{
					margin-top: 0.12rem;
					font-size: 0.24rem;
					color: rgb(7,17,27);
				}
				.tuijian{
					margin-top: 0.16rem;
					overflow: hidden;
					.ico{
						margin-top:0.08rem; 
						float: left;
						font-size: 0.24rem;
					}
					.recommend{
						border:0.01rem solid rgba(7,17,27,0.1);
						border-radius: 0.04rem;
						padding: 0.08rem 0.12rem;
						font-size: 0.18rem;
						float: left;
						margin-left: 0.16rem;
						margin-bottom: 0.1rem;
						color: rgba(7,17,27,0.5);
					}
				}
			}

		}
	}
</style>