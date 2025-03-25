'use client';

import Link from 'next/link';

import { Github, Linkedin } from 'lucide-react';

import { cn } from '@/utils/helpers';
import type { FooterProps } from '@/types';

/**
 * Footer component with social links and copyright information
 */
const Footer = ({ className }: FooterProps) => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  // Social media links
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: <Github size={20} />,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
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

          {/* Social links */}
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                aria-label={link.name}
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
