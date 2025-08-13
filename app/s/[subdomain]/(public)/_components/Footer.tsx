'use client';

import { useState } from 'react';
// import Image from 'next/image';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';
import RenderFooterSection from '@/components/RenderFooterSection';
// import Footer1 from '@/public/footer/footer1.jpg';
// import Footer2 from '@/public/footer/footer2.jpg';

const footerLinks = {
  support: [
    { name: 'Contact us', href: '/contact' },
    { name: 'Help Center', href: '/help-center' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Technical Support', href: '/technical-support' },
    { name: 'Live Chat', href: '/live-chat' },
  ],

  courses: [
    { name: 'Browse Courses', href: '/courses' },
    { name: 'Free Courses', href: '/courses/free' },
    { name: 'Certificates', href: '/certificates' },
    { name: 'Course Catalog', href: '/catalog' },
    { name: 'Learning Paths', href: '/learning-paths' },
  ],

  about: [
    { name: 'About us', href: '/about' },
    { name: 'Our Mission', href: '/about#mission' },
    { name: 'Careers', href: '/careers' },
    { name: 'Instructor Program', href: '/instructor-program' },
  ],

  community: [
    { name: 'Student Community', href: '/community/students' },
    { name: 'Discussion Forums', href: '/forums' },
    { name: 'Study Groups', href: '/study-groups' },
    { name: 'Success Stories', href: '/success-stories' },
  ],
};

const benefits = [
  '24/7 Learning Support',
  'Expert Instructors',
  'Certificate Programs',
  'Interactive Learning',
  'Lifetime Access',
  'Student Community',
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
      setShowErrorDialog(true);
      return;
    }

    setShowSuccessDialog(true);

    setEmail('');
  };

  const handleMouseEnter = (section: string, index: number) => {
    setHoveredSection(section);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
    setHoveredIndex(null);
  };

  return (
    <footer className='bg-background text-muted-foreground border-t py-10'>
      {/* Main Footer Content */}
      <div className='mx-auto max-w-7xl px-6 py-16'>
        <div className='grid grid-cols-1 gap-16 lg:grid-cols-12'>
          {/* Left Side - Newsletter Text */}
          <div className='lg:col-span-8'>
            <h2 className='mb-16 text-4xl leading-tight font-light lg:text-5xl'>
              Join our learning community and unlock your potential.
            </h2>
          </div>

          {/* Right Side - Form & Social */}
          <div className='lg:col-span-4'>
            <div className='mb-8 flex flex-col gap-4 sm:flex-row'>
              <Input
                type='email'
                placeholder='Email Address*'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border-muted-foreground/30 placeholder:text-muted-foreground focus:border-foreground flex-1 bg-transparent'
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button
                onClick={handleSubmit}
                className='bg-foreground text-background hover:bg-foreground/90 px-8'
              >
                Subscribe
              </Button>
            </div>

            {/* Social Media */}
            <div>
              <p className='text-muted-foreground mb-4 font-medium'>
                Connect with us
              </p>
              <div className='flex space-x-4'>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground hover:bg-foreground/10 transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
                >
                  <Facebook className='h-6 w-6' />
                </a>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground hover:bg-foreground/10 transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
                >
                  <Twitter className='h-6 w-6' />
                </a>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground hover:bg-foreground/10 transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
                >
                  <Instagram className='h-6 w-6' />
                </a>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground hover:bg-foreground/10 transform rounded-full p-2 transition-all duration-300 ease-in-out hover:scale-110'
                >
                  <Youtube className='h-6 w-6' />
                </a>
              </div>
            </div>
          </div>

          {/* Images - Educational themed */}
          {/*   <div className='lg:col-span-3'> */}
          {/*     <div className='grid grid-cols-2 gap-3'> */}
          {/*       <div className='aspect-square h-40 w-full overflow-hidden rounded-lg sm:h-48 lg:h-56'> */}
          {/*         <Image */}
          {/*           src={Footer1} */}
          {/*           alt='learning' */}
          {/*           width={600} */}
          {/*           height={600} */}
          {/*           className='h-full w-full object-cover' */}
          {/*         /> */}
          {/*       </div> */}
          {/*       <div className='aspect-square h-40 w-full overflow-hidden rounded-lg sm:h-48 lg:h-56'> */}
          {/*         <Image */}
          {/*           src={Footer2} */}
          {/*           alt='learning' */}
          {/*           width={600} */}
          {/*           height={600} */}
          {/*           className='h-full w-full object-cover' */}
          {/*         /> */}
          {/*       </div> */}
          {/*     </div> */}
          {/*   </div> */}
        </div>

        {/* Thin divider line */}
        <div className='border-sidebar-foreground border-t'></div>

        {/* Footer Links positioned next to images and Benefits Banner below */}
        <div className='mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* Footer Links */}
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-9'>
            <RenderFooterSection
              title='Support'
              links={footerLinks.support}
              type='support'
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
            <RenderFooterSection
              title='Courses'
              links={footerLinks.courses}
              type='courses'
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
            <RenderFooterSection
              title='About'
              links={footerLinks.about}
              type='about'
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
            <RenderFooterSection
              title='Community'
              links={footerLinks.community}
              type='community'
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          </div>

          {/* Benefits Banner positioned below images */}
          <div className='overflow-hidden lg:col-span-3'>
            <Marquee speed={50} gradient={false}>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='flex items-center whitespace-nowrap'
                >
                  <span className='text-primary mx-8 text-sm'>{benefit}</span>
                  <span className='text-xs text-orange-500'>●</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      {/* Thin divider line */}
      <div className='border-sidebar-foreground border-t'></div>

      {/* Bottom Footer */}
      <div className='mx-auto max-w-7xl px-6 py-6'>
        <div className='flex flex-col items-center justify-between text-sm md:flex-row'>
          <div className='mb-4 flex flex-wrap gap-6 md:mb-0'>
            <Link
              href='/terms-and-conditions'
              className='text-primary transition-colors'
            >
              Terms & conditions
            </Link>
            <Link
              href='/privacy-policy'
              className='text-primary transition-colors'
            >
              Privacy Policy
            </Link>
            <Link
              href='/student-agreement'
              className='text-primary transition-colors'
            >
              Student Agreement
            </Link>
          </div>
          <p className='text-primary'>© Sahla Learning Platform 2025</p>
        </div>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className='max-w-md'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center text-2xl font-semibold'>
              🎉 Thank You!
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center text-base leading-relaxed'>
              Your email has been successfully registered to our newsletter.
              <br />
              We&apos;ll be in touch soon with the latest courses and exclusive
              offers from Sahla Learning Platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowSuccessDialog(false)}
              className='bg-primary hover:bg-primary/90 w-full'
            >
              Great!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Alert Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className='max-w-md'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-destructive text-center text-2xl font-semibold'>
              ⚠️ Invalid Email
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center text-base leading-relaxed'>
              Please enter a valid email address to subscribe to our newsletter.
              <br />
              Make sure your email includes an &quot;@&quot; symbol and domain.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowErrorDialog(false)}
              className='bg-destructive hover:bg-destructive/90 w-full'
            >
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </footer>
  );
}
