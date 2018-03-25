<template>
		<div class="datetime-range-picker">
			<DatePicker type="datetime" :value="StartTime" placeholder="开始时间" @on-change="onStartChange" @on-ok="onOk"></DatePicker>
			<div class="hyphen"></div>
			<DatePicker type="datetime" :value="EndTime" placeholder="结束时间" @on-change="onEndChange" @on-ok="onOk"></DatePicker>
		</div>
</template>

<script type="text/ecmascript-6">
	
	import { DatePicker }  from 'iview'

	export default {
		name: 'DateTimeRange',
		props: {
			endtime: {
				type: Date,
				default: function() {
					let time = Date.now()
					return new Date(time)
				}
			},
			starttime: {
				type: Date,
				default: function() {
					let date = new Date()
					let year = date.getFullYear()
					let month = date.getMonth()
					let day = date.getDate()
					let hour = date.getHours()
					date = new Date(year, month, day, 0, 0, 0)
					if (hour < 12) {
						date.setHours(-12)
					}
					return date
				}
			}
		},
		data() {
			return {
				StartTime: this.starttime,
				EndTime: this.endtime,
			}
		},
		created() {
			this._StartTime = this.StartTime
			this._EndTime = this.EndTime
		},
		methods: {
			onStartChange(value) {
				this._StartTime = new Date(value)
			},
			onEndChange(value) {
				this._EndTime = new Date(value)
			},
			onOk() {
				if (this.StartTime != this._StartTime || this.EndTime != this._EndTime) {
					this.$emit('change', {
						starttime: this._StartTime.getTime(),
						endtime: this._EndTime.getTime()
					})
					this.StartTime = this._StartTime
					this.EndTime = this._EndTime
				}
			}
		},
		components: {
			DatePicker
		}
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.datetime-range-picker
		display: flex
		align-items: center
		min-width: 356px
		min-height: 32px
		width: 356px
		height: 32px
		.hyphen
			width: 10px
			height: 1px
			background-color: #aaa
			margin: 0 5px
</style>