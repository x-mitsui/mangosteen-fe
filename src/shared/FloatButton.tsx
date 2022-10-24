import { defineComponent, PropType } from 'vue'
import { Icon, IconProps } from './Icon'
import s from './FloatButton.module.scss'
export const FloatButton = defineComponent({
  props: {
    IconName: {
      type: String as PropType<IconProps>,
      required: true
    }
  },
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <Icon name="add" class={s.icon}></Icon>
      </div>
    )
  }
})
