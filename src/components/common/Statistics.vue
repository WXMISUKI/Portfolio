<template>
  <div ref="root" class="statistics">
    <div
      v-for="(stat, index) in statistics"
      :key="`${stat.label}-${index}`"
      class="stat-item"
    >
      <div class="stat-value">
        {{ stat.prefix || '' }}{{ animatedValues[index] ?? 0 }}{{ stat.suffix || '' }}
      </div>
      <div class="stat-label">{{ stat.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { Metric } from '@/types/common';

interface Props {
  statistics: Metric[];
}

const props = defineProps<Props>();

const root = ref<HTMLElement | null>(null);
const animatedValues = ref<number[]>(props.statistics.map(() => 0));

let observer: IntersectionObserver | null = null;
let hasAnimated = false;

const animateNumbers = () => {
  if (hasAnimated) {
    return;
  }

  hasAnimated = true;
  const start = performance.now();
  const duration = 1600;
  const targets = props.statistics.map((item) => Number(item.value) || 0);

  const tick = (timestamp: number) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);

    animatedValues.value = targets.map((target) => Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

onMounted(() => {
  if (!root.value) {
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animateNumbers();
        observer?.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(root.value);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
  padding: var(--spacing-2xl) 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  background: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  transition: all var(--duration-normal) var(--ease-in-out);
}

.stat-item:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

html.light .stat-item:hover {
  box-shadow: var(--shadow-md-light);
}

.stat-value {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-sm);
}

.stat-label {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

@media (max-width: 768px) {
  .statistics {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
    padding: var(--spacing-xl) 0;
  }

  .stat-item {
    padding: var(--spacing-lg);
  }

  .stat-value {
    font-size: var(--font-size-4xl);
  }

  .stat-label {
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 480px) {
  .statistics {
    grid-template-columns: 1fr;
  }
}
</style>
