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
    <div className="relative flex rounded-full border border-border bg-slate-900 dark:bg-slate-100 p-1 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div
        className={cn(
          "absolute top-1 bottom-1 rounded-full shadow-lg transition-all duration-300 ease-out",
          "bg-background", 
          locale === 'en' 
            ? "left-1 w-[calc(50%-4px)]" 
            : "left-[calc(50%+4px)] right-1",
          isPressed && "scale-95"
        )}
      />
      

      <button
        onClick={() => changeLanguage('en')}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        disabled={isPending}
        className={cn(
          'relative z-10 px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ease-out',
          'hover:scale-[1.02] active:scale-[0.98]',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background' ,
          locale === 'en'
            ? 'text-slate-900 dark:text-white' 
            : 'text-slate-400 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
          isPending && 'cursor-not-allowed opacity-70'
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
          'relative z-10 px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ease-out',
          'hover:scale-[1.02] active:scale-[0.98]',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
          locale === 'ar'
            ? 'text-white dark:text-slate-900'
            : 'text-slate-400 hover:text-white dark:text-slate-400 dark:hover:text-slate-900',
          isPending && 'cursor-not-allowed opacity-70'
        )}
      >
        عربي
      </button>
      

      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-background/80 backdrop-blur-[1px] rounded-full">
          <Loader2 className="h-4 w-4 animate-spin text-slate-600 dark:text-slate-400" />
        </div>
      )}
    </div>
  );
}