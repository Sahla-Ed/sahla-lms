import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserCheck,
  BookOpen,
  Award,
  Shield,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Agreement | Sahla",
  description: "Student rights and responsibilities on Sahla platform.",
};

const sections = [
  {
    icon: <UserCheck className="h-6 w-6 text-primary" />,
    title: "Code of Conduct",
    content:
      "Maintain respectful behavior and academic integrity in all interactions with fellow students, instructors, and platform content.",
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: "Learning Responsibilities",
    content:
      "Complete coursework actively and engage meaningfully with the learning materials and community discussions.",
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: "Certification Standards",
    content:
      "Work independently and honestly for valid certificates. All assessments must reflect your own understanding and effort.",
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Account Security",
    content:
      "Keep your login credentials secure and report any unauthorized access immediately to our support team.",
  },
];

const rights = [
  "Access to high-quality educational content",
  "Responsive customer support and assistance",
  "Safe and inclusive learning environment",
  "Complete privacy protection and data security",
  "Fair assessment and certification processes",
  "Transparent communication about course updates",
];

const responsibilities = [
  "Maintain academic integrity in all coursework",
  "Show respectful behavior toward all community members",
  "Keep account credentials secure and confidential",
  "Participate actively in learning activities",
  "Follow platform guidelines and terms of service",
  "Provide constructive feedback when requested",
];

export default function StudentAgreementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <Badge
              variant="outline"
              className="text-primary border-primary/20 bg-primary/5"
            >
              Student Agreement
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Student Agreement
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
              Your rights and responsibilities as a valued member of the Sahla
              learning community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-card to-green-50/30">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center space-x-3">
                <div className="p-2 rounded-full bg-green-100">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <span>Your Rights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rights.map((right, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground leading-relaxed">
                    {right}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
                <span>Your Responsibilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {responsibilities.map((resp, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground leading-relaxed">
                    {resp}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Key Guidelines</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Essential principles that ensure a positive learning experience
              for everyone
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 bg-gradient-to-br from-card to-accent/5"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      {section.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Support & Resources</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access the help and resources you need for a successful learning
              journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-card to-accent/5">
              <CardHeader className="text-center">
                <div className="mx-auto p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 w-fit">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Support Team</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Get help when you need it most
                </p>
                <Button className="w-full">Contact Support</Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-card to-accent/5">
              <CardHeader className="text-center">
                <div className="mx-auto p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 w-fit">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Learning Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Best practices for success
                </p>
                <Button variant="outline" className="w-full">
                  View Guidelines
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-card to-accent/5">
              <CardHeader className="text-center">
                <div className="mx-auto p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 w-fit">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Certifications</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Learn about our certification process
                </p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of learners who are already advancing their skills
            and careers with Sahla
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="group">
                Browse Courses
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="bg-background/80 hover:bg-background"
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
