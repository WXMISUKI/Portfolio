<template>
  <div class="contact">
    <section class="contact-hero">
      <div class="container-custom">
        <span class="contact-kicker">Contact</span>
        <h1 class="section-title">联系我</h1>
        <p class="section-subtitle">
          当前以求职沟通与技术交流为主。为了保证信息真实可靠，联系方式、简历与 GitHub
          都会直接提供正式访问路径。
        </p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container-custom contact-grid">
        <ContactCard
          :phone="profile.contact.phone"
          :email="profile.contact.email"
          :github="profile.contact.github"
          :location="profile.jobExpectations.cities.join(' / ')"
        />
        <ContactForm />
      </div>
    </section>

    <section class="contact-section contact-status-section">
      <div class="container-custom contact-status-grid">
        <Card variant="elevated" padding="large">
          <SectionTitle title="求职状态" description="便于招聘方和合作方快速判断沟通方向" />
          <div class="status-list">
            <div class="status-item">
              <span>目标岗位</span>
              <strong>{{ profile.jobExpectations.positions.join(' / ') }}</strong>
            </div>
            <div class="status-item">
              <span>期望城市</span>
              <strong>{{ profile.jobExpectations.cities.join(' / ') }}</strong>
            </div>
            <div class="status-item">
              <span>期望薪资</span>
              <strong>{{ profile.jobExpectations.salary }}</strong>
            </div>
          </div>
        </Card>

        <Card variant="elevated" padding="large">
          <SectionTitle title="快速入口" description="适合 HR、面试官和合作方快速浏览" />
          <div class="quick-links">
            <a href="/projects" class="quick-link">查看项目展示</a>
            <a href="/resume.pdf" class="quick-link" target="_blank" rel="noopener noreferrer"
              >查看简历 PDF</a
            >
            <a
              :href="profile.contact.github"
              class="quick-link"
              target="_blank"
              rel="noopener noreferrer"
              >访问 GitHub</a
            >
          </div>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui'
import SectionTitle from '@/components/common/SectionTitle.vue'
import ContactCard from '@/components/common/ContactCard.vue'
import ContactForm from '@/components/common/ContactForm.vue'
import profile from '@/assets/data/profile'
</script>

<style scoped>
.contact {
  background:
    radial-gradient(circle at right top, rgba(6, 182, 212, 0.12), transparent 24%),
    var(--color-background);
}

.contact-hero,
.contact-section {
  padding: 48px 0;
}

.contact-kicker {
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
  max-width: 840px;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.contact-grid,
.contact-status-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.status-list,
.quick-links {
  display: grid;
  gap: 14px;
}

.status-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(15, 23, 42, 0.32);
}

.status-item span {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status-item strong {
  color: var(--color-text);
}

.quick-link {
  padding: 16px 18px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: rgba(15, 23, 42, 0.32);
  color: var(--color-text);
  transition: all var(--duration-normal) var(--ease-in-out);
}

.quick-link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
}

@media (max-width: 960px) {
  .contact-grid,
  .contact-status-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contact-hero,
  .contact-section {
    padding: 32px 0;
  }
}
</style>
