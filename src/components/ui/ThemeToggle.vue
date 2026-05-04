<template>
  <button
    class="theme-toggle"
    type="button"
    @click="toggleTheme"
    :aria-label="isDark ? '切换到浅色主题' : '切换到深色主题'"
    title="切换主题"
  >
    <span class="theme-icon">
      <svg
        v-if="isDark"
        class="icon-sun"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg
        v-else
        class="icon-moon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </span>
    <span class="theme-text">{{ isDark ? '浅色' : '深色' }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '@/composables/useTheme';

const { theme, toggleTheme } = useTheme();
const isDark = computed(() => theme.value === 'dark');
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

html.light .theme-toggle {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-accent);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

html.light .theme-toggle:hover {
  background: rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.theme-toggle:active {
  transform: translateY(0);
}

.theme-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
}

.icon-sun,
.icon-moon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-icon {
  transform: rotate(15deg);
}

.theme-text {
  white-space: nowrap;
  user-select: none;
}

html.dark .theme-toggle .icon-sun,
html.light .theme-toggle .icon-sun {
  color: var(--color-accent);
}

html.dark .theme-toggle .icon-moon,
html.light .theme-toggle .icon-moon {
  color: var(--color-text);
}

@media (max-width: 640px) {
  .theme-text {
    display: none;
  }

  .theme-toggle {
    padding: 8px;
  }
}
</style>
