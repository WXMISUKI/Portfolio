<template>
  <div
    v-if="project"
    class="project-detail-backdrop"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="titleId"
    @click.self="$emit('close')"
  >
    <div class="project-detail-panel">
      <div class="project-detail-header">
        <div class="project-detail-title-wrap">
          <Badge :variant="categoryVariant" size="small" class="project-detail-badge">
            {{ categoryLabel }}
          </Badge>
          <h2 :id="titleId" class="project-detail-title">{{ project.title }}</h2>
          <p class="project-detail-type">{{ project.type }}</p>
        </div>
        <button
          class="project-detail-close"
          type="button"
          aria-label="关闭项目详情"
          @click="$emit('close')"
        >
          ×
        </button>
      </div>

      <div class="project-detail-body">
        <section class="project-detail-gallery">
          <button
            v-if="currentImage"
            type="button"
            class="project-detail-preview-trigger"
            :aria-label="`查看 ${project.title} 项目大图`"
            @click="openPreview"
          >
            <img
              :src="currentImage"
              :alt="`${project.title} 项目截图`"
              class="project-detail-cover"
            />
            <span class="project-detail-preview-hint">点击查看大图</span>
            <span class="project-detail-image-count">
              {{ activeImage + 1 }} / {{ validScreenshots.length }}
            </span>
          </button>
          <div v-else class="project-detail-placeholder">
            <span>暂无可展示截图</span>
          </div>

          <div v-if="validScreenshots.length > 1" class="project-detail-thumbs">
            <button
              v-for="(screenshot, index) in validScreenshots"
              :key="screenshot"
              type="button"
              class="project-detail-thumb"
              :class="{ active: screenshot === currentImage }"
              @click="activeImage = index"
            >
              <img :src="screenshot" :alt="`${project.title} 缩略图 ${index + 1}`" />
            </button>
          </div>
        </section>

        <section class="project-detail-main">
          <div class="project-detail-meta">
            <div class="meta-item">
              <span class="meta-label">角色</span>
              <span class="meta-value">{{ project.role }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">周期</span>
              <span class="meta-value">{{ project.duration }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">时间</span>
              <span class="meta-value">{{ project.startDate }} - {{ project.endDate }}</span>
            </div>
          </div>

          <p class="project-detail-description">
            {{ project.detailedDescription || project.description }}
          </p>

          <div class="project-detail-actions">
            <Button
              v-if="project.demo"
              :href="project.demo"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
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
              variant="secondary"
              icon="github"
              aria-label="查看项目代码仓库"
            >
              查看代码
            </Button>
          </div>

          <div class="project-detail-section">
            <h3>核心亮点</h3>
            <ul>
              <li v-for="highlight in project.highlights" :key="highlight">{{ highlight }}</li>
            </ul>
          </div>

          <div v-if="project.technicalHighlights?.length" class="project-detail-section">
            <h3>技术实现</h3>
            <ul>
              <li v-for="item in project.technicalHighlights" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div v-if="project.challenges.length" class="project-detail-section">
            <h3>难点与解决方案</h3>
            <div class="challenge-list">
              <article
                v-for="challenge in project.challenges"
                :key="challenge.problem"
                class="challenge-item"
              >
                <h4>{{ challenge.problem }}</h4>
                <p><strong>方案：</strong>{{ challenge.solution }}</p>
                <p><strong>结果：</strong>{{ challenge.result }}</p>
              </article>
            </div>
          </div>

          <div class="project-detail-section">
            <h3>技术栈</h3>
            <div class="project-tech-list">
              <Tag v-for="tech in project.techStack" :key="tech" variant="outline" size="small">
                {{ tech }}
              </Tag>
            </div>
          </div>

          <div class="project-detail-section">
            <h3>量化成果</h3>
            <div class="metrics-grid">
              <div v-for="metric in metricEntries" :key="metric.label" class="metric-card">
                <span class="metric-label">{{ metric.label }}</span>
                <span class="metric-value">{{ metric.value }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div
      v-if="isPreviewOpen && currentImage"
      class="project-image-viewer"
      role="dialog"
      aria-modal="true"
      :aria-label="`${project.title} 项目截图预览`"
      @click.self="closePreview"
    >
      <button
        type="button"
        class="project-image-viewer-close"
        aria-label="关闭图片预览"
        @click="closePreview"
      >
        ×
      </button>

      <button
        v-if="canNavigate"
        type="button"
        class="project-image-viewer-nav prev"
        aria-label="查看上一张图片"
        @click.stop="showPrevImage"
      >
        ‹
      </button>

      <div class="project-image-viewer-stage" @click.stop>
        <img
          :src="currentImage"
          :alt="`${project.title} 项目大图 ${activeImage + 1}`"
          class="project-image-viewer-image"
        />
        <div class="project-image-viewer-caption">
          <strong>{{ project.title }}</strong>
          <span>第 {{ activeImage + 1 }} 张，共 {{ validScreenshots.length }} 张</span>
        </div>
      </div>

      <button
        v-if="canNavigate"
        type="button"
        class="project-image-viewer-nav next"
        aria-label="查看下一张图片"
        @click.stop="showNextImage"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import type { Project } from '@/types/project'
import { Badge, Button, Tag } from '@/components/ui'

interface Props {
  project: Project | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const titleId = 'project-detail-title'
const activeImage = ref(0)
const isPreviewOpen = ref(false)

watch(
  () => props.project?.id,
  projectId => {
    activeImage.value = 0
    isPreviewOpen.value = false

    if (typeof document !== 'undefined') {
      document.body.style.overflow = projectId ? 'hidden' : ''
    }
  }
)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    if (isPreviewOpen.value) {
      closePreview()
      return
    }

    if (props.project) {
      emit('close')
    }
  }

  if (isPreviewOpen.value && event.key === 'ArrowLeft') {
    showPrevImage()
  }

  if (isPreviewOpen.value && event.key === 'ArrowRight') {
    showNextImage()
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }

  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})

const validScreenshots = computed(() => props.project?.screenshots.filter(Boolean) ?? [])
const currentImage = computed(
  () => validScreenshots.value[activeImage.value] ?? validScreenshots.value[0] ?? ''
)
const canNavigate = computed(() => validScreenshots.value.length > 1)

const openPreview = () => {
  if (currentImage.value) {
    isPreviewOpen.value = true
  }
}

const closePreview = () => {
  isPreviewOpen.value = false
}

const showPrevImage = () => {
  if (!validScreenshots.value.length) {
    return
  }

  activeImage.value =
    activeImage.value === 0 ? validScreenshots.value.length - 1 : activeImage.value - 1
}

const showNextImage = () => {
  if (!validScreenshots.value.length) {
    return
  }

  activeImage.value =
    activeImage.value === validScreenshots.value.length - 1 ? 0 : activeImage.value + 1
}

const categoryLabel = computed(() => {
  switch (props.project?.category) {
    case 'ai':
      return 'AI 项目'
    case 'government':
      return '政企项目'
    default:
      return '个人项目'
  }
})

const categoryVariant = computed(() => {
  switch (props.project?.category) {
    case 'ai':
      return 'success'
    case 'government':
      return 'primary'
    default:
      return 'warning'
  }
})

const metricLabelMap: Record<string, string> = {
  performance: '性能提升',
  codeLines: '代码量',
  documents: '文档产出',
  commits: '提交记录',
  localModels: '本地模型',
  improvement: '关键成果',
}

const metricEntries = computed(() => {
  if (!props.project?.metrics) {
    return []
  }

  return Object.entries(props.project.metrics)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => ({
      label: metricLabelMap[key] ?? key,
      value: value as string,
    }))
})
</script>

<style scoped>
.project-detail-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: rgba(2, 6, 23, 0.74);
  backdrop-filter: blur(12px);
}

.project-detail-panel {
  width: min(1120px, 100%);
  max-height: calc(100vh - 48px);
  overflow: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--gradient-surface-panel);
  box-shadow: var(--shadow-2xl);
}

.project-detail-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 32px 32px 24px;
  border-bottom: 1px solid var(--color-border);
}

.project-detail-title-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.project-detail-badge {
  align-self: flex-start;
}

.project-detail-title {
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  line-height: 1.1;
  color: var(--color-text);
}

.project-detail-type {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
}

.project-detail-close {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  font-size: 1.5rem;
  transition: all var(--duration-normal) var(--ease-in-out);
}

.project-detail-close:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.project-detail-body {
  display: grid;
  grid-template-columns: minmax(300px, 420px) minmax(0, 1fr);
  gap: 32px;
  padding: 32px;
}

.project-detail-gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.project-detail-preview-trigger {
  position: relative;
  padding: 0;
  border: 0;
  background: transparent;
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: zoom-in;
}

.project-detail-cover,
.project-detail-placeholder {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface-inset);
}

.project-detail-cover {
  object-fit: cover;
  transition: transform var(--duration-normal) var(--ease-in-out);
}

.project-detail-preview-trigger:hover .project-detail-cover {
  transform: scale(1.02);
}

.project-detail-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
}

.project-detail-preview-hint,
.project-detail-image-count {
  position: absolute;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  background: rgba(2, 6, 23, 0.6);
  color: #f8fafc;
  font-size: var(--font-size-xs);
  backdrop-filter: blur(10px);
}

.project-detail-preview-hint {
  left: 16px;
  bottom: 16px;
  opacity: 0;
  transform: translateY(6px);
  transition: all var(--duration-normal) var(--ease-in-out);
}

.project-detail-preview-trigger:hover .project-detail-preview-hint {
  opacity: 1;
  transform: translateY(0);
}

.project-detail-image-count {
  top: 16px;
  right: 16px;
}

.project-detail-thumbs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.project-detail-thumb {
  padding: 0;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: transparent;
  opacity: 0.72;
}

.project-detail-thumb.active {
  border-color: var(--color-accent);
  opacity: 1;
}

.project-detail-thumb img {
  width: 100%;
  aspect-ratio: 1.2;
  object-fit: cover;
}

.project-detail-main {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.project-detail-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: var(--radius-lg);
  background: var(--color-surface-soft);
  border: 1px solid var(--color-border);
}

.meta-label {
  font-size: var(--font-size-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.meta-value {
  color: var(--color-text);
  font-weight: var(--font-weight-semibold);
}

.project-detail-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  line-height: var(--leading-relaxed);
}

.project-detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.project-detail-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.project-detail-section h3,
.challenge-item h4 {
  color: var(--color-text);
}

.project-detail-section ul {
  display: grid;
  gap: 10px;
  padding-left: 18px;
  color: var(--color-text-secondary);
}

.challenge-list {
  display: grid;
  gap: 14px;
}

.challenge-item {
  padding: 18px;
  border-radius: var(--radius-lg);
  background: var(--color-surface-soft);
  border: 1px solid var(--color-border);
}

.challenge-item p {
  margin-top: 8px;
  color: var(--color-text-secondary);
}

.project-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.metric-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border-radius: var(--radius-lg);
  background: var(--color-surface-soft);
  border: 1px solid var(--color-border);
}

.metric-label {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}

.metric-value {
  color: var(--color-accent);
  font-weight: var(--font-weight-bold);
}

.project-image-viewer {
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-modal) + 10);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: rgba(2, 6, 23, 0.9);
  backdrop-filter: blur(16px);
}

.project-image-viewer-stage {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: min(1120px, 100%);
  max-height: 100%;
}

.project-image-viewer-image {
  width: 100%;
  max-height: calc(100vh - 150px);
  object-fit: contain;
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: var(--shadow-2xl);
}

.project-image-viewer-caption {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  color: #e2e8f0;
  font-size: var(--font-size-sm);
}

.project-image-viewer-caption strong {
  color: #f8fafc;
}

.project-image-viewer-close,
.project-image-viewer-nav {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(15, 23, 42, 0.64);
  color: #f8fafc;
  font-size: 1.8rem;
  backdrop-filter: blur(10px);
  transition: all var(--duration-normal) var(--ease-in-out);
}

.project-image-viewer-close:hover,
.project-image-viewer-nav:hover {
  border-color: rgba(255, 255, 255, 0.34);
  background: rgba(15, 23, 42, 0.84);
}

.project-image-viewer-close {
  top: 24px;
  right: 24px;
}

.project-image-viewer-nav {
  top: 50%;
  transform: translateY(-50%);
}

.project-image-viewer-nav.prev {
  left: 24px;
}

.project-image-viewer-nav.next {
  right: 24px;
}

@media (max-width: 960px) {
  .project-detail-body {
    grid-template-columns: 1fr;
  }

  .project-detail-meta {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .project-detail-backdrop {
    padding: 12px;
  }

  .project-detail-header,
  .project-detail-body {
    padding: 20px;
  }

  .project-detail-thumbs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .project-image-viewer {
    padding: 16px;
  }

  .project-image-viewer-stage {
    gap: 12px;
  }

  .project-image-viewer-caption {
    flex-direction: column;
    align-items: flex-start;
  }

  .project-image-viewer-close {
    top: 16px;
    right: 16px;
  }

  .project-image-viewer-nav {
    width: 42px;
    height: 42px;
    font-size: 1.5rem;
  }

  .project-image-viewer-nav.prev {
    left: 12px;
  }

  .project-image-viewer-nav.next {
    right: 12px;
  }
}
</style>
