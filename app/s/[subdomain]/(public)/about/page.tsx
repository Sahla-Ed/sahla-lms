import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChevronRight,
  Users,
  Target,
  Zap,
  Globe,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
// import { OurTeamSection } from '@/components/sections/OurTeamSection';

export const metadata: Metadata = {
  title: 'About Sahla | Empowering Learners Across the Globe',
  description:
    "Learn more about Sahla – our mission, values, and vision. We're committed to making high-quality education accessible, engaging, and transformative for everyone.",
};

const values = [
  {
    icon: <Target className='text-primary h-8 w-8' />,
    title: 'Mission-Driven',
    description:
      "We're committed to making quality education accessible to everyone, everywhere.",
  },
  {
    icon: <Zap className='text-primary h-8 w-8' />,
    title: 'Innovation First',
    description:
      'Leveraging cutting-edge technology to create engaging learning experiences.',
  },
  {
    icon: <Users className='text-primary h-8 w-8' />,
    title: 'Community Focus',
    description:
      'Building a supportive learning community where students and instructors thrive together.',
  },
  {
    icon: <Globe className='text-primary h-8 w-8' />,
    title: 'Global Impact',
    description:
      "Empowering learners worldwide with skills that matter in today's digital economy.",
  },
];

const features = [
  {
    icon: <BookOpen className='text-primary h-12 w-12' />,
    title: 'Comprehensive Course Library',
    description:
      'Access thousands of courses across various disciplines, from beginner to advanced levels, designed by industry experts and academic professionals.',
  },
  {
    icon: <GraduationCap className='text-primary h-12 w-12' />,
    title: 'Expert Instructors',
    description:
      'Learn from experienced professionals and certified educators who bring real-world expertise and proven teaching methodologies to every course.',
  },
  {
    icon: <MessageSquare className='text-primary h-12 w-12' />,
    title: 'Interactive Learning',
    description:
      'Engage with dynamic content including video lectures, interactive quizzes, hands-on projects, and collaborative discussions with peers.',
  },
  {
    icon: <Award className='text-primary h-12 w-12' />,
    title: 'Certification & Recognition',
    description:
      'Earn industry-recognized certificates upon course completion and showcase your achievements to potential employers and colleagues.',
  },
];

const benefits = {
  students: [
    'Access courses anytime, anywhere with our mobile-friendly platform',
    'Learn at your own pace with flexible scheduling and lifetime access',
    'Connect with a global community of learners and industry professionals',
    'Get personalized learning recommendations based on your goals',
    'Receive direct feedback and support from instructors and mentors',
    'Build a portfolio of certified skills to advance your career',
  ],
  instructors: [
    'Reach students worldwide and grow your teaching impact',
    'Monetize your expertise with competitive revenue sharing',
    'Access comprehensive tools for course creation and management',
    'Get marketing support to promote your courses effectively',
    'Join a community of educators and share best practices',
    'Receive detailed analytics to track student engagement and success',
  ],
};

const teamMembers = [
  {
    name: 'Mohamed Badran',
    role: 'Full-Stack Developer',
    image: '/team/badran.jpeg',
    bio: 'Full-Stack Developer with MERN specialization',
    github: 'https://github.com/B-a-d-r-a-n',
    linkedin: 'https://www.linkedin.com/in/mohamed-ahmed-badran/',
  },
  {
    name: 'Mohammed Saleh',
    role: 'Full-Stack Developer',
    image: '/team/saled.jpg',
    bio: 'Full-Stack Developer with MERN specialization',
    github: 'https://github.com/mosaleh-dev',
    linkedin: 'https://www.linkedin.com/in/mosaleh-dev/',
  },
  {
    name: 'Eslam Rizk',
    role: 'Full-Stack Developer',
    image: '/team/rizkk.jpeg',
    bio: 'Full-Stack Developer with MERN specialization',
    github: 'https://github.com/Eslam-Rizk',
    linkedin: 'https://www.linkedin.com/in/eslam-rizk-6a029a145/',
  },
  {
    name: 'Amr Ibrahim',
    role: 'Full-Stack Developer',
    image: '/team/tolba.jpg',
    bio: 'Full-Stack Developer with MERN specialization',
    github: 'https://github.com/amr-ibrahim7',
    linkedin: 'https://www.linkedin.com/in/amribrahimwebdev/',
  },
  {
    name: 'Mohamed Elnagar',
    role: 'Full-Stack Developer',
    image: '/team/elnegar.jpeg',
    bio: 'Full-Stack Developer with MERN specialization',
    github: 'https://github.com/Mohamed-Elnagar7',
    linkedin: 'https://www.linkedin.com/in/mohamed-elnegar/',
  },
];

export default function AboutPage() {
  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
      {/* Hero Section */}
      <section className='relative px-4 py-20'>
        <div className='mx-auto max-w-7xl'>
          <div className='space-y-8 text-center'>
            <Badge
              variant='outline'
              className='text-primary border-primary/20 bg-primary/5'
            >
              About Sahla
            </Badge>
            <h1 className='from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl'>
              Transforming Education
            </h1>
            <p className='text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed'>
              We&apos;re on a mission to democratize quality education through
              innovative technology, expert instruction, and a supportive
              learning community that empowers students to achieve their goals.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className='px-4 py-20'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>
              What Makes Sahla Special
            </h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
              Discover the features and tools that make learning and teaching
              more effective and enjoyable
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'
              >
                <CardHeader>
                  <div className='bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 w-fit rounded-full p-4 transition-colors duration-300'>
                    {feature.icon}
                  </div>
                  <CardTitle className='text-center text-2xl'>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground text-center leading-relaxed'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className='bg-muted/10 px-4 py-20'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>How Sahla Benefits You</h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
              Whether you&apos;re here to learn new skills or share your
              expertise, Sahla provides the tools and community you need to
              succeed
            </p>
          </div>

          <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
            {/* For Students */}
            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-all duration-300 hover:shadow-xl'>
              <CardHeader>
                <CardTitle className='text-primary text-center text-2xl'>
                  For Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {benefits.students.map((benefit, index) => (
                    <div key={index} className='flex items-start space-x-3'>
                      <div className='bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
                      <p className='text-muted-foreground leading-relaxed'>
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* For Instructors */}
            <Card className='from-card to-secondary/5 border-0 bg-gradient-to-br transition-all duration-300 hover:shadow-xl'>
              <CardHeader>
                <CardTitle className='text-primary text-center text-2xl'>
                  For Instructors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {benefits.instructors.map((benefit, index) => (
                    <div key={index} className='flex items-start space-x-3'>
                      <div className='bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
                      <p className='text-muted-foreground leading-relaxed'>
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='px-4 py-20'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>Our Core Values</h2>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
              The principles that guide everything we do and shape our approach
              to education
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {values.map((value, index) => (
              <Card
                key={index}
                className='group from-card to-accent/5 border-0 bg-gradient-to-br transition-all duration-500 hover:scale-105 hover:shadow-2xl'
              >
                <CardHeader className='text-center'>
                  <div className='bg-primary/10 group-hover:bg-primary/20 mx-auto w-fit rounded-full p-3 transition-colors duration-300'>
                    {value.icon}
                  </div>
                  <CardTitle className='text-xl'>{value.title}</CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                  <p className='text-muted-foreground leading-relaxed'>
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <OurTeamSection teamMembers={teamMembers} /> */}

      {/* CTA Section */}
      <section className='from-primary/5 to-primary/10 bg-gradient-to-r px-4 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='mb-6 text-4xl font-bold'>
            Ready to Start Your Learning Journey?
          </h2>
          <p className='text-muted-foreground mx-auto mb-8 max-w-2xl text-xl'>
            Discover new skills, advance your career, and connect with a global
            community of learners on Sahla
          </p>

          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link href='/courses'>
              <Button size='lg' className='group'>
                Explore Courses
                <ChevronRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>

            <Link href='/contact'>
              <Button
                size='lg'
                variant='outline'
                className='bg-background/80 hover:bg-background'
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
