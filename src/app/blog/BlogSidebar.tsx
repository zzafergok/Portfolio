import React from 'react';

import { Tooltip } from '@/components/ui/Tooltip';

import ViewCounter from './ViewCounter';

import { BlogPage } from './blog.type';
import { blogSubTitles } from '@/data/blogContentData';

import { isLessThan, useWindowSize } from '@/hooks/useWindowSize';

interface BlogSidebarProps {
  blogs: BlogPage[];
  selectedBlogId: number;
  onSelectBlog: (id: number) => void;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  blogs,
  onSelectBlog,
  selectedBlogId,
}) => {
  const { width } = useWindowSize();
  const isMobile = isLessThan('md', width);

  // Function to get the subtitle for a blog based on its ID
  const getSubtitleById = (blogId: number): string => {
    const subtitle = blogSubTitles.find((sub) => sub.id === blogId);
    return subtitle ? subtitle.title : '';
  };

  return (
    <aside className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden border border-neutral-200 dark:border-neutral-700">
      <h2 className="text-lg font-semibold p-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
        Tüm Yazılar
      </h2>

      <div className="overflow-y-auto max-h-[70vh]">
        {blogs.map((blog) => (
          <Tooltip
            key={blog.id}
            delayDuration={500}
            content={blog.title}
            side={isMobile ? 'bottom' : 'right'}
          >
            <button
              onClick={() => onSelectBlog(blog.id)}
              className={`w-full text-left p-3 border-b border-neutral-100 dark:border-neutral-800 transition-colors last:border-0focus:outline-none ${
                selectedBlogId === blog.id
                  ? 'bg-primary-200 dark:bg-primary-600/20 border-l-4 border-l-primary-500 dark:border-l-primary-400'
                  : 'border-l-4 border-l-transparent hover:bg-primary-50 dark:hover:bg-primary-300/20'
              }`}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary-500 mr-3 flex-shrink-0"></div>
                <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
                  {blog.title}
                </h3>
              </div>

              {/* Meta information with dynamic subtitle and view counter */}
              <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
                <span className="mr-2">{getSubtitleById(blog.id)}</span>
                <span>•</span>
                <ViewCounter blogId={blog.id} className="ml-2" />
              </div>
            </button>
          </Tooltip>
        ))}
      </div>
    </aside>
  );
};

export default BlogSidebar;
