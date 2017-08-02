import types from '../types.js'
import axios from 'axios'

const  state = {
	goods:[],
	foodDetail:false,
	buyDetail:false
} 

const getters = {
	goods(state){
		return state.goods;
	},
	foodDetail(state){
		return state.foodDetail;
	},
	buyDetail(state){
		return state.buyDetail;
	}
}

const actions = {
	getGoods({commit,state}){
		axios.get('/api/goods').then(resp =>{
			if(resp.data.errno==0){
				commit(types.GET_GOODS,resp.data.data);

			}
		});
	},
	shoFoodDetail({commit}){
		commit(types.SHOW_FOODDETAIL);
	},
	hideFoodDetail({commit}){
		commit(types.HIDE_FOODDETAIL);
	},
	showBuyDetail({commit}){
		commit(types.SHOW_BUYDETAIL);
	},
	hideBuyDetail({commit}){
		commit(types.HIDE_BUYDETAIL);
	}
}

const mutations = {
	[types.GET_GOODS](state,data){
		state.goods = data;
	},
	[types.SHOW_FOODDETAIL](state){
		state.foodDetail = true;
	},
	[types.HIDE_FOODDETAIL](state){
		state.foodDetail = false;
	},
	[types.SHOW_BUYDETAIL](state){
		state.buyDetail = true;
	},
	[types.HIDE_BUYDETAIL](state){
		state.buyDetail = false;
	}

}

export default {
	state,
	getters,
	actions,
	mutations
}
