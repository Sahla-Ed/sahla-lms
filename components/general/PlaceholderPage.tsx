import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getTranslations , getLocale } from 'next-intl/server'; 
import { cn } from '@/lib/utils';
interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: ReactNode;
  badgeText: string;
}

export async function PlaceholderPage({
  title,
  description,
  icon,
  badgeText,
}: PlaceholderPageProps) {
   const locale = await getLocale();
  const isRTL = locale === 'ar';
  const t = await getTranslations('SearchPage');
  return (
    <div className='from-background via-background to-muted/20 flex min-h-[calc(100vh-10rem)] items-center justify-center bg-gradient-to-br'>
      <div className='mx-auto max-w-2xl p-8 text-center'>
        <Badge
          variant='outline'
          className='text-primary border-primary/20 bg-primary/5 mb-6'
        >
          {icon}
          {badgeText}
        </Badge>
        <h1 className='mb-4 text-5xl font-bold tracking-tight'>{title}</h1>
        <p className='text-muted-foreground mb-8 text-xl leading-relaxed'>
          {description}
        </p>
        <Button asChild size='lg'>
          <Link href='/'>
            <ArrowLeft
              className={cn(
                'h-5 w-5',
                isRTL ? 'ml-2 rotate-180' : 'mr-2'
              )}
            />
            {t('returnButton')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
