import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, XIcon } from 'lucide-react';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';

export default async function PaymentCancelled() {
  const t = await getTranslations('PaymentPages.cancel');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className='flex min-h-screen w-full flex-1 items-center justify-center'>
      <Card className='w-[350px]'>
        <CardContent>
          <div className='flex w-full justify-center'>
            <XIcon className='size-12 rounded-full bg-red-500/30 p-2 text-red-500' />
          </div>
          <div className='mt-3 w-full text-center sm:mt-5'>
            <h2 className='text-xl font-semibold'>{t('title')}</h2>
            <p className='text-muted-foreground mt-2 text-sm tracking-tight text-balance'>
              {t('description')}
            </p>

            <Link
              href='/'
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
