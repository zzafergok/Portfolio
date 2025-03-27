// pages/blog/index.tsx
'use client';

import React, { useState } from 'react';

import BlogSidebar from './BlogSidebar';
import BlogContent from './BlogContent';
import { blogContentData } from '@/data/blogContentData';

import { isLessThan, useWindowSize } from '@/hooks/useWindowSize';

interface BlogPageProps {}

const BlogPage: React.FC<BlogPageProps> = () => {
  const { width } = useWindowSize();
  const isMobile = isLessThan('md', width);

  const [selectedBlogId, setSelectedBlogId] = useState<number>(
    blogContentData[0].id
  );

  // Find the selected blog
  const selectedBlog =
    blogContentData.find((blog) => blog.id === selectedBlogId) ||
    blogContentData[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar for blog navigation */}
        <div className={`md:w-1/4 ${isMobile ? 'mb-6' : ''}`}>
          <BlogSidebar
            blogs={blogContentData}
            selectedBlogId={selectedBlogId}
            onSelectBlog={setSelectedBlogId}
          />
        </div>

        {/* Main content area */}
        <div className="md:w-3/4">
          <BlogContent blog={selectedBlog} />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

// 'use client';

// import React, { useState, useEffect, useRef } from 'react';

// import { Zap, Code, Clock, Layers, Repeat } from 'lucide-react';

// import FeatureIcon from './FeatureIcon';
// import Pagination from '@/components/ui/Pagination';
// import { blogContentData } from './blogContentData';

// /**
//  * Main blog post component with pagination
//  */
// export default function ReactBlogPost() {
//   const totalPages = blogContentData.length;
//   const containerRef = useRef<HTMLDivElement>(null);

//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   // Check if viewport is mobile sized
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 640);
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const handlePageChange = (pageNumber: number): void => {
//     // Update state first
//     setCurrentPage(pageNumber);

//     // Execute scroll after state update using multiple methods for better compatibility
//     setTimeout(() => {
//       // Method 1: Using window.scrollTo
//       window.scrollTo(0, 0);

//       // Method 2: For specific browsers
//       document.body.scrollTop = 0; // Safari
//       document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera

//       // Method 3: Scroll the container into view if it exists
//       if (containerRef.current) {
//         containerRef.current.scrollIntoView({ behavior: 'auto' });
//       }
//     }, 50);
//   };

//   // Get current page content
//   const currentContent =
//     blogContentData.find((page) => page.id === currentPage) ||
//     blogContentData[0];

//   return (
//     <div
//       ref={containerRef}
//       className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-4xl"
//     >
//       {/* Blog header */}
//       <div className="mb-6 sm:mb-8 md:mb-12 text-center">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-neutral-900 dark:text-white leading-tight break-words">
//           React 18: Yeni Nesil Kullanıcı Arayüzleri
//         </h1>
//         <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 px-1 sm:px-2">
//           React 18 ile gelen yenilikler, performans iyileştirmeleri ve
//           uygulamalarınızı nasıl daha iyi hale getirebileceğiniz hakkında
//           kapsamlı bir rehber.
//         </p>

//         {/* Feature icons */}
//         <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 mt-4 sm:mt-6 md:mt-8">
//           <FeatureIcon icon={Zap} label="Otomatik Batching" small={isMobile} />
//           <FeatureIcon icon={Clock} label="useTransition" small={isMobile} />
//           <FeatureIcon icon={Layers} label="Suspense" small={isMobile} />
//           <FeatureIcon
//             icon={Repeat}
//             label="Server Components"
//             small={isMobile}
//           />
//           <FeatureIcon icon={Code} label="createRoot API" small={isMobile} />
//         </div>
//       </div>

//       {/* Current page content */}
//       <article className="max-w-none">
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-primary-600 dark:text-primary-400 break-words">
//           {currentContent.title}
//         </h2>

//         {currentContent.sections.map((section, index) => (
//           <section key={index} className="mb-6 sm:mb-8 md:mb-10">
//             <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 text-neutral-800 dark:text-neutral-200 break-words">
//               {section.heading}
//             </h3>

//             <div className="mb-3 sm:mb-4 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base md:text-lg break-words">
//               {section.content}
//             </div>

//             {section.code && (
//               <div className="my-3 sm:my-4 md:my-6 rounded-lg overflow-hidden">
//                 <pre className="bg-neutral-800 text-neutral-100 p-2 sm:p-3 md:p-4 text-xs sm:text-sm overflow-x-auto">
//                   <code className="whitespace-pre-wrap sm:whitespace-pre break-all sm:break-normal">
//                     {section.code}
//                   </code>
//                 </pre>
//               </div>
//             )}

//             {section.content2 && (
//               <div className="mt-2 sm:mt-3 md:mt-4 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base md:text-lg break-words">
//                 {section.content2}
//               </div>
//             )}
//           </section>
//         ))}
//       </article>

//       {/* Pagination component */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//         showPageNumbers={!isMobile} // Hide page numbers on very small screens
//       />

//       {/* Page indicator */}
//       <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-4">
//         Sayfa {currentPage} / {totalPages}
//       </div>
//     </div>
//   );
// }
