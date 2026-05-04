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
  document.title = `${to.meta.title} - 罗雍来`;

  const description = String(to.meta.description || '罗雍来 - 前端工程与 AI 全栈开发者作品集');
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', `${to.meta.title} - 罗雍来`);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }

  const uiStore = useUIStore();
  if (uiStore.isMobileMenuOpen) {
    uiStore.closeMobileMenu();
  }

  next();
});

export default router;
