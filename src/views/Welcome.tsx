import { defineComponent, ref, Transition, VNode, watch } from 'vue'
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router'
import s from './Welcome.module.scss'
import { useSwipe } from '../../hooks/useSwipe'
import { throttle } from '../shared/throttle'
const PathTable: Record<string, string> = {
  Welcome1: '/welcome/2',
  Welcome2: '/welcome/3',
  Welcome3: '/welcome/4',
  Welcome4: '/start'
}
export const Welcome = defineComponent({
  name: 'Welcome',
  setup(props, context) {
    const main = ref<HTMLElement | null>(null)
    const { direction, isSwipping } = useSwipe(main, {
      beforeStart: (e) => e.preventDefault()
    })
    const router = useRouter()
    const route = useRoute()
    const pushPage = throttle(() => {
      if (isSwipping && direction.value === 'left') {
        const key = (route.name ?? 'Welcome1').toString()
        console.log(key)
        router.push(PathTable[key])
      }
    }, 500)
    watch(
      direction,
      (newV) => {
        pushPage()
      },
      { deep: true }
    )
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg role="img">
            <use xlinkHref="#mangosteen" />
          </svg>
          <h1>山竹记账</h1>
        </header>
        <main ref={main}>
          <RouterView name="main">
            {({
              Component: Comp,
              route: R
            }: {
              Component: VNode
              route: RouteLocationNormalizedLoaded
            }) => {
              return (
                <Transition
                  name="slide-fade"
                  enterActiveClass={s.slide_fade_enter_active}
                  enterFromClass={s.slide_fade_enter_from}
                  leaveActiveClass={s.slide_fade_leave_active}
                  leaveToClass={s.slide_fade_leave_to}
                >
                  {Comp}
                </Transition>
              )
            }}
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer"></RouterView>
        </footer>
      </div>
    )
  }
})
