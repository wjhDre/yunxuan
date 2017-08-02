<template>
	<div class="star">
		<!-- <span v-for="v in star" :class="v" class="star-list"></span> -->
		<img v-for='v in star' :src="'../../../static/img/'+v+'.png'" :class="size">
	</div>
</template>

<script type="text/javascript">
	export default {
		props:['score','size'],
		computed:{
			star:function(){
				let star = [];
				let integer = Math.floor(this.score);//获取评分的整数部分
				let xiaoshu = this.score-integer;
				// console.log(this.size)
				for(var i = 1;i <= integer;i++){
					star.push('on');
				}
				if(xiaoshu > 0.5){
					star.push('half');
				}
				while(star.length < 5){
					star.push('off');
				}
				return star;
			}
		}
	}
</script>

<style lang="less" scoped>
	.star{
		width: 2.8rem;
		display: flex;
		justify-content: space-between;
		.big{
			width: 0.48rem;
			height:0.48rem;
		}
		.small{
			width: 0.36rem;
			height:0.36rem;
		}
		.smaller{
			width: 0.24rem;
			height:0.24rem;
		}
		
		// .star-list{
			// width: 0.4rem;
			// height:0.4rem;
			// display: inline-block;
			// margin-left: 0.2rem;
			// &.on{
			// 	background-image: url(../../../static/img/on.png);
			// 	background-size: 0.4rem 0.4rem;
			// 	background-repeat: no-repeat;
			// }
			// &.half{
			// 	background-image: url(../../../static/img/half.png);
			// 	background-size: 0.4rem 0.4rem;
			// 	background-repeat: no-repeat;
			// }
			// &.off{
			// 	background-image: url(../../../static/img/off.png);
			// 	background-size: 0.4rem 0.4rem;
			// 	background-repeat: no-repeat;
			// }
		// }
	}
</style>