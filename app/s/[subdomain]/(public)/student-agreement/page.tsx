import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  UserCheck,
  BookOpen,
  Award,
  Shield,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTenantSettings } from '../../data/admin/get-tenant-settings';
import { cn } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'StudentAgreementPage.Metadata',
  });
  const tenant = await getTenantSettings();

  return {
    title: t('title'),
    description: t('description', { tenantName: tenant.name }),
  };
}

export default async function StudentAgreementPage() {
  const t = await getTranslations('StudentAgreementPage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  const sections = [
    {
      icon: <UserCheck className='text-primary h-6 w-6' />,
      title: t('guidelines.sections.conduct.title'),
      content: t('guidelines.sections.conduct.content'),
    },
    {
      icon: <BookOpen className='text-primary h-6 w-6' />,
      title: t('guidelines.sections.learning.title'),
      content: t('guidelines.sections.learning.content'),
    },
    {
      icon: <Award className='text-primary h-6 w-6' />,
      title: t('guidelines.sections.certification.title'),
      content: t('guidelines.sections.certification.content'),
    },
    {
      icon: <Shield className='text-primary h-6 w-6' />,
      title: t('guidelines.sections.security.title'),
      content: t('guidelines.sections.security.content'),
    },
  ];

  const rights = t.raw('rights.items') as string[];
  const responsibilities = t.raw('responsibilities.items') as string[];

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
              {t('hero.description', {
                tenantName: (await getTenantSettings()).name,
              })}
            </p>
          </div>
        </div>
      </section>

      <section className='px-4 py-20'>
        <div className='mx-auto grid max-w-4xl gap-8 md:grid-cols-2'>
          <Card className='group from-card border-0 bg-gradient-to-br to-green-50/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
            <CardHeader>
              <CardTitle
                className={cn(
                  'flex items-center justify-center text-center text-2xl',
                  isRTL ? 'flex-row-reverse space-x-3' : 'space-x-3',
                )}
              >
                <div className='rounded-full bg-green-100 p-2'>
                  <Shield className='h-6 w-6 text-green-600' />
                </div>
                <span>{t('rights.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {rights.map((right, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start',
                    isRTL ? 'flex-row-reverse space-x-3' : 'space-x-3',
                  )}
                >
                  <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500'></div>
                  <p className='text-muted-foreground leading-relaxed'>
                    {right}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className='group from-card to-primary/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
            <CardHeader>
              <CardTitle
                className={cn(
                  'flex items-center justify-center text-center text-2xl',
                  isRTL ? 'flex-row-reverse space-x-3' : 'space-x-3',
                )}
              >
                <div className='bg-primary/10 rounded-full p-2'>
                  <UserCheck className='text-primary h-6 w-6' />
                </div>
                <span>{t('responsibilities.title')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {responsibilities.map((resp, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start',
                    isRTL ? 'flex-row-reverse space-x-3' : 'space-x-3',
                  )}
                >
                  <div className='bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
                  <p className='text-muted-foreground leading-relaxed'>
                    {resp}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='bg-muted/10 px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>{t('guidelines.title')}</h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
              {t('guidelines.description')}
            </p>
          </div>
          <div className='space-y-8'>
            {sections.map((section, index) => (
              <Card
                key={index}
                className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl'
              >
                <CardHeader className='pb-4'>
                  <div
                    className={cn(
                      'flex items-center',
                      isRTL ? 'flex-row-reverse space-x-4' : 'space-x-4',
                    )}
                  >
                    <div className='bg-primary/10 group-hover:bg-primary/20 rounded-full p-3 transition-colors duration-300'>
                      {section.icon}
                    </div>
                    <CardTitle className='text-xl font-semibold'>
                      {section.title}
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
        </div>
      </section>

      <section className='px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>{t('support.title')}</h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
              {t('support.description')}
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-3'>
            <Card className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
              <CardHeader className='text-center'>
                <div className='bg-primary/10 group-hover:bg-primary/20 mx-auto w-fit rounded-full p-4 transition-colors duration-300'>
                  <MessageSquare className='text-primary h-8 w-8' />
                </div>
                <CardTitle className='text-xl'>
                  {t('support.cards.team.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <p className='text-muted-foreground mb-4'>
                  {t('support.cards.team.description')}
                </p>
                <Button className='w-full'>
                  {t('support.cards.team.button')}
                </Button>
              </CardContent>
            </Card>
            <Card className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
              <CardHeader className='text-center'>
                <div className='bg-primary/10 group-hover:bg-primary/20 mx-auto w-fit rounded-full p-4 transition-colors duration-300'>
                  <BookOpen className='text-primary h-8 w-8' />
                </div>
                <CardTitle className='text-xl'>
                  {t('support.cards.guidelines.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <p className='text-muted-foreground mb-4'>
                  {t('support.cards.guidelines.description')}
                </p>
                <Button variant='outline' className='w-full'>
                  {t('support.cards.guidelines.button')}
                </Button>
              </CardContent>
            </Card>
            <Card className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
              <CardHeader className='text-center'>
                <div className='bg-primary/10 group-hover:bg-primary/20 mx-auto w-fit rounded-full p-4 transition-colors duration-300'>
                  <Award className='text-primary h-8 w-8' />
                </div>
                <CardTitle className='text-xl'>
                  {t('support.cards.certs.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <p className='text-muted-foreground mb-4'>
                  {t('support.cards.certs.description')}
                </p>
                <Button variant='outline' className='w-full'>
                  {t('support.cards.certs.button')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className='from-primary/5 to-primary/10 bg-gradient-to-r px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-8 text-center'>
          <h2 className='mb-6 text-4xl font-bold'>{t('cta.title')}</h2>
          <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
            {t('cta.description')}
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link href='/courses'>
              <Button size='lg' className='group'>
                {t('cta.browseButton')}
                <ChevronRight
                  className={cn(
                    'h-4 w-4 transition-transform group-hover:translate-x-1',
                    isRTL ? 'mr-2' : 'ml-2',
                  )}
                />
              </Button>
            </Link>
            <Link href='/dashboard'>
              <Button
                size='lg'
                variant='outline'
                className='bg-background/80 hover:bg-background'
              >
                {t('cta.dashboardButton')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
