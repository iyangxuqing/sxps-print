<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="title">订单编辑</div>
			<div class="search-wrapper">
				<DateTimeRange @change="dateTimeRangeChange" style="margin-right: 10px"></DateTimeRange>
				<SearchBar id="trade-search" placeholder="订单号、电话、姓名搜索" @search="search"></SearchBar>
			</div>
		</div>
		<div class="trades-wrapper">
			<div class="trades">
				<div class="trade" v-for="trade in Trades">
					<div class="trade-info">
						<div class="trade-labels">
							<div class="trade-label tid">订单编号：{{trade.id}}</div>
							<div class="trade-label time">提交时间：{{trade.time}}</div>
							<div class="trade-label">
								<span class="trade-label-name">收货姓名：{{trade.name}}</span>
								<span class="trade-label-phone">{{trade.phone}}</span>
							</div>
							<div class="trade-label">收货地址：{{trade.address}}</div>
						</div>
						<div class="trade-labels">
							<div class="trade-status">{{trade.status}}</div>
							<div class="trade-button" @click="delivery(trade)">发货</div>
						</div>
					</div>
					
					<div class="trade-orders">
						<div class="order" v-for="(order, index) in trade.orders">
							<div class="order-no print">{{index + 1}}</div>
							<div class="order-image" :style="'background-image:url(' + order.image +')'"></div>
							<div class="order-text">
								<div class="order-text-title" v-if="order.title">{{order.title}}<span v-if="order.specs"> - {{order.specs}}</span></div>
								<div class="order-text-descs" v-if="order.descs">商品备注：{{order.descs}}</div>
								<div class="order-text-message" v-if="order.message">买家留言：{{order.message}}</div>
							</div>
							<div class="order-price" @click="priceTap(trade, order, $event)">
								<div class="yuan">￥</div>
								<div :class="{'input-number': !order.iid}">{{order.price}}</div>
							</div>
							<div class="order-num">
								<div class="order-label">预订：</div>
								<div class="order-value">{{order.num}}</div>
							</div>
							<div class="order-realNum" @click="realNumTap(trade, order, $event)">
								<div class="order-label">实发：</div>
								<div class="order-value">{{order.realNum}}</div>
							</div>
						</div>
					</div>

					<div class="trade-counts">
						<div class="trade-count">
							<div class="trade-count-col">合计 预订 数量：<span class="num">{{trade.num}}</span></div>
							<div class="trade-count-col">金额：<span class="money"><span class="yuan">￥</span>{{trade.amount}}</span></div>
						</div>
						<div class="trade-count">
							<div class="trade-count-col">实发 数量：<span class="num">{{trade.realNum}}</span></div>
							<div class="trade-count-col">金额：<span class="money"><span class="yuan">￥</span>{{trade.realAmount}}</span></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<InputNumber></InputNumber>
	</div>
</template>

<script type="text/ecmascript-6">

	// import Vue from 'vue'
	import { getTrades, setTrade } from '@/api/trade'
	import InputNumber from '@/components/editor/input-number'
	import SearchBar from '@/components/searchbar/searchbar'
	import DateTimeRange from '@/components/datetime-range/datetime-range'

	export default {
		name: 'TradeEdit',
		data() {
			return {
				trades: [],
				starttime: 0,
				endtime: 0,
				searchWord: ''
			}
		},
		computed: {
			Trades() {
				let starttime = this.starttime / 1000
				let endtime = this.endtime / 1000
				let searchWord = this.searchWord

				return this.trades.filter((trade) => {
					let c1 = trade.status == '买家提交'
					let c2 = trade.created > starttime && trade.created <= endtime
					let c3 = trade.id == searchWord || trade.phone == searchWord || trade.name.indexOf(searchWord) >= 0
					let cc = c1 && c2 && c3
					return cc
				})
			}
		},
		created() {

			getTrades().then((trades) => {
				this.trades = trades
			})			

			this.$bus.$on('search-trade-search', (searchWord) => {
				console.log(searchWord)
			})

		},

		methods: {
		
			dateTimeRangeChange({starttime, endtime}) {
				this.starttime = starttime
				this.endtime = endtime
			},
		
			search(searchWord) {
				this.searchWord = searchWord
			},
		
			priceTap(trade, order, e) {
				if (!order.iid) {
					this.$bus.$emit('input-number', {
						target: e.target,
						value: order.price,
						input: (value) => {
							order.price = value
							this._tradeCount(trade)
						}
					})
				}
			},
		
			realNumTap(trade, order, e) {
				this.$bus.$emit('input-number', {
					target: e.target,
					value: order.realNum,
					input: (value) => {
						order.realNum = value
						this._tradeCount(trade)
					}
				})
			},

			delivery(trade) {
				let complete = true
				for (let i in trade.orders) {
					let order = trade.orders[i]
					if (order.realNum === '' || order.price === '') {
						complete = false
						break
					}
				}
				if (complete) {
					let _trade = {
						id: trade.id,
						status: '卖家发货'
					}
					_trade.orders = []
					for(let i in trade.orders) {
						_trade.orders.push({
							id: trade.orders[i].id,
							realNum: trade.orders[i].realNum
						})
					}
					setTrade(_trade).then((res) => {
						if (res.errno === 0) {
							trade.status = '卖家发货'
						} else {
							this.$Message.error({
								content: '发货操作失败，请稍后再试。',
								closable: true,
								duration: 0
							})
						}
					})
				} else {
					this.$Message.error({
						content: '还有菜品没有配货，不可操作发货。',
            closable: true,
            duration: 0
					})
				}
			},

			_tradeCount(trade) {
				console.log(trade)
				let num = 0
				let amount = 0
				let realNum = 0
				let realAmount = 0
				for (let i in trade.orders) {
					let order = trade.orders[i]
					num += Number(order.num)
					amount += Number(order.num * order.price)
					realNum += Number(order.realNum)
					realAmount += Number(order.realNum * order.price)
				}
				trade.num = num
				trade.amount = amount.toFixed(2)
				trade.realNum = realNum
				trade.realAmount = realAmount.toFixed(2)
			}
		},

		components: {
			SearchBar,
			InputNumber,
			DateTimeRange
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

	.print
		display: none
		
	@media print
		.print
			display: block

	.page-wrapper
		position: relative
		width: 800px
		padding-top: 120px
		padding-bottom: 20px
		.header
			position: fixed
			top: 0
			left: 300px
			width: 800px
			height: 110px
			padding-top: 20px
			background-color: #fff
			.title
				display: flex
				align-items: center
				justify-content: center
				height: 40px
				background-color: #f0f0f0
			.search-wrapper
				display: flex
				align-items: center
				height: 50px
				padding: 0 10px
				border: 1px solid #ddd
	.trade
		font-size: 14px
		line-height: 1.2
		color: #333
		border: 1px solid #ccc
		page-break-before: always
		.yuan
			font-size: 12px
		& + &
			margin-top: 10px
		.trade-info
			display: flex
			align-items: center
			justify-content: space-between
			height: 86px
			padding-left: 15px
			padding-right: 15px
			background-color: #f0f0f0
			.trade-status
				display: flex
				align-items: center
				justify-content: center
				width: 80px
				height: 30px
				color: #888
			.trade-button
				display: flex
				align-items: center
				justify-content: center
				width: 80px
				height: 30px
				font-size: 13px
				letter-spacing: 2px
				border-radius: 5px
				border: 1px solid #ccc
		.order
			display: flex
			align-items: center
			min-height: 80px
			padding: 5px 15px
			border-top: 1px solid #ccc
			.order-no
				position: absolute
				width: 70px
				height: 70px
				line-height: 70px
				text-align: center
			.order-image
				flex-shrink: 0
				width: 70px
				height: 70px
				background-repeat: no-repeat
				background-position: center center
				background-size: cover
			.order-text
				flex-grow: 1
				display: flex
				flex-direction: column
				justify-content: center
				padding-left: 10px
				padding-right: 20px
				.order-text-title
					font-size: 14px
				.order-text-descs
					font-size: 13px
					color: #666
					margin-top: 3px
				.order-text-message
					font-size: 13px
					color: #666
					margin-top: 3px
			.order-price
				flex-shrink: 0
				display: flex
				align-items: center
				justify-content: flex-end
				width: 120px
				.input-number
					display: flex
					align-items: center
					justify-content: flex-end
					width: 60px
					height: 24px
					padding: 5px
					border: 1px solid #ccc
			.order-num
				flex-shrink: 0
				display: flex
				align-items: center
				justify-content: flex-end
				width: 120px
				.order-label
					font-size: 13px
					color: #666
				.order-value
					display: flex
					align-items: center
					width: 24px
			.order-realNum
				flex-shrink: 0
				display: flex
				align-items: center
				justify-content: flex-end
				width: 120px
				.order-label
					font-size: 13px
					color: #666
				.order-value
					display: flex
					align-items: center
					justify-content: flex-end
					width: 60px
					height: 24px
					padding: 5px
					border: 1px solid #ccc
		
		.trade-counts
			display: flex
			flex-direction: column
			align-items: flex-end
			justify-content: center
			height: 60px
			padding-left: 15px
			padding-right: 15px
			background-color: #f0f0f0
			border-top: 1px solid #ccc
			.trade-count
				display: flex
				align-items: center
				& + .trade-count
					margin-top: 5px
				.trade-count-col
					width: 160px
					text-align: right
					.num
						display: inline-block
						width: 30px
						text-align: right
					.money
						display: inline-block
						width: 70px
						text-align: right
</style>