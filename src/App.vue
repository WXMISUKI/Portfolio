<template>
  <div id="app" class="min-h-screen bg-background text-primary">
    <TheHeader />
    <main class="min-h-screen">
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

<style scoped>
#app {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>