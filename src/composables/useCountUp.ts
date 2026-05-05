import { ref } from 'vue'

export function useCountUp(target: number, duration = 2000) {
  const current = ref(0)
  const isAnimating = ref(false)

  const start = () => {
    if (isAnimating.value) return

    isAnimating.value = true
    const startTime = performance.now()
    const startValue = current.value

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // 使用缓动函数
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      current.value = Math.floor(startValue + (target - startValue) * easeOutQuart)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        current.value = target
        isAnimating.value = false
      }
    }

    requestAnimationFrame(animate)
  }

  return {
    current,
    start,
    isAnimating,
  }
}

export function useCountUpObject(obj: any, duration = 2000) {
  const isAnimating = ref(false)

  const start = () => {
    if (isAnimating.value) return

    isAnimating.value = true
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      Object.keys(obj).forEach(key => {
        if (typeof obj[key].value === 'number') {
          obj[key].value = Math.floor(obj[key].value * easeOutQuart)
        }
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        isAnimating.value = false
      }
    }

    requestAnimationFrame(animate)
  }

  return {
    start,
    isAnimating,
  }
}
