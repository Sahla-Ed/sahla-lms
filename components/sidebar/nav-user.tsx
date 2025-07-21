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

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session, isPending } = authClient.useSession();
  const handleSignOut = useSignOut();

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
              className='data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
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
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='text-foreground truncate font-medium'>
                  {displayName}
                </span>
                <span className='text-muted-foreground truncate text-xs'>
                  {session?.user.email}
                </span>
              </div>
              <IconDotsVertical className='text-muted-foreground hover:text-foreground ml-auto size-4 transition-colors' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='bg-background w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border shadow-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
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
                <div className='grid flex-1 text-left text-sm leading-tight'>
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
                <Link href='/' className='flex items-center space-x-2'>
                  <HomeIcon className='size-4' />
                  <span>Homepage</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className='hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors'
              >
                <Link href='/dashboard' className='flex items-center space-x-2'>
                  <IconDashboard className='size-4' />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className='hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors'
              >
                <Link href='/courses' className='flex items-center space-x-2'>
                  <Tv2 className='size-4' />
                  <span>Courses</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className='cursor-pointer transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400'
            >
              <IconLogout className='mr-2 size-4' />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
