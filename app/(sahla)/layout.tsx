import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import SahlaLayoutContent from './SahlaLayoutContent';


export default async function SahlaRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();


  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SahlaLayoutContent>{children}</SahlaLayoutContent>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
