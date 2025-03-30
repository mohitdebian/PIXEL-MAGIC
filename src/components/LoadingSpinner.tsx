
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} rounded-full border-4 border-muted border-t-primary animate-spin-slow`}></div>
    </div>
  );
};

export default LoadingSpinner;
