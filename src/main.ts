import { createApp } from 'vue'
import { App } from './App'
import { createPinia } from 'pinia'

import { router } from './router'
import 'vant/lib/index.css'
import '@svgstore'
import { useMeStore } from './stores/useMeStore'

createApp(App).use(createPinia()).use(router).mount('#app')
const meStore = useMeStore()
meStore.fetchMe()
