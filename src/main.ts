import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import ElFormPlus from './components/install'

import App from './app.vue'

import Draggable from 'vuedraggable'

Vue.use(ElementUI)
Vue.use(ElFormPlus, {
  components: { Draggable }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
