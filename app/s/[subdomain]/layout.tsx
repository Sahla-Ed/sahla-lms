import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/Providers';
import { getTenantSettings } from './data/admin/get-tenant-settings';

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
  let tenantSetting;
  if (subdomain) {
    tenantSetting = await getTenantSettings();
  }
  console.log(tenantSetting);

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
        <Providers>
          {children}
          <Toaster closeButton position='bottom-center' />
        </Providers>
      </body>
    </html>
  );
}
