import React, { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BlogPage } from './blog.type';
import Pagination from '@/components/ui/Pagination';
import { isLessThan, useWindowSize } from '@/hooks/useWindowSize';

interface BlogContentProps {
  blog: BlogPage;
}

const BlogContent: React.FC<BlogContentProps> = ({ blog }) => {
  const { width } = useWindowSize();
  const isMobile = isLessThan('md', width);
  const totalPages = blog.sections.length;
  const contentRef = useRef<HTMLDivElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);

  // Get current section
  const currentSection = blog.sections[currentPage - 1];

  // More aggressive layout reset when page changes
  useEffect(() => {
    // Apply layout adjustments with a delay to ensure DOM is updated
    const timer = setTimeout(() => {
      if (contentRef.current) {
        // Apply various fixes to ensure content fits
        contentRef.current.style.width = '100%';
        contentRef.current.style.maxWidth = '100%';
        contentRef.current.style.overflow = 'hidden';

        // Force a reflow
        void contentRef.current.offsetHeight;
      }

      // Adjust code container if it exists
      if (codeContainerRef.current) {
        codeContainerRef.current.style.maxWidth = '100%';
        codeContainerRef.current.style.overflow = 'auto';

        // Force reflow on code container
        void codeContainerRef.current.offsetHeight;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentPage, blog.id]);

  const handlePageChange = (pageNumber: number): void => {
    // First update state
    setCurrentPage(pageNumber);

    // Then scroll and apply fixes with a delay
    setTimeout(() => {
      // Scroll to top
      document
        .getElementById('blog-content-top')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div
      ref={contentRef}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-4 sm:p-6 md:p-8 border border-neutral-200 dark:border-neutral-700 w-full overflow-hidden"
    >
      <div id="blog-content-top"></div>

      {/* Blog header with improved mobile layout */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-600 dark:text-primary-400 break-words">
        {blog.title}
      </h1>

      {/* Author info with better mobile spacing */}
      <div className="mb-5 sm:mb-6 md:mb-8 flex flex-wrap items-center text-sm text-neutral-500 dark:text-neutral-400 gap-2 sm:gap-0">
        <div className="flex items-center w-full sm:w-auto mb-1 sm:mb-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-500 flex items-center justify-center text-white mr-2">
            <span className="font-medium text-xs sm:text-sm">ZG</span>
          </div>
          <span className="font-medium text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm">
            {blog.author || 'Zafer Gök'}
            <span className="mx-2">•</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs sm:text-sm">
          <span>{blog.date}</span>
        </div>
      </div>

      {/* Section content */}
      <section className="mb-6 md:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-neutral-800 dark:text-neutral-200 break-words">
          {currentSection?.heading}
        </h2>

        <div className="mb-4 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base break-words">
          {currentSection?.content}
        </div>

        {/* Code block with improved mobile container */}
        {currentSection?.code && (
          <div
            ref={codeContainerRef}
            className="my-4 md:my-6 rounded-lg overflow-hidden w-full"
            style={{ maxWidth: '100%' }}
          >
            <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
              <SyntaxHighlighter
                language="jsx"
                style={atomDark}
                customStyle={{
                  borderRadius: '0.375rem',
                  margin: 0,
                  fontSize: '0.7rem',
                  lineHeight: 1.4,
                  padding: '0.75rem',
                  maxWidth: '100%',
                }}
                wrapLines={true}
                showLineNumbers={true}
                wrapLongLines={isMobile}
                codeTagProps={{
                  style: {
                    fontSize: isMobile ? '0.7rem' : '0.75rem',
                    fontFamily: 'monospace',
                    whiteSpace: isMobile ? 'pre-wrap' : 'pre',
                    wordBreak: isMobile ? 'break-word' : 'normal',
                  },
                }}
              >
                {currentSection?.code}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {currentSection?.content2 && (
          <div className="mt-4 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base break-words">
            {currentSection?.content2}
          </div>
        )}
      </section>

      {/* Pagination for blog sections */}
      <div className="mt-6 md:mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showPageNumbers={!isMobile}
        />

        <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-4">
          Sayfa {currentPage} / {totalPages}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
