'use client';

import BaseCard from '@/components/cards/BaseCard';

import { motion } from 'framer-motion';
import { Folder, Code, FileEdit, Phone, ArrowRight } from 'lucide-react';

/**
 * Dashboard page component that serves as homepage
 * Showcases different sections of the portfolio
 */
export default function Dashboard() {
  // Animation variants for child elements
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Card data for different sections
  const cards = [
    {
      id: 'projects',
      title: 'Projeler',
      description:
        'Geliştirdiğim web ve mobil uygulamalar, açık kaynak katkılarım ve diğer projelerim.',
      href: '/projects',
      icon: <Folder size={20} />,
      bgColor: 'bg-primary-600',
    },
    {
      id: 'skills',
      title: 'Yetenekler',
      description:
        'Teknik becerilerim, kullandığım teknolojiler, araçlar ve metodolojiler.',
      href: '/skills',
      icon: <Code size={20} />,
      bgColor: 'bg-secondary-500',
    },
    {
      id: 'blog',
      title: 'Blog',
      description:
        'Web geliştirme, teknoloji trendleri ve yazılım mühendisliği hakkında düşüncelerim.',
      href: '/blog',
      icon: <FileEdit size={20} />,
      bgColor: 'bg-warning-500',
    },
    {
      id: 'contact',
      title: 'İletişim',
      description:
        'Benimle iletişime geçebileceğiniz farklı kanallar ve iletişim bilgilerim.',
      href: '/contact',
      icon: <Phone size={20} />,
      bgColor: 'bg-danger-500',
    },
  ];

  return (
    <div>
      {/* Hero section */}
      <motion.section variants={childVariants} className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Merhaba!
          </span>{' '}
          Ben bir{' '}
          <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Frontend Developer
          </span>
          'ım
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-neutral-600 dark:text-neutral-300">
          Next.js, TypeScript ve Tailwind CSS ile modern web uygulamaları
          geliştiriyor, kullanıcı deneyimini ön planda tutuyorum.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a
            href="/contact"
            className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-center text-base font-medium text-white shadow-lg transition-all hover:bg-primary-700 focus:ring-4 focus:ring-primary-300"
          >
            İletişime Geç
            <ArrowRight size={20} className="ml-2" />
          </a>
        </motion.div>
      </motion.section>

      {/* Dashboard cards */}
      <motion.section variants={childVariants}>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
          Keşfedin
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <motion.div key={card.id} variants={childVariants}>
              <BaseCard
                title={card.title}
                description={card.description}
                href={card.href}
                icon={card.icon}
                bgColor={card.bgColor}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
