import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    theme: 'dark' as 'dark' | 'light',
    isMobileMenuOpen: false,
    isProjectDetailOpen: false,
    scrollPosition: 0,
  }),

  actions: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },

    toggleProjectDetail() {
      this.isProjectDetailOpen = !this.isProjectDetailOpen;
    },

    closeProjectDetail() {
      this.isProjectDetailOpen = false;
    },

    updateScrollPosition(position: number) {
      this.scrollPosition = position;
    },
  },
});