import { defineComponent } from 'vue'
import s from './Button.module.scss'
interface Props {
  onClick: (e: MouseEvent) => void
}

export const Button = defineComponent<'class' | 'onClick', {}, {}>({
  inheritAttrs: false,
  props: ['class', 'onClick'],
  setup(props, context) {
    return () => (
      <button class={[s.button, props.class]} onClick={props.onClick}>
        {context.slots.default?.()}
      </button>
    )
  }
})
