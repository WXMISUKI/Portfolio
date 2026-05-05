<template>
  <footer class="footer">
    <div class="container-custom">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">罗雍来</h3>
          <p class="footer-subtitle">前端工程师・AI 全栈开发者</p>
          <p class="footer-description">
            聚焦政企复杂业务系统、GIS、视频流低延迟优化与智能体全栈落地，当前作品集优先展示可在线访问的
            AI 项目。
          </p>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">快速链接</h4>
          <nav class="footer-nav">
            <RouterLink to="/about">关于我</RouterLink>
            <RouterLink to="/projects">项目经验</RouterLink>
            <RouterLink to="/skills">技术栈</RouterLink>
            <RouterLink to="/contact">联系我</RouterLink>
          </nav>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">联系方式</h4>
          <div class="footer-contact">
            <a href="mailto:19042637070@139.com">邮箱：19042637070@139.com</a>
            <a href="tel:19042637070">电话：19042637070</a>
            <a href="https://github.com/WXMISUKI" target="_blank" rel="noopener noreferrer">
              GitHub：WXMISUKI
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">简历 PDF</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 罗雍来. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer组件
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, transparent, rgba(6, 182, 212, 0.04)), var(--color-footer-bg);
  border-top: 1px solid var(--color-footer-border);
  padding: 56px 0 24px;
  transition:
    background-color var(--duration-normal) var(--ease-in-out),
    border-color var(--duration-normal) var(--ease-in-out);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  margin-bottom: 32px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface-soft);
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
  margin: 0;
  transition: color var(--duration-normal) var(--ease-in-out);
}

.footer-subtitle {
  color: var(--color-text-secondary);
  margin: 0;
  transition: color var(--duration-normal) var(--ease-in-out);
}

.footer-description {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
  transition: color var(--duration-normal) var(--ease-in-out);
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-nav a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition:
    color var(--duration-normal) var(--ease-in-out),
    transform var(--duration-normal) var(--ease-in-out);
}

.footer-nav a:hover {
  color: var(--color-accent);
  transform: translateX(2px);
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-contact a {
  color: var(--color-text-secondary);
  transition:
    color var(--duration-normal) var(--ease-in-out),
    transform var(--duration-normal) var(--ease-in-out);
}

.footer-contact a:hover {
  color: var(--color-accent);
  transform: translateX(2px);
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid var(--color-footer-border);
  text-align: center;
  transition: border-color var(--duration-normal) var(--ease-in-out);
}

.footer-bottom p {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: 0.875rem;
  transition: color var(--duration-normal) var(--ease-in-out);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
