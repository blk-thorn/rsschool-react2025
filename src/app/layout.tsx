import './globals.css'
import type { ReactNode } from 'react';
import MainLayout from '@/components/MainLayout';
import { ThemeProvider } from '@/context/ThemeContext';
import ErrorBoundary from '@/features/ErrorBoundary';
import { QueryProvider } from '@/providers/QueryProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
    <body>
    <ThemeProvider>
      <QueryProvider>
        <ErrorBoundary>
          <MainLayout>{children}</MainLayout>
        </ErrorBoundary>
      </QueryProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
