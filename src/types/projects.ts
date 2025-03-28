export interface DateRange {
  start: string;
  end: string | 'present';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  date: DateRange;
  technologies: string[];
  company?: string;
  github?: string;
  url?: string;
  image?: string;
  featured?: boolean;
  categoryId?: string; // Added when projects are flattened in context
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  projects: Project[];
}
