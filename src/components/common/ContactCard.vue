<template>
  <Card variant="elevated" padding="large" class="contact-card">
    <div class="contact-header">
      <div>
        <p class="contact-kicker">Contact</p>
        <h3 class="contact-title">联系信息</h3>
      </div>
      <Badge variant="success" size="small">开放机会</Badge>
    </div>

    <div class="contact-content">
      <div v-for="item in items" :key="item.id" class="contact-item">
        <div class="contact-icon">{{ item.icon }}</div>
        <div class="contact-details">
          <span class="contact-label">{{ item.label }}</span>
          <a
            v-if="item.href"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
            class="contact-value link"
          >
            {{ item.value }}
          </a>
          <span v-else class="contact-value">{{ item.value }}</span>
        </div>
        <Button v-if="item.copyable" variant="ghost" size="small" @click="copyValue(item.value)">
          {{ copied === item.value ? '已复制' : '复制' }}
        </Button>
      </div>
    </div>

    <div class="contact-footer">
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
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        icon="github"
        aria-label="访问 GitHub 主页"
      >
        GitHub
      </Button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Card, Button, Badge } from '@/components/ui'

interface ContactItem {
  id: string
  label: string
  value: string
  icon: string
  href?: string
  external?: boolean
  copyable?: boolean
}

interface Props {
  phone: string
  email: string
  github: string
  location: string
}

const props = defineProps<Props>()

const copied = ref<string | null>(null)

const items = computed<ContactItem[]>(() => [
  {
    id: 'phone',
    label: '电话',
    value: props.phone,
    icon: '📞',
    href: `tel:${props.phone}`,
    copyable: true,
  },
  {
    id: 'email',
    label: '邮箱',
    value: props.email,
    icon: '✉',
    href: `mailto:${props.email}`,
    copyable: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: props.github,
    icon: '⌘',
    href: props.github,
    external: true,
  },
  {
    id: 'location',
    label: '意向城市',
    value: props.location,
    icon: '⌂',
  },
])

const githubUrl = computed(() => props.github)

const copyValue = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value)
    copied.value = value
    window.setTimeout(() => {
      copied.value = null
    }, 1800)
  } catch (error) {
    console.error('复制失败', error)
  }
}
</script>

<style scoped>
.contact-card {
  height: 100%;
}

.contact-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 16px;
  margin-bottom: 24px;
}

.contact-kicker {
  margin-bottom: 6px;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-title {
  color: var(--color-text);
  font-size: var(--font-size-2xl);
}

.contact-content {
  display: grid;
  gap: 14px;
}

.contact-item {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(15, 23, 42, 0.38);
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(6, 182, 212, 0.12);
  color: var(--color-accent);
  font-size: 1.2rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-label {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact-value {
  color: var(--color-text);
  word-break: break-all;
}

.contact-value.link:hover {
  color: var(--color-accent);
}

.contact-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

@media (max-width: 640px) {
  .contact-item {
    grid-template-columns: 44px minmax(0, 1fr);
  }
}
</style>
