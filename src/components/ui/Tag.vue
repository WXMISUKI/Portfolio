<template>
  <span :class="tagClasses" @click="handleClick">
    <span class="tag-content">
      <slot />
    </span>
    <button
      v-if="closable"
      class="tag-close"
      @click.stop="handleClose"
      aria-label="关闭"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'default' | 'primary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  closable?: boolean;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'medium',
  closable: false,
  clickable: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  close: [];
}>();

const tagClasses = computed(() => [
  'tag',
  `tag-${props.variant}`,
  `tag-${props.size}`,
  {
    'tag-closable': props.closable,
    'tag-clickable': props.clickable,
  },
]);

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event);
  }
};

const handleClose = () => {
  emit('close');
};
</script>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  transition: all var(--duration-normal) var(--ease-in-out);
}

/* Variant: Default */
.tag-default {
  background: var(--color-accent);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}

html.dark .tag-default {
  background: rgba(6, 182, 212, 0.1);
}

.tag-default:hover {
  background: var(--color-accent);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  transform: translateY(-1px);
}

html.dark .tag-default:hover {
  background: rgba(6, 182, 212, 0.2);
}

/* Variant: Primary */
.tag-primary {
  background: var(--color-accent);
  color: var(--color-background);
  border: 1px solid var(--color-accent);
}

.tag-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-accent);
}

/* Variant: Outline */
.tag-outline {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.tag-outline:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-1px);
}

/* Size: Small */
.tag-small {
  padding: 4px 8px;
  font-size: 0.75rem;
}

.tag-small .tag-close {
  width: 14px;
  height: 14px;
}

/* Size: Medium */
.tag-medium {
  padding: 6px 12px;
  font-size: var(--font-size-sm);
}

.tag-medium .tag-close {
  width: 16px;
  height: 16px;
}

/* Size: Large */
.tag-large {
  padding: 8px 16px;
  font-size: var(--font-size-base);
}

.tag-large .tag-close {
  width: 18px;
  height: 18px;
}

/* Clickable */
.tag-clickable {
  cursor: pointer;
}

.tag-clickable:hover {
  transform: translateY(-1px);
}

/* Closable */
.tag-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  margin-left: 4px;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: inherit;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-in-out);
  opacity: 0.6;
}

.tag-close:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}

html.dark .tag-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.tag-close svg {
  width: 100%;
  height: 100%;
}
</style>