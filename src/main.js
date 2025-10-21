// 引入tDesign组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css'
import 'virtual:uno.css'
import '@/assets/style/index.css'
import 'animate.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.mount('#app')
