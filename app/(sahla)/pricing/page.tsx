import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'SahlaPlatform.PricingPage.Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PricingPage() {
  const t = await getTranslations('SahlaPlatform.PricingPage');


  const pricingFaqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
  ];

  return (
    <div className='container mx-auto py-12'>
      <div className='mb-12 text-center'>
        <h1 className='mb-4 text-4xl font-bold'>{t('title')}</h1>
        <p className='text-muted-foreground text-xl'>
          {t('description')}
        </p>
      </div>

      <div className='bg-muted/20 grid grid-cols-1 gap-8 rounded-lg p-8 shadow-inner md:grid-cols-3'>
        {/* Starter Plan */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle className='text-2xl'>{t('starterPlan.title')}</CardTitle>
            <CardDescription>{t('starterPlan.description')}</CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <div className='mb-4 text-4xl font-bold'>{t('starterPlan.price')}</div>
            <ul className='space-y-2 text-start'>
              <li className='flex items-center'>
                <CheckCircle className='me-2 h-5 w-5 text-green-500' /> {t('starterPlan.feature1')}
              </li>
              <li className='flex items-center'>
                <Users className='me-2 h-5 w-5 text-green-500' /> {t('starterPlan.feature2')}
              </li>
              <li className='flex items-center'>
                <BarChart className='me-2 h-5 w-5 text-green-500' /> {t('starterPlan.feature3')}
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' asChild>
              <Link href='/start'>{t('starterPlan.button')}</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className='border-primary relative flex flex-col shadow-lg'>
          <Badge
            variant='default'
            className='absolute -top-3 left-1/2 -translate-x-1/2 rotate-3'
          >
            {t('proPlan.badge')}
          </Badge>
          <CardHeader>
            <CardTitle className='text-2xl'>{t('proPlan.title')}</CardTitle>
            <CardDescription>{t('proPlan.description')}</CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <div className='mb-4 text-4xl font-bold'>
              {t('proPlan.price')}<span className='text-muted-foreground text-lg'>{t('proPlan.perMonth')}</span>
            </div>
            <ul className='space-y-2 text-start'> 
              <li className='flex items-center'>
                <CheckCircle className='me-2 h-5 w-5 text-green-500' /> {t('proPlan.feature1')}
              </li>
              <li className='flex items-center'>
                <Globe className='me-2 h-5 w-5 text-green-500' /> {t('proPlan.feature2')}
              </li>
              <li className='flex items-center'>
                <BarChart className='me-2 h-5 w-5 text-green-500' /> {t('proPlan.feature3')}
              </li>
              <li className='flex items-center'>
                <Sparkles className='me-2 h-5 w-5 text-green-500' /> {t('proPlan.feature4')}
              </li>
              <li className='flex items-center'>
                <ShieldCheck className='me-2 h-5 w-5 text-green-500' /> {t('proPlan.feature5')}
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' asChild>
              <Link href='/start'>{t('proPlan.button')}</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle className='text-2xl'>{t('enterprisePlan.title')}</CardTitle>
            <CardDescription>{t('enterprisePlan.description')}</CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <div className='mb-4 text-4xl font-bold'>
              {t('enterprisePlan.price')}
              <span className='text-muted-foreground text-lg'>{t('proPlan.perMonth')}</span>
            </div>
            <ul className='space-y-2 text-start'>
              <li className='flex items-center'>
                <CheckCircle className='me-2 h-5 w-5 text-green-500' /> {t('enterprisePlan.feature1')}
              </li>
              <li className='flex items-center'>
                <Users className='me-2 h-5 w-5 text-green-500' /> {t('enterprisePlan.feature2')}
              </li>
              <li className='flex items-center'>
                <FolderKanban className='me-2 h-5 w-5 text-green-500' /> {t('enterprisePlan.feature3')}
              </li>
              <li className='flex items-center'>
                <ShieldCheck className='me-2 h-5 w-5 text-green-500' /> {t('enterprisePlan.feature4')}
              </li>
              <li className='flex items-center'>
                <Globe className='me-2 h-5 w-5 text-green-500' /> {t('enterprisePlan.feature5')}
              </li>
              <li className='flex items-center'>
                <CheckCircle className='me-2 h-5 w-5 text-green-500' /> {t('enterprisePlan.feature6')}
              </li>
              <li className='flex items-center'>
                <Code className='me-2 h-5 w-5 text-green-500' /> {t('enterprisePlan.feature7')}
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' asChild>
              <Link href='/contact'>{t('enterprisePlan.button')}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* Pricing FAQs */}
      <section className='px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-12'>
          <h2 className='mb-12 text-center text-4xl font-bold'>
            {t('faq.title')}
          </h2>
          <Accordion type='single' collapsible className='w-full space-y-4'>
            {pricingFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
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
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}