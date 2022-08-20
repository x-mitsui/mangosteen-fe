import { defineComponent } from "vue";


export const App = defineComponent({
  setup() {
    
    return () => <>
      <ul>
        <li><router-link to="/">goHome</router-link></li>
        <li><router-link to="/about">goAbout</router-link></li>
      </ul>
      <div>
        <router-view></router-view>
      </div>
    </>
  }
})

