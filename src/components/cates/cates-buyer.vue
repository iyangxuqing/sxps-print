<template>
	<div>
		<div class="cates">
			<div class="cates-wrapper" v-if="cates.length">
				<HScroll>
					<div class="cate" v-for="cate in cates" :class="{active: cate.active}" @tap="cateTap(cate)">{{cate.title}}</div>
				</HScroll>
			</div>
			<div class="cates-wrapper" v-for="cate in cates" v-if="cate.active">
				<HScroll>
					<div class="cate" v-for="child in cate.children" :class="{active: child.active}" @tap="cateTap(child)">{{child.title}}</div>
				</HScroll>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	import Vue from 'vue'
	import HScroll from '@/base/hscroll/hscroll'
	import { getCates } from '@/api/cates'

	export default {
		data() {
			return {
				cates: []
			}
		},
		created() {
			getCates().then((cates) => {
				this.cates = cates
			})
		},
		watch: {
			cates: {
				handler: function() {
					let activeCateId = ''
					for (let i in this.cates) {
						if (this.cates[i].active == true) {
							for (let j in this.cates[i].children) {
								if (this.cates[i].children[j].active == true) {
									activeCateId = this.cates[i].children[j].id
									break
								}
							}
							break
						}
					}
					this.$bus.$emit('activeCateId', activeCateId)
				},
				deep: true
			}
		},		
		methods: {
			cateTap(cate) {
				let cates = this.cates
				if (cate.pid == 0) {
					for (let i in cates) {
						cates[i].active = false
						if (cates[i].id == cate.id) {
							cates[i].active = true
						}
					}
				} else {
					for (let i in cates) {
						if (cates[i].id == cate.pid) {
							for (let j in cates[i].children) {
								cates[i].children[j].active = false
								if (cates[i].children[j].id == cate.id) {
									cates[i].children[j].active = true
								}
							}
						}
					}
				}
			}
		},
		components: {
			HScroll
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.cates
		.cates-wrapper
			display: flex
			align-items: center
			height: 45px
			padding: 0 20px
			border-bottom: 1px solid #ddd
			.cate
				flex-shrink: 0
				display: flex
				align-items: center
				justify-content: center
				height: 100%
				padding: 10px
				cursor: pointer
				&:first-child
					padding-Left: 0
				&:last-child
					padding-right: 0
				&.active
					color: red
</style>