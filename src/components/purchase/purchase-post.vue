<template>
	<div class="actionsheet-wrapper" :class="{'show': show}" @click="cancel">
		<div class="actionsheet" ref="actionsheet" @click.stop="actionsheetTap">
			<div class="post">
				<div class="post-head">采购说明</div>
				<div class="post-body">
					<div class="post-image">
						<ImageUpload v-model="image"></ImageUpload>
					</div>
					<div class="post-message">
						<textarea placeholder="输入采购说明" v-model="message" maxlength="50"></textarea>
					</div>
				</div>
			</div>
			<div class="actionsheet-row actionsheet-buttons">
				<div class="actionsheet-button cancel" @click="cancel">取 消</div>
				<div class="actionsheet-button confirm" @click="confirm">确 定</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	import Vue from 'vue'
	import ImageUpload from '@/base/image-upload/image-upload'

	export default {
		data() {
			return {
				show: false,
				image: '',
				message: ''
			}
		},
		created() {
			this.$bus.$on('purchase-post', (order) => {
				this.show = true
				this.id = order.id
				this.tid = order.tid
				this.image = order.image
				this.message = order.message
				this._setHeight()
			})
		},
		methods: {
			actionsheetTap(e) {
				e.stopPropagation()
			},			
			cancel(e) {
				this.$refs.actionsheet.style.height = 0
				this.show = false
			},
			confirm() {
				this.$bus.$emit('purchase-confirm', [{
					id: this.id || Date.now() + '',
					tid: this.tid,
					image: this.image,
					message: this.message
				}])
				this.cancel()
			},
			_setHeight() {
				setTimeout(() => {
					let height = 0
					this.children = this.$refs.actionsheet.children
					for (let i = 0; i < this.children.length; i++) {
						let child = this.children[i]
						height += child.clientHeight
					}
					this.$refs.actionsheet.style.height = height + 'px'
				}, 20)
			}
		},
		components: {
			ImageUpload
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

	.actionsheet-wrapper
		position: absolute
		left: 0
		right: 0
		bottom: 0
		height: 0
		z-index: 9999
		background: rgba(0, 0, 0, 0.4)
		&.show
			height: 100%
		.actionsheet
			position: absolute
			left: 0
			right: 0
			bottom: 0
			height: 0
			background-color: #fff
			transition: all 300ms ease
			transform: translate3d(0, 0, 0)
			.actionsheet-row
				display: flex
				align-items: center
				height: 60px
				padding: 0 15px
				border-top: 1px solid #ddd
			.actionsheet-buttons
				justify-content: space-between
				font-size: 14px
				.actionsheet-button
					display: flex
					align-items: center
					justify-content: center
					width: 120px
					height: 32px
					border-radius: 5px
					border: 1px solid #ddd
					&.confirm
						color: #fff
						background-color: #f93
						border: 1px solid transparent
						
	.post
		.post-head
			display: flex
			align-items: center
			justify-content: center
			height: 50px
			letter-spacing: 3px
			border-bottom: 1px solid #ddd
		.post-body
			display: flex
			padding: 15px
			align-items: center
			.post-image
				flex-shink: 0
				width: 100px
				height: 100px
				margin-right: 15px
			.post-message
				flex-grow: 1
				height: 100px
				textarea
					width: 100%
					height: 100%
					padding: 10px
					resize: none
					outline: none
					box-sizing: border-box
					border: 1px solid #ddd
</style>