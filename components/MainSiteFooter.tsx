'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { useTheme } from 'next-themes';
import LogoLight from '@/public/logoLight.png';
import LogoDark from '@/public/logoDark.png';
export function MainSiteFooter() {
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const footerLinks = {
    support: [
      { name: 'Contact us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
    ],
    platform: [
      { name: 'Home', href: '/landing' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'About us', href: '/about' },
    ],
  };

  return (
    <footer className='bg-card text-card-foreground border-t py-10'>
      <div className='mx-auto max-w-7xl px-6 py-16'>
        <div className='grid grid-cols-1 gap-16 lg:grid-cols-12'>
          <div className='lg:col-span-5'>
            <Link href='/' className='mb-4 flex items-center space-x-2'>
              <Image
                src={currentTheme === 'dark' ? LogoDark : LogoLight}
                alt='Sahla Logo'
                width={48}
                height={48}
              />
              <span className='text-2xl font-bold'>Sahla</span>
            </Link>
            <p className='text-muted-foreground max-w-md'>
              Empowering educators and businesses to create, manage, and sell
              courses under their own brand.
            </p>
            <div className='mt-6 flex space-x-4'>
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
                Support
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
                Platform
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
            <div className='mb-4 flex flex-wrap gap-6 md:mb-0'>
              <Link
                href='/terms'
                className='text-muted-foreground hover:text-primary font-medium transition-colors hover:underline'
              >
                Terms & conditions
              </Link>
              <Link
                href='/privacy'
                className='text-muted-foreground hover:text-primary font-medium transition-colors hover:underline'
              >
                Privacy Policy
              </Link>
            </div>
            <p className='text-muted-foreground'>
              © Sahla Learning Platform 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
