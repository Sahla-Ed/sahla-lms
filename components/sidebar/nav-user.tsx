'use client';

import {
  IconDashboard,
  IconDotsVertical,
  IconLogout,
} from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { HomeIcon, Tv2 } from 'lucide-react';
import { useSignOut } from '@/hooks/use-signout';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session, isPending } = authClient.useSession();
  const handleSignOut = useSignOut();

  const t = useTranslations('NavUser');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  if (isPending) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            className='bg-background hover:bg-accent flex items-center justify-center transition-colors'
          >
            <LoadingSpinner />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!session) {
    return null;
  }

  const displayName =
    session?.user.name && session.user.name.length > 0
      ? session.user.name
      : session?.user.email.split('@')[0];

  const userInitial =
    session?.user.name && session.user.name.length > 0
      ? session.user.name.charAt(0).toUpperCase()
      : session?.user.email.charAt(0).toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <SidebarMenuButton
              size='lg'
              className={cn(
                'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
                isRTL && 'flex-row-reverse' 
              )}
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={
                    session?.user.image ??
                    `https://avatar.vercel.sh/${session?.user.email}`
                  }
                  alt={session?.user.name || session?.user.email}
                />
                <AvatarFallback className='rounded-lg'>
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  'grid flex-1 text-sm leading-tight',
                  isRTL ? 'text-right' : 'text-left' 
                )}
              >
                <span className='text-foreground truncate font-medium'>
                  {displayName}
                </span>
                <span className='text-muted-foreground truncate text-xs'>
                  {session?.user.email}
                </span>
              </div>
              <IconDotsVertical
                className={cn(
                  'text-muted-foreground hover:text-foreground size-4 transition-colors',
                  isRTL ? 'mr-auto' : 'ml-auto'
                )}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='bg-background w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border shadow-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className={cn('flex items-center gap-2 px-1 py-1.5 text-sm', isRTL && 'flex-row-reverse text-right')}>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={
                      session?.user.image ??
                      `https://avatar.vercel.sh/${session?.user.email}`
                    }
                    alt={session?.user.name || session?.user.email}
                  />
                  <AvatarFallback className='rounded-lg'>
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 leading-tight'>
                  <span className='text-foreground truncate font-medium'>
                    {displayName}
                  </span>
                  <span className='text-muted-foreground truncate text-xs'>
                    {session?.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className='hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors'
              >
                <Link
                  href='/'
                  className={cn(
                    'flex items-center space-x-2',
                    isRTL && 'flex-row-reverse space-x-reverse',
                  )}
                >
                  <HomeIcon className='size-4' />
                  <span>{t('homepage')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className='hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors'
              >
                <Link
                  href='/dashboard'
                  className={cn(
                    'flex items-center space-x-2',
                    isRTL && 'flex-row-reverse space-x-reverse',
                  )}
                >
                  <IconDashboard className='size-4' />
                  <span>{t('dashboard')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className='hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors'
              >
                <Link
                  href='/courses'
                  className={cn(
                    'flex items-center space-x-2',
                    isRTL && 'flex-row-reverse space-x-reverse',
                  )}
                >
                  <Tv2 className='size-4' />
                  <span>{t('courses')}</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className={cn(
                'cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-950 dark:focus:text-red-400',
                isRTL && 'flex-row-reverse',
              )}
            >
              <IconLogout className='size-4' />
              <span>{t('logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
