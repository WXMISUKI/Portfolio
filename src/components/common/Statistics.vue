<template>
  <div class="statistics">
    <div
      v-for="(stat, index) in statistics"
      :key="index"
      class="stat-item"
    >
      <div class="stat-value">{{ animatedValue(stat.value) }}</div>
      <div class="stat-label">{{ stat.label }}</div>
      <div v-if="stat.suffix" class="stat-suffix">{{ stat.suffix }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stat {
  label: string;
  value: number;
  suffix?: string;
  duration?: number;
}

interface Props {
  statistics: Stat[];
}

defineProps<Props>();

function animatedValue(target: number) {
  return target;
}
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
  transition: all var(--duration-normal) var(--ease-in-out);
}

.stat-label {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  transition: color var(--duration-normal) var(--ease-in-out);
}

.stat-suffix {
  font-size: var(--font-size-lg);
  color: var(--color-accent);
  font-weight: var(--font-weight-semibold);
  margin-top: -4px;
}

/* Responsive */
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