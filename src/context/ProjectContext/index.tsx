'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category, Project } from '@/types/projects';
import projectsContentData from '@/data/projectsContentData.json';

interface ProjectContextProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  projects: Project[];
  filteredProjects: Project[];
  loading: boolean;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize data
  useEffect(() => {
    try {
      const { categories } = projectsContentData;
      setCategories(categories);

      // Flatten all projects into a single array
      const allProjects: Project[] = [];
      categories.forEach((category) => {
        category.projects.forEach((project) => {
          allProjects.push({
            ...project,
            categoryId: category.id,
          });
        });
      });

      // Sort projects by date (most recent first)
      const sortedProjects = allProjects.sort((a, b) => {
        const dateA =
          a.date.end === 'present' ? new Date().toISOString() : a.date.end;
        const dateB =
          b.date.end === 'present' ? new Date().toISOString() : b.date.end;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });

      setProjects(sortedProjects);
      setFilteredProjects(sortedProjects);
      setLoading(false);
    } catch (error) {
      console.error('Error initializing project data:', error);
      setLoading(false);
    }
  }, []);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.categoryId === activeCategory
      );
      setFilteredProjects(filtered);
    }
  }, [activeCategory, projects]);

  return (
    <ProjectContext.Provider
      value={{
        categories,
        activeCategory,
        setActiveCategory,
        projects,
        filteredProjects,
        loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextProps => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
