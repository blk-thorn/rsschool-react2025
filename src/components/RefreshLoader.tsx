import { ReactNode } from 'react';

interface LoadingSpinnerProps {
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ text = 'Loading...', className = '' }: LoadingSpinnerProps): ReactNode {
  return (
    <span className={`flex items-center ${className}`}>
      <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
      {text}
    </span>
  );
}
