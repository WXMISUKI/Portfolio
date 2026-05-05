<template>
  <div class="section-title" :style="{ '--section-align': align }">
    <h2 class="title">
      <span class="title-text">{{ title }}</span>
      <span v-if="badge" class="title-badge">{{ badge }}</span>
    </h2>
    <p v-if="description" class="description">
      {{ description }}
    </p>
    <div class="divider"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  badge?: string
  align?: 'left' | 'center' | 'right'
}

withDefaults(defineProps<Props>(), {
  align: 'left',
})
</script>

<style scoped>
.section-title {
  margin-bottom: var(--spacing-3xl);
  text-align: var(--section-align, left);
}

.title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
  transition: color var(--duration-normal) var(--ease-in-out);
}

.title-text {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-badge {
  padding: 4px 12px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  background: var(--color-accent);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: 9999px;
}

html.dark .title-badge {
  background: rgba(6, 182, 212, 0.2);
}

.description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  max-width: 800px;
  margin: 0 0 var(--spacing-xl);
  transition: color var(--duration-normal) var(--ease-in-out);
}

.divider {
  width: 80px;
  height: 4px;
  margin: 0;
  background: var(--gradient-accent);
  border-radius: 2px;
  transition: all var(--duration-normal) var(--ease-in-out);
}

.section-title[style*='center'] .title {
  justify-content: center;
}

.section-title[style*='center'] .description {
  margin-left: auto;
  margin-right: auto;
}

.section-title[style*='center'] .divider {
  margin-left: auto;
  margin-right: auto;
}

.section-title[style*='right'] .title {
  justify-content: flex-end;
}

.section-title[style*='right'] .description {
  margin-left: auto;
}

.section-title[style*='right'] .divider {
  margin-left: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    margin-bottom: var(--spacing-2xl);
  }

  .title {
    font-size: var(--font-size-3xl);
    flex-direction: column;
    align-items: flex-start;
  }

  .title-badge {
    margin-top: 8px;
  }

  .description {
    font-size: var(--font-size-base);
  }
}
</style>
