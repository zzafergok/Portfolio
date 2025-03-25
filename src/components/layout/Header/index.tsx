'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState } from 'react';

import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

import { useWindowSize, isLessThan } from '@/hooks/useWindowSize';

import type { HeaderProps } from '@/types';
import { cn, isActiveRoute } from '@/utils/helpers';

/**
 * Header component with responsive navigation
 */
const Header = ({ className }: HeaderProps) => {
  const pathname = usePathname();
  const { width } = useWindowSize();
  const isMobile = isLessThan('md', width);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/projects', label: 'Projeler' },
    { href: '/skills', label: 'Yetenekler' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'İletişim' },
  ];

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-secondary-200 bg-white/80 backdrop-blur-md dark:border-secondary-800 dark:bg-secondary-900/80',
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Portfolio
          </span>
        </Link>

        {/* Desktop navigation */}
        {!isMobile && (
          <nav className="mx-auto flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative py-2 text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400',
                  isActiveRoute(pathname, item.href)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-secondary-700 dark:text-secondary-300'
                )}
              >
                {item.label}
                {isActiveRoute(pathname, item.href) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-primary-600 dark:bg-primary-400"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </nav>
        )}

        {/* Theme switcher and mobile menu button */}
        <div className="flex items-center space-x-2">
          <ThemeSwitcher />

          {/* Mobile menu button */}
          {isMobile && (
            <button
              onClick={toggleMenu}
              className="flex h-10 w-10 items-center justify-center rounded-md p-2 text-secondary-500 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-50"
              aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-secondary-200 bg-white dark:border-secondary-800 dark:bg-secondary-900"
          >
            <nav className="container mx-auto flex flex-col space-y-2 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'py-2 text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400',
                    isActiveRoute(pathname, item.href)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-secondary-700 dark:text-secondary-300'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
