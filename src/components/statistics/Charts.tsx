import { defineComponent, PropType } from 'vue'
import s from './Charts.module.scss'
export const Charts = defineComponent({
  name: 'Charts',
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props, context) {
    return () => <>图表</>
  }
})
