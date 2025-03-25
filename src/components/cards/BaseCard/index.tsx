'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';

import { cn } from '@/utils/helpers';
import type { CardProps } from '@/types';

/**
 * Base card component for dashboard items
 */
const BaseCard = ({
  href,
  icon,
  title,
  bgColor,
  className,
  description,
}: CardProps) => {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={cn(
          'card card-hoverable flex h-full flex-col justify-between',
          className
        )}
      >
        <div className="space-y-4">
          {/* Card header with icon */}
          <div className="flex items-start justify-between">
            {icon && (
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-lg text-white',
                  bgColor || 'bg-primary-600'
                )}
              >
                {icon}
              </div>
            )}
            <motion.div
              whileHover={{ rotate: 15 }}
              className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
            >
              <ExternalLink size={24} />
            </motion.div>
          </div>

          {/* Card content */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {description}
            </p>
          </div>
        </div>

        {/* Card footer with hover indicator */}
        <div className="mt-6 flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
          <span>Daha fazla</span>
          <ChevronRight size={20} className="ml-1" />
        </div>
      </motion.div>
    </Link>
  );
};

export default BaseCard;
