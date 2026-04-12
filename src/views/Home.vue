<template>
  <div class="home">
    <!-- 英雄区 -->
    <section class="hero-section">
      <div class="container-custom">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">罗雍来</h1>
            <h2 class="hero-subtitle">
              <span v-for="(word, index) in typedWords" :key="index">
                {{ word }}
              </span>
              <span class="cursor-blink">|</span>
            </h2>
            <p class="hero-description">
              拥有政企大型项目前端工程经验，擅长GIS地图、视频流、数据大屏、低延迟优化；同时具备AI智能体/大模型应用全栈开发能力
            </p>

            <!-- 标签 -->
            <div class="hero-tags">
              <span v-for="tag in tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>

            <!-- 按钮 -->
            <div class="hero-actions">
              <RouterLink to="/projects" class="btn btn-primary">
                查看项目 →
              </RouterLink>
              <a href="/resume.pdf" class="btn btn-secondary" target="_blank">
                下载简历
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 滚动提示 -->
      <div class="scroll-indicator">
        <div class="scroll-arrow"></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const typedWords = ref(['前端工程专家']);
let wordIndex = 0;
let typeInterval: number | null = null;

const tags = ref([
  '政企项目',
  'GIS',
  '视频监控',
  'AI 智能体',
  '大模型',
  '全栈开发',
]);

const words = ['前端工程专家', 'AI 全栈开发者', '性能优化专家'];

const typeWriter = () => {
  if (wordIndex < words.length) {
    typedWords.value = [words[wordIndex]];
    wordIndex = (wordIndex + 1) % words.length;
  }
};

onMounted(() => {
  typeInterval = window.setInterval(typeWriter, 3000);
});

onUnmounted(() => {
  if (typeInterval) {
    clearInterval(typeInterval);
  }
});
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 80px 0;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: 16px;
  text-shadow: 0 0 30px rgba(6, 182, 212, 0.3);
  animation: fadeInUp 0.8s ease-out;
}

.hero-subtitle {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;
  animation: fadeInUp 0.8s ease-out 0.6s backwards;
}

.hero-tags .tag {
  padding: 8px 16px;
  background: rgba(6, 182, 212, 0.1);
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.hero-tags .tag:hover {
  background: rgba(6, 182, 212, 0.2);
  transform: translateY(-2px);
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  animation: fadeInUp 0.8s ease-out 0.8s backwards;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--color-accent);
  color: var(--color-background);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-accent);
}

.btn-secondary {
  background: transparent;
  color: var(--color-accent);
  border: 2px solid var(--color-accent);
}

.btn-secondary:hover {
  background: rgba(6, 182, 212, 0.1);
  transform: translateY(-2px);
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 24px;
  height: 24px;
  border-right: 2px solid var(--color-accent);
  border-bottom: 2px solid var(--color-accent);
  transform: rotate(45deg);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>