import { defineComponent, ref } from "vue";

export const App = defineComponent({
  setup() {
    const refCount = ref(0)
    const onClick = () => {
      refCount.value++
    }
    return () => <>
      <div>{refCount.value}</div>
      <button onClick={onClick}>增加</button>
    </>
      
  }
})

