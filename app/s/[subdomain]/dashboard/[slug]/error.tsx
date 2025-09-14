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
import {
  AlertTriangle,
  RefreshCw,
  Home,
  BookOpen,
  ArrowLeft,
  Play,
} from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Course page error:', error);
  }, [error]);

  return (
    <div className='bg-background flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <div className='bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
            <AlertTriangle className='text-destructive h-8 w-8' />
          </div>
          <CardTitle className='text-2xl'>Course Loading Error</CardTitle>
          <CardDescription>
            We encountered an error while loading this course. This might be a
            temporary issue with our learning platform.
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
              <Link href='/dashboard'>
                <BookOpen className='mr-2 h-4 w-4' />
                My Courses
              </Link>
            </Button>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row'>
            <Button asChild variant='ghost' size='sm' className='flex-1'>
              <Link href='/'>
                <Home className='mr-2 h-4 w-4' />
                Home
              </Link>
            </Button>
            <Button asChild variant='ghost' size='sm' className='flex-1'>
              <Link href='javascript:history.back()'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Go Back
              </Link>
            </Button>
          </div>

          <div className='border-t pt-4'>
            <p className='text-muted-foreground mb-3 text-sm'>
              Having trouble with this course?
            </p>
            <Button asChild variant='outline' size='sm' className='w-full'>
              <Link href='/contact'>
                <Play className='mr-2 h-4 w-4' />
                Contact Support
              </Link>
            </Button>
          </div>

          <p className='text-muted-foreground text-xs'>
            If this problem persists, please check your course enrollment or
            contact our support team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
