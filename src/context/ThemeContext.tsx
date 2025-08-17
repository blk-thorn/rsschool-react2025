'use client';

import { Context, createContext } from 'react';
import { ThemeContextType } from '@/types/types';

export const ThemeContext: Context<ThemeContextType | undefined> = createContext<
  ThemeContextType | undefined
>(undefined);
