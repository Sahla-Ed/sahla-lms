'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MessageCircle, MapPin, Clock, ChevronDown } from 'lucide-react';
import { ContactForm } from '@/app/s/[subdomain]/(public)/_components/ContactForm';
import { Metadata } from 'next';
import { DarkVeil } from '@/components/ui/dark-veil';

// export const metadata: Metadata = {
//   title: 'Contact Us | Sahla LMS',
//   description:
//     "Have questions or need support? Reach out to the Sahla team through our contact page. We're here to help with inquiries, feedback, or collaboration opportunities.",
// };

export default function ContactUsPage() {
  return (
    <div className="font-[var(--font-inter)] text-slate-800 dark:text-slate-100 overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex flex-col justify-center items-center overflow-hidden"
        style={{ backgroundColor: '#0a0a29' }}
      >
        <div className="absolute inset-0 z-0 h-full w-full">
          <DarkVeil
            hueShift={40}
            noiseIntensity={0.03}
            scanlineIntensity={0.08}
            speed={0.3}
            warpAmount={5}
          />
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center text-white py-10 animate-fade-in-up">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full px-6 py-2 mb-8 text-sm font-medium">
            We'd Love To Hear From You
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200">
            Get in Touch
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Ready to elevate your learning platform? We'd love to hear from you.
            Fill out the form below and we'll get back to you soon.
          </p>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div
            className="text-white/60 cursor-pointer animate-bounce animate-infinite animate-duration-[2000ms]"
            onClick={() => {
              document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    Get in touch via email and we'll respond within 24 hours
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    info@sahla.com
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    Speak directly with our team for immediate assistance
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    +1 (555) 123-4567
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    Start a conversation with our support team right away
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    Available 9 AM - 5 PM EST
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Our Office</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    123 Learning Lane, Suite 400
                    <br />
                    Knowledge City, KC 90210
                    <br />
                    Country
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Monday - Friday: 9:00 AM - 5:00 PM
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 relative h-[400px] bg-gray-200 dark:bg-slate-800">
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 opacity-75 z-10 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Map Placeholder</h3>
            <p className="text-slate-600 dark:text-slate-400">
              An interactive map would be displayed here in a production environment
            </p>
          </div>
        </div>
        <div className="absolute inset-0 z-0 opacity-25">
          {/* Map would be rendered here */}
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-blue-100 dark:from-slate-700 dark:to-slate-900"></div>
        </div>
      </section>
    </div>
  );
}
