<template>
	<div class="trade-sum-wrapper">
		<div class="orders-wrapper">
			<div class="orders">
				<div class="order" v-for="order in orders">
					<div class="order-image">
						<img :src="order.image">
					</div>
					<div class="order-text">
						<div class="order-title">{{order.title}}<span v-if="order.specs"> - {{order.specs}}</span></div>
						<div class="order-descs">{{order.descs}}</div>
						<div class="order-message">{{order.message}}</div>
					</div>
					<div class="order-price">
						<div v-if="order.price">
							<span class="yuan">￥</span><span>{{order.price}}</span>
						</div>
					</div>
					<div class="order-num">
						<div v-if="order.num">{{order.num}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	import Vue from 'vue'
	import { getTrades } from '@/api/trade'
	import BScroll from '@/base/better-scroll/src'

	export default {
		name: 'TradeSum',
		data() {
			return {
				orders: []
			}
		},
		created() {
			getTrades().then((trades) => {
				let ZOrders = []
				for (let i in trades) {
					let trade = trades[i]
					for (let j in trade.orders) {
						let order = trade.orders[j]
						if (order.iid) {
							let index = -1
							for (let k in ZOrders) {
								if (ZOrders[k].iid == order.iid && ZOrders[k].sid == order.sid) {
									index = k
									break
								}
							}
							if (index < 0) {
								ZOrders.push({
									iid: order.iid,
									sid: order.sid,
									title: order.title,
									descs: order.descs,
									specs: order.specs,
									image: order.image,
									price: order.price,
									num: 0
								})
								index = ZOrders.length - 1
							}
							ZOrders[index].num += Number(order.num)
						}
					}
				}
				for (let i in trades) {
					let trade = trades[i]
					for (let j in trade.orders) {
						let order = trade.orders[j]
						if (!order.iid) {
							let name = trade.receive_name
							let phone = trade.receive_phone || trade.mobileNumber
							let message = order.message + ' [' + name + ' ' + phone + ']'
							ZOrders.push({
								image: order.image,
								message: message
							})
						}
					}
				}
				this.orders = ZOrders
			})			
		},
		mounted() {
			this.scroll = new BScroll('.orders-wrapper', {
				tap: true
			})
		},
		activated() {
			this.$bus.$emit('setHeader', {
				title: '订单汇总',
				back: false
			})
			if (this.scroll) {
				this.scroll.refresh()
			}
		},
		methods: {
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

	.trade-sum-wrapper
		position: relative
		height: 100%
		overflow: hidden
	.orders-wrapper
		height: 100%
		overflow: hidden
	.orders
		padding: 0 15px
	.order
		display: flex
		align-items: center
		height: 100px
		font-size: 13px
		color: #333
		padding-right: 5px
		.order-image
			flex-shrink: 0
			width: 80px
			height: 80px
		.order-text
			flex-grow: 1
			line-height: 1.3
			padding-left: 10px
			.order-title
				margin-bottom: 4px
			.order-descs
				color: #888
				margin-bottom: 4px
		.order-price
			flex-shrink: 0
			width: 45px
			text-align: right
		.order-num
			flex-shrink: 0
			width: 30px
			text-align: right
		.yuan
			font-size: 12px
			transform: scale(0.8)
		& + &
			border-top: 1px solid #ddd
</style>