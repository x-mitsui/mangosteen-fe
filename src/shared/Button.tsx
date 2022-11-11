import { defineComponent, PropType } from 'vue'
import s from './Button.module.scss'

export const Button = defineComponent({
  name: 'Button',
  props: {
    kind: {
      type: String as PropType<'danger' | 'important' | 'default'>,
      default: 'default'
    },
    onClick: {
      type: Function as PropType<(e: Event) => void>
    }
  },
  setup(props, context) {
    return () => (
      <button class={[s.button, s['button_' + props.kind]]} onClick={props.onClick}>
        {context.slots.default?.()}
      </button>
    )
  }
})
