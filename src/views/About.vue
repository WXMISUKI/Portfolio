<template>
  <div class="about">
    <section class="about-hero">
      <div class="container-custom about-hero-grid">
        <div class="about-hero-copy">
          <span class="about-kicker">About Me</span>
          <h1 class="section-title">关于我</h1>
          <p class="section-subtitle">{{ profile.description }}</p>
          <div class="about-tag-list">
            <Tag v-for="tag in personalTags" :key="tag" size="small" variant="outline">
              {{ tag }}
            </Tag>
          </div>
        </div>

        <Card variant="elevated" padding="large" class="about-summary-card">
          <h2>{{ profile.title }}</h2>
          <p>{{ profile.subtitle }}</p>
          <div class="summary-block">
            <span>求职方向</span>
            <strong>{{ profile.jobExpectations.positions.join(' / ') }}</strong>
          </div>
          <div class="summary-block">
            <span>期望城市</span>
            <strong>{{ profile.jobExpectations.cities.join(' / ') }}</strong>
          </div>
          <div class="summary-block">
            <span>期望薪资</span>
            <strong>{{ profile.jobExpectations.salary }}</strong>
          </div>
        </Card>
      </div>
    </section>

    <section class="about-section">
      <div class="container-custom">
        <Statistics :statistics="displayMetrics" />
      </div>
    </section>

    <section class="about-section">
      <div class="container-custom about-grid">
        <Card variant="elevated" padding="large">
          <SectionTitle title="职业时间线" description="围绕真实项目积累复杂业务与 AI 应用能力" />
          <Timeline :items="timelineItems" />
        </Card>

        <Card variant="elevated" padding="large" class="job-card">
          <SectionTitle title="求职信息" description="基于当前简历与项目方向整理" />
          <div class="job-info-list">
            <div class="job-info-item">
              <span class="job-info-label">当前状态</span>
              <strong>{{ jobInfo.status }}</strong>
            </div>
            <div class="job-info-item">
              <span class="job-info-label">到岗时间</span>
              <strong>{{ jobInfo.availableTime }}</strong>
            </div>
            <div class="job-info-item">
              <span class="job-info-label">目标城市</span>
              <strong>{{ jobInfo.cities.join(' / ') }}</strong>
            </div>
            <div class="job-info-item">
              <span class="job-info-label">目标薪资</span>
              <strong>{{ jobInfo.salary }}</strong>
            </div>
          </div>

          <div class="job-targets">
            <article v-for="position in jobInfo.positions" :key="position.title" class="job-target">
              <h3>{{ position.title }}</h3>
              <p>{{ position.description }}</p>
            </article>
          </div>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card, Tag } from '@/components/ui'
import SectionTitle from '@/components/common/SectionTitle.vue'
import Statistics from '@/components/common/Statistics.vue'
import Timeline from '@/components/common/Timeline.vue'
import { profile, timeline, metrics, personalTags, jobInfo } from '@/assets/data/profile'

const displayMetrics = computed(() =>
  metrics.map(item => ({
    label: item.label,
    value: item.value,
    suffix: item.suffix,
  }))
)

const timelineItems = computed(() =>
  timeline.flatMap(yearGroup =>
    yearGroup.events.map(event => ({
      date: `${yearGroup.year}.${event.month}`,
      title: event.title,
      description: `${event.role}｜${event.description}`,
      tags: [yearGroup.year, event.role],
    }))
  )
)
</script>

<style scoped>
.about {
  background:
    radial-gradient(circle at top right, rgba(6, 182, 212, 0.1), transparent 24%),
    var(--color-background);
}

.about-hero,
.about-section {
  padding: 48px 0;
}

.about-hero-grid,
.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 24px;
}

.about-hero-copy {
  padding: 36px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background:
    linear-gradient(160deg, rgba(6, 182, 212, 0.08), transparent 44%), rgba(15, 23, 42, 0.56);
}

.about-kicker {
  display: inline-flex;
  margin-bottom: 20px;
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.section-title {
  font-size: clamp(2.4rem, 4vw, 4.4rem);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 16px;
  line-height: 1;
}

.section-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.about-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.about-summary-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.about-summary-card h2,
.job-target h3 {
  color: var(--color-text);
}

.about-summary-card p,
.job-target p {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.summary-block,
.job-info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: rgba(15, 23, 42, 0.35);
}

.summary-block span,
.job-info-label {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.summary-block strong,
.job-info-item strong {
  color: var(--color-text);
}

.job-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.job-info-list,
.job-targets {
  display: grid;
  gap: 14px;
}

.job-target {
  padding: 18px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: rgba(15, 23, 42, 0.35);
}

@media (max-width: 1024px) {
  .about-hero-grid,
  .about-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-hero,
  .about-section {
    padding: 32px 0;
  }

  .about-hero-copy {
    padding: 24px;
  }
}
</style>
