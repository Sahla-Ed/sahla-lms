import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Rocket,
  Users,
  DollarSign,
  Award,
  Lightbulb,
  MessageSquare,
  Workflow,
  Zap,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import DarkVeil from '@/components/Bits/DarkVeil';
import { Badge } from '@/components/ui/badge';
import Lms1 from '@/public/logosss/udemy.png';
import Lms2 from '@/public/logosss/mesq.png';
import Lms3 from '@/public/logosss/tech.png';

export default function Home() {
  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
      {/* Hero Section */}
      <section className='relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center sm:min-h-[80vh] md:min-h-[90vh] md:py-20'>
        <div className='absolute inset-0 z-0 h-full w-full'>
          <DarkVeil
            hueShift={10} // Adjusted hue for a cooler, more professional blue/purple tone
            noiseIntensity={0.01} // Increased noise for subtle texture
            scanlineIntensity={0.05} // Subtle scanlines for a techy feel
            speed={0.6} // Slightly slower animation for a calmer effect
            warpAmount={5} // Add  warp effect
          />
        </div>
        <div className='relative z-10 max-w-4xl px-4 text-white sm:max-w-5xl'>
          <Badge
            variant='secondary'
            className='animate-in mb-4 bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm sm:px-4 sm:py-2 sm:text-lg'
          >
            Your Learning Platform, Reimagined
          </Badge>
          <h1 className='animate-in animation-duration-initial mb-4 text-3xl leading-tight font-extrabold drop-shadow-lg sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
            Transform Education. Empower Creators.
          </h1>
          <p className='animate-in mx-auto mb-6 max-w-3xl text-base leading-relaxed sm:mb-8 sm:text-lg md:mb-10 md:max-w-4xl md:text-xl lg:text-2xl'>
            Sahla provides a robust, multi-tenant platform for you to launch,
            manage, and scale your online learning business with unparalleled
            ease and power.
          </p>
          <div className='animate-in animation-delay-400 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4'>
            <Button
              size='lg'
              className='bg-primary hover:bg-primary/90 shadow-lg transition-transform hover:scale-105'
            >
              <Link href='/start'>Start Your Free Trial Today</Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='text-primary border-white shadow-lg transition-transform hover:scale-105 hover:bg-white'
            >
              <Link href='/pricing'>Explore Our Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className='bg-background px-4 py-8 sm:py-12'>
        <div className='container mx-auto text-center'>
          <h3 className='text-muted-foreground mb-6 text-lg font-semibold sm:mb-8 sm:text-xl'>
            Trusted by leading academies worldwide
          </h3>
          <div className='flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-16'>
            <Image
              src={Lms1}
              alt='Client Logo 1'
              width={120}
              height={40}
              className='h-8 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10'
            />
            <Image
              src={Lms2}
              alt='Client Logo 2'
              width={120}
              height={40}
              className='h-8 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10'
            />
            <Image
              src={Lms3}
              alt='Client Logo 3'
              width={120}
              height={40}
              className='h-8 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10'
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='px-4 py-12 sm:py-16 md:py-20'>
        <div className='container mx-auto'>
          <h2 className='mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl'>
            Key Features
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Rocket className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  Multi-Tenancy
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                Launch multiple branded learning platforms with unique
                subdomains, all from one powerful system.
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Users className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  Comprehensive Course Management
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                Create and manage courses with rich content, quizzes, and coding
                playgrounds.
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <DollarSign className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  Integrated Payments
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                Seamlessly sell courses and manage subscriptions with built-in
                Stripe integration.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='bg-muted/30 px-4 py-12 sm:py-16 md:py-20'>
        <div className='container mx-auto'>
          <h2 className='mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl'>
            How It Works
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Workflow className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  1. Set Up Your Platform
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                Quickly create your branded learning environment with our
                intuitive setup process.
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Zap className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  2. Create & Manage Courses
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                Populate your platform with engaging courses using our powerful
                content creation tools.
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <TrendingUp className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  3. Grow Your Audience
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                Attract students and scale your business with integrated
                marketing and analytics features.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='px-4 py-12 sm:py-16 md:py-20'>
        <div className='container mx-auto'>
          <h2 className='mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl'>
            Why Choose Sahla?
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3'>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Award className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  Award-Winning Support
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                Our dedicated support team is always ready to help you succeed.
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <Lightbulb className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  Innovative Features
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                Stay ahead with AI-powered tools, interactive coding, and more.
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardHeader>
                <MessageSquare className='text-primary mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12' />
                <CardTitle className='text-lg sm:text-xl'>
                  Community Driven
                </CardTitle>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                Join a thriving community of educators and learners.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='bg-muted/30 px-4 py-12 sm:py-16 md:py-20'>
        <div className='container mx-auto'>
          <h2 className='mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl'>
            What Our Clients Say
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2'>
            <Card className='group relative overflow-hidden border-0 bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardContent className='pt-6'>
                <p className='text-muted-foreground mb-4 text-base italic sm:text-lg'>
                  &quot;Sahla transformed our online course delivery. The
                  multi-tenancy feature is a game-changer!&quot;
                </p>
                <p className='text-sm font-semibold sm:text-base'>
                  - Jane Doe, CEO of EduCorp
                </p>
              </CardContent>
            </Card>
            <Card className='group relative overflow-hidden border-0 bg-white/50 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl dark:bg-white/5 dark:hover:bg-white/10'>
              <CardContent className='pt-6'>
                <p className='text-muted-foreground mb-4 text-base italic sm:text-lg'>
                  &quot;The ease of use and powerful features of Sahla allowed
                  us to launch our academy in record time.&quot;
                </p>
                <p className='text-sm font-semibold sm:text-base'>
                  - John Smith, Founder of Tech Academy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='bg-primary text-primary-foreground px-4 py-12 text-center sm:py-16 md:py-20'>
        <div className='container mx-auto'>
          <h2 className='mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl'>
            Ready to Build Your Learning Empire?
          </h2>
          <p className='mb-6 text-lg sm:mb-8 sm:text-xl'>
            Join countless successful educators and businesses using Sahla to
            deliver world-class online education.
          </p>
          <Button size='lg' variant='secondary' asChild>
            <Link href='/start'>Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
