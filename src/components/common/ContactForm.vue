<template>
  <Card variant="elevated" padding="large" class="contact-form-card">
    <div class="contact-form-header">
      <p class="contact-form-kicker">Contact Guide</p>
      <h3>沟通说明</h3>
      <p>
        当前站点定位为个人作品展示页，不提供在线提交表单，避免出现“页面可填但消息无法可靠送达”的伪能力。
        如需沟通，请直接使用邮箱、电话、GitHub 或简历中的联系方式。
      </p>
    </div>

    <div class="contact-guide-grid">
      <div class="guide-item">
        <span class="guide-label">推荐方式</span>
        <strong class="guide-title">邮箱直达</strong>
        <p>适合投递、面试邀请、项目合作和技术交流，信息链路最清晰。</p>
      </div>
      <div class="guide-item">
        <span class="guide-label">附件资料</span>
        <strong class="guide-title">简历 PDF</strong>
        <p>适合招聘方和面试官快速下载、转发和归档。</p>
      </div>
      <div class="guide-item">
        <span class="guide-label">代码能力</span>
        <strong class="guide-title">GitHub 仓库</strong>
        <p>可直接查看项目实现、提交记录和技术结构。</p>
      </div>
      <div class="guide-item">
        <span class="guide-label">沟通边界</span>
        <strong class="guide-title">展示站优先简洁可信</strong>
        <p>不接入无必要后端服务，保证页面信息真实、明确、可验证。</p>
      </div>
    </div>

    <div class="contact-cta-group">
      <Button
        :href="`mailto:${SITE_EMAIL}?subject=${encodeURIComponent('作品集沟通')}`"
        variant="primary"
        aria-label="通过邮箱联系"
      >
        发送邮件
      </Button>
      <Button
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        icon="download"
        aria-label="查看简历 PDF"
      >
        查看简历
      </Button>
      <Button
        :href="profile.contact.github"
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        icon="github"
        aria-label="访问 GitHub"
      >
        GitHub
      </Button>
    </div>

    <div class="contact-notes">
      <div class="note-item">
        <span class="note-label">邮箱</span>
        <span class="note-value">{{ SITE_EMAIL }}</span>
      </div>
      <div class="note-item">
        <span class="note-label">电话</span>
        <span class="note-value">{{ profile.contact.phone }}</span>
      </div>
      <div class="note-item">
        <span class="note-label">意向城市</span>
        <span class="note-value">{{ profile.jobExpectations.cities.join(' / ') }}</span>
      </div>
      <div class="note-item">
        <span class="note-label">求职状态</span>
        <span class="note-value">开放机会</span>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Button, Card } from '@/components/ui'
import profile from '@/assets/data/profile'
import { SITE_EMAIL } from '@/config/site'
</script>

<style scoped>
.contact-form-card {
  height: 100%;
}

.contact-form-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.contact-form-kicker {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-form-header h3 {
  color: var(--color-text);
  font-size: var(--font-size-2xl);
}

.contact-form-header p {
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.contact-guide-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.guide-item,
.note-item {
  padding: 16px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: rgba(15, 23, 42, 0.32);
}

.guide-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.guide-label,
.note-label {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.guide-title,
.note-value {
  color: var(--color-text);
}

.guide-item p {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.contact-cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.contact-notes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 24px;
}

.note-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

@media (max-width: 768px) {
  .contact-guide-grid,
  .contact-notes {
    grid-template-columns: 1fr;
  }
}
</style>
