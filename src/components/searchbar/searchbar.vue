<template>
	<div class="searchbar">
		<div class="search-label">搜索</div>
		<div class="search-input">
			<input :placeholder="placeholder" v-model="searchWord" @keyup.enter="inputEnter">
			<div class="search-cancel" v-show="searchWord" @click="cancel">
				<div class="search-cancel-inner"><img src="@/common/image/plus.png"></div>
			</div>
		</div>
		<div class="search-button" @click="search"><img src="@/common/image/search.png"></div>
	</div>
</template>

<script type="text/ecmascript-6">

	export default {
		props: {
			id: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '输入关键字进行搜索'
			}
		},
		data() {
			return {
				searchWord: '',
				oldSearchWord: ''
			}
		},
		methods: {
			inputEnter(e) {
				e.target.blur()
				this.search()
			},
			cancel() {
				this.searchWord = ''
				this.search()
			},
			search() {
				if (this.searchWord != this.oldSearchWord) {
					this.oldSearchWord = this.searchWord
					this.$emit('search', this.searchWord)
					this.$bus.$emit('search-' + this.id, this.searchWord)
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.searchbar
		display: flex
		align-items: center
		width: 100%
		color: #333
		background-color: #fff
		.search-label
			flex-shrink: 0
			display: flex
			align-items: center
			justify-content: center
			width: 40px
			letter-spacing: 2px
		.search-input
			flex-grow: 1
			display: flex
			align-items: center
			justify-content: space-between
			height: 32px
			border-radius: 5px
			border: 1px solid #ddd
			input
				flex-grow: 1
				padding: 3px 10px
				outline: none
				color: #333
			.search-cancel
				flex-shrink: 0
				width: 32px
				height: 32px
				padding: 6px
				transform: rotate(45deg)
				.search-cancel-inner
					width: 100%
					height: 100%
					padding: 2px
					border-radius: 50%
					border: 1px solid #ddd
					img
						width: 100%
						height: 100%
		.search-button
			flex-shrink: 0
			width: 32px
			height: 32px
			padding: 6px
			img
				width: 100%
				height: 100%
</style>