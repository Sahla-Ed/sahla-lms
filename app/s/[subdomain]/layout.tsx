import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/Providers';
import { getTenantSettings } from './data/admin/get-tenant-settings';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sahla Learning Platform',
  description: 'Sahla is a web-based Learning Management System',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ subdomain: string }>;
}>) {
  const { subdomain } = await params;
  console.log(`[Layout] 1. Rendering layout for subdomain: ${subdomain}`); 
  let tenantSetting;
  if (subdomain) {
    tenantSetting = await getTenantSettings();
    console.log(`[Layout] 2. Tenant settings loaded:`, tenantSetting); 
  }
  console.log(tenantSetting);


  const locale = await getLocale();
  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang='en' suppressHydrationWarning>
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
