'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { Metadata } from 'next';
import DarkVeil from '@/components/Bits/DarkVeil';
import Lms1 from '@/public/logosss/udemy.png';
import Lms2 from '@/public/logosss/mesq.png';
import Lms3 from '@/public/logosss/tech.png';
import { cn } from '@/lib/utils';

// export const metadata: Metadata = {
//   title: 'Sahla LMS | The Ultimate Platform for Educators and Course Creators',
//   description: 'Empower your teaching with Sahla LMS - create, manage, and scale your online courses with ease.',
// };

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-[var(--font-inter)] text-slate-800 dark:text-slate-100 overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
        style={{ backgroundColor: '#0a0a29' }}
      >
        <div className="absolute inset-0 z-0 h-full w-full">
          <DarkVeil
            hueShift={25}
            noiseIntensity={0.03}
            scanlineIntensity={0.08}
            speed={0.4}
            warpAmount={6}
          />
        </div>

        <div
          className="relative z-10 max-w-6xl px-6 text-center text-white py-10"
        >
          <div
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full px-6 py-2 mb-8 text-sm font-medium animate-fade-in-up animate-delay-200"
          >
            Built for Educators by Educators
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200 animate-fade-in-up animate-delay-400"
          >
            Your Knowledge.<br/>
            <span className="text-blue-500">Your Classroom.</span><br/>
            Your Success.
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-12 max-w-3xl mx-auto animate-fade-in-up animate-delay-600"
          >
            The complete learning platform designed specifically for educators and instructors who want to share their expertise with the world.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animate-delay-800"
          >
            <a
              href="/start"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-base sm:text-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Start Your Free 14-Day Trial
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-white/10 text-white font-bold text-base sm:text-lg border-2 border-white/30 hover:bg-white/20 backdrop-blur-sm transition-all transform hover:scale-105"
            >
              Schedule a Demo
            </a>
          </div>

          <div
            className="mt-10 text-blue-200/70 text-sm animate-fade-in-up animate-delay-1000"
          >
            No credit card required • Full access for 14 days • Cancel anytime
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div
            className="text-white/60 cursor-pointer animate-bounce animate-infinite animate-duration-[2000ms]"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950
 border-y border-blue-100 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">5,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400">Active Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">100,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400">Students Taught</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">15,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400">Active Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">99.9%</div>
              <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500 dark:text-slate-400 uppercase text-sm font-semibold tracking-wide mb-10">
            Trusted by leading educators worldwide
          </p>
          <div className="flex flex-wrap items
-center justify-center gap-12 md:gap-16 lg:gap-20">
            <Image
              src={Lms1}
              alt="Client Logo 1"
              width={140}
              height={45}
              className="h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
            <Image
              src={Lms2}
              alt="Client Logo 2"
              width={140}
              height={45}
              className="h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
            <Image
              src={Lms3}
              alt="Client Logo 3"
              width={140}
              height={45}
              className="h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <div className="text-blue-600 dark:text-blue-400 font-medium mb-4">
              Designed for Educators
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              All the Tools You Need to <span className="text-blue-600 dark:text-blue-400">Teach Effectively</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Our platform is designed with educators in mind, providing a comprehensive set of tools to create, manage, and scale your online courses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "bg-white dark:bg-slate-800 rounded-xl p-5 sm:p-8 shadow-lg shadow-blue-100 dark:shadow-slate-900/80 hover:shadow-xl hover:shadow-blue-200/80 dark:hover:shadow-blue-900/30 transition-all group",
                  "animate-fade-in-up animate-delay-[calc(200ms*var(--index))]"
                )}
                style={{ '--index': index } as React.CSSProperties}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors">
                  {feature.icon && React.createElement(feature.icon, { size: 24 })}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <div className="text-blue-600 dark:text-blue-400 font-medium mb-4">
              Simple Process
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Launch Your Academy in <span className="text-blue-600 dark:text-blue-400">Three Easy Steps</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              We've streamlined the process of setting up your online teaching platform so you can focus on what matters most - your content and your students.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 transform -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-white dark:bg-slate-800 rounded-xl p-5 sm:p-8 shadow-lg shadow-blue-100 dark:shadow-slate-900/80 relative z-10",
                    "animate-fade-in-up animate-delay-[calc(300ms+200ms*var(--index))]"
                  )}
                  style={{ '--index': index } as React.CSSProperties}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base sm:text-lg mb-4 sm:mb-6 mx-auto">
                    {index + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <div className="text-blue-200 font-medium mb-4">
              Success Stories
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              What Our Educators Say
            </h2>
            <p className="text-lg text-blue-100">
              Join thousands of educators who have transformed their teaching with Sahla LMS.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="min-h-[250px] md:min-h-[200px] relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl transition-all duration-500",
                    activeTestimonial === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  )}
                >
                  <div className="flex flex-col h-full">
                    <blockquote className="testimonial-blockquote flex-grow mb-4 px-4">
                      <p className="text-sm sm:text-base md:text-lg font-light">
                        {testimonial.quote}
                      </p>
                    </blockquote>
                    <div className="flex items-center mt-auto">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-400/20 flex items-center justify-center text-base sm:text-lg font-bold text-white flex-shrink-0">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <p className="font-bold text-sm sm:text-base">{testimonial.author}</p>
                        <p className="text-blue-200 text-xs sm:text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 space-x-3">
              {testimonials.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`testimonial-dot ${activeTestimonial === index ? "active" : ""}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <div className="text-blue-600 dark:text-blue-400 font-medium mb-4">
              Transparent Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Choose the Perfect <span className="text-blue-600 dark:text-blue-400">Plan</span> for Your Needs
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              From individual instructors to large educational organizations, we have a plan that fits your requirements and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-2xl overflow-hidden relative animate-fade-in-up animate-delay-[calc(200ms*var(--index))]",
                  plan.popular
                    ? "bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-600/20 scale-105 z-10"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                )}
                style={{ '--index': index } as React.CSSProperties}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-xs font-bold uppercase py-1 px-3 tracking-wider text-white">
                    Most Popular
                  </div>
                )}

                <div className="p-5 sm:p-8">
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${plan.popular ? "text-white" : ""}`}>{plan.title}</h3>
                  <p className={`${plan.popular ? "text-blue-100" : "text-slate-600 dark:text-slate-400"} mb-4 sm:mb-6 text-sm sm:text-base`}>{plan.description}</p>

                  <div className="mb-4 sm:mb-6">
                    <span className={`text-2xl sm:text-3xl md:text-4xl font-bold ${plan.popular ? "text-white" : ""}`}>{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className={`${plan.popular ? "text-blue-200" : "text-slate-500 dark:text-slate-400"}`}>/month</span>
                    )}
                  </div>

                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className={`w-5 h-5 mr-2 ${plan.popular ? "text-blue-200" : "text-blue-500 dark:text-blue-400"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className={`${plan.popular ? "text-blue-100" : "text-slate-600 dark:text-slate-400"}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.buttonLink}
                    className={`block w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-center font-medium transition-all text-sm sm:text-base ${
                      plan.popular
                        ? "bg-white text-blue-600 hover:bg-blue-50"
                        : "bg-blue-600 hover:bg-blue-700 text-white border border-blue-600"
                    }`}
                  >
                    {plan.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <div className="text-blue-600 dark:text-blue-400 font-medium mb-4">
              Questions & Answers
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Find answers to common questions about our platform, features, and pricing.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="mb-4 border-b border-slate-200 dark:border-slate-700 pb-4"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center py-4 text-left font-medium text-lg"
                >
                  {faq.question}
                  <svg
                    className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform ${
                      activeFaq === index ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                  {activeFaq === index && (
                    <div
                      className="overflow-hidden transition-all duration-300 animate-fade-down"
                    >
                      <div className="pb-4 text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </div>
                    </div>
                  )}

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in-up">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-10 max-w-3xl mx-auto animate-fade-in-up animate-delay-200">
            Join thousands of educators who are already using Sahla LMS to create engaging courses and grow their teaching business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
            <a
              href="/start"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-white text-blue-600 font-bold text-base sm:text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Free 14-Day Trial
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-transparent text-white font-bold text-base sm:text-lg border-2 border-white hover:bg-white/10 transition-all transform hover:scale-105"
            >
              Schedule a Demo
            </a>
          </div>
          <p className="mt-8 text-blue-200 text-sm">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}

// Data

const features = [
  {
    title: "Multi-tenant Academies",
    description: "Launch and manage multiple branded learning platforms with unique subdomains from a single dashboard.",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    )
  },
  {
    title: "Intuitive Course Builder",
    description: "Create engaging multimedia courses with our drag-and-drop editor - no technical skills required.",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 12h20M16 12l-4-4M16 12l-4 4"></path>
      </svg>
    )
  },
  {
    title: "Interactive Assessments",
    description: "Create quizzes, assignments, and interactive exercises to test student understanding and provide feedback.",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 11l3 3L22 4"></path>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
      </svg>
    )
  },
  {
    title: "Custom Branding",
    description: "Personalize your academy with your logo, colors, and custom domain to create a professional learning environment.",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 3v12"></path>
        <circle cx="18" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <path d="M18 9a9 9 0 0 1-9 9"></path>
      </svg>
    )
  },
  {
    title: "Student Management",
    description: "Easily track student progress, communicate with learners, and manage enrollments from a centralized dashboard.",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    title: "Integrated Payments",
    description: "Accept payments for courses with our seamless Stripe integration, manage subscriptions, and track revenue.",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    title: "Learning Paths",
    description: "Create structured learning journeys with prerequisites, certificates, and personalized learning paths.",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    )
  },
  {
    title: "Detailed Analytics",
    description: "Track student engagement, course completion rates, and revenue with comprehensive analytics and reports.",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    )
  },
  {
    title: "Interactive Coding",
    description: "Built-in code editors for tech courses with real-time syntax highlighting, execution and feedback.",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    )
  }
];

const steps = [
  {
    title: "Set Up Your Academy",
    description: "Choose your subdomain, customize your branding, and configure payment settings in minutes."
  },
  {
    title: "Create Your Courses",
    description: "Upload videos, create quizzes, and organize your content into a structured curriculum."
  },
  {
    title: "Launch & Scale",
    description: "Publish your courses, market to your audience, and use analytics to grow your teaching business."
  }
];

const testimonials = [
  {
    quote: "Sahla transformed my teaching business. I created separate academies for different subjects while managing everything from one dashboard.",
    author: "Dr. Sarah Johnson",
    role: "Professor & Online Educator"
  },
  {
    quote: "With minimal technical skills, I created a professional academy in hours. The interface is intuitive and the support is outstanding.",
    author: "Michael Chen",
    role: "Independent Course Creator"
  },
  {
    quote: "The analytics helped me identify where students struggled. My completion rates increased by 65% after implementing changes.",
    author: "Rebecca Torres",
    role: "Language Instructor"
  },
  {
    quote: "Sahla offers the perfect balance of powerful features and ease of use. Students love the interactive coding tools.",
    author: "David Patel",
    role: "Programming Instructor"
  }
];

const plans = [
  {
    title: "Starter",
    price: "$49",
    description: "Perfect for individual instructors just getting started",
    popular: false,
    features: [
      "1 Academy Subdomain",
      "Unlimited Students",
      "Up to 5 Courses",
      "Basic Analytics",
      "Standard Support",
      "Stripe Integration",
      "Student Management"
    ],
    buttonText: "Start Free Trial",
    buttonLink: "/start"
  },
  {
    title: "Professional",
    price: "$99",
    description: "For growing educators and small teams",
    popular: true,
    features: [
      "3 Academy Subdomains",
      "Unlimited Students",
      "Unlimited Courses",
      "Advanced Analytics",
      "Priority Support",
      "Custom Domain",
      "Team Access",
      "Learning Paths",
      "Interactive Coding"
    ],
    buttonText: "Start Free Trial",
    buttonLink: "/start"
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "For educational institutions and large teams",
    popular: false,
    features: [
      "10+ Academy Subdomains",
      "Unlimited Everything",
      "White-label Solution",
      "API Access",
      "Dedicated Support",
      "SSO Integration",
      "Custom Development",
      "Enterprise Security",
      "Priority Hosting"
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact"
  }
];

const faqs = [
  {
    question: "What is a multi-tenant LMS?",
    answer: "A multi-tenant LMS allows you to create and manage multiple learning platforms from a single dashboard. With Sahla, you can launch multiple branded academies, each with their own subdomain, courses, and students."
  },
  {
    question: "Do I need technical skills to use Sahla?",
    answer: "Not at all! Sahla is designed with educators in mind, with an intuitive interface that makes it easy for anyone to set up their learning platform, create courses, and manage students without any technical knowledge."
  },
  {
    question: "How do payments work?",
    answer: "Sahla integrates with Stripe to handle all payment processing. You can set up one-time payments, subscriptions, or payment plans for your courses. We charge a small transaction fee on the Starter plan, while Pro and Enterprise plans have reduced fees."
  },
  {
    question: "Can I migrate from another platform?",
    answer: "Yes! We offer migration services to help you move your content and student data from other platforms like Teachable, Thinkific, or Kajabi. Contact our support team for assistance with migrating your existing courses."
  },
  {
    question: "What kind of support do you provide?",
    answer: "All plans include email support. Professional plans get priority email support with faster response times. Enterprise plans include dedicated support with a named account manager and phone support."
  }
];
