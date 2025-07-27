import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { getSubscription } from '../../data/admin/get-subscription';
import { differenceInDays } from 'date-fns';

export async function TrialBanner() {
  const subscription = await getSubscription();

  if (subscription?.status !== 'trialing' || !subscription.periodEnd) {
    return null;
  }

  const daysLeft = differenceInDays(
    new Date(subscription.periodEnd ?? new Date()),
    new Date(),
  );

  if (daysLeft < 0) {
    return null;
  }

  return (
    <Alert className='border-primary/30 bg-primary/5 text-primary'>
      <Sparkles className='size-4' />
      <AlertTitle className='font-semibold'>
        You are on a 14-day free trial!
      </AlertTitle>
      <AlertDescription className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <span>
          You have <strong>{daysLeft} days</strong> left. Upgrade now to unlock
          all features and keep your platform running.
        </span>
        <Link
          href='/admin/settings/billing'
          className={buttonVariants({ variant: 'default', size: 'sm' })}
        >
          Upgrade Now
        </Link>
      </AlertDescription>
    </Alert>
  );
}
