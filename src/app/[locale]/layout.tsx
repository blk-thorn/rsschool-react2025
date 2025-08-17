import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { AbstractIntlMessages } from 'use-intl';
import MainLayout from '@/components/MainLayout';
import ErrorBoundary from '@/features/ErrorBoundary';

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  let messages: AbstractIntlMessages;
  try {
    const importedMessages = (await import(`../../messages/${locale}.json`)) as {
      default: AbstractIntlMessages;
    };
    messages = importedMessages.default;
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Moscow">
      <ErrorBoundary>
        <MainLayout>{children}</MainLayout>
      </ErrorBoundary>
    </NextIntlClientProvider>
  );
}
