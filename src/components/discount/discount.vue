<template>
	<div>
		<div class="discountInfo" v-for='(v,i) in seller.supports'>
			<img :src="'../../../static/img/d'+(i+1)+'.png'" alt="">
			<span>{{v.description}}</span>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	export default {
		computed:{
			...mapGetters([
				'seller'
			])
		},
	}	
</script>

<style lang="less" scoped>
	.discountInfo{
		font-size: 0.24rem;
		font-weight: 200;
		margin:0 0 0.24rem 0.24rem;
		img{
			width: 0.32rem;
			height: 0.32rem;
			margin-right: 0.12rem;
			vertical-align: middle;
		}
	}
</style>