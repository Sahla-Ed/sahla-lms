import { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-16 px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Last Updated: July 20, 2025
          </p>
        </div>
        
        {/* prose dark:prose-invert لضمان تنسيق النص تلقائيًا بشكل جيد */}
        <div className="prose dark:prose-invert prose-lg max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}