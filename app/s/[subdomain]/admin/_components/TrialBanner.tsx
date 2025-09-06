import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { getSubscription } from '../../data/admin/get-subscription';
import { differenceInDays } from 'date-fns';
import { getTranslations } from 'next-intl/server';

export async function TrialBanner() {
  const subscription = await getSubscription();
  const t = await getTranslations('TrialBanner');

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
      <AlertTitle className='font-semibold'>{t('title')}</AlertTitle>
      <AlertDescription className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <span>
          {t.rich('description', {
            days: daysLeft,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </span>
        <Link
          href='/admin/settings/billing'
          className={buttonVariants({ variant: 'default', size: 'sm' })}
        >
          {t('upgradeButton')}
        </Link>
      </AlertDescription>
    </Alert>
  );
}

// export async function TrialBanner() {
//   const t = await getTranslations('TrialBanner');

//   const endDate = new Date();
//   endDate.setDate(endDate.getDate() + 10);

//   const fakeSubscription = {
//     status: 'trialing',
//     periodEnd: endDate,
//   };

//   const subscription = fakeSubscription;

//   const daysLeft = differenceInDays(
//     new Date(subscription.periodEnd ?? new Date()),
//     new Date(),
//   );

//   if (daysLeft < 0) {
//     return null;
//   }

//   return (
//     <Alert className='border-primary/30 bg-primary/5 text-primary'>
//       <Sparkles className='size-4' />
//       <AlertTitle className='font-semibold'>
//         {t('title')}
//       </AlertTitle>
//       <AlertDescription className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'>
//         <span>
//           {t.rich('description', {
//             days: daysLeft,
//             strong: (chunks) => <strong>{chunks}</strong>,
//           })}
//         </span>
//         <Link
//           href='/admin/settings/billing'
//           className={buttonVariants({ variant: 'default', size: 'sm' })}
//         >
//           {t('upgradeButton')}
//         </Link>
//       </AlertDescription>
//     </Alert>
//   );
// }
