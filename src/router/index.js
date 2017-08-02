import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/Goods/goods.vue'
import Seller from '../components/seller/seller.vue' 
import Ratings from '../components/ratings/rating.vue'
Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path:'/',
  		component:Goods
  	},
    {
      path:'/goods',
  	  component:Goods
    },
    {
      path:'/seller',
      component:Seller
    },
    {
      path:'/ratings',
      component:Ratings
    }
  ],
  linkActiveClass:'active'
})
