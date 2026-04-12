export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  projects?: string[];
  learnedAt: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}