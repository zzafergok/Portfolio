'use client';

import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  XCircle,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';

import { CompaniesDataType, Company } from '@/data/companies';

interface QuizGameProps {
  onEndQuiz: () => void;
  data: CompaniesDataType;
}

interface Question {
  question: string;
  options: string[];
  explanation?: string;
  correctAnswer: string;
}

const QuizGame = ({ data, onEndQuiz }: QuizGameProps) => {
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    // Generate questions on component mount
    const generatedQuestions = generateQuestions(data);
    setQuestions(generatedQuestions);
    setIsLoading(false);
  }, [data]);

  // Function to generate quiz questions
  const generateQuestions = (data: CompaniesDataType): Question[] => {
    const allQuestions: Question[] = [];

    // Collect all companies for easier access
    const allCompanies: Company[] = [];
    data.sectors.forEach((sector) => {
      sector.companies.forEach((company) => {
        allCompanies.push({ ...company, name: sector.name });
      });
    });

    // Generate different types of questions

    // 1. "Hangi şirket X sektöründe faaliyet göstermektedir?" type questions
    data.sectors.forEach((sector) => {
      if (sector.companies.length >= 4) {
        const correctCompany =
          sector.companies[Math.floor(Math.random() * sector.companies.length)];

        // Get 3 random companies from other sectors
        const otherCompanies = allCompanies
          .filter((c) => !sector.companies.some((sc) => sc.id === c.id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [
          correctCompany.name,
          ...otherCompanies.map((c) => c.name),
        ].sort(() => 0.5 - Math.random());

        allQuestions.push({
          question: `Hangi şirket ${sector.name} sektöründe faaliyet göstermektedir?`,
          options,
          correctAnswer: correctCompany.name,
          explanation: `${correctCompany.name}, ${sector.name} sektöründe faaliyet gösteren bir şirkettir.`,
        });
      }
    });

    // 2. "X şirketinin bağlı kuruluşu hangisidir?" type questions
    allCompanies.forEach((company) => {
      if (company.subsidiaries.length > 0) {
        const correctSubsidiary =
          company.subsidiaries[
            Math.floor(Math.random() * company.subsidiaries.length)
          ];

        // Get random subsidiaries from other companies
        const otherSubsidiaries = allCompanies
          .filter((c) => c.id !== company.id)
          .flatMap((c) => c.subsidiaries)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [correctSubsidiary, ...otherSubsidiaries].sort(
          () => 0.5 - Math.random()
        );

        allQuestions.push({
          question: `${company.name}'in bağlı kuruluşu hangisidir?`,
          options,
          correctAnswer: correctSubsidiary,
          explanation: `${correctSubsidiary}, ${company.name}'in bağlı kuruluşudur.`,
        });
      }
    });

    // 3. "Hangi şirket X,Y,Z bağlı kuruluşlarına sahiptir?" type questions
    allCompanies.forEach((company) => {
      if (company.subsidiaries.length >= 2) {
        const randomSubsidiaries = company.subsidiaries
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.min(3, company.subsidiaries.length));

        // Get 3 other random companies
        const otherCompanies = allCompanies
          .filter((c) => c.id !== company.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [
          company.name,
          ...otherCompanies.map((c) => c.name),
        ].sort(() => 0.5 - Math.random());

        allQuestions.push({
          question: `Hangi şirket ${randomSubsidiaries.join(', ')} ${randomSubsidiaries.length > 1 ? 'kuruluşlarına' : 'kuruluşuna'} sahiptir?`,
          options,
          correctAnswer: company.name,
          explanation: `${company.name}, ${randomSubsidiaries.join(', ')} ${randomSubsidiaries.length > 1 ? 'kuruluşlarına' : 'kuruluşuna'} sahiptir.`,
        });
      }
    });

    // 4. "X bağlı kuruluşu hangi şirkete aittir?" type questions
    allCompanies.forEach((company) => {
      if (company.subsidiaries.length > 0) {
        const randomSubsidiary =
          company.subsidiaries[
            Math.floor(Math.random() * company.subsidiaries.length)
          ];

        // Get 3 other random companies
        const otherCompanies = allCompanies
          .filter((c) => c.id !== company.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [
          company.name,
          ...otherCompanies.map((c) => c.name),
        ].sort(() => 0.5 - Math.random());

        allQuestions.push({
          question: `${randomSubsidiary} kuruluşu hangi şirkete aittir?`,
          options,
          correctAnswer: company.name,
          explanation: `${randomSubsidiary}, ${company.name} şirketine ait bir kuruluştur.`,
        });
      }
    });

    // Shuffle and limit to 20 questions
    return allQuestions.sort(() => 0.5 - Math.random()).slice(0, 20);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple selections

    setSelectedAnswer(answer);

    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    // Move to next question or show final result after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);

    // Regenerate questions for variety
    const newQuestions = generateQuestions(data);
    setQuestions(newQuestions);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
        <AlertCircle className="h-12 w-12 text-warning-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
          Soru Oluşturma Hatası
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300 mb-6">
          Veri kaynağından yeterli soru oluşturulamadı. Lütfen tekrar deneyiniz.
        </p>
        <button
          onClick={onEndQuiz}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Şirketlere Dön
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-8 text-center"
      >
        <Trophy className="h-16 w-16 text-primary-500 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          Quiz Tamamlandı!
        </h2>

        <p className="text-lg mb-4 text-neutral-700 dark:text-neutral-300">
          Skorunuz:{' '}
          <span className="font-bold text-primary-600 dark:text-primary-400">
            {score}
          </span>{' '}
          / {questions.length}
        </p>

        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-4 mb-6">
          <div
            className="bg-primary-600 h-4 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button
            onClick={restartQuiz}
            className="flex items-center justify-center gap-2 bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Tekrar Oyna
          </button>

          <button
            onClick={onEndQuiz}
            className="flex items-center justify-center gap-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 py-2 px-6 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            Şirketlere Dön
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
      {/* Progress bar */}
      <div className="w-full bg-neutral-100 dark:bg-neutral-700 h-2">
        <div
          className="bg-primary-600 h-2 transition-all duration-300"
          style={{
            width: `${(currentQuestionIndex / questions.length) * 100}%`,
          }}
        ></div>
      </div>

      <div className="p-6">
        {/* Quiz header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Soru {currentQuestionIndex + 1} / {questions.length}
          </div>
          <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Skor:{' '}
            <span className="text-primary-600 dark:text-primary-400">
              {score}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
            {questions[currentQuestionIndex].question}
          </h2>
        </div>

        {/* Answer options */}
        <div className="space-y-3 mb-6">
          {questions[currentQuestionIndex].options.map((option, index) => {
            const isCorrect =
              option === questions[currentQuestionIndex].correctAnswer;
            const isSelected = selectedAnswer === option;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                  selectedAnswer === null
                    ? 'border-neutral-200 dark:border-neutral-700 hover:border-primary-400 hover:bg-primary-50 dark:hover:border-primary-700 dark:hover:bg-primary-900/20'
                    : isSelected
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-neutral-200 dark:border-neutral-700 opacity-70'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                      selectedAnswer === null
                        ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                        : isSelected
                          ? isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {selectedAnswer !== null && isSelected && isCorrect && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {selectedAnswer !== null && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4" />
                    )}
                    {selectedAnswer !== null && !isSelected && isCorrect && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {(selectedAnswer === null ||
                      (!isSelected && !isCorrect)) && (
                      <span>{String.fromCharCode(65 + index)}</span>
                    )}
                  </div>
                  <span
                    className={`${
                      selectedAnswer !== null && isCorrect ? 'font-medium' : ''
                    } text-neutral-800 dark:text-neutral-200`}
                  >
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation when answer is selected */}
        <AnimatePresence>
          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 mt-6 p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg"
            >
              <p className="text-neutral-800 dark:text-neutral-200">
                {questions[currentQuestionIndex].explanation ||
                  `Doğru cevap: ${questions[currentQuestionIndex].correctAnswer}`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={onEndQuiz}
            className="text-neutral-600 dark:text-neutral-400 text-sm hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Çıkış
          </button>

          {selectedAnswer && currentQuestionIndex < questions.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center"
            >
              Sonraki soru <ChevronRight className="w-4 h-4 ml-1" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
