import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/Providers';
import { getTenantIdFromSlug } from '@/lib/get-tenant-id';
import { notFound } from 'next/navigation';

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
  if (subdomain) {
    const tenantId = await getTenantIdFromSlug(subdomain);
    if (!tenantId) {
      notFound();
    }
  }

  return (
    <html lang='en' suppressHydrationWarning>
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
