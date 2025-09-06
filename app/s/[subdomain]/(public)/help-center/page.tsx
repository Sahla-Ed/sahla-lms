import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LifeBuoy, Book, Wrench, MessageSquare, Search } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTenantSettings } from '../../data/admin/get-tenant-settings';
import { cn } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'HelpCenterPage.Metadata',
  });
  const tenant = await getTenantSettings();

  return {
    title: t('title'),
    description: t('description', { tenantName: tenant.name }),
  };
}

export default async function HelpCenterPage() {
  const t = await getTranslations('HelpCenterPage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  const faqItems = [
    {
      question: t('faqAccordion.items.q1'),
      answer: t('faqAccordion.items.a1'),
    },
    {
      question: t('faqAccordion.items.q2'),
      answer: t('faqAccordion.items.a2'),
    },
    {
      question: t('faqAccordion.items.q3'),
      answer: t('faqAccordion.items.a3'),
    },
  ];

  return (
    <div
      className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <section className='relative px-4 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          <Badge
            variant='outline'
            className='text-primary border-primary/20 bg-primary/5 mb-6'
          >
            <LifeBuoy className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
            {t('hero.badge')}
          </Badge>
          <h1 className='text-5xl font-bold tracking-tight md:text-6xl'>
            {t('hero.title')}
          </h1>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-xl'>
            {t('hero.description')}
          </p>
          <div className='relative mx-auto mt-8 max-w-xl'>
            <Search
              className={cn(
                'text-muted-foreground absolute top-1/2 -translate-y-1/2',
                isRTL ? 'right-4' : 'left-4',
              )}
            />
            <Input
              placeholder={t('hero.searchPlaceholder')}
              className={cn(
                'h-14 rounded-full text-lg',
                isRTL ? 'pr-12' : 'pl-12',
              )}
            />
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className='px-4 py-16'>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <Link href='/faqs'>
            <Card className='group bg-card/50 border-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'>
              <CardHeader>
                <div className='bg-primary/10 mb-4 w-fit rounded-full p-3'>
                  <Book className='text-primary h-8 w-8' />
                </div>
                <CardTitle>{t('categories.faqs.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  {t('categories.faqs.description')}
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href='/technical-support'>
            <Card className='group bg-card/50 border-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'>
              <CardHeader>
                <div className='bg-primary/10 mb-4 w-fit rounded-full p-3'>
                  <Wrench className='text-primary h-8 w-8' />
                </div>
                <CardTitle>{t('categories.techSupport.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  {t('categories.techSupport.description')}
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href='/contact'>
            <Card className='group bg-card/50 border-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'>
              <CardHeader>
                <div className='bg-primary/10 mb-4 w-fit rounded-full p-3'>
                  <MessageSquare className='text-primary h-8 w-8' />
                </div>
                <CardTitle>{t('categories.contact.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  {t('categories.contact.description')}
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className='bg-muted/10 px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='mb-8 text-center text-3xl font-bold'>
            {t('faqAccordion.title')}
          </h2>
          <Accordion type='single' collapsible className='w-full'>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger
                  className={cn('text-lg', isRTL ? 'text-right' : 'text-left')}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className={cn(
                    'text-muted-foreground text-base',
                    isRTL ? 'text-right' : 'text-left',
                  )}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
