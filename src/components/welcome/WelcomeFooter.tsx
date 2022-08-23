import { defineComponent } from 'vue'
import s from '../../views/Welcome.module.scss'
export const WelcomeFooter = defineComponent({
  setup(props, context) {
    const { slots } = context
    return () => <div class={s.footer}>{slots.buttons?.()}</div>
  }
})
