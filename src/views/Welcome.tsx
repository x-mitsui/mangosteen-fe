import { defineComponent, ref, Transition, VNode, watch } from 'vue'
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router'
import s from './Welcome.module.scss'
import { useSwipe } from '../../hooks/useSwipe'
export const Welcome = defineComponent({
  setup(props, context) {
    const main = ref<HTMLElement | null>(null)
    const { direction, distance, isSwipping } = useSwipe(main)
    watch(
      direction,
      (newV) => {
        console.log('方向:', direction.value)
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
