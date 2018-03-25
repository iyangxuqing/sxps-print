<template>
	<div class="input-number" :class="{'show': show}" :style="style">
		<input :value="value" v-money :placeholder="placeholder" @keyup.enter="enter" @blur="blur" :maxlength="maxlength" ref="input">
	</div>
</template>

<script type="text/ecmascript-6">

	import Vue from 'vue'

	export default {
		data() {
			return {
				value: '',
				show: false,
				maxlength: 6,
				placeholder: '',
				style: {
					top: 0,
					left: 0,
					width: 0,
					height: 0
				}
			}
		},
		created() {
			this.$bus.$on('input-number', (options) => {
				this.show = true
				this.options = options
				this.value = options.value
				this.style.top = options.target.offsetTop + 'px'
				this.style.left = options.target.offsetLeft + 'px'
				this.style.width = options.target.offsetWidth + 'px'
				this.style.height = options.target.offsetHeight + 'px'
				this.$nextTick(() => {this.$refs.input.focus()} )
			})
		},		
		methods: {
			enter(e) {
				e.target.blur()
			},
			blur(e) {
				this.show = false
				this.value = e.target.value
				this.options.input && this.options.input(this.value)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.input-number
		position: absolute
		z-index: 1000
		display: none
		background: #fff
		border: 1px solid #ccc
		&.show
			display: block
		input
			width: 100%
			height: 100%
			outline: none
			text-align: right
			padding: 0 5px
			font-size: 14px
</style>