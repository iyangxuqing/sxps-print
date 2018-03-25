<template>
	<div class="goods-buyer" :class="{'show': show}">
		<div class="close" @click="close">
			<div class="close-inner">
				<img src="@/common/image/plus.png">
			</div>
		</div>
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
				show: false,
				tid: ''
			}
		},
		created() {
			this.$bus.$on('goods-buyer', ({tid}) => {
				this.show = true
				this.tid = tid
			})
			this.$bus.$on('purchase-confirm', () => {
				this.show = false
			})
		},
		methods: {
			close() {
				this.show = false
			}
		},
		components: {
			CatesBuyer,
			ItemsBuyer
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.goods-buyer
		position: absolute
		bottom: 0
		z-index: 2
		width: 100%
		height: 0
		background: #fff
		transition: all 300ms ease
		.cates-container
			height: 90px
		.items-container
			height: calc(100% - 90px)
			overflow: hidden
			overflow-y: scroll
		&.show
			height: 100%
		.close
			position: absolute
			top: 0
			right: 0
			width: 44px
			height: 44px
			padding: 12px
			.close-inner
				width: 100%
				height: 100%
				padding: 3px
				border-radius: 50%
				border: 1px solid #aaa
				transform: rotate(45deg)
			
</style>