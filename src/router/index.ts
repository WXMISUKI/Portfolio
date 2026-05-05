import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUIStore } from '@/store'
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, SITE_URL } from '@/config/site'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _from, next) => {
  const pageTitle = String(to.meta.title || SITE_NAME)
  const description = String(to.meta.description || SITE_DESCRIPTION)
  const canonicalUrl = to.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${to.path}`

  document.title = `${pageTitle} - 罗雍来`

  const setMeta = (selector: string, content: string) => {
    const element = document.querySelector(selector)
    if (element) {
      element.setAttribute('content', content)
    }
  }

  setMeta('meta[name="description"]', description)
  setMeta('meta[property="og:title"]', `${pageTitle} - 罗雍来`)
  setMeta('meta[property="og:description"]', description)
  setMeta('meta[property="og:url"]', canonicalUrl)
  setMeta('meta[property="og:image"]', SITE_OG_IMAGE)
  setMeta('meta[name="twitter:title"]', `${pageTitle} - 罗雍来`)
  setMeta('meta[name="twitter:description"]', description)
  setMeta('meta[name="twitter:image"]', SITE_OG_IMAGE)

  const canonicalLink = document.querySelector('link[rel="canonical"]')
  if (canonicalLink) {
    canonicalLink.setAttribute('href', canonicalUrl)
  }

  const structuredDataId = 'site-structured-data'
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'zh-CN',
  }

  let script = document.getElementById(structuredDataId) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = structuredDataId
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(structuredData)

  const uiStore = useUIStore()
  if (uiStore.isMobileMenuOpen) {
    uiStore.closeMobileMenu()
  }

  next()
})

export default router
