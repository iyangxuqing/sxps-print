import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import GoodsBuyer from '@/components/goods/goods-buyer'
import TradeEdit from '@/components/trade/trade-edit'
import TradeSum from '@/components/trade/trade-sum-print'
import TradeEditWrapper from '@/components/trade/trade-edit-wrapper'
import TradeDelivery from '@/components/trade/trade-delivery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods-buyer'
    },
    {
      path: '/goods-buyer',
      name: 'GoodsBuyer',
      component: GoodsBuyer
    },
    {
    	path: '/trade-edit',
    	name: 'TradeEdit',
    	component: TradeEdit,
    },
    {
      path: '/trade-edit/goods-buyer',
      name: 'TradeEdit-GoodsBuyer',
      component: GoodsBuyer
    },
    {
      path: '/trade-sum',
      name: 'TradeSum',
      component: TradeSum
    },
    {
      path: '/trade-edit-wrapper',
      name: 'TradeEditWrapper',
      component: TradeEditWrapper
    },
    {
      path: '/trade-delivery',
      name: 'TradeDelivery',
      component: TradeDelivery
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
