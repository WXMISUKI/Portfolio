export function useSmoothScroll() {
  const scrollTo = (options: ScrollToOptions) => {
    window.scrollTo({
      behavior: 'smooth',
      ...options,
    })
  }

  const scrollToTop = () => {
    scrollTo({ top: 0 })
  }

  const scrollToElement = (element: HTMLElement, offset = 0) => {
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    scrollTo({ top })
  }

  return {
    scrollTo,
    scrollToTop,
    scrollToElement,
  }
}
