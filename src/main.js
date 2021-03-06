// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import { Message } from 'iview'
import '@/common/js/bus'
import '@/base/directive/v-money'
import '@/common/stylus/index.styl'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.prototype.$Message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
