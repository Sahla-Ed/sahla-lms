'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { MainSiteHeader } from '@/components/MainSiteHeader';
import { MainSiteFooter } from '@/components/MainSiteFooter';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function SahlaLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
    >
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <MainSiteHeader />
        <main className='flex-1 overflow-x-hidden'>{children}</main>
        <MainSiteFooter />
      </ThemeProvider>
    </div>
  );
}
