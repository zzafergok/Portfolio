'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/utils/helpers';
import type { SkillsCardProps } from '@/types';

/**
 * Skills card component to showcase skill categories
 */
const SkillsCard = ({ category, skills, icon, className }: SkillsCardProps) => {
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn('card h-full', className)}
    >
      {/* Card header with icon */}
      <div className="mb-4 flex items-center gap-3">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          {category}
        </h3>
      </div>

      {/* Skills list with animations */}
      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-2"
      >
        {skills.map((skill) => (
          <motion.li
            key={skill}
            variants={item}
            className="flex items-center text-sm text-neutral-700 dark:text-neutral-300"
          >
            <Check
              size={16}
              className="mr-2 text-primary-600 dark:text-primary-400"
            />
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default SkillsCard;
