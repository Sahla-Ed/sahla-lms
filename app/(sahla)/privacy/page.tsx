import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Database,
  Eye,
  Shield,
  Share2,
  Settings,
  Cookie,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'SahlaPlatform.PrivacyPage.Metadata',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('SahlaPlatform.PrivacyPage');

  const sections = [
    {
      icon: <Database className='text-primary h-6 w-6' />,
      title: t('sections.collect.title'),
      content: t('sections.collect.content'),
    },
    {
      icon: <Eye className='text-primary h-6 w-6' />,
      title: t('sections.use.title'),
      content: t('sections.use.content'),
    },
    {
      icon: <Share2 className='text-primary h-6 w-6' />,
      title: t('sections.sharing.title'),
      content: t('sections.sharing.content'),
    },
    {
      icon: <Shield className='text-primary h-6 w-6' />,
      title: t('sections.security.title'),
      content: t('sections.security.content'),
    },
    {
      icon: <Cookie className='text-primary h-6 w-6' />,
      title: t('sections.cookies.title'),
      content: t('sections.cookies.content'),
    },
    {
      icon: <Settings className='text-primary h-6 w-6' />,
      title: t('sections.rights.title'),
      content: t('sections.rights.content'),
    },
  ];

  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
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
            <p className='text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed'>
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
                <div className='flex items-center gap-4'>
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

      <section className='bg-muted/10 px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <Card className='from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-300 hover:shadow-xl'>
            <CardHeader className='pb-6 text-center'>
              <div className='bg-primary/10 mx-auto mb-4 w-fit rounded-full p-4'>
                <Mail className='text-primary h-8 w-8' />
              </div>
              <CardTitle className='text-2xl'>{t('contact.title')}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6 text-center'>
              <p className='text-muted-foreground text-lg leading-relaxed'>
                {t('contact.description')}
              </p>
              <div className='text-muted-foreground'>
                <p className='font-medium'>
                  {t('contact.emailLabel')} {t('contact.emailAddress')}
                </p>
                <p className='text-sm'>
                  {t('contact.responseTimeLabel')}{' '}
                  {t('contact.responseTimeValue')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='from-primary/5 to-primary/10 bg-gradient-to-r px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-8 text-center'>
          <h2 className='mb-6 text-4xl font-bold'>{t('cta.title')}</h2>
          <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
            {t('cta.description')}
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link href='/terms'>
              <Button
                size='lg'
                variant='outline'
                className='bg-background/80 hover:bg-background'
              >
                {t('cta.termsButton')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
