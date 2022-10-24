import { defineComponent, PropType } from 'vue'
import s from './Icon.module.scss'
export type IconProps = 'add' | 'chart' | 'clock' | 'cloud' | 'mangosteen' | 'pig'
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconProps>,
      required: true
    }
  },
  setup(props, context) {
    console.log(props)
    return () => (
      <svg class={s.icon}>
        <use xlinkHref={'#' + props.name}></use>
      </svg>
    )
  }
})
