import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const proFeatures = [
  'Unlimited courses and students',
  'Advanced analytics and reporting',
  'Custom branding and domain',
  'Priority support',
  'AI-powered creator tools',
];

export default function UpgradePage() {
  return (
    <div className='flex min-h-[calc(100vh-8rem)] items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Upgrade to Pro</CardTitle>
          <CardDescription>
            Unlock all features and grow your online platform.
          </CardDescription>
          <p className='pt-4 text-4xl font-bold'>
            $49{' '}
            <span className='text-muted-foreground text-lg font-normal'>
              / month
            </span>
          </p>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ul className='space-y-2'>
            {proFeatures.map((feature, index) => (
              <li key={index} className='flex items-center gap-2'>
                <CheckCircle className='size-5 text-green-500' />
                <span className='text-muted-foreground'>{feature}</span>
              </li>
            ))}
          </ul>
          <Card className='bg-muted/30 mt-6'>
            <CardContent className='p-4'>
              <p className='text-muted-foreground text-center text-sm'>
                This is where the Stripe payment form would be embedded.
                Clicking the button below would initiate the payment process.
              </p>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          {/* In a real app, this button would trigger a server action to create a Stripe Checkout session */}
          <Button size='lg' className='w-full'>
            Confirm Payment & Upgrade
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
