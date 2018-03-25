<template>
	<div class="menu-wrapper">
		<div class="menus">
			<div class="menu-head">订单管理</div>
			<div class="menu" :class="{'active': menu.active}" v-for="menu in menus" @click="menuTap(menu)">{{menu.title}}</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	import Vue from 'vue'

	export default {
		data() {
			return {
				menus: [{
					id: 1,
					title: '订单编辑',
					path: '/trade-edit-wrapper'
				}, {
					id: 2,
					title: '订单发货',
					path: '/trade-delivery'
				}]
			}
		},

		created() {
		},

		methods: {
			menuTap(menu) {
				for (let i in this.menus) {
					Vue.set(this.menus[i], 'active', false)
					if (this.menus[i].id == menu.id) {
						Vue.set(this.menus[i], 'active', true)
					}
				}
				this.$router.push(menu.path)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
	.menu-wrapper
		padding: 20px
		.menus
			border: 1px solid #ccc
			.menu-head
				display: flex
				align-items: center
				justify-content: center
				height: 40px
				background-color: #f0f0f0
			.menu
				display: flex
				align-items: center
				justify-content: center
				height: 50px
				border-bottom: 1px solid #ccc
				&:last-child
					border: 0
				&.active
					color: #f63
</style>