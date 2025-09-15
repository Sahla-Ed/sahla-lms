'use client';

import * as React from 'react';
import {
  IconDashboard,
  IconHelp,
  IconSearch,
  IconSettings,
  IconBook,
  IconTrophy,
} from '@tabler/icons-react';
import LogoLight from '@/public/logoLight.png';
import LogoDark from '@/public/logoDark.png';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

import { NavMain } from '@/components/sidebar/nav-main';
import { NavSecondary } from '@/components/sidebar/nav-secondary';
import { NavUser } from '@/components/sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTenantLogo } from '@/hooks/use-tenant-logo';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  side: 'left' | 'right';
}

export function AppSidebar({ side, ...props }: AppSidebarProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { tenantLogo, loading } = useTenantLogo();

  const t = useTranslations('TenantPlatform.Sidebar');
  const tAdmin = useTranslations('AdminSidebar');

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const getLogoSrc = () => {
    if (loading || !tenantLogo) {
      return currentTheme === 'dark' ? LogoDark : LogoLight;
    }

    if (currentTheme === 'dark' && tenantLogo.logoDark) {
      return tenantLogo.logoDark;
    }

    return tenantLogo.logo || (currentTheme === 'dark' ? LogoDark : LogoLight);
  };

  const navMain = [
    {
      title: t('dashboard'),
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: t('myCourses'),
      url: '/courses',
      icon: IconBook,
    },
    {
      title: t('leaderboard'),
      url: '/dashboard/leaderboard',
      icon: IconTrophy,
    },
  ];

  const navSecondary = [
    {
      title: tAdmin('navSecondary.settings'),
      url: '/dashboard/settings',
      icon: IconSettings,
    },
    {
      title: tAdmin('navSecondary.getHelp'),
      url: '/faqs',
      icon: IconHelp,
    },
    {
      title: tAdmin('navSecondary.search'),
      url: '#',
      icon: IconSearch,
    },
  ];

  return (
    <Sidebar
      collapsible='offcanvas'
      className='bg-background border-r'
      side={side}
      {...props}
    >
      <SidebarHeader className='bg-background border-b'>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className='p-2'>
              <Link
                href='/'
                className='flex items-center justify-center transition-none hover:scale-100 focus:outline-none'
              >
                {mounted ? (
                  <Image
                    src={getLogoSrc()}
                    alt='Logo'
                    className='h-16 w-16 object-cover'
                    priority
                  />
                ) : (
                  <div className='bg-muted h-16 w-16 rounded-md' />
                )}
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='bg-background'>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter className='bg-background border-t'>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
