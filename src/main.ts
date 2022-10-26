import { createApp } from 'vue'
import { App } from './App'
import { router } from './router'
import 'vant/lib/index.css'
import '@svgstore'

createApp(App).use(router).mount('#app')
