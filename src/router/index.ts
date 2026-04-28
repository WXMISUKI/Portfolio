import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useUIStore } from '@/store';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      description: '罗雍来 - 前端工程 & AI 全栈开发者',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: '关于我',
      description: '了解更多关于我的信息',
    },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/Projects.vue'),
    meta: {
      title: '项目经验',
      description: '我的项目经验和成果展示',
    },
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import('@/views/Skills.vue'),
    meta: {
      title: '技术栈',
      description: '我的技术栈和技能展示',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/Contact.vue'),
    meta: {
      title: '联系我',
      description: '联系方式和合作机会',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, _from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title} - 罗雍来`;

  // 关闭移动端菜单
  const uiStore = useUIStore();
  if (uiStore.isMobileMenuOpen) {
    uiStore.closeMobileMenu();
  }

  next();
});

export default router;