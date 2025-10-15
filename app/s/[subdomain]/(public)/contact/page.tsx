import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { ContactForm } from './_components/ContactForm';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { getAllTenantSlugs } from '@/lib/get-tenant-settings-static';

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
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'ContactPage',
  });

  return {
    title: t('hero.badge'),
    description: t('hero.description'),
  };
}

export default async function ContactUsPage({ params }: { params: Params }) {
  const t = await getTranslations('ContactPage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

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
        <ContactForm />
      </section>

      <section className='bg-muted/10 px-4 py-16'>
        <div className='mx-auto max-w-4xl'>
          <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-3'>
            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <Mail className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>
                  {t('contactMethods.email.title')}
                </h3>
                <p className='text-muted-foreground text-sm'>
                  {t('contactMethods.email.description')}
                </p>
                <p className='text-primary text-sm font-medium'>
                  {t('contactMethods.email.address')}
                </p>
              </CardContent>
            </Card>
            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <Phone className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>
                  {t('contactMethods.phone.title')}
                </h3>
                <p className='text-muted-foreground text-sm'>
                  {t('contactMethods.phone.description')}
                </p>
                <p className='text-primary text-sm font-medium'>
                  {t('contactMethods.phone.number')}
                </p>
              </CardContent>
            </Card>
            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <MessageCircle className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>
                  {t('contactMethods.chat.title')}
                </h3>
                <p className='text-muted-foreground text-sm'>
                  {t('contactMethods.chat.description')}
                </p>
                <p className='text-primary text-sm font-medium'>
                  {t('contactMethods.chat.availability')}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2'>
            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6 text-center'>
                <MapPin className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>
                  {t('location.office.title')}
                </h3>
                <p className='text-muted-foreground text-sm'>
                  {t('location.office.addressLine1')}
                  <br />
                  {t('location.office.addressLine2')}
                </p>
              </CardContent>
            </Card>
            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6 text-center'>
                <Clock className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>
                  {t('location.hours.title')}
                </h3>
                <p className='text-muted-foreground text-sm'>
                  {t('location.hours.weekdays')}
                  <br />
                  {t('location.hours.weekend')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
