'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import CompanyCard from '../CompanyCard';

import { Sector } from '@/data/companies';

interface SectorSectionProps {
  sector: Sector;
  isExpanded: boolean;
  onToggle: () => void;
}

const SectorSection = ({
  sector,
  onToggle,
  isExpanded,
}: SectorSectionProps) => {
  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800">
      {/* Section header */}
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-5 text-left bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors duration-200"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center">
          <span className="mr-2">{sector.name}</span>
          <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
            ({sector.companies.length} şirket)
          </span>
        </h2>
        <div className="text-neutral-500 dark:text-neutral-400">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </button>

      {/* Company cards with grid alignment set to align items at the start */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            transition={{ duration: 0.2 }}
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 auto-rows-auto">
              {sector.companies.map((company, index) => (
                <motion.div key={`${company.name}-${index}`}>
                  <CompanyCard company={company} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectorSection;
