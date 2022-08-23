import { defineComponent, Transition } from 'vue'
import { RouterView } from 'vue-router'
import s from './Welcome.module.scss'
import logo from '../assets/icons/mangosteen.svg'
export const Welcome = defineComponent({
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <header>
          <img src={logo} alt="logo" />
          <h1>山竹记账</h1>
        </header>
        <main>
          <RouterView name="main">
            {(Comp: any) => {
              return (
                <Transition name="slide-fade">
                  <Comp.Component />
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
