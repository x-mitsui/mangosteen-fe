import { ref, Ref, onMounted, computed, onUnmounted } from 'vue'
type Point = { x: number; y: number }
interface Options {
  beforeStart?(e: TouchEvent): void
  afterStart?(e: TouchEvent): void
  beforeMove?(e: TouchEvent): void
  afterMove?(e: TouchEvent): void
  beforeEnd?(e: TouchEvent): void
  afterEnd?(e: TouchEvent): void
}
export const useSwipe = (element: Ref<HTMLElement | null>, options?: Options) => {
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
  const onStart = (e: TouchEvent) => {
    options?.beforeStart?.(e)
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
    options?.afterStart?.(e)
  }
  const onMove = (e: TouchEvent) => {
    options?.beforeMove?.(e)
    console.log('touchmove')
    EndPoint.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    options?.afterMove?.(e)
  }
  const onEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e)
    console.log('touchend')
    isSwipping.value = false
    EndPoint.value = null
    StartPoint.value = null
    options?.afterEnd?.(e)
  }
  // 节点挂载后
  onMounted(() => {
    if (!element.value) return
    element.value.addEventListener('touchstart', onStart)
    element.value.addEventListener('touchmove', onMove)
    element.value.addEventListener('touchend', onEnd)
  })
  onUnmounted(() => {
    if (!element.value) return
    element.value.removeEventListener('touchstart', onStart)
    element.value.removeEventListener('touchmove', onMove)
    element.value.removeEventListener('touchend', onEnd)
  })
  return { isSwipping, direction, distance }
}
