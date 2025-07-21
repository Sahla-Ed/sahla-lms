import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LifeBuoy, Book, Wrench, MessageSquare, Search } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center | Sahla',
  description:
    'Find answers to your questions and get support for the Sahla platform. Browse FAQs, articles, and contact our support team.',
};

const faqItems = [
  {
    question: 'How do I reset my password?',
    answer:
      "You can reset your password by clicking the 'Forgot Password' link on the login page. We will send a reset link to your registered email address.",
  },
  {
    question: 'How do I enroll in a course?',
    answer:
      "To enroll, navigate to the course page you are interested in and click the 'Enroll Now' button. You will be guided through the payment and registration process.",
  },
  {
    question: 'Where can I find my enrolled courses?',
    answer:
      "All your enrolled courses are available in your personal Dashboard. You can access it by clicking the 'Dashboard' link in the navigation bar after logging in.",
  },
];

export default function HelpCenterPage() {
  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
      {/* Hero Section */}
      <section className='relative px-4 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          <Badge
            variant='outline'
            className='text-primary border-primary/20 bg-primary/5 mb-6'
          >
            <LifeBuoy className='mr-2 h-4 w-4' />
            Help Center
          </Badge>
          <h1 className='text-5xl font-bold tracking-tight md:text-6xl'>
            How can we help?
          </h1>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-xl'>
            We&apos;re here to assist you. Search for a topic or browse the
            categories below.
          </p>
          <div className='relative mx-auto mt-8 max-w-xl'>
            <Search className='text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2' />
            <Input
              placeholder='Search for help...'
              className='h-14 rounded-full pl-12 text-lg'
            />
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className='px-4 py-16'>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <Link href='/faqs'>
            <Card className='group bg-card/50 border-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'>
              <CardHeader>
                <div className='bg-primary/10 mb-4 w-fit rounded-full p-3'>
                  <Book className='text-primary h-8 w-8' />
                </div>
                <CardTitle>FAQs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Find answers to common questions about accounts, courses, and
                  payments.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href='/technical-support'>
            <Card className='group bg-card/50 border-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'>
              <CardHeader>
                <div className='bg-primary/10 mb-4 w-fit rounded-full p-3'>
                  <Wrench className='text-primary h-8 w-8' />
                </div>
                <CardTitle>Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Get help with technical issues, bugs, and platform
                  performance.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href='/contact'>
            <Card className='group bg-card/50 border-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'>
              <CardHeader>
                <div className='bg-primary/10 mb-4 w-fit rounded-full p-3'>
                  <MessageSquare className='text-primary h-8 w-8' />
                </div>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Reach out to our support team directly for personalized
                  assistance.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className='bg-muted/10 px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='mb-8 text-center text-3xl font-bold'>
            Frequently Asked Questions
          </h2>
          <Accordion type='single' collapsible className='w-full'>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className='text-left text-lg'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className='text-muted-foreground text-base'>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
