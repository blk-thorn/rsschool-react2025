'use client';

import { ReactElement, ReactNode } from 'react';
import { CARD_SKELETON_LINES_COUNT } from '@/constants/general';

import { useTheme } from '@/context/UseTheme';

interface CardSkeletonProps {
  count?: number;
}

export default function CardSkeleton({ count = 1 }: CardSkeletonProps): ReactNode {
  const { theme } = useTheme();

  return (
    <>
      {Array.from({ length: count }).map((_: unknown, index: number): ReactElement => (
        <div
          key={index}
          data-testid="skeleton-card"
          className={`flex items-center max-w-xl border rounded-lg shadow-sm overflow-hidden ${
            theme === 'dark'
              ? 'bg-slate-600/80 border-gray-50'
              : 'bg-slate-800/60 border-slate-400'
          }`}
        >
          <div className="relative w-3/4 min-w-[120px]">
            <div
              className={`w-full h-[58px] rounded-lg min-w-[33px] animate-pulse ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
              }`}
            />
          </div>
          <ul className="flex flex-col text-left py-3 px-4 w-2/3 space-y-3">
            {Array.from({ length: CARD_SKELETON_LINES_COUNT }).map((_: unknown, itemIndex: number): ReactElement => (
              <li key={itemIndex} className="mb-1 flex flex-col">
                <div
                  className={`h-5 rounded w-3/4 animate-pulse ${
                    theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400'
                  }`}
                />
                <div
                  className={`h-4 mt-1 rounded w-full animate-pulse ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
