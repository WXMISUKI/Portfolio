<template>
  <div :class="cardClasses" @click="handleClick">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'elevated' | 'outlined'
  hoverable?: boolean
  clickable?: boolean
  padding?: 'none' | 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  hoverable: false,
  clickable: false,
  padding: 'medium',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const cardClasses = computed(() => [
  'card',
  `card-${props.variant}`,
  `card-${props.padding}`,
  {
    'card-hoverable': props.hoverable,
    'card-clickable': props.clickable,
  },
])

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  background: var(--color-primary);
  transition: all var(--duration-normal) var(--ease-in-out);
}

/* Variant: Default */
.card-default {
  background: var(--color-primary);
  border: 1px solid var(--color-border);
}

/* Variant: Elevated */
.card-elevated {
  background: var(--color-primary);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

/* Variant: Outlined */
.card-outlined {
  background: transparent;
  border: 2px solid var(--color-border);
}

/* Padding: None */
.card-none {
  padding: 0;
}

/* Padding: Small */
.card-small {
  padding: var(--spacing-md);
}

/* Padding: Medium */
.card-medium {
  padding: var(--spacing-lg);
}

/* Padding: Large */
.card-large {
  padding: var(--spacing-xl);
}

/* Hoverable */
.card-hoverable:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

html.light .card-hoverable:hover {
  box-shadow: var(--shadow-lg-light);
}

/* Clickable */
.card-clickable {
  cursor: pointer;
}

.card-clickable:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

html.light .card-clickable:hover {
  box-shadow: var(--shadow-md-light);
}

.card-clickable:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 640px) {
  .card {
    border-radius: var(--radius-lg);
  }

  .card-large {
    padding: var(--spacing-lg);
  }
}
</style>
