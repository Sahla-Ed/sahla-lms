'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { Metadata } from 'next';
import DarkVeil from '@/components/Bits/DarkVeil';
import Lms1 from '@/public/logosss/udemy.png';
import Lms2 from '@/public/logosss/mesq.png';
import Lms3 from '@/public/logosss/tech.png';
import { cn } from '@/lib/utils';

// export const metadata: Metadata = {
//   title: 'Sahla LMS | The Ultimate Platform for Educators and Course Creators',
//   description: 'Empower your teaching with Sahla LMS - create, manage, and scale your online courses with ease.',
// };

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='overflow-hidden font-[var(--font-inter)] text-slate-800 dark:text-slate-100'>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden'
        style={{ backgroundColor: '#0a0a29' }}
      >
        <div className='absolute inset-0 z-0 h-full w-full'>
          <DarkVeil
            hueShift={25}
            noiseIntensity={0.03}
            scanlineIntensity={0.08}
            speed={0.4}
            warpAmount={6}
          />
        </div>

        <div className='relative z-10 max-w-6xl px-6 py-10 text-center text-white'>
          <div className='animate-fade-in-up animate-delay-200 mb-8 inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-medium'>
            Built for Educators by Educators
          </div>

          <h1 className='animate-fade-in-up animate-delay-400 mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-3xl leading-tight font-extrabold text-transparent sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
            Your Knowledge.
            <br />
            <span className='text-blue-500'>Your Classroom.</span>
            <br />
            Your Success.
          </h1>

          <p className='animate-fade-in-up animate-delay-600 mx-auto mb-8 max-w-3xl text-lg text-blue-100 sm:mb-12 sm:text-xl md:text-2xl'>
            The complete learning platform designed specifically for educators
            and instructors who want to share their expertise with the world.
          </p>

          <div className='animate-fade-in-up animate-delay-800 flex flex-col justify-center gap-6 sm:flex-row'>
            <a
              href='/start'
              className='w-full transform rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:from-blue-600 hover:to-indigo-700 sm:w-auto sm:px-8 sm:py-4 sm:text-lg'
            >
              Start Your Free 14-Day Trial
            </a>
            <a
              href='/contact'
              className='w-full transform rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 text-base font-bold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20 sm:w-auto sm:px-8 sm:py-4 sm:text-lg'
            >
              Schedule a Demo
            </a>
          </div>

          <div className='animate-fade-in-up animate-delay-1000 mt-10 text-sm text-blue-200/70'>
            No credit card required • Full access for 14 days • Cancel anytime
          </div>
        </div>

        <div className='absolute right-0 bottom-8 left-0 flex justify-center'>
          <div
            className='animate-infinite animate-duration-[2000ms] animate-bounce cursor-pointer text-white/60'
            onClick={() => {
              document
                .getElementById('features')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M7 13l5 5 5-5M7 6l5 5 5-5' />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='border-y border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 py-8 sm:py-10 dark:border-slate-800 dark:from-slate-900 dark:to-indigo-950'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8'>
            <div className='text-center'>
              <div className='mb-1 text-2xl font-bold text-blue-600 sm:text-3xl md:text-4xl dark:text-blue-400'>
                5,000+
              </div>
              <div className='text-xs text-slate-600 sm:text-sm md:text-base dark:text-slate-400'>
                Active Instructors
              </div>
            </div>
            <div className='text-center'>
              <div className='mb-1 text-2xl font-bold text-blue-600 sm:text-3xl md:text-4xl dark:text-blue-400'>
                100,000+
              </div>
              <div className='text-xs text-slate-600 sm:text-sm md:text-base dark:text-slate-400'>
                Students Taught
              </div>
            </div>
            <div className='text-center'>
              <div className='mb-1 text-2xl font-bold text-blue-600 sm:text-3xl md:text-4xl dark:text-blue-400'>
                15,000+
              </div>
              <div className='text-xs text-slate-600 sm:text-sm md:text-base dark:text-slate-400'>
                Active Courses
              </div>
            </div>
            <div className='text-center'>
              <div className='mb-1 text-2xl font-bold text-blue-600 sm:text-3xl md:text-4xl dark:text-blue-400'>
                99.9%
              </div>
              <div className='text-xs text-slate-600 sm:text-sm md:text-base dark:text-slate-400'>
                Uptime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className='bg-white py-16 dark:bg-slate-950'>
        <div className='container mx-auto px-6 text-center'>
          <p className='mb-10 text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400'>
            Trusted by leading educators worldwide
          </p>
          <div className='items -center flex flex-wrap justify-center gap-12 md:gap-16 lg:gap-20'>
            <Image
              src={Lms1}
              alt='Client Logo 1'
              width={140}
              height={45}
              className='h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0'
            />
            <Image
              src={Lms2}
              alt='Client Logo 2'
              width={140}
              height={45}
              className='h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0'
            />
            <Image
              src={Lms3}
              alt='Client Logo 3'
              width={140}
              height={45}
              className='h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0'
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id='features'
        className='bg-gradient-to-br from-white to-blue-50 py-16 sm:py-20 md:py-24 dark:from-slate-950 dark:to-slate-900'
      >
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='mx-auto mb-10 max-w-3xl text-center sm:mb-16'>
            <div className='mb-4 font-medium text-blue-600 dark:text-blue-400'>
              Designed for Educators
            </div>
            <h2 className='mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl'>
              All the Tools You Need to{' '}
              <span className='text-blue-600 dark:text-blue-400'>
                Teach Effectively
              </span>
            </h2>
            <p className='text-lg text-slate-600 dark:text-slate-400'>
              Our platform is designed with educators in mind, providing a
              comprehensive set of tools to create, manage, and scale your
              online courses.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  'group rounded-xl bg-white p-5 shadow-lg shadow-blue-100 transition-all hover:shadow-xl hover:shadow-blue-200/80 sm:p-8 dark:bg-slate-800 dark:shadow-slate-900/80 dark:hover:shadow-blue-900/30',
                  'animate-fade-in-up animate-delay-[calc(200ms*var(--index))]',
                )}
                style={{ '--index': index } as React.CSSProperties}
              >
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white sm:mb-6 sm:h-14 sm:w-14 dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-500'>
                  {feature.icon &&
                    React.createElement(feature.icon, { size: 24 })}
                </div>
                <h3 className='mb-2 text-lg font-bold sm:mb-3 sm:text-xl'>
                  {feature.title}
                </h3>
                <p className='text-slate-600 dark:text-slate-400'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='bg-slate-50 py-16 sm:py-20 md:py-24 dark:bg-slate-900'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='mx-auto mb-10 max-w-3xl text-center sm:mb-16'>
            <div className='mb-4 font-medium text-blue-600 dark:text-blue-400'>
              Simple Process
            </div>
            <h2 className='mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl'>
              Launch Your Academy in{' '}
              <span className='text-blue-600 dark:text-blue-400'>
                Three Easy Steps
              </span>
            </h2>
            <p className='text-lg text-slate-600 dark:text-slate-400'>
              We&apos;ve streamlined the process of setting up your online
              teaching platform so you can focus on what matters most - your
              content and your students.
            </p>
          </div>

          <div className='relative mx-auto max-w-4xl'>
            <div className='absolute top-1/2 right-8 left-8 hidden h-1 -translate-y-1/2 transform bg-gradient-to-r from-blue-400 to-indigo-500 md:block'></div>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    'relative z-10 rounded-xl bg-white p-5 shadow-lg shadow-blue-100 sm:p-8 dark:bg-slate-800 dark:shadow-slate-900/80',
                    'animate-fade-in-up animate-delay-[calc(300ms+200ms*var(--index))]',
                  )}
                  style={{ '--index': index } as React.CSSProperties}
                >
                  <div className='mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-base font-bold text-white sm:mb-6 sm:h-12 sm:w-12 sm:text-lg'>
                    {index + 1}
                  </div>
                  <h3 className='mb-2 text-center text-lg font-bold sm:mb-3 sm:text-xl'>
                    {step.title}
                  </h3>
                  <p className='text-center text-slate-600 dark:text-slate-400'>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='bg-gradient-to-br from-blue-600 to-indigo-700 py-16 text-white sm:py-20 md:py-24'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='mx-auto mb-10 max-w-3xl text-center sm:mb-16'>
            <div className='mb-4 font-medium text-blue-200'>
              Success Stories
            </div>
            <h2 className='mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl'>
              What Our Educators Say
            </h2>
            <p className='text-lg text-blue-100'>
              Join thousands of educators who have transformed their teaching
              with Sahla LMS.
            </p>
          </div>

          <div className='relative mx-auto max-w-4xl'>
            <div className='relative min-h-[250px] md:min-h-[200px]'>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    'absolute inset-0 rounded-2xl bg-white/10 p-6 shadow-xl backdrop-blur-sm transition-all duration-500 md:p-8',
                    activeTestimonial === index
                      ? 'z-10 opacity-100'
                      : 'pointer-events-none z-0 opacity-0',
                  )}
                >
                  <div className='flex h-full flex-col'>
                    <blockquote className='testimonial-blockquote mb-4 flex-grow px-4'>
                      <p className='text-sm font-light sm:text-base md:text-lg'>
                        {testimonial.quote}
                      </p>
                    </blockquote>
                    <div className='mt-auto flex items-center'>
                      <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-400/20 text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg'>
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className='ml-3 sm:ml-4'>
                        <p className='text-sm font-bold sm:text-base'>
                          {testimonial.author}
                        </p>
                        <p className='text-xs text-blue-200 sm:text-sm'>
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-6 flex justify-center space-x-3'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`testimonial-dot ${activeTestimonial === index ? 'active' : ''}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className='bg-white py-16 sm:py-20 md:py-24 dark:bg-slate-950'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='mx-auto mb-10 max-w-3xl text-center sm:mb-16'>
            <div className='mb-4 font-medium text-blue-600 dark:text-blue-400'>
              Transparent Pricing
            </div>
            <h2 className='mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl'>
              Choose the Perfect{' '}
              <span className='text-blue-600 dark:text-blue-400'>Plan</span> for
              Your Needs
            </h2>
            <p className='text-lg text-slate-600 dark:text-slate-400'>
              From individual instructors to large educational organizations, we
              have a plan that fits your requirements and budget.
            </p>
          </div>

          <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3'>
            {plans.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  'animate-fade-in-up animate-delay-[calc(200ms*var(--index))] relative overflow-hidden rounded-2xl',
                  plan.popular
                    ? 'z-10 scale-105 bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-600/20'
                    : 'border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800',
                )}
                style={{ '--index': index } as React.CSSProperties}
              >
                {plan.popular && (
                  <div className='absolute top-0 right-0 bg-yellow-500 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase'>
                    Most Popular
                  </div>
                )}

                <div className='p-5 sm:p-8'>
                  <h3
                    className={`mb-2 text-xl font-bold sm:text-2xl ${plan.popular ? 'text-white' : ''}`}
                  >
                    {plan.title}
                  </h3>
                  <p
                    className={`${plan.popular ? 'text-blue-100' : 'text-slate-600 dark:text-slate-400'} mb-4 text-sm sm:mb-6 sm:text-base`}
                  >
                    {plan.description}
                  </p>

                  <div className='mb-4 sm:mb-6'>
                    <span
                      className={`text-2xl font-bold sm:text-3xl md:text-4xl ${plan.popular ? 'text-white' : ''}`}
                    >
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span
                        className={`${plan.popular ? 'text-blue-200' : 'text-slate-500 dark:text-slate-400'}`}
                      >
                        /month
                      </span>
                    )}
                  </div>

                  <ul className='mb-8 space-y-3'>
                    {plan.features.map((feature, i) => (
                      <li key={i} className='flex items-start'>
                        <svg
                          className={`mr-2 h-5 w-5 ${plan.popular ? 'text-blue-200' : 'text-blue-500 dark:text-blue-400'}`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M5 13l4 4L19 7'
                          ></path>
                        </svg>
                        <span
                          className={`${plan.popular ? 'text-blue-100' : 'text-slate-600 dark:text-slate-400'}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.buttonLink}
                    className={`block w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-all sm:px-6 sm:py-3 sm:text-base ${
                      plan.popular
                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                        : 'border border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {plan.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='bg-slate-50 py-16 sm:py-20 md:py-24 dark:bg-slate-900'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='mx-auto mb-10 max-w-3xl text-center sm:mb-16'>
            <div className='mb-4 font-medium text-blue-600 dark:text-blue-400'>
              Questions & Answers
            </div>
            <h2 className='mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl'>
              Frequently Asked Questions
            </h2>
            <p className='text-lg text-slate-600 dark:text-slate-400'>
              Find answers to common questions about our platform, features, and
              pricing.
            </p>
          </div>

          <div className='mx-auto max-w-3xl'>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className='mb-4 border-b border-slate-200 pb-4 dark:border-slate-700'
              >
                <button
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  className='flex w-full items-center justify-between py-4 text-left text-lg font-medium'
                >
                  {faq.question}
                  <svg
                    className={`h-5 w-5 text-blue-600 transition-transform dark:text-blue-400 ${
                      activeFaq === index ? 'rotate-180 transform' : ''
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M19 9l-7 7-7-7'
                    ></path>
                  </svg>
                </button>
                {activeFaq === index && (
                  <div className='animate-fade-down overflow-hidden transition-all duration-300'>
                    <div className='pb-4 text-slate-600 dark:text-slate-400'>
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white sm:py-20'>
        <div className='container mx-auto px-4 text-center sm:px-6'>
          <h2 className='animate-fade-in-up mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl'>
            Ready to Transform Your Teaching?
          </h2>
          <p className='animate-fade-in-up animate-delay-200 mx-auto mb-6 max-w-3xl text-lg text-blue-100 sm:mb-10 sm:text-xl'>
            Join thousands of educators who are already using Sahla LMS to
            create engaging courses and grow their teaching business.
          </p>
          <div className='animate-fade-in-up animate-delay-400 flex flex-col justify-center gap-4 sm:flex-row'>
            <a
              href='/start'
              className='w-full transform rounded-lg bg-white px-6 py-3 text-base font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-blue-50 sm:w-auto sm:px-8 sm:py-4 sm:text-lg'
            >
              Start Your Free 14-Day Trial
            </a>
            <a
              href='/contact'
              className='w-full transform rounded-lg border-2 border-white bg-transparent px-6 py-3 text-base font-bold text-white transition-all hover:scale-105 hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4 sm:text-lg'
            >
              Schedule a Demo
            </a>
          </div>
          <p className='mt-8 text-sm text-blue-200'>
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}

// Data

const features = [
  {
    title: 'Multi-tenant Academies',
    description:
      'Launch and manage multiple branded learning platforms with unique subdomains from a single dashboard.',
    icon: (props: { size: number }) => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      >
        <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
        <polyline points='9 22 9 12 15 12 15 22'></polyline>
      </svg>
    ),
  },
  {
    title: 'Intuitive Course Builder',
    description:
      'Create engaging multimedia courses with our drag-and-drop editor - no technical skills required.',
    icon: (props: { size: number }) => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      >
        <path d='M2 12h20M16 12l-4-4M16 12l-4 4'></path>
      </svg>
    ),
  },
  {
    title: 'Interactive Assessments',
    description:
      'Create quizzes, assignments, and interactive exercises to test student understanding and provide feedback.',
    icon: (props: { size: number }) => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      >
        <path d='M9 11l3 3L22 4'></path>
        <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'></path>
      </svg>
    ),
  },
  {
    title: 'Custom Branding',
    description:
      'Personalize your academy with your logo, colors, and custom domain to create a professional learning environment.',
    icon: (props: { size: number }) => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      >
        <path d='M6 3v12'></path>
        <circle cx='18' cy='6' r='3'></circle>
        <circle cx='6' cy='18' r='3'></circle>
        <path d='M18 9a9 9 0 0 1-9 9'></path>
      </svg>
    ),
  },
  {
    title: 'Student Management',
    description:
      'Easily track student progress, communicate with learners, and manage enrollments from a centralized dashboard.',
    icon: (props: { size: number }) => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      >
        <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'></path>
        <circle cx='9' cy='7' r='4'></circle>
        <path d='M22 21v-2a4 4 0 0 0-3-3.87'></path>
        <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
      </svg>
    ),
  },
  {
    title: 'Integrated Payments',
    description:
      'Accept payments for courses with our seamless Stripe integration, manage subscriptions, and track revenue.',
    icon: (props: { size: number }) => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      >
        <line x1='12' y1='1' x2='12' y2='23'></line>
        <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
      </svg>
    ),
  },
  {
    title: 'Learning Paths',
    description:
      'Create structured learning journeys with prerequisites, certificates, and personalized learning paths.',
    icon: (props: { size: number }) => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      >
        <rect x='3' y='11' width='18' height='11' rx='2' ry='2'></rect>
        <path d='M7 11V7a5 5 0 0 1 10 0v4'></path>
      </svg>
    ),
  },
  {
    title: 'Detailed Analytics',
    description:
      'Track student engagement, course completion rates, and revenue with comprehensive analytics and reports.',
    icon: (props: { size: number }) => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      >
        <line x1='18' y1='20' x2='18' y2='10'></line>
        <line x1='12' y1='20' x2='12' y2='4'></line>
        <line x1='6' y1='20' x2='6' y2='14'></line>
      </svg>
    ),
  },
  {
    title: 'Interactive Coding',
    description:
      'Built-in code editors for tech courses with real-time syntax highlighting, execution and feedback.',
    icon: (props: { size: number }) => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      >
        <polyline points='16 18 22 12 16 6'></polyline>
        <polyline points='8 6 2 12 8 18'></polyline>
      </svg>
    ),
  },
];

const steps = [
  {
    title: 'Set Up Your Academy',
    description:
      'Choose your subdomain, customize your branding, and configure payment settings in minutes.',
  },
  {
    title: 'Create Your Courses',
    description:
      'Upload videos, create quizzes, and organize your content into a structured curriculum.',
  },
  {
    title: 'Launch & Scale',
    description:
      'Publish your courses, market to your audience, and use analytics to grow your teaching business.',
  },
];

const testimonials = [
  {
    quote:
      'Sahla transformed my teaching business. I created separate academies for different subjects while managing everything from one dashboard.',
    author: 'Dr. Sarah Johnson',
    role: 'Professor & Online Educator',
  },
  {
    quote:
      'With minimal technical skills, I created a professional academy in hours. The interface is intuitive and the support is outstanding.',
    author: 'Michael Chen',
    role: 'Independent Course Creator',
  },
  {
    quote:
      'The analytics helped me identify where students struggled. My completion rates increased by 65% after implementing changes.',
    author: 'Rebecca Torres',
    role: 'Language Instructor',
  },
  {
    quote:
      'Sahla offers the perfect balance of powerful features and ease of use. Students love the interactive coding tools.',
    author: 'David Patel',
    role: 'Programming Instructor',
  },
];

const plans = [
  {
    title: 'Starter',
    price: '$49',
    description: 'Perfect for individual instructors just getting started',
    popular: false,
    features: [
      '1 Academy Subdomain',
      'Unlimited Students',
      'Up to 5 Courses',
      'Basic Analytics',
      'Standard Support',
      'Stripe Integration',
      'Student Management',
    ],
    buttonText: 'Start Free Trial',
    buttonLink: '/start',
  },
  {
    title: 'Professional',
    price: '$99',
    description: 'For growing educators and small teams',
    popular: true,
    features: [
      '3 Academy Subdomains',
      'Unlimited Students',
      'Unlimited Courses',
      'Advanced Analytics',
      'Priority Support',
      'Custom Domain',
      'Team Access',
      'Learning Paths',
      'Interactive Coding',
    ],
    buttonText: 'Start Free Trial',
    buttonLink: '/start',
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'For educational institutions and large teams',
    popular: false,
    features: [
      '10+ Academy Subdomains',
      'Unlimited Everything',
      'White-label Solution',
      'API Access',
      'Dedicated Support',
      'SSO Integration',
      'Custom Development',
      'Enterprise Security',
      'Priority Hosting',
    ],
    buttonText: 'Contact Sales',
    buttonLink: '/contact',
  },
];

const faqs = [
  {
    question: 'What is a multi-tenant LMS?',
    answer:
      'A multi-tenant LMS allows you to create and manage multiple learning platforms from a single dashboard. With Sahla, you can launch multiple branded academies, each with their own subdomain, courses, and students.',
  },
  {
    question: 'Do I need technical skills to use Sahla?',
    answer:
      'Not at all! Sahla is designed with educators in mind, with an intuitive interface that makes it easy for anyone to set up their learning platform, create courses, and manage students without any technical knowledge.',
  },
  {
    question: 'How do payments work?',
    answer:
      'Sahla integrates with Stripe to handle all payment processing. You can set up one-time payments, subscriptions, or payment plans for your courses. We charge a small transaction fee on the Starter plan, while Pro and Enterprise plans have reduced fees.',
  },
  {
    question: 'Can I migrate from another platform?',
    answer:
      'Yes! We offer migration services to help you move your content and student data from other platforms like Teachable, Thinkific, or Kajabi. Contact our support team for assistance with migrating your existing courses.',
  },
  {
    question: 'What kind of support do you provide?',
    answer:
      'All plans include email support. Professional plans get priority email support with faster response times. Enterprise plans include dedicated support with a named account manager and phone support.',
  },
];
