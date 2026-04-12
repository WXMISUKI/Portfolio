<template>
  <footer class="footer">
    <div class="container-custom">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">罗雍来</h3>
          <p class="footer-subtitle">前端工程 & AI 全栈开发者</p>
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
            <p>邮箱: 19042637070@139.com</p>
            <p>GitHub: WXMISUKI</p>
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
  background: var(--color-primary);
  border-top: 1px solid var(--color-border);
  padding: 48px 0 24px;
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
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
  margin: 0;
}

.footer-subtitle {
  color: var(--color-text-secondary);
  margin: 0;
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-nav a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-nav a:hover {
  color: var(--color-accent);
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-contact p {
  color: var(--color-text-secondary);
  margin: 0;
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.footer-bottom p {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>