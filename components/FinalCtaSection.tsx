'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ScrollAnimate } from '@/components/general/ScrollAnimate';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Users, FileText, CreditCard, BarChart, Award, Palette, ArrowRight } from 'lucide-react';
import LogoLight from '@/public/logoLight.png';
import LogoDark from '@/public/logoDark.png';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react'; 


const FeaturePill = ({ text, Icon }: { text: string; Icon: React.ElementType }) => {
  const isRTL = useLocale() === 'ar';
  return (
    <div className={cn(
      "flex items-center gap-3 rounded-xl border bg-card/50 p-3 shadow-sm w-48 md:w-56 backdrop-blur-sm transition-transform hover:scale-105",
      isRTL ? 'flex-row-reverse' : 'flex-row'
    )}>
      <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      <span className={cn("font-medium flex-grow", isRTL ? 'text-right' : 'text-left')}>{text}</span>
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
    <section className="bg-background py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <ScrollAnimate>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
            {t('title').split('. ').map((part, index) => (
              <span key={index} className="block leading-tight">{part}{index > 0 ? '.' : ''}</span>
            ))}
          </h2>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl">{t('description')}</p>
        </ScrollAnimate>
        

        <div className="relative mt-20" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">

                <div className="flex flex-col items-center lg:items-end gap-y-6">
                    {featuresLeft.map((feature, i) => (
                         <ScrollAnimate key={i} direction="right" delay='300'>
                            <FeaturePill text={feature.text} Icon={feature.Icon} />
                        </ScrollAnimate>
                    ))}
                </div>

                <div className="relative z-10 my-8 lg:my-0">
                    <ScrollAnimate>
                        <div className="bg-card border rounded-full p-4 md:p-6 shadow-xl">
                            {mounted ? (
                              <Image 
                                src={resolvedTheme === 'dark' ? LogoDark : LogoLight} 
                                alt="Sahla Logo" 
                                width={80} 
                                height={80} 
                                className="w-16 h-16 md:w-20 md:h-20" 
                              />
                            ) : (
                              <Image 
                                src={LogoLight} 
                                alt="Sahla Logo" 
                                width={80} 
                                height={80} 
                                className="w-16 h-16 md:w-20 md:h-20" 
                              />
                            )}
                        </div>
                    </ScrollAnimate>
                </div>
                

                <div className="flex flex-col items-center lg:items-start gap-y-6">
                    {featuresRight.map((feature, i) => (
                        <ScrollAnimate key={i} direction="left" delay='300'>
                            <FeaturePill text={feature.text} Icon={feature.Icon} />
                        </ScrollAnimate>
                    ))}
                </div>
            </div>
        </div>

        <div className="relative mt-24">
            <ScrollAnimate delay="500">
                <p className="text-sm font-medium text-muted-foreground mb-4">{t('your_product')}</p>
                <div className="relative max-w-4xl mx-auto rounded-2xl border bg-card p-2 shadow-2xl">
                    <Image 
                        src="/dashboard.png" 
                        alt="Sahla Dashboard Preview"
                        width={1200}
                        height={750}
                        className="rounded-xl"
                    />
                </div>
            </ScrollAnimate>
        </div>

        <ScrollAnimate delay="500">
          <Button size="lg" asChild className="group mt-16 shadow-lg">
            <Link href="/about">
              {t('learn_more')}
              <ArrowRight className={cn("h-5 w-5 transition-transform group-hover:translate-x-1", isRTL ? 'mr-2 rotate-180' : 'ml-2')} />
            </Link>
          </Button>
        </ScrollAnimate>

      </div>
    </section>
  );
}