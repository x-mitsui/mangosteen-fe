import { defineComponent, PropType } from 'vue'
import s from './Button.module.scss'

export const Button = defineComponent({
  name: 'Button',
  props: {
    kind: {
      type: String as PropType<'danger' | 'important' | 'default'>,
      default: 'default'
    },
    type: {
      type: String as PropType<'submit' | 'button'>,
      default: 'button'
    },
    onClick: {
      type: Function as PropType<(e: Event) => void>
    }
  },
  setup(props, context) {
    return () => (
      <button
        class={[s.button, s['button_' + props.kind]]}
        type={props.type}
        onClick={props.onClick}
      >
        {context.slots.default?.()}
      </button>
    )
  }
})
