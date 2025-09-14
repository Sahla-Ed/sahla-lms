'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ScrollAnimate } from '@/components/general/ScrollAnimate';
import { InteractiveCard } from './InteractiveCard';
import { InteractiveCodeCard } from './InteractiveCodeCard';

export default function BuildYourWaySection() {
  const t = useTranslations('SahlaPlatform.HomePage.whySahla');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [brandColor, setBrandColor] = useState('#3B82F6');

  return (
    <section
      className='relative overflow-hidden py-20 transition-colors duration-500 lg:py-32'
      style={{ backgroundColor: `${brandColor}1A` }}
    >
      <div className='container mx-auto px-6'>
        {/* Title Section */}
        <ScrollAnimate>
          <div
            className={cn(
              'mb-16 text-center',
              isRTL ? 'lg:text-right' : 'lg:text-left',
            )}
          >
            <p className='text-primary mb-2 text-lg font-semibold'>
              {t('pre_title')}
            </p>
            <h2 className='text-foreground text-4xl font-bold tracking-tight lg:text-6xl'>
              {t('title')
                .split('. ')
                .map((part, index) => (
                  <span key={index} className='block leading-tight'>
                    {part}
                    {index === 0 ? '.' : ''}
                  </span>
                ))}
            </h2>
          </div>
        </ScrollAnimate>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <ScrollAnimate>
            <div className='group bg-muted/20 dark:bg-muted/10 relative flex h-full flex-col rounded-3xl p-8 transition-all duration-300 lg:p-12'>
              <h3 className='text-foreground text-2xl font-bold lg:text-3xl'>
                {t('feature1_title')}
              </h3>
              <p className='text-muted-foreground mt-4 mb-8 text-lg leading-relaxed'>
                {t('feature1_desc')}
              </p>
              <div className='mt-auto'>
                <InteractiveCard
                  onColorChange={setBrandColor}
                  brandColor={brandColor}
                />
              </div>
            </div>
          </ScrollAnimate>

          <ScrollAnimate delay='200'>
            <div className='group bg-muted/20 dark:bg-muted/10 relative flex h-full flex-col rounded-3xl p-8 transition-all duration-300 lg:p-12'>
              <h3 className='text-foreground text-2xl font-bold lg:text-3xl'>
                {t('feature2_title')}
              </h3>
              <p className='text-muted-foreground mt-4 mb-8 text-lg leading-relaxed'>
                {t('feature2_desc')}
              </p>
              <div className='mt-auto'>
                <InteractiveCodeCard />
              </div>
            </div>
          </ScrollAnimate>
        </div>

        <ScrollAnimate delay='300'>
          <div className='from-muted/30 via-muted/20 to-muted/10 dark:from-muted/20 dark:via-muted/15 dark:to-muted/5 relative mt-16 rounded-3xl bg-gradient-to-br p-8 text-center lg:p-16'>
            <h3 className='text-foreground text-3xl leading-tight font-bold lg:text-5xl'>
              {t('feature3_title')}
            </h3>
            <p className='text-muted-foreground mx-auto mt-6 max-w-3xl text-xl leading-relaxed lg:text-2xl'>
              {t('feature3_desc')}
            </p>
            <div className='relative mx-auto mt-12 max-w-3xl'>
              <div className='bg-card relative aspect-video rounded-2xl border p-2 shadow-2xl'>
                <Image
                  src='/creative.jpg'
                  alt={t('feature3_title')}
                  fill
                  className='rounded-md object-cover'
                />
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
