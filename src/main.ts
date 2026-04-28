import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import 'uno.css';
import './assets/styles/main.css';

/**
 * 主题存储键名
 */
const THEME_STORAGE_KEY = 'portfolio-theme';

/**
 * 初始化主题
 * 从localStorage读取，如果没有则使用系统偏好，最后默认深色主题
 */
function initTheme() {
  console.log('[Theme] =========================================');
  console.log('[Theme] 开始初始化主题...');

  try {
    // 1. 尝试从 localStorage 读取
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    console.log('[Theme] localStorage 主题:', storedTheme);

    if (storedTheme === 'dark' || storedTheme === 'light') {
      document.documentElement.classList.add(storedTheme);
      console.log('[Theme] ✓ 应用 localStorage 主题:', storedTheme);
      console.log('[Theme] 初始化完成，当前 class:', document.documentElement.className);
      return;
    }

    // 2. 检测系统偏好
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('[Theme] 系统偏好 - 深色模式:', prefersDark);

      if (prefersDark) {
        document.documentElement.classList.add('dark');
        console.log('[Theme] ✓ 应用系统偏好主题: dark');
        console.log('[Theme] 初始化完成，当前 class:', document.documentElement.className);
        return;
      }
    }

    // 3. 默认深色主题
    document.documentElement.classList.add('dark');
    console.log('[Theme] ✓ 应用默认主题: dark');
    console.log('[Theme] 初始化完成，当前 class:', document.documentElement.className);
  } catch (error) {
    console.error('[Theme] ✗ 主题初始化失败:', error);
    console.error('[Theme] 错误详情:', error instanceof Error ? error.message : String(error));
    // 失败时使用默认深色主题
    document.documentElement.classList.add('dark');
    console.log('[Theme] ✓ 使用降级方案: dark');
  } finally {
    console.log('[Theme] =========================================');
  }
}

// 初始化主题
initTheme();

/**
 * 验证CSS变量值
 */
function verifyCSSVariables() {
  console.log('[Theme] =========================================');
  console.log('[Theme] CSS变量验证');
  console.log('[Theme] =========================================');

  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);

  const variables = [
    '--color-background',
    '--color-text',
    '--color-accent',
    '--color-primary',
    '--color-border',
    '--color-footer-bg',
    '--gradient-accent',
  ];

  variables.forEach((variable) => {
    const value = computedStyle.getPropertyValue(variable).trim();
    console.log(`[Theme] ${variable}: ${value}`);
  });

  console.log('[Theme] =========================================');
}

// 延迟验证，确保CSS已加载
setTimeout(verifyCSSVariables, 100);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');