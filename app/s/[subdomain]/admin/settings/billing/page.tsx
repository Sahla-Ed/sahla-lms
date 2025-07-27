import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getSubscription } from '@/app/s/[subdomain]/data/admin/get-subscription';
import { BillingPageClient } from './_components/BillingPageClient';

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
  const subscription = await getSubscription();
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
        <Skeleton className='h-24 w-full' />
      </CardContent>
      {/* <CardFooter> */}
      {/* <Skeleton className='h-10 w-40' /> */}
      {/* </CardFooter> */}
    </Card>
  );
}
