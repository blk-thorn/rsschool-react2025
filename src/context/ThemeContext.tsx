import { createContext, useContext, useState, ReactNode, useEffect, Context } from 'react';
import { Theme, ThemeContextType } from '@/types/types.ts';


const ThemeContext: Context<ThemeContextType | undefined> = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: ({ children }: { children: ReactNode }) => ReactNode = ({ children }: { children: ReactNode }): ReactNode => {
  const [theme, setTheme] = useState<Theme>((): Theme => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('rick-morty-api-theme') as Theme | null;
      return savedTheme || 'light';
    }
    return 'light';
  });

  useEffect((): void => {
    localStorage.setItem('rick-morty-api-theme', theme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme: () => void = (): void => {
    setTheme((prevTheme: Theme) => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme: () => ThemeContextType = (): ThemeContextType => {
  const context: ThemeContextType | undefined = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
