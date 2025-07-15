"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Gamepad2, BarChart3 } from "lucide-react";

interface featureProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const features: featureProps[] = [
  {
    title: "Empower Your Teaching",
    description:
      "Seamless tools for instructors to create, publish, and manage high-quality educational content with ease.",
    icon: BookOpen,
  },
  {
    title: "Discover Your Learning Path",
    description:
      "Students easily find relevant courses and engage with modern, interactive content tailored to their needs.",
    icon: Gamepad2, 
  },
  {
    title: "Diverse & In-Demand Content",
    description:
      "Access a rich library of specialized courses, continuously updated to align with current industry demands.",
    icon: BarChart3, 
  },
];

export default function Home() {
  const [lineFullWidth, setLineFullWidth] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      requestAnimationFrame(() => {
        setLineFullWidth(true);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/shlavv.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

        <div className="relative z-20 text-white w-full px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-start">
            <Badge variant="outline" className="mb-8 bg-white/10 text-white border-white/30 backdrop-blur-sm">
              The Future of Online Education
            </Badge>

            <h1 className="text-[60px] md:text-[100px] lg:text-[120px] font-light mb-6 leading-none tracking-tight">
              Elevate Your Learning
            </h1>

            <div
              className={`h-px bg-white transition-all duration-[2000ms] ease-in-out ${
                lineFullWidth ? "w-full" : "w-0"
              }`}
            />
            
            <div className="w-full flex justify-between items-center mt-6 flex-wrap gap-y-4">
              <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl">
                Discover a new way to learn with our modern, interactive learning management system. Access high-quality courses anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="group relative bg-white/10 hover:bg-white/15 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-500 px-10 py-4 rounded-full text-lg font-light overflow-hidden"
                >
                  <Link href="/courses" className="relative z-10">
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                      Explore Courses
                    </span>
                    <span className="absolute inset-0 inline-block transition-transform duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      Explore Courses
                    </span>
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="group relative bg-transparent text-white border border-white/50 hover:border-white/70 backdrop-blur-sm transition-all duration-500 px-10 py-4 rounded-full text-lg font-light overflow-hidden"
                >
                  <Link href="/login" className="relative z-10">
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                      Sign In
                    </span>
                    <span className="absolute inset-0 inline-block transition-transform duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      Sign In
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Experience the future of education with our comprehensive learning ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
             <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/50 dark:bg-white/10 backdrop-blur-sm hover:-translate-y-2 hover:bg-white/80 dark:hover:bg-white/20"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have already transformed their careers with our platform
          </p>
          <Button 
            size="lg" 
            className="group relative px-12 py-6 text-lg font-medium rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
          >
            <Link href="/register" className="relative z-10">
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                Get Started Today
              </span>
              <span className="absolute inset-0 inline-block transition-transform duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                Get Started Today
              </span>
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}