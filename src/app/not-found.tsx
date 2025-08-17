import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import NotFoundPage from '@/components/NotFoundPage';

export default async function GlobalNotFound() {
  const locale = 'en';
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NotFoundPage />
    </NextIntlClientProvider>
  );
}
