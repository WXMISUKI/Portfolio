import { defineStore } from 'pinia';
import type { Project, ProjectFilter, ProjectState } from '@/types/project';

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    projects: [],
    currentProject: null,
    filter: {
      category: undefined,
      techStack: [],
      search: '',
    },
    isLoading: false,
  }),

  getters: {
    filteredProjects: (state): Project[] => {
      let result = state.projects;

      // 按类别筛选
      if (state.filter.category) {
        result = result.filter(p => p.category === state.filter.category);
      }

      // 按技术栈筛选
      if (state.filter.techStack && state.filter.techStack.length > 0) {
        result = result.filter(p =>
          state.filter.techStack!.some(tech => p.techStack.includes(tech))
        );
      }

      // 按搜索关键词筛选
      if (state.filter.search) {
        const search = state.filter.search.toLowerCase();
        result = result.filter(
          p =>
            p.title.toLowerCase().includes(search) ||
            p.type.toLowerCase().includes(search) ||
            p.techStack.some(tech => tech.toLowerCase().includes(search))
        );
      }

      return result;
    },

    projectById: (state) => (id: string): Project | undefined => {
      return state.projects.find(p => p.id === id);
    },

    allTechStacks: (state): string[] => {
      const techs = new Set<string>();
      state.projects.forEach(project => {
        project.techStack.forEach(tech => techs.add(tech));
      });
      return Array.from(techs).sort();
    },

    featuredProjects: (state): Project[] => {
      return state.projects.filter(p => p.featured);
    },

    projectsByCategory: (state) => {
      return state.projects.reduce((acc, project) => {
        if (!acc[project.category]) {
          acc[project.category] = [];
        }
        acc[project.category].push(project);
        return acc;
      }, {} as Record<string, Project[]>);
    },
  },

  actions: {
    async loadProjects() {
      this.isLoading = true;
      try {
        const data = await import('@/assets/data/projects');
        this.projects = data.default;
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        this.isLoading = false;
      }
    },

    setFilter(filter: Partial<ProjectFilter>) {
      this.filter = { ...this.filter, ...filter };
    },

    resetFilter() {
      this.filter = {
        category: undefined,
        techStack: [],
        search: '',
      };
    },

    setCurrentProject(project: Project | null) {
      this.currentProject = project;
    },
  },
});