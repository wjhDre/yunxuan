import Vue from 'vue'
import Vuex from 'Vuex'
import seller from './modules/seller.js'
import goods from './modules/goods.js'
import ratings from './modules/ratings.js'

Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		seller,
		goods,
		ratings
	}
});