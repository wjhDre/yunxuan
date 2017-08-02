import axios from 'axios'
import types from '../types.js'

const state = {
	seller:{},
	detailShow:false,
	flag:false
}

const getters = {
	seller(state){
		return state.seller;
	},
	detailShow(state){
		return state.detailShow;
	},
	flag(state){
		return state.flag;
	}
}

const actions = {
	getSeller({commit,state}){
		axios.get('/api/seller').then(resp => {
			if (resp.data.errno==0) {
				commit(types.GET_SELLER,resp.data.data);
			}
		});
	},
	showDetail({commit}){
		commit(types.SHOW_DETAIL);
	},
	hideDetail({commit}){
		commit(types.HIDE_DETAIL);
	},
	getFlag({commit}){
		commit('getFlag');
	}
}

const mutations = {
	[types.GET_SELLER](state,data){
		state.seller = data;
	},
	[types.SHOW_DETAIL](state){
		state.detailShow = true;
	},
	[types.HIDE_DETAIL](state){
		state.detailShow = false;
	},
	getFlag(state){
		state.flag = !state.flag;
	}
}


export default {
	state,
	getters,
	actions,
	mutations
}
