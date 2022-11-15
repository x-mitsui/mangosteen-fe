import { defineComponent } from 'vue'
import { TimeTabsLayout } from '../../layouts/TimeTabsLayout'

import { Charts } from './Charts'
export const Statistics = defineComponent({
  setup(props, context) {
    return () => <TimeTabsLayout component={Charts} />
  }
})
