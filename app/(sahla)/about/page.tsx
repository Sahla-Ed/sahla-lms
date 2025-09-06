import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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

export const metadata: Metadata = {
  title: 'About Us | Sahla LMS',
  description:
    'Learn more about Sahla Learning Platform, our mission, vision, and the team behind our innovative LMS solution.',
};

const teamMembers = [
  {
    name: 'Mohamed Badran',
    role: 'Founder & CEO',
    image: '/team/badran.jpeg',
    bio: 'Visionary leader passionate about accessible education.',
    github: 'https://github.com/Mohamed-Badran',
    linkedin: 'https://www.linkedin.com/in/mohamed-ahmed-badran/',
  },
  {
    name: 'Mohammed Saleh',
    role: 'Full-Stack Developer',
    image: '/team/saled.jpg',
    bio: 'Full-Stack Developer with MERN specialization',
    github: 'https://github.com/mosaleh-dev',
    linkedin: 'https://www.linkedin.com/in/mosaleh-dev/',
  },
  {
    name: 'Eslam Rizk',
    role: 'Full-Stack Developer',
    image: '/team/rizkk.jpeg',
    bio: 'Full-Stack Developer with MERN specialization',
    github: 'https://github.com/Eslam-Rizk',
    linkedin: 'https://www.linkedin.com/in/eslam-rizk-6a029a145/',
  },
  {
    name: 'Amr Ibrahim',
    role: 'Full-Stack Developer',
    image: '/team/tolba.jpg',
    bio: 'Full-Stack Developer with MERN specialization',
    github: 'https://github.com/amr-ibrahim7',
    linkedin: 'https://www.linkedin.com/in/amribrahimwebdev/',
  },
  {
    name: 'Mohamed Elnagar',
    role: 'Full-Stack Developer',
    image: '/team/elnegar.jpeg',
    bio: 'Full-Stack Developer with MERN specialization',
    github: 'https://github.com/Mohamed-Elnagar7',
    linkedin: 'https://www.linkedin.com/in/mohamed-elnegar/',
  },
];

export default function AboutUsPage() {
  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
      <section className='relative px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='space-y-8 text-center'>
            <Badge
              variant='outline'
              className='text-primary border-primary/20 bg-primary/5'
            >
              About Us
            </Badge>
            <h1 className='from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl'>
              Our Story
            </h1>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed'>
              At Sahla, we believe in empowering knowledge. Our mission is to
              provide a seamless and powerful platform for educators and
              organizations to share their expertise with the world.
            </p>
          </div>
        </div>
      </section>

      <section className='px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-3'>
            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <Lightbulb className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>Our Vision</h3>
                <p className='text-muted-foreground text-sm'>
                  To be the leading platform for online education, fostering a
                  global community of learners and instructors.
                </p>
              </CardContent>
            </Card>

            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <Users className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>Our Team</h3>
                <p className='text-muted-foreground text-sm'>
                  A dedicated group of passionate individuals committed to
                  innovation and excellence in e-learning.
                </p>
              </CardContent>
            </Card>

            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <Globe className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>Our Reach</h3>
                <p className='text-muted-foreground text-sm'>
                  Connecting learners and educators across the globe with a
                  platform that knows no boundaries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className='bg-muted/30 px-4 py-20'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='mb-12 text-center text-4xl font-bold'>Our History</h2>
          <div className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
            <History className='text-primary mb-4 h-24 w-24 flex-shrink-0 md:mb-0' />
            <p className='text-muted-foreground flex-grow text-center text-lg leading-relaxed md:text-left'>
              Founded in 2023, Sahla began with a simple idea: to make online
              education accessible and powerful for everyone. We started as a
              small team with a big vision, and through dedication and
              innovation, we&apos;ve grown into a leading multi-tenant LMS
              provider. Over the years, we&apos;ve continuously evolved our
              platform, adding features like integrated payments, AI-powered
              tools, and robust analytics, all while maintaining our commitment
              to user-friendliness and scalability. Our journey is a testament
              to our belief in the transformative power of education.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className='px-4 py-20'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='mb-12 text-center text-4xl font-bold'>Our Values</h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <Card className='text-center'>
              <CardContent className='pt-6'>
                <Handshake className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>Integrity</h3>
                <p className='text-muted-foreground text-sm'>
                  We operate with honesty and transparency in all our dealings.
                </p>
              </CardContent>
            </Card>
            <Card className='text-center'>
              <CardContent className='pt-6'>
                <Lightbulb className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>Innovation</h3>
                <p className='text-muted-foreground text-sm'>
                  We constantly strive to bring new and better solutions to our
                  users.
                </p>
              </CardContent>
            </Card>
            <Card className='text-center'>
              <CardContent className='pt-6'>
                <Users className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>Community</h3>
                <p className='text-muted-foreground text-sm'>
                  We foster a supportive and collaborative environment for all.
                </p>
              </CardContent>
            </Card>
            <Card className='text-center'>
              <CardContent className='pt-6'>
                <Award className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>Excellence</h3>
                <p className='text-muted-foreground text-sm'>
                  We are committed to delivering high-quality products and
                  services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <OurTeamSection teamMembers={teamMembers} />
    </div>
  );
}
