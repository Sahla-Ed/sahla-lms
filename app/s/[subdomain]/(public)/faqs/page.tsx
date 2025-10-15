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
import { getLocale, getTranslations } from 'next-intl/server';
import {
  getTenantSettingsBySlug,
  getAllTenantSlugs,
} from '@/lib/get-tenant-settings-static';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Enable ISR with 60 second revalidation
export const revalidate = 60;

// Generate static params for all tenants *This could be a performance issue if there are a lot of tenants*
export async function generateStaticParams() {
  const slugs = await getAllTenantSlugs();

  return slugs.map((slug) => ({
    subdomain: slug,
  }));
}

type Params = Promise<{ subdomain: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'FaqsPage.Metadata',
  });
  const tenant = await getTenantSettingsBySlug(subdomain);

  return {
    title: t('title'),
    description: t('description', { tenantName: tenant.name }),
  };
}

export default async function FaqsPage({ params }: { params: Params }) {
  const { subdomain } = await params;
  const t = await getTranslations('FaqsPage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  const faqCategories = {
    [t('categories.account.title')]: [
      { q: t('categories.account.q1'), a: t('categories.account.a1') },
      { q: t('categories.account.q2'), a: t('categories.account.a2') },
    ],
    [t('categories.courses.title')]: [
      { q: t('categories.courses.q1'), a: t('categories.courses.a1') },
      { q: t('categories.courses.q2'), a: t('categories.courses.a2') },
    ],
    [t('categories.payments.title')]: [
      { q: t('categories.payments.q1'), a: t('categories.payments.a1') },
      { q: t('categories.payments.q2'), a: t('categories.payments.a2') },
    ],
  };

  return (
    <div className='bg-background min-h-screen' dir={isRTL ? 'rtl' : 'ltr'}>
      <section className='bg-muted/20 px-4 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          <Badge
            variant='outline'
            className='text-primary border-primary/20 bg-primary/5 mb-6'
          >
            <Book className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
            {t('hero.badge')}
          </Badge>
          <h1 className='text-5xl font-bold tracking-tight'>
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
              className={cn('h-12 rounded-full', isRTL ? 'pr-12' : 'pl-12')}
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
                    <AccordionTrigger
                      className={cn(
                        'p-6 text-lg hover:no-underline',
                        isRTL ? 'text-right' : 'text-left',
                      )}
                    >
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent
                      className={cn(
                        'text-muted-foreground px-6 pb-6 text-base',
                        isRTL ? 'text-right' : 'text-left',
                      )}
                    >
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
          <p className='mb-8 text-lg'>{t('cta.description')}</p>
          <Button size='lg' variant='secondary' asChild>
            <Link href='/contact'>{t('cta.button')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
