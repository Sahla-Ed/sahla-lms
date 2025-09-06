/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useConfetti } from '@/hooks/use-confetti';
import { ArrowLeft, ArrowRight, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export default function PaymentSuccessfull() {
  const { triggerConfetti } = useConfetti();
  const t = useTranslations('PaymentPages.success');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  useEffect(() => {
    triggerConfetti();
  }, []);

  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className='flex min-h-screen w-full flex-1 items-center justify-center'>
      <Card className='w-[350px]'>
        <CardContent>
          <div className='flex w-full justify-center'>
            <CheckIcon className='size-12 rounded-full bg-green-500/30 p-2 text-green-500' />
          </div>
          <div className='mt-3 w-full text-center sm:mt-5'>
            <h2 className='text-xl font-semibold'>{t('title')}</h2>
            <p className='text-muted-foreground mt-2 text-sm tracking-tight text-balance'>
              {t('description')}
            </p>

            <Link
              href='/dashboard'
              className={buttonVariants({ className: 'mt-5 w-full' })}
            >
              <ArrowIcon className={cn('size-4', isRTL ? 'ml-2' : 'mr-2')} />
              {t('button')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
