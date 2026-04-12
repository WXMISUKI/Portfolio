import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollReveal(threshold = 0.1) {
  const isVisible = ref(false);
  const element = ref<HTMLElement>();

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true;
      }
    });
  };

  onMounted(() => {
    if (element.value) {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold,
      });
      observer.observe(element.value);

      onUnmounted(() => {
        observer.disconnect();
      });
    }
  });

  return {
    isVisible,
    element,
  };
}