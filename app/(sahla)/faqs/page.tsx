'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Book, Search, ChevronDown } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DarkVeil } from '@/components/ui/dark-veil';

// export const metadata: Metadata = {
//   title: 'Frequently Asked Questions | Sahla LMS',
//   description:
//     'Find answers to the most common questions about Sahla. Learn about account management, platform features, and more.',
// };

const faqCategories = {
  'Platform Features': [
    {
      q: 'What is Sahla Learning Platform?',
      a: 'Sahla is a multi-tenant, web-based Learning Management System (LMS) that allows you to launch your own branded online learning platform with unique subdomains.',
    },
    {
      q: 'What features does Sahla offer?',
      a: 'Sahla offers comprehensive course management, integrated payment processing via Stripe, user authentication, an administrative dashboard with analytics, and a customizable landing page.',
    },
    {
      q: 'Can I customize my learning platform?',
      a: 'Yes, Sahla provides a visual, drag-and-drop landing page editor powered by Puck, allowing you to customize your public-facing landing page without writing code.',
    },
    {
      q: 'Does Sahla support interactive coding?',
      a: 'Yes, Sahla integrates with the Judge0 API for executing user-submitted code in various programming languages, enabling interactive coding challenges.',
    },
    {
      q: 'Can Sahla help with quiz generation?',
      a: 'Absolutely! Sahla leverages OpenRouter integration for AI-powered quiz question generation, making content creation easier and faster.',
    },
  ],
  'Pricing & Subscription': [
    {
      q: 'What are the pricing plans for Sahla?',
      a: 'We offer various pricing plans tailored to different needs, including Basic, Pro, and Enterprise options. Please visit our pricing page for more details.',
    },
    {
      q: 'Do you offer a free trial?',
      a: 'Yes, we offer a free trial period for you to explore Sahla&apos;s features before committing to a subscription.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards through our secure Stripe integration.',
    },
    {
      q: 'Is there a refund policy?',
      a: 'Yes, we offer a 30-day money-back guarantee on our subscription plans. Please refer to our Terms and Conditions for more details.',
    },
  ],
  'Technical Support': [
    {
      q: 'How can I get support?',
      a: 'You can reach out to us via our contact page, or refer to our help center for common issues and guides.',
    },
    {
      q: 'Do you offer API access?',
      a: 'API access is available with our Enterprise plan, allowing for deeper integration and customization.',
    },
    {
      q: 'What kind of technical assistance can I expect?',
      a: 'Our technical support team is available to assist with platform setup, troubleshooting, and any technical queries you may have to ensure a smooth experience.',
    },
  ],
} as Record<string, { q: string; a: string }[]>;

export default function FaqsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [filteredFaqs, setFilteredFaqs] = useState(faqCategories);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFaqs(faqCategories);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: Record<string, { q: string; a: string }[]> = {};

    Object.entries(faqCategories).forEach(([category, faqs]) => {
      const matchingFaqs = faqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(query) ||
          faq.a.toLowerCase().includes(query),
      );

      if (matchingFaqs.length > 0) {
        results[category] = matchingFaqs;
      }
    });

    setFilteredFaqs(results);
  }, [searchQuery]);

  return (
    <div className='overflow-hidden font-[var(--font-inter)] text-slate-800 dark:text-slate-100'>
      {/* Hero Section */}
      <section
        className='relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden'
        style={{ backgroundColor: '#0a0a29' }}
      >
        <div className='absolute inset-0 z-0 h-full w-full'>
          <DarkVeil
            hueShift={15}
            noiseIntensity={0.03}
            scanlineIntensity={0.08}
            speed={0.3}
            warpAmount={4}
          />
        </div>

        <div className='animate-fade-in-up relative z-10 max-w-4xl px-6 py-10 text-center text-white'>
          <div className='mb-8 inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-medium'>
            <Book className='mr-2 inline h-4 w-4' />
            Knowledge Base
          </div>

          <h1 className='mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-3xl leading-tight font-extrabold text-transparent sm:text-4xl md:text-5xl lg:text-6xl'>
            Frequently Asked Questions
          </h1>

          <p className='mx-auto mb-10 max-w-3xl text-lg text-blue-100 sm:text-xl'>
            Find answers to common questions about the Sahla platform, features,
            and subscription plans.
          </p>

          <div className='relative mx-auto max-w-xl'>
            <Search className='absolute top-1/2 left-4 -translate-y-1/2 text-blue-300' />
            <Input
              placeholder='Search questions...'
              className='h-12 rounded-full border-white/20 bg-white/10 pl-12 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>
        </div>

        <div className='absolute right-0 bottom-8 left-0 flex justify-center'>
          <div
            className='animate-infinite animate-duration-[2000ms] animate-bounce cursor-pointer text-white/60'
            onClick={() => {
              document
                .getElementById('faq-content')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section
        id='faq-content'
        className='bg-gradient-to-br from-white to-blue-50 py-16 sm:py-20 md:py-24 dark:from-slate-950 dark:to-slate-900'
      >
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='mx-auto max-w-4xl space-y-12'>
            {Object.entries(filteredFaqs).length > 0 ? (
              Object.entries(filteredFaqs).map(([category, faqs]) => (
                <div key={category} className='animate-fade-in-up'>
                  <h2 className='mb-6 text-2xl font-bold text-slate-800 sm:text-3xl dark:text-slate-100'>
                    {category}
                  </h2>
                  <Accordion
                    type='single'
                    collapsible
                    className='w-full space-y-4'
                  >
                    {faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category}-item-${index}`}
                        className='rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800'
                      >
                        <AccordionTrigger className='p-6 text-left text-lg font-medium hover:no-underline'>
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className='px-6 pb-6 text-base text-slate-600 dark:text-slate-400'>
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <div className='py-10 text-center'>
                <h3 className='mb-2 text-xl font-semibold'>No results found</h3>
                <p className='mb-6 text-slate-600 dark:text-slate-400'>
                  We couldn&apos;t find any FAQs matching your search.
                </p>
                <Button
                  variant='outline'
                  onClick={() => setSearchQuery('')}
                  className='border-blue-400 text-blue-600 hover:bg-blue-50'
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-center text-white'>
        <div className='container mx-auto px-6'>
          <h2 className='mb-4 text-2xl font-bold sm:text-3xl'>
            Still have questions?
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg'>
            Can&apos;t find the answer you&apos;re looking for? Our support team
            is here to help you with any questions or concerns.
          </p>
          <Button
            size='lg'
            variant='secondary'
            asChild
            className='transform bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-blue-50'
          >
            <Link href='/contact'>Contact Support</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
