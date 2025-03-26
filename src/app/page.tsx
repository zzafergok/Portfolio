'use client';

import BaseCard from '@/components/cards/BaseCard';

import { motion } from 'framer-motion';
import { Cat, Code, Phone, Folder, FileEdit, ArrowRight } from 'lucide-react';

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
      {/* Hero section with the integrated welcome text */}
      <motion.section variants={childVariants} className="mb-16 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Dijital Dünyama Hoş Geldiniz 🌟
          </span>
        </h1>

        <div className="mx-auto max-w-7xl text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 space-y-4">
          <p>
            İstanbul'un enerjisinden ilham alıp, Ankara'nın dinginliğinde kod
            yazan bir geliştiricinin sanal evindeyim. Ekranınızın diğer ucundan
            merhaba! 🖐️
          </p>

          <p>
            Teknoloji yolculuğumda Next.js ve React ile ördüğüm bu dijital
            bahçede, her bir komponent özenle tasarlandı. Tailwind'in estetik
            dokunuşları, TypeScript'in disiplinli yapısı ve Redux'un düzenli
            veri akışı, kod yazarken vazgeçilmez paletimi oluşturuyor. Her
            satır, her fonksiyon, dört yıllık tutkulu bir uğraşın yansıması.
          </p>

          <div className="flex justify-center items-center space-x-2 my-4">
            <p className="italic">
              Navigasyon menüsündeki hayvan ikonları, evimde miyavlayan iki
              tüylü dostumun dijital dünyaya selamı. Kedilerimin meraklı
              bakışlarının kod yazarken ilham verdiği anlar, bu sitenin ruhuna
              işlendi. 🐱🐱
            </p>
          </div>

          <p>
            İstanbul Aydın'ın koridorlarında başlayan bilgisayar programcılığı
            serüvenim, şimdi Ankara'nın sokaklarında, yeni teknolojilerin
            peşinde devam ediyor. Her geçen gün öğrendiğim her yeni konsept, bu
            platformun dokusuna katılıyor.
          </p>

          <p>
            Bu dashboard, sadece bir gösterge paneli değil, dijital bir buluşma
            noktası. Projelerim, düşüncelerim ve yaratıcı çalışmalarım arasında
            gezinirken, kodun sadece bir araç değil, bir ifade biçimi olduğunu
            keşfedeceğinizi umuyorum.
          </p>

          <p className="font-medium">
            Kedilerimin patileri kadar hassas, Ankara'nın gökyüzü kadar geniş
            bir vizyon ile hazırlanan bu dijital mekana hoş geldiniz.
          </p>
        </div>
      </motion.section>

      {/* Dashboard cards */}
      <motion.section variants={childVariants}>
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
