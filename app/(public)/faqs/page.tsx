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

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Sahla',
  description:
    'Find answers to the most common questions about Sahla. Learn about account management, payments, course features, and more.',
};

const faqCategories = {
  'Account Management': [
    {
      q: 'How do I create an account?',
      a: 'You can create an account using your email and a password, or by signing in with a social provider like Google or GitHub.',
    },
    {
      q: 'How can I update my profile information?',
      a: "Profile information can be updated in your Dashboard under the 'Settings' or 'Profile' section.",
    },
  ],
  'Courses & Learning': [
    {
      q: 'Do I get lifetime access to courses?',
      a: 'Yes! Once you enroll in a course, you have lifetime access to all its materials, including future updates.',
    },
    {
      q: 'Can I get a certificate after completing a course?',
      a: 'Yes, a verifiable certificate of completion is awarded after you successfully complete all modules and quizzes in a course.',
    },
  ],
  'Payments & Subscriptions': [
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, PayPal, and other popular payment methods through our secure Stripe integration.',
    },
    {
      q: 'Is there a refund policy?',
      a: 'Yes, we offer a 30-day money-back guarantee on all our courses. Please check our refund policy page for more details.',
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
    </div>
  );
}
