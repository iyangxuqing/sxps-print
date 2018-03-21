<template>
	<div class="tabbar">
		<div class="tab" :class="{'active': tab.active}" v-for="tab in tabs" @click="tabTap(tab)">{{tab.text}}</div>
	</div>
</template>

<script type="text/ecmascript-6">

	import Vue from 'vue'

	export default {
		data() {
			return {
				tabs: [{
					id: 1,
					text: '商品',
					path: '/goods-buyer'
				}, {
					id: 2,
					text: '订单',
					path: '/trade-edit'
				}, {
					id: 3,
					text: '采购',
					path: '/trade-sum'
				}, {
					id: 4,
					text: '打印',
					path: '/trade-sum-print'
				}, {
					id: 5,
					text: '账单'
				}]
			}
		},

		/* 当页面初次载入或刷新时，根据路径设置tab激活 */
		created() {
			let path = this.$route.path
			this.updateActive(path)
		},

		/* 当在地址栏手工输入页面地址时，根据路径设置tab激活 */
		watch: {
			'$route': function(to, from) {
				let path = to.path
				this.updateActive(path)
			}
		},
		
		methods: {
			tabTap(tab) {
				for (let i in this.tabs) {
					Vue.set(this.tabs[i], 'active', false)
					if (this.tabs[i].id == tab.id) {
						Vue.set(this.tabs[i], 'active', true)
					}
				}
				this.$router.replace({
					path: tab.path
				})
			},
			updateActive(path) {
				let tabs = this.tabs
				for (let i in tabs) {
					Vue.set(tabs[i], 'active', false)
					if (path == tabs[i].path) {
						Vue.set(tabs[i], 'active', true)
					}
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.tabbar
		position: absolute
		display: flex
		align-items: center
		width: 100%
		height: 45px
		padding: 0 15px
		border-top: 1px solid #ddd
		.tab
			flex-basis: 0
			flex-grow: 1
			display: flex
			align-items: center
			justify-content: center
			height: 100%
			cursor: pointer
			&.active
				color: #f63
</style>