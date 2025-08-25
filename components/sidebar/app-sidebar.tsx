'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
  IconCashBanknote,
  IconBuilding,
  IconLayout2,
} from '@tabler/icons-react';

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
import LogoLight from '@/public/logoLight.png';
import LogoDark from '@/public/logoDark.png';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  planName: 'FREE' | 'PRO';
  side: 'left' | 'right';
}

export function AppSidebar({ className, planName, side, ...props }: AppSidebarProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('AdminSidebar');
  useEffect(() => {
    setMounted(true);
  }, []);
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const navMain = [
    { title: t('navMain.dashboard'), url: '/admin', icon: IconDashboard },
    { title: t('navMain.courses'), url: '/admin/courses', icon: IconListDetails },
    { title: t('navMain.analytics'), url: '/admin/analytics', icon: IconChartBar },
  ];

  if (planName === 'PRO') {
    navMain.push({
      title: t('navMain.students'),
      url: '/admin/students',
      icon: IconUsers,
    });
  }

  const navSecondary = [
    {
      title: t('navSecondary.platformSettings'),
      url: '/admin/settings/tenant',
      icon: IconBuilding,
    },
    {
      title: t('navSecondary.landingPage'),
      url: '/admin/settings/landing-page',
      icon: IconLayout2,
    },
    {
      title: t('navSecondary.billing'),
      url: '/admin/settings/billing',
      icon: IconCashBanknote,
    },
    { title: t('navSecondary.settings'), url: '/admin/settings', icon: IconSettings },
    { title: t('navSecondary.getHelp'), url: '/faqs', icon: IconHelp },
    { title: t('navSecondary.search'), url: '/admin/search', icon: IconSearch },
  ];

  return (
    <Sidebar
      collapsible='offcanvas'
      side={side}
      className={cn(className)} 
      {...props}
    >
      <SidebarHeader>
        <SidebarMenuItem>
          <div className='p-2'>
            <Link href='/' className='flex items-center justify-center'>
              {mounted ? (
                <Image
                  src={currentTheme === 'dark' ? LogoDark : LogoLight}
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
      </SidebarHeader>
      <SidebarContent>
      <NavMain items={navMain} quickCreateText={t('navMain.quickCreate')} />
        <NavSecondary items={navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
