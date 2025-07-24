import { ReactNode } from 'react';
import { NotFoundMessageProps } from '@/types/types.ts';

export default function NotFoundMessage({searchTerm, show}: NotFoundMessageProps): ReactNode | null {
    if (!show) return null;
    return (
      <div className="col-span-full text-center py-10">
        <p className="text-gray-500 text-lg">
          No characters found for "{searchTerm}"
        </p>
      </div>
    )
};
