<template>
  <Card variant="elevated" padding="large" class="contact-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name" class="form-label">姓名 *</label>
        <Input
          id="name"
          v-model="formData.name"
          type="text"
          placeholder="请输入您的姓名"
          size="medium"
          :class="{ 'input-error': errors.name }"
          @blur="validateField('name')"
        />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>
      
      <div class="form-group">
        <label for="email" class="form-label">邮箱 *</label>
        <Input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="请输入您的邮箱"
          size="medium"
          :class="{ 'input-error': errors.email }"
          @blur="validateField('email')"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>
      
      <div class="form-group">
        <label for="subject" class="form-label">主题 *</label>
        <Input
          id="subject"
          v-model="formData.subject"
          type="text"
          placeholder="请输入主题"
          size="medium"
          :class="{ 'input-error': errors.subject }"
          @blur="validateField('subject')"
        />
        <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
      </div>
      
      <div class="form-group">
        <label for="message" class="form-label">消息 *</label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="5"
          placeholder="请输入您的消息内容"
          class="form-textarea"
          :class="{ 'input-error': errors.message }"
          @blur="validateField('message')"
        ></textarea>
        <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
      </div>
      
      <div class="form-actions">
        <Button
          type="submit"
          variant="primary"
          size="large"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? '发送中...' : '发送消息' }}
        </Button>
      </div>
      
      <div v-if="submitStatus" :class="['form-status', `status-${submitStatus}`]">
        {{ submitStatus === 'success' ? '✓ 消息发送成功！我会尽快回复您。' : '✗ 发送失败，请稍后重试。' }}
      </div>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Card, Button, Input } from '@/components/ui';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const errors = reactive<FormErrors>({});
const isSubmitting = ref(false);
const submitStatus = ref<'success' | 'error' | null>(null);

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateField = (field: keyof FormErrors) => {
  errors[field] = '';
  
  switch (field) {
    case 'name':
      if (!formData.name) {
        errors.name = '请输入姓名';
      }
      break;
    case 'email':
      if (!formData.email) {
        errors.email = '请输入邮箱';
      } else if (!validateEmail(formData.email)) {
        errors.email = '请输入有效的邮箱地址';
      }
      break;
    case 'subject':
      if (!formData.subject) {
        errors.subject = '请输入主题';
      }
      break;
    case 'message':
      if (!formData.message) {
        errors.message = '请输入消息内容';
      } else if (formData.message.length < 10) {
        errors.message = '消息内容至少需要10个字符';
      }
      break;
  }
};

const validateForm = (): boolean => {
  Object.keys(errors).forEach(key => delete errors[key as keyof FormErrors]);
  
  validateField('name');
  validateField('email');
  validateField('subject');
  validateField('message');
  
  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  isSubmitting.value = true;
  submitStatus.value = null;
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 实际使用时，这里可以集成 EmailJS 或 Formspree
    // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    
    submitStatus.value = 'success';
    
    // 重置表单
    Object.assign(formData, {
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    
    // 清除状态
    setTimeout(() => {
      submitStatus.value = null;
    }, 5000);
  } catch (error) {
    submitStatus.value = 'error';
    console.error('表单提交失败:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  transition: color var(--duration-normal) var(--ease-in-out);
}

.input-error {
  border-color: var(--color-danger) !important;
}

.form-textarea {
  width: 100%;
  min-height: 150px;
  padding: var(--spacing-md);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-text);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  resize: vertical;
  transition: all var(--duration-normal) var(--ease-in-out);
  outline: none;
}

.form-textarea:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

html.dark .form-textarea:focus {
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
}

.form-textarea.input-error {
  border-color: var(--color-danger) !important;
}

.form-textarea::placeholder {
  color: var(--color-text-muted);
}

.error-message {
  font-size: var(--font-size-xs);
  color: var(--color-danger);
  margin-top: var(--spacing-xs);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--spacing-lg);
}

.form-status {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-top: var(--spacing-md);
  transition: all var(--duration-normal) var(--ease-in-out);
}

.status-success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--color-success);
  border: 1px solid var(--color-success);
}

.status-error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-danger);
  border: 1px solid var(--color-danger);
}

/* Responsive */
@media (max-width: 768px) {
  .contact-form {
    padding: var(--spacing-md) !important;
  }
  
  .form-actions {
    justify-content: stretch;
  }
  
  .form-actions .button {
    width: 100%;
  }
}
</style>