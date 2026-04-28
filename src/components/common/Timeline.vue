<template>
  <div class="timeline">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="timeline-item"
      :class="{ 'timeline-item-left': index % 2 === 0, 'timeline-item-right': index % 2 === 1 }"
    >
      <div class="timeline-marker">
        <div class="timeline-dot"></div>
      </div>
      <div class="timeline-content">
        <div class="timeline-date">{{ item.date }}</div>
        <h3 class="timeline-title">{{ item.title }}</h3>
        <p class="timeline-description">{{ item.description }}</p>
        <div v-if="item.tags" class="timeline-tags">
          <Tag
            v-for="(tag, tagIndex) in item.tags"
            :key="tagIndex"
            variant="default"
            size="small"
          >
            {{ tag }}
          </Tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tag from '@/components/ui/Tag.vue';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  tags?: string[];
}

interface Props {
  items: TimelineItem[];
}

defineProps<Props>();
</script>

<style scoped>
.timeline {
  position: relative;
  padding: var(--spacing-2xl) 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--gradient-accent);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-3xl);
  position: relative;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item-left {
  flex-direction: row;
}

.timeline-item-right {
  flex-direction: row-reverse;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-dot {
  width: 20px;
  height: 20px;
  background: var(--color-accent);
  border: 4px solid var(--color-background);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
  transition: all var(--duration-normal) var(--ease-in-out);
}

html.dark .timeline-dot {
  box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.2);
}

.timeline-item:hover .timeline-dot {
  transform: scale(1.2);
  box-shadow: 0 0 0 6px rgba(99, 102, 241, 0.3);
}

html.dark .timeline-item:hover .timeline-dot {
  box-shadow: 0 0 0 6px rgba(6, 182, 212, 0.3);
}

.timeline-content {
  flex: 1;
  max-width: calc(50% - 40px);
  padding: var(--spacing-xl);
  background: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  transition: all var(--duration-normal) var(--ease-in-out);
}

.timeline-item-left .timeline-content {
  margin-right: auto;
  margin-left: 0;
}

.timeline-item-right .timeline-content {
  margin-left: auto;
  margin-right: 0;
}

.timeline-item:hover .timeline-content {
  border-color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

html.light .timeline-item:hover .timeline-content {
  box-shadow: var(--shadow-md-light);
}

.timeline-date {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.timeline-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
  transition: color var(--duration-normal) var(--ease-in-out);
}

.timeline-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--spacing-md);
  transition: color var(--duration-normal) var(--ease-in-out);
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

/* Responsive */
@media (max-width: 768px) {
  .timeline::before {
    left: 20px;
  }
  
  .timeline-item {
    flex-direction: column;
    padding-left: 50px;
  }
  
  .timeline-item-left,
  .timeline-item-right {
    flex-direction: column;
  }
  
  .timeline-marker {
    left: 20px;
  }
  
  .timeline-content {
    max-width: 100%;
    margin: 0 !important;
  }
}
</style>