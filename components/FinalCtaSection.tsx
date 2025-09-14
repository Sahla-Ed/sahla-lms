'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ScrollAnimate } from '@/components/general/ScrollAnimate';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Users,
  FileText,
  CreditCard,
  BarChart,
  Award,
  Palette,
  ArrowRight,
} from 'lucide-react';
import LogoLight from '@/public/logoLight.png';
import LogoDark from '@/public/logoDark.png';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const FeaturePill = ({
  text,
  Icon,
}: {
  text: string;
  Icon: React.ElementType;
}) => {
  const isRTL = useLocale() === 'ar';
  return (
    <div
      className={cn(
        'bg-card/50 flex w-48 items-center gap-3 rounded-xl border p-3 shadow-sm backdrop-blur-sm transition-transform hover:scale-105 md:w-56',
        isRTL ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <Icon className='text-muted-foreground h-5 w-5 flex-shrink-0' />
      <span
        className={cn(
          'flex-grow font-medium',
          isRTL ? 'text-right' : 'text-left',
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default function FinalCtaSection() {
  const t = useTranslations('SahlaPlatform.HomePage.finalCta');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const featuresLeft = [
    { text: t('features.students'), Icon: Users },
    { text: t('features.quizzes'), Icon: FileText },
    { text: t('features.payments'), Icon: CreditCard },
  ];

  const featuresRight = [
    { text: t('features.analytics'), Icon: BarChart },
    { text: t('features.certificates'), Icon: Award },
    { text: t('features.branding'), Icon: Palette },
  ];

  return (
    <section className='bg-background overflow-hidden py-20 lg:py-32'>
      <div className='container mx-auto px-6 text-center'>
        <ScrollAnimate>
          <h2 className='text-foreground text-4xl font-bold tracking-tight lg:text-6xl'>
            {t('title')
              .split('. ')
              .map((part, index) => (
                <span key={index} className='block leading-tight'>
                  {part}
                  {index > 0 ? '.' : ''}
                </span>
              ))}
          </h2>
          <p className='text-muted-foreground mx-auto mt-6 max-w-2xl'>
            {t('description')}
          </p>
        </ScrollAnimate>

        <div className='relative mt-20' dir={isRTL ? 'rtl' : 'ltr'}>
          <div className='flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16'>
            <div className='flex flex-col items-center gap-y-6 lg:items-end'>
              {featuresLeft.map((feature, i) => (
                <ScrollAnimate key={i} direction='right' delay='300'>
                  <FeaturePill text={feature.text} Icon={feature.Icon} />
                </ScrollAnimate>
              ))}
            </div>

            <div className='relative z-10 my-8 lg:my-0'>
              <ScrollAnimate>
                <div className='bg-card rounded-full border p-4 shadow-xl md:p-6'>
                  {mounted ? (
                    <Image
                      src={resolvedTheme === 'dark' ? LogoDark : LogoLight}
                      alt='Sahla Logo'
                      width={80}
                      height={80}
                      className='h-16 w-16 md:h-20 md:w-20'
                    />
                  ) : (
                    <Image
                      src={LogoLight}
                      alt='Sahla Logo'
                      width={80}
                      height={80}
                      className='h-16 w-16 md:h-20 md:w-20'
                    />
                  )}
                </div>
              </ScrollAnimate>
            </div>

            <div className='flex flex-col items-center gap-y-6 lg:items-start'>
              {featuresRight.map((feature, i) => (
                <ScrollAnimate key={i} direction='left' delay='300'>
                  <FeaturePill text={feature.text} Icon={feature.Icon} />
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </div>

        <div className='relative mt-24'>
          <ScrollAnimate delay='500'>
            <p className='text-muted-foreground mb-4 text-sm font-medium'>
              {t('your_product')}
            </p>
            <div className='bg-card relative mx-auto max-w-4xl rounded-2xl border p-2 shadow-2xl'>
              <Image
                src='/dashboard.png'
                alt='Sahla Dashboard Preview'
                width={1200}
                height={750}
                className='rounded-xl'
              />
            </div>
          </ScrollAnimate>
        </div>

        <ScrollAnimate delay='500'>
          <Button size='lg' asChild className='group mt-16 shadow-lg'>
            <Link href='/about'>
              {t('learn_more')}
              <ArrowRight
                className={cn(
                  'h-5 w-5 transition-transform group-hover:translate-x-1',
                  isRTL ? 'mr-2 rotate-180' : 'ml-2',
                )}
              />
            </Link>
          </Button>
        </ScrollAnimate>
      </div>
    </section>
  );
}
