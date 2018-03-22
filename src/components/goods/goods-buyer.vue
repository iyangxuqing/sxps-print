<template>
	<div class="goods">
		<div class="cates-container">
			<CatesBuyer></CatesBuyer>
		</div>
		<div class="items-container">
			<ItemsBuyer :tid="order.tid"></ItemsBuyer>
		</div>
		<Purchase></Purchase>
	</div>
</template>

<script type="text/ecmascript-6">
	import CatesBuyer from '@/components/cates/cates-buyer'
	import ItemsBuyer from '@/components/items/items-buyer'
	import Purchase from '@/components/purchase/purchase'

	export default {
		data() {
			return {
				order: {}
			}
		},
		created() {
			this.$bus.$on('back', () => {
				this.$router.go(-1)
			})
		},		
		activated() {
			this.order = this.$route.params.order
			let pageBack = this.$route.params.pageBack || false
			let pageTitle = this.$route.params.pageTitle || '商品'
			this.$bus.$emit('setHeader', {
				title: pageTitle,
				back: pageBack
			})
			this.$bus.$emit('purchase-show', this.order)
		},
		components: {
			CatesBuyer,
			ItemsBuyer,
			Purchase
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.goods
		position: relative
		width: 450px
		height: 100%
		background: #fff
		border: 1px solid #ccc
		.cates-container
			height: 90px
		.items-container
			height: calc(100% - 90px)
			overflow: hidden
			overflow-y: scroll
</style>