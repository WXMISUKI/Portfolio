<template>
  <div class="skills">
    <section class="skills-hero">
      <div class="container-custom">
        <span class="skills-kicker">Skill Matrix</span>
        <h1 class="section-title">技术栈</h1>
        <p class="section-subtitle">
          不只是列出技术名，而是结合真实项目说明我在哪些场景下使用过这些技术，以及它们如何支撑复杂业务系统和
          AI 产品落地。
        </p>
      </div>
    </section>

    <section class="skills-section">
      <div class="container-custom skills-grid">
        <Card
          v-for="category in skillCategories"
          :key="category.id"
          variant="elevated"
          padding="large"
          class="skill-category-card"
        >
          <div class="skill-category-header">
            <h2>{{ category.name }}</h2>
            <Badge variant="info" size="small">{{ category.skills.length }} 项</Badge>
          </div>

          <div class="skill-list">
            <div v-for="skill in category.skills" :key="skill.id" class="skill-item">
              <SkillProgress :name="skill.name" :level="skill.proficiency * 20" />
              <p class="skill-meta">
                关联项目：
                <span>{{
                  getProjectNames(skill.projects).join('、') || '当前作品集中未直接关联'
                }}</span>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Badge, Card } from '@/components/ui'
import SkillProgress from '@/components/common/SkillProgress.vue'
import { skillCategories } from '@/assets/data/skills'
import { useProjectStore } from '@/store'

const projectStore = useProjectStore()

onMounted(async () => {
  if (!projectStore.projects.length) {
    await projectStore.loadProjects()
  }
})

const projectNameMap = computed(() =>
  projectStore.projects.reduce<Record<string, string>>((acc, project) => {
    acc[project.id] = project.title
    return acc
  }, {})
)

const getProjectNames = (projectIds?: string[]) => {
  if (!projectIds?.length) {
    return []
  }

  return projectIds.map(projectId => projectNameMap.value[projectId]).filter(Boolean)
}
</script>

<style scoped>
.skills {
  background:
    radial-gradient(circle at top left, rgba(99, 102, 241, 0.12), transparent 22%),
    var(--color-background);
}

.skills-hero,
.skills-section {
  padding: 48px 0;
}

.skills-kicker {
  display: inline-flex;
  margin-bottom: 18px;
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.section-title {
  font-size: clamp(2.4rem, 4vw, 4.2rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 16px;
  line-height: 1;
}

.section-subtitle {
  max-width: 860px;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.skill-category-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-category-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.skill-category-header h2 {
  color: var(--color-text);
}

.skill-list {
  display: grid;
  gap: 18px;
}

.skill-item {
  padding: 16px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: rgba(15, 23, 42, 0.3);
}

.skill-meta {
  margin-top: 10px;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
}

.skill-meta span {
  color: var(--color-text);
}

@media (max-width: 960px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .skills-hero,
  .skills-section {
    padding: 32px 0;
  }
}
</style>
