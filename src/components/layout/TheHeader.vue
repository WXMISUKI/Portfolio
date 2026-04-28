<template>
  <header class="header">
    <div class="container-custom">
      <div class="header-content">
        <!-- Logo区域 -->
        <div class="header-left">
          <!-- Logo -->
          <div class="header-logo">
            <RouterLink to="/" class="logo-link">
              <span class="logo-text">罗雍来</span>
            </RouterLink>
          </div>

          <!-- 主题切换按钮 -->
          <ThemeToggle />
        </div>

        <!-- 导航 -->
        <nav class="header-nav">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ active: isActive(item.path) }"
          >
            {{ item.name }}
          </RouterLink>
        </nav>

        <!-- 移动端菜单按钮 -->
        <button
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
          aria-label="切换菜单"
        >
          <span class="hamburger" :class="{ open: isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="mobile-nav-link"
          @click="closeMobileMenu"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUIStore } from '@/store';
import ThemeToggle from '@/components/ui/ThemeToggle.vue';

const route = useRoute();
const uiStore = useUIStore();

const navItems = ref([
  { path: '/', name: '首页' },
  { path: '/about', name: '关于我' },
  { path: '/projects', name: '项目经验' },
  { path: '/skills', name: '技术栈' },
  { path: '/contact', name: '联系我' },
]);

const isMobileMenuOpen = computed(() => uiStore.isMobileMenuOpen);

const isActive = (path: string) => {
  return route.path === path;
};

const toggleMobileMenu = () => {
  uiStore.toggleMobileMenu();
};

const closeMobileMenu = () => {
  uiStore.closeMobileMenu();
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  background: var(--color-primary);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  transition: background var(--duration-normal) var(--ease-in-out),
              border-color var(--duration-normal) var(--ease-in-out);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-logo .logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
  transition: color var(--duration-normal) var(--ease-in-out);
}

/* 深色主题发光效果 */
html.dark .logo-text {
  text-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
}

/* 浅色主题无发光效果 */
html.light .logo-text {
  text-shadow: none;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--duration-normal) var(--ease-in-out);
  position: relative;
}

.nav-link:hover {
  color: var(--color-accent);
}

.nav-link.active {
  color: var(--color-accent);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-accent);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition: all 0.3s ease;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.mobile-menu {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  background: var(--color-primary);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mobile-nav-link {
  padding: 16px 24px;
  color: var(--color-text);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  transition: background var(--duration-normal) var(--ease-in-out),
              color var(--duration-normal) var(--ease-in-out);
}

.mobile-nav-link:hover {
  background: var(--color-background);
  color: var(--color-accent);
}

.mobile-nav-link.router-link-active {
  color: var(--color-accent);
  background: rgba(6, 182, 212, 0.1);
}

/* 浅色主题激活链接背景 */
html.light .mobile-nav-link.router-link-active {
  background: rgba(99, 102, 241, 0.1);
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .header-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>