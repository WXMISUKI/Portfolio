<template>
  <div class="home">
    <section class="hero-section">
      <div class="container-custom hero-grid">
        <div class="hero-copy">
          <span class="hero-kicker">Frontend Engineering × AI Agent</span>
          <h1 class="hero-title">{{ profile.name }}</h1>
          <h2 class="hero-subtitle">
            <span>{{ typedWords }}</span>
            <span class="cursor-blink">|</span>
          </h2>
          <p class="hero-description">{{ profile.description }}</p>

          <div class="hero-tags">
            <Tag v-for="tag in heroTags" :key="tag" size="small" variant="outline">
              {{ tag }}
            </Tag>
          </div>

          <div class="hero-actions">
            <RouterLink to="/projects" class="hero-link primary">查看项目</RouterLink>
            <a
              href="/resume.pdf"
              class="hero-link secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              查看简历
            </a>
            <a
              :href="profile.contact.github"
              class="hero-link ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <div class="hero-panel">
          <div class="hero-panel-card intro-card">
            <span class="panel-label">核心定位</span>
            <h3>{{ profile.title }}</h3>
            <p>
              聚焦政企复杂业务系统、GIS、视频流低延迟优化与 AI
              智能体全栈落地，强调真实项目交付与性能结果。
            </p>
          </div>

          <div class="hero-panel-grid">
            <RouterLink to="/projects" class="hero-panel-card quick-card">
              <span class="panel-label">精选项目</span>
              <strong>AI 项目优先</strong>
              <p>已上线项目可直接在线访问。</p>
            </RouterLink>

            <RouterLink to="/about" class="hero-panel-card quick-card">
              <span class="panel-label">职业背景</span>
              <strong>工程 + AI 复合能力</strong>
              <p>查看时间线、成果和求职方向。</p>
            </RouterLink>

            <RouterLink to="/skills" class="hero-panel-card quick-card">
              <span class="panel-label">技术栈</span>
              <strong>项目驱动的技能矩阵</strong>
              <p>不是只列技术名，而是关联真实项目。</p>
            </RouterLink>

            <RouterLink to="/contact" class="hero-panel-card quick-card">
              <span class="panel-label">联系我</span>
              <strong>快速建立沟通</strong>
              <p>联系方式、简历和 GitHub 均可直达。</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="container-custom">
        <SectionTitle
          title="精选项目"
          description="优先展示已上线的 AI 项目，并保留能体现工程深度的政企项目。"
        />

        <div class="featured-grid">
          <article v-for="project in featuredProjects" :key="project.id" class="featured-card">
            <div class="featured-card-top">
              <Badge :variant="project.category === 'ai' ? 'success' : 'primary'" size="small">
                {{ project.category === 'ai' ? 'AI 项目' : '政企项目' }}
              </Badge>
              <span class="featured-role">{{ project.role }}</span>
            </div>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="featured-techs">
              <Tag v-for="tech in project.techStack.slice(0, 4)" :key="tech" size="small">
                {{ tech }}
              </Tag>
            </div>
            <div class="featured-actions">
              <RouterLink :to="`/projects`" class="featured-link">查看详情</RouterLink>
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="featured-link accent"
              >
                在线访问
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Badge, Tag } from '@/components/ui'
import SectionTitle from '@/components/common/SectionTitle.vue'
import profile from '@/assets/data/profile'
import { useProjectStore } from '@/store'

const projectStore = useProjectStore()
const heroTags = ['政企项目', 'GIS', '视频流', '性能优化', 'AI 智能体', '全栈开发']
const words = ['前端工程师', 'AI 全栈开发者', '智能体开发工程师']

const wordIndex = ref(0)
const typedWords = computed(() => words[wordIndex.value])
let typeInterval: number | null = null

const featuredProjects = computed(() =>
  [...projectStore.projects]
    .filter(project => project.featured)
    .sort((a, b) => {
      if (a.category !== b.category) {
        return a.category === 'ai' ? -1 : 1
      }

      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
    .slice(0, 4)
)

onMounted(async () => {
  if (!projectStore.projects.length) {
    await projectStore.loadProjects()
  }

  typeInterval = window.setInterval(() => {
    wordIndex.value = (wordIndex.value + 1) % words.length
  }, 2600)
})

onUnmounted(() => {
  if (typeInterval) {
    clearInterval(typeInterval)
  }
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(6, 182, 212, 0.12), transparent 26%),
    radial-gradient(circle at 82% 18%, rgba(99, 102, 241, 0.12), transparent 22%),
    var(--color-background);
}

.hero-section,
.home-section {
  padding: 56px 0 64px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  gap: 28px;
  align-items: stretch;
}

.hero-copy {
  padding: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--gradient-surface-hero);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-2xl);
}

.hero-kicker {
  display: inline-flex;
  margin-bottom: 18px;
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-title {
  font-size: clamp(2.8rem, 5vw, 5.2rem);
  line-height: 0.95;
  color: var(--color-text);
}

.hero-subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 18px 0 22px;
  font-size: clamp(1.25rem, 2vw, 2rem);
  color: var(--color-accent);
}

.hero-description {
  color: var(--color-text-secondary);
  line-height: 1.9;
  font-size: 1.02rem;
}

.hero-tags,
.featured-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero-tags {
  margin: 28px 0;
}

.hero-actions,
.featured-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-link,
.featured-link,
.quick-card {
  transition: all var(--duration-normal) var(--ease-in-out);
}

.hero-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 128px;
  padding: 12px 20px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.hero-link.primary {
  background: var(--gradient-accent);
  color: var(--color-background);
  border-color: transparent;
}

.hero-link.secondary:hover,
.hero-link.ghost:hover,
.featured-link:hover,
.quick-card:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
}

.hero-panel {
  display: grid;
  gap: 18px;
}

.hero-panel-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.hero-panel-card,
.featured-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  backdrop-filter: blur(10px);
}

.panel-label,
.featured-role {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-panel-card h3,
.hero-panel-card strong,
.featured-card h3 {
  color: var(--color-text);
}

.hero-panel-card p,
.featured-card p {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.intro-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quick-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.featured-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.featured-card-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.featured-link {
  color: var(--color-text);
}

.featured-link.accent {
  color: var(--color-accent);
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

@media (max-width: 1100px) {
  .hero-grid,
  .featured-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-section,
  .home-section {
    padding: 36px 0 48px;
  }

  .hero-copy,
  .hero-panel-card,
  .featured-card {
    padding: 22px;
  }

  .hero-panel-grid {
    grid-template-columns: 1fr;
  }
}
</style>
