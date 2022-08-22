import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { P1 } from '../components/welcome/P1'
import { P2 } from '../components/welcome/P2'
import { P3 } from '../components/welcome/P3'
import { P4 } from '../components/welcome/P4'
import { Welcome } from '../views/Welcome'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: Welcome,
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', component: P1 },
      { path: '2', component: P2 },
      { path: '3', component: P3 },
      { path: '4', component: P4 }
    ]
  }
]

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})
