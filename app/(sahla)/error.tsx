'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Marketing site error:', error);
  }, [error]);

  return (
    <div className='from-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <div className='bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
            <AlertTriangle className='text-destructive h-8 w-8' />
          </div>
          <CardTitle className='text-2xl'>Oops! Something went wrong</CardTitle>
          <CardDescription>
            We encountered an unexpected error while loading the page. This
            might be a temporary issue.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='bg-muted rounded-lg p-4 text-center'>
            <p className='text-muted-foreground text-sm'>
              We're working to fix this issue. Please try again in a moment.
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row'>
            <Button onClick={reset} className='flex-1'>
              <RefreshCw className='mr-2 h-4 w-4' />
              Try Again
            </Button>
            <Button asChild variant='outline' className='flex-1'>
              <Link href='/'>
                <Home className='mr-2 h-4 w-4' />
                Go Home
              </Link>
            </Button>
          </div>

          <p className='text-muted-foreground text-xs'>
            If this problem persists, please contact our support team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
