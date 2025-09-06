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
import { getLocale, getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';

export default async function UpgradePage() {
  const t = await getTranslations('UpgradePage');
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  const proFeatures = t.raw('features') as string[];

  return (
    <div
      className='flex min-h-[calc(100vh-8rem)] items-center justify-center p-4'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
          <p className='pt-4 text-4xl font-bold'>
            {t('price')}{' '}
            <span className='text-muted-foreground text-lg font-normal'>
              {t('perMonth')}
            </span>
          </p>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ul className='space-y-2'>
            {proFeatures.map((feature, index) => (
              <li
                key={index}
                className={cn('flex items-center gap-2', {
                  'flex-row-reverse text-right': isRTL,
                })}
              >
                <CheckCircle className='size-5 shrink-0 text-green-500' />
                <span className='text-muted-foreground'>{feature}</span>
              </li>
            ))}
          </ul>
          <Card className='bg-muted/30 mt-6'>
            <CardContent className='p-4'>
              <p className='text-muted-foreground text-center text-sm'>
                {t('stripeNotice')}
              </p>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <Button size='lg' className='w-full'>
            {t('button')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
