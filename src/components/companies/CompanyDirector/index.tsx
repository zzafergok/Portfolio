'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import SectorSection from '../SectorSection';

import { CompaniesDataType } from '@/data/companies';

interface CompanyDirectoryProps {
  data: CompaniesDataType;
}

const CompanyDirectory = ({ data }: CompanyDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSectors, setExpandedSectors] = useState<number[]>(
    data.sectors.map((s) => s.id)
  );

  // Filter sectors and companies based on search term
  const filteredSectors = data.sectors
    .map((sector) => ({
      ...sector,
      companies: sector.companies.filter(
        (company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.subsidiaries.some((sub) =>
            sub.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ),
    }))
    .filter((sector) => sector.companies.length > 0);

  const toggleSector = (sectorId: number) => {
    setExpandedSectors((prev) =>
      prev.includes(sectorId)
        ? prev.filter((id) => id !== sectorId)
        : [...prev, sectorId]
    );
  };

  return (
    <div className="space-y-8">
      {/* Search bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          type="text"
          className="block w-full p-4 pl-10 text-sm text-neutral-900 border border-neutral-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Şirket veya bağlı kuruluş ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sector sections */}
      {filteredSectors.length > 0 ? (
        filteredSectors.map((sector) => (
          <motion.div
            key={sector.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectorSection
              sector={sector}
              isExpanded={expandedSectors.includes(sector.id)}
              onToggle={() => toggleSector(sector.id)}
            />
          </motion.div>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-500 dark:text-neutral-400">
            Aramanızla eşleşen şirket bulunamadı.
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyDirectory;
