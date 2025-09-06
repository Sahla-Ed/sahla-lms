import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Book, Search } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Sahla LMS',
  description:
    'Find answers to the most common questions about Sahla. Learn about account management, platform features, and more.',
};

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
};

export default function FaqsPage() {
  return (
    <div className='bg-background min-h-screen'>
      <section className='bg-muted/20 px-4 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          <Badge
            variant='outline'
            className='text-primary border-primary/20 bg-primary/5 mb-6'
          >
            <Book className='mr-2 h-4 w-4' />
            FAQs
          </Badge>
          <h1 className='text-5xl font-bold tracking-tight'>
            Frequently Asked Questions
          </h1>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-xl'>
            Have a question? We&apos;ve probably answered it below.
          </p>
          <div className='relative mx-auto mt-8 max-w-xl'>
            <Search className='text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2' />
            <Input
              placeholder='Search questions...'
              className='h-12 rounded-full pl-12'
            />
          </div>
        </div>
      </section>

      <section className='px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-12'>
          {Object.entries(faqCategories).map(([category, faqs]) => (
            <div key={category}>
              <h2 className='mb-6 text-3xl font-bold'>{category}</h2>
              <Accordion type='single' collapsible className='w-full space-y-4'>
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className='bg-card/50 rounded-lg border'
                  >
                    <AccordionTrigger className='p-6 text-left text-lg hover:no-underline'>
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className='text-muted-foreground px-6 pb-6 text-base'>
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <section className='bg-primary text-primary-foreground px-4 py-12 text-center'>
        <div className='container mx-auto'>
          <h2 className='mb-4 text-3xl font-bold'>Still have questions?</h2>
          <p className='mb-8 text-lg'>
            Can&apos;t find the answer you&apos;re looking for? Our support team
            is here to help.
          </p>
          <Button size='lg' variant='secondary' asChild>
            <Link href='/contact'>Contact Support</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
