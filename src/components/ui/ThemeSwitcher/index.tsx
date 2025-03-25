'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/utils/helpers';
import { Sun, Moon } from 'lucide-react';
import type { ThemeSwitcherProps } from '@/types';

/**
 * Theme switcher component for toggling between light and dark mode
 */
const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMounted, setIsMounted] = useState(false);

  // Effect to handle initial theme
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-center h-9 w-9 rounded-md p-2 transition-colors hover:bg-secondary-100 dark:hover:bg-secondary-800 cursor-pointer',
        className
      )}
      aria-label={theme === 'light' ? 'Karanlık moda geç' : 'Aydınlık moda geç'}
    >
      {/* Sun icon (light mode) */}
      {theme === 'light' ? (
        <Moon
          onClick={toggleTheme}
          className={cn('transition-opacity opacity-100 text-black')}
        />
      ) : (
        <Sun
          onClick={toggleTheme}
          className={cn('transition-opacity pacity-0')}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
