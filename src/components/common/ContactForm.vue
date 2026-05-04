<template>
  <Card variant="elevated" padding="large" class="contact-form-card">
    <div class="contact-form-header">
      <p class="contact-form-kicker">Message</p>
      <h3>联系表单</h3>
      <p>
        当前站点先提供静态表单结构，避免出现“看起来可发信、实际无后端”的伪能力。正式接入后可无缝切换到 EmailJS 或 Formspree。
      </p>
    </div>

    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <div class="form-group">
          <label for="contact-name">姓名</label>
          <Input id="contact-name" v-model="form.name" placeholder="请输入姓名" />
        </div>
        <div class="form-group">
          <label for="contact-email">邮箱</label>
          <Input id="contact-email" v-model="form.email" type="email" placeholder="请输入邮箱" />
        </div>
      </div>

      <div class="form-group">
        <label for="contact-subject">主题</label>
        <Input id="contact-subject" v-model="form.subject" placeholder="例如：合作、面试、项目交流" />
      </div>

      <div class="form-group">
        <label for="contact-message">消息内容</label>
        <textarea
          id="contact-message"
          v-model="form.message"
          rows="6"
          placeholder="请输入你的需求或问题"
        />
      </div>

      <div class="contact-form-actions">
        <Button native-type="submit" variant="primary">打开邮件客户端</Button>
        <span class="contact-form-note">提交后会自动拼接邮件内容，使用本机默认邮件客户端发送。</span>
      </div>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Card, Button, Input } from '@/components/ui';

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const handleSubmit = () => {
  const subject = encodeURIComponent(form.subject || '作品集沟通');
  const lines = [
    `姓名：${form.name || '未填写'}`,
    `邮箱：${form.email || '未填写'}`,
    '',
    '消息内容：',
    form.message || '未填写',
  ];
  const body = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:19042637070@139.com?subject=${subject}&body=${body}`;
};
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
  line-height: 1.7;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: var(--color-text);
  font-size: var(--font-size-sm);
}

.form-group textarea {
  width: 100%;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-primary);
  color: var(--color-text);
  resize: vertical;
}

.form-group textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.12);
}

.contact-form-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.contact-form-note {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
