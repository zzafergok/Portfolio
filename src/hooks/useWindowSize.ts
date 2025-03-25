'use client';

import { useState, useEffect } from 'react';
import type { WindowSize } from '@/types';

/**
 * Hook to track window dimensions
 * Useful for responsive design logic in components
 */
export function useWindowSize(): WindowSize {
  // Initialize state with undefined to avoid hydration mismatch
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return windowSize;
}

// Breakpoint values for responsive design
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Check if window width is greater than given breakpoint
 * @param size - Breakpoint key or custom width
 * @param windowWidth - Current window width
 */
export function isGreaterThan(
  size: keyof typeof breakpoints | number,
  windowWidth?: number
): boolean {
  if (!windowWidth) return false;
  const breakpoint = typeof size === 'number' ? size : breakpoints[size];
  return windowWidth >= breakpoint;
}

/**
 * Check if window width is less than given breakpoint
 * @param size - Breakpoint key or custom width
 * @param windowWidth - Current window width
 */
export function isLessThan(
  size: keyof typeof breakpoints | number,
  windowWidth?: number
): boolean {
  if (!windowWidth) return false;
  const breakpoint = typeof size === 'number' ? size : breakpoints[size];
  return windowWidth < breakpoint;
}
