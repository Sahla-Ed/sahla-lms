'use client';
import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const changeLanguage = (nextLocale: string) => {
    if (locale === nextLocale || isPending) return;

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    startTransition(() => {
      router.refresh();
    });
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <div className='border-border relative flex rounded-full border bg-black p-1 shadow-sm transition-shadow duration-200 hover:shadow-md dark:bg-slate-100'>
      <div
        className={cn(
          'absolute top-1 bottom-1 rounded-full shadow-lg transition-all duration-300 ease-out',
          'bg-background',
          locale === 'en'
            ? 'left-1 w-[calc(50%-4px)]'
            : 'right-1 left-[calc(50%+4px)]',
          isPressed && 'scale-95',
        )}
      />

      <button
        onClick={() => changeLanguage('en')}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        disabled={isPending}
        className={cn(
          'relative z-10 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 ease-out',

          locale === 'en'
            ? 'text-slate-800 hover:text-black dark:text-slate-100 dark:hover:text-slate-300'
            : 'text-slate-800 hover:text-black dark:text-slate-100 dark:hover:text-slate-300',
          isPending && 'cursor-not-allowed opacity-70',
        )}
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage('ar')}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        disabled={isPending}
        className={cn(
          'relative z-10 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 ease-out',

          locale === 'ar'
            ? 'text-white hover:text-slate-300 dark:text-slate-800 dark:hover:text-black'
            : 'text-slate-100 hover:text-white dark:text-slate-800 dark:hover:text-black',
          isPending && 'cursor-not-allowed opacity-70',
        )}
      >
        عربي
      </button>

      {isPending && (
        <div className='bg-background/80 absolute inset-0 z-30 flex items-center justify-center rounded-full backdrop-blur-[1px]'>
          <Loader2 className='h-4 w-4 animate-spin text-slate-600 dark:text-slate-100' />
        </div>
      )}
    </div>
  );
}
