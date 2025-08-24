'use client';

import { useState } from 'react';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { useLocale, useTranslations } from 'next-intl';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import RenderFooterSection from '@/components/RenderFooterSection';

interface FooterProps {
  tenantName: string;
}

export default function Footer({ tenantName }: FooterProps) {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState('');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const footerLinks = {
    support: [
      { name: t('supportLinks.contact'), href: '/contact' },
      { name: t('supportLinks.help'), href: '/help-center' },
      { name: t('supportLinks.faqs'), href: '/faqs' },
      { name: t('supportLinks.techSupport'), href: '/technical-support' },
      { name: t('supportLinks.chat'), href: '/live-chat' },
    ],
    courses: [
      { name: t('coursesLinks.browse'), href: '/courses' },
      { name: t('coursesLinks.free'), href: '/courses/free' },
      { name: t('coursesLinks.certificates'), href: '/certificates' },
      { name: t('coursesLinks.catalog'), href: '/catalog' },
      { name: t('coursesLinks.paths'), href: '/learning-paths' },
    ],
    about: [
      { name: t('aboutLinks.about'), href: '/about' },
      { name: t('aboutLinks.mission'), href: '/about#mission' },
      { name: t('aboutLinks.careers'), href: '/careers' },
      { name: t('aboutLinks.instructorProgram'), href: '/instructor-program' },
    ],
    community: [
      { name: t('communityLinks.students'), href: '/community/students' },
      { name: t('communityLinks.forums'), href: '/forums' },
      { name: t('communityLinks.groups'), href: '/study-groups' },
      { name: t('communityLinks.stories'), href: '/success-stories' },
    ],
  };

  const benefits = t.raw('benefitsMarquee') as string[];

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
      setShowErrorDialog(true);
      return;
    }
    setShowSuccessDialog(true);
    setEmail('');
  };

  const handleMouseEnter = (section: string, index: number) => {
    setHoveredSection(section);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
    setHoveredIndex(null);
  };

  return (
    <footer className='bg-background text-muted-foreground border-t py-10'>
      {/* Main Footer Content */}
      <div className='mx-auto max-w-7xl px-6 py-16'>
        <div className='grid grid-cols-1 gap-16 lg:grid-cols-12'>
          {/* Left Side - Newsletter Text */}
          <div className='lg:col-span-8'>
            <h2
              className={`mb-16 text-4xl leading-tight font-light lg:text-5xl ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              {t('newsletterTitle')}
            </h2>
          </div>

          {/* Right Side - Form & Social */}
          <div className='lg:col-span-4'>
            <div
              className={`mb-8 flex flex-col gap-4 sm:flex-row ${
                isRTL ? 'sm:flex-row-reverse' : ''
              }`}
            >
              <Input
                type='email'
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border-muted-foreground/30 placeholder:text-muted-foreground focus:border-foreground flex-1 bg-transparent'
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button
                onClick={handleSubmit}
                className='bg-foreground text-background hover:bg-foreground/90 px-8'
              >
                {t('subscribeButton')}
              </Button>
            </div>

            {/* Social Media */}
            <div>
              <p
                className={`text-muted-foreground mb-4 font-medium ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                {t('connectTitle')}
              </p>
              <div
                className={`flex ${
                  isRTL ? 'space-x-4 space-x-reverse' : 'space-x-4'
                }`}
              >
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground hover:bg-foreground/10 transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
                >
                  <Facebook className='h-6 w-6' />
                </a>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground hover:bg-foreground/10 transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
                >
                  <Twitter className='h-6 w-6' />
                </a>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground hover:bg-foreground/10 transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
                >
                  <Instagram className='h-6 w-6' />
                </a>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground hover:bg-foreground/10 transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
                >
                  <Youtube className='h-6 w-6' />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='border-sidebar-foreground border-t'></div>

        <div className='mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12'>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-9'>
            <RenderFooterSection
              title={t('supportTitle')}
              links={footerLinks.support}
              type='support'
              {...{
                hoveredSection,
                hoveredIndex,
                handleMouseEnter,
                handleMouseLeave,
              }}
            />
            <RenderFooterSection
              title={t('coursesTitle')}
              links={footerLinks.courses}
              type='courses'
              {...{
                hoveredSection,
                hoveredIndex,
                handleMouseEnter,
                handleMouseLeave,
              }}
            />
            <RenderFooterSection
              title={t('aboutTitle')}
              links={footerLinks.about}
              type='about'
              {...{
                hoveredSection,
                hoveredIndex,
                handleMouseEnter,
                handleMouseLeave,
              }}
            />
            <RenderFooterSection
              title={t('communityTitle')}
              links={footerLinks.community}
              type='community'
              {...{
                hoveredSection,
                hoveredIndex,
                handleMouseEnter,
                handleMouseLeave,
              }}
            />
          </div>

          {/* Marquee direction fix */}
          <div className='overflow-hidden lg:col-span-3'>
            <Marquee
              speed={50}
              gradient={false}
              direction='left'
              pauseOnHover
              style={{
                direction: isRTL ? 'rtl' : 'ltr',
                transform: isRTL ? 'scaleX(-1)' : 'none',
              }}
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='flex items-center whitespace-nowrap'
                  style={{
                    transform: isRTL ? 'scaleX(-1)' : 'none',
                  }}
                >
                  <span className='text-primary mx-8 text-sm'>{benefit}</span>
                  <span className='text-xs text-orange-500'>●</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      <div className='border-sidebar-foreground border-t'></div>

      {/* Bottom section */}
      <div className='mx-auto max-w-7xl px-6 py-6'>
        <div
          className={`flex flex-col items-center justify-between text-sm md:flex-row ${
            isRTL ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div
            className={`mb-4 flex flex-wrap gap-6 md:mb-0 ${
              isRTL ? 'md:order-2' : 'md:order-1'
            }`}
          >
            <Link
              href='/terms-and-conditions'
              className='text-primary transition-colors'
            >
              {t('bottomLinks.terms')}
            </Link>
            <Link
              href='/privacy-policy'
              className='text-primary transition-colors'
            >
              {t('bottomLinks.privacy')}
            </Link>
            <Link
              href='/student-agreement'
              className='text-primary transition-colors'
            >
              {t('bottomLinks.agreement')}
            </Link>
          </div>

          <p
            className={`text-muted-foreground ${
              isRTL ? 'text-right md:order-1' : 'text-left md:order-2'
            }`}
          >
            <span className='text-primary font-medium'>
              {t('copyrightTenant', {
                year: currentYear,
                tenantName: tenantName,
              })}
            </span>{' '}
            <span>{t('copyrightBrand')}</span>
          </p>
        </div>
      </div>

      {/* Dialogs remain the same */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className='max-w-md'>
          <AlertDialogHeader>
            <AlertDialogTitle
              className={`text-center text-2xl font-semibold ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              {t('dialogs.successTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription
              className={`text-center text-base leading-relaxed ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              {t('dialogs.successDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowSuccessDialog(false)}
              className='bg-primary hover:bg-primary/90 w-full'
            >
              {t('dialogs.successButton')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className='max-w-md'>
          <AlertDialogHeader>
            <AlertDialogTitle
              className={`text-destructive text-center text-2xl font-semibold ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              {t('dialogs.errorTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription
              className={`text-center text-base leading-relaxed ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              {t('dialogs.errorDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowErrorDialog(false)}
              className='bg-destructive hover:bg-destructive/90 w-full'
            >
              {t('dialogs.errorButton')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </footer>
  );
}
