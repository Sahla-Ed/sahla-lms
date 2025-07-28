import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BillingPageClient } from './_components/BillingPageClient';
import { checkPlanStatus } from '@/lib/subscription';

export default function BillingPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Billing & Subscription</h1>
        <p className='text-muted-foreground'>
          Manage your plan and payment details.
        </p>
      </div>
      <Suspense fallback={<BillingSkeleton />}>
        <LoadSubscription />
      </Suspense>
    </div>
  );
}

async function LoadSubscription() {
  const subscription = await checkPlanStatus();
  return <BillingPageClient subscription={subscription} />;
}

function BillingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-7 w-48' />
        <Skeleton className='h-4 w-72' />
      </CardHeader>
      <CardContent>
        <div className='space-y-4 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-5 w-24' />
          </div>
          <Skeleton className='h-2 w-full' />
          <Skeleton className='h-4 w-48' />
        </div>
      </CardContent>
      <CardFooter className='flex-col items-start gap-4'>
        <Skeleton className='h-4 w-full max-w-lg' />
        <Skeleton className='h-10 w-40' />
      </CardFooter>
    </Card>
  );
}
