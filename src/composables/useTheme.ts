import { computed } from 'vue';
import { useUIStore } from '@/store';

export function useTheme() {
  const uiStore = useUIStore();

  const theme = computed(() => uiStore.theme);
  const isDark = computed(() => theme.value === 'dark');

  const toggleTheme = () => {
    uiStore.theme = theme.value === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
  };

  const setTheme = (newTheme: 'dark' | 'light') => {
    uiStore.theme = newTheme;
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
}