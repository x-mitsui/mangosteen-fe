import { defineComponent, PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from './Icon'

export const BackBtn = defineComponent({
  name: 'BackBtn',
  props: {
    kclass: String as PropType<string>
  },
  setup(props, context) {
    const route = useRoute()
    const router = useRouter()
    const onClick = () => {
      if (route.query.return_to) {
        router.push(route.query.return_to.toString())
        return
      }
      router.back()
    }
    return () => <Icon name="back" class={props.kclass} onClick={onClick} />
  }
})
