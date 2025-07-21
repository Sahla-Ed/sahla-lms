import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Database, Eye, Shield, Share2, Settings, Cookie, FileCheck, ChevronRight, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Sahla",
  description: "Learn how Sahla collects, uses, and protects your personal data.",
};

const sections = [
  {
    icon: <Database className="h-6 w-6 text-primary" />,
    title: "Information We Collect",
    content: "We collect information you provide (name, email, profile), payment details, learning progress, support communications, and technical data (IP address, browser, device info) to improve our services."
  },
  {
    icon: <Eye className="h-6 w-6 text-primary" />,
    title: "How We Use Your Information", 
    content: "We use your data to provide our services, process payments, personalize learning, send updates, provide support, analyze usage, and ensure security."
  },
  {
    icon: <Share2 className="h-6 w-6 text-primary" />,
    title: "Information Sharing",
    content: "We share data only with instructors (for course progress), service providers (under confidentiality), for legal compliance, with your consent, or during business transfers."
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Data Security",
    content: "We use encryption, secure authentication, regular audits, and access controls to protect your data. However, no system is 100% secure."
  },
  {
    icon: <Cookie className="h-6 w-6 text-primary" />,
    title: "Cookies & Tracking",
    content: "We use essential, performance, functional, and analytics cookies. You can control cookie settings through your browser."
  },
  {
    icon: <Settings className="h-6 w-6 text-primary" />,
    title: "Your Rights",
    content: "You can access, update, delete your data, opt out of marketing, request data portability, and withdraw consent through your account dashboard."
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">

      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
              Privacy & Security
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information with complete transparency.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 bg-gradient-to-br from-card to-accent/5">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {section.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {index + 1}. {section.title}
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
      </section>

      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Contact Our Privacy Team</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Have questions about this Privacy Policy? Our dedicated privacy team is here to help you understand how we protect your data.
              </p>
              <div className="text-muted-foreground">
                <p className="font-medium">Email: privacy@sahla.com</p>
                <p className="text-sm">Response time: Within 48 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold mb-6">Manage Your Privacy Settings</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take control of your data and privacy preferences through your personalized account dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/privacy">
              <Button size="lg" className="group">
                Privacy Settings
                <Settings className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
              </Button>
            </Link>
            <Link href="/terms-and-conditions">
              <Button size="lg" variant="outline" className="bg-background/80 hover:bg-background">
                Terms & Conditions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}