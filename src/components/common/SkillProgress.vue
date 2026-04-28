<template>
  <div class="skill-progress">
    <div class="skill-header">
      <span class="skill-name">{{ name }}</span>
      <span class="skill-level">{{ level }}%</span>
    </div>
    <div class="skill-bar">
      <div
        class="skill-fill"
        :style="{ width: level + '%' }"
      ></div>
    </div>
    <div class="skill-stars">
      <svg
        v-for="star in 5"
        :key="star"
        class="star-icon"
        :class="{ filled: star <= Math.ceil(level / 20) }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  level: number; // 0-100
}

defineProps<Props>();
</script>

<style scoped>
.skill-progress {
  margin-bottom: var(--spacing-lg);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.skill-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  transition: color var(--duration-normal) var(--ease-in-out);
}

.skill-level {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent);
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.skill-bar {
  height: 8px;
  background: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-in-out);
}

.skill-fill {
  height: 100%;
  background: var(--gradient-accent);
  border-radius: 4px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.skill-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.skill-stars {
  display: flex;
  gap: 4px;
  margin-top: var(--spacing-sm);
}

.star-icon {
  width: 16px;
  height: 16px;
  color: var(--color-border);
  transition: color var(--duration-fast) var(--ease-in-out);
}

.star-icon.filled {
  color: var(--color-accent);
}

/* Responsive */
@media (max-width: 768px) {
  .skill-name {
    font-size: var(--font-size-sm);
  }
  
  .skill-level {
    font-size: 0.75rem;
  }
  
  .skill-bar {
    height: 6px;
  }
  
  .star-icon {
    width: 14px;
    height: 14px;
  }
}
</style>