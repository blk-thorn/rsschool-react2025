'use client';

import { createContext, useContext, useState, useEffect, ReactNode, Context, JSX } from 'react';
import { Theme, ThemeContextType } from '@/types/types';

const ThemeContext: Context<ThemeContextType | undefined> =
  createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect((): void => {
    const savedTheme: Theme =
      (localStorage.getItem('rick-morty-api-theme') as Theme | null) || 'light';

    setTheme(savedTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(savedTheme);

    setMounted(true);
  }, []);

  useEffect((): void => {
    if (!mounted) return;

    localStorage.setItem('rick-morty-api-theme', theme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme, mounted]);

  const toggleTheme: () => void = (): void => {
    setTheme((prev: Theme) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme: () => ThemeContextType = (): ThemeContextType => {
  const context: ThemeContextType = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
