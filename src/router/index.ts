import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import { P1Main } from '../components/welcome/P1Main'
import { P1Footer } from '../components/welcome/P1Footer'
import { Welcome } from '../views/Welcome'
import { P2Main } from '../components/welcome/P2Main'
import { P3Main } from '../components/welcome/P3Main'
import { P4Main } from '../components/welcome/P4Main'
import { P2Footer } from '../components/welcome/P2Footer'
import { P3Footer } from '../components/welcome/P3Footer'
import { P4Footer } from '../components/welcome/P4Footer'
import { ItemPage } from '../views/ItemPage'
import { ItemCreate } from '../components/item/ItemCreate'
import { ItemList } from '../components/item/ItemList'
import { TagCreate } from '../components/tag/TagCreate'
import { TagEdit } from '../components/tag/TagEdit'
import { SignInPage } from '../views/SignInPage'
import { Statistics } from '../components/statistics/StatisticsPage'
import { fetchMe, mePromise } from '../shared/RefreshMe'
import { ComingSoon } from '../shared/ComingSoon'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: Welcome,
    beforeEnter: (to, from, next) => {
      localStorage.getItem('skip') === 'yes' ? next('/item') : next()
    },
    children: [
      { path: '/welcome', redirect: '/welcome/1' },
      { path: '1', name: 'Welcome1', components: { main: P1Main, footer: P1Footer } },
      { path: '2', name: 'Welcome2', components: { main: P2Main, footer: P2Footer } },
      { path: '3', name: 'Welcome3', components: { main: P3Main, footer: P3Footer } },
      { path: '4', name: 'Welcome4', components: { main: P4Main, footer: P4Footer } }
    ]
  },
  {
    path: '/item',
    name: 'item',
    component: ItemPage,

    children: [
      { path: '/item', redirect: '/item/list' },
      {
        path: '/item/list',
        name: 'itemList',
        component: ItemList
      },
      {
        path: '/item/create',
        name: 'itemCreate',
        component: ItemCreate
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
  },
  {
    path: '/export',
    component: ComingSoon
  },
  {
    path: '/notify',
    component: ComingSoon
  }
]

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})
fetchMe()

router.beforeEach(async (to, from) => {
  if (
    to.path.startsWith('/welcome') ||
    to.path.startsWith('/sign_in') ||
    to.path === '/' ||
    to.path === '/item'
  ) {
    return true
  } else {
    const path = await mePromise!.then(
      () => true,
      () => '/sign_in?return_to=' + encodeURIComponent(to.path)
    )
    return path
  }
})
