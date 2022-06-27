import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import './routes/guards'
import App from './App.vue'

createApp(App)
.use(createPinia())
.use(router)
.mount('#app')
