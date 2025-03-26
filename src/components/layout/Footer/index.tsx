'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Github, Linkedin, Clock } from 'lucide-react';

import { cn } from '@/utils/helpers';
import type { FooterProps } from '@/types';

/**
 * Footer component with social links, copyright information, and live date/time
 */
const Footer = ({ className }: FooterProps) => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  // State for live date and time
  const [dateTime, setDateTime] = useState(new Date());

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, []);

  // Format date for display
  const formattedDate = new Intl.DateTimeFormat('tr-TR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(dateTime);

  // Format time for display
  const formattedTime = new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(dateTime);

  // Social media links
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/zzafergok',
      icon: <Github size={20} />,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/zafergok',
      icon: <Linkedin size={20} />,
    },
  ];

  return (
    <footer
      className={cn(
        'border-t border-neutral-200 bg-white py-4 dark:border-neutral-800 dark:bg-neutral-900 shrink-0',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            &copy; {currentYear} Portfolio. Tüm hakları saklıdır.
          </p>

          {/* Live Date and Time */}
          <div className="flex items-center rounded-full bg-neutral-100 px-4 py-2 dark:bg-neutral-800">
            <Clock
              size={16}
              className="mr-2 text-primary-600 dark:text-primary-400"
            />
            <div className="text-sm font-medium">
              <span className="text-neutral-700 dark:text-neutral-300">
                {formattedDate}
              </span>
              <span className="mx-2 text-neutral-400 dark:text-neutral-600">
                |
              </span>
              <span className="text-primary-600 dark:text-primary-400">
                {formattedTime}
              </span>
            </div>
          </div>

          {/* Social links */}
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <Link
                target="_blank"
                key={link.name}
                href={link.href}
                aria-label={link.name}
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
