'use client';

import { useState } from 'react';

import { Briefcase, Gem, Lightbulb, Clock } from 'lucide-react';

import ProjectSidebar from './ProjectSidebar';
import ProjectTimeline from './ProjectTimeline';
import { ProjectProvider } from '@/context/ProjectContext';

export default function ProjectsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ProjectProvider>
      <div className="relative min-h-screen transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Toggle Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden flex items-center justify-center p-2 mb-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? 'Kategorileri Gizle' : 'Kategorileri Göster'}
            </button>

            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'block' : 'hidden'} md:w-1/4`}>
              <ProjectSidebar />
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 shadow-md">
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
                <ProjectTimeline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProjectProvider>
  );
}
