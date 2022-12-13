import { onMounted } from 'vue'
import { useMeStore } from '../stores/useMeStore'

export const useAfterMe = (fn: () => void) => {
  const mePromise = useMeStore()
  onMounted(async () => {
    await mePromise
    fn()
  })
}
