'use client';

import { ChevronDownIcon, LogOutIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSignOut } from '@/hooks/use-signout';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface iAppProps {
  name: string;
  email: string;
  image: string;
}

export function UserDropdown({ email, name, image }: iAppProps) {
  const handleSignOut = useSignOut();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('NavUser');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className={cn(
            'flex h-auto items-center gap-1 p-0 hover:bg-transparent',
            isRTL && 'flex-row-reverse',
          )}
        >
          <Avatar className='h-8 w-8'>
            <AvatarImage src={image} alt='Profile image' />
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className='opacity-60'
            aria-hidden='true'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-48'>
        <DropdownMenuLabel
          className={cn('flex min-w-0 flex-col', isRTL && 'items-end')}
        >
          <span className='text-foreground truncate text-sm font-medium'>
            {name}
          </span>
          <span className='text-muted-foreground truncate text-xs font-normal'>
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className={cn(
            'cursor-pointer gap-2 text-red-600 focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-950 dark:focus:text-red-400',
            isRTL && 'flex-row-reverse',
          )}
        >
          <LogOutIcon size={16} className='opacity-60' aria-hidden='true' />
          <span>{t('logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
