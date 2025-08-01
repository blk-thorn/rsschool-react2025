import { createContext, useContext, useState, ReactNode, useEffect, Context } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext: Context<ThemeContextType | undefined> = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: ({ children }: { children: ReactNode }) => ReactNode = ({ children }: { children: ReactNode }): ReactNode => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect((): void => {
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
    throw new Error('useTheme error');
  }
  return context;
};
