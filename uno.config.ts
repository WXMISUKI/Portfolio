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
    // 主题色快捷方式
    'bg-primary': 'bg-[#0F172A]',
    'text-primary': 'text-[#E2E8F0]',
    'text-secondary': 'text-[#94A3B8]',
    'text-accent': 'text-[#06B6D4]',
    'border-primary': 'border-[#1E293B]',

    // 布局快捷方式
    'container-custom': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    'section-padding': 'py-20 px-4',

    // 卡片快捷方式
    'card-base': 'bg-[#0F172A]/80 backdrop-blur-sm rounded-xl p-6 border border-[#1E293B]',
    'card-hover': 'hover:border-[#06B6D4] hover:shadow-lg hover:shadow-[#06B6D4]/10 transition-all duration-300',

    // 按钮快捷方式
    'btn-primary': 'bg-[#06B6D4] text-[#020617] px-6 py-2 rounded-lg font-medium hover:bg-[#0891B2] transition-colors duration-300',
    'btn-secondary': 'border border-[#06B6D4] text-[#06B6D4] px-6 py-2 rounded-lg font-medium hover:bg-[#06B6D4]/10 transition-colors duration-300',
    'btn-ghost': 'text-[#E2E8F0] px-6 py-2 rounded-lg font-medium hover:bg-[#0F172A] transition-colors duration-300',
  },
  theme: {
    colors: {
      primary: '#0F172A',
      accent: '#06B6D4',
      background: '#020617',
      text: '#E2E8F0',
      secondary: '#94A3B8',
      border: '#1E293B',
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