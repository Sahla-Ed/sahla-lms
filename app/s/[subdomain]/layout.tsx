import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/Providers';
import { getTenantSettings } from './data/admin/get-tenant-settings';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server'; 


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const [tenant, t] = await Promise.all([
    getTenantSettings(),
    getTranslations('Metadata')
  ]);

  if (!tenant) {
    return {
      title: 'Learning Platform',
      description: 'An online learning platform.',
    };
  }

  return {
    title: {
      template: t('templateTitle', { tenantName: tenant.name }), 
      default: t('defaultTitle', { tenantName: tenant.name }),
    },
    description: t('description', { tenantName: tenant.name }),
  };
}


export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ subdomain: string }>;
}>) {
  const { subdomain } = await params;
  let tenantSetting;


  const locale = await getLocale();
  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{ __html: tenantSetting?.theme || '' }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
        <Providers>
          {children}
          <Toaster closeButton position='bottom-center' />
        </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
