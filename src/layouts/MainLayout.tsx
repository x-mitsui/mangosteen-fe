import { defineComponent } from 'vue'
import { NavBar } from '../shared/NavBar'
import s from './MainLayout.module.scss'
export const MainLayout = defineComponent({
  setup(props, context) {
    console.log('context:', context.slots)
    const { title, icon, main } = context.slots
    return () => (
      <div>
        <NavBar>
          {{
            default: title,
            icon
          }}
        </NavBar>
        <div>{main?.()}</div>
      </div>
    )
  }
})
