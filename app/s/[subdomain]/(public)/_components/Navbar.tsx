'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LogoLight from '@/public/logoLight.png';
import LogoDark from '@/public/logoDark.png';
import { ThemeToggle } from '@/components/themeToggle';
import { authClient } from '@/lib/auth-client';
import { buttonVariants } from '@/components/ui/button';
import { UserDropdown } from './UserDropdown';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useTranslations } from 'next-intl';

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const { theme, systemTheme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('TenantPlatform.Navbar');

  // Mount state for hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Dynamic navigation items based on session and translations
  const navigationItems = [
    { name: t('home'), href: '/' },
    { name: t('courses'), href: '/courses' },
    session
      ? { name: t('dashboard'), href: '/dashboard' }
      : { name: t('contact'), href: '/contact' },
  ];

  return (
    <header className='bg-background backdrop-blur-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b'>
      <div className='container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8'>
        <Link
          href='/'
          aria-label='Home'
          className='mr-4 flex items-center space-x-2'
        >
          {mounted ? (
            <Image
              src={currentTheme === 'dark' ? LogoDark : LogoLight}
              alt='Logo'
              className='size-20'
              priority
            />
          ) : (
            <div className='bg-muted size-20 animate-pulse rounded-md' />
          )}
        </Link>

        {/* Desktop navigation */}
        <nav className='hidden md:flex md:flex-1 md:items-center md:justify-between'>
          <div className='mx-auto flex items-center space-x-8'>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-primary relative pb-2 text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary after:bg-primary after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:rounded-full'
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className='flex items-center space-x-4'>
            <ThemeToggle translationNamespace='TenantPlatform.common.themeToggle' />

            {isPending ? (
              <LoadingSpinner />
            ) : session ? (
              <UserDropdown
                email={session.user.email}
                image={
                  session?.user.image ??
                  `https://avatar.vercel.sh/${session?.user.email}`
                }
                name={
                  session?.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session?.user.email.split('@')[0]
                }
              />
            ) : (
              <>
                <Link
                  href='/auth/sign-in'
                  className={buttonVariants({ variant: 'ghost' })}
                >
                  {t('login')}
                </Link>
                <Link href='/about' className={buttonVariants()}>
                  {t('discoverMore')}
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className='ml-auto flex items-center space-x-4 md:hidden'>
          <ThemeToggle translationNamespace='TenantPlatform.common.themeToggle' />

          {isPending ? (
            <LoadingSpinner />
          ) : session ? (
            <UserDropdown
              email={session.user.email}
              image={
                session?.user.image ??
                `https://avatar.vercel.sh/${session?.user.email}`
              }
              name={
                session?.user.name && session.user.name.length > 0
                  ? session.user.name
                  : session?.user.email.split('@')[0]
              }
            />
          ) : null}

          <button
            onClick={toggleMobileMenu}
            className='text-foreground hover:text-primary hover:bg-accent focus:ring-primary inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:outline-none focus:ring-inset'
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
          >
            {isMobileMenuOpen ? (
              <X className='block h-6 w-6' aria-hidden='true' />
            ) : (
              <Menu className='block h-6 w-6' aria-hidden='true' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden'>
          <div className='bg-background space-y-1 border-t px-2 pt-2 pb-3 sm:px-3'>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-primary hover:bg-accent block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary bg-accent'
                    : 'text-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile auth buttons */}
            {!isPending && !session && (
              <div className='border-border border-t pt-4 pb-3'>
                <div className='flex flex-col space-y-2 px-3'>
                  <Link
                    href='/auth/sign-in'
                    className={buttonVariants({
                      variant: 'ghost',
                      className: 'w-full justify-start',
                    })}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href='/about'
                    className={buttonVariants({
                      className: 'w-full justify-start',
                    })}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('discoverMore')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
