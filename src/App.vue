<template>
  <div id="app" class="app">
    <TheHeader />
    <main class="main">
      <RouterView />
    </main>
    <TheFooter />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import BackToTop from '@/components/layout/BackToTop.vue';
</script>

<style>
.app {
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color var(--duration-normal) var(--ease-in-out),
              color var(--duration-normal) var(--ease-in-out);
}

.main {
  min-height: calc(100vh - 64px);
  padding-top: 64px;
}
</style>