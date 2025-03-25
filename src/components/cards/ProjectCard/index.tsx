'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/utils/helpers';
import type { ProjectCardProps } from '@/types';

/**
 * Project card component for showcasing portfolio projects
 */
const ProjectCard = ({
  href,
  title,
  image,
  className,
  description,
  technologies,
}: ProjectCardProps) => {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={cn(
          'card card-hoverable flex h-full flex-col overflow-hidden',
          className
        )}
      >
        {/* Project image */}
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
          <div className="relative -mx-6 -mt-6 mb-6 h-48 bg-gradient-to-r from-primary-600 to-primary-800" />
        )}

        {/* Project content */}
        <div className="flex flex-1 flex-col">
          <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {title}
          </h3>
          <p className="mt-2 flex-1 text-sm text-neutral-600 dark:text-neutral-300">
            {description}
          </p>

          {/* Technologies */}
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Card footer with hover indicator */}
          <div className="mt-6 flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
            <span>Projeyi incelе</span>
            <ChevronRight size={20} className="ml-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
