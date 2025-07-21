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
  IconFolder,
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

const data = {
  navMain: [
    { title: 'Dashboard', url: '/admin', icon: IconDashboard },
    { title: 'Courses', url: '/admin/courses', icon: IconListDetails },
    { title: 'Analytics', url: '/admin/analytics', icon: IconChartBar },
    { title: 'Projects', url: '/admin/projects', icon: IconFolder },
    { title: 'Team', url: '/admin/teams', icon: IconUsers },
  ],
  navSecondary: [
    { title: 'Settings', url: '/admin/settings', icon: IconSettings },
    { title: 'Get Help', url: '/faqs', icon: IconHelp },
    { title: 'Search', url: '/admin/search', icon: IconSearch },
  ],
};

export function AppSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <Sidebar
      collapsible='offcanvas'
      className={cn('border-r', className)}
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className='p-2'>
              <Link
                href='/'
                className='flex items-center justify-center transition-none hover:scale-100 focus:outline-none'
              >
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
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
