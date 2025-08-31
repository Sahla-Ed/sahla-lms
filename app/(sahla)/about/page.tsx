'use client';

import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Lightbulb,
  Users,
  Globe,
  History,
  Handshake,
  Award,
  ChevronDown,
} from 'lucide-react';
import { OurTeamSection } from '@/components/sections/OurTeamSection';
import { DarkVeil } from '@/components/ui/dark-veil';

const teamMembers = [
  {
    name: 'Mohammed Saleh',
    role: 'Full-Stack Developer',
    image: '/team/saled.jpg',
    bio: 'Full-Stack Developer with MERN specialization',
    github: 'https://github.com/mosaleh-dev',
    linkedin: 'https://www.linkedin.com/in/mosaleh-dev/',
  },
  {
    name: 'Mohamed Badran',
    role: 'Full-Stack Developer',
    image: '/team/badran.jpeg',
    bio: 'Visionary leader passionate about accessible education.',
    github: 'https://github.com/Mohamed-Badran',
    linkedin: 'https://www.linkedin.com/in/mohamed-ahmed-badran/',
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
  const historyRef = useRef<HTMLElement>(null);

  return (
    <div className='overflow-hidden font-[var(--font-inter)] text-slate-800 dark:text-slate-100'>
      {/* Hero Section */}
      <section
        className='relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden'
        style={{ backgroundColor: '#0a0a29' }}
      >
        <div className='absolute inset-0 z-0 h-full w-full'>
          <DarkVeil
            hueShift={45}
            noiseIntensity={0.03}
            scanlineIntensity={0.08}
            speed={0.3}
            warpAmount={5}
          />
        </div>

        <div className='animate-fade-in-up relative z-10 max-w-4xl px-6 py-10 text-center text-white'>
          <div className='mb-8 inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-medium'>
            About Us
          </div>

          <h1 className='mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-3xl leading-tight font-extrabold text-transparent sm:text-4xl md:text-5xl lg:text-6xl'>
            Our Story
          </h1>

          <p className='mx-auto mb-10 max-w-3xl text-lg text-blue-100 sm:text-xl'>
            At Sahla, we believe in empowering knowledge. Our mission is to
            provide a seamless and powerful platform for educators and
            organizations to share their expertise with the world.
          </p>
        </div>

        <div className='absolute right-0 bottom-8 left-0 flex justify-center'>
          <div
            className='animate-infinite animate-duration-[2000ms] animate-bounce cursor-pointer text-white/60'
            onClick={() => {
              historyRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='bg-gradient-to-br from-white to-blue-50 py-16 sm:py-20 dark:from-slate-950 dark:to-slate-900'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3'>
            <Card className='transform border border-slate-200 bg-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
              <CardContent className='pt-6 text-center'>
                <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                  <Lightbulb className='h-6 w-6' />
                </div>
                <h3 className='mb-2 text-lg font-semibold'>Our Vision</h3>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  To be the leading platform for online education, fostering a
                  global community of learners and instructors.
                </p>
              </CardContent>
            </Card>

            <Card className='transform border border-slate-200 bg-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
              <CardContent className='pt-6 text-center'>
                <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                  <Users className='h-6 w-6' />
                </div>
                <h3 className='mb-2 text-lg font-semibold'>Our Team</h3>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  A dedicated group of passionate individuals committed to
                  innovation and excellence in e-learning.
                </p>
              </CardContent>
            </Card>

            <Card className='transform border border-slate-200 bg-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
              <CardContent className='pt-6 text-center'>
                <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                  <Globe className='h-6 w-6' />
                </div>
                <h3 className='mb-2 text-lg font-semibold'>Our Reach</h3>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  Connecting learners and educators across the globe with a
                  platform that knows no boundaries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section
        ref={historyRef}
        className='bg-white py-16 sm:py-20 dark:bg-slate-950'
      >
        <div className='container mx-auto max-w-5xl px-4 sm:px-6'>
          <div className='mb-12 text-center'>
            <Badge className='mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'>
              Our Journey
            </Badge>
            <h2 className='mb-4 text-3xl font-bold sm:text-4xl'>Our History</h2>
            <div className='mx-auto h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600'></div>
          </div>

          <div className='flex flex-col items-center gap-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-lg md:flex-row md:items-start dark:from-slate-900 dark:to-slate-800'>
            <div className='flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
              <History className='h-12 w-12' />
            </div>
            <p className='flex-grow text-center text-lg leading-relaxed text-slate-700 md:text-left dark:text-slate-300'>
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
      <section className='bg-gradient-to-br from-white to-blue-50 py-16 sm:py-20 dark:from-slate-950 dark:to-slate-900'>
        <div className='container mx-auto max-w-5xl px-4 sm:px-6'>
          <div className='mb-12 text-center'>
            <Badge className='mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'>
              What We Stand For
            </Badge>
            <h2 className='mb-4 text-3xl font-bold sm:text-4xl'>Our Values</h2>
            <div className='mx-auto h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600'></div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            <Card className='transform border border-slate-200 bg-white shadow-md transition-all hover:translate-y-[-4px] hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
              <CardContent className='pt-6 text-center'>
                <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                  <Handshake className='h-6 w-6' />
                </div>
                <h3 className='mb-2 text-lg font-semibold'>Integrity</h3>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  We operate with honesty and transparency in all our dealings.
                </p>
              </CardContent>
            </Card>

            <Card className='transform border border-slate-200 bg-white shadow-md transition-all hover:translate-y-[-4px] hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
              <CardContent className='pt-6 text-center'>
                <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                  <Lightbulb className='h-6 w-6' />
                </div>
                <h3 className='mb-2 text-lg font-semibold'>Innovation</h3>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  We constantly strive to bring new and better solutions to our
                  users.
                </p>
              </CardContent>
            </Card>

            <Card className='transform border border-slate-200 bg-white shadow-md transition-all hover:translate-y-[-4px] hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
              <CardContent className='pt-6 text-center'>
                <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                  <Users className='h-6 w-6' />
                </div>
                <h3 className='mb-2 text-lg font-semibold'>Community</h3>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  We foster a supportive and collaborative environment for all.
                </p>
              </CardContent>
            </Card>

            <Card className='transform border border-slate-200 bg-white shadow-md transition-all hover:translate-y-[-4px] hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
              <CardContent className='pt-6 text-center'>
                <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                  <Award className='h-6 w-6' />
                </div>
                <h3 className='mb-2 text-lg font-semibold'>Excellence</h3>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  We are committed to delivering high-quality products and
                  services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='bg-white py-16 sm:py-20 dark:bg-slate-950'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6'>
          <div className='mb-12 text-center'>
            <Badge className='mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'>
              Meet Our Experts
            </Badge>
            <h2 className='mb-4 text-3xl font-bold sm:text-4xl'>Our Team</h2>
            <p className='mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400'>
              The talented individuals behind Sahla&apos;s success, dedicated to
              creating the best learning platform for educators worldwide.
            </p>
            <div className='mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600'></div>
          </div>

          <OurTeamSection teamMembers={teamMembers} />
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-center text-white'>
        <div className='container mx-auto px-6'>
          <h2 className='mb-4 text-2xl font-bold sm:text-3xl'>
            Join Our Mission
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg'>
            Be part of our journey to revolutionize online education and empower
            educators worldwide.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <a
              href='/contact'
              className='transform rounded-lg bg-white px-8 py-3 font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-blue-50'
            >
              Contact Us
            </a>
            <a
              href='/start'
              className='transform rounded-lg border-2 border-white/40 bg-blue-500/20 px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-blue-500/30'
            >
              Start Your Free Trial
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
