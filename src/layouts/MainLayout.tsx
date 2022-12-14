import { defineComponent } from 'vue'
import { NavBar } from '../shared/NavBar'
import s from './MainLayout.module.scss'
export const MainLayout = defineComponent({
  name: 'MainLayout',
  setup(props, context) {
    const { title, icon, main } = context.slots
    return () => (
      <div class={s.main_layout}>
        <NavBar class={s.nav_bar}>
          {{
            default: title,
            icon
          }}
        </NavBar>
        <div class={s.main_bg}>{main?.()}</div>
      </div>
    )
  }
})
