<template>
  <Card variant="elevated" padding="medium" class="project-card" hoverable>
    <div class="project-image" v-if="coverImage">
      <img :src="coverImage" :alt="project.title" />
      <div class="project-overlay">
        <div class="project-category">{{ getCategoryName(project.category) }}</div>
      </div>
    </div>

    <div class="project-content">
      <div class="project-header">
        <h3 class="project-title">{{ project.title }}</h3>
        <Badge :variant="getBadgeVariant(project.category)" size="small">
          {{ getCategoryName(project.category) }}
        </Badge>
      </div>

      <p class="project-description">{{ project.description }}</p>

      <div class="project-tech">
        <Tag
          v-for="(tech, index) in project.techStack.slice(0, 5)"
          :key="index"
          variant="default"
          size="small"
        >
          {{ tech }}
        </Tag>
        <Tag v-if="project.techStack.length > 5" variant="outline" size="small">
          +{{ project.techStack.length - 5 }}
        </Tag>
      </div>

      <div class="project-highlights">
        <div
          v-for="(highlight, index) in project.highlights.slice(0, 3)"
          :key="index"
          class="highlight-item"
        >
          <svg
            class="check-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>{{ highlight }}</span>
        </div>
      </div>

      <div v-if="project.metrics" class="project-metrics">
        <div v-if="project.metrics.performance" class="metric">
          <span class="metric-label">性能提升</span>
          <span class="metric-value">{{ project.metrics.performance }}</span>
        </div>
        <div v-if="project.metrics.codeLines" class="metric">
          <span class="metric-label">代码量</span>
          <span class="metric-value">{{ project.metrics.codeLines }}</span>
        </div>
      </div>

      <div class="project-actions">
        <Button variant="primary" size="small" @click="handleViewDetails"> 查看详情 </Button>
        <Button
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="small"
          icon="arrow-right"
          aria-label="访问在线项目"
        >
          在线访问
        </Button>
        <Button
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="small"
          icon="github"
          aria-label="查看项目代码"
        >
          代码仓库
        </Button>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card, Button, Badge, Tag } from '@/components/ui'
import type { Project } from '@/types/project'

interface Props {
  project: Project
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewDetails: [project: Project]
}>()

const coverImage = computed(() => props.project.screenshots[0] ?? '')

const getCategoryName = (category: string) => {
  const map: Record<string, string> = {
    government: '政企项目',
    ai: 'AI项目',
    personal: '个人项目',
  }
  return map[category] || category
}

const getBadgeVariant = (category: string) => {
  const map: Record<string, 'primary' | 'success' | 'warning'> = {
    government: 'primary',
    ai: 'success',
    personal: 'warning',
  }
  return map[category] || 'primary'
}

const handleViewDetails = () => {
  emit('viewDetails', props.project)
}
</script>

<style scoped>
.project-card {
  height: 100%;
  transition: all var(--duration-normal) var(--ease-in-out);
}

.project-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-in-out);
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
}

.project-category {
  padding: 4px 12px;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  background: var(--color-accent);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9));
  color: white;
  border-radius: 9999px;
  backdrop-filter: blur(10px);
}

html.dark .project-category {
  background: rgba(6, 182, 212, 0.9);
}

.project-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  flex: 1;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.project-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
  flex: 1;
  transition: color var(--duration-normal) var(--ease-in-out);
}

.project-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color var(--duration-normal) var(--ease-in-out);
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.project-highlights {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  transition: color var(--duration-normal) var(--ease-in-out);
}

.check-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--color-accent);
  margin-top: 2px;
}

.project-metrics {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
  border-top: 1px solid var(--color-border);
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.metric-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
}

.metric-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent);
}

.project-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: auto;
  padding-top: var(--spacing-md);
}

/* Responsive */
@media (max-width: 768px) {
  .project-image {
    height: 150px;
  }

  .project-title {
    font-size: var(--font-size-lg);
  }

  .project-actions {
    flex-direction: column;
  }

  .project-actions .button {
    width: 100%;
  }
}
</style>
