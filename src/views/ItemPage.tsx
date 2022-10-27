import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import s from './ItemPage.module.scss'
export const ItemPage = defineComponent({
  name: 'ItemPage',
  setup(props, context) {
    return () => <RouterView />
  }
})
