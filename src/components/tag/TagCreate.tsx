import { defineComponent } from 'vue'
import { TagForm } from './TagForm'
export const TagCreate = defineComponent({
  name: 'TagCreate',
  setup(props, context) {
    return () => <TagForm title="标签详情" />
  }
})
