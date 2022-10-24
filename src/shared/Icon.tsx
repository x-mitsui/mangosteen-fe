import { defineComponent, PropType } from 'vue'
import s from './Icon.module.scss'
export const Icon = defineComponent({
  props: {
    name: String as PropType<'add' | 'chart' | 'clock' | 'cloud' | 'mangosteen' | 'pig'>
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
