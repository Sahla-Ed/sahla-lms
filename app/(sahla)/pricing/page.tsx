'use client';

import { useState } from 'react';
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
  Users,
  Globe,
  BarChart,
  Code,
  ShieldCheck,
  FolderKanban,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { DarkVeil } from '@/components/ui/dark-veil';
import { cn } from '@/lib/utils';

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true);

  const pricingFaqs = [
    {
      q: 'Can I change my plan later?',
      a: 'Yes, you can upgrade from the trial to the Pro plan at any time from your administrative dashboard.',
    },
    {
      q: 'Are there any hidden fees?',
      a: 'No, our pricing is transparent. The Pro plan fee covers all features listed. Transaction fees from payment gateways (like Stripe) may apply to your course sales.',
    },
    {
      q: 'Do you offer custom enterprise solutions?',
      a: 'Yes, for large organizations with specific needs, we offer custom enterprise plans. Please contact our sales team for more information.',
    },
    {
      q: 'What happens after the 14-day trial?',
      a: 'After your trial period ends, you can choose to subscribe to one of our paid plans to continue using Sahla. Your data will be preserved for 30 days if you decide not to subscribe immediately.',
    },
    {
      q: 'Can I get a refund if I&apos;m not satisfied?',
      a: 'Yes, we offer a 30-day money-back guarantee on all our paid plans. If you&apos;re not satisfied with our service, contact our support team for a full refund.',
    },
  ];

  return (
    <div className='overflow-hidden font-[var(--font-inter)] text-slate-800 dark:text-slate-100'>
      {/* Hero Section */}
      <section
        className='relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden'
        style={{ backgroundColor: '#0a0a29' }}
      >
        <div className='absolute inset-0 z-0 h-full w-full'>
          <DarkVeil
            hueShift={35}
            noiseIntensity={0.03}
            scanlineIntensity={0.08}
            speed={0.3}
            warpAmount={5}
          />
        </div>

        <div className='animate-fade-in-up relative z-10 max-w-4xl px-6 py-10 text-center text-white'>
          <div className='mb-8 inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-medium'>
            Simple, Transparent Pricing
          </div>

          <h1 className='mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-3xl leading-tight font-extrabold text-transparent sm:text-4xl md:text-5xl lg:text-6xl'>
            Choose the Perfect Plan
          </h1>

          <p className='mx-auto mb-10 max-w-3xl text-lg text-blue-100 sm:text-xl'>
            Start with our 14-day free trial, then pick the plan that works best
            for your growing learning platform.
          </p>

          {/* Billing Toggle */}
          <div className='mb-10 flex items-center justify-center space-x-4'>
            <span
              className={cn(
                'text-sm font-medium',
                !annualBilling && 'text-blue-300',
              )}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className={cn(
                'relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none',
                annualBilling ? 'bg-blue-500' : 'bg-white/20',
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  annualBilling ? 'translate-x-6' : 'translate-x-1',
                )}
              />
            </button>
            <span
              className={cn(
                'flex items-center text-sm font-medium',
                annualBilling && 'text-blue-300',
              )}
            >
              Annually{' '}
              <span className='ml-1 rounded bg-blue-500 px-1.5 py-0.5 text-xs text-white'>
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className='absolute right-0 bottom-8 left-0 flex justify-center'>
          <div
            className='animate-infinite animate-duration-[2000ms] animate-bounce cursor-pointer text-white/60'
            onClick={() => {
              document
                .getElementById('pricing-plans')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section
        id='pricing-plans'
        className='bg-gradient-to-br from-white to-blue-50 py-16 sm:py-20 md:py-24 dark:from-slate-950 dark:to-slate-900'
      >
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3'>
            {/* Starter Plan */}
            <Card className='animate-fade-in-up animate-delay-200 flex transform flex-col border-slate-200 bg-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl dark:border-slate-700 dark:bg-slate-800'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>Starter</CardTitle>
                <CardDescription className='text-slate-600 dark:text-slate-400'>
                  Perfect for new creators.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex-grow'>
                <div className='mb-6'>
                  <div className='text-4xl font-bold'>Free</div>
                  <p className='text-sm text-slate-500 dark:text-slate-400'>
                    Get started right away
                  </p>
                </div>
                <ul className='space-y-3 text-slate-700 dark:text-slate-300'>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' /> 1
                    Course
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' /> 1
                    Admin User
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' /> Basic
                    Analytics
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' />{' '}
                    Community Support
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className='w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800'
                  asChild
                >
                  <Link href='/start'>Start For Free</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className='animate-fade-in-up relative z-10 flex transform flex-col border-blue-200 bg-white shadow-xl md:scale-[1.05] dark:border-blue-800 dark:bg-slate-800'>
              <div className='absolute -top-5 right-0 left-0 flex justify-center'>
                <Badge
                  variant='default'
                  className='bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-1 text-white'
                >
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  Pro
                </CardTitle>
                <CardDescription>For growing academies.</CardDescription>
              </CardHeader>
              <CardContent className='flex-grow'>
                <div className='mb-6'>
                  <div className='text-4xl font-bold'>
                    {annualBilling ? '$23' : '$29'}
                    <span className='text-lg text-slate-500 dark:text-slate-400'>
                      /month
                    </span>
                  </div>
                  <p className='text-sm text-slate-500 dark:text-slate-400'>
                    {annualBilling
                      ? 'Billed annually ($276/year)'
                      : 'Billed monthly'}
                  </p>
                </div>
                <ul className='space-y-3 text-slate-700 dark:text-slate-300'>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' />{' '}
                    Unlimited Courses
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' />{' '}
                    Custom Subdomain
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' />{' '}
                    Advanced Analytics
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' /> AI
                    Content Creation
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' />{' '}
                    Priority Support
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className='w-full transform bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:from-blue-600 hover:to-indigo-700 hover:shadow-blue-600/40'
                  asChild
                >
                  <Link href='/start'>Start Your Free Trial</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise Plan */}
            <Card className='animate-fade-in-up animate-delay-400 flex transform flex-col border-slate-200 bg-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl dark:border-slate-700 dark:bg-slate-800'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>Enterprise</CardTitle>
                <CardDescription className='text-slate-600 dark:text-slate-400'>
                  Tailored for large organizations.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex-grow'>
                <div className='mb-6'>
                  <div className='text-4xl font-bold'>Custom</div>
                  <p className='text-sm text-slate-500 dark:text-slate-400'>
                    Contact for pricing
                  </p>
                </div>
                <ul className='space-y-3 text-slate-700 dark:text-slate-300'>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' /> All
                    Pro features, plus:
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' />{' '}
                    Unlimited Admin Users
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' /> Teams
                    & Projects
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' />{' '}
                    Dedicated Support
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' />{' '}
                    Custom Domain
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' />{' '}
                    On-premise Option
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='mr-2 h-5 w-5 text-blue-500' /> API
                    Access
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className='w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
                  asChild
                >
                  <Link href='/contact'>Contact Sales</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Compare Features Section */}
      <section className='bg-white py-16 dark:bg-slate-950'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='mx-auto mb-12 max-w-3xl text-center'>
            <h2 className='mb-4 text-3xl font-bold sm:text-4xl'>
              Compare Plans
            </h2>
            <p className='text-lg text-slate-600 dark:text-slate-400'>
              Find the perfect plan for your needs and scale as you grow
            </p>
          </div>

          <div className='mx-auto max-w-5xl overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='border-b border-slate-200 dark:border-slate-800'>
                  <th className='p-4 text-left font-medium text-slate-500'>
                    Feature
                  </th>
                  <th className='p-4 text-center font-medium text-slate-500'>
                    Starter
                  </th>
                  <th className='p-4 text-center font-medium text-blue-600 dark:text-blue-400'>
                    Pro
                  </th>
                  <th className='p-4 text-center font-medium text-slate-500'>
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b border-slate-200 dark:border-slate-800'>
                  <td className='p-4 font-medium'>Courses</td>
                  <td className='p-4 text-center'>1</td>
                  <td className='p-4 text-center'>Unlimited</td>
                  <td className='p-4 text-center'>Unlimited</td>
                </tr>
                <tr className='border-b border-slate-200 dark:border-slate-800'>
                  <td className='p-4 font-medium'>Admin Users</td>
                  <td className='p-4 text-center'>1</td>
                  <td className='p-4 text-center'>5</td>
                  <td className='p-4 text-center'>Unlimited</td>
                </tr>
                <tr className='border-b border-slate-200 dark:border-slate-800'>
                  <td className='p-4 font-medium'>Custom Domain</td>
                  <td className='p-4 text-center'>—</td>
                  <td className='p-4 text-center'>Subdomain</td>
                  <td className='p-4 text-center'>Full Domain</td>
                </tr>
                <tr className='border-b border-slate-200 dark:border-slate-800'>
                  <td className='p-4 font-medium'>AI Content Creation</td>
                  <td className='p-4 text-center'>—</td>
                  <td className='p-4 text-center'>
                    <CheckCircle className='mx-auto h-5 w-5 text-blue-500' />
                  </td>
                  <td className='p-4 text-center'>
                    <CheckCircle className='mx-auto h-5 w-5 text-blue-500' />
                  </td>
                </tr>
                <tr className='border-b border-slate-200 dark:border-slate-800'>
                  <td className='p-4 font-medium'>API Access</td>
                  <td className='p-4 text-center'>—</td>
                  <td className='p-4 text-center'>—</td>
                  <td className='p-4 text-center'>
                    <CheckCircle className='mx-auto h-5 w-5 text-blue-500' />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='bg-gradient-to-br from-blue-50 to-indigo-50 py-16 sm:py-20 dark:from-slate-900 dark:to-indigo-950'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='mx-auto mb-12 max-w-3xl text-center'>
            <h2 className='mb-4 text-3xl font-bold sm:text-4xl'>
              Frequently Asked Questions
            </h2>
            <p className='text-lg text-slate-600 dark:text-slate-400'>
              Find answers to common questions about our pricing and plans
            </p>
          </div>

          <div className='mx-auto max-w-3xl'>
            <Accordion type='single' collapsible className='w-full space-y-4'>
              {pricingFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-center text-white'>
        <div className='container mx-auto px-6'>
          <h2 className='mb-4 text-2xl font-bold sm:text-3xl'>
            Ready to Get Started?
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg'>
            Join thousands of educators already using Sahla to build their
            learning platforms. No credit card required for your 14-day trial.
          </p>
          <Button
            size='lg'
            variant='secondary'
            asChild
            className='transform bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-blue-50'
          >
            <Link href='/start'>Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
