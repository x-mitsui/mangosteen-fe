import { ref, Ref, onMounted, computed } from 'vue'
type Point = { x: number; y: number }
export const useSwipe = (element: Ref<HTMLElement | null>) => {
  const StartPoint = ref<Point | null>(null)
  const EndPoint = ref<Point | null>(null)
  const isSwipping = ref(false)
  const distance = computed(() => {
    if (EndPoint.value === null || StartPoint.value === null) {
      return null
    }
    return {
      x: EndPoint.value.x - StartPoint.value.x,
      y: EndPoint.value.y - StartPoint.value.y
    }
  })
  const direction = computed(() => {
    if (!isSwipping.value) {
      return '松手状态'
    }
    if (!distance.value) {
      return ''
    }
    const { x: dis_x, y: dis_y } = distance.value
    if (Math.abs(dis_x) > Math.abs(dis_y)) {
      if (dis_x > 0) {
        return 'right'
      } else {
        return 'left'
      }
    } else {
      if (dis_y > 0) {
        return 'down'
      } else {
        return 'up'
      }
    }
  })
  // 节点挂载后
  onMounted(() => {
    element.value?.addEventListener('touchstart', (e) => {
      console.log('touchstart')
      StartPoint.value = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }

      EndPoint.value = {
        x: 0,
        y: 0
      }
      isSwipping.value = true
    })
    element.value?.addEventListener('touchmove', (e) => {
      console.log('touchmove')
      EndPoint.value = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    })
    element.value?.addEventListener('touchend', () => {
      console.log('touchend')
      isSwipping.value = false
      EndPoint.value = null
      StartPoint.value = null
    })
  })
  return { isSwipping, direction, distance }
}
