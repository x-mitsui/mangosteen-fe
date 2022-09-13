import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { P1Main } from '../components/welcome/P1Main'
import { P1Footer } from '../components/welcome/P1Footer'
// import { P2 } from '../components/welcome/P2'
// import { P3 } from '../components/welcome/P3'
// import { P4 } from '../components/welcome/P4'
import { Welcome } from '../views/Welcome'
import { P2Main } from '../components/welcome/P2Main'
import { P3Main } from '../components/welcome/P3Main'
import { P4Main } from '../components/welcome/P4Main'
import { P2Footer } from '../components/welcome/P2Footer'
import { P3Footer } from '../components/welcome/P3Footer'
import { P4Footer } from '../components/welcome/P4Footer'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: Welcome,
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: 'Welcome1', components: { main: P1Main, footer: P1Footer } },
      { path: '2', name: 'Welcome2', components: { main: P2Main, footer: P2Footer } },
      { path: '3', name: 'Welcome3', components: { main: P3Main, footer: P3Footer } },
      { path: '4', name: 'Welcome4', components: { main: P4Main, footer: P4Footer } }
    ]
  }
]

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})
