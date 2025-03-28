'use client';

import React from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface TooltipProps {
  content: string;
  sideOffset?: number;
  delayDuration?: number;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      sideOffset = 8,
      side = 'right',
      align = 'center',
      delayDuration = 500,
      ...props
    },
    ref
  ) => {
    // Select animation based on side
    const getAnimationClass = () => {
      switch (side) {
        case 'top':
          return 'animate-fadeInUp';
        case 'right':
          return 'animate-fadeInLeft';
        case 'bottom':
          return 'animate-fadeInDown';
        case 'left':
          return 'animate-fadeInRight';
        default:
          return 'animate-fadeIn';
      }
    };

    return (
      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root delayDuration={delayDuration}>
          <TooltipPrimitive.Trigger asChild>
            <div className="inline-block w-full">{children}</div>
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              side={side}
              align={align}
              className={`z-50 px-3 py-2 text-sm font-medium text-white bg-neutral-800 dark:bg-neutral-700 rounded-md shadow-sm max-w-xs pointer-events-none opacity-90 ${getAnimationClass()}`}
              {...props}
            >
              {content}
              <TooltipPrimitive.Arrow
                className="fill-neutral-800 dark:fill-neutral-700"
                width={8}
                height={4}
              />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
