'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '../themeToggle';

export function SiteHeader({ title }: { title: string }) {
  return (
    <header className='flex h-[var(--header-height)] shrink-0 items-center border-b'>
      <div className='flex w-full items-center justify-between px-4 lg:px-6'>
        <div className='flex items-center gap-1 lg:gap-2'>
          <SidebarTrigger className='-ml-1 rtl:-mr-1 rtl:ml-0' />
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <h1 className='text-base font-medium'>{title}</h1>
        </div>

        <div className='flex items-center gap-2'>
          <ThemeToggle translationNamespace='TenantPlatform.common.themeToggle' />
        </div>
      </div>
    </header>
  );
}
