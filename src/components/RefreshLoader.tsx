import { JSX } from 'react';

interface RefreshLoaderProps {
  text?: string;
  className?: string;
}

export default function RefreshLoader({ text = 'Loading...', className = '' }: RefreshLoaderProps): JSX.Element {
  return (
    <span className={`flex items-center ${className}`} role="status">
      <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
      {text}
    </span>
  );
}
