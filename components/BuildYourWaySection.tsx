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
      className="relative overflow-hidden py-20 lg:py-32 transition-colors duration-500"
      style={{ backgroundColor: `${brandColor}1A` }}
    >
      <div className="container mx-auto px-6">
        
        {/* Title Section */}
        <ScrollAnimate>
          <div className={cn("mb-16 text-center", isRTL ? "lg:text-right" : "lg:text-left")}>
            <p className="mb-2 text-lg font-semibold text-primary">
              {t('pre_title')}
            </p>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
              {t('title').split('. ').map((part, index) => (
                <span key={index} className="block leading-tight">
                  {part}{index === 0 ? '.' : ''}
                </span>
              ))}
            </h2>
          </div>
        </ScrollAnimate>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <ScrollAnimate>
            <div className="group relative bg-muted/20 dark:bg-muted/10 rounded-3xl p-8 lg:p-12 transition-all duration-300 h-full flex flex-col">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                {t('feature1_title')}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mt-4 mb-8">
                {t('feature1_desc')}
              </p>
              <div className="mt-auto">
                <InteractiveCard onColorChange={setBrandColor} brandColor={brandColor} />
              </div>
            </div>
          </ScrollAnimate>


          <ScrollAnimate delay="200">
            <div className="group relative bg-muted/20 dark:bg-muted/10 rounded-3xl p-8 lg:p-12 transition-all duration-300 h-full flex flex-col">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                {t('feature2_title')}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mt-4 mb-8">
                {t('feature2_desc')}
              </p>
              <div className="mt-auto">
                <InteractiveCodeCard />
              </div>
            </div>
          </ScrollAnimate>

        </div>


        <ScrollAnimate delay='300'>
          <div className="relative mt-16 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/10 dark:from-muted/20 dark:via-muted/15 dark:to-muted/5 rounded-3xl p-8 lg:p-16 text-center">
            <h3 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
              {t('feature3_title')}
            </h3>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mt-6">
              {t('feature3_desc')}
            </p>
            <div className="relative mt-12 max-w-3xl mx-auto">
                <div className="relative aspect-video rounded-2xl border bg-card p-2 shadow-2xl">
                    <Image 
                        src="/creative.jpg"
                        alt={t('feature3_title')}
                        fill
                        className="rounded-md object-cover"
                    />
                </div>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}