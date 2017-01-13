import 'iview/dist/styles/iview.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import Vue from 'vue'
import iview from 'iview'
import store from './store'
import App from './App'

Vue.use(iview)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
  store
})
