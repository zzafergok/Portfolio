'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';

import QuizGame from '@/components/quiz/QuizGame';
import QuizButton from '@/components/quiz/QuizButton';
import CompanyDirectory from '@/components/companies/CompanyDirector';

import { companiesData } from '@/data/companies';

export default function CompaniesPage() {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    window.scrollTo(0, 0);
  };

  const handleEndQuiz = () => {
    setShowQuiz(false);
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4 md:mb-0">
            Şirketler
          </h1>
          <QuizButton onStartQuiz={handleStartQuiz} />
        </div>

        {showQuiz ? (
          <QuizGame data={companiesData} onEndQuiz={handleEndQuiz} />
        ) : (
          <CompanyDirectory data={companiesData} />
        )}
      </motion.div>
    </div>
  );
}
