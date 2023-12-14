import './assets/css/github-markdown.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPersistedState } from 'pinia-plugin-persistedstate'


import App from './App.vue'
import router from './router/index.js'
import './composables/firebaseConfig' /* Configration for Firebase connection */

const app = createApp(App)

const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)
pinia.use(createPersistedState({  // To make persistence of Pinia stores
  auto: true,
  storage: sessionStorage,
}))

app.use(pinia)
app.use(router)

app.mount('#app')
