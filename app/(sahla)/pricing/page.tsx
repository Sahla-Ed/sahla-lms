import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  CheckCircle,
  XCircle,
  Users,
  Globe,
  BarChart,
  Mail,
  Code,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function PricingPage() {
  const pricingFaqs = [
    {
      q: 'What is a tenant?',
      a: 'A tenant refers to a single, independent learning platform you create within Sahla. Each tenant can have its own branding, courses, and users.',
    },
    {
      q: 'Can I change my plan later?',
      a: 'Yes, you can upgrade or downgrade your plan at any time from your administrative dashboard.',
    },
    {
      q: 'Are there any hidden fees?',
      a: 'No, our pricing is transparent. The monthly fee covers all features listed for your chosen plan. Transaction fees from payment gateways (like Stripe) may apply.',
    },
    {
      q: 'Do you offer custom enterprise solutions?',
      a: 'Yes, for large organizations with specific needs, we offer custom enterprise plans. Please contact our sales team for more information.',
    },
  ];

  return (
    <div className='container mx-auto py-12'>
      <div className='mb-12 text-center'>
        <h1 className='mb-4 text-4xl font-bold'>Simple, Transparent Pricing</h1>
        <p className='text-muted-foreground text-xl'>
          Choose the plan that&apos;s right for your learning platform.
        </p>
      </div>

      <div className='bg-muted/20 grid grid-cols-1 gap-8 rounded-lg p-8 shadow-inner md:grid-cols-3'>
        {/* Basic Plan */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle className='text-2xl'>Basic</CardTitle>
            <CardDescription>Perfect for new creators.</CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <div className='mb-4 text-4xl font-bold'>
              $29<span className='text-muted-foreground text-lg'>/month</span>
            </div>
            <ul className='text-muted-foreground space-y-2'>
              <li className='flex items-center'>
                <CheckCircle className='mr-2 h-5 w-5 text-green-500' />{' '}
                Unlimited Courses
              </li>
              <li className='flex items-center'>
                <Users className='mr-2 h-5 w-5 text-green-500' /> 1 Admin User
              </li>
              <li className='flex items-center'>
                <BarChart className='mr-2 h-5 w-5 text-green-500' /> Basic
                Analytics
              </li>
              <li className='flex items-center'>
                <Mail className='mr-2 h-5 w-5 text-green-500' /> Email Support
              </li>
              <li className='flex items-center text-red-500'>
                <XCircle className='mr-2 h-5 w-5 text-red-500' /> No Custom
                Domain
              </li>
              <li className='flex items-center text-red-500'>
                <XCircle className='mr-2 h-5 w-5 text-red-500' /> No API Access
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' asChild>
              <Link href='/start'>Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className='border-primary relative flex flex-col shadow-lg'>
          <Badge
            variant='default'
            className='absolute -top-3 left-1/2 -translate-x-1/2 rotate-3'
          >
            Most Popular
          </Badge>
          <CardHeader>
            <CardTitle className='text-2xl'>Pro</CardTitle>
            <CardDescription>For growing academies.</CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <div className='mb-4 text-4xl font-bold'>
              $79<span className='text-muted-foreground text-lg'>/month</span>
            </div>
            <ul className='text-muted-foreground space-y-2'>
              <li className='flex items-center'>
                <CheckCircle className='mr-2 h-5 w-5 text-green-500' /> All
                Basic features
              </li>
              <li className='flex items-center'>
                <Users className='mr-2 h-5 w-5 text-green-500' /> 5 Admin Users
              </li>
              <li className='flex items-center'>
                <BarChart className='mr-2 h-5 w-5 text-green-500' /> Advanced
                Analytics
              </li>
              <li className='flex items-center'>
                <ShieldCheck className='mr-2 h-5 w-5 text-green-500' /> Priority
                Support
              </li>
              <li className='flex items-center'>
                <Globe className='mr-2 h-5 w-5 text-green-500' /> Custom Domain
              </li>
              <li className='flex items-center text-red-500'>
                <XCircle className='mr-2 h-5 w-5 text-red-500' /> No API Access
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' asChild>
              <Link href='/start'>Choose Pro</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle className='text-2xl'>Enterprise</CardTitle>
            <CardDescription>Tailored for large organizations.</CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <div className='mb-4 text-4xl font-bold'>
              Custom
              <span className='text-muted-foreground text-lg'>/month</span>
            </div>
            <ul className='text-muted-foreground space-y-2'>
              <li className='flex items-center'>
                <CheckCircle className='mr-2 h-5 w-5 text-green-500' /> All Pro
                features
              </li>
              <li className='flex items-center'>
                <Users className='mr-2 h-5 w-5 text-green-500' /> Unlimited
                Admin Users
              </li>
              <li className='flex items-center'>
                <ShieldCheck className='mr-2 h-5 w-5 text-green-500' />{' '}
                Dedicated Support
              </li>
              <li className='flex items-center'>
                <Code className='mr-2 h-5 w-5 text-green-500' /> API Access
              </li>
              <li className='flex items-center'>
                <CheckCircle className='mr-2 h-5 w-5 text-green-500' />{' '}
                On-premise Option
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className='w-full' asChild>
              <Link href='/contact'>Contact Sales</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Pricing FAQs */}
      <section className='px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-12'>
          <h2 className='mb-12 text-center text-4xl font-bold'>
            Frequently Asked Questions
          </h2>
          <Accordion type='single' collapsible className='w-full space-y-4'>
            {pricingFaqs.map((faq, index) => (
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
      </section>
    </div>
  );
}
