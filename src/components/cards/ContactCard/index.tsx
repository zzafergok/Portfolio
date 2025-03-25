'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { cn } from '@/utils/helpers';
import type { ContactCardProps } from '@/types';

/**
 * Contact card component for displaying contact information
 */
const ContactCard = ({
  icon,
  href,
  value,
  method,
  className,
}: ContactCardProps) => {
  const CardContent = () => (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn(
        'card card-hoverable flex flex-col items-center justify-center py-8 text-center',
        className
      )}
    >
      {/* Icon */}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
        {icon}
      </div>

      {/* Contact method */}
      <h3 className="mb-2 text-lg font-medium text-secondary-900 dark:text-secondary-50">
        {method}
      </h3>

      {/* Contact value */}
      <p className="text-sm text-secondary-600 dark:text-secondary-300">
        {value}
      </p>
    </motion.div>
  );

  // If href is provided, wrap with Link component
  if (href) {
    return (
      <Link href={href} className="block h-full">
        <CardContent />
      </Link>
    );
  }

  // Otherwise, return the card without a link
  return <CardContent />;
};

export default ContactCard;
