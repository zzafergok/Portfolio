'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Building } from 'lucide-react';
import { Company } from '@/data/companies';
import Image from 'next/image';
import { getValidImageUrl } from '@/utils/helpers';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Process logo URL
  const logoUrl = company.logo ? getValidImageUrl(company.logo) : null;
  const hasValidImage = logoUrl && !imageError;

  return (
    <div
      className={`bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 flex flex-col ${isExpanded ? 'h-full' : 'h-auto'}`}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Şirket bilgileri */}
        <div className="flex items-center mb-4">
          {hasValidImage ? (
            <div className="w-24 h-24 mr-4 rounded-md overflow-hidden flex items-center justify-center">
              {/* For remote images */}
              {!logoUrl.startsWith('/') ? (
                <Image
                  src={logoUrl}
                  alt={company.name}
                  width={96}
                  height={96}
                  className="object-contain"
                  onError={() => setImageError(true)}
                  unoptimized={true} // Skip Next.js optimization for external images
                />
              ) : (
                // For local images
                <Image
                  src={logoUrl}
                  alt={company.name}
                  width={96}
                  height={96}
                  className="object-contain"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          ) : (
            <div className="w-12 h-12 mr-4 rounded-md bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <Building className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white truncate">
            {company.name}
          </h3>
        </div>

        {/* Bağlı kuruluşlar başlığı */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700 p-2 rounded-md transition-colors"
        >
          <span className="font-medium">
            Bağlı Kuruluşlar ({company.subsidiaries.length})
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-neutral-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-neutral-500" />
          )}
        </button>

        {/* Bağlı kuruluşlar listesi - Kartın içinde yer alıyor */}
        <div className="overflow-hidden mt-2">
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  transition: {
                    height: { duration: 0.3, ease: 'easeOut' },
                    opacity: { duration: 0.2, ease: 'easeOut' },
                  },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: { duration: 0.3, ease: 'easeOut' },
                    opacity: { duration: 0.1, ease: 'easeOut' },
                  },
                }}
                className="bg-neutral-50 dark:bg-neutral-700/30 rounded-lg p-3"
              >
                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {company.subsidiaries.map((subsidiary, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{subsidiary}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
