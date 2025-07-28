'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { PlanStatus } from '@/lib/subscription';
import { createProUpgradeCheckoutSession } from '../actions';

interface BillingPageClientProps {
  subscription: PlanStatus;
}

export function BillingPageClient({ subscription }: BillingPageClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpgrade = () => {
    startTransition(async () => {
      try {
        await createProUpgradeCheckoutSession();
      } catch (error) {
        toast.error('Could not create checkout session.');
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Current Plan</CardTitle>
        <CardDescription>
          You are currently on the <strong>{subscription.planName}</strong>{' '}
          plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {subscription.planName === 'PRO' ? (
          <div className='bg-muted/30 rounded-lg border p-4'>
            <p className='text-lg font-semibold'>You are a Pro member!</p>
            <p className='text-muted-foreground'>
              You have access to all Pro features.
            </p>
          </div>
        ) : (
          <div className='bg-muted/30 rounded-lg border p-4 text-center'>
            <p className='text-muted-foreground'>
              You are on the Free plan. Upgrade to unlock more features.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {subscription.planName !== 'PRO' && (
          <Button size='lg' onClick={handleUpgrade} disabled={isPending}>
            {isPending && <Loader2 className='mr-2 size-4 animate-spin' />}
            Upgrade to Pro
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
