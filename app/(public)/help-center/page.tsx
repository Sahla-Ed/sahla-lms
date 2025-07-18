import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LifeBuoy, Book, Wrench, MessageSquare, Search } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | Sahla",
  description:
    "Find answers to your questions and get support for the Sahla platform. Browse FAQs, articles, and contact our support team.",
};

const faqItems = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking the 'Forgot Password' link on the login page. We will send a reset link to your registered email address.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "To enroll, navigate to the course page you are interested in and click the 'Enroll Now' button. You will be guided through the payment and registration process.",
  },
  {
    question: "Where can I find my enrolled courses?",
    answer:
      "All your enrolled courses are available in your personal Dashboard. You can access it by clicking the 'Dashboard' link in the navigation bar after logging in.",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="outline"
            className="text-primary border-primary/20 bg-primary/5 mb-6"
          >
            <LifeBuoy className="h-4 w-4 mr-2" />
            Help Center
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            How can we help?
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mt-4">
            We&apos;re here to assist you. Search for a topic or browse the
            categories below.
          </p>
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="h-14 pl-12 rounded-full text-lg"
            />
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/faqs">
            <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 bg-card/50">
              <CardHeader>
                <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <Book className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>FAQs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find answers to common questions about accounts, courses, and
                  payments.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/technical-support">
            <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 bg-card/50">
              <CardHeader>
                <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get help with technical issues, bugs, and platform
                  performance.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/contact">
            <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 bg-card/50">
              <CardHeader>
                <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Reach out to our support team directly for personalized
                  assistance.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
