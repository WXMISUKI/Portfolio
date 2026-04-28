<template>
  <div class="project-filter">
    <div class="filter-section">
      <h4 class="filter-title">类别</h4>
      <div class="filter-buttons">
        <Button
          v-for="category in categories"
          :key="category.id"
          :variant="selectedCategory === category.id ? 'primary' : 'ghost'"
          size="small"
          @click="selectCategory(category.id)"
        >
          {{ category.name }}
        </Button>
      </div>
    </div>
    
    <div class="filter-section">
      <h4 class="filter-title">技术栈</h4>
      <div class="filter-tags">
        <Tag
          v-for="tech in techStacks"
          :key="tech"
          :variant="selectedTechs.includes(tech) ? 'primary' : 'outline'"
          size="small"
          :closable="selectedTechs.includes(tech)"
          @click="toggleTech(tech)"
          @close="removeTech(tech)"
        >
          {{ tech }}
        </Tag>
      </div>
    </div>
    
    <div class="filter-section filter-search">
      <h4 class="filter-title">搜索</h4>
      <Input
        v-model="searchQuery"
        placeholder="搜索项目名称..."
        variant="default"
        size="medium"
        clearable
        @input="handleSearch"
      />
    </div>
    
    <div v-if="hasFilters" class="filter-actions">
      <Button
        variant="ghost"
        size="small"
        @click="clearFilters"
      >
        清除筛选
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Button, Tag, Input } from '@/components/ui';

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  techStacks: string[];
  modelValue?: FilterOptions;
}

interface FilterOptions {
  category?: string;
  techStack?: string[];
  search?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    category: 'all',
    techStack: [],
    search: ''
  })
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: FilterOptions): void;
}>();

const selectedCategory = ref(props.modelValue?.category || 'all');
const selectedTechs = ref<string[]>(props.modelValue?.techStack || []);
const searchQuery = ref(props.modelValue?.search || '');

const hasFilters = computed(() => {
  return selectedCategory.value !== 'all' || 
         selectedTechs.value.length > 0 || 
         searchQuery.value.length > 0;
});

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
  emitFilters();
};

const toggleTech = (tech: string) => {
  const index = selectedTechs.value.indexOf(tech);
  if (index > -1) {
    selectedTechs.value.splice(index, 1);
  } else {
    selectedTechs.value.push(tech);
  }
  emitFilters();
};

const removeTech = (tech: string) => {
  const index = selectedTechs.value.indexOf(tech);
  if (index > -1) {
    selectedTechs.value.splice(index, 1);
    emitFilters();
  }
};

const handleSearch = () => {
  emitFilters();
};

const clearFilters = () => {
  selectedCategory.value = 'all';
  selectedTechs.value = [];
  searchQuery.value = '';
  emitFilters();
};

const emitFilters = () => {
  const filters: FilterOptions = {
    category: selectedCategory.value === 'all' ? undefined : selectedCategory.value,
    techStack: selectedTechs.value,
    search: searchQuery.value,
  };
  emit('update:modelValue', filters);
};
</script>

<style scoped>
.project-filter {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  transition: all var(--duration-normal) var(--ease-in-out);
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.filter-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin: 0;
  transition: color var(--duration-normal) var(--ease-in-out);
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.filter-search {
  margin-top: var(--spacing-sm);
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

/* Responsive */
@media (max-width: 768px) {
  .project-filter {
    padding: var(--spacing-md);
  }
  
  .filter-buttons {
    gap: var(--spacing-xs);
  }
  
  .filter-actions {
    justify-content: stretch;
  }
  
  .filter-actions .button {
    width: 100%;
  }
}
</style>