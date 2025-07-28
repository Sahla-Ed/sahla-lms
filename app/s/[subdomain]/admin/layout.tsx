import '@measured/puck/puck.css';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SiteHeader } from '@/components/sidebar/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { checkPlanStatus } from '@/lib/subscription'; // <-- Import status checker

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Fetch the plan status on the server
  const plan = await checkPlanStatus();

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >

      <AppSidebar variant='inset' planName={plan.planName} />

      <SidebarInset>
        <SiteHeader title='Sahla Admin' />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='flex flex-col gap-4 px-0 py-0 md:gap-0 md:py-0 lg:px-0'>
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
