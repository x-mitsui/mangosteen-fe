import { defineComponent } from 'vue'
import './App.scss'
import { RouterView } from 'vue-router'
export const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <RouterView></RouterView>
      </div>
    )
  }
})
