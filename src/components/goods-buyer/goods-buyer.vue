<template>
	<div class="goods">
		<div class="cates-container">
			<CatesBuyer></CatesBuyer>
		</div>
		<div class="items-container">
			<ItemsBuyer :tid="tid"></ItemsBuyer>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import CatesBuyer from '@/components/cates/cates-buyer'
	import ItemsBuyer from '@/components/items/items-buyer'

	export default {
		data() {
			return {
				tid: ''
			}
		},
		created() {
			this.$bus.$on('back', () => {
				this.$router.go(-1)
			})
		},		
		activated() {
			this.tid = this.$route.params.tid
			let pageBack = this.$route.params.pageBack || false
			let pageTitle = this.$route.params.pageTitle || '商品'
			this.$bus.$emit('setHeader', {
				title: pageTitle,
				back: pageBack
			})
		},
		components: {
			CatesBuyer,
			ItemsBuyer
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.goods
		position: absolute
		top: 0
		left: 0
		z-index: 9999
		width: 100%
		height: 100%
		background: #fff
		.cates-container
			height: 90px
		.items-container
			height: calc(100% - 90px)
</style>