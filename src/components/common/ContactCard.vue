<template>
  <Card variant="elevated" padding="large" class="contact-card">
    <div class="contact-header">
      <h3 class="contact-title">联系信息</h3>
      <Badge variant="primary" size="small">随时联系</Badge>
    </div>
    
    <div class="contact-content">
      <div v-for="item in contactItems" :key="item.id" class="contact-item">
        <div class="contact-icon" :style="{ color: item.color }">
          <component :is="item.icon" />
        </div>
        <div class="contact-details">
          <span class="contact-label">{{ item.label }}</span>
          <span class="contact-value">{{ item.value }}</span>
        </div>
        <Button
          v-if="item.copyable"
          variant="ghost"
          size="small"
          @click="copyToClipboard(item.value)"
        >
          {{ copied === item.value ? '已复制' : '复制' }}
        </Button>
        <Button
          v-if="item.link"
          variant="ghost"
          size="small"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          tag="a"
        >
          访问
        </Button>
      </div>
    </div>
    
    <div class="contact-social">
      <span class="social-label">关注我：</span>
      <a
        v-for="social in socialLinks"
        :key="social.name"
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
        :title="social.name"
      >
        <component :is="social.icon" />
      </a>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { Card, Button, Badge } from '@/components/ui';

// Simple SVG icons as components
const MailIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2
}, [
  h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
  h('path', { d: 'M22 6l-10 7L2 6' })
]);

const PhoneIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2
}, [
  h('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' })
]);

const MapPinIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2
}, [
  h('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }),
  h('circle', { cx: '12', cy: '10', r: '3' })
]);

const GitHubIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'currentColor'
}, [
  h('path', { d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' })
]);

const LinkedInIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'currentColor'
}, [
  h('path', { d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' })
]);

const WeChatIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'currentColor'
}, [
  h('path', { d: 'M8.5,3.5C5.5,3.5,3,5.8,3,8.6c0,1.6,0.9,3,2.3,4c0.3-2.3,2.2-4.1,4.7-4.3C9.3,5.6,8.9,4.5,8.5,3.5z M10.6,5.8 c-2.8,0.3-5,2.6-5,5.5c0,3,2.4,5.5,5.5,5.5c0.6,0,1.2-0.1,1.8-0.3c0.3,0.5,0.6,0.9,0.9,1.3c-0.8,0.3-1.7,0.5-2.6,0.5 c-4.1,0-7.5-3.3-7.5-7.3s3.4-7.3,7.5-7.3C11.4,3.7,12.1,4.5,12.6,5.5c-0.7,0.1-1.3,0.2-2,0.3z M16.3,6.5c-2.8,0-5.1,2.2-5.1,4.9 c0,2.7,2.3,4.9,5.1,4.9c0.5,0,1-0.1,1.5-0.2c1.3,1.2,3.1,1.6,4.6,1.1c-0.1-1.3-0.9-2.7-2-3.5c0.6-0.8,0.9-1.7,0.9-2.7 C21.3,8.7,19,6.5,16.3,6.5z' })
]);

interface ContactItem {
  id: string;
  label: string;
  value: string;
  icon: any;
  color: string;
  copyable: boolean;
  link?: string;
}

const contactItems: ContactItem[] = [
  {
    id: 'email',
    label: '邮箱',
    value: 'contact@example.com',
    icon: MailIcon,
    color: '#10B981',
    copyable: true,
    link: 'mailto:contact@example.com'
  },
  {
    id: 'phone',
    label: '电话',
    value: '+86 138 0000 0000',
    icon: PhoneIcon,
    color: '#3B82F6',
    copyable: true,
    link: 'tel:+8613800000000'
  },
  {
    id: 'location',
    label: '位置',
    value: '中国·上海',
    icon: MapPinIcon,
    color: '#F59E0B',
    copyable: false
  }
];

interface SocialLink {
  name: string;
  url: string;
  icon: any;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: GitHubIcon
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: LinkedInIcon
  },
  {
    name: 'WeChat',
    url: '#',
    icon: WeChatIcon
  }
];

const copied = ref<string | null>(null);

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = text;
    setTimeout(() => {
      copied.value = null;
    }, 2000);
  } catch (error) {
    console.error('复制失败:', error);
  }
};
</script>

<style scoped>
.contact-card {
  max-width: 500px;
  margin: 0 auto;
}

.contact-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.contact-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  transition: color var(--duration-normal) var(--ease-in-out);
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  background: var(--color-background-alt);
  transition: all var(--duration-normal) var(--ease-in-out);
}

.contact-item:hover {
  transform: translateX(4px);
  background: var(--color-background-alt-dark);
}

html.dark .contact-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.contact-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.contact-icon svg {
  width: 20px;
  height: 20px;
}

.contact-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.contact-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  transition: color var(--duration-normal) var(--ease-in-out);
}

.contact-social {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.social-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
}

.social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--color-background-alt);
  color: var(--color-text);
  transition: all var(--duration-normal) var(--ease-in-out);
}

.social-link:hover {
  transform: translateY(-2px);
  background: var(--color-accent);
  color: white;
}

.social-link svg {
  width: 18px;
  height: 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-card {
    padding: var(--spacing-md) !important;
  }
  
  .contact-item {
    flex-wrap: wrap;
  }
  
  .contact-details {
    width: 100%;
    margin-bottom: var(--spacing-xs);
  }
  
  .contact-social {
    flex-wrap: wrap;
  }
}
</style>