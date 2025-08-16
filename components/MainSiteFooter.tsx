'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { useTheme } from 'next-themes';
import LogoLight from '@/public/logoLight.png';
import LogoDark from '@/public/logoDark.png';
import { useTranslations } from 'next-intl';

export function MainSiteFooter() {
  const { theme, systemTheme } = useTheme();
  const t = useTranslations('SahlaPlatform.Footer');

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const footerLinks = {
    support: [
      { name: t('contactUs'), href: '/contact' },
      { name: t('faqs'), href: '/faqs' },
    ],
    platform: [
      { name: t('home'), href: '/' },
      { name: t('pricing'), href: '/pricing' },
      { name: t('aboutUs'), href: '/about' },
    ],
  };

  return (
    <footer className='bg-card text-card-foreground border-t py-10'>
      <div className='mx-auto max-w-7xl px-6 py-16'>
        <div className='grid grid-cols-1 gap-16 lg:grid-cols-12'>
          <div className='lg:col-span-5'>
            <Link href='/' className='mb-4 flex items-center'>
              <Image
                src={currentTheme === 'dark' ? LogoDark : LogoLight}
                alt='Sahla Logo'
                className='size-16'
                priority
              />
            </Link>
            <p className='text-muted-foreground max-w-md'>
              {t('tagline')}
            </p>
            <div className='mt-6 flex gap-4'>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary hover:bg-accent transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
              >
                <Facebook className='h-6 w-6' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary hover:bg-accent transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
              >
                <Twitter className='h-6 w-6' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary hover:bg-accent transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
              >
                <Instagram className='h-6 w-6' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary hover:bg-accent transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
              >
                <Youtube className='h-6 w-6' />
              </a>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-7'>
            <div>
              <h3 className='text-foreground mb-6 text-lg font-semibold'>
                {t('support')}
              </h3>
              <ul className='space-y-3'>
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className='text-muted-foreground hover:text-primary relative block font-medium transition-colors duration-200 hover:underline'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='text-foreground mb-6 text-lg font-semibold'>
                {t('platform')}
              </h3>
              <ul className='space-y-3'>
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className='text-muted-foreground hover:text-primary relative block font-medium transition-colors duration-200 hover:underline'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='border-border mt-16 border-t pt-8'>
          <div className='flex flex-col items-center justify-between text-sm md:flex-row'>
            <div className='mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2 md:mb-0'>
              <Link
                href='/terms'
                className='text-muted-foreground hover:text-primary font-medium transition-colors hover:underline'
              >
                {t('terms')}
              </Link>
              <Link
                href='/privacy'
                className='text-muted-foreground hover:text-primary font-medium transition-colors hover:underline'
              >
                {t('privacy')}
              </Link>
            </div>
            <p className='text-muted-foreground'>
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}