import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import 'uno.css'
import './assets/styles/main.css'

/**
 * 主题存储键名
 */
const THEME_STORAGE_KEY = 'portfolio-theme'

/**
 * 初始化主题
 * 从localStorage读取，如果没有则使用系统偏好，最后默认深色主题
 */
function initTheme() {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)

    if (storedTheme === 'dark' || storedTheme === 'light') {
      document.documentElement.classList.add(storedTheme)
      return
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      if (prefersDark) {
        document.documentElement.classList.add('dark')
        return
      }
    }

    document.documentElement.classList.add('dark')
  } catch (error) {
    console.error('主题初始化失败', error)
    document.documentElement.classList.add('dark')
  }
}

// 初始化主题
initTheme()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
