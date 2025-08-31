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
      a: 'Yes, we offer a free trial period for you to explore Sahla\'s features before committing to a subscription.',
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
};

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
          faq.a.toLowerCase().includes(query)
      );

      if (matchingFaqs.length > 0) {
        results[category] = matchingFaqs;
      }
    });

    setFilteredFaqs(results);
  }, [searchQuery]);

  return (
    <div className="font-[var(--font-inter)] text-slate-800 dark:text-slate-100 overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex flex-col justify-center items-center overflow-hidden"
        style={{ backgroundColor: '#0a0a29' }}
      >
        <div className="absolute inset-0 z-0 h-full w-full">
          <DarkVeil
            hueShift={15}
            noiseIntensity={0.03}
            scanlineIntensity={0.08}
            speed={0.3}
            warpAmount={4}
          />
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center text-white py-10 animate-fade-in-up">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full px-6 py-2 mb-8 text-sm font-medium">
            <Book className="mr-2 h-4 w-4 inline" />
            Knowledge Base
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200">
            Frequently Asked Questions
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Find answers to common questions about the Sahla platform, features, and subscription plans.
          </p>

          <div className="relative mx-auto max-w-xl">
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-300" />
            <Input
              placeholder="Search questions..."
              className="h-12 rounded-full pl-12 bg-white/10 text-white border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div
            className="text-white/60 cursor-pointer animate-bounce animate-infinite animate-duration-[2000ms]"
            onClick={() => {
              document.getElementById('faq-content')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section id="faq-content" className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {Object.entries(filteredFaqs).length > 0 ? (
              Object.entries(filteredFaqs).map(([category, faqs]) => (
                <div key={category} className="animate-fade-in-up">
                  <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
                    {category}
                  </h2>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category}-item-${index}`}
                        className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <AccordionTrigger className="p-6 text-left text-lg font-medium hover:no-underline">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 dark:text-slate-400 px-6 pb-6 text-base">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  We couldn't find any FAQs matching your search.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  className="border-blue-400 text-blue-600 hover:bg-blue-50"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6">
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold">Still have questions?</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you with any questions or concerns.
          </p>
          <Button size="lg" variant="secondary" asChild className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 text-lg transition-all transform hover:scale-105 shadow-lg">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
