import { getRequestConfig } from 'next-intl/server';

type Messages = Record<string, string>;

export default getRequestConfig(async ({ locale }) => {
  const safeLocale: string = ['en', 'ru'].includes(locale) ? locale : 'en';

  const raw = (await import(`../messages/${safeLocale}.json`)) as {
    default: Messages;
  };

  const messages: Messages = raw.default;

  return {
    locale: safeLocale,
    messages,
    timeZone: 'UTC'
  };
});
