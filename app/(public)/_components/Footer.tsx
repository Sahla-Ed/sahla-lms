"use client";

import { useState } from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Twitter,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import RenderFooterSection from "@/components/RenderFooterSection";

const footerLinks = {
  support: ["Contact us", "Help Center", "FAQs", "Technical Support", "Live Chat"],
  courses: [
    "Browse Courses",
    "Free Courses",
    "Certificates",
    "Course Catalog",
    "Learning Paths",
  ],
  about: ["About us", "Our Mission", "Careers", "Instructor Program"],
  community: [
    "Student Community",
    "Discussion Forums",
    "Study Groups",
    "Success Stories",
  ],
};

const benefits = [
  "24/7 Learning Support",
  "Expert Instructors",
  "Certificate Programs",
  "Interactive Learning",
  "Lifetime Access",
  "Student Community",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleSubmit = () => {
    // Email validation
    if (!email || !email.includes('@')) {
      setShowErrorDialog(true);
      return;
    }

    // Show success dialog
    setShowSuccessDialog(true);
    
    // Clear email field
    setEmail("");
    
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
    <footer className="bg-muted text-muted-foreground py-10 border-t">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side - Newsletter Text */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl font-light mb-16 leading-tight">
              Join our learning community and unlock your potential.
            </h2>
          </div>

          {/* Right Side - Form & Social */}
          <div className="lg:col-span-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Input
                type="email"
                placeholder="Email Address*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-muted-foreground/30 placeholder:text-muted-foreground focus:border-foreground"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button
                onClick={handleSubmit}
                className="px-8 bg-foreground text-background hover:bg-foreground/90"
              >
                Subscribe
              </Button>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-muted-foreground mb-4 font-medium">
                Connect with us
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 hover:scale-110 transition-all duration-300 ease-in-out transform p-2 rounded-full"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 hover:scale-110 transition-all duration-300 ease-in-out transform p-2 rounded-full"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 hover:scale-110 transition-all duration-300 ease-in-out transform p-2 rounded-full"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 hover:scale-110 transition-all duration-300 ease-in-out transform p-2 rounded-full"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Images - Educational themed */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square rounded-lg overflow-hidden w-full h-40 sm:h-48 lg:h-56">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&fit=crop"
                  alt="Students learning"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden w-full h-40 sm:h-48 lg:h-56">
                <Image
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop"
                  alt="Online learning"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Thin divider line */}
        <div className="border-t border-sidebar-foreground"></div>
        
        {/* Footer Links positioned next to images and Benefits Banner below */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
          {/* Footer Links */}
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">
            <RenderFooterSection
              title="Support"
              links={footerLinks.support}
              type="support"
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
            <RenderFooterSection
              title="Courses"
              links={footerLinks.courses}
              type="courses"
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
            <RenderFooterSection
              title="About"
              links={footerLinks.about}
              type="about"
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
            <RenderFooterSection
              title="Community"
              links={footerLinks.community}
              type="community"
              hoveredSection={hoveredSection}
              hoveredIndex={hoveredIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          </div>

          {/* Benefits Banner positioned below images */}
          <div className="lg:col-span-3 overflow-hidden">
            <Marquee speed={50} gradient={false}>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center whitespace-nowrap"
                >
                  <span className="text-sm text-primary mx-8">{benefit}</span>
                  <span className="text-orange-500 text-xs">●</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      {/* Thin divider line */}
      <div className="border-t border-sidebar-foreground"></div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <Link
              href="#"
              className="text-primary hover:text-primary-foreground transition-colors"
            >
              Terms & conditions
            </Link>
            <Link
              href="#"
              className="text-primary hover:text-primary-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-primary hover:text-primary-foreground transition-colors"
            >
              Student Agreement
            </Link>
          </div>
          <p className="text-primary hover:text-primary-foreground">
            © Sahla Learning Platform 2025
          </p>
        </div>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-semibold text-center">
              🎉 Thank You!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base leading-relaxed">
              Your email has been successfully registered to our newsletter.
              <br />
              We&quot;ll be in touch soon with the latest courses and exclusive offers from Sahla Learning Platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowSuccessDialog(false)}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Great!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Alert Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-semibold text-center text-destructive">
              ⚠️ Invalid Email
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base leading-relaxed">
              Please enter a valid email address to subscribe to our newsletter.
              <br />
              Make sure your email includes an &quot;@&quot; symbol and domain.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowErrorDialog(false)}
              className="w-full bg-destructive hover:bg-destructive/90"
            >
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </footer>
  );
}