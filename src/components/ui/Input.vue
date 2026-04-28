<template>
  <div :class="inputWrapperClasses">
    <span v-if="$slots.prefix" class="input-prefix">
      <slot name="prefix" />
    </span>
    
    <input
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="inputClasses"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    />
    
    <span v-if="$slots.suffix" class="input-suffix">
      <slot name="suffix" />
    </span>
    
    <span v-if="showClearIcon" class="input-clear" @click="handleClear">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';

interface Props {
  modelValue?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'filled' | 'outlined';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  clearable: false,
  size: 'medium',
  variant: 'default',
});

const slots = useSlots();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

const isFocused = ref(false);
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const showClearIcon = computed(() => {
  return props.clearable && inputValue.value && !props.disabled && !props.readonly;
});

const inputWrapperClasses = computed(() => [
  'input-wrapper',
  `input-${props.variant}`,
  `input-${props.size}`,
  {
    'input-focused': isFocused.value,
    'input-disabled': props.disabled,
    'input-readonly': props.readonly,
    'input-has-prefix': !!slots.prefix,
    'input-has-suffix': !!slots.suffix || showClearIcon.value,
  },
]);

const inputClasses = computed(() => ['input-field']);

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
};

const handleClear = () => {
  inputValue.value = '';
};
</script>

<style scoped>
.input-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: var(--radius-md);
  transition: all var(--duration-normal) var(--ease-in-out);
  background: var(--color-primary);
}

/* Variant: Default */
.input-default {
  border: 1px solid var(--color-border);
}

.input-default:hover:not(.input-disabled) {
  border-color: var(--color-border-hover);
}

.input-default.input-focused {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

html.dark .input-default.input-focused {
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
}

/* Variant: Filled */
.input-filled {
  border: 1px solid transparent;
  background: var(--color-background);
}

.input-filled:hover:not(.input-disabled) {
  background: var(--color-background);
}

.input-filled.input-focused {
  border-color: var(--color-accent);
  background: var(--color-background);
}

/* Variant: Outlined */
.input-outlined {
  border: 2px solid var(--color-border);
  background: transparent;
}

.input-outlined:hover:not(.input-disabled) {
  border-color: var(--color-border-hover);
}

.input-outlined.input-focused {
  border-color: var(--color-accent);
}

/* Size: Small */
.input-small {
  height: 32px;
  padding: 0 10px;
}

/* Size: Medium */
.input-medium {
  height: 40px;
  padding: 0 12px;
}

/* Size: Large */
.input-large {
  height: 48px;
  padding: 0 16px;
}

/* Prefix & Suffix */
.input-prefix,
.input-suffix,
.input-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-text-secondary);
  transition: color var(--duration-fast) var(--ease-in-out);
}

.input-prefix {
  margin-right: 8px;
}

.input-suffix {
  margin-left: 8px;
}

.input-clear {
  margin-left: 8px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 50%;
  opacity: 0.6;
}

.input-clear:hover {
  opacity: 1;
  background: var(--color-border);
}

/* Input Field */
.input-field {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  transition: color var(--duration-fast) var(--ease-in-out);
}

.input-field::placeholder {
  color: var(--color-text-muted);
}

.input-field:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.input-field:readonly {
  cursor: default;
}

/* Disabled */
.input-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Readonly */
.input-readonly {
  background: var(--color-background);
}

/* Responsive */
@media (max-width: 640px) {
  .input-small {
    height: 30px;
    padding: 0 8px;
  }
  
  .input-medium {
    height: 36px;
    padding: 0 10px;
  }
  
  .input-large {
    height: 42px;
    padding: 0 14px;
  }
}
</style>