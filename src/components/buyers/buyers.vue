<template>
	<div class="buyers-wrapper">
		<Header @back="back"></Header>
		<div class="buyers">
			<div class="buyer" v-for="buyer in buyers" @tap="buyerTap(buyer)">
				<div class="buyer-row">
					<div class="buyer-name">{{buyer.receive_name}}</div>
					<div class="buyer-phone">{{buyer.receive_phone || buyer.mobileNumber}}</div>
				</div>
				<div class="buyer-row">
					<div class="buyer-address">{{buyer.receive_district + buyer.receive_address}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { getBuyersByTrades } from '@/api/buyer'
	import BScroll from '@/base/better-scroll/src'
	import Header from '@/components/header/header'
	
	export default {
		data() {
			return {
				buyers: []
			}
		},
		created() {
			getBuyersByTrades().then((buyers) => {
				this.buyers = buyers
			})
		},
		mounted() {
			this.scroll = new BScroll('.buyers-wrapper', {
				tap: true
			})
		},
		activated() {
			this.$bus.$emit('setHeaderTitle', '买家列表')
		},
		methods: {
			buyerTap(buyer) {
				this.$bus.$emit('selectedTradeBuyer', buyer)
				this.back()
			},
			back() {
				this.$router.go(-1)
			}
		},
		components: {
			Header
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.buyers-wrapper
		height: 100%
		.buyers
			.buyer
				display: flex
				flex-direction: column
				justify-content: center
				height: 60px
				padding-left: 20px
				padding-right: 20px
				border-bottom: 1px solid #ddd
				.buyer-row
					display: flex
					.buyer-name
						width: 60px
					.buyer-address
						color: #888
				.buyer-row + .buyer-row
					margin-top: 6px

</style>