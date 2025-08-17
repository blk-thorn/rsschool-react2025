import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <body>
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
