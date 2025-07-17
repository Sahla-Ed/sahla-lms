import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Book, Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Sahla",
  description: "Find answers to the most common questions about Sahla. Learn about account management, payments, course features, and more.",
};

const faqCategories = {
  "Account Management": [
    { q: "How do I create an account?", a: "You can create an account using your email and a password, or by signing in with a social provider like Google or GitHub." },
    { q: "How can I update my profile information?", a: "Profile information can be updated in your Dashboard under the 'Settings' or 'Profile' section." }
  ],
  "Courses & Learning": [
    { q: "Do I get lifetime access to courses?", a: "Yes! Once you enroll in a course, you have lifetime access to all its materials, including future updates." },
    { q: "Can I get a certificate after completing a course?", a: "Yes, a verifiable certificate of completion is awarded after you successfully complete all modules and quizzes in a course." }
  ],
  "Payments & Subscriptions": [
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and other popular payment methods through our secure Stripe integration." },
    { q: "Is there a refund policy?", a: "Yes, we offer a 30-day money-back guarantee on all our courses. Please check our refund policy page for more details." }
  ]
};

export default function FaqsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 mb-6">
            <Book className="h-4 w-4 mr-2" />
            FAQs
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mt-4">
            Have a question? We've probably answered it below.
          </p>
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search questions..." className="h-12 pl-12 rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {Object.entries(faqCategories).map(([category, faqs]) => (
            <div key={category}>
              <h2 className="text-3xl font-bold mb-6">{category}</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 border rounded-lg">
                    <AccordionTrigger className="p-6 text-lg text-left hover:no-underline">{faq.q}</AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-base text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
