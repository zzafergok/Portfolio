'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState, useEffect } from 'react';

import {
  X,
  Cat,
  Dog,
  Bird,
  Turtle,
  Squirrel,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

import type { SidebarProps } from '@/types';
import { cn, isActiveRoute } from '@/utils/helpers';

/**
 * Sidebar component with collapsible functionality
 * In mobile mode, collapsibility is disabled
 */
interface ExtendedSidebarProps extends SidebarProps {
  isMobile?: boolean;
  isCollapsible?: boolean;
  onMobileClose?: () => void;
}

const Sidebar = ({
  className,
  onMobileClose,
  isMobile = false,
  isCollapsible = true,
}: ExtendedSidebarProps) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Mount state to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);

    // Only load collapse state if we're in collapsible mode
    if (isCollapsible) {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState) {
        setIsCollapsed(savedState === 'true');
      }
    } else {
      // Ensure sidebar is expanded in non-collapsible mode
      setIsCollapsed(false);
    }
  }, [isCollapsible]);

  // Toggle sidebar state
  const toggleSidebar = () => {
    // Only allow toggling if in collapsible mode
    if (isCollapsible) {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
      localStorage.setItem('sidebarCollapsed', String(newState));

      // Dispatch event to notify other components
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'sidebarCollapsed',
          newValue: String(newState),
        })
      );
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) return null;

  // Navigation items
  const navItems = [
    { href: '/', label: 'Dashboard', icon: <Cat className="h-5 w-5" /> },
    {
      href: '/projects',
      label: 'Projeler',
      icon: <Dog className="h-5 w-5" />,
    },
    {
      href: '/skills',
      label: 'Yetenekler',
      icon: <Bird className="h-5 w-5" />,
    },
    { href: '/blog', label: 'Blog', icon: <Squirrel className="h-5 w-5" /> },
    {
      href: '/contact',
      label: 'İletişim',
      icon: <Turtle className="h-5 w-5" />,
    },
  ];

  return (
    <aside className={cn('h-full', className)}>
      {/* Mobile close button */}
      {isMobile && onMobileClose && (
        <div className="flex justify-end p-2">
          <button
            onClick={onMobileClose}
            className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Menüyü Kapat"
          >
            <X className="h-5 w-5 text-neutral-500" />
          </button>
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Logo and collapse toggle - Only show toggle in collapsible mode */}
        <div
          className={`flex h-16 items-center ${isCollapsed ? 'justify-center' : 'justify-end'} px-4`}
        >
          {/* Only show collapse button in collapsible mode */}
          {isCollapsible && (
            <button
              onClick={toggleSidebar}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50`}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center rounded-md p-3 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary-600 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-primary-400',
                  isActive &&
                    'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
                  isCollapsed && isCollapsible && 'justify-center'
                )}
                title={isCollapsed && isCollapsible ? item.label : undefined}
              >
                {item.icon}
                {(!isCollapsed || !isCollapsible) && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Theme switcher at bottom */}
        <div className="border-t border-neutral-200 flex items-center justify-center py-2 dark:border-neutral-800">
          <ThemeSwitcher isCollapsed={isCollapsed && isCollapsible} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
