'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LogoLight from '@/public/logoLight.png';
import LogoDark from '@/public/logoDark.png';
import { useTheme } from 'next-themes';
import { Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { ThemeToggle } from './themeToggle';

export function MainSiteHeader() {
  const { theme, systemTheme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();

  const t = useTranslations('SahlaPlatform.Header');
  const tCommon = useTranslations('SahlaPlatform.common');

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isRTL = locale === 'ar';

  const navigationItems = [
    { name: t('aboutUs'), href: '/about' },
    { name: t('pricing'), href: '/pricing' },
    { name: t('faqs'), href: '/faqs' },
  ];

  if (!mounted) {
    return (
      <header className='sticky top-0 z-50 w-full py-4'>
        <div className='container mx-auto px-6 lg:px-8'>
          <div className='bg-muted h-[68px] animate-pulse rounded-full'></div>
        </div>
      </header>
    );
  }

  return (
    <header className='sticky top-0 z-50 w-full py-4'>
      <div className='absolute inset-0 bg-black/5 dark:bg-white/5'></div>

      <div className='relative container mx-auto px-6 lg:px-8'>
        <div className='flex items-center justify-between gap-4'>
          {/* left */}
          <div
            className={cn(
              'border-border/30 bg-card/80 rounded-full border shadow-lg backdrop-blur-lg',
              isRTL ? 'order-1' : 'order-2',
            )}
          >
            <div
              className={cn(
                'flex items-center px-6 py-3',
                isRTL ? 'gap-6 space-x-reverse' : 'gap-6',
              )}
            >
              <Link href='/' aria-label='Home'>
                <Image
                  src={currentTheme === 'dark' ? LogoDark : LogoLight}
                  alt='Sahla Logo'
                  className='h-14 w-14 flex-shrink-0 md:h-12 md:w-12'
                  priority
                />
              </Link>

              <nav
                className={cn(
                  'hidden items-center lg:flex',
                  isRTL ? 'gap-6 space-x-reverse' : 'gap-6',
                )}
              >
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'hover:text-foreground relative py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200',
                      pathname === item.href
                        ? 'text-foreground after:bg-primary after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:rounded-full'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* right */}
          <div
            className={cn(
              'border-border/30 bg-card/80 rounded-full border px-6 py-3 shadow-lg backdrop-blur-lg',
              isRTL ? 'order-1' : 'order-2',
            )}
          >
            <div
              className={cn(
                'flex items-center',
                isRTL ? 'gap-4 space-x-reverse' : 'gap-4',
              )}
            >
              <div
                className={cn(
                  'hidden items-center md:flex',
                  isRTL ? 'gap-4 space-x-reverse' : 'gap-4',
                )}
              >
                <div
                  className={cn(
                    'flex items-center',
                    isRTL ? 'gap-2 space-x-reverse' : 'gap-2',
                  )}
                >
                  <LanguageSwitcher />
                  <ThemeToggle translationNamespace='SahlaPlatform.common.themeToggle' />
                </div>

                <Link
                  href='/start'
                  className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-transform duration-200 hover:scale-105'
                >
                  {tCommon('getStarted')}
                </Link>

                <Link
                  href='/contact'
                  className='border-border text-foreground hover:bg-accent rounded-full border px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-transform duration-200 hover:scale-105'
                >
                  {t('contact')}
                </Link>
              </div>

              <div className='md:hidden'>
                <button
                  onClick={toggleMobileMenu}
                  className='text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-lg p-2.5 transition-colors'
                  aria-expanded={isMobileMenuOpen}
                  aria-label={
                    isMobileMenuOpen ? 'Close main menu' : 'Open main menu'
                  }
                >
                  {isMobileMenuOpen ? (
                    <X className='h-5 w-5' />
                  ) : (
                    <Menu className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className='mt-4 md:hidden'>
          <div className='border-border/30 bg-card/95 mx-6 rounded-2xl border shadow-xl backdrop-blur-lg lg:mx-8'>
            <div className='px-6 py-6'>
              <div className='space-y-3'>
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    )}
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className='border-border mt-6 space-y-4 border-t pt-4'>
                <div
                  className={cn(
                    'flex items-center justify-center',
                    isRTL ? 'gap-4 space-x-reverse' : 'gap-4',
                  )}
                >
                  <LanguageSwitcher />
                  <ThemeToggle translationNamespace='SahlaPlatform.common.themeToggle' />
                </div>
              </div>

              <div className='border-border mt-6 space-y-3 border-t pt-4'>
                <Link
                  href='/start'
                  className='bg-primary text-primary-foreground flex w-full justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors'
                  onClick={toggleMobileMenu}
                >
                  {tCommon('getStarted')}
                </Link>
                <Link
                  href='/contact'
                  className='border-border hover:bg-accent flex w-full justify-center rounded-full border px-6 py-3 text-sm font-medium transition-colors'
                  onClick={toggleMobileMenu}
                >
                  {t('contact')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
