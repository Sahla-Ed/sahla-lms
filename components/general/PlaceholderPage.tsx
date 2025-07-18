import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: ReactNode;
  badgeText: string;
}

export function PlaceholderPage({ title, description, icon, badgeText }: PlaceholderPageProps) {
  return (
    <div className="min-h-[calc(100vh-10rem)] bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
      <div className="text-center p-8 max-w-2xl mx-auto">
        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 mb-6">
          {icon}
          {badgeText}
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight mb-4">{title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          {description}
        </p>
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
