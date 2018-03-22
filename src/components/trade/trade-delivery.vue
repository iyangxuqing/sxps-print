<template>
	<div class="page trade-edit-wrapper">
		<div class="trades-wrapper">
			<div class="trades">
				<div class="trade" v-for="trade in trades">
					<div class="trade-info">
						<div class="trade-labels">
							<div class="trade-label tid">订单编号：{{trade.id}}</div>
							<div class="trade-label time">提交时间：{{trade.time}}</div>
							<div class="trade-label">
								<span class="trade-label-name">收货姓名：{{trade.receive_name}}</span>
								<span class="trade-label-phone">{{trade.receive_phone || trade.mobileNumber}}</span>
							</div>
							<div class="trade-label">收货地址：{{trade.receive_district}}{{trade.receive_address}}</div>
						</div>
						<div class="trade-labels">
							<div class="trade-label">{{trade.status}}</div>
						</div>
					</div>
					
					<div class="trade-orders">
						<div class="order" v-for="(order, index) in trade.orders" @tap="orderTap(order)">
							<div class="order-no print">{{index + 1}}</div>
							<div class="order-image" :style="'background-image:url(' + order.image +')'"></div>
							<div class="order-text">
								<div class="order-text-title" v-if="order.title">{{order.title}}<span v-if="order.specs"> - {{order.specs}}</span></div>
								<div class="order-text-descs" v-if="order.descs">商品备注：{{order.descs}}</div>
								<div class="order-text-message" v-if="order.message">买家留言：{{order.message}}</div>
							</div>
							<div class="order-price" @click="priceTap(order)">
								<div><span class="yuan">￥</span>{{order.price || '0.00'}}</div>
							</div>
							<div class="order-num">
								<div class="order-label">预订：</div>
								<div class="order-value">{{order.num}}</div>
							</div>
							<div class="order-realNum" @click="realNumTap(order)">
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
		<EditorInput></EditorInput>
	</div>
</template>

<script type="text/ecmascript-6">

	import Vue from 'vue'
	import { getTrades, setOrders } from '@/api/trade'
	import EditorInput from '@/components/editor/editor-input'

	export default {
		name: 'TradeEdit',
		data() {
			return {
				trades: []
			}
		},
		created() {
			this.$bus.$on('editor-input-confirm', (options) => {
				if (options.orderPrice) {
					options.order.price = Number(options.value).toFixed(2)
				}
				if (options.orderRealNum) {
					options.order.realNum = options.value
				}
				let tid = options.order.tid
				let trades = this.trades
				for (let i in trades) {
					if (trades[i].id == tid) {
						let num = 0
						let amount = 0
						let realNum = 0
						let realAmount = 0
						for (let j in trades[i].orders) {
							let order = trades[i].orders[j]
							num += Number(order.num)
							amount += Number(order.num * order.price)
							realNum += Number(order.realNum)
							realAmount += Number(order.realNum * order.price)
						}
						trades[i].num = num
						trades[i].amount = amount.toFixed(2)
						trades[i].realNum = realNum
						trades[i].realAmount = realAmount.toFixed(2)
						break
					}
				}
			})

			getTrades().then((trades) => {
				this.trades = trades
			})			
		},
		methods: {
			priceTap(order) {
				if (!order.iid) {
					this.$bus.$emit('editor-input', {
						type: 'money',
						title: '商品价格',
						value: order.price,
						placeholder: '输入商品价格',
						orderPrice: true,
						order: order
					})
				}
			},
			realNumTap(order) {
				this.$bus.$emit('editor-input', {
					type: 'money',
					title: '实发数量',
					value: order.realNum,
					placeholder: '输入实发数量',
					maxlength: 4,
					orderRealNum: true,
					order: order
				})
			},
			orderTap(order) {
				this.scrollY = this.scroll.y
				if (order.title) {
					this.$bus.$emit('purchase-show', {order})
				} else {
					this.$bus.$emit('purchase-post-show', order)
				}
			}
		},
		components: {
			EditorInput
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

	.print
		display: none
		
	@media print
		.print
			display: block

	.trade-edit-wrapper
		position: relative
		height: 100%
		overflow: hidden
	.trades-wrapper
		height: 100%
		overflow: hidden
	.trades
		padding-top: 20px
		padding-bottom: 20px
	.trade
		font-size: 14px
		line-height: 1.2
		color: #333
		border: 1px solid #aaa
		page-break-before: always
		.yuan
			font-size: 12px
		& + &
			margin-top: 20px
		.trade-info
			display: flex
			align-items: center
			justify-content: space-between
			height: 86px
			padding-left: 15px
			padding-right: 15px
			background-color: #f0f0f0
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
				margin-right: 60px
			.order-num
				flex-shrink: 0
				display: flex
				align-items: center
				justify-content: flex-end
				margin-right: 50px
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
				.order-label
					font-size: 13px
					color: #666
				.order-value
					display: flex
					align-items: center
					justify-content: flex-end
					width: 42px
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