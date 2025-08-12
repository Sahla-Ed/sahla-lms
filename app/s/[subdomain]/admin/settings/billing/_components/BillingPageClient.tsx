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
import { Badge } from '@/components/ui/badge';
import {
  createProUpgradeCheckoutSession,
  createStripePortalSession,
} from '../actions';

interface SubscriptionStatus {
  planName: 'FREE' | 'PRO';
  status: string | null;
  periodEnd: Date | null;
}

interface BillingPageClientProps {
  subscription: SubscriptionStatus;
}

export function BillingPageClient({ subscription }: BillingPageClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (action: () => Promise<void>) => {
    startTransition(async () => {
      try {
        await action();
      } catch (error) {
        toast.error('An error occurred. Please try again.');
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
        {subscription.planName === 'PRO' && subscription.status ? (
          <div className='bg-muted/30 space-y-2 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <p className='text-lg font-semibold'>You are a Pro member!</p>
              <Badge
                variant={
                  subscription.status === 'active' ? 'default' : 'secondary'
                }
              >
                Status: {subscription.status}
              </Badge>
            </div>
            {subscription.periodEnd && (
              <p className='text-muted-foreground text-sm'>
                Your plan renews on{' '}
                {new Date(subscription.periodEnd).toLocaleDateString()}.
              </p>
            )}
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
        {subscription.planName === 'PRO' ? (
          <Button
            size='lg'
            onClick={() => handleAction(createStripePortalSession)}
            disabled={isPending}
          >
            {isPending && <Loader2 className='mr-2 size-4 animate-spin' />}
            Manage Billing
          </Button>
        ) : (
          <Button
            size='lg'
            onClick={() => handleAction(createProUpgradeCheckoutSession)}
            disabled={isPending}
          >
            {isPending && <Loader2 className='mr-2 size-4 animate-spin' />}
            Upgrade to Pro
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
