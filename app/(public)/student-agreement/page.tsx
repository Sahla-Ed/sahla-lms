import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  UserCheck,
  BookOpen,
  Award,
  Shield,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Student Agreement | Sahla',
  description: 'Student rights and responsibilities on Sahla platform.',
};

const sections = [
  {
    icon: <UserCheck className='text-primary h-6 w-6' />,
    title: 'Code of Conduct',
    content:
      'Maintain respectful behavior and academic integrity in all interactions with fellow students, instructors, and platform content.',
  },
  {
    icon: <BookOpen className='text-primary h-6 w-6' />,
    title: 'Learning Responsibilities',
    content:
      'Complete coursework actively and engage meaningfully with the learning materials and community discussions.',
  },
  {
    icon: <Award className='text-primary h-6 w-6' />,
    title: 'Certification Standards',
    content:
      'Work independently and honestly for valid certificates. All assessments must reflect your own understanding and effort.',
  },
  {
    icon: <Shield className='text-primary h-6 w-6' />,
    title: 'Account Security',
    content:
      'Keep your login credentials secure and report any unauthorized access immediately to our support team.',
  },
];

const rights = [
  'Access to high-quality educational content',
  'Responsive customer support and assistance',
  'Safe and inclusive learning environment',
  'Complete privacy protection and data security',
  'Fair assessment and certification processes',
  'Transparent communication about course updates',
];

const responsibilities = [
  'Maintain academic integrity in all coursework',
  'Show respectful behavior toward all community members',
  'Keep account credentials secure and confidential',
  'Participate actively in learning activities',
  'Follow platform guidelines and terms of service',
  'Provide constructive feedback when requested',
];

export default function StudentAgreementPage() {
  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
      <section className='relative px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='space-y-8 text-center'>
            <Badge
              variant='outline'
              className='text-primary border-primary/20 bg-primary/5'
            >
              Student Agreement
            </Badge>
            <h1 className='from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl'>
              Student Agreement
            </h1>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed'>
              Your rights and responsibilities as a valued member of the Sahla
              learning community.
            </p>
          </div>
        </div>
      </section>

      <section className='px-4 py-20'>
        <div className='mx-auto grid max-w-4xl gap-8 md:grid-cols-2'>
          <Card className='group from-card border-0 bg-gradient-to-br to-green-50/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center justify-center space-x-3 text-center text-2xl'>
                <div className='rounded-full bg-green-100 p-2'>
                  <Shield className='h-6 w-6 text-green-600' />
                </div>
                <span>Your Rights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {rights.map((right, index) => (
                <div key={index} className='flex items-start space-x-3'>
                  <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500'></div>
                  <p className='text-muted-foreground leading-relaxed'>
                    {right}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className='group from-card to-primary/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
            <CardHeader>
              <CardTitle className='flex items-center justify-center space-x-3 text-center text-2xl'>
                <div className='bg-primary/10 rounded-full p-2'>
                  <UserCheck className='text-primary h-6 w-6' />
                </div>
                <span>Your Responsibilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {responsibilities.map((resp, index) => (
                <div key={index} className='flex items-start space-x-3'>
                  <div className='bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
                  <p className='text-muted-foreground leading-relaxed'>
                    {resp}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='bg-muted/10 px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>Key Guidelines</h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
              Essential principles that ensure a positive learning experience
              for everyone
            </p>
          </div>

          <div className='space-y-8'>
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
                      {section.title}
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
        </div>
      </section>

      <section className='px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>Support & Resources</h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
              Access the help and resources you need for a successful learning
              journey
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-3'>
            <Card className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
              <CardHeader className='text-center'>
                <div className='bg-primary/10 group-hover:bg-primary/20 mx-auto w-fit rounded-full p-4 transition-colors duration-300'>
                  <MessageSquare className='text-primary h-8 w-8' />
                </div>
                <CardTitle className='text-xl'>Support Team</CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <p className='text-muted-foreground mb-4'>
                  Get help when you need it most
                </p>
                <Button className='w-full'>Contact Support</Button>
              </CardContent>
            </Card>

            <Card className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
              <CardHeader className='text-center'>
                <div className='bg-primary/10 group-hover:bg-primary/20 mx-auto w-fit rounded-full p-4 transition-colors duration-300'>
                  <BookOpen className='text-primary h-8 w-8' />
                </div>
                <CardTitle className='text-xl'>Learning Guidelines</CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <p className='text-muted-foreground mb-4'>
                  Best practices for success
                </p>
                <Button variant='outline' className='w-full'>
                  View Guidelines
                </Button>
              </CardContent>
            </Card>

            <Card className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
              <CardHeader className='text-center'>
                <div className='bg-primary/10 group-hover:bg-primary/20 mx-auto w-fit rounded-full p-4 transition-colors duration-300'>
                  <Award className='text-primary h-8 w-8' />
                </div>
                <CardTitle className='text-xl'>Certifications</CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <p className='text-muted-foreground mb-4'>
                  Learn about our certification process
                </p>
                <Button variant='outline' className='w-full'>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className='from-primary/5 to-primary/10 bg-gradient-to-r px-4 py-20'>
        <div className='mx-auto max-w-4xl space-y-8 text-center'>
          <h2 className='mb-6 text-4xl font-bold'>
            Ready to Begin Your Journey?
          </h2>
          <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
            Join thousands of learners who are already advancing their skills
            and careers with Sahla
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link href='/courses'>
              <Button size='lg' className='group'>
                Browse Courses
                <ChevronRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
            <Link href='/dashboard'>
              <Button
                size='lg'
                variant='outline'
                className='bg-background/80 hover:bg-background'
              >
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
