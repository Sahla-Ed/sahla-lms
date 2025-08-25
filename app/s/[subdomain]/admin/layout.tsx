import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SiteHeader } from '@/components/sidebar/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { checkPlanStatus } from '@/lib/subscription';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTenantSettings } from '../data/admin/get-tenant-settings';


export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [plan, tenant, t, locale] = await Promise.all([
    checkPlanStatus(),
    getTenantSettings(),
    getTranslations('AdminLayout'),
    getLocale(),
  ]);

  const headerTitle = t('headerTitle', { tenantName: tenant.name });
  const sidebarSide = locale === 'ar' ? 'right' : 'left'; 

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
       <AppSidebar variant='inset' planName={plan.planName} side={sidebarSide} />

      <SidebarInset>
      <SiteHeader title={headerTitle} />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6'>
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
