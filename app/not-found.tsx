import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Home, Search } from "lucide-react";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Sahla",
  description:
    "The page you are looking for does not exist or has been moved. Please check the URL or return to the homepage.",
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative mb-8">
          <div className="text-[120px] md:text-[200px] font-light text-primary/20 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm">
              <BookOpen className="w-10 h-10 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        <Card className="border-0 bg-white/50 dark:bg-white/10 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/30">
              Page Not Found
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Oops! Page Not Found
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The page you&apos;re looking for might have been moved, deleted, or the link is incorrect. 
              <br />
              Let us help you find what you&apos;re searching for.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="group relative overflow-hidden px-8 py-4 rounded-full text-lg font-medium transition-all duration-500 hover:scale-105"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                    Go to Homepage
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <Home className="w-5 h-5" />
                    Go to Homepage
                  </span>
                </Link>
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                className="group relative overflow-hidden px-8 py-4 rounded-full text-lg font-medium transition-all duration-500 hover:scale-105 bg-transparent border-primary/30 hover:border-primary/50"
              >
                <Link href="/courses" className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                    Browse Courses
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <Search className="w-5 h-5" />
                    Browse Courses
                  </span>
                </Link>
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Or you can <Link href="/contact" className="text-primary hover:underline">contact us</Link> if you think there&apos;s an error
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}