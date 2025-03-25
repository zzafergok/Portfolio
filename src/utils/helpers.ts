import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes without conflicts
 * @param inputs - Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable format
 * @param date - Date to format
 * @param locale - Locale to use for formatting
 */
export function formatDate(
  date: Date | string,
  locale: string = 'tr-TR'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Truncate text to a specific length
 * @param text - Text to truncate
 * @param length - Maximum length
 */
export function truncateText(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}

/**
 * Calculate reading time for a given text
 * @param text - Text to calculate reading time for
 * @param wordsPerMinute - Words per minute reading speed
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} dakika okuma`;
}

/**
 * Check if current route matches given href
 * @param currentRoute - Current route
 * @param href - Href to check
 */
export function isActiveRoute(currentRoute: string, href: string): boolean {
  if (href === '/') {
    return currentRoute === href;
  }
  return currentRoute.startsWith(href);
}

/**
 * Generate random ID
 * @param length - Length of the ID
 */
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

// Function to validate and normalize URLs
export const getValidImageUrl = (src: string): string | null => {
  try {
    // For local images (starting with /)
    if (src.startsWith('/')) {
      return src;
    }

    // Try to construct a URL to validate it
    new URL(src);
    return src;
  } catch (error) {
    // If URL construction fails, return null
    console.warn(`Invalid image URL: ${src}`);
    return null;
  }
};
