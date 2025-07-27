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
import { Progress } from '@/components/ui/progress';
import { useTransition } from 'react';
import { createBillingPortalSession, createCheckoutSession } from '../actions';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';
import { Prisma } from '@/lib/generated/prisma';
import { prisma } from '@/lib/db';

interface BillingPageClientProps {
  subscription: Prisma.Result<typeof prisma.subscription, '', 'findFirst'>;
}

export function BillingPageClient({ subscription }: BillingPageClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpgrade = () => {
    startTransition(async () => {
      try {
        await createCheckoutSession('Pro', false); // Default to monthly
      } catch (error) {
        toast.error('Could not create checkout session.');
      }
    });
  };

  const handleManage = () => {
    startTransition(async () => {
      try {
        await createBillingPortalSession();
      } catch (error) {
        toast.error('Could not create billing portal session.');
      }
    });
  };

  const isSubscribed = subscription?.status === 'active';
  const isTrial = subscription?.status === 'trialing';
  const totalTrialDays = 14;
  const daysLeft = subscription?.periodEnd
    ? differenceInDays(new Date(subscription.periodEnd), new Date())
    : 0;
  const daysUsed = totalTrialDays - daysLeft;
  const trialProgress = (daysUsed / totalTrialDays) * 100;

  const getPlanName = () => {
    if (isTrial) return 'Free Trial';
    if (isSubscribed) return `${subscription.plan} Plan`;
    return 'No Active Subscription';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Current Plan</CardTitle>
        <CardDescription>
          You are currently on the <strong>{getPlanName()}</strong>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isTrial && (
          <div className='bg-muted/30 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <p className='text-lg font-semibold'>Free Trial</p>
              <p className='text-muted-foreground'>$0.00 / month</p>
            </div>
            <div className='mt-4 space-y-2'>
              <Progress value={trialProgress} />
              <p className='text-muted-foreground text-sm'>
                You have {daysLeft > 0 ? daysLeft : 0} of {totalTrialDays} days
                remaining.
              </p>
            </div>
          </div>
        )}
        {isSubscribed && subscription?.periodEnd && (
          <div className='bg-muted/30 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <p className='text-lg font-semibold'>{subscription.plan} Plan</p>
              <p className='text-muted-foreground'>
                Renews on {format(new Date(subscription.periodEnd), 'PPP')}
              </p>
            </div>
          </div>
        )}
        {!isSubscribed && !isTrial && (
          <div className='bg-muted/30 rounded-lg border p-4 text-center'>
            <p className='text-muted-foreground'>
              You are not subscribed to any plan.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex-col items-start gap-4'>
        {isSubscribed ? (
          <>
            <p className='text-muted-foreground text-sm'>
              Manage your subscription and billing details on Stripe.
            </p>
            <Button size='lg' onClick={handleManage} disabled={isPending}>
              {isPending && <Loader2 className='mr-2 size-4 animate-spin' />}
              Manage Subscription
            </Button>
          </>
        ) : (
          <>
            <p className='text-muted-foreground text-sm'>
              Upgrade to a Pro plan to continue using Sahla after your trial
              ends and unlock advanced features.
            </p>
            <Button size='lg' onClick={handleUpgrade} disabled={isPending}>
              {isPending && <Loader2 className='mr-2 size-4 animate-spin' />}
              Upgrade to Pro
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
