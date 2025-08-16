import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Lightbulb,
  Users,
  Globe,
  History,
  Handshake,
  Award,
} from 'lucide-react';
import { Metadata } from 'next';
import { OurTeamSection } from '@/components/sections/OurTeamSection';
import { getLocale, getTranslations } from 'next-intl/server';


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'SahlaPlatform.AboutPage.Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AboutUsPage() {
  const t = await getTranslations('SahlaPlatform.AboutPage');


  const teamMembers = [
    {
      name: t('teamSection.members.badran.name'),
      role: t('teamSection.members.badran.role'),
      image: '/team/badran.jpeg',
      bio: t('teamSection.members.badran.bio'),
      github: 'https://github.com/B-a-d-r-a-n',
      linkedin: 'https://www.linkedin.com/in/mohamed-ahmed-badran/',
    },
    {
      name: t('teamSection.members.saleh.name'),
      role: t('teamSection.members.saleh.role'),
      image: '/team/saled.jpg',
      bio: t('teamSection.members.saleh.bio'),
      github: 'https://github.com/mosaleh-dev',
      linkedin: 'https://www.linkedin.com/in/mosaleh-dev/',
    },
    {
      name: t('teamSection.members.rizk.name'),
      role: t('teamSection.members.rizk.role'),
      image: '/team/rizkk.jpeg',
      bio: t('teamSection.members.rizk.bio'),
      github: 'https://github.com/Eslam-Rizk',
      linkedin: 'https://www.linkedin.com/in/eslam-rizk-6a029a145/',
    },
    {
      name: t('teamSection.members.ibrahim.name'),
      role: t('teamSection.members.ibrahim.role'),
      image: '/team/tolba.jpg',
      bio: t('teamSection.members.ibrahim.bio'),
      github: 'https://github.com/amr-ibrahim7',
      linkedin: 'https://www.linkedin.com/in/amribrahimwebdev/',
    },
    {
      name: t('teamSection.members.elnagar.name'),
      role: t('teamSection.members.elnagar.role'),
      image: '/team/elnegar.jpeg',
      bio: t('teamSection.members.elnagar.bio'),
      github: 'https://github.com/Mohamed-Elnagar7',
      linkedin: 'https://www.linkedin.com/in/mohamed-elnegar/',
    },
  ];

  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
      {/* Hero Section */}
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

      {/* Vision & Mission Section */}
      <section className='px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-3'>
            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <Lightbulb className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>{t('visionMission.vision.title')}</h3>
                <p className='text-muted-foreground text-sm'>
                  {t('visionMission.vision.description')}
                </p>
              </CardContent>
            </Card>

            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <Users className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>{t('visionMission.team.title')}</h3>
                <p className='text-muted-foreground text-sm'>
                  {t('visionMission.team.description')}
                </p>
              </CardContent>
            </Card>

            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <Globe className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>{t('visionMission.reach.title')}</h3>
                <p className='text-muted-foreground text-sm'>
                  {t('visionMission.reach.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className='bg-muted/30 px-4 py-20'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='mb-12 text-center text-4xl font-bold'>{t('history.title')}</h2>
          <div className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
            <History className='text-primary h-24 w-24 flex-shrink-0' />
            <p className='text-muted-foreground flex-grow text-center text-lg leading-relaxed md:text-start'>
              {t('history.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className='px-4 py-20'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='mb-12 text-center text-4xl font-bold'>{t('values.title')}</h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <Card className='text-center'>
              <CardContent className='pt-6'>
                <Handshake className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>{t('values.integrity.title')}</h3>
                <p className='text-muted-foreground text-sm'>
                  {t('values.integrity.description')}
                </p>
              </CardContent>
            </Card>
            <Card className='text-center'>
              <CardContent className='pt-6'>
                <Lightbulb className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>{t('values.innovation.title')}</h3>
                <p className='text-muted-foreground text-sm'>
                  {t('values.innovation.description')}
                </p>
              </CardContent>
            </Card>
            <Card className='text-center'>
              <CardContent className='pt-6'>
                <Users className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>{t('values.community.title')}</h3>
                <p className='text-muted-foreground text-sm'>
                  {t('values.community.description')}
                </p>
              </CardContent>
            </Card>
            <Card className='text-center'>
              <CardContent className='pt-6'>
                <Award className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>{t('values.excellence.title')}</h3>
                <p className='text-muted-foreground text-sm'>
                  {t('values.excellence.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <OurTeamSection 
        teamMembers={teamMembers} 
        title={t('teamSection.title')}
        description={t('teamSection.description')}
      />
    </div>
  );
}