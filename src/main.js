import Vue from 'vue'
import App from './App'

// I'd much rather only download the few I'll use rather than the 90MB+ node
//  module, but I can't figure out how to do that yet...So dumb.
import 'material-design-icons/iconfont/material-icons.css'
// import './assets/fonts/material-icons.css'

// Same with the font...
// import './assets/fonts/roboto.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

// Set up Vue Material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)

Vue.material.theme.register('default', {
  primary: 'purple',
  accent: 'red'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
