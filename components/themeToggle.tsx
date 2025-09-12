'use client';

import * as React from 'react';
import { Moon, Sun, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  translationNamespace: string;
}

export function ThemeToggle({ translationNamespace }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [showText, setShowText] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  const t = useTranslations(translationNamespace);
  const locale = useLocale();
  const isRTL = locale === 'ar';

  React.useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setIsClicked(true);
    
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }

    setTimeout(() => {
      setShowText(true);
    }, 100);

    setTimeout(() => setIsClicked(false), 150);
    

    setTimeout(() => {
      setShowText(false);
    }, 2500);
  };

  const ThemeIcon = () => {
    if (!mounted) return <Laptop className='h-4 w-4' />;

    const iconClass = cn(
      'h-4 w-4 transition-all duration-300',
      isClicked && 'scale-110 rotate-12'
    );

    if (resolvedTheme === 'dark') {
      return <Moon className={iconClass} />;
    }
    if (resolvedTheme === 'light') {
      return <Sun className={iconClass} />;
    }
    return <Laptop className={iconClass} />;
  };

  if (!mounted) {
    return (
      <Button variant='outline' size='icon' className='relative'>
        <div className='h-4 w-4 bg-gray-300 rounded-full animate-pulse' />
      </Button>
    );
  }

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={toggleTheme}
      className={cn(
        'relative overflow-hidden transition-all duration-700 ease-in-out group',
        showText ? 'w-[110px] px-4 rounded-full' : 'w-10',
        'hover:scale-105 active:scale-95'
      )}
    >
      <div className='flex items-center justify-center relative z-10'>
        <div className={cn(
          'transition-all duration-300 flex-shrink-0',
          showText && (isRTL ? 'ml-3' : 'mr-3')
        )}>
          <ThemeIcon />
        </div>
        <div
          className={cn(
            'overflow-hidden transition-all duration-700 ease-out',
            showText 
              ? 'max-w-[70px] opacity-100 transform translate-x-0' 
              : 'max-w-0 opacity-0 transform translate-x-4'
          )}
        >
          <span className={cn(
            'text-xs font-semibold whitespace-nowrap',
            isRTL ? 'pr-1' : 'pl-1'
          )}>
            {t(theme as 'light' | 'dark' | 'system')}
          </span>
        </div>
      </div>


      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-r transition-all duration-500',
          resolvedTheme === 'dark' 
            ? 'from-blue-500/0 via-purple-500/0 to-blue-500/0'
            : 'from-yellow-500/0 via-orange-500/0 to-yellow-500/0',
          showText && 'from-blue-500/5 via-purple-500/10 to-blue-500/5'
        )}
      />
    </Button>
  );
}