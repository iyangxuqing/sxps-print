<template>
  <div id="app">
  	<div class="menu-container no-print">
  		<Menu/>
  	</div>
  	<div class="content-container">
	 		<keep-alive>
		    <router-view/>
	 		</keep-alive>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">

	import Menu from '@/components/menu/menu'
	
	export default {
	  name: 'App',
	  data() {
	  	return {}
	  },
	  created() {
	  },
	  components: {
	  	Menu
	  }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

	@media print
		.no-print
			display: none

	#app
		height: 100%
		.menu-container
			position: fixed
			top: 0
			left: 0
			width: 300px
		.content-container
			position: relative
			width: 800px
			height: 100%
			margin-left: 300px
			@media print
				margin-left: 0
</style>
