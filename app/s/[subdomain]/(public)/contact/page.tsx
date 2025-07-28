import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { ContactForm } from '../_components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with Sahla',
  description:
    "Have questions or need support? Reach out to the Sahla team through our contact page. We're here to help with course inquiries, feedback, or collaboration opportunities.",
};

export default function ContactUsPage() {
  return (
    <div className='from-background via-background to-muted/20 min-h-screen bg-gradient-to-br'>
      <section className='relative px-4 py-20'>
        <div className='mx-auto max-w-4xl'>
          <div className='space-y-8 text-center'>
            <Badge
              variant='outline'
              className='text-primary border-primary/20 bg-primary/5'
            >
              Contact Us
            </Badge>
            <h1 className='from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl'>
              Get in Touch
            </h1>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed'>
              Ready to start your learning journey or share your expertise?
              We&apos;d love to hear from you. Fill out the form below and
              we&apos;ll get back to you soon.
            </p>
          </div>
        </div>
      </section>

      <section className='px-4 py-20'>
        <ContactForm />
      </section>

      <section className='bg-muted/10 px-4 py-16'>
        <div className='mx-auto max-w-4xl'>
          <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-3'>
            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <Mail className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>Email Us</h3>
                <p className='text-muted-foreground text-sm'>
                  Get in touch via email and we&apos;ll respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <Phone className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>Call Us</h3>
                <p className='text-muted-foreground text-sm'>
                  Speak directly with our team for immediate assistance
                </p>
              </CardContent>
            </Card>

            <Card className='from-card to-primary/5 border-0 bg-gradient-to-br transition-shadow hover:shadow-lg'>
              <CardContent className='pt-6'>
                <MessageCircle className='text-primary mx-auto mb-4 h-8 w-8' />
                <h3 className='mb-2 font-semibold'>Live Chat</h3>
                <p className='text-muted-foreground text-sm'>
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
