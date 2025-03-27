import React from 'react';

interface FeatureIconProps {
  label: string;
  small?: boolean;
  icon: React.ElementType;
}

/**
 * Feature icon component for the blog header
 * @param param0 Component properties
 * @returns React component
 */
const FeatureIcon: React.FC<FeatureIconProps> = ({
  icon,
  label,
  small = false,
}) => {
  const Icon = icon;
  return (
    <div className="flex flex-col items-center text-center py-1 sm:py-2 px-2 sm:px-4">
      <div
        className={`flex items-center justify-center ${small ? 'w-8 h-8' : 'w-10 h-10 sm:w-12 sm:h-12'} mb-1 sm:mb-2 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400`}
      >
        <Icon size={small ? 16 : 20} />
      </div>
      <span className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate max-w-[80px] sm:max-w-none">
        {label}
      </span>
    </div>
  );
};

export default FeatureIcon;
