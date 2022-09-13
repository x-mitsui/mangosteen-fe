export function throttle(fn: Function, time: number) {
  let timer: null | number = null
  return (...args: any[]) => {
    if (!timer) {
      fn(...args)
      timer = setTimeout(() => {
        timer = null
      }, time)
    }
  }
}
