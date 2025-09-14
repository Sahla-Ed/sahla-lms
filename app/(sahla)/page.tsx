import { getLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {  MessageSquare, ArrowRight, Bot, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ScrollAnimate } from '@/components/general/ScrollAnimate';
import React from 'react';

import BuildYourWaySection from '@/components/BuildYourWaySection';
import FinalCtaSection from '@/components/FinalCtaSection';
import TrustedBySection from '@/components/TrustedBySection';




export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'SahlaPlatform.HomePage.Metadata' });
  return { title: t('title'), description: t('description') };
}


const Scribble = ({ 
  className, 
  shape = 'swoosh',
  color = 'primary'
}: { 
  className?: string, 
  shape?: 'swoosh' | 'circle' | 'underline',
  color?: 'primary' | 'blue' | 'orange' | 'red' | 'green'
}) => {
  const paths = {
    swoosh: "M10 10 C 20 80, 80 20, 90 90",
    circle: "M 50, 50 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0",
    underline: "M5 85 Q 50 75, 95 85"
  };

  const colors = {
    primary: "text-primary/40",
    blue: "text-sky-500/70",
    orange: "text-orange-500/80",
    red: "text-red-500/70",
    green: "text-green-500/70"
  };

  return (
    <svg className={cn("absolute w-24 h-24 pointer-events-none", colors[color], className)} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={paths[shape]} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};


async function HeroSection() {
  const t = await getTranslations('SahlaPlatform.HomePage.hero');
  const tCommon = await getTranslations('SahlaPlatform.common');
  
  return (
    <section className="bg-background text-foreground relative flex min-h-screen items-center">
      <Scribble shape="circle" className="top-10 right-10 w-20 h-20" color="blue" />
      <Scribble shape="swoosh" className="top-32 left-20 w-16 h-16" color="orange" />
      <div className="container mx-auto px-6 text-center lg:text-left">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="z-10 relative">
            <Badge variant="outline" className="mb-4 relative">
              {t('badge')}
              <Scribble shape="circle" className="top-0 -right-6 w-8 h-8" color="orange" />
            </Badge>
            <h1 className="relative mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              {t('title')}
              <Scribble shape="underline" className="-bottom-8 left-0 w-48 h-16" color="blue" />
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground lg:mx-0">
              {t('description')}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" asChild className="shadow-lg">
                <Link href="/start">{tCommon('startFreeTrial')}</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 lg:h-auto lg:self-stretch">
          <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="rounded-lg object-cover w-full h-full shadow-2xl"
              >
                <source src="/videos/sahla_prev.mp4" type="video/mp4" />
             </video>
          </div>
        </div>
      </div>
    </section>
  );
}





async function ToolsSection() {
  const t = await getTranslations('SahlaPlatform.HomePage.tools');
  const locale = await getLocale();
  const isRTL = locale === 'ar';
  
  const tools = [
    { 
      icon: Bot, 
      title: t('ai_bank.title'), 
      description: t('ai_bank.description'),
      cta: t('ai_bank.cta'),
      imageSrc: "/hero1.png"
    },
    { 
      icon: Shield, 
      title: t('secure_video.title'), 
      description: t('secure_video.description'),
      cta: t('secure_video.cta'),
      imageSrc: "/hero2.jpg"
    },
    { 
      icon: MessageSquare, 
      title: t('engagement.title'), 
      description: t('engagement.description'),
      cta: t('engagement.cta'),
      imageSrc: "/hero3.jpg"
    },
  ];

  return (
    <section className="bg-muted/30 py-20 lg:py-32">
      <div className="container mx-auto px-4">

        <ScrollAnimate>
          <div className="mb-20 text-center relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 relative">
              {t('title')}
              <Scribble shape="circle" className="-top-4 -right-6 w-16 h-16" color="blue" />
            </h2>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed relative">
              {t('description')}
              <Scribble shape="swoosh" className="top-0 -right-8 w-14 h-14" color="orange" />
            </p>
          </div>
        </ScrollAnimate>

        <div className="space-y-20 lg:space-y-32">
          {tools.map((tool, index) => {

            const colors = ['red', 'blue', 'green'];
            const shapes = ['underline', 'swoosh', 'underline'];
            const positions = [
              '-bottom-6 -right-4',
              '-bottom-6 -left-4',
              '-bottom-6 -right-4'
            ];
            
            return (
              <div key={index} className="group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  

                  <ScrollAnimate direction={index % 2 === 0 ? 'right' : 'left'}>
                    <div className={cn(
                      "space-y-6 text-center lg:text-left",
                      index % 2 !== 0 && "lg:order-2",
                      isRTL && "lg:text-right"
                    )}>                   

                      <div className="bg-primary/10 text-primary inline-flex h-14 w-14 lg:h-16 lg:w-16 items-center justify-center rounded-2xl mb-6">
                        <tool.icon className="h-7 w-7 lg:h-8 lg:w-8" />
                      </div>

                      <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground relative">
                        {tool.title}
                        <Scribble 
                          shape={shapes[index] as any} 
                          className={`${positions[index]} w-20 h-12`} 
                          color={colors[index] as any} 
                        />
                      </h3>

                      <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
                        {tool.description}
                      </p>
                      <div className="pt-4">
                        <Button variant="link" asChild className="group/btn p-0 h-auto text-primary font-semibold text-lg">
                          <Link href="#" className="inline-flex items-center gap-2">
                            <span>{tool.cta}</span>
                            <ArrowRight className={cn(
                              "h-5 w-5 transition-transform group-hover/btn:translate-x-1",
                              isRTL && "rotate-180 group-hover/btn:-translate-x-1"
                            )} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </ScrollAnimate>


                  <ScrollAnimate direction={index % 2 === 0 ? 'left' : 'right'}>
                    <div className={cn(
                      "relative",
                      index % 2 !== 0 && "lg:order-1"
                    )}>
                      <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden border bg-card shadow-2xl p-3 lg:p-4 group-hover:shadow-3xl transition-shadow duration-500">
                        <div className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden">
                          <Image 
                            src={tool.imageSrc}
                            alt={tool.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </ScrollAnimate>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}





export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <ToolsSection />
      <BuildYourWaySection />
      <FinalCtaSection />
    </>
  );
}