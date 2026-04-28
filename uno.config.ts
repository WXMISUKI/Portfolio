import { defineConfig, presetUno, presetIcons, presetAttributify, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'JetBrains Mono:400,500',
      },
    }),
  ],
  shortcuts: {
    // 主题色快捷方式 - 深色主题
    'bg-primary-dark': 'dark:bg-[#0F172A]',
    'text-primary-dark': 'dark:text-[#E2E8F0]',
    'text-secondary-dark': 'dark:text-[#94A3B8]',
    'text-accent-dark': 'dark:text-[#06B6D4]',
    'border-primary-dark': 'dark:border-[#1E293B]',

    // 主题色快捷方式 - 浅色主题
    'bg-primary-light': 'light:bg-[#FFFFFF]',
    'text-primary-light': 'light:text-[#1F2937]',
    'text-secondary-light': 'light:text-[#6B7280]',
    'text-accent-light': 'light:text-[#6366F1]',
    'border-primary-light': 'light:border-[#E5E7EB]',

    // 响应式主题色快捷方式（自动适配）
    'bg-primary': 'dark:bg-[#0F172A] light:bg-[#FFFFFF]',
    'text-primary': 'dark:text-[#E2E8F0] light:text-[#1F2937]',
    'text-secondary': 'dark:text-[#94A3B8] light:text-[#6B7280]',
    'text-accent': 'dark:text-[#06B6D4] light:text-[#6366F1]',
    'border-primary': 'dark:border-[#1E293B] light:border-[#E5E7EB]',

    // 布局快捷方式
    'container-custom': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    'section-padding': 'py-20 px-4',

    // 卡片快捷方式 - 深色主题
    'card-base-dark': 'dark:bg-[#0F172A]/80 dark:backdrop-blur-sm dark:rounded-xl dark:p-6 dark:border dark:border-[#1E293B]',
    'card-hover-dark': 'dark:hover:border-[#06B6D4] dark:hover:shadow-lg dark:hover:shadow-[#06B6D4]/10 dark:transition-all dark:duration-300',

    // 卡片快捷方式 - 浅色主题
    'card-base-light': 'light:bg-[#FFFFFF]/90 light:backdrop-blur-sm light:rounded-xl light:p-6 light:border light:border-[#E5E7EB]',
    'card-hover-light': 'light:hover:border-[#6366F1] light:hover:shadow-lg light:hover:shadow-[#6366F1]/10 light:transition-all light:duration-300',

    // 卡片快捷方式 - 响应式
    'card-base': 'dark:bg-[#0F172A]/80 dark:backdrop-blur-sm light:bg-[#FFFFFF]/90 light:backdrop-blur-sm rounded-xl p-6 dark:border-[#1E293B] light:border-[#E5E7EB] border',
    'card-hover': 'dark:hover:border-[#06B6D4] light:hover:border-[#6366F1] hover:shadow-lg dark:hover:shadow-[#06B6D4]/10 light:hover:shadow-[#6366F1]/10 transition-all duration-300',

    // 按钮快捷方式 - 深色主题
    'btn-primary-dark': 'dark:bg-[#06B6D4] dark:text-[#020617] dark:px-6 dark:py-2 dark:rounded-lg dark:font-medium dark:hover:bg-[#0891B2] dark:transition-colors dark:duration-300',
    'btn-secondary-dark': 'dark:border dark:border-[#06B6D4] dark:text-[#06B6D4] dark:px-6 dark:py-2 dark:rounded-lg dark:font-medium dark:hover:bg-[#06B6D4]/10 dark:transition-colors dark:duration-300',
    'btn-ghost-dark': 'dark:text-[#E2E8F0] dark:px-6 dark:py-2 dark:rounded-lg dark:font-medium dark:hover:bg-[#0F172A] dark:transition-colors dark:duration-300',

    // 按钮快捷方式 - 浅色主题
    'btn-primary-light': 'light:bg-[#6366F1] light:text-[#FFFFFF] light:px-6 light:py-2 light:rounded-lg light:font-medium light:hover:bg-[#4F46E5] light:transition-colors light:duration-300',
    'btn-secondary-light': 'light:border light:border-[#6366F1] light:text-[#6366F1] light:px-6 light:py-2 light:rounded-lg light:font-medium light:hover:bg-[#6366F1]/10 light:transition-colors light:duration-300',
    'btn-ghost-light': 'light:text-[#1F2937] light:px-6 light:py-2 light:rounded-lg light:font-medium light:hover:bg-[#F5F5F7] light:transition-colors light:duration-300',

    // 按钮快捷方式 - 响应式
    'btn-primary': 'dark:bg-[#06B6D4] dark:text-[#020617] light:bg-[#6366F1] light:text-[#FFFFFF] px-6 py-2 rounded-lg font-medium dark:hover:bg-[#0891B2] light:hover:bg-[#4F46E5] transition-colors duration-300',
    'btn-secondary': 'border dark:border-[#06B6D4] dark:text-[#06B6D4] light:border-[#6366F1] light:text-[#6366F1] px-6 py-2 rounded-lg font-medium dark:hover:bg-[#06B6D4]/10 light:hover:bg-[#6366F1]/10 transition-colors duration-300',
    'btn-ghost': 'dark:text-[#E2E8F0] light:text-[#1F2937] px-6 py-2 rounded-lg font-medium dark:hover:bg-[#0F172A] light:hover:bg-[#F5F5F7] transition-colors duration-300',
  },
  theme: {
    colors: {
      // 深色主题
      primary: '#0F172A',
      accent: '#06B6D4',
      background: '#020617',
      text: '#E2E8F0',
      secondary: '#94A3B8',
      border: '#1E293B',

      // 浅色主题
      light: {
        primary: '#FFFFFF',
        accent: '#6366F1',
        background: '#F5F5F7',
        text: '#1F2937',
        secondary: '#6B7280',
        border: '#E5E7EB',
      },
    },
  },
  rules: [
    [
      'text-shadow',
      {
        'text-shadow': '0 0 20px rgba(6, 182, 212, 0.3)',
      },
    ],
  ],
});