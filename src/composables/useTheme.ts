import { computed, watch } from 'vue';
import { useUIStore } from '@/store';

const THEME_STORAGE_KEY = 'portfolio-theme';

function applyTheme(theme: 'dark' | 'light') {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('light', theme === 'light');
}

function persistTheme(theme: 'dark' | 'light') {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn('保存主题失败', error);
  }
}

function readThemeFromDom(): 'dark' | 'light' {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

let initialized = false;

export function useTheme() {
  const uiStore = useUIStore();

  if (!initialized) {
    uiStore.theme = readThemeFromDom();
    initialized = true;
  }

  const theme = computed(() => uiStore.theme);
  const isDark = computed(() => theme.value === 'dark');

  const setTheme = (nextTheme: 'dark' | 'light') => {
    uiStore.theme = nextTheme;
    applyTheme(nextTheme);
    persistTheme(nextTheme);
  };

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  };

  watch(
    () => uiStore.theme,
    (nextTheme) => {
      applyTheme(nextTheme);
      persistTheme(nextTheme);
    }
  );

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
}
