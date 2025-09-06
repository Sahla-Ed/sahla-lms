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
    <div className="font-[var(--font-inter)] text-slate-800 dark:text-slate-100 overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex flex-col justify-center items-center overflow-hidden"
        style={{ backgroundColor: '#0a0a29' }}
      >
        <div className="absolute inset-0 z-0 h-full w-full">
          <DarkVeil
            hueShift={45}
            noiseIntensity={0.03}
            scanlineIntensity={0.08}
            speed={0.3}
            warpAmount={5}
          />
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center text-white py-10 animate-fade-in-up">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full px-6 py-2 mb-8 text-sm font-medium">
            About Us
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200">
            Our Story
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            At Sahla, we believe in empowering knowledge. Our mission is to
            provide a seamless and powerful platform for educators and
            organizations to share their expertise with the world.
          </p>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div
            className="text-white/60 cursor-pointer animate-bounce animate-infinite animate-duration-[2000ms]"
            onClick={() => {
              historyRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  To be the leading platform for online education, fostering a
                  global community of learners and instructors.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Our Team</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  A dedicated group of passionate individuals committed to
                  innovation and excellence in e-learning.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Our Reach</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Connecting learners and educators across the globe with a
                  platform that knows no boundaries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section ref={historyRef} className="py-16 sm:py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <Badge
              className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 mb-4"
            >
              Our Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our History</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-8 rounded-xl shadow-lg">
            <div className="w-24 h-24 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <History className="h-12 w-12" />
            </div>
            <p className="flex-grow text-center text-lg leading-relaxed md:text-left text-slate-700 dark:text-slate-300">
              Founded in 2023, Sahla began with a simple idea: to make online
              education accessible and powerful for everyone. We started as a
              small team with a big vision, and through dedication and
              innovation, we've grown into a leading multi-tenant LMS
              provider. Over the years, we've continuously evolved our
              platform, adding features like integrated payments, AI-powered
              tools, and robust analytics, all while maintaining our commitment
              to user-friendliness and scalability. Our journey is a testament
              to our belief in the transformative power of education.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <Badge
              className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 mb-4"
            >
              What We Stand For
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all transform hover:translate-y-[-4px]">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Handshake className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Integrity</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  We operate with honesty and transparency in all our dealings.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all transform hover:translate-y-[-4px]">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  We constantly strive to bring new and better solutions to our
                  users.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all transform hover:translate-y-[-4px]">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Community</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  We foster a supportive and collaborative environment for all.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all transform hover:translate-y-[-4px]">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Excellence</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  We are committed to delivering high-quality products and
                  services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <Badge
              className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 mb-4"
            >
              Meet Our Experts
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The talented individuals behind Sahla's success, dedicated to creating
              the best learning platform for educators worldwide.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-6"></div>
          </div>

          <OurTeamSection teamMembers={teamMembers} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6">
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold">Join Our Mission</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">
            Be part of our journey to revolutionize online education and empower educators worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
            >
              Contact Us
            </a>
            <a
              href="/start"
              className="px-8 py-3 bg-blue-500/20 hover:bg-blue-500/30 border-2 border-white/40 text-white font-bold rounded-lg transition-all transform hover:scale-105"
            >
              Start Your Free Trial
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
