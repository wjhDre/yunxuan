<template>
	<div class="buyCount">
		<span class="icon-remove_circle_outline ico" v-if="foods.count>0" @click.stop="minusCount"></span>
		<span class="count" v-if="foods.count>0">{{foods.count}}</span>
		<span class="icon-add_circle ico" @click.stop="addCount"></span>

	</div>
</template>

<script type="text/javascript">
	export default {
		props:['foods'],
		methods:{
			addCount(){
				if(this.foods.count){
					this.foods.count++;	
				}else{
					this.$set(this.foods,'count',1);
				}	
			},
			minusCount(){
				this.foods.count--;
			}
		}
	}
</script>

<style lang='less' scoped>
	.buyCount{
		height: 0.48rem;
		overflow: hidden;
		span{
			float: left;
		}
		.ico{
			font-size: 0.48rem;
			color: rgb(0,160,220);
		}
		.count{
			font-size: 0.24rem;
			line-height: 0.48rem;
			color: rgb(147,153,159);
			display: inline-block;
			width: 0.48rem;
			text-align: center;
		}
	}
</style>