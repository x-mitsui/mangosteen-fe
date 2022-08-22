import { defineComponent } from 'vue'
import s from './WelcomeLayout.module.scss'

export const WelcomeLayout = defineComponent({
  setup(props, context) {
    const { slots } = context
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          {slots.img?.()}
          {slots.title1?.()}
          {slots.title2?.()}
        </div>

        <div class={s.actions}>{slots.buttons?.()}</div>
      </div>
    )
  }
})
