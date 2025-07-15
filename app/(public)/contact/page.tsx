import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { ContactForm } from "../_components/ContactForm";


export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
              Contact Us
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
              Ready to start your learning journey or share your expertise? We&apos;d love to hear from you.  
              Fill out the form below and we&apos;ll get back to you soon.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <ContactForm />
      </section>

      <section className="py-16 px-4 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="border-0 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-sm text-muted-foreground">
                  Get in touch via email and we&apos;ll respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground">
                  Speak directly with our team for immediate assistance
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Start a conversation with our support team right away
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}