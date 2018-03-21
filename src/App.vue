<template>
  <div id="app">
 		<keep-alive>
	    <router-view/>
 		</keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
	
	export default {
	  name: 'App',
	  data() {
	  	return {}
	  },
	  created() {
	  },
	  components: {
	  }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	#app
		position: relative
		width: 800px
		margin: 0 auto
</style>
