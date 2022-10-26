import { defineComponent, PropType } from 'vue'
import s from './Icon.module.scss'
export type IconProps =
  | 'add'
  | 'chart'
  | 'clock'
  | 'cloud'
  | 'mangosteen'
  | 'pig'
  | 'menu'
  | 'charts'
  | 'export'
  | 'notify'
  | 'back'
  | 'note'
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconProps>,
      required: true
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>
    }
  },
  setup(props, context) {
    // console.log(props)
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={'#' + props.name}></use>
      </svg>
    )
  }
})
