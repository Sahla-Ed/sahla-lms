import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  FileText,
  Shield,
  Users,
  BookOpen,
  CreditCard,
  Gavel,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTenantSettings } from '../../data/admin/get-tenant-settings';
import { cn } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'TermsPage.Metadata',
  });
  const tenant = await getTenantSettings();

  return {
    title: t('title'),
    description: t('description', { tenantName: tenant.name }),
  };
}

export default async function TermsAndConditionsPage() {
  const t = await getTranslations('TermsPage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  const sections = [
    {
      icon: <FileText className='text-primary h-6 w-6' />,
      title: t('sections.introduction.title'),
      content: t('sections.introduction.content'),
    },
    {
      icon: <Users className='text-primary h-6 w-6' />,
      title: t('sections.accounts.title'),
      content: t('sections.accounts.content'),
    },
    {
      icon: <BookOpen className='text-primary h-6 w-6' />,
      title: t('sections.access.title'),
      content: t('sections.access.content'),
    },
    {
      icon: <Shield className='text-primary h-6 w-6' />,
      title: t('sections.ip.title'),
      content: t('sections.ip.content'),
    },
    {
      icon: <CreditCard className='text-primary h-6 w-6' />,
      title: t('sections.payment.title'),
      content: t('sections.payment.content'),
    },
    {
      icon: <Gavel className='text-primary h-6 w-6' />,
      title: t('sections.conduct.title'),
      content: t('sections.conduct.content'),
    },
    {
      icon: <AlertTriangle className='text-primary h-6 w-6' />,
      title: t('sections.disclaimers.title'),
      content: t('sections.disclaimers.content'),
    },
    {
      icon: <Mail className='text-primary h-6 w-6' />,
      title: t('sections.updates.title'),
      content: t('sections.updates.content'),
    },
  ];

  return (
    <div
      className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <section className='relative px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='space-y-8 text-center'>
            <Badge
              variant='outline'
              className='text-primary border-primary/20 bg-primary/5'
            >
              {t('hero.badge')}
            </Badge>
            <h1 className='from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl'>
              {t('hero.title')}
            </h1>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed'>
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      <section className='px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-8'>
          {sections.map((section, index) => (
            <Card
              key={index}
              className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl'
            >
              <CardHeader className='pb-4'>
                <div
                  className={cn(
                    'flex items-center',
                    isRTL ? 'space-x-4 flex-row-reverse' : 'space-x-4',
                  )}
                >
                  <div className='bg-primary/10 group-hover:bg-primary/20 rounded-full p-3 transition-colors duration-300'>
                    {section.icon}
                  </div>
                  <CardTitle className='text-xl font-semibold'>
                    {index + 1}. {section.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground text-lg leading-relaxed'>
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='from-primary/5 to-primary/10 bg-gradient-to-r px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-8 text-center'>
          <h2 className='mb-6 text-4xl font-bold'>{t('cta.title')}</h2>
          <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
            {t('cta.description')}
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link href='/contact'>
              <Button size='lg' className='group'>
                {t('cta.contactButton')}
                <Mail
                  className={cn(
                    'h-4 w-4 transition-transform group-hover:translate-x-1',
                    isRTL ? 'mr-2' : 'ml-2',
                  )}
                />
              </Button>
            </Link>
            <Link href='/privacy'>
              <Button
                size='lg'
                variant='outline'
                className='bg-background/80 hover:bg-background'
              >
                {t('cta.privacyButton')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}