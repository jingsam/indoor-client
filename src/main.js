import 'iview/dist/styles/iview.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import Vue from 'vue'
import iview from 'iview'
import App from './views/App'
import Map from './components/Map'

Vue.use(iview)
Vue.component('Map', Map)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
