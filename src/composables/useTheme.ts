import { computed, watch } from 'vue';
import { useUIStore } from '@/store';

/**
 * 主题存储键名
 */
const THEME_STORAGE_KEY = 'portfolio-theme';

/**
 * 应用主题到DOM
 */
function applyTheme(theme: 'dark' | 'light') {
  console.log('[useTheme] 应用主题到 DOM:', theme);

  if (typeof document !== 'undefined') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    console.log('[useTheme] DOM class 更新为:', document.documentElement.className);
  } else {
    console.warn('[useTheme] DOM 不可用，无法应用主题');
  }
}

/**
 * 保存主题到localStorage
 */
function saveTheme(theme: 'dark' | 'light') {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    console.log('[useTheme] ✓ 主题已保存到 localStorage:', theme);
  } catch (error) {
    console.warn('[useTheme] ✗ 保存主题到 localStorage 失败:', error);
  }
}

/**
 * 从DOM获取当前主题
 */
function getCurrentTheme(): 'dark' | 'light' {
  if (typeof document !== 'undefined') {
    const hasLight = document.documentElement.classList.contains('light');
    const hasDark = document.documentElement.classList.contains('dark');

    console.log('[useTheme] DOM class 检测: light=', hasLight, 'dark=', hasDark);

    if (hasLight && hasDark) {
      console.warn('[useTheme] 警告: DOM 同时包含 dark 和 light class，默认使用 light');
      return 'light';
    }

    return hasLight ? 'light' : 'dark';
  }

  console.warn('[useTheme] DOM 不可用，返回默认主题: dark');
  return 'dark';
}

/**
 * 验证主题状态一致性
 */
function validateThemeState(uiStore: any) {
  const domClass = document.documentElement.className;
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const storeTheme = uiStore.theme;

  console.log('[useTheme] --- 主题状态验证 ---');
  console.log('[useTheme] DOM class:', domClass);
  console.log('[useTheme] localStorage:', storedTheme);
  console.log('[useTheme] Store state:', storeTheme);

  // 验证CSS变量
  const computedStyle = getComputedStyle(document.documentElement);
  const backgroundColor = computedStyle.getPropertyValue('--color-background').trim();
  const textColor = computedStyle.getPropertyValue('--color-text').trim();
  const accentColor = computedStyle.getPropertyValue('--color-accent').trim();
  console.log('[useTheme] CSS变量 --color-background:', backgroundColor);
  console.log('[useTheme] CSS变量 --color-text:', textColor);
  console.log('[useTheme] CSS变量 --color-accent:', accentColor);

  const isConsistent =
    (domClass.includes('dark') && storeTheme === 'dark') ||
    (domClass.includes('light') && storeTheme === 'light');

  if (!isConsistent) {
    console.warn('[useTheme] ✗ 检测到主题状态不一致！');
    console.warn('[useTheme] DOM:', domClass.includes('dark') ? 'dark' : 'light');
    console.warn('[useTheme] Store:', storeTheme);
  } else {
    console.log('[useTheme] ✓ 主题状态一致');
  }
  console.log('[useTheme] ---------------------');
}

export function useTheme() {
  const uiStore = useUIStore();

  // 从 DOM 获取当前主题（main.ts 已经初始化过了）
  console.log('[useTheme] =========================================');
  console.log('[useTheme] 初始化 useTheme composable');

  const currentTheme = getCurrentTheme();
  console.log('[useTheme] 当前 DOM 主题:', currentTheme);

  // 同步到 store
  uiStore.theme = currentTheme;
  console.log('[useTheme] Store 主题已设置为:', currentTheme);

  const theme = computed(() => uiStore.theme);
  const isDark = computed(() => theme.value === 'dark');

  const toggleTheme = () => {
    const current = theme.value;
    const newTheme = current === 'dark' ? 'light' : 'dark';

    console.log('[useTheme] =========================================');
    console.log('[useTheme] 切换主题');
    console.log('[useTheme] 从:', current);
    console.log('[useTheme] 到:', newTheme);

    // 更新 store
    uiStore.theme = newTheme;

    // 应用到 DOM
    applyTheme(newTheme);

    // 保存到 localStorage
    saveTheme(newTheme);

    // 验证状态
    validateThemeState(uiStore);

    console.log('[useTheme] =========================================');
  };

  const setTheme = (newTheme: 'dark' | 'light') => {
    console.log('[useTheme] =========================================');
    console.log('[useTheme] 设置主题:', newTheme);

    uiStore.theme = newTheme;
    applyTheme(newTheme);
    saveTheme(newTheme);

    // 验证状态
    validateThemeState(uiStore);

    console.log('[useTheme] =========================================');
  };

  // 监听主题变化（防止其他地方修改 theme 状态时不同步）
  watch(
    () => uiStore.theme,
    (newTheme) => {
      console.log('[useTheme] Store 主题变化:', newTheme);
      applyTheme(newTheme);
      saveTheme(newTheme);
      validateThemeState(uiStore);
    }
  );

  console.log('[useTheme] =========================================');

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
}