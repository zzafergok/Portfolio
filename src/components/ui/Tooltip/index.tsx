import React, { useState, useRef, ReactNode, useEffect } from 'react';

interface TooltipProps {
  delay?: number;
  content: string;
  children: ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

const REM_SIZE = 16;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  delay = 300,
  placement = 'right', // Varsayılan olarak sağda gösterelim
}) => {
  const childRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  // Position state with better initial values
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Calculate and update tooltip position
  const updatePosition = () => {
    if (!childRef.current || !tooltipRef.current) return;

    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // Starting positions for each placement
    let top = 0;
    let left = 0;

    // Get scroll position for absolute positioning
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    switch (placement) {
      case 'top':
        top = childRect.top - tooltipRect.height - REM_SIZE + scrollY;
        left =
          childRect.left +
          childRect.width / 2 -
          tooltipRect.width / 2 +
          scrollX;
        break;
      case 'right':
        top =
          childRect.top +
          childRect.height / 2 -
          tooltipRect.height / 2 +
          scrollY;
        left = childRect.right + REM_SIZE + scrollX;
        break;
      case 'bottom':
        top = childRect.bottom + REM_SIZE + scrollY;
        left =
          childRect.left +
          childRect.width / 2 -
          tooltipRect.width / 2 +
          scrollX;
        break;
      case 'left':
        top =
          childRect.top +
          childRect.height / 2 -
          tooltipRect.height / 2 +
          scrollY;
        left = childRect.left - tooltipRect.width - REM_SIZE + scrollX;
        break;
    }

    // Set the position
    setPosition({ top, left });
  };

  // Effect to update position when tooltip becomes visible
  useEffect(() => {
    if (isVisible) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        updatePosition();
      });

      // Update position on scroll and resize
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible, placement]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  return (
    <>
      <div
        ref={childRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="inline-block w-full"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 px-3 py-2 text-sm font-medium text-white bg-neutral-800 dark:bg-neutral-700 rounded-md shadow-sm max-w-xs pointer-events-none transition-opacity duration-200 opacity-90"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-neutral-800 dark:bg-neutral-700 transform rotate-45 ${
              placement === 'top'
                ? 'bottom-0 -mb-1 left-1/2 -translate-x-1/2'
                : placement === 'right'
                  ? 'left-0 -ml-1 top-1/2 -translate-y-1/2'
                  : placement === 'bottom'
                    ? 'top-0 -mt-1 left-1/2 -translate-x-1/2'
                    : 'right-0 -mr-1 top-1/2 -translate-y-1/2'
            }`}
          />
        </div>
      )}
    </>
  );
};
