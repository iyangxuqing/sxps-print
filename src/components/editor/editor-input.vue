<template>
		<div class="editor-wrapper" :class="{'show': show}">
			<div class="editor">
				<div class="editor-title">{{title}}</div>
				<div class="editor-input"><input :value="value" v-money :placeholder="placeholder" @keyup.enter="inputEnter" @blur="inputBlur" :maxlength="maxlength" ref="input"></div>
				<div class="editor-buttons">
					<div class="editor-button cancel" @click="cancel">取消</div>
					<div class="editor-button confirm" @click="confirm">确定</div>
				</div>
			</div>
		</div>
</template>

<script type="text/ecmascript-6">

	import Vue from 'vue'

	export default {
		data() {
			return {
				title: '',
				value: '',
				placeholder: '',
				maxlength: 6,
				show: false
			}
		},
		created() {
			this.$bus.$on('editor-input', (options) => {
				this.show = true
				this.title = options.title
				this.value = options.value
				this.maxlength = options.maxlength
				this.placeholder = options.placeholder
				this.options = options
				setTimeout(() => {
					this.$refs.input.focus()
				}, 20)
			})
		},		
		methods: {
			inputEnter(e) {
				e.target.blur()
				this.value = e.target.value
				this.confirm()
			},
			inputBlur(e) {
				this.value = e.target.value
			},
			cancel() {
				this.show = false
			},
			confirm() {
				this.options.value = this.value
				this.$bus.$emit('editor-input-confirm', this.options)
				this.cancel()
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.editor-wrapper
		position: absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		z-index: 1000
		display: none
		&.show
			display: block
		background: rgba(0, 0, 0, 0.5)
		.editor
			position: fixed
			top: 45%
			left: 50%
			transform: translate(-50%, -50%)
			width: 280px
			height: 180px
			color: #345
			border-radius: 5px
			background: #fff
			display: flex
			flex-direction: column
		.editor-title
			height: 50px
			display: flex
			align-items: center
			justify-content: center
			letter-spacing: 2px
		.editor-input
			flex-grow: 1
			display: flex
			align-items: center
			padding: 0 40px 20px
			input
				width: 100%
				padding: 5px
				user-select: text
				text-align: center
				border: 1px solid #ccc
		.editor-buttons
			height: 44px
			display: flex
			align-items: center
			justify-content: center
			border-top: 1px solid #ddd
			.editor-button
				width: 100%
				height: 100%
				display: flex
				align-items: center
				justify-content: center
				letter-spacing: 2px
				cursor: pointer
				&.editor-button.confirm
					color: #f63
				&.editor-button.cancel
					color: #678
					border-right: 1px solid #ddd
</style>