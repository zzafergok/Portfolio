'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils/helpers';
import type { ButtonProps } from '@/types';

/**
 * Button component with various styles and sizes
 */

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', children, ...props },
    ref
  ) => {
    // Base button styles
    const baseStyles = 'btn';

    // Variant styles
    const variantStyles = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      outline: 'btn-outline',
      ghost:
        'bg-transparent hover:bg-secondary-100 dark:hover:bg-secondary-800',
    };

    // Size styles
    const sizeStyles = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Set display name for better debugging
Button.displayName = 'Button';

export default Button;
