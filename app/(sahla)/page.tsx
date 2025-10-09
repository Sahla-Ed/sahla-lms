import { getLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ArrowRight, Bot, Shield } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ScrollAnimate } from '@/components/general/ScrollAnimate';
import React from 'react';

import BuildYourWaySection from '@/components/BuildYourWaySection';
import FinalCtaSection from '@/components/FinalCtaSection';
import TrustedBySection from '@/components/TrustedBySection';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'SahlaPlatform.HomePage.Metadata',
  });
  return { title: t('title'), description: t('description') };
}

type ScribbleShape = 'swoosh' | 'circle' | 'underline';
type ScribbleColor = 'primary' | 'blue' | 'orange' | 'red' | 'green';

const Scribble = ({
  className,
  shape = 'swoosh',
  color = 'primary',
}: {
  className?: string;
  shape?: ScribbleShape;
  color?: ScribbleColor;
}) => {
  const paths: Record<ScribbleShape, string> = {
    swoosh: 'M10 10 C 20 80, 80 20, 90 90',
    circle: 'M 50, 50 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0',
    underline: 'M5 85 Q 50 75, 95 85',
  };

  const colors: Record<ScribbleColor, string> = {
    primary: 'text-primary/40',
    blue: 'text-sky-500/70',
    orange: 'text-orange-500/80',
    red: 'text-red-500/70',
    green: 'text-green-500/70',
  };

  return (
    <svg
      className={cn(
        'pointer-events-none absolute h-24 w-24 overflow-visible',
        colors[color],
        className,
      )}
      viewBox='0 0 100 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d={paths[shape]}
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

async function HeroSection() {
  const t = await getTranslations('SahlaPlatform.HomePage.hero');
  const tCommon = await getTranslations('SahlaPlatform.common');

  return (
    <section className='bg-background text-foreground relative flex min-h-screen items-center overflow-x-hidden'>
      <Scribble
        shape='circle'
        className='end-10 top-10 hidden h-20 w-20 sm:block'
        color='blue'
      />
      <Scribble
        shape='swoosh'
        className='start-20 top-32 hidden h-16 w-16 sm:block'
        color='orange'
      />

      <div className='container mx-auto w-full px-6 text-center lg:text-start'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          <div className='relative z-10'>
            <Badge variant='outline' className='relative mb-4'>
              {t('badge')}
              <Scribble
                shape='circle'
                className='-end-6 top-0 h-8 w-8'
                color='orange'
              />
            </Badge>
            <h1 className='relative mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl'>
              {t('title')}
              <Scribble
                shape='underline'
                className='start-0 -bottom-8 h-16 w-48'
                color='blue'
              />
            </h1>
            <p className='text-foreground mx-auto mb-10 max-w-2xl text-lg lg:mx-0'>
              {t('description')}
            </p>
            <div className='flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start'>
              <Button size='lg' asChild className='shadow-lg'>
                <Link href='/start'>{tCommon('startFreeTrial')}</Link>
              </Button>
            </div>
          </div>
          <div className='relative h-64 lg:h-auto lg:self-stretch'>
            {/** @ts-expect-error Async dynamic import type */}
            {dynamic(() => import('@/components/HeroVideo'))({
              posterSrc: '/herovidimg.png',
              videoSrc: '/videos/sahla_prev.mp4',
              className: 'rounded-lg',
            })}
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
      imageSrc: '/hero1.png',
    },
    {
      icon: Shield,
      title: t('secure_video.title'),
      description: t('secure_video.description'),
      cta: t('secure_video.cta'),
      imageSrc: '/hero2.jpg',
    },
    {
      icon: MessageSquare,
      title: t('engagement.title'),
      description: t('engagement.description'),
      cta: t('engagement.cta'),
      imageSrc: '/hero3.jpg',
    },
  ];

  return (
    <section className='bg-muted/30 overflow-x-hidden py-20 lg:py-32'>
      <div className='container mx-auto w-full px-4'>
        <ScrollAnimate>
          <div className='relative mb-20 text-center'>
            <h2 className='relative mb-6 text-3xl font-bold md:text-4xl lg:text-5xl'>
              {t('title')}
              <Scribble
                shape='circle'
                className='-top-4 -right-6 h-16 w-16'
                color='blue'
              />
            </h2>
            <p className='text-muted-foreground relative mx-auto max-w-3xl text-lg leading-relaxed lg:text-xl'>
              {t('description')}
              <Scribble
                shape='swoosh'
                className='top-0 -right-8 h-14 w-14'
                color='orange'
              />
            </p>
          </div>
        </ScrollAnimate>

        <div className='space-y-20 lg:space-y-32'>
          {tools.map((tool, index) => {
            const colors: ScribbleColor[] = ['red', 'blue', 'green'];
            const shapes: ScribbleShape[] = [
              'underline',
              'swoosh',
              'underline',
            ];

            const positions = [
              '-bottom-6 -right-4',
              '-bottom-6 -left-4',
              '-bottom-6 -right-4',
            ];

            return (
              <div key={index} className='group'>
                <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
                  <ScrollAnimate direction={index % 2 === 0 ? 'right' : 'left'}>
                    <div
                      className={cn(
                        'space-y-6 text-center lg:text-left',
                        index % 2 !== 0 && 'lg:order-2',
                        isRTL && 'lg:text-right',
                      )}
                    >
                      <div className='bg-primary/10 text-primary mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl lg:h-16 lg:w-16'>
                        <tool.icon className='h-7 w-7 lg:h-8 lg:w-8' />
                      </div>

                      <h3 className='text-foreground relative text-2xl font-bold lg:text-3xl xl:text-4xl'>
                        {tool.title}
                        <Scribble
                          shape={shapes[index]}
                          className={`${positions[index]} h-12 w-20`}
                          color={colors[index]}
                        />
                      </h3>

                      <p className='text-muted-foreground mx-auto max-w-lg text-lg leading-relaxed lg:mx-0 lg:text-xl'>
                        {tool.description}
                      </p>
                      <div className='pt-4'>
                        <Button
                          variant='link'
                          asChild
                          className='group/btn text-primary h-auto p-0 text-lg font-semibold'
                        >
                          <Link
                            href='#'
                            className='inline-flex items-center gap-2'
                          >
                            <span>{tool.cta}</span>
                            <ArrowRight
                              className={cn(
                                'h-5 w-5 transition-transform group-hover/btn:translate-x-1',
                                isRTL &&
                                  'rotate-180 group-hover/btn:-translate-x-1',
                              )}
                            />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </ScrollAnimate>

                  <ScrollAnimate direction={index % 2 === 0 ? 'left' : 'right'}>
                    <div
                      className={cn(
                        'relative',
                        index % 2 !== 0 && 'lg:order-1',
                      )}
                    >
                      <div className='bg-card group-hover:shadow-3xl relative aspect-video overflow-hidden rounded-2xl border p-3 shadow-2xl transition-shadow duration-500 lg:rounded-3xl lg:p-4'>
                        <div className='relative h-full w-full overflow-hidden rounded-xl lg:rounded-2xl'>
                          <Image
                            src={tool.imageSrc}
                            alt={tool.title}
                            fill
                            sizes='(min-width: 1024px) 560px, 90vw'
                            className='object-cover transition-transform duration-500 group-hover:scale-105'
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
