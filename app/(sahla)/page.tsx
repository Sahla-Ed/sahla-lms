import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Rocket,
  Users,
  DollarSign,
  Award,
  Lightbulb,
  MessageSquare,
  Workflow,
  Zap,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import DarkVeil from '@/components/Bits/DarkVeil';
import { Badge } from '@/components/ui/badge';
import Lms1 from '@/public/logosss/udemy.png';
import Lms2 from '@/public/logosss/mesq.png';
import Lms3 from '@/public/logosss/tech.png';
import { getLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'SahlaPlatform.HomePage.Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Home() {
  const t = await getTranslations('SahlaPlatform.HomePage');
  const tCommon = await getTranslations('SahlaPlatform.common');

  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
      {/* Hero Section */}
      <section className='relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center sm:min-h-[80vh] md:min-h-[90vh] md:py-20'>
        <div className='absolute inset-0 z-0 h-full w-full'>
          <DarkVeil
            hueShift={10}
            noiseIntensity={0.01}
            scanlineIntensity={0.05}
            speed={0.6}
            warpAmount={5}
          />
        </div>
        <div className='relative z-10 max-w-4xl px-4 text-white sm:max-w-5xl'>
          <Badge
            variant='secondary'
            className='animate-in mb-4 bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm sm:px-4 sm:py-2 sm:text-lg'
          >
            {t('hero.badge')}
          </Badge>
          <h1 className='animate-in animation-duration-initial mb-4 text-3xl font-extrabold leading-tight drop-shadow-lg sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
            {t('hero.title')}
          </h1>
          <p className='animate-in mx-auto mb-6 max-w-3xl text-base leading-relaxed sm:mb-8 sm:text-lg md:mb-10 md:max-w-4xl md:text-xl lg:text-2xl'>
            {t('hero.description')}
          </p>
          <div className='animate-in animation-delay-400 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4'>
            <Button
              size='lg'
              className='bg-primary hover:bg-primary/90 shadow-lg transition-transform hover:scale-105'
            >
              <Link href='/start'>{tCommon('startFreeTrialToday')}</Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-white text-primary shadow-lg transition-transform hover:scale-105 hover:bg-white'
            >
              <Link href='/pricing'>{tCommon('explorePlans')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className='bg-background px-4 py-8 sm:py-12'>
        <div className='container mx-auto text-center'>
          <h3 className='text-muted-foreground mb-6 text-lg font-semibold sm:mb-8 sm:text-xl'>
            {t('trustedBy.title')}
          </h3>
          <div className='flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-16'>
            <Image
              src={Lms1}
              alt={t('trustedBy.logo1Alt')}
              width={120}
              height={40}
              className='h-8 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10'
            />
            <Image
              src={Lms2}
              alt={t('trustedBy.logo2Alt')}
              width={120}
              height={40}
              className='h-8 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10'
            />
            <Image
              src={Lms3}
              alt={t('trustedBy.logo3Alt')}
              width={120}
              height={40}
              className='h-8 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10'
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='px-4 py-12 sm:py-16 md:py-20'>
        <div className='container mx-auto'>
          <h2 className='mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl'>
            {t('keyFeatures.title')}
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Rocket className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  {t('keyFeatures.multiTenancy.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                {t('keyFeatures.multiTenancy.description')}
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Users className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  {t('keyFeatures.courseManagement.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                {t('keyFeatures.courseManagement.description')}
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <DollarSign className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  {t('keyFeatures.payments.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                {t('keyFeatures.payments.description')}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='bg-muted/30 px-4 py-12 sm:py-16 md:py-20'>
        <div className='container mx-auto'>
          <h2 className='mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl'>
            {t('howItWorks.title')}
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Workflow className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  {t('howItWorks.step1.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                {t('howItWorks.step1.description')}
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Zap className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  {t('howItWorks.step2.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                {t('howItWorks.step2.description')}
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <TrendingUp className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  {t('howItWorks.step3.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                {t('howItWorks.step3.description')}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='px-4 py-12 sm:py-16 md:py-20'>
        <div className='container mx-auto'>
          <h2 className='mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl'>
            {t('whyChooseUs.title')}
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Award className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  {t('whyChooseUs.support.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                {t('whyChooseUs.support.description')}
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Lightbulb className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  {t('whyChooseUs.features.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                {t('whyChooseUs.features.description')}
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <MessageSquare className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  {t('whyChooseUs.community.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                {t('whyChooseUs.community.description')}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='bg-muted/30 px-4 py-12 sm:py-16 md:py-20'>
        <div className='container mx-auto'>
          <h2 className='mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl'>
            {t('testimonials.title')}
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2'>
            <Card className='group relative overflow-hidden border-0 bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardContent className='pt-6'>
                <p className='text-muted-foreground mb-4 text-base italic sm:text-lg'>
                  {t('testimonials.testimonial1.quote')}
                </p>
                <p className='text-sm font-semibold sm:text-base'>
                  {t('testimonials.testimonial1.author')}
                </p>
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardContent className='pt-6'>
                <p className='text-muted-foreground mb-4 text-base italic sm:text-lg'>
                  {t('testimonials.testimonial2.quote')}
                </p>
                <p className='text-sm font-semibold sm:text-base'>
                  {t('testimonials.testimonial2.author')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='bg-primary text-primary-foreground px-4 py-12 text-center sm:py-16 md:py-20'>
        <div className='container mx-auto'>
          <h2 className='mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl'>
            {t('cta.title')}
          </h2>
          <p className='mb-6 text-lg sm:mb-8 sm:text-xl'>
            {t('cta.description')}
          </p>
          <Button size='lg' variant='secondary' asChild>
            <Link href='/start'>{t('cta.button')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}