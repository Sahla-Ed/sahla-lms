import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  CheckCircle,
  Users,
  Globe,
  BarChart,
  Code,
  ShieldCheck,
  FolderKanban,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { ScrollAnimate } from '@/components/general/ScrollAnimate';

const Scribble = ({
  className,
  shape = 'swoosh',
  color = 'primary',
}: {
  className?: string;
  shape?: 'swoosh' | 'circle' | 'underline';
  color?: 'primary' | 'blue' | 'orange';
}) => {
  const paths = {
    swoosh: 'M10 10 C 20 80, 80 20, 90 90',
    circle: 'M 50, 50 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0',
    underline: 'M5 85 Q 50 75, 95 85',
  };
  const colors = {
    primary: 'text-primary/40',
    blue: 'text-sky-500/70',
    orange: 'text-orange-500/80',
  };
  return (
    <svg
      className={cn(
        'pointer-events-none absolute h-24 w-24',
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'SahlaPlatform.PricingPage.Metadata',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PricingPage() {
  const t = await getTranslations('SahlaPlatform.PricingPage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  const pricingFaqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
  ];

  return (
    <div
      className='bg-background min-h-screen py-12'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className='container mx-auto px-6'>
        <ScrollAnimate>
          <div className='mb-20 text-center'>
            <h1 className='relative mb-4 text-5xl font-bold tracking-tight lg:text-7xl'>
              {t('title')}
              <Scribble
                shape='circle'
                className='-top-8 -right-8 h-24 w-24 lg:-top-12 lg:-right-12 lg:h-32 lg:w-32'
                color='orange'
              />
            </h1>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl lg:text-2xl'>
              {t('description')}
            </p>
          </div>
        </ScrollAnimate>

        <div className='flex flex-wrap items-center justify-center gap-8'>
          {/* Starter Plan */}
          <ScrollAnimate delay='100'>
            <div className='group bg-card w-full max-w-sm transform rounded-2xl border p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl'>
              <h3 className='text-2xl font-bold'>{t('starterPlan.title')}</h3>
              <p className='text-muted-foreground mt-2'>
                {t('starterPlan.description')}
              </p>
              <div className='my-8'>
                <span className='text-5xl font-extrabold'>
                  {t('starterPlan.price')}
                </span>
              </div>
              <ul className='space-y-4 text-start'>
                <li className='flex items-center gap-3'>
                  <CheckCircle className='h-5 w-5 text-green-500' />{' '}
                  {t('starterPlan.feature1')}
                </li>
                <li className='flex items-center gap-3'>
                  <Users className='h-5 w-5 text-green-500' />{' '}
                  {t('starterPlan.feature2')}
                </li>
                <li className='flex items-center gap-3'>
                  <BarChart className='h-5 w-5 text-green-500' />{' '}
                  {t('starterPlan.feature3')}
                </li>
              </ul>
              <Button className='mt-8 w-full' variant='outline' asChild>
                <Link href='/start'>{t('starterPlan.button')}</Link>
              </Button>
            </div>
          </ScrollAnimate>

          {/* Pro Plan - The Hero Card */}
          <ScrollAnimate delay='200'>
            <div className='group bg-card hover:shadow-primary/20 relative w-full max-w-sm transform rounded-3xl border-2 border-transparent p-8 shadow-2xl transition-all duration-300 hover:scale-110 md:scale-105'>
              <div
                className='from-primary absolute -inset-2 -z-10 rounded-[28px] bg-gradient-to-r via-sky-500 to-green-400 opacity-0 transition-all duration-500 group-hover:opacity-60 group-hover:blur-2xl'
                aria-hidden='true'
              ></div>

              <Badge
                variant='default'
                className='absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm'
              >
                {t('proPlan.badge')}
              </Badge>
              <h3 className='text-3xl font-extrabold'>{t('proPlan.title')}</h3>
              <p className='text-muted-foreground mt-2'>
                {t('proPlan.description')}
              </p>
              <div className='my-8'>
                <span className='text-6xl font-extrabold'>
                  {t('proPlan.price')}
                </span>
                <span className='text-muted-foreground text-lg font-medium'>
                  {t('proPlan.perMonth')}
                </span>
              </div>
              <ul className='space-y-4 text-start'>
                <li className='flex items-center gap-3'>
                  <CheckCircle className='h-5 w-5 text-green-500' />{' '}
                  {t('proPlan.feature1')}
                </li>
                <li className='flex items-center gap-3'>
                  <Globe className='h-5 w-5 text-green-500' />{' '}
                  {t('proPlan.feature2')}
                </li>
                <li className='flex items-center gap-3'>
                  <BarChart className='h-5 w-5 text-green-500' />{' '}
                  {t('proPlan.feature3')}
                </li>
                <li className='flex items-center gap-3'>
                  <Sparkles className='h-5 w-5 text-green-500' />{' '}
                  {t('proPlan.feature4')}
                </li>
                <li className='flex items-center gap-3'>
                  <ShieldCheck className='h-5 w-5 text-green-500' />{' '}
                  {t('proPlan.feature5')}
                </li>
              </ul>
              <Button size='lg' className='group/btn mt-8 w-full' asChild>
                <Link href='/start' className='flex items-center gap-2'>
                  {t('proPlan.button')}{' '}
                  <ArrowRight
                    className={cn(
                      'h-4 w-4 transition-transform group-hover/btn:translate-x-1',
                      isRTL && 'rotate-180 group-hover/btn:-translate-x-1',
                    )}
                  />
                </Link>
              </Button>
            </div>
          </ScrollAnimate>

          {/* Enterprise Plan */}
          <ScrollAnimate delay='300'>
            <div className='group bg-card w-full max-w-sm transform rounded-2xl border p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl'>
              <h3 className='text-2xl font-bold'>
                {t('enterprisePlan.title')}
              </h3>
              <p className='text-muted-foreground mt-2'>
                {t('enterprisePlan.description')}
              </p>
              <div className='my-8'>
                <span className='text-5xl font-extrabold'>
                  {t('enterprisePlan.price')}
                </span>
              </div>
              <ul className='space-y-4 text-start'>
                <li className='flex items-center gap-3'>
                  <CheckCircle className='h-5 w-5 text-green-500' />{' '}
                  {t('enterprisePlan.feature1')}
                </li>
                <li className='flex items-center gap-3'>
                  <Users className='h-5 w-5 text-green-500' />{' '}
                  {t('enterprisePlan.feature2')}
                </li>
                <li className='flex items-center gap-3'>
                  <FolderKanban className='h-5 w-5 text-green-500' />{' '}
                  {t('enterprisePlan.feature3')}
                </li>
                <li className='flex items-center gap-3'>
                  <ShieldCheck className='h-5 w-5 text-green-500' />{' '}
                  {t('enterprisePlan.feature4')}
                </li>
                <li className='flex items-center gap-3'>
                  <Globe className='h-5 w-5 text-green-500' />{' '}
                  {t('enterprisePlan.feature5')}
                </li>
                <li className='flex items-center gap-3'>
                  <CheckCircle className='h-5 w-5 text-green-500' />{' '}
                  {t('enterprisePlan.feature6')}
                </li>
                <li className='flex items-center gap-3'>
                  <Code className='h-5 w-5 text-green-500' />{' '}
                  {t('enterprisePlan.feature7')}
                </li>
              </ul>
              <Button className='mt-8 w-full' variant='outline' asChild>
                <Link href='/contact'>{t('enterprisePlan.button')}</Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>

        {/* Pricing FAQs */}
        <section className='px-4 py-20 lg:py-32'>
          <div className='mx-auto max-w-3xl space-y-12'>
            <ScrollAnimate>
              <h2 className='relative mb-12 text-center text-4xl font-bold'>
                {t('faq.title')}
                <Scribble
                  shape='underline'
                  className='-bottom-8 left-1/2 h-16 w-48 -translate-x-1/2'
                  color='blue'
                />
              </h2>
            </ScrollAnimate>
            <Accordion type='single' collapsible className='w-full space-y-4'>
              {pricingFaqs.map((faq, index) => (
                <ScrollAnimate key={index} delay={(index * 100).toString()}>
                  <AccordionItem
                    value={`item-${index}`}
                    className='bg-card/50 rounded-lg border'
                  >
                    <AccordionTrigger className='p-6 text-start text-lg hover:no-underline'>
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className='text-muted-foreground px-6 pb-6 text-start text-base'>
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollAnimate>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  );
}
