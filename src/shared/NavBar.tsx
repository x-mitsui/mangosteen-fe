import { defineComponent } from 'vue'
import s from './NavBar.module.scss'
export const NavBar = defineComponent({
  setup(props, context) {
    const { slots } = context
    return () => (
      <div class={s.navbar}>
        <div class={s.iconWrapper}>{slots.icon?.(s.kclass)}</div>
        <div class={s.titleWrapper}>{slots.default?.()}</div>
      </div>
    )
  }
})
