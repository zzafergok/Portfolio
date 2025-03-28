'use client';

import React from 'react';

import { useProjects } from '@/context/ProjectContext';
import Tooltip from '@/components/ui/Tooltip'; // Import from your new Radix tooltip
import { isLessThan, useWindowSize } from '@/hooks/useWindowSize';

const ProjectSidebar: React.FC = () => {
  const { categories, activeCategory, setActiveCategory, loading, projects } =
    useProjects();
  const { width } = useWindowSize();
  const isMobile = isLessThan('md', width);

  // Helper function to get a short description for each category
  const getCategoryDescription = (categoryId: string): string => {
    switch (categoryId) {
      case 'professional':
        return 'Kurumsal çalışmalar';
      case 'freelance':
        return 'Bağımsız işler';
      case 'personal':
        return 'Kişisel geliştirmeler';
      default:
        return 'Diğer projeler';
    }
  };

  if (loading) {
    return (
      <aside className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="h-14 bg-gray-50 dark:bg-gray-900"></div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-14 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
          ></div>
        ))}
      </aside>
    );
  }

  // Get total project count
  const totalProjects = projects.length;

  return (
    <aside className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <h2 className="text-lg font-semibold p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        Proje Kategorileri
      </h2>

      <div className="overflow-y-auto max-h-[70vh]">
        {/* All Projects Button */}
        <Tooltip
          content="Tüm projeleri görüntüle"
          side={isMobile ? 'bottom' : 'right'}
          delayDuration={500}
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`w-full text-left p-3 transition-colors focus:outline-none ${
              activeCategory === 'all'
                ? 'bg-indigo-100 dark:bg-indigo-900/20'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
            }`}
          >
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mr-3 flex-shrink-0"></div>
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Tüm Projeler
              </h3>
            </div>

            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <span className="mr-2">Toplam proje sayısı</span>
              <span>•</span>
              <span className="ml-2">{totalProjects} proje</span>
            </div>
          </button>
        </Tooltip>

        {/* Category Buttons */}
        {categories.map((category) => (
          <Tooltip
            key={category.id}
            delayDuration={500}
            content={category.description}
            side={isMobile ? 'bottom' : 'right'}
          >
            <button
              onClick={() => setActiveCategory(category.id)}
              className={`w-full text-left p-3 transition-colors focus:outline-none border-t border-gray-100 dark:border-gray-700/50 ${
                activeCategory === category.id
                  ? 'bg-indigo-100 dark:bg-indigo-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
              }`}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mr-3 flex-shrink-0"></div>
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  {category.title}
                </h3>
              </div>

              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <span className="mr-2">
                  {getCategoryDescription(category.id)}
                </span>
                <span>•</span>
                <span className="ml-2">{category.projects.length} proje</span>
              </div>
            </button>
          </Tooltip>
        ))}
      </div>
    </aside>
  );
};

export default ProjectSidebar;
