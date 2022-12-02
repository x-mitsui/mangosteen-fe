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
import { StartPage } from '../views/StartPage'
import { ItemPage } from '../views/ItemPage'
import { ItemCreate } from '../components/item/ItemCreate'
import { ItemList } from '../components/item/ItemList'
import { TagCreate } from '../components/tag/TagCreate'
import { TagEdit } from '../components/tag/TagEdit'
import { SignInPage } from '../views/SignInPage'
import { Statistics } from '../components/statistics/StatisticsPage'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: Welcome,
    beforeEnter: (to, from, next) => {
      localStorage.getItem('skip') === 'yes' ? next('/start') : next()
    },
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: 'Welcome1', components: { main: P1Main, footer: P1Footer } },
      { path: '2', name: 'Welcome2', components: { main: P2Main, footer: P2Footer } },
      { path: '3', name: 'Welcome3', components: { main: P3Main, footer: P3Footer } },
      { path: '4', name: 'Welcome4', components: { main: P4Main, footer: P4Footer } }
    ]
  },
  { path: '/start', name: 'start', component: StartPage },
  {
    path: '/item',
    name: 'item',
    component: ItemPage,
    children: [
      {
        path: '/item/create',
        name: 'itemCreate',
        component: ItemCreate
      },
      {
        path: '/item/list',
        name: 'itemList',
        component: ItemList
      }
    ]
  },
  {
    path: '/tag',
    name: 'tag',
    component: ItemPage,
    children: [
      {
        path: '/tag/create',
        name: 'tagCreate',
        component: TagCreate
      },
      {
        path: '/tag/:id/edit',
        name: 'tagEdit',
        component: TagEdit
      }
    ]
  },
  {
    path: '/sign_in',
    name: 'sign_in',
    component: SignInPage
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  }
]

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})
