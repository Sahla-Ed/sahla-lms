import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: ReactNode;
  badgeText: string;
}

export function PlaceholderPage({
  title,
  description,
  icon,
  badgeText,
}: PlaceholderPageProps) {
  return (
    <div className='from-background via-background to-muted/20 flex min-h-[calc(100vh-10rem)] items-center justify-center bg-gradient-to-br'>
      <div className='mx-auto max-w-2xl p-8 text-center'>
        <Badge
          variant='outline'
          className='text-primary border-primary/20 bg-primary/5 mb-6'
        >
          {icon}
          {badgeText}
        </Badge>
        <h1 className='mb-4 text-5xl font-bold tracking-tight'>{title}</h1>
        <p className='text-muted-foreground mb-8 text-xl leading-relaxed'>
          {description}
        </p>
        <Button asChild size='lg'>
          <Link href='/'>
            <ArrowLeft className='mr-2 h-5 w-5' />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
