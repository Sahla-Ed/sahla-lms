import { Badge } from '@/components/ui/badge';
import { Lightbulb, Users, Globe, History } from 'lucide-react';
import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { ScrollAnimate } from '@/components/general/ScrollAnimate';
import { cn } from '@/lib/utils';
import { InteractiveTeamSection } from '@/components/InteractiveTeamSection';

const Scribble = ({
  className,
  shape = 'swoosh',
  color = 'primary',
}: {
  className?: string;
  shape?: 'swoosh' | 'circle' | 'underline';
  color?: 'primary' | 'blue' | 'orange' | 'red' | 'green';
}) => {
  const paths = {
    swoosh: 'M10 10 C 20 80, 80 20, 90 90',
    circle: 'M 50, 50 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0',
    underline: 'M5 85 Q 50 75, 95 85',
  };
  const colors = {
    primary: 'text-primary/40',
    blue: 'text-sky-500/70',
    orange: 'text-orange-500/80',
    red: 'text-red-500/70',
    green: 'text-green-500/70',
  };
  return (
    <svg
      className={cn(
        'pointer-events-none absolute h-24 w-24',
        colors[color],
        className,
      )}
      viewBox='0 0 100 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d={paths[shape]}
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: 'SahlaPlatform.AboutPage.Metadata',
  });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AboutUsPage() {
  const t = await getTranslations('SahlaPlatform.AboutPage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

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

  const missionItems = [
    {
      icon: Users,
      title: t('mission.items.empower.title'),
      description: t('mission.items.empower.description'),
    },
    {
      icon: Lightbulb,
      title: t('mission.items.simplify.title'),
      description: t('mission.items.simplify.description'),
    },
    {
      icon: Globe,
      title: t('mission.items.grow.title'),
      description: t('mission.items.grow.description'),
    },
  ];

  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
      {/* Hero Section */}
      <section className='relative px-4 py-20 lg:py-32'>
        <div className='container mx-auto max-w-4xl'>
          <ScrollAnimate>
            <div className='space-y-8 text-center'>
              <Badge
                variant='outline'
                className='text-primary border-primary/20 bg-primary/5'
              >
                {t('hero.badge')}
              </Badge>
              <h1 className='from-primary to-primary/60 relative bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl'>
                {t('hero.title')}
                <Scribble
                  shape='circle'
                  className='-top-12 -left-12 h-32 w-32'
                  color='blue'
                />
              </h1>
              <p className='text-muted-foreground relative mx-auto max-w-3xl text-xl leading-relaxed'>
                {t('hero.description')}
                <Scribble
                  shape='swoosh'
                  className='-right-8 -bottom-12 h-24 w-24'
                  color='orange'
                />
              </p>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Our Story Section */}
      <section className='bg-muted/30 px-4 py-20 lg:py-32'>
        <div className='container mx-auto max-w-4xl'>
          <ScrollAnimate>
            <div
              className={cn(
                'flex flex-col items-center gap-12',
                isRTL ? 'md:flex-row-reverse' : 'md:flex-row',
              )}
            >
              <History className='text-primary h-32 w-32 flex-shrink-0 lg:h-48 lg:w-48' />
              <div
                className={cn('flex-grow', isRTL ? 'text-right' : 'text-left')}
              >
                <h2 className='mb-6 text-4xl font-bold lg:text-5xl'>
                  {t('story.title')}
                </h2>
                <p className='text-muted-foreground text-lg leading-relaxed lg:text-xl'>
                  {t('story.content')}
                </p>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Mission Section */}
      <section className='px-4 py-20 lg:py-32'>
        <div className='container mx-auto max-w-5xl'>
          <ScrollAnimate>
            <h2 className='mb-16 text-center text-4xl font-bold lg:text-5xl'>
              {t('mission.title')}
            </h2>
          </ScrollAnimate>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {missionItems.map((item, index) => (
              <ScrollAnimate key={index} delay={(index * 200).toString()}>
                <div className='p-6 text-center'>
                  <div className='bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl'>
                    <item.icon className='text-primary h-10 w-10' />
                  </div>
                  <h3 className='mb-3 text-2xl font-bold'>{item.title}</h3>
                  <p className='text-muted-foreground text-lg leading-relaxed'>
                    {item.description}
                  </p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <InteractiveTeamSection
        teamMembers={teamMembers}
        title={t('teamSection.title')}
        description={t('teamSection.description')}
      />
    </div>
  );
}
