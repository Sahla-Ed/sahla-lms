import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Database,
  Eye,
  Shield,
  Share2,
  Settings,
  Cookie,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { PrivacySettingsButton } from './PrivacySettingsButton';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sahla',
  description:
    'Learn how Sahla collects, uses, and protects your personal data.',
};

const sections = [
  {
    icon: <Database className='text-primary h-6 w-6' />,
    title: 'Information We Collect',
    content:
      'We collect information you provide (name, email, profile), payment details, learning progress, support communications, and technical data (IP address, browser, device info) to improve our services.',
  },
  {
    icon: <Eye className='text-primary h-6 w-6' />,
    title: 'How We Use Your Information',
    content:
      'We use your data to provide our services, process payments, personalize learning, send updates, provide support, analyze usage, and ensure security.',
  },
  {
    icon: <Share2 className='text-primary h-6 w-6' />,
    title: 'Information Sharing',
    content:
      'We share data only with instructors (for course progress), service providers (under confidentiality), for legal compliance, with your consent, or during business transfers.',
  },
  {
    icon: <Shield className='text-primary h-6 w-6' />,
    title: 'Data Security',
    content:
      'We use encryption, secure authentication, regular audits, and access controls to protect your data. However, no system is 100% secure.',
  },
  {
    icon: <Cookie className='text-primary h-6 w-6' />,
    title: 'Cookies & Tracking',
    content:
      'We use essential, performance, functional, and analytics cookies. You can control cookie settings through your browser.',
  },
  {
    icon: <Settings className='text-primary h-6 w-6' />,
    title: 'Your Rights',
    content:
      'You can access, update, delete your data, opt out of marketing, request data portability, and withdraw consent through your account dashboard.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
      <section className='relative px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='space-y-8 text-center'>
            <Badge
              variant='outline'
              className='text-primary border-primary/20 bg-primary/5'
            >
              Privacy & Security
            </Badge>
            <h1 className='from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl'>
              Privacy Policy
            </h1>
            <p className='text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed'>
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information with complete
              transparency.
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

      <section className='bg-muted/10 px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <Card className='from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-300 hover:shadow-xl'>
            <CardHeader className='pb-6 text-center'>
              <div className='bg-primary/10 mx-auto mb-4 w-fit rounded-full p-4'>
                <Mail className='text-primary h-8 w-8' />
              </div>
              <CardTitle className='text-2xl'>
                Contact Our Privacy Team
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6 text-center'>
              <p className='text-muted-foreground text-lg leading-relaxed'>
                Have questions about this Privacy Policy? Our dedicated privacy
                team is here to help you understand how we protect your data.
              </p>
              <div className='text-muted-foreground'>
                <p className='font-medium'>Email: privacy@sahla.com</p>
                <p className='text-sm'>Response time: Within 48 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='from-primary/5 to-primary/10 bg-gradient-to-r px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-8 text-center'>
          <h2 className='mb-6 text-4xl font-bold'>
            Manage Your Privacy Settings
          </h2>
          <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
            Take control of your data and privacy preferences through your
            personalized account dashboard.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <PrivacySettingsButton />
            <Link href='/terms-and-conditions'>
              <Button
                size='lg'
                variant='outline'
                className='bg-background/80 hover:bg-background'
              >
                Terms & Conditions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
