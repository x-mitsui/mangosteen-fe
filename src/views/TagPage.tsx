import { defineComponent } from 'vue'

import { RouterView } from 'vue-router'
export const TagPage = defineComponent({
  name: 'TagPage',
  setup(props, context) {
    return () => <RouterView></RouterView>
  }
})
