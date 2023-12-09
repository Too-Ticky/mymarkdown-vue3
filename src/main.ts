import './assets/css/github-markdown.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'
// import { firebaseApp } from './composables/firebaseConfig.js'
import './composables/firebaseConfig' // Conposable for Firebase connection

// firebaseApp()
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
