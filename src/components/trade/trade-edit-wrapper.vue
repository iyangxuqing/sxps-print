<template>
	<div class="page-wrapper">
		<TradeEdit></TradeEdit>
		<GoodsBuyer></GoodsBuyer>
		<Purchase></Purchase>
		<PurchasePost></PurchasePost>
	</div>
</template>

<script type="text/ecmascript-6">

	import TradeEdit from '@/components/trade/trade-edit'
	import GoodsBuyer from '@/components/goods/goods-buyer'
	import Purchase from '@/components/purchase/purchase'
	import PurchasePost from '@/components/purchase/purchase-post'

	export default {
		name: 'TradeEditWrapper',
		components: {
			TradeEdit,
			GoodsBuyer,
			Purchase,
			PurchasePost
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.page-wrapper
		position: relative
		width: 450px
		height: 100%
		overflow: hidden
		border: 1px solid #ccc
</style>