import { defineComponent } from 'vue'
import s from '../../views/Welcome.module.scss'
export const WelcomeMain = defineComponent({
  setup(props, context) {
    const { slots } = context
    return () => (
      // <div class={s.wrapper}>
      <div class={s.card}>
        {slots.img?.()}
        {slots.title1?.()}
        {slots.title2?.()}
      </div>
      // </div>
    )
  }
})
