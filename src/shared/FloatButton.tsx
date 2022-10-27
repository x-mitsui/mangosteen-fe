import { defineComponent, PropType } from 'vue'
import { Icon, IconProps } from './Icon'
import s from './FloatButton.module.scss'
import { RouterLink } from 'vue-router'
export const FloatButton = defineComponent({
  name: 'FloatButton',
  props: {
    IconName: {
      type: String as PropType<IconProps>,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    return () => (
      <RouterLink to={props.to}>
        <div class={s.wrapper}>
          <Icon name="add" class={s.icon}></Icon>
        </div>
      </RouterLink>
    )
  }
})
