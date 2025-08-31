'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { ContactForm } from '@/app/s/[subdomain]/(public)/_components/ContactForm';
import { Metadata } from 'next';
import { DarkVeil } from '@/components/ui/dark-veil';

// export const metadata: Metadata = {
//   title: 'Contact Us | Sahla LMS',
//   description:
//     "Have questions or need support? Reach out to the Sahla team through our contact page. We&apos;re here to help with inquiries, feedback, or collaboration opportunities.",
// };

export default function ContactUsPage() {
  return (
    <div className='overflow-hidden font-[var(--font-inter)] text-slate-800 dark:text-slate-100'>
      {/* Hero Section */}
      <section
        className='relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden'
        style={{ backgroundColor: '#0a0a29' }}
      >
        <div className='absolute inset-0 z-0 h-full w-full'>
          <DarkVeil
            hueShift={40}
            noiseIntensity={0.03}
            scanlineIntensity={0.08}
            speed={0.3}
            warpAmount={5}
          />
        </div>

        <div className='animate-fade-in-up relative z-10 max-w-4xl px-6 py-10 text-center text-white'>
          <div className='mb-8 inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-medium'>
            We&apos;d Love To Hear From You
          </div>

          <h1 className='mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-3xl leading-tight font-extrabold text-transparent sm:text-4xl md:text-5xl lg:text-6xl'>
            Get in Touch
          </h1>

          <p className='mx-auto mb-10 max-w-3xl text-lg text-blue-100 sm:text-xl'>
            Ready to elevate your learning platform? We&apos;d love to hear from
            you. Fill out the form below and we&apos;ll get back to you soon.
          </p>
        </div>

        <div className='absolute right-0 bottom-8 left-0 flex justify-center'>
          <div
            className='animate-infinite animate-duration-[2000ms] animate-bounce cursor-pointer text-white/60'
            onClick={() => {
              document
                .getElementById('contact-form')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id='contact-form'
        className='bg-gradient-to-br from-white to-blue-50 py-16 sm:py-20 md:py-24 dark:from-slate-950 dark:to-slate-900'
      >
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='animate-fade-in-up mx-auto max-w-2xl'>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className='bg-white py-16 sm:py-20 dark:bg-slate-950'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='mx-auto max-w-4xl'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              <Card className='border border-slate-200 bg-white shadow-md transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
                <CardContent className='pt-6 text-center'>
                  <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                    <Mail className='h-6 w-6' />
                  </div>
                  <h3 className='mb-2 text-lg font-semibold'>Email Us</h3>
                  <p className='mb-2 text-sm text-slate-600 dark:text-slate-400'>
                    Get in touch via email and we&apos;ll respond within 24
                    hours
                  </p>
                  <p className='font-medium text-blue-600 dark:text-blue-400'>
                    info@sahla.com
                  </p>
                </CardContent>
              </Card>

              <Card className='border border-slate-200 bg-white shadow-md transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
                <CardContent className='pt-6 text-center'>
                  <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                    <Phone className='h-6 w-6' />
                  </div>
                  <h3 className='mb-2 text-lg font-semibold'>Call Us</h3>
                  <p className='mb-2 text-sm text-slate-600 dark:text-slate-400'>
                    Speak directly with our team for immediate assistance
                  </p>
                  <p className='font-medium text-blue-600 dark:text-blue-400'>
                    +1 (555) 123-4567
                  </p>
                </CardContent>
              </Card>

              <Card className='border border-slate-200 bg-white shadow-md transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
                <CardContent className='pt-6 text-center'>
                  <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                    <MessageCircle className='h-6 w-6' />
                  </div>
                  <h3 className='mb-2 text-lg font-semibold'>Live Chat</h3>
                  <p className='mb-2 text-sm text-slate-600 dark:text-slate-400'>
                    Start a conversation with our support team right away
                  </p>
                  <p className='font-medium text-blue-600 dark:text-blue-400'>
                    Available 9 AM - 5 PM EST
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2'>
              <Card className='border border-slate-200 bg-white shadow-md transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
                <CardContent className='pt-6 text-center'>
                  <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                    <MapPin className='h-6 w-6' />
                  </div>
                  <h3 className='mb-2 text-lg font-semibold'>Our Office</h3>
                  <p className='text-sm text-slate-600 dark:text-slate-400'>
                    123 Learning Lane, Suite 400
                    <br />
                    Knowledge City, KC 90210
                    <br />
                    Country
                  </p>
                </CardContent>
              </Card>

              <Card className='border border-slate-200 bg-white shadow-md transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'>
                <CardContent className='pt-6 text-center'>
                  <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                    <Clock className='h-6 w-6' />
                  </div>
                  <h3 className='mb-2 text-lg font-semibold'>Business Hours</h3>
                  <p className='text-sm text-slate-600 dark:text-slate-400'>
                    Monday - Friday: 9:00 AM - 5:00 PM
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className='relative h-[400px] bg-gray-200 py-16 dark:bg-slate-800'>
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-slate-100 opacity-75 dark:bg-slate-800'>
          <div className='text-center'>
            <h3 className='mb-2 text-xl font-bold'>Map Placeholder</h3>
            <p className='text-slate-600 dark:text-slate-400'>
              An interactive map would be displayed here in a production
              environment
            </p>
          </div>
        </div>
        <div className='absolute inset-0 z-0 opacity-25'>
          {/* Map would be rendered here */}
          <div className='h-full w-full bg-gradient-to-br from-slate-200 to-blue-100 dark:from-slate-700 dark:to-slate-900'></div>
        </div>
      </section>
    </div>
  );
}
