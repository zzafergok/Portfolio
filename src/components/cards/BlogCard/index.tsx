'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers';
import type { BlogCardProps } from '@/types';

/**
 * Blog card component for showcasing blog posts
 */
const BlogCard = ({
  title,
  description,
  date,
  readTime,
  image,
  href,
  className,
}: BlogCardProps) => {
  return (
    <Link href={href} className="block h-full">
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={cn(
          'card card-hoverable flex h-full flex-col overflow-hidden',
          className
        )}
      >
        {/* Blog post image */}
        {image ? (
          <div className="relative -mx-6 -mt-6 mb-6 h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          </div>
        ) : (
          <div className="relative -mx-6 -mt-6 mb-6 h-48 bg-gradient-to-r from-neutral-600 to-neutral-800" />
        )}

        {/* Blog post content */}
        <div className="flex flex-1 flex-col">
          {/* Meta information */}
          <div className="mb-3 flex items-center text-xs text-neutral-500 dark:text-neutral-400">
            <time dateTime={date}>{date}</time>
            <span className="mx-2">•</span>
            <span>{readTime}</span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {title}
          </h3>

          <p className="mt-2 flex-1 text-sm text-neutral-600 dark:text-neutral-300">
            {description}
          </p>

          {/* Card footer with hover indicator */}
          <div className="mt-6 flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
            <span>Devamını oku</span>
            <ChevronRight size={20} className="ml-1" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default BlogCard;
