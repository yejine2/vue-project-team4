import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import './routes/guards'
import BootstrapVue3 from 'bootstrap-vue-3'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import App from './App.vue'
// import Vue from 'vue'
// import App from './App.vue'

// EventBus 생성
// export const EventBus = new Vue()

// new Vue({
//   render: h => h(App)
// }).$mount('#app')


createApp(App)
  .use(createPinia())
  .use(router)
  .use(BootstrapVue3)
  .mount('#app')


