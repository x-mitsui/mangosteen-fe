import { defineComponent, PropType } from 'vue'
import { RouterLink } from 'vue-router'
export const SkipFeature = defineComponent({
  name: 'SkipFeature',

  setup(props, context) {
    const onClick = () => {
      localStorage.setItem('skip', 'yes')
    }
    return () => (
      <span onClick={onClick}>
        <RouterLink to="/item">跳过</RouterLink>
      </span>
    )
  }
})
