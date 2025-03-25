'use client';

import { useState, useEffect } from 'react';

import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Footer from '../Footer';
import Sidebar from '../Sidebar';

import { useWindowSize } from '@/hooks/useWindowSize';

import type { DashboardLayoutProps } from '@/types';

/**
 * Dashboard layout component with responsive sidebar behavior
 * - Mobile: Sidebar toggle with hamburger menu
 * - Desktop: Sidebar maintains collapsible functionality
 */
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { width } = useWindowSize();
  const [isMounted, setIsMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine if we're in mobile view based on window width
  const isMobile = width ? width < 768 : false;

  // Effect to check sidebar state from localStorage
  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  // Listen for storage events to sync sidebar state across components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sidebarCollapsed') {
        setIsCollapsed(e.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

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

  // Sidebar animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // Don't render full layout until mounted to prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <>
      {/* Hamburger Menu Button - Only visible on mobile */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-2 flex items-center justify-center"
          aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          ) : (
            <Menu className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          )}
        </button>
      )}

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Responsive behavior */}
      <AnimatePresence>
        {/* Show sidebar if either we're on desktop or mobile menu is open */}
        {(!isMobile || isMobileMenuOpen) && (
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`${
              isMobile
                ? 'fixed left-0 top-0 h-full z-50 w-52 dark:border-neutral-800 '
                : `absolute ${isCollapsed ? 'w-20' : 'w-52'} h-[500px] mt-[15%] dark:border-stone-800 `
            } bg-white dark:bg-neutral-900 shadow-lg border rounded-lg transition-width duration-[800ms] ease-out shrink-0 overflow-hidden`}
          >
            <Sidebar
              isMobile={isMobile}
              isCollapsible={!isMobile}
              onMobileClose={() => setIsMobileMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900">
        {/* Main content with footer */}
        <div className="flex flex-col flex-1">
          <motion.main
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`flex-1 overflow-y-auto ${
              isMobile
                ? 'px-4 py-16' // Extra top padding for mobile to avoid hamburger overlap
                : `${isCollapsed ? 'md:pl-8' : 'md:pl-60'} px-6 py-8 md:pr-8 md:py-12`
            } transition-all duration-[800ms] ease-out`}
          >
            {children}
          </motion.main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
