'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { authClient } from '@/lib/auth-client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Gamepad2, BarChart3 } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

export function DefaultLandingPage() {
  const t = useTranslations('DefaultLandingPage');
  const { data: session, isPending } = authClient.useSession();
  const [lineFullWidth, setLineFullWidth] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      requestAnimationFrame(() => {
        setLineFullWidth(true);
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const features = [
    {
      title: t('features.teaching.title'),
      description: t('features.teaching.description'),
      icon: BookOpen,
    },
    {
      title: t('features.learningPath.title'),
      description: t('features.learningPath.description'),
      icon: Gamepad2,
    },
    {
      title: t('features.content.title'),
      description: t('features.content.description'),
      icon: BarChart3,
    },
  ];

  return (
    <>
      <section className='relative flex h-screen items-center justify-center overflow-hidden'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='absolute top-0 left-0 z-0 h-full w-full object-cover'
        >
          <source src='/shlavv.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <div className='absolute top-0 left-0 z-10 h-full w-full bg-black/50' />
        <div className='relative z-20 mx-auto w-full max-w-7xl px-8 text-white'>
          <div className='flex flex-col items-start'>
            <Badge
              variant='outline'
              className='mb-8 border-white/30 bg-white/10 text-white backdrop-blur-sm'
            >
              {t('hero.badge')}
            </Badge>
            <h1 className='mb-6 text-[60px] leading-none font-light tracking-tight md:text-[100px] lg:text-[120px]'>
              {t('hero.title')}
            </h1>
            <div
              className={`h-px bg-white transition-all duration-[2000ms] ease-in-out ${
                lineFullWidth ? 'w-full' : 'w-0'
              }`}
            />
            <div className='mt-6 flex w-full flex-wrap items-center justify-between gap-y-4'>
              <p className='max-w-2xl text-xl font-light opacity-90 md:text-2xl'>
                {t('hero.description')}
              </p>
              <div className='flex flex-col gap-4 sm:flex-row'>
                <Button
                  size='lg'
                  className='group relative overflow-hidden rounded-full border border-white/30 bg-white/10 px-10 py-4 text-lg font-light text-white backdrop-blur-sm transition-all duration-500 hover:border-white/50 hover:bg-white/15'
                >
                  <Link href='/courses' className='relative z-10'>
                    <span className='inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0'>
                      {t('hero.exploreButton')}
                    </span>
                    <span className='absolute inset-0 flex translate-y-full items-center justify-center opacity-0 transition-transform duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                      {t('hero.exploreButton')}
                    </span>
                  </Link>
                </Button>
                {isPending ? (
                  <LoadingSpinner />
                ) : !session ? (
                  <Button
                    size='lg'
                    variant='outline'
                    className='group relative overflow-hidden rounded-full border border-white/50 bg-transparent px-10 py-4 text-lg font-light text-white backdrop-blur-sm transition-all duration-500 hover:border-white/70'
                  >
                    <Link href='/auth/sign-in' className='relative z-10'>
                      <span className='inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0'>
                        {t('hero.signInButton')}
                      </span>
                      <span className='absolute inset-0 flex translate-y-full items-center justify-center opacity-0 transition-transform duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                        {t('hero.signInButton')}
                      </span>
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size='lg'
                    variant='outline'
                    className='group relative overflow-hidden rounded-full border border-white/50 bg-transparent px-10 py-4 text-lg font-light text-white backdrop-blur-sm transition-all duration-500 hover:border-white/70'
                  >
                    <Link href='/dashboard' className='relative z-10'>
                      <span className='inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0'>
                        {t('hero.dashboardButton')}
                      </span>
                      <span className='absolute inset-0 flex translate-y-full items-center justify-center opacity-0 transition-transform duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                        {t('hero.dashboardButton')}
                      </span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features  --- */}
      <section className='from-background to-secondary/20 bg-gradient-to-b px-8 py-20'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-3xl font-bold tracking-tight md:text-5xl'>
              {t('features.title')}
            </h2>
            <p className='text-muted-foreground mx-auto max-w-2xl md:text-xl'>
              {t('features.description')}
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='group border-0 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/10 dark:hover:bg-white/20'
              >
                <CardHeader className='text-center'>
                  <div className='bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110'>
                    <feature.icon className='text-primary h-8 w-8' />
                  </div>
                  <CardTitle className='group-hover:text-primary text-xl font-semibold transition-colors dark:text-white'>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                  <p className='text-muted-foreground leading-relaxed dark:text-gray-300'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA  --- */}
      <section className='bg-primary/5 px-8 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='mb-6 text-3xl font-bold tracking-tight md:text-5xl'>
            {t('cta.title')}
          </h2>
          <p className='text-muted-foreground mx-auto mb-8 max-w-2xl md:text-xl'>
            {t('cta.description')}
          </p>
          {!isPending && !session ? (
            <Button
              size='lg'
              className='group relative overflow-hidden rounded-full px-12 py-6 text-lg font-medium transition-all duration-500 hover:scale-105'
            >
              <Link href='/auth/sign-in' className='relative z-10'>
                <span className='inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0'>
                  {t('cta.getStartedButton')}
                </span>
                <span className='absolute inset-0 flex translate-y-full items-center justify-center opacity-0 transition-transform duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                  {t('cta.getStartedButton')}
                </span>
              </Link>
            </Button>
          ) : (
            <Button
              size='lg'
              className='group relative overflow-hidden rounded-full px-12 py-6 text-lg font-medium transition-all duration-500 hover:scale-105'
            >
              <Link href='/courses' className='relative z-10'>
                <span className='inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0'>
                  {t('cta.exploreMoreButton')}
                </span>
                <span className='absolute inset-0 flex translate-y-full items-center justify-center opacity-0 transition-transform duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                  {t('cta.exploreMoreButton')}
                </span>
              </Link>
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
