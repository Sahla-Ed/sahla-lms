import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Book, Search } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'SahlaPlatform.FaqsPage.Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function FaqsPage() {
  const t = await getTranslations('SahlaPlatform.FaqsPage');

  const faqCategories = {
    [t('categories.platformFeatures.title')]: [
      { q: t('categories.platformFeatures.q1'), a: t('categories.platformFeatures.a1') },
      { q: t('categories.platformFeatures.q2'), a: t('categories.platformFeatures.a2') },
      { q: t('categories.platformFeatures.q3'), a: t('categories.platformFeatures.a3') },
      { q: t('categories.platformFeatures.q4'), a: t('categories.platformFeatures.a4') },
      { q: t('categories.platformFeatures.q5'), a: t('categories.platformFeatures.a5') },
    ],
    [t('categories.pricing.title')]: [
      { q: t('categories.pricing.q1'), a: t('categories.pricing.a1') },
      { q: t('categories.pricing.q2'), a: t('categories.pricing.a2') },
      { q: t('categories.pricing.q3'), a: t('categories.pricing.a3') },
      { q: t('categories.pricing.q4'), a: t('categories.pricing.a4') },
    ],
    [t('categories.support.title')]: [
      { q: t('categories.support.q1'), a: t('categories.support.a1') },
      { q: t('categories.support.q2'), a: t('categories.support.a2') },
      { q: t('categories.support.q3'), a: t('categories.support.a3') },
    ],
  };

  return (
    <div className='bg-background min-h-screen'>
      <section className='bg-muted/20 px-4 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          <Badge
            variant='outline'
            className='text-primary border-primary/20 bg-primary/5 mb-6'
          >
            <Book className='me-2 h-4 w-4' />
            {t('hero.badge')}
          </Badge>
          <h1 className='text-5xl font-bold tracking-tight'>
            {t('hero.title')}
          </h1>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-xl'>
            {t('hero.description')}
          </p>
          <div className='relative mx-auto mt-8 max-w-xl'>
            <Search className='text-muted-foreground absolute top-1/2 start-4 -translate-y-1/2' />
            <Input
              placeholder={t('hero.searchPlaceholder')}
              className='h-12 rounded-full ps-12'
            />
          </div>
        </div>
      </section>

      <section className='px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-12'>
          {Object.entries(faqCategories).map(([category, faqs]) => (
            <div key={category}>
              <h2 className='mb-6 text-3xl font-bold'>{category}</h2>
              <Accordion type='single' collapsible className='w-full space-y-4'>
                {faqs.map((faq, index) => (
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
          ))}
        </div>
      </section>

      <section className='bg-primary text-primary-foreground px-4 py-12 text-center'>
        <div className='container mx-auto'>
          <h2 className='mb-4 text-3xl font-bold'>{t('cta.title')}</h2>
          <p className='mb-8 text-lg'>
            {t('cta.description')}
          </p>
          <Button size='lg' variant='secondary' asChild>
            <Link href='/contact'>{t('cta.button')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}