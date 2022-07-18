import Vue from 'vue'
import App from './App.vue'

// EventBus 생성
Vue.prototype.$EventBus = new Vue()

new Vue({
  render: h => h(App)
}).$mount('#app')
