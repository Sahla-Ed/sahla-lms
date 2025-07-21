import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Shield, Users, BookOpen, CreditCard, Gavel, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | Sahla",
  description: "Read the terms and conditions for using the Sahla learning platform.",
};

const sections = [
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Introduction",
    content: "Welcome to Sahla. By using our platform, you agree to these terms and conditions."
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "User Accounts",
    content: "Create an account with accurate information. Keep your login details secure and notify us of any unauthorized access."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: "Course Access",
    content: "Enrolled courses are for personal use only. Lifetime access provided unless policy violations occur."
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Intellectual Property",
    content: "All content is protected by copyright. No reproduction or distribution without written permission."
  },
  {
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    title: "Payment & Refunds",
    content: "Payment required at enrollment. 30-day money-back guarantee if less than 30% completed."
  },
  {
    icon: <Gavel className="h-6 w-6 text-primary" />,
    title: "Code of Conduct",
    content: "Maintain respectful behavior. No harassment, hacking, or commercial use without authorization."
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-primary" />,
    title: "Disclaimers",
    content: "Platform provided 'as is' without warranties. Our liability is limited to course fees paid."
  },
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: "Contact & Updates",
    content: "Terms may be updated with notification. Contact support for questions or concerns."
  }
];

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
     
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
              Legal Document
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
              Essential terms and guidelines for using the Sahla learning platform safely and effectively.
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

      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold mb-6">Need Clarification?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our support team is ready to help you understand these terms and answer any questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="group">
                Contact Support
                <Mail className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/privacy-policy">
              <Button size="lg" variant="outline" className="bg-background/80 hover:bg-background">
                Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}