import { defineComponent, Transition, VNode } from 'vue'
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router'
import s from './Welcome.module.scss'
export const Welcome = defineComponent({
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg role="img">
            <use xlinkHref="#mangosteen" />
          </svg>
          <h1>山竹记账</h1>
        </header>
        <main>
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
