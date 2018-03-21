<template>
	<div class="items-wrapper">
		<div class="items">
			<div class="item" v-for="item in categoryItems" @tap="itemTap(item)">
				<div class="item-image"><img :src="item.specs[0].image"/></div>
				<div class="item-title">{{item.specs[0].title}}</div>
			</div>
		</div>
	</div>
 </template>

<script type="text/ecmascript-6">

	import BScroll from '@/base/better-scroll/src'
	import { getItems } from '@/api/items'

	export default {
		props: {
			tid: {
				type: String,
				default: ''
			}
		},
	 	data() {
	 		return {
	 			cid: '',
	 			items: [],
	 			categoryItems: []
	 		}
 		},
		created() {
			this.$bus.$on('activeCateId', (cid) => {
				this.cid = cid
			})
			this.$bus.$on('purchase-confirm', () => {
				// 在订单编辑TradeEdit或商品选购GoodsBuyer进入购买，完成后都会触发purchase-confirm事件
				// 由于应用了keep-alive组件，组件加载过后仍然留在内存中，
				// 因此即使ItemsBuyer组件不再处于活动状态，它仍能响应purchase-confirm事件。
				// 应该是仅在ItemsBuyer组件本身处于活动状态时，执行该事件
				if (this.$route.name == 'TradeEdit-GoodsBuyer') {
					this.$router.push({
						name: 'TradeEdit'
					})
				}
			})
			getItems({onShelf: 1}).then((items) => {
				this.items = items
				setTimeout(() => {
					this.scroll = new BScroll('.items-wrapper', { tap: true })
				}, 20)
			})
		},
		watch: {
			'cid': function() {
				let _items = []
				for (let i in this.items) {
					if (this.items[i].cid == this.cid) {
						_items.push(this.items[i])
					}
				}
				this.categoryItems = _items
				this.scroll && this.scroll.scrollTo(0, 0)
			},
			'items': function() {
				let _items = []
				for (let i in this.items) {
					if (this.items[i].cid == this.cid) {
						_items.push(this.items[i])
					}
				}
				this.categoryItems = _items
			}			
		},
		methods: {
			itemTap(item) {
				this.$bus.$emit('purchase-show', {
					tid: this.tid,
					item: item
				})
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

	.items-wrapper
		position: relative
		height: 100%
		overflow: hidden
		.items
			display: flex
			flex-wrap: wrap
			padding: 15px
			.item
				$width = calc((100vw - 60px)/3)
				width: $width
				margin-bottom: 5px
				cursor: pointer
				position: relative
				&:nth-of-type(3n+2)
					margin-left: 15px
					margin-right: 15px
				.item-image
					width: 100%
					height: $width
					img
						width: 100%
						height: 100%
				.item-title
					height: 36px
					line-height: 30px
					text-align: center
					font-size: 13px
				&.offshelf::after
					content: ''
					position: absolute
					left: 10%
					bottom: 20px
					width: 80%
					height: 1px
					background: red			
			.item-new
				.item-image
					padding: 30px
					opacity: 0.3
					border: 1px solid #333
	.pc 
		.items
			.item
				width: calc((100% - 30px)/3)
				.item-image
					height: 104px					
</style>