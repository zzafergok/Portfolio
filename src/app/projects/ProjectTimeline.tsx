'use client';

import React from 'react';

import { Calendar, ExternalLink, Github } from 'lucide-react';

import { useProjects } from '@/context/ProjectContext';

import { formatDate } from '@/utils/dates';

const ProjectTimeline: React.FC = () => {
  const { filteredProjects, categories, loading } = useProjects();

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex">
            <div className="w-24 h-6 bg-neutral-800 rounded mr-4"></div>
            <div className="flex-1">
              <div className="h-32 bg-neutral-800 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-gray-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-300">
          Bu kategoride henüz proje bulunmuyor
        </h3>
        <p className="mt-2 text-gray-500">
          Projeleri görüntülemek için farklı bir kategori seçebilirsiniz.
        </p>
      </div>
    );
  }

  // Group projects by year
  const projectsByYear: Record<string, typeof filteredProjects> = {};

  filteredProjects.forEach((project) => {
    const year =
      project.date.end === 'present'
        ? new Date().getFullYear().toString()
        : project.date.end.split('-')[0];

    if (!projectsByYear[year]) {
      projectsByYear[year] = [];
    }
    projectsByYear[year].push(project);
  });

  // Sort projects within each year by date (newest first)
  Object.keys(projectsByYear).forEach((year) => {
    projectsByYear[year].sort((a, b) => {
      const dateA =
        a.date.end === 'present' ? new Date().toISOString() : a.date.end;
      const dateB =
        b.date.end === 'present' ? new Date().toISOString() : b.date.end;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  });

  // Sort years in descending order
  const sortedYears = Object.keys(projectsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  // Get category title
  const getCategoryTitle = (categoryId: string | undefined) => {
    if (!categoryId || categoryId === 'all') return 'Tüm Projeler';
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.title : 'Diğer';
  };

  // Get category color
  const getCategoryColor = (categoryId: string | undefined) => {
    if (!categoryId) return 'bg-gray-600';

    switch (categoryId) {
      case 'professional':
        return 'bg-primary-600';
      case 'freelance':
        return 'bg-purple-600';
      case 'personal':
        return 'bg-green-600';
      default:
        return 'bg-neutral-600';
    }
  };

  return (
    <div className="space-y-12">
      {sortedYears.map((year) => (
        <div key={year} className="relative">
          <div className="mb-6 bg-white dark:bg-neutral-800 pt-2 pb-4">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">
              {year}
            </h2>
            <div className="mt-2 h-1 w-24 bg-indigo-500 rounded"></div>
          </div>

          <div className="space-y-8">
            {projectsByYear[year].map((project) => (
              <div key={project.id} className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-gray-700 ml-6"></div>

                <div className="flex items-start">
                  {/* Timeline dot */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full ${getCategoryColor(project.categoryId)} shadow-md flex items-center justify-center text-white`}
                  >
                    <span className="text-xs font-medium">
                      {project.title.substring(0, 2).toUpperCase()}
                    </span>
                  </div>

                  {/* Project card */}
                  <div className="ml-6 w-full">
                    <div className="bg-white dark:bg-neutral-800 border border-primary-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      {/* Header */}
                      <div className="p-5 border-b border-primary-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary-500 dark:bg-neutral-700 text-primary-50 dark:text-gray-200 mb-2">
                              {getCategoryTitle(project.categoryId)}
                            </span>
                            <h3 className="text-xl font-bold text-white">
                              {project.title}
                            </h3>
                            <div className="flex items-center mt-1 text-sm text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                {formatDate(project.date.start)} -{' '}
                                {project.date.end === 'present'
                                  ? 'Günümüz'
                                  : formatDate(project.date.end)}
                              </span>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-600 dark:bg-gray-700 text-primary-50 dark:text-gray-300 transition-colors"
                                title="GitHub"
                              >
                                <Github className="h-5 w-5" />
                              </a>
                            )}
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-600 dark:bg-gray-700 text-primary-50 dark:text-gray-300 transition-colors"
                                title="Canlı Görüntüle"
                              >
                                <ExternalLink className="h-5 w-5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex flex-col md:flex-row gap-5">
                          {/* Project Image */}
                          {project.image ? (
                            <div className="relative w-full md:w-40 h-40 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <span className="text-sm text-center">
                                  {project.title}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="relative w-full md:w-40 h-40 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0 flex items-center justify-center">
                              <span className="text-gray-500">
                                {project.title.substring(0, 1)}
                              </span>
                            </div>
                          )}

                          {/* Project Details */}
                          <div className="flex-1">
                            {project.company && (
                              <div className="mb-3">
                                <span className="text-sm font-medium text-gray-400">
                                  Şirket:
                                </span>
                                <span className="ml-2 text-neutral-800 dark:text-gray-200">
                                  {project.company}
                                </span>
                              </div>
                            )}

                            {/* Technologies */}
                            <div>
                              <span className="text-sm font-medium text-gray-400">
                                Teknolojiler:
                              </span>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500 dark:bg-neutral-700 text-primary-50 dark:text-gray-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTimeline;
