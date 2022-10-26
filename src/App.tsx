import { defineComponent } from 'vue'
import './App.scss'
import { RouterView } from 'vue-router'
export const App = defineComponent({
  setup() {
    return () => (
      <div>
        <RouterView></RouterView>
      </div>
    )
  }
})
