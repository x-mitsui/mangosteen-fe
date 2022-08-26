import { createApp } from 'vue'
import { App } from './App'
import { router } from './router'
import '@svgstore'

createApp(App).use(router).mount('#app')
