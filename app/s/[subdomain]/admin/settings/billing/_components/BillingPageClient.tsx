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
import { useTranslations, useLocale } from 'next-intl';

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
  const t = useTranslations('BillingPage.client');
  const locale = useLocale();

  const handleAction = (action: () => Promise<void>) => {
    startTransition(async () => {
      try {
        await action();
      } catch (error) {
        toast.error(t('genericError'));
      }
    });
  };

  const getStatusTranslation = (status: string | null): string => {
    if (!status) return '';
    try {
      return t(`statuses.${status}`);
    } catch (error) {
      return status;
    }
  };

  const statusText = getStatusTranslation(subscription.status);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('cardTitle')}</CardTitle>
        <CardDescription>
          {t.rich('cardDescription', {
            planName: t(`plans.${subscription.planName}`),
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {subscription.planName === 'PRO' && subscription.status ? (
          <div className='bg-muted/30 space-y-2 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <p className='text-lg font-semibold'>{t('proMember')}</p>
              <Badge
                variant={
                  subscription.status === 'active' ? 'default' : 'secondary'
                }
              >
                {t('statusLabel', { status: statusText })}
              </Badge>
            </div>
            {subscription.periodEnd && (
              <p className='text-muted-foreground text-sm'>
                {t('renewsOn', {
                  date: new Date(subscription.periodEnd).toLocaleDateString(
                    locale === 'ar' ? 'ar-EG' : 'en-US',
                  ),
                })}
              </p>
            )}
          </div>
        ) : (
          <div className='bg-muted/30 rounded-lg border p-4 text-center'>
            <p className='text-muted-foreground'>{t('freePlanNotice')}</p>
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
            {t('manageButton')}
          </Button>
        ) : (
          <Button
            size='lg'
            onClick={() => handleAction(createProUpgradeCheckoutSession)}
            disabled={isPending}
          >
            {isPending && <Loader2 className='mr-2 size-4 animate-spin' />}
            {t('upgradeButton')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
