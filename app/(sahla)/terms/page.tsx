import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  FileText,
  Shield,
  Users,
  BookOpen,
  CreditCard,
  Gavel,
  Mail,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Sahla',
  description:
    'Read the terms and conditions for using the Sahla learning platform.',
};

const sections = [
  {
    icon: <FileText className='text-primary h-6 w-6' />,
    title: 'Introduction',
    content:
      'Welcome to Sahla. By using our platform, you agree to these terms and conditions.',
  },
  {
    icon: <Users className='text-primary h-6 w-6' />,
    title: 'User Accounts',
    content:
      'Create an account with accurate information. Keep your login details secure and notify us of any unauthorized access.',
  },
  {
    icon: <BookOpen className='text-primary h-6 w-6' />,
    title: 'Course Access',
    content:
      'Enrolled courses are for personal use only. Lifetime access provided unless policy violations occur.',
  },
  {
    icon: <Shield className='text-primary h-6 w-6' />,
    title: 'Intellectual Property',
    content:
      'All content is protected by copyright. No reproduction or distribution without written permission.',
  },
  {
    icon: <CreditCard className='text-primary h-6 w-6' />,
    title: 'Payment & Refunds',
    content:
      'Payment required at enrollment. 30-day money-back guarantee if less than 30% completed.',
  },
  {
    icon: <Gavel className='text-primary h-6 w-6' />,
    title: 'Code of Conduct',
    content:
      'Maintain respectful behavior. No harassment, hacking, or commercial use without authorization.',
  },
  {
    icon: <AlertTriangle className='text-primary h-6 w-6' />,
    title: 'Disclaimers',
    content:
      "Platform provided 'as is' without warranties. Our liability is limited to course fees paid.",
  },
  {
    icon: <Mail className='text-primary h-6 w-6' />,
    title: 'Contact & Updates',
    content:
      'Terms may be updated with notification. Contact support for questions or concerns.',
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
      <section className='relative px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='space-y-8 text-center'>
            <Badge
              variant='outline'
              className='text-primary border-primary/20 bg-primary/5'
            >
              Legal Document
            </Badge>
            <h1 className='from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl'>
              Terms & Conditions
            </h1>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed'>
              Essential terms and guidelines for using the Sahla learning
              platform safely and effectively.
            </p>
          </div>
        </div>
      </section>

      <section className='px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-8'>
          {sections.map((section, index) => (
            <Card
              key={index}
              className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl'
            >
              <CardHeader className='pb-4'>
                <div className='flex items-center space-x-4'>
                  <div className='bg-primary/10 group-hover:bg-primary/20 rounded-full p-3 transition-colors duration-300'>
                    {section.icon}
                  </div>
                  <CardTitle className='text-xl font-semibold'>
                    {index + 1}. {section.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground text-lg leading-relaxed'>
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='from-primary/5 to-primary/10 bg-gradient-to-r px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-8 text-center'>
          <h2 className='mb-6 text-4xl font-bold'>Need Clarification?</h2>
          <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
            Our support team is ready to help you understand these terms and
            answer any questions you might have.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link href='/contact'>
              <Button size='lg' className='group'>
                Contact Support
                <Mail className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
            <Link href='/privacy'>
              <Button
                size='lg'
                variant='outline'
                className='bg-background/80 hover:bg-background'
              >
                Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
