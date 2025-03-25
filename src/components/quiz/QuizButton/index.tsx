'use client';

import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

interface QuizButtonProps {
  onStartQuiz: () => void;
}

const QuizButton = ({ onStartQuiz }: QuizButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onStartQuiz}
      className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <BrainCircuit className="w-5 h-5" />
      <span>Şirketler Bilgi Testi</span>
    </motion.button>
  );
};

export default QuizButton;
