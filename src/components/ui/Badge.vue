<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium';
  dot?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  dot: false,
});

const badgeClasses = computed(() => [
  'badge',
  `badge-${props.variant}`,
  `badge-${props.size}`,
  {
    'badge-dot': props.dot,
  },
]);
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  transition: all var(--duration-fast) var(--ease-in-out);
}

/* Variant: Primary */
.badge-primary {
  background: var(--color-accent);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}

html.dark .badge-primary {
  background: rgba(6, 182, 212, 0.2);
  color: var(--color-accent);
}

/* Variant: Success */
.badge-success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--color-success);
  border: 1px solid var(--color-success);
}

/* Variant: Warning */
.badge-warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-warning);
  border: 1px solid var(--color-warning);
}

/* Variant: Danger */
.badge-danger {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-danger);
  border: 1px solid var(--color-danger);
}

/* Variant: Info */
.badge-info {
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-info);
  border: 1px solid var(--color-info);
}

/* Size: Small */
.badge-small {
  padding: 1px 6px;
  font-size: 0.7rem;
}

/* Size: Medium */
.badge-medium {
  padding: 2px 8px;
  font-size: var(--font-size-xs);
}

/* Dot variant */
.badge-dot {
  padding: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.badge-dot.badge-small {
  width: 6px;
  height: 6px;
}

.badge-dot.badge-medium {
  width: 8px;
  height: 8px;
}
</style>