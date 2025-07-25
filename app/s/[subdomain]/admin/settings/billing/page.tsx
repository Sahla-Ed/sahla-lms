import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
// import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function BillingPage() {
  // Dummy data for UI display
  const daysUsed = 2;
  const totalDays = 14;
  const progress = (daysUsed / totalDays) * 100;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Billing & Subscription</h1>
        <p className='text-muted-foreground'>
          Manage your plan and payment details.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Current Plan</CardTitle>
          <CardDescription>
            You are currently on the 14-day free trial.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='bg-muted/30 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <p className='text-lg font-semibold'>Free Trial</p>
              <p className='text-muted-foreground'>$0.00 / month</p>
            </div>
            <div className='mt-4 space-y-2'>
              <Progress value={progress} />
              <p className='text-muted-foreground text-sm'>
                You have {totalDays - daysUsed} of {totalDays} days remaining.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex-col items-start gap-4'>
          <p className='text-muted-foreground text-sm'>
            Upgrade to a Pro plan to continue using Sahla after your trial ends
            and unlock advanced features.
          </p>
          <Link href='/upgrade'>
            <Button size='lg'>Upgrade to Pro</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
