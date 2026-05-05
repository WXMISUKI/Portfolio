export interface Project {
  id: string
  title: string
  category: 'government' | 'ai' | 'personal'
  type: string
  role: string
  startDate: string
  endDate: string
  duration: string
  techStack: string[]
  description: string
  objectives: string[]
  responsibilities: string[]
  highlights: string[]
  technicalHighlights?: string[]
  businessHighlights?: string[]
  challenges: Array<{
    problem: string
    solution: string
    result: string
  }>
  metrics: {
    performance?: string
    codeLines?: string
    documents?: string
    commits?: string
    localModels?: string
    improvement?: string
  }
  screenshots: string[]
  diagrams?: string[]
  demo?: string
  repo?: string
  detailedDescription?: string
  architecture?: string
  technologies?: string
  achievements?: string
  links?: {
    demo?: string
    repo?: string
    docs?: string
  }
  tags: string[]
  teamSize?: number
  teamRole?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface ProjectFilter {
  category?: string
  techStack?: string[]
  search?: string
}

export interface ProjectState {
  projects: Project[]
  currentProject: Project | null
  filter: ProjectFilter
  isLoading: boolean
}
