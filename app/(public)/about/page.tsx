import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Users, Target, Zap, Globe, BookOpen, GraduationCap, MessageSquare, Award, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sahla | Empowering Learners Across the Globe",
  description:
    "Learn more about Sahla – our mission, values, and vision. We're committed to making high-quality education accessible, engaging, and transformative for everyone.",
};


const values = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Mission-Driven",
    description: "We're committed to making quality education accessible to everyone, everywhere."
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Innovation First",
    description: "Leveraging cutting-edge technology to create engaging learning experiences."
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Community Focus",
    description: "Building a supportive learning community where students and instructors thrive together."
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Global Impact",
    description: "Empowering learners worldwide with skills that matter in today's digital economy."
  }
];

const features = [
  {
    icon: <BookOpen className="h-12 w-12 text-primary" />,
    title: "Comprehensive Course Library",
    description: "Access thousands of courses across various disciplines, from beginner to advanced levels, designed by industry experts and academic professionals."
  },
  {
    icon: <GraduationCap className="h-12 w-12 text-primary" />,
    title: "Expert Instructors",
    description: "Learn from experienced professionals and certified educators who bring real-world expertise and proven teaching methodologies to every course."
  },
  {
    icon: <MessageSquare className="h-12 w-12 text-primary" />,
    title: "Interactive Learning",
    description: "Engage with dynamic content including video lectures, interactive quizzes, hands-on projects, and collaborative discussions with peers."
  },
  {
    icon: <Award className="h-12 w-12 text-primary" />,
    title: "Certification & Recognition",
    description: "Earn industry-recognized certificates upon course completion and showcase your achievements to potential employers and colleagues."
  }
];

const benefits = {
  students: [
    "Access courses anytime, anywhere with our mobile-friendly platform",
    "Learn at your own pace with flexible scheduling and lifetime access",
    "Connect with a global community of learners and industry professionals",
    "Get personalized learning recommendations based on your goals",
    "Receive direct feedback and support from instructors and mentors",
    "Build a portfolio of certified skills to advance your career"
  ],
  instructors: [
    "Reach students worldwide and grow your teaching impact",
    "Monetize your expertise with competitive revenue sharing",
    "Access comprehensive tools for course creation and management",
    "Get marketing support to promote your courses effectively",
    "Join a community of educators and share best practices",
    "Receive detailed analytics to track student engagement and success"
  ]
};

const team = [
  {
    name: "Mohamed Badran",
    role: "Full-Stack Developer",
    image: "/team/badran.jpeg",
    bio: "Full-Stack Developer with MERN specialization",
    github: "https://github.com/B-a-d-r-a-n",
    linkedin: "https://www.linkedin.com/in/mohamed-ahmed-badran/"
  },
  {
    name: "Mohammed Saleh",
    role: "Full-Stack Developer",
    image: "/team/saled.jpg",
    bio: "Full-Stack Developer with MERN specialization",
    github: "https://github.com/mosaleh-dev",
    linkedin: "https://www.linkedin.com/in/mosaleh-dev/"
  },
  {
    name: "Eslam Rizk",
    role: "Full-Stack Developer",
    image: "/team/rizkk.jpeg",
    bio: "Full-Stack Developer with MERN specialization",
    github: "https://github.com/Eslam-Rizk",
    linkedin: "https://www.linkedin.com/in/eslam-rizk-6a029a145/"
  },
  {
    name: "Amr Ibrahim",
    role: "Full-Stack Developer",
    image: "/team/tolba.jpg",
    bio: "Full-Stack Developer with MERN specialization",
    github: "https://github.com/amr-ibrahim7",
    linkedin: "https://www.linkedin.com/in/amribrahimwebdev/"
  },
  {
    name: "Mohamed Elnagar",
    role: "Full-Stack Developer",
    image: "/team/elnegar.jpeg",
    bio: "Full-Stack Developer with MERN specialization",
    github: "https://github.com/Mohamed-Elnagar7",
    linkedin: "https://www.linkedin.com/in/mohamed-elnegar/"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
              About Sahla
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Transforming Education
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
              We&apos;re on a mission to democratize quality education through innovative technology, 
              expert instruction, and a supportive learning community that empowers students to achieve their goals.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Makes Sahla Special</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the features and tools that make learning and teaching more effective and enjoyable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-card to-accent/5">
                <CardHeader>
                  <div className="mx-auto p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Sahla Benefits You</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re here to learn new skills or share your expertise, Sahla provides the tools and community you need to succeed 
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Students */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-primary">For Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefits.students.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* For Instructors */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-secondary/5">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-primary">For Instructors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefits.instructors.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape our approach to education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-card to-accent/5">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 w-fit">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind Sahla success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-muted/5">
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/10">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    <Link href={member.github} className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link href={member.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover new skills, advance your career, and connect with a global community of learners on Sahla
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="group">
                Explore Courses
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-background/80 hover:bg-background">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}