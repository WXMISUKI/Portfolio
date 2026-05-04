<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :disabled="tag === 'button' ? disabled || loading : undefined"
    @click="handleClick"
    :aria-label="ariaLabel"
    :aria-disabled="disabled || loading"
    :href="href"
    :target="target"
    :rel="rel"
    :type="tag === 'button' ? nativeType : undefined"
  >
    <span v-if="loading" class="button-spinner">
      <svg class="spinner-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="60" stroke-dashoffset="60">
          <animate attributeName="stroke-dashoffset" from="60" to="0" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </span>
    
    <span v-if="icon && !loading" class="button-icon">
      <svg v-if="icon === 'arrow-right'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
      <svg v-else-if="icon === 'download'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
      </svg>
      <svg v-else-if="icon === 'github'" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </span>
    
    <span v-if="$slots.default" class="button-content">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: 'arrow-right' | 'download' | 'github';
  href?: string;
  target?: string;
  rel?: string;
  nativeType?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  fullWidth: false,
  nativeType: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const tag = computed(() => (props.href ? 'a' : 'button'));

const buttonClasses = computed(() => [
  'btn',
  `btn-${props.variant}`,
  `btn-${props.size}`,
  {
    'btn-disabled': props.disabled || props.loading,
    'btn-loading': props.loading,
    'btn-full-width': props.fullWidth,
  },
]);

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-in-out);
  white-space: nowrap;
  background: var(--color-accent);
  background-image: var(--gradient-accent);
  color: var(--color-background);
}

/* Variant: Primary */
.btn-primary {
  background: var(--color-accent);
  background-image: var(--gradient-accent);
  color: var(--color-background);
  border: 2px solid transparent;
}

.btn-primary:hover:not(.btn-disabled) {
  background: var(--color-accent-hover);
  background-image: var(--gradient-accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-accent);
}

.btn-primary:active:not(.btn-disabled) {
  transform: translateY(0);
}

/* Variant: Secondary */
.btn-secondary {
  background: transparent;
  color: var(--color-accent);
  border: 2px solid var(--color-accent);
}

.btn-secondary:hover:not(.btn-disabled) {
  background: var(--color-accent);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  transform: translateY(-2px);
}

html.dark .btn-secondary:hover:not(.btn-disabled) {
  background: rgba(6, 182, 212, 0.1);
}

/* Variant: Ghost */
.btn-ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid transparent;
}

.btn-ghost:hover:not(.btn-disabled) {
  background: var(--color-accent);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border-color: var(--color-accent);
}

html.dark .btn-ghost:hover:not(.btn-disabled) {
  background: rgba(6, 182, 212, 0.1);
}

/* Variant: Danger */
.btn-danger {
  background: var(--color-danger);
  color: var(--color-background);
}

.btn-danger:hover:not(.btn-disabled) {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

/* Size: Small */
.btn-small {
  padding: 8px 16px;
  font-size: var(--font-size-sm);
}

/* Size: Medium */
.btn-medium {
  padding: 12px 24px;
  font-size: var(--font-size-base);
}

/* Size: Large */
.btn-large {
  padding: 16px 32px;
  font-size: var(--font-size-lg);
}

/* Disabled */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading */
.btn-loading {
  cursor: wait;
}

.button-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.spinner-icon {
  width: 100%;
  height: 100%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.button-icon svg {
  width: 100%;
  height: 100%;
}

.button-content {
  display: flex;
  align-items: center;
}

/* Full Width */
.btn-full-width {
  width: 100%;
}

/* Responsive */
@media (max-width: 640px) {
  .btn {
    padding: 10px 20px;
  }
  
  .btn-small {
    padding: 6px 12px;
  }
  
  .btn-large {
    padding: 14px 28px;
  }
}
</style>
