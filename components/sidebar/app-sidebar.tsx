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
  IconMessage,
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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  planName: 'FREE' | 'PRO';
}

export function AppSidebar({ className, planName, ...props }: AppSidebarProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const navMain = [
    { title: 'Dashboard', url: '/admin', icon: IconDashboard },
    { title: 'Courses', url: '/admin/courses', icon: IconListDetails },
    { title: 'Messages', url: '/admin/messages', icon: IconMessage },
    { title: 'Analytics', url: '/admin/analytics', icon: IconChartBar },
  ];

  if (planName === 'PRO') {
    navMain.push({
      title: 'Students',
      url: '/admin/students',
      icon: IconUsers,
    });
  }

  const navSecondary = [
    {
      title: 'Platform Settings',
      url: '/admin/settings/tenant',
      icon: IconBuilding,
    },
    {
      title: 'Landing Page',
      url: '/admin/settings/landing-page',
      icon: IconLayout2,
    },
    {
      title: 'billing',
      url: '/admin/settings/billing',
      icon: IconCashBanknote,
    },
    { title: 'Settings', url: '/admin/settings', icon: IconSettings },
    { title: 'Get Help', url: '/faqs', icon: IconHelp },
    { title: 'Search', url: '/admin/search', icon: IconSearch },
  ];

  return (
    <Sidebar
      collapsible='offcanvas'
      className={cn('border-r', className)}
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
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
