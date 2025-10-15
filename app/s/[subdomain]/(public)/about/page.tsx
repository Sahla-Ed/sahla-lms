import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChevronRight,
  Users,
  Target,
  Zap,
  Globe,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import {
  getTenantSettingsBySlug,
  getAllTenantSlugs,
} from '@/lib/get-tenant-settings-static';
import { cn } from '@/lib/utils';

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
    namespace: 'AboutPage.Metadata',
  });
  const tenant = await getTenantSettingsBySlug(subdomain);

  return {
    title: t('title'),
    description: t('description', { tenantName: tenant.name }),
  };
}

export default async function AboutPage({ params }: { params: Params }) {
  const { subdomain } = await params;
  const t = await getTranslations('AboutPage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  const values = [
    {
      icon: <Target className='text-primary h-8 w-8' />,
      title: t('values.mission.title'),
      content: t('values.mission.content'),
    },
    {
      icon: <Zap className='text-primary h-8 w-8' />,
      title: t('values.innovation.title'),
      content: t('values.innovation.content'),
    },
    {
      icon: <Users className='text-primary h-8 w-8' />,
      title: t('values.community.title'),
      content: t('values.community.content'),
    },
    {
      icon: <Globe className='text-primary h-8 w-8' />,
      title: t('values.impact.title'),
      content: t('values.impact.content'),
    },
  ];

  const features = [
    {
      icon: <BookOpen className='text-primary h-12 w-12' />,
      title: t('features.library.title'),
      description: t('features.library.description'),
    },
    {
      icon: <GraduationCap className='text-primary h-12 w-12' />,
      title: t('features.instructors.title'),
      description: t('features.instructors.description'),
    },
    {
      icon: <MessageSquare className='text-primary h-12 w-12' />,
      title: t('features.interactive.title'),
      description: t('features.interactive.description'),
    },
    {
      icon: <Award className='text-primary h-12 w-12' />,
      title: t('features.certification.title'),
      description: t('features.certification.description'),
    },
  ];

  const benefits = {
    students: t.raw('benefits.students.items') as string[],
    instructors: t.raw('benefits.instructors.items') as string[],
  };

  return (
    <div
      className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <section className='relative px-4 py-20'>
        <div className='mx-auto max-w-7xl'>
          <div className='space-y-8 text-center'>
            <Badge
              variant='outline'
              className='text-primary border-primary/20 bg-primary/5'
            >
              {t('hero.badge')}
            </Badge>
            <h1 className='from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl'>
              {t('hero.title')}
            </h1>
            <p className='text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed'>
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className='px-4 py-20'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>{t('features.title')}</h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
              {t('features.description')}
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'
              >
                <CardHeader>
                  <div className='bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 w-fit rounded-full p-4 transition-colors duration-300'>
                    {feature.icon}
                  </div>
                  <CardTitle className='text-center text-2xl'>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground text-center leading-relaxed'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className='bg-muted/10 px-4 py-20'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>{t('benefits.title')}</h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
              {t('benefits.description')}
            </p>
          </div>
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-all duration-300 hover:shadow-xl'>
              <CardHeader>
                <CardTitle className='text-primary text-center text-2xl'>
                  {t('benefits.students.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {benefits.students.map((benefit, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-start',
                        isRTL ? 'flex-row-reverse space-x-3' : 'space-x-3',
                      )}
                    >
                      <div className='bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
                      <p className='text-muted-foreground leading-relaxed'>
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className='from-card to-secondary/5 border-0 bg-gradient-to-br transition-all duration-300 hover:shadow-xl'>
              <CardHeader>
                <CardTitle className='text-primary text-center text-2xl'>
                  {t('benefits.instructors.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {benefits.instructors.map((benefit, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-start',
                        isRTL ? 'flex-row-reverse space-x-3' : 'space-x-3',
                      )}
                    >
                      <div className='bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
                      <p className='text-muted-foreground leading-relaxed'>
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='px-4 py-20'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>{t('values.title')}</h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
              {t('values.description')}
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {values.map((value, index) => (
              <Card
                key={index}
                className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'
              >
                <CardHeader className='text-center'>
                  <div className='bg-primary/10 group-hover:bg-primary/20 mx-auto w-fit rounded-full p-3 transition-colors duration-300'>
                    {value.icon}
                  </div>
                  <CardTitle className='text-xl'>{value.title}</CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                  <p className='text-muted-foreground leading-relaxed'>
                    {value.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='from-primary/5 to-primary/10 bg-gradient-to-r px-4 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='mb-6 text-4xl font-bold'>{t('cta.title')}</h2>
          <p className='text-muted-foreground mx-auto mb-8 max-w-2xl text-xl'>
            {t('cta.description')}
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link href='/courses'>
              <Button size='lg' className='group'>
                {t('cta.exploreButton')}
                <ChevronRight
                  className={cn(
                    'h-4 w-4 transition-transform group-hover:translate-x-1',
                    isRTL ? 'mr-2' : 'ml-2',
                  )}
                />
              </Button>
            </Link>
            <Link href='/contact'>
              <Button
                size='lg'
                variant='outline'
                className='bg-background/80 hover:bg-background'
              >
                {t('cta.contactButton')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
