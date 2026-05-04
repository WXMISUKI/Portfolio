<template>
  <div class="projects">
    <section class="projects-hero">
      <div class="container-custom projects-hero-inner">
        <div class="projects-hero-copy">
          <span class="projects-kicker">Project Portfolio</span>
          <h1 class="section-title">项目经验</h1>
          <p class="section-subtitle">
            以 AI 智能体项目为优先展示，同时保留政企复杂业务系统的工程交付能力。每个项目都尽量给出职责、方案和可量化成果。
          </p>
        </div>

        <div class="projects-highlight-grid">
          <div class="highlight-card">
            <span class="highlight-label">AI 项目</span>
            <strong>优先展示</strong>
            <p>已上线产品支持直接访问与仓库查看。</p>
          </div>
          <div class="highlight-card">
            <span class="highlight-label">政企项目</span>
            <strong>工程能力</strong>
            <p>突出 GIS、视频流、性能优化与业务落地。</p>
          </div>
        </div>
      </div>
    </section>

    <section class="projects-section">
      <div class="container-custom projects-layout">
        <aside class="projects-sidebar">
          <ProjectFilterPanel
            :categories="categories"
            :tech-stacks="projectStore.allTechStacks"
            v-model="filters"
          />
        </aside>

        <div class="projects-main">
          <div class="projects-toolbar">
            <div>
              <h2 class="projects-list-title">项目列表</h2>
              <p class="projects-list-meta">
                共 {{ sortedProjects.length }} 个项目，当前按 AI 项目优先排序。
              </p>
            </div>
            <div class="projects-summary">
              <span>在线演示 {{ demoCount }} 个</span>
              <span>精选项目 {{ featuredCount }} 个</span>
            </div>
          </div>

          <div class="projects-grid">
            <ProjectCard
              v-for="project in sortedProjects"
              :key="project.id"
              :project="project"
              @view-details="openDetail"
            />
          </div>

          <div v-if="!sortedProjects.length" class="projects-empty">
            <h3>没有匹配的项目</h3>
            <p>可以尝试清除筛选，或直接搜索项目名称、技术栈关键词。</p>
          </div>
        </div>
      </div>
    </section>

    <ProjectDetailPanel :project="selectedProject" @close="selectedProject = null" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { Project, ProjectFilter } from '@/types/project';
import { useProjectStore } from '@/store';
import ProjectCard from '@/components/common/ProjectCard.vue';
import ProjectFilterPanel from '@/components/common/ProjectFilter.vue';
import ProjectDetailPanel from '@/components/common/ProjectDetailPanel.vue';

const projectStore = useProjectStore();
const selectedProject = ref<Project | null>(null);
const filters = ref<ProjectFilter>({
  category: undefined,
  techStack: [],
  search: '',
});

const categories = [
  { id: 'all', name: '全部项目' },
  { id: 'ai', name: 'AI 项目' },
  { id: 'government', name: '政企项目' },
];

watch(
  filters,
  (value) => {
    projectStore.setFilter(value);
  },
  { deep: true }
);

onMounted(async () => {
  if (!projectStore.projects.length) {
    await projectStore.loadProjects();
  }
});

const sortedProjects = computed(() => {
  const priorityMap: Record<Project['category'], number> = {
    ai: 0,
    government: 1,
    personal: 2,
  };

  return [...projectStore.filteredProjects].sort((a, b) => {
    if (priorityMap[a.category] !== priorityMap[b.category]) {
      return priorityMap[a.category] - priorityMap[b.category];
    }

    if (a.featured !== b.featured) {
      return Number(b.featured) - Number(a.featured);
    }

    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
});

const demoCount = computed(() => projectStore.projects.filter((item) => item.demo).length);
const featuredCount = computed(() => projectStore.projects.filter((item) => item.featured).length);

const openDetail = (project: Project) => {
  selectedProject.value = project;
};
</script>

<style scoped>
.projects {
  background:
    radial-gradient(circle at top left, rgba(6, 182, 212, 0.1), transparent 26%),
    radial-gradient(circle at 85% 20%, rgba(99, 102, 241, 0.12), transparent 24%),
    var(--color-background);
}

.projects-hero {
  padding: 72px 0 32px;
}

.projects-hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.9fr);
  gap: 24px;
  align-items: stretch;
}

.projects-hero-copy,
.highlight-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: rgba(15, 23, 42, 0.68);
  backdrop-filter: blur(14px);
}

.projects-hero-copy {
  padding: 36px;
}

.projects-kicker {
  display: inline-flex;
  margin-bottom: 20px;
  color: var(--color-accent);
  letter-spacing: 0.12em;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
}

.section-title {
  font-size: clamp(2.4rem, 4vw, 4.6rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 16px;
  line-height: 1;
}

.section-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  max-width: 820px;
}

.projects-highlight-grid {
  display: grid;
  gap: 18px;
}

.highlight-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
}

.highlight-label {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.highlight-card strong {
  font-size: var(--font-size-2xl);
  color: var(--color-text);
}

.highlight-card p {
  color: var(--color-text-secondary);
}

.projects-section {
  padding: 0 0 96px;
}

.projects-layout {
  display: grid;
  grid-template-columns: minmax(280px, 320px) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.projects-sidebar {
  position: sticky;
  top: 88px;
}

.projects-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.projects-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: end;
  padding: 24px 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: rgba(15, 23, 42, 0.54);
  backdrop-filter: blur(10px);
}

.projects-list-title {
  font-size: var(--font-size-2xl);
  color: var(--color-text);
}

.projects-list-meta,
.projects-summary span,
.projects-empty p {
  color: var(--color-text-secondary);
}

.projects-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.projects-summary span {
  padding: 8px 12px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.projects-empty {
  padding: 40px 28px;
  text-align: center;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-2xl);
}

.projects-empty h3 {
  color: var(--color-text);
  margin-bottom: 8px;
}

@media (max-width: 1100px) {
  .projects-layout,
  .projects-hero-inner,
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .projects-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .projects-hero {
    padding-top: 48px;
  }

  .projects-hero-copy,
  .projects-toolbar {
    padding: 24px;
  }

  .projects-toolbar {
    align-items: start;
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .projects-section {
    padding-bottom: 72px;
  }
}
</style>
