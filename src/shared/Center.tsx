import { defineComponent } from 'vue'
import s from './Center.module.scss'
export const Center = defineComponent((props, context) => {
  return () => <div class={s.wrapper}>{context.slots.default?.()}</div>
})
